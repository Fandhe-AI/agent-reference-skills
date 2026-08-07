# Browser: Connect over CDP

The box browser is a real Chromium; `box.browser.cdpUrl()` returns an authenticated Chrome DevTools Protocol WebSocket URL that Playwright, Puppeteer, or Stagehand can connect to directly — nothing to install or manage.

## Signature / Usage

```typescript
const cdpUrl = await box.browser.cdpUrl()
// wss://...?token=...

import { chromium } from "playwright-core"
const browser = await chromium.connectOverCDP(cdpUrl)
const context = browser.contexts()[0] ?? (await browser.newContext())
const page = context.pages()[0] ?? (await context.newPage())
await page.goto("https://upstash.com")
```

```python
cdp_url = box.browser.cdp_url()

from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.connect_over_cdp(cdp_url)
    context = browser.contexts[0] if browser.contexts else browser.new_context()
    page = context.pages[0] if context.pages else context.new_page()
    page.goto("https://upstash.com")
```

```typescript
// Puppeteer
import puppeteer from "puppeteer-core"
const browser = await puppeteer.connect({ browserWSEndpoint: cdpUrl })

// Stagehand
import { Stagehand } from "@browserbasehq/stagehand"
const stagehand = new Stagehand({ env: "LOCAL", localBrowserLaunchOptions: { cdpUrl } })
await stagehand.init()
```

## Notes

- Like Live View URLs, the CDP URL carries its auth token in the URL — anyone with it gets full control of the browser; treat it as a secret
- `playwright-core` (not full `playwright`) is enough since you connect to the box's Chromium instead of launching one locally
- CDP clients and the SDK drive the same browser and tabs: a page opened by Playwright shows up in `box.browser.listTabs()`, and an SDK-created tab is visible to Playwright — script predictable steps with Playwright and hand off to AI Actions for steps easier to describe in natural language
- Rule of thumb: use CDP for precise, repeatable scripting with no LLM in the loop; use AI Actions when describing the task is easier than scripting it

## Related

- [Browser Overview](./browser-overview.md)
- [AI Actions](./browser-ai-actions.md)
- [Security & Secrets](./security.md)
