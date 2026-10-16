---
source: https://vite.dev/config/shared-options#tsconfig
---

# tsconfig

Path to the TypeScript configuration file used by Vite.

## Signature / Usage

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  tsconfig: '<path-to-tsconfig>', // placeholder; relative paths resolve from `root`
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `tsconfig` | `string` | Path to the tsconfig used by Vite. Relative paths are resolved from `root`. When unset, Vite discovers the closest matching `tsconfig.json` for each file. |

## Notes

- Setting this option is discouraged: it overrides Vite's per-file tsconfig discovery, which is aligned with the TypeScript language server. Prefer placing a `tsconfig.json` near the files it configures and using TypeScript `references` for multi-project setups.
- To remap imports, prefer `resolve.alias` or the `imports` / `exports` fields in `package.json` instead of selecting a tsconfig solely for `compilerOptions.paths`. Use this option only when automatic discovery cannot identify the intended configuration.

## Related

- [resolve.* options](./resolve-options.md)
- [TypeScript](../features/typescript.md)
