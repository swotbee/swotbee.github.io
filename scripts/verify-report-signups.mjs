#!/usr/bin/env node

import { chromium } from "playwright";

const REPORT_PAGES = [
  ["/hubspot-aeo-reporting-export/", "hubspot_aeo_reporting_export"],
  ["/hubspot-revenue-forecast-goal-roi-reporting/", "hubspot_revenue_forecast_goal_roi_reporting"],
  ["/hubspot-sales-pipeline-reporting/", "sales_pipeline_reporting"],
  ["/hubspot-service-hub-performance-report/", "service_hub_performance_report"],
];

function usage() {
  console.log(`Usage: pnpm check:report-signups -- [options]

Checks all deployed report pages in a real browser. By default it is read-only:
it verifies rendering, page-specific metadata, and invalid-email recovery without
calling the signup webhook.

Options:
  --url <url>          Deployment base URL (default: https://www.swotbee.com)
  --submit             Make one real HubSpot/Slack-backed signup submission
  --email <email>      Required with --submit; use a clearly labelled test address
  --submit-page <path> Page used for the live submission
                       (default: /hubspot-aeo-reporting-export/)
  --headed             Show the browser while the test runs
  -h, --help           Show this help

Examples:
  pnpm check:report-signups
  pnpm check:report-signups -- --url https://www.swotbee.com
  pnpm check:report-signups -- --submit --headed --email info+report-signup-smoke@swotbee.com
`);
}

function parseArgs(argv) {
  const options = {
    url: process.env.REPORT_SIGNUP_BASE_URL || "https://www.swotbee.com",
    email: process.env.REPORT_SIGNUP_TEST_EMAIL || "",
    submit: false,
    submitPage: "/hubspot-aeo-reporting-export/",
    headed: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--") continue;
    else if (arg === "--url") options.url = argv[++index];
    else if (arg === "--email") options.email = argv[++index];
    else if (arg === "--submit-page") options.submitPage = argv[++index];
    else if (arg === "--submit") options.submit = true;
    else if (arg === "--headed") options.headed = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function pageUrl(baseUrl, path) {
  return new URL(path, `${baseUrl.replace(/\/$/, "")}/`).toString();
}

async function verifyPage(browser, baseUrl, [path, offerCode]) {
  const page = await browser.newPage();
  const webhookRequests = [];
  page.on("request", (request) => {
    if (request.method() === "POST" && request.url().includes("swotbee-form-submit")) {
      webhookRequests.push(request.url());
    }
  });

  try {
    const response = await page.goto(pageUrl(baseUrl, path), {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    assert(response?.ok(), `${path} returned HTTP ${response?.status() || "unknown"}`);

    const form = page.locator("form[data-report-signup]");
    await form.waitFor({ state: "visible", timeout: 15_000 });
    assert(await form.count() === 1, `${path} should contain exactly one report signup form`);
    assert(await form.getAttribute("data-offer-code") === offerCode, `${path} has the wrong offer code`);
    assert(await form.getAttribute("data-source-page") === path.replace(/^\//, "").replace(/\/$/, ""), `${path} has the wrong source page`);

    const email = form.locator('input[name="email"]');
    const button = form.locator('button[type="submit"]');
    await email.fill("not-an-email");
    await form.evaluate((element) => {
      element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    const alert = form.locator('[role="alert"]');
    await alert.waitFor({ state: "visible", timeout: 5_000 });
    assert((await alert.textContent())?.includes("valid work email"), `${path} did not show the expected email error`);
    assert(await button.isEnabled(), `${path} left the submit button disabled after validation`);
    assert(webhookRequests.length === 0, `${path} called the webhook for an invalid email`);
    console.log(`[report-signup] PASS ${path}`);
  } finally {
    await page.close();
  }
}

async function submitLive(browser, options) {
  const knownPage = REPORT_PAGES.find(([path]) => path === options.submitPage);
  assert(knownPage, `Unknown --submit-page: ${options.submitPage}`);

  const page = await browser.newPage();
  const url = pageUrl(options.url, options.submitPage);
  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    assert(response?.ok(), `${options.submitPage} returned HTTP ${response?.status() || "unknown"}`);

    const form = page.locator("form[data-report-signup]");
    await form.waitFor({ state: "visible", timeout: 15_000 });
    await page.waitForFunction(() => typeof window.__sbRecaptchaToken === "function", null, { timeout: 20_000 });
    await form.locator('input[name="email"]').fill(options.email);

    const webhookResponse = page.waitForResponse(
      (candidate) => candidate.request().method() === "POST" && candidate.url().includes("swotbee-form-submit"),
      { timeout: 30_000 },
    );
    await form.locator('button[type="submit"]').click();
    const result = await webhookResponse;
    if (!result.ok()) {
      const detail = (await result.text()).replace(/\s+/g, " ").trim().slice(0, 300);
      if (result.status() === 400 && detail.includes("verification_failed")) {
        throw new Error(
          "Production reCAPTCHA rejected the automated browser. Retry on a workstation with --headed; do not lower the production score threshold.",
        );
      }
      throw new Error(`Signup webhook returned HTTP ${result.status()}${detail ? `: ${detail}` : ""}`);
    }

    const terminal = page.locator(`#report-signup-terminal-${knownPage[1]}`);
    await terminal.waitFor({ state: "visible", timeout: 15_000 });
    assert((await terminal.textContent())?.includes("Your app signup is saved"), "Signup success state was not shown");
    console.log(`[report-signup] LIVE PASS ${options.submitPage} (${options.email})`);
  } finally {
    await page.close();
  }
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`[report-signup] ${error.message}`);
    usage();
    process.exitCode = 2;
    return;
  }

  if (options.help) {
    usage();
    return;
  }
  if (options.submit && !/^\S+@\S+\.\S+$/.test(options.email)) {
    console.error("[report-signup] --submit requires a valid --email or REPORT_SIGNUP_TEST_EMAIL.");
    process.exitCode = 2;
    return;
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: !options.headed });
    for (const reportPage of REPORT_PAGES) {
      await verifyPage(browser, options.url, reportPage);
    }
    if (options.submit) await submitLive(browser, options);
    else console.log("[report-signup] Read-only checks complete. Add --submit and --email for one live submission.");
  } catch (error) {
    console.error(`[report-signup] FAIL ${error.message}`);
    if (error.message.includes("Executable doesn't exist")) {
      console.error("[report-signup] Retry with: pnpm exec playwright install chromium");
    }
    process.exitCode = 1;
  } finally {
    await browser?.close();
  }
}

await main();
