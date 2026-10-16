---
source: https://vite.dev/guide/build#advanced-base-options
---

# Advanced Base Options (experimental.renderBuiltUrl)

Experimental support for separate base paths for entry HTML, hashed assets, and copied public files during build, via `experimental.renderBuiltUrl`.

## Signature / Usage

```ts
experimental: {
  renderBuiltUrl(filename, { hostType }) {
    if (hostType === 'js') {
      return { runtime: `window.__toCdnUrl(${JSON.stringify(filename)})` }
    } else {
      return { relative: true }
    }
  },
},
```

Per-group options using the asset `type` in the second `context` parameter:

```ts
experimental: {
  renderBuiltUrl(filename, { hostId, hostType, type }) {
    if (type === 'public') {
      return 'https://www.domain.com/' + filename
    } else if (path.extname(hostId) === '.js') {
      return {
        runtime: `window.__assetsPath(${JSON.stringify(filename)})`
      }
    } else {
      return 'https://cdn.domain.com/assets/' + filename
    }
  },
},
```

## Notes

- Experimental. Feedback: https://github.com/vitejs/vite/discussions/13834
- Use case: deployed assets and public files may live in different paths (for example to use different cache strategies). A user may deploy three groups in different paths: the generated entry HTML files (possibly processed during SSR), the generated hashed assets (JS, CSS, images, etc.), and the copied public files. A single static `base` is not enough in these scenarios.
- The `filename` passed is a decoded URL; a returned URL string should also be decoded. Vite handles encoding when rendering URLs. If an object with `runtime` is returned, handle encoding yourself where needed, since the runtime code is rendered as is.

## Related

- [Public Base Path](./public-base-path.md)
