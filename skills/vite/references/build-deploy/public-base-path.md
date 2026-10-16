---
source: https://vite.dev/guide/build#public-base-path
---

# Public Base Path

Set the `base` config option (or `--base` CLI flag) when deploying under a nested public path; asset paths are rewritten accordingly.

## Signature / Usage

```bash
vite build --base=/my/public/path/
```

```js
// relative base: all generated URLs are relative to each file
export default defineConfig({
  base: './', // or ''
})
```

## Notes

- JS-imported asset URLs, CSS `url()` references, and asset references in `.html` files are all automatically adjusted to respect `base` during build.
- When URLs must be concatenated dynamically, use the globally injected `import.meta.env.BASE_URL` (the public base path). It is statically replaced during build, so it must appear exactly as-is (`import.meta.env['BASE_URL']` won't work).
- Relative base: if the base path is not known in advance, set `"base": "./"` or `"base": ""`. This makes all generated URLs relative to each file.
- Relative bases require `import.meta` support. For browsers that do not support `import.meta`, use the `legacy` plugin (@vitejs/plugin-legacy).
- For advanced base path control, see advanced-base-options.md.

## Related

- [Advanced Base Options](./advanced-base-options.md)
- [Browser Compatibility](./browser-compatibility.md)
- [GitHub Pages / GitLab Pages](./deploy-github-gitlab.md)
