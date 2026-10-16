# Guide: Playwright Web Scraping with a Cloud Browser

Scrape JavaScript-heavy sites with the managed headless Chromium in Upstash Box. Create a box with `browser: true` and get a managed Chromium that boots on first use (nothing to install, no `apt-get`). Read rendered pages through the SDK, extract structured data against a schema, then connect Playwright over CDP to harvest many pages deterministically.

## Signature / Usage

```bash
npm install @upstash/box playwright-core zod
```

```bash
# .env
UPSTASH_BOX_API_KEY=box_xxxxxxxxxxxxxxxxxxxxxxxx
```

Create a box with a browser and read the rendered page (no model involved, no tokens):

```typescript
import "dotenv/config"
import { Box } from "@upstash/box"

const box = await Box.create({
  runtime: "node",
  browser: true,
})

const tab = await box.browser.tab.create("https://books.toscrape.com", {
  waitUntil: "domcontentloaded",
})

const page = await tab.content()
console.log(page.title)
console.log(page.text.slice(0, 200))
for (const link of page.links ?? []) {
  console.log(link.text, link.href)
}
```

Extract typed data with a Zod schema (`extract()` hands the page to a DOM-aware agent in the box; the result is parsed with your schema):

```typescript
import { z } from "zod"

const catalog = await tab.extract(
  "extract every book in the listing with its title and price",
  z.object({
    books: z.array(
      z.object({
        title: z.string(),
        price: z.string(),
      }),
    ),
  }),
)
```

Scrape many pages deterministically with Playwright over CDP (`cdpUrl()` returns an authenticated WebSocket URL):

```typescript
import { chromium } from "playwright-core"

const browser = await chromium.connectOverCDP(await box.browser.cdpUrl())

try {
  const ctx = browser.contexts()[0] ?? (await browser.newContext())
  const p = await ctx.newPage()

  const books: { title: string | null; price: string | null }[] = []

  for (let n = 1; n <= 3; n++) {
    await p.goto(`https://books.toscrape.com/catalogue/page-${n}.html`, {
      waitUntil: "domcontentloaded",
    })

    books.push(
      ...(await p.$$eval("article.product_pod", (rows) =>
        rows.map((row) => ({
          title: row.querySelector("h3 a")?.getAttribute("title") ?? null,
          price: row.querySelector(".price_color")?.textContent?.trim() ?? null,
        })),
      )),
    )
  }
} finally {
  await browser.close()
}
```

Compile the selectors once, then scrape for free: ask `tab.extract()` for a recipe schema (`itemSelector`, `title` / `price` field specs with CSS `selector` relative to the container and `attr`), cache it on the box with `box.files.write`, and run every later scrape with `p.$$eval(recipe.itemSelector, ...)` and zero model tokens. Full script: the official page and the upstash/box `02-ai-compiled-scraper.ts` example.

Reuse the box across runs:

```typescript
const box = process.env.SCRAPER_BOX_ID
  ? await Box.get(process.env.SCRAPER_BOX_ID)
  : await Box.create({ runtime: "node", browser: true })

await box.delete() // when done with the target site
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Box.create({ browser: true })` | `boolean` | Provisions the managed Chromium; only possible at box creation, cannot be enabled on an existing box |
| `box.browser.tab.create(url, { waitUntil })` | — | Opens a tab; handle is addressed by its CDP target id, so it stays valid across navigations; re-attach with `box.browser.getTab(id)` |
| `tab.content()` | — | Returns title, URL, visible text, and links from the real DOM (including JS-rendered content) |
| `tab.extract(prompt, zodSchema)` | — | LLM-backed, metered extraction validated against the schema; needs a model provider key on the box or account |
| `tab.screenshot({ fullPage })` | — | Screenshot (returns bytes) |
| `box.browser.cdpUrl()` | — | Authenticated WebSocket URL accepted by `chromium.connectOverCDP` |
| `box.browser.listTabs()` | — | Lists tabs, including pages opened by Playwright over CDP |

## Notes

- Official guide was rewritten: it now uses the managed browser (`browser: true`) instead of installing Playwright and Chromium with `exec.command`, and the old manual `npx playwright install chromium --with-deps` + snapshot structure is gone
- Migrating an existing Playwright script is usually a single line: `chromium.launch()` becomes `chromium.connectOverCDP(await box.browser.cdpUrl())`
- The CDP URL carries its auth token; anyone who has it gets full control of the browser, so treat it as a secret
- CDP and the SDK drive the same browser and tabs, so scripted and AI steps can be mixed in one run
- Client-rendered pages can hydrate after `domcontentloaded`; if `page.text` is short, wait and call `content()` again
- Keep a tab open during CDP scraping: closing the last tab shuts the browser down and the CDP connection fails with `The browser is shutting down`
- Validate the harvest on every run (row count, non-empty fields, price format); when it fails the layout changed, so recompile the recipe with one `extract` call
- A browser box has nothing to install, so there is no setup to snapshot; keep the box id to preserve cached recipes, cookies, and logged-in sessions. The box pauses when idle and bills until deleted

## Related

- [Browser Overview](./browser-overview.md)
- [Browser: Connect over CDP](./browser-connect.md)
- [Browser: AI Actions](./browser-ai-actions.md)
- [Snapshots](./snapshots.md)
