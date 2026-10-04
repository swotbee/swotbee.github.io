#!/usr/bin/env node
/**
 * Compare browser interaction and conversion contracts across two built checkouts.
 * External requests are blocked, and scorecard capture is fulfilled locally.
 *
 * Usage:
 *   node scripts/astro-migration-interactions.mjs --before /tmp/astro6 --after .
 */
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

function parseArgs(argv) {
  const options = { after: "." };
  for (let index = 2; index < argv.length; index += 1) {
    if (argv[index] === "--before") options.before = argv[++index];
    else if (argv[index] === "--after") options.after = argv[++index];
    else throw new Error(`Unknown option: ${argv[index]}`);
  }
  if (!options.before) throw new Error("Provide the Astro 6 checkout with --before <directory>.");
  return { before: path.resolve(options.before), after: path.resolve(options.after) };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitFor(origin) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      if ((await fetch(origin)).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${origin}`);
}

function observeErrors(page, label, errors) {
  page.on("pageerror", (error) => errors.push(`${label}: pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (/ERR_BLOCKED_BY_CLIENT|Failed to load resource/.test(message.text())) return;
    errors.push(`${label}: console: ${message.text()}`);
  });
}

async function blockExternal(context, origin) {
  await context.route("**/*", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin === origin || url.protocol === "data:" || url.protocol === "blob:") {
      await route.continue();
    } else {
      await route.abort("blockedbyclient");
    }
  });
}

async function analyticsEvents(page, name) {
  return page.evaluate((eventName) => Array.from(window.dataLayer || [])
    .map((entry) => {
      try { return Array.from(entry); } catch { return []; }
    })
    .filter((entry) => entry[0] === "event" && entry[1] === eventName)
    .map((entry) => entry[2] || {}), name);
}

async function collectHome(browser, origin, errors) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await blockExternal(context, origin);
  const page = await context.newPage();
  observeErrors(page, "home-desktop", errors);
  await page.goto(`${origin}/`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => Boolean(window.Alpine));

  const trigger = page.locator('[aria-haspopup="dialog"]').first();
  await trigger.click();
  const dialog = page.locator("#renewal-demo-modal");
  await page.waitForFunction(() => document.querySelector("#renewal-demo-modal")?.open === true);
  const dialogOpened = await dialog.evaluate((element) => element.open);
  await dialog.getByRole("button", { name: "Close product video" }).click();
  await page.waitForFunction(() => document.querySelector("#renewal-demo-modal")?.open === false);
  const focusReturned = await trigger.evaluate((element) => document.activeElement === element);

  const carousel = page.locator("[data-testimonial-carousel]").first();
  const status = carousel.locator("[data-testimonial-status]");
  const carouselBefore = (await status.textContent())?.trim() || "";
  await carousel.locator("[data-testimonial-next]").click();
  await page.waitForFunction((previous) => {
    const value = document.querySelector("[data-testimonial-status]")?.textContent?.trim();
    return Boolean(value && value !== previous);
  }, carouselBefore);
  const carouselAfter = (await status.textContent())?.trim() || "";

  const cta = page.locator('[data-ga-cta="renewal_hero_book_alignment"]');
  await cta.dispatchEvent("pointerdown", { button: 0, pointerType: "mouse" });
  const ctaEvents = await analyticsEvents(page, "cta_click");

  const result = {
    alpineLoaded: await page.evaluate(() => Boolean(window.Alpine)),
    dialogOpened,
    focusReturned,
    carouselBefore,
    carouselAfter,
    ctaEvent: ctaEvents.at(-1),
  };
  assert(result.dialogOpened, "React demo dialog did not open");
  assert(result.focusReturned, "React demo dialog did not return focus to its trigger");
  assert(result.carouselBefore !== result.carouselAfter, "Testimonial carousel did not advance");
  assert(result.ctaEvent?.cta === "renewal_hero_book_alignment", "Homepage CTA event was not emitted");
  await context.close();
  return result;
}

async function collectMobileNavigation(browser, origin, errors) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await blockExternal(context, origin);
  const page = await context.newPage();
  observeErrors(page, "home-mobile", errors);
  await page.goto(`${origin}/`, { waitUntil: "networkidle" });
  const button = page.locator("#v6-mobile-menu-btn");
  await button.click();
  const menu = page.locator("#v6-mobile-menu");
  const result = {
    expanded: await button.getAttribute("aria-expanded"),
    menuVisible: await menu.isVisible(),
    bookingHref: await menu.locator('[data-ga-cta="nav_mobile_book_renewal_review"]').getAttribute("href"),
  };
  assert(result.expanded === "true" && result.menuVisible, "Mobile navigation did not open");
  assert(result.bookingHref === "/renewal-audit-call/", "Mobile booking CTA points to the wrong route");
  await context.close();
  return result;
}

async function collectBooking(browser, origin, errors) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await blockExternal(context, origin);
  const page = await context.newPage();
  observeErrors(page, "booking", errors);
  await page.goto(`${origin}/renewal-audit-call/?role=RevOps%20%2F%20Ops%20practitioner`, { waitUntil: "networkidle" });

  const callbacks = await page.evaluate(() => {
    const registrations = Array.from(window.Cal?.q || []).map((entry) => Array.from(entry));
    const find = (action) => registrations.find((entry) => entry[0] === "on" && entry[1]?.action === action)?.[1]?.callback;
    const events = [];
    const navigations = [];
    window.__sbTrack = (name, params) => events.push({ name, params });
    window.__sbTrackThenGo = (name, params, url) => navigations.push({ name, params, url });

    find("bookerReady")?.({ detail: { data: { eventId: 42, eventSlug: "your-renewal-audit" } } });
    find("linkReady")?.({ detail: { data: { eventId: 42, eventSlug: "your-renewal-audit" } } });
    find("availabilityLoaded")?.({ detail: { data: { eventId: 42, eventSlug: "your-renewal-audit" } } });
    find("linkFailed")?.({ detail: { data: { code: "LOCAL_TEST" } } });
    find("bookingSuccessfulV2")?.({ detail: { data: {
      uid: "booking-test-123",
      startTime: "2026-10-05T10:00:00.000Z",
      eventTypeId: 42,
    } } });
    return { events, navigations };
  });

  const readyEvents = callbacks.events.filter((event) => event.name === "booking_scheduler_ready");
  const errorEvents = callbacks.events.filter((event) => event.name === "booking_scheduler_error");
  const booking = callbacks.navigations.find((event) => event.name === "call_booked");
  const firstFaq = page.locator("details").first();
  await firstFaq.locator("summary").click();
  const result = {
    rolePitch: (await page.locator("#role-pitch-title").textContent())?.trim() || "",
    schedulerReadyCount: readyEvents.length,
    schedulerReady: readyEvents[0]?.params,
    schedulerError: errorEvents[0]?.params,
    booked: booking,
    faqOpened: await firstFaq.evaluate((element) => element.open),
  };
  assert(result.rolePitch.startsWith("You run renewals"), "Role-specific booking copy did not render");
  assert(result.schedulerReadyCount === 1, "Scheduler-ready guard did not deduplicate callbacks");
  assert(result.schedulerError?.error_code === "LOCAL_TEST", "Scheduler error event was not emitted");
  assert(result.booked?.params?.booking_uid === "booking-test-123", "Booking event lost its UID");
  assert(result.booked?.url.includes("/renewal-audit-call/thank-you/?uid=booking-test-123"), "Booking redirect is wrong");
  assert(result.faqOpened, "Booking FAQ did not open");
  await context.close();
  return result;
}

async function collectAttributionAndForm(browser, origin, errors) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await blockExternal(context, origin);
  const page = await context.newPage();
  observeErrors(page, "contact", errors);
  let webhookRequests = 0;
  page.on("request", (request) => {
    if (request.method() === "POST" && request.url().includes("swotbee-form-submit")) webhookRequests += 1;
  });

  await page.goto(`${origin}/contactus/?utm_source=google&utm_medium=cpc&utm_campaign=astro7_test&gclid=CLICK123`, { waitUntil: "networkidle" });
  const captured = await page.evaluate(() => window.__sbAttribution?.());
  await page.goto(`${origin}/contactus/`, { waitUntil: "networkidle" });
  const persisted = await page.evaluate(() => window.__sbAttribution?.());
  await page.evaluate(() => window.__sbFillAttribution?.(document.querySelector("#contact-form")));
  const hidden = await page.locator("#contact-form").evaluate((form) => Object.fromEntries(
    ["utm_source", "utm_medium", "utm_campaign", "gclid", "sb_landing_page"].map((name) => [
      name,
      form.querySelector(`[name="${name}"]`)?.value || "",
    ]),
  ));

  await page.locator('#contact-form input[name="email"]').fill("not-an-email");
  await page.locator("#contact-form").evaluate((form) => {
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
  await page.waitForFunction(() => document.querySelector("#cf-status")?.textContent?.includes("valid email"));
  const invalidStatus = (await page.locator("#cf-status").textContent())?.trim() || "";

  await page.goto(`${origin}/contactus/?utm_source=linkedin&utm_campaign=second_touch&li_fat_id=LINKEDIN456`, { waitUntil: "networkidle" });
  const replaced = await page.evaluate(() => window.__sbAttribution?.());
  const result = { captured, persisted, hidden, invalidStatus, webhookRequests, replaced };
  assert(captured?.gclid === "CLICK123", "Initial Google click ID was not captured");
  assert(persisted?.gclid === "CLICK123", "Attribution did not survive internal navigation");
  assert(hidden?.utm_campaign === "astro7_test" && hidden?.gclid === "CLICK123", "Hidden form attribution was not filled");
  assert(invalidStatus.includes("valid email"), "Contact form did not reject an invalid email");
  assert(webhookRequests === 0, "Invalid contact form submission reached the external webhook");
  assert(replaced?.utm_source === "linkedin" && !replaced?.gclid, "Last-touch attribution mixed campaigns");
  await context.close();
  return result;
}

async function collectScorecard(browser, origin, errors) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await blockExternal(context, origin);
  const page = await context.newPage();
  observeErrors(page, "scorecard", errors);
  let payload;
  await page.route("https://auto.zippylens.com/webhook/scorecard-submit", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto(`${origin}/renewal-scorecard/?t=test%2Bscorecard%40swotbee.com`, { waitUntil: "networkidle" });
  const values = [0, 1, 2, 3, 2, 2];
  const dimensions = page.locator(".sc-dim");
  for (let index = 0; index < values.length; index += 1) {
    await dimensions.nth(index).locator(`[data-val="${values[index]}"]`).click();
  }
  const submit = page.locator("#sc-submit");
  assert(await submit.isEnabled(), "Scorecard did not enable after all answers");
  await submit.click();
  await page.locator("#sc-results").waitFor({ state: "visible" });
  await page.waitForFunction(() => document.querySelector("#sc-saved")?.textContent?.includes("scores are saved"));
  const guideHrefs = await page.locator("#sc-weakest-list a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  const completed = await analyticsEvents(page, "scorecard_completed");
  const result = {
    grade: (await page.locator("#sc-r-grade").textContent())?.trim(),
    total: (await page.locator("#sc-r-total").textContent())?.trim(),
    guideHrefs,
    payload,
    analytics: completed.at(-1),
  };
  assert(result.grade === "C" && result.total === "10", "Scorecard produced the wrong result");
  assert(payload?.token === "test+scorecard@swotbee.com", "Scorecard token encoding changed");
  assert(payload?.total === 10 && payload?.grade === "C", "Scorecard capture payload is wrong");
  assert(result.analytics?.grade === "C" && result.analytics?.total === 10, "Scorecard analytics event is wrong");
  await context.close();
  return result;
}

async function collectSite(browser, origin) {
  const errors = [];
  const snapshot = {
    home: await collectHome(browser, origin, errors),
    mobileNavigation: await collectMobileNavigation(browser, origin, errors),
    booking: await collectBooking(browser, origin, errors),
    attributionAndForm: await collectAttributionAndForm(browser, origin, errors),
    scorecard: await collectScorecard(browser, origin, errors),
    errors,
  };
  assert(errors.length === 0, `Browser errors: ${errors.join(" | ")}`);
  return snapshot;
}

async function main() {
  const directories = parseArgs(process.argv);
  const servers = [
    { name: "before", cwd: directories.before, port: 4420 },
    { name: "after", cwd: directories.after, port: 4421 },
  ].map((site) => ({
    ...site,
    origin: `http://127.0.0.1:${site.port}`,
    child: spawn(process.execPath, ["scripts/serve-dist.mjs", "--port", String(site.port)], {
      cwd: site.cwd,
      stdio: ["ignore", "pipe", "pipe"],
    }),
  }));

  let browser;
  try {
    await Promise.all(servers.map((server) => waitFor(server.origin)));
    browser = await chromium.launch({ headless: true });
    const before = await collectSite(browser, servers[0].origin);
    const after = await collectSite(browser, servers[1].origin);
    if (JSON.stringify(before) !== JSON.stringify(after)) {
      console.error("[interaction-parity] Astro 6 and Astro 7 snapshots differ");
      console.error(JSON.stringify({ before, after }, null, 2));
      process.exitCode = 1;
    } else {
      console.log("[interaction-parity] equivalent suites=5 browser-errors=0 external-submissions=0");
    }
  } finally {
    if (browser) await browser.close();
    for (const server of servers) server.child.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(`[interaction-parity] ${error.message}`);
  process.exit(2);
});
