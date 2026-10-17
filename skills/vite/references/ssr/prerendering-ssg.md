---
source: https://vite.dev/guide/ssr#pre-rendering-ssg
---

# Pre-Rendering / SSG

Routes and data known ahead of time can be pre-rendered to static HTML with the same logic as production SSR (a form of Static-Site Generation).

## Signature / Usage

```json
{
  "scripts": {
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --outDir dist/server --ssr src/entry-server.js"
  }
}
```

## Notes

- The page contains no inline code example for pre-rendering; the snippet above is the SSR build script pair from Building for Production, which pre-rendering reuses.
- The page links a working pre-render script: https://github.com/vitejs/vite-plugin-vue/blob/main/playground/ssr-vue/prerender.js

## Related

- [Building SSR for Production](./ssr-production-build.md)
