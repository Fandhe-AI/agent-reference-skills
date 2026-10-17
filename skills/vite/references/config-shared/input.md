---
source: https://vite.dev/config/shared-options#input
---

# input

Entry points of the application, resolved relative to the project root.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  input: 'src/main.ts',
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `input` | `string \| string[] \| { [entryAlias: string]: string }` | Entry points, resolved relative to the project root. |

## Notes

- Not inherited by environments.
- Works as the default for `build.rolldownOptions.input`, `build.lib.entry`, `build.ssr` (if `true`), and `optimizeDeps.entries` when those are not set explicitly.
- Useful when the application has no `index.html` entry: declare the entry once instead of repeating it.

## Related

- [root / base / mode](./root-base-mode.md)
- [build.rolldownOptions](../config-build/build-rolldown-options.md)
- [build.lib](../config-build/build-lib.md)
