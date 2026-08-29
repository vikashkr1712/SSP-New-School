import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const cdpBase = process.env.CDP_URL || "http://127.0.0.1:9222";
const siteBase = process.env.SITE_URL || "http://127.0.0.1:5173";
const outputRoot = path.resolve(process.cwd(), "..", "screenshots", "responsive-audit");

const allRoutes = [
  ["home", "/"],
  ["about", "/about"],
  ["academics", "/academics"],
  ["admissions", "/admission"],
  ["campus-life", "/campus-life"],
  ["contact", "/contact"],
];
const allWidths = [320, 360, 375, 390, 430, 540, 768, 820, 912, 1024, 1280, 1366, 1440, 1536, 1920];
const routes = process.env.AUDIT_ROUTE
  ? allRoutes.filter(([name]) => name === process.env.AUDIT_ROUTE)
  : allRoutes;
const widths = process.env.AUDIT_WIDTHS
  ? process.env.AUDIT_WIDTHS.split(",").map(Number).filter(Boolean)
  : process.env.AUDIT_QUICK === "1" ? [390, 768, 1440] : allWidths;
const screenshotScale = Number(process.env.AUDIT_SCALE || 1);
const screenshotSuffix = process.env.AUDIT_SUFFIX || "";

class CdpClient {
  constructor(url) {
    this.nextId = 0;
    this.pending = new Map();
    this.listeners = new Map();
    this.socket = new WebSocket(url);
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      const listeners = this.listeners.get(message.method) || [];
      listeners.forEach((listener) => listener(message.params));
      this.listeners.delete(message.method);
    });
  }

  send(method, params = {}) {
    const id = ++this.nextId;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  once(method) {
    return new Promise((resolve) => {
      const listeners = this.listeners.get(method) || [];
      listeners.push(resolve);
      this.listeners.set(method, listeners);
    });
  }

  close() {
    this.socket.close();
  }
}

async function createTarget() {
  const response = await fetch(`${cdpBase}/json/new?about:blank`, { method: "PUT" });
  if (!response.ok) throw new Error(`Unable to create Chrome target: ${response.status}`);
  return response.json();
}

async function auditPage(routeName, routePath, width) {
  const target = await createTarget();
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Emulation.setDeviceMetricsOverride", {
    width,
    height: width < 600 ? 900 : 1000,
    deviceScaleFactor: 1,
    mobile: width < 600,
    screenWidth: width,
    screenHeight: width < 600 ? 900 : 1000,
  });
  await client.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });

  const loaded = client.once("Page.loadEventFired");
  await client.send("Page.navigate", { url: `${siteBase}${routePath}` });
  await loaded;
  await client.send("Runtime.evaluate", {
    expression: `Promise.all([
      document.fonts.ready,
      ...Array.from(document.images, (image) => image.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true });
            image.addEventListener('error', resolve, { once: true });
          }))
    ]).then(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))))`,
    awaitPromise: true,
  });

  const audit = await client.send("Runtime.evaluate", {
    expression: `(() => {
      const viewportWidth = document.documentElement.clientWidth;
      const elements = Array.from(document.querySelectorAll('body *'));
      const offenders = elements.flatMap((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return [];
        if (rect.left >= -0.5 && rect.right <= viewportWidth + 0.5) return [];
        return [{
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === 'string' ? element.className : '',
          left: Math.round(rect.left * 10) / 10,
          right: Math.round(rect.right * 10) / 10,
          width: Math.round(rect.width * 10) / 10,
        }];
      }).slice(0, 30);
      const failedImages = Array.from(document.images)
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.src);
      return {
        innerWidth: window.innerWidth,
        clientWidth: viewportWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        overflow: document.documentElement.scrollWidth > viewportWidth,
        offenders,
        failedImages,
      };
    })()`,
    returnByValue: true,
  });

  const result = audit.result.value;
  const metrics = await client.send("Page.getLayoutMetrics");
  const contentSize = metrics.cssContentSize || metrics.contentSize;
  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width, height: contentSize.height, scale: screenshotScale },
  });

  const routeDir = path.join(outputRoot, routeName);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, `${width}${screenshotSuffix}.png`), Buffer.from(screenshot.data, "base64"));
  client.close();
  return { route: routeName, width, ...result };
}

await mkdir(outputRoot, { recursive: true });
const results = [];
for (const [routeName, routePath] of routes) {
  for (const width of widths) {
    const result = await auditPage(routeName, routePath, width);
    results.push(result);
    const status = result.overflow || result.failedImages.length ? "FAIL" : "PASS";
    process.stdout.write(`${status} ${routeName} ${width}px scroll=${result.scrollWidth}/${result.clientWidth}\n`);
    if (result.offenders.length) process.stdout.write(`${JSON.stringify(result.offenders.slice(0, 5))}\n`);
  }
}
await writeFile(path.join(outputRoot, "report.json"), JSON.stringify(results, null, 2));

if (results.some((result) => result.overflow || result.failedImages.length)) process.exitCode = 1;
