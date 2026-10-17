---
source: https://vite.dev/guide/api-javascript#mergeconfig
---

# mergeConfig

Deeply merges two Vite configs.

## Signature / Usage

```ts
function mergeConfig(
  defaults: Record<string, any>,
  overrides: Record<string, any>,
  isRoot = true,
): Record<string, any>
```

Merging a callback-form config with an object-form config:

```ts
import {
  defineConfig,
  mergeConfig,
  type UserConfigFnObject,
  type UserConfig,
} from 'vite'
declare const configAsCallback: UserConfigFnObject
declare const configAsObject: UserConfig

// ---cut---
export default defineConfig((configEnv) =>
  mergeConfig(configAsCallback(configEnv), configAsObject),
)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| defaults | `Record<string, any>` | — | Base config. |
| overrides | `Record<string, any>` | — | Config merged over `defaults`. |
| isRoot | boolean | `true` | Level within the Vite config being merged. Set `false` when merging two `build` options, for example. |

## Notes

- `null` and `undefined` values in `overrides` are skipped and not merged. To explicitly clear a value from `defaults`, modify the result of `mergeConfig` directly.
- `mergeConfig` accepts only config in object form. A callback-form config must be called before passing it in; use `defineConfig` as above to merge a callback-form config with another config.

## Related

- [Configuring Vite](../config-shared/configuring-vite.md)
- [Conditional / Async Config](../config-shared/conditional-async-config.md)
