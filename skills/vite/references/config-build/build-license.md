---
source: https://vite.dev/config/build-options#build-license
---

# build.license

Generate a license file for bundled dependencies.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    license: true,
    rolldownOptions: {
      output: {
        postBanner:
          '/* See licenses of bundled dependencies at https://example.com/license.md */',
      },
    },
  },
})
```

With `fileName` ending in `.json`, raw JSON metadata is generated:

```json
[
  {
    "name": "dep-1",
    "version": "1.2.3",
    "identifier": "CC0-1.0",
    "text": "CC0 1.0 Universal\n\n..."
  },
  {
    "name": "dep-2",
    "version": "4.5.6",
    "identifier": "MIT",
    "text": "MIT License\n\n..."
  }
]
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.license` | `boolean \| { fileName?: string }` | `false` | `true` generates `.vite/license.md` with all bundled dependencies' licenses. `fileName` is relative to `outDir`; if it ends with `.json`, JSON metadata is generated instead |

## Notes

- To reference the license file in built code, use `build.rolldownOptions.output.postBanner` to inject a comment at the top of files, as in the snippet above.

## Related

- [build-rolldown-options.md](./build-rolldown-options.md)
- [build-manifest.md](./build-manifest.md)
