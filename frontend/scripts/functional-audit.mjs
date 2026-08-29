import assert from "node:assert/strict";

const cdpBase = process.env.CDP_URL || "http://127.0.0.1:9222";
const siteBase = process.env.SITE_URL || "http://127.0.0.1:5173";

class CdpClient {
  constructor(url) {
    this.id = 0;
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
      const callbacks = this.listeners.get(message.method) || [];
      callbacks.forEach((callback) => callback(message.params));
      if (message.method === "Page.loadEventFired") this.listeners.delete(message.method);
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  on(method, callback) {
    const callbacks = this.listeners.get(method) || [];
    callbacks.push(callback);
    this.listeners.set(method, callbacks);
  }

  once(method) {
    return new Promise((resolve) => this.on(method, resolve));
  }
}

const targetResponse = await fetch(`${cdpBase}/json/new?about:blank`, { method: "PUT" });
const target = await targetResponse.json();
const client = new CdpClient(target.webSocketDebuggerUrl);
await client.connect();

const consoleErrors = [];
const requestFailures = [];
await client.send("Page.enable");
await client.send("Runtime.enable");
await client.send("Log.enable");
await client.send("Network.enable");
await client.send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 900,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 900,
});
client.on("Runtime.exceptionThrown", ({ exceptionDetails }) => consoleErrors.push(exceptionDetails.text));
client.on("Log.entryAdded", ({ entry }) => {
  if (entry.level === "error") consoleErrors.push(entry.text);
});
client.on("Network.loadingFailed", ({ errorText, canceled }) => {
  if (!canceled) requestFailures.push(errorText);
});

async function navigate(route) {
  const loaded = client.once("Page.loadEventFired");
  await client.send("Page.navigate", { url: `${siteBase}${route}` });
  await loaded;
  await client.send("Runtime.evaluate", {
    expression: "document.fonts.ready.then(() => new Promise((resolve) => setTimeout(resolve, 650)))",
    awaitPromise: true,
  });
}

async function evaluate(expression) {
  const response = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result.value;
}

for (const route of ["/", "/about", "/academics", "/admission", "/campus-life", "/contact"]) {
  await navigate(route);
  const routeCheck = await evaluate(`({
    hasMain: Boolean(document.querySelector('main')),
    hasParentPortal: document.body.textContent.includes('Parent Portal'),
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  })`);
  assert.equal(routeCheck.hasMain, true, `${route} did not render a main element`);
  assert.equal(routeCheck.hasParentPortal, false, `${route} still contains Parent Portal`);
  assert.equal(routeCheck.overflow, false, `${route} overflows at mobile width`);
}

await navigate("/contact");
const contactResult = await evaluate(`(async () => {
  const toggle = document.querySelector('.navbar__toggle');
  toggle.click();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  const menuOpened = toggle.getAttribute('aria-expanded') === 'true';
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await new Promise((resolve) => requestAnimationFrame(resolve));
  const menuClosed = toggle.getAttribute('aria-expanded') === 'false';

  const form = document.querySelector('.contact-form');
  form.requestSubmit();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  const validationCount = form.querySelectorAll('small').length;

  const setValue = (selector, value) => {
    const element = form.querySelector(selector);
    const prototype = element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value);
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('input', { bubbles: true }));
  };
  setValue('[name="fullName"]', 'Test Parent');
  setValue('[name="email"]', 'parent@example.com');
  setValue('[name="phone"]', '+91 98765 43210');
  setValue('[name="topic"]', 'Campus visit');
  const textarea = form.querySelector('[name="message"]');
  Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(textarea, 'Please arrange a campus visit.');
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  const consent = form.querySelector('[name="consent"]');
  consent.click();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  form.requestSubmit();
  await new Promise((resolve) => requestAnimationFrame(resolve));

  const faqButton = document.querySelector('.contact-faq button');
  faqButton.click();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  return {
    menuOpened,
    menuClosed,
    validationCount,
    success: document.querySelector('.contact-form__status').textContent,
    faqExpanded: faqButton.getAttribute('aria-expanded') === 'true',
    faqVisible: !document.getElementById(faqButton.getAttribute('aria-controls')).hidden,
  };
})()`);
assert.equal(contactResult.menuOpened, true, "Mobile menu did not open");
assert.equal(contactResult.menuClosed, true, "Mobile menu did not close with Escape");
assert.ok(contactResult.validationCount >= 5, "Contact validation messages did not render");
assert.match(contactResult.success, /received/i, "Contact success state did not render");
assert.equal(contactResult.faqExpanded, true, "FAQ did not expand");
assert.equal(contactResult.faqVisible, true, "Expanded FAQ answer remained hidden");

await navigate("/admission");
const admissionResult = await evaluate(`(async () => {
  const form = document.querySelector('.callback-form');
  form.requestSubmit();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  const validationCount = form.querySelectorAll('small').length;
  const setValue = (selector, value) => {
    const element = form.querySelector(selector);
    const prototype = element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value);
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('input', { bubbles: true }));
  };
  setValue('[name="parentName"]', 'Test Parent');
  setValue('[name="email"]', 'parent@example.com');
  setValue('[name="phone"]', '+91 98765 43210');
  setValue('[name="grade"]', 'Grades 6–8');
  await new Promise((resolve) => requestAnimationFrame(resolve));
  form.requestSubmit();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  return {
    validationCount,
    success: document.querySelector('.callback-form__status').textContent,
  };
})()`);
assert.equal(admissionResult.validationCount, 4, "Admissions validation messages did not render");
assert.match(admissionResult.success, /contact you shortly/i, "Admissions success state did not render");

assert.deepEqual(consoleErrors, [], `Console errors: ${consoleErrors.join(" | ")}`);
assert.deepEqual(requestFailures, [], `Request failures: ${requestFailures.join(" | ")}`);

process.stdout.write("PASS direct routes, mobile menu, Contact validation, FAQ, Admissions validation, console and network checks\n");
client.socket.close();
