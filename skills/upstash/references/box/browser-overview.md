# Browser

Create a box with `browser: true` to get a managed, headless Chromium controlled through the SDK: open tabs, read pages, screenshot, extract structured data, run AI agents on the live DOM, record sessions, and connect Playwright/Puppeteer directly over CDP.

## Signature / Usage

```typescript
import { Box } from "@upstash/box"

const box = await Box.create({ runtime: "node", browser: true })

// Open a tab (boots Chromium on first use)
const tab = await box.browser.tab.create("https://news.ycombinator.com")

// Navigate the same tab and read the result
const page = await tab.goto("https://upstash.com/docs")
console.log(page.title)
```

```python
from upstash_box import Box

box = Box.create(runtime="node", browser=True)

tab = box.browser.tab.create("https://news.ycombinator.com")

page = tab.goto("https://upstash.com/docs")
print(page.title)
```

## Notes

- The browser can only be provisioned at box creation; it cannot be enabled on an existing box — create a new box with `browser: true` instead
- `box.browser` manages the browser itself (opening/listing tabs, recordings, the CDP endpoint); page-level operations live on a `Tab` handle returned by `tab.create`, `listTabs`, or `getTab`, addressed by its CDP target id so it stays valid across navigations
- AI-powered operations (`extract`, `observe`, `act`, `run`) use an LLM and are metered; they need a provider API key (Anthropic, OpenAI, OpenRouter, Vercel, or OpenCode) on the box or account
- Everything is headless — no desktop, no VNC, nothing to install; also viewable/controllable from the **Browser** tab in the Upstash Console

## Related

- [Tabs & Navigation](./browser-tabs.md)
- [Reading Pages](./browser-reading-pages.md)
- [AI Actions](./browser-ai-actions.md)
- [Live View](./browser-live-view.md)
- [Recordings](./browser-recordings.md)
- [Connect over CDP](./browser-connect.md)
