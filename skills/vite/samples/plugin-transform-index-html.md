---
source: https://vite.dev/guide/api-plugin#transformindexhtml
---

# Plugin: transformIndexHtml

Rewrite the HTML entry file from a plugin.

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

## Notes

- The hook may return a string, an array of tag descriptors `{ tag, attrs, children, injectTo }` (default `injectTo` is `'head-prepend'`), or `{ html, tags }`.
- Use `{ order: 'pre' | 'post', handler }` to run before HTML processing or after hooks with `order` undefined.
- The hook is not called when a framework has custom handling of entry files (e.g. SvelteKit).
