# Supported Platforms

Upstash Workflow natively supports a list of JavaScript / TypeScript and Python platforms; other platforms can use the base `serve` method.

## Signature / Usage

```javascript
import { serve } from "@upstash/workflow";
```

```python
from upstash_workflow import serve, async_serve
```

## Options / Props

| Language | Platforms (quickstart page) |
|----------|-----------------------------|
| JavaScript / TypeScript | Next.js, Cloudflare Workers, Nuxt (H3), Solid.js, Svelte, Hono, Express.js, Astro, TanStack Start |
| Python | FastAPI, Next.js & FastAPI, Flask, Next.js & Flask |

## Notes

- For a platform not listed, use the base `serve` method and adjust it for the platform; the platform-specific implementations are in `upstash/workflow-js` (`platforms`) and `upstash/workflow-py`
- Source: https://upstash.com/docs/workflow/quickstarts/platforms (fetched 2026-11-14; no version pin on the site)

## Related

- [quickstart-nextjs](./quickstart-nextjs.md)
- [serve](./serve.md)
- [overview](./overview.md)
