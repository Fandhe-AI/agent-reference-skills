---
source: https://vite.dev/config/build-options#build-ssr
---

# build.ssr / emitAssets / ssrEmitAssets

SSR-oriented build and forced emission of static assets in non-client builds.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    ssr: 'src/entry-server.js',
    emitAssets: false,
    ssrEmitAssets: false,
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.ssr` | `boolean \| string` | `false` | Produce an SSR-oriented build. A string directly specifies the SSR entry; `true` requires the entry via `input` or `build.rolldownOptions.input` |
| `build.emitAssets` | `boolean` | `false` | In non-client builds static assets are not emitted (assumed emitted by the client build). Lets frameworks force emitting them in other environment builds; the framework must merge assets in a post build step |
| `build.ssrEmitAssets` | `boolean` | `false` | Same, for the SSR build: force emitting assets in both client and SSR builds. Will be replaced by `build.emitAssets` once Environment API is stable |

## Notes

- This is the Vite build option for SSR. Framework-level SSR is covered by the react-router, tanstack-start, tanstack-router and nextjs-app skills.

## Related

- [build-manifest.md](./build-manifest.md)
- [build-rolldown-options.md](./build-rolldown-options.md)
