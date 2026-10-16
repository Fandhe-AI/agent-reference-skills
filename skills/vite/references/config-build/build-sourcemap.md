---
source: https://vite.dev/config/build-options#build-sourcemap
---

# build.sourcemap

Generate production source maps.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: 'hidden',
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.sourcemap` | `boolean \| 'inline' \| 'hidden'` | `false` | `true`: separate sourcemap file. `'inline'`: appended to the output file as a data URI. `'hidden'`: like `true` but the sourcemap comments in the bundled files are suppressed |

## Related

- [build-minify.md](./build-minify.md)
