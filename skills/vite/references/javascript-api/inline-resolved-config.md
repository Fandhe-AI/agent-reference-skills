---
source: https://vite.dev/guide/api-javascript#inlineconfig
---

# InlineConfig / ResolvedConfig

`InlineConfig` is the config object accepted by the JavaScript APIs; `ResolvedConfig` is the resolved form exposed on servers and to plugins.

## Signature / Usage

```ts
import { createServer } from 'vite'

// InlineConfig = UserConfig + `configFile`
const server = await createServer({
  configFile: false, // disable automatic config file resolving
  server: { port: 1337 },
})

// ResolvedConfig is available as `server.config`
server.config.logger
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `InlineConfig.configFile` | `string \| false` | Config file to use. If not set, Vite tries to automatically resolve one from project root. Set to `false` to disable auto resolving. |
| `ResolvedConfig.assetsInclude` | function | Checks if an `id` is considered an asset. |
| `ResolvedConfig.logger` | object | Vite's internal logger object. |

## Notes

- `InlineConfig` extends `UserConfig` with additional properties (`configFile`; `mode` is also accepted as shown in the `createServer` example).
- `ResolvedConfig` has all the same properties of a `UserConfig`, except most properties are resolved and non-undefined.
- The Type for `configFile` is not stated in the docs prose beyond "set to `false` to disable"; the `string | false` form above follows that description.

## Related

- [createServer](./create-server.md)
- [resolveConfig](./resolve-config.md)
- [Configuring Vite](../config-shared/configuring-vite.md)
