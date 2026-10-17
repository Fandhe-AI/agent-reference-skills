---
source: https://vite.dev/guide/api-plugin#transformindexhtml
---

# transformIndexHtml

Dedicated hook for transforming HTML entry point files such as `index.html`.

## Signature / Usage

```ts
type IndexHtmlTransformHook = (
  html: string,
  ctx: {
    path: string
    filename: string
    server?: ViteDevServer
    bundle?: import('rolldown').OutputBundle
    chunk?: import('rolldown').OutputChunk
    originalUrl?: string
  },
) =>
  | IndexHtmlTransformResult
  | void
  | Promise<IndexHtmlTransformResult | void>

type IndexHtmlTransformResult =
  | string
  | HtmlTagDescriptor[]
  | {
      html: string
      tags: HtmlTagDescriptor[]
    }

interface HtmlTagDescriptor {
  tag: string
  /**
   * attribute values will be escaped automatically if needed
   */
  attrs?: Record<string, string | boolean>
  children?: string | HtmlTagDescriptor[]
  /**
   * default: 'head-prepend'
   */
  injectTo?: 'head' | 'body' | 'head-prepend' | 'body-prepend'
}
```

```js
const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace(
        /<title>(.*?)<\/title>/,
        `<title>Title replaced!</title>`,
      )
    },
  }
}
```

## Options / Props

Hook type: `IndexHtmlTransformHook | { order?: 'pre' | 'post', handler: IndexHtmlTransformHook }`

| Name | Type | Description |
|------|------|-------------|
| order | `'pre' \| 'post' \| undefined` | `undefined` (default): applied after the HTML has been transformed. `'pre'`: applied before processing the HTML (for scripts that should go through the Vite plugins pipeline). `'post'`: applied after all hooks with `order` undefined. |

Kind: `async`, `sequential`. Scope: Per-environment.

## Notes

- The context exposes the `ViteDevServer` instance during dev, and the Rollup output bundle during build.
- Return value can be a transformed HTML string, an array of tag descriptors (`{ tag, attrs, children }`) to inject (default: prepended to `<head>`), or `{ html, tags }`.
- This hook is not called if you use a framework that has custom handling of entry files (for example SvelteKit).

## Related

- [handleHotUpdate](./hook-handle-hot-update.md)
