---
source: https://vite.dev/guide/api-javascript#version
---

# version / rolldownVersion / esbuildVersion / rollupVersion

String constants exported by `vite` describing versions.

## Signature / Usage

```ts
import { version, rolldownVersion } from 'vite'

console.log(version) // e.g. "8.0.0"
console.log(rolldownVersion) // e.g. "1.0.0"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `version` | `string` | The current version of Vite as a string (e.g. `"8.0.0"`). |
| `rolldownVersion` | `string` | The version of Rolldown used by Vite (e.g. `"1.0.0"`). A re-export of `VERSION` from `rolldown`. |
| `esbuildVersion` | `string` | Only kept for backward compatibility. |
| `rollupVersion` | `string` | Only kept for backward compatibility. |

## Notes

- `esbuildVersion` and `rollupVersion` are retained only for backward compatibility (Vite v8 uses Rolldown).
