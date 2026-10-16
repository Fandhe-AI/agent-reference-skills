---
source: https://vite.dev/guide/env-and-mode#html-constant-replacement
---

# HTML Constant Replacement

Any property of `import.meta.env` can be used in HTML files with the `%CONST_NAME%` syntax.

## Signature / Usage

```html
<h1>Vite is running in %MODE%</h1>
<p>Using data from %VITE_API_URL%</p>
```

## Notes

- If the env does not exist in `import.meta.env` (e.g. `%NON_EXISTENT%`), it is ignored and not replaced, unlike `import.meta.env.NON_EXISTENT` in JS, which is replaced as `undefined`.
- Vite is intentionally unopinionated about complex replacements such as conditionals. Extend it with an existing userland plugin or a custom plugin implementing the `transformIndexHtml` hook.

## Related

- [env-variables.md](./env-variables.md)
- [built-in-constants.md](./built-in-constants.md)
- [../plugin-api/hook-transform-index-html.md](../plugin-api/hook-transform-index-html.md)
- [../features/html.md](../features/html.md)
