---
source: https://vite.dev/guide/features#license
---

# License

Vite can generate a file of all dependency licenses used in the build with the `build.license` option.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    license: true,
  },
})
```

This generates a `.vite/license.md` file such as:

```md
# Licenses

The app bundles dependencies which contain the following licenses:

## dep-1 - 1.2.3 (CC0-1.0)

CC0 1.0 Universal

...

## dep-2 - 4.5.6 (MIT)

MIT License

...
```

## Notes

- To serve the file at a different path pass `{ fileName: 'license.md' }`, so it is served at `https://example.com/license.md`. See the `build.license` docs for details.

## Related

- [build.license](../config-build/build-license.md)
