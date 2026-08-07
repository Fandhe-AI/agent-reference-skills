# Browser: Reading Pages

Three ways to get data out of a tab: read the DOM as text, capture a screenshot, or have an AI agent extract structured data against a schema.

## Signature / Usage

```typescript
const { title, url, text, links } = await tab.content()

const png = await tab.screenshot({ fullPage: true })      // Uint8Array
const b64 = await tab.screenshot({ type: "base64" })       // base64 string

import { z } from "zod"
const article = await tab.extract(
  "extract the article title and author",
  z.object({ title: z.string(), author: z.string() }),
)
```

```python
content = tab.content()

png = tab.screenshot(full_page=True)
b64 = tab.screenshot(encoding="base64")

from pydantic import BaseModel
class Article(BaseModel):
    title: str
    author: str

article = tab.extract("extract the article title and author", Article)
```

## Options / Props

| Method | Description |
|--------|-------------|
| `content()` | Reads current title, URL, visible text, and links from the real DOM (including JS-rendered content) |
| `screenshot({ fullPage?, type? })` | Captures a PNG screenshot; `fullPage: true` captures the entire scrollable page instead of the viewport; `type: "base64"` returns base64 instead of raw bytes |
| `extract(instruction, schema)` | AI-extracts structured data validated against a Zod schema (v3/v4) in TS, or a pydantic model/JSON schema dict in Python |

## Notes

- `extract` uses an LLM and is metered; needs a provider API key on the box or account, and accepts an optional `model` override like the other AI Actions
- Screenshots work headless with no display needed

## Related

- [Browser Overview](./browser-overview.md)
- [AI Actions](./browser-ai-actions.md)
- [Tabs & Navigation](./browser-tabs.md)
