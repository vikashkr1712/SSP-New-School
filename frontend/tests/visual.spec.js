import { expect, test } from "@playwright/test";
import path from "node:path";

const routes = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "academics", path: "/academics" },
  { name: "admissions", path: "/admission" },
  { name: "campus-life", path: "/campus-life" },
  { name: "contact", path: "/contact" },
];

const viewports = [
  { name: "desktop-1920x1080", width: 1920, height: 1080 },
  { name: "desktop-1600x900", width: 1600, height: 900 },
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "desktop-1366x768", width: 1366, height: 768 },
  { name: "desktop-1280x800", width: 1280, height: 800 },
  { name: "tablet-1024x768", width: 1024, height: 768 },
  { name: "tablet-912x1368", width: 912, height: 1368 },
  { name: "tablet-820x1180", width: 820, height: 1180 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "mobile-430x932", width: 430, height: 932 },
  { name: "mobile-412x915", width: 412, height: 915 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-375x812", width: 375, height: 812 },
  { name: "mobile-360x800", width: 360, height: 800 },
  { name: "mobile-320x568", width: 320, height: 568 },
];

async function loadAndReveal(page, routePath) {
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const badResponses = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText ?? "failed"}`));
  page.on("response", (response) => {
    if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
  });

  await page.goto(routePath, { waitUntil: "networkidle" });
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
  await page.waitForFunction(() => document.fonts?.status === "loaded");

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = page.viewportSize()?.height ?? 800;
  for (let y = 0; y <= pageHeight; y += Math.max(320, Math.floor(viewportHeight * 0.75))) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(45);
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(620);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(80);

  return { consoleErrors, pageErrors, failedRequests, badResponses };
}

for (const viewport of viewports) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of routes) {
      test(`${route.name} renders without layout or asset failures`, async ({ page }) => {
        const failures = await loadAndReveal(page, route.path);

        const audit = await page.evaluate(() => {
          const root = document.documentElement;
          const images = Array.from(document.images).map((image) => {
            const rect = image.getBoundingClientRect();
            return {
              alt: image.alt || image.src.split("/").pop(),
              complete: image.complete,
              naturalWidth: image.naturalWidth,
              naturalHeight: image.naturalHeight,
              left: rect.left,
              right: rect.right,
              width: rect.width,
              height: rect.height,
            };
          });
          const minimumImageInset = root.clientWidth <= 1024 ? 15 : 20;
          const edgeTouchingImages = Array.from(document.querySelectorAll("main img")).map((image) => {
            const rect = image.getBoundingClientRect();
            return {
              alt: image.alt || image.src.split("/").pop(),
              left: Math.round(rect.left * 10) / 10,
              right: Math.round(rect.right * 10) / 10,
              width: Math.round(rect.width * 10) / 10,
              height: Math.round(rect.height * 10) / 10,
            };
          }).filter((image) => image.width >= 120 && image.height >= 100 && (
            image.left < minimumImageInset - 1 || image.right > root.clientWidth - minimumImageInset + 1
          ));
          const croppedImages = Array.from(document.querySelectorAll("main img")).map((image) => {
            const rect = image.getBoundingClientRect();
            const renderedRatio = image.clientWidth / image.clientHeight;
            const sourceRatio = image.naturalWidth / image.naturalHeight;
            return {
              alt: image.alt || image.src.split("/").pop(),
              className: image.className,
              objectFit: getComputedStyle(image).objectFit,
              renderedRatio: Math.round(renderedRatio * 1000) / 1000,
              sourceRatio: Math.round(sourceRatio * 1000) / 1000,
              width: Math.round(rect.width * 10) / 10,
              height: Math.round(rect.height * 10) / 10,
            };
          }).filter((image) => image.width >= 120 && image.height >= 100 && image.objectFit === "cover" && (
            Math.abs(image.renderedRatio - image.sourceRatio) > 0.03
          ));
          const escapedImages = images.filter((image) => image.width > 1 && (image.left < -1 || image.right > root.clientWidth + 1));
          const escapedElements = Array.from(document.body.querySelectorAll("*")).map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              tag: element.tagName.toLowerCase(),
              className: typeof element.className === "string" ? element.className : "",
              left: Math.round(rect.left * 10) / 10,
              right: Math.round(rect.right * 10) / 10,
              width: Math.round(rect.width * 10) / 10,
            };
          }).filter((element) => element.width > 1 && (element.left < -1 || element.right > root.clientWidth + 1)).slice(0, 12);
          const hiddenSections = Array.from(document.querySelectorAll("main > section")).filter((section) => {
            const style = getComputedStyle(section);
            return Number.parseFloat(style.opacity) < 0.95 || style.visibility === "hidden";
          }).map((section) => section.className);
          const footerHeight = document.querySelector(".footer")?.getBoundingClientRect().height ?? 0;
          const navLinkSize = Number.parseFloat(getComputedStyle(document.querySelector(".navbar__link") ?? document.body).fontSize);
          return {
            clientWidth: root.clientWidth,
            scrollWidth: root.scrollWidth,
            brokenImages: images.filter((image) => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0),
            croppedImages,
            edgeTouchingImages,
            escapedImages,
            escapedElements,
            hiddenSections,
            footerHeight,
            navLinkSize,
            parentPortalPresent: document.body.innerText.includes("Parent Portal"),
          };
        });

        expect(audit.scrollWidth, `horizontal overflow at ${route.path} ${viewport.name}: ${JSON.stringify(audit.escapedElements)}`).toBeLessThanOrEqual(audit.clientWidth + 1);
        expect(audit.brokenImages, `broken images at ${route.path} ${viewport.name}`).toEqual([]);
        expect(viewport.width <= 768 ? audit.croppedImages : [], `cropped content images at ${route.path} ${viewport.name}`).toEqual([]);
        expect(audit.edgeTouchingImages, `content images too close to viewport edges at ${route.path} ${viewport.name}`).toEqual([]);
        expect(audit.escapedImages, `images outside viewport at ${route.path} ${viewport.name}`).toEqual([]);
        expect(audit.hiddenSections, `sections left hidden after reveal at ${route.path} ${viewport.name}`).toEqual([]);
        expect(audit.parentPortalPresent).toBe(false);
        expect(audit.navLinkSize).toBeGreaterThanOrEqual(viewport.width <= 1040 ? 16 : 14);
        expect(audit.footerHeight).toBeGreaterThanOrEqual(viewport.width <= 480 ? 560 : viewport.width <= 760 ? 400 : 280);
        expect(failures.consoleErrors, `console errors at ${route.path} ${viewport.name}`).toEqual([]);
        expect(failures.pageErrors, `page errors at ${route.path} ${viewport.name}`).toEqual([]);
        expect(failures.failedRequests, `failed requests at ${route.path} ${viewport.name}`).toEqual([]);
        expect(failures.badResponses, `HTTP errors at ${route.path} ${viewport.name}`).toEqual([]);

        await page.screenshot({
          path: path.resolve("../screenshots/playwright", route.name, `${viewport.name}.png`),
          fullPage: true,
          animations: "disabled",
        });
      });
    }
  });
}

test.describe("interaction and motion checks", () => {
  test("mobile menu opens, closes with Escape, and has no Parent Portal link", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });
    const toggle = page.locator(".navbar__toggle");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
    await expect(page.getByText("Parent Portal")).toHaveCount(0);
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("primary CTA routes and hover feedback work", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    const explore = page.getByRole("link", { name: "Explore Our School" });
    const before = await explore.evaluate((element) => getComputedStyle(element).boxShadow);
    await explore.hover();
    await page.waitForTimeout(260);
    const after = await explore.evaluate((element) => getComputedStyle(element).boxShadow);
    expect(after).not.toBe(before);
    await explore.click();
    await expect(page).toHaveURL(/\/about$/);
    await page.getByRole("link", { name: "Apply Now" }).click();
    await expect(page).toHaveURL(/\/admission$/);
  });

  test("admissions callback validation and success state work", async ({ page }) => {
    await page.goto("/admission", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Start an Application" }).first().click();
    await page.getByRole("button", { name: "Request a Call" }).click();
    await expect(page.locator(".callback-form small")).toHaveCount(4);
    await page.getByLabel("Parent/Guardian Name").fill("Vikash Kumar");
    await page.getByLabel("Email Address").fill("vikash@example.com");
    await page.getByLabel("Phone Number").fill("+91 98765 43210");
    await page.getByLabel("Child’s Grade").selectOption({ label: "Grades 6–8" });
    await page.getByRole("button", { name: "Request a Call" }).click();
    await expect(page.getByRole("status")).toContainText("Thank you");
  });

  test("contact form validation and FAQ accordion work", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.locator(".contact-form small")).not.toHaveCount(0);
    const faqButton = page.getByRole("button", { name: "How do I arrange a school tour?" });
    await faqButton.click();
    await expect(faqButton).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#contact-faq-0")).toBeVisible();
    await faqButton.press("Enter");
    await expect(faqButton).toHaveAttribute("aria-expanded", "false");
  });

  test("motion runs when allowed and is disabled for reduced motion", async ({ browser }) => {
    const animatedContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
    const animatedPage = await animatedContext.newPage();
    await animatedPage.goto("/", { waitUntil: "domcontentloaded" });
    await animatedPage.waitForTimeout(90);
    expect(await animatedPage.evaluate(() => document.getAnimations().length)).toBeGreaterThan(0);
    await animatedContext.close();

    const reducedContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto("/", { waitUntil: "networkidle" });
    expect(await reducedPage.evaluate(() => document.getAnimations().length)).toBe(0);
    await reducedContext.close();
  });
});
