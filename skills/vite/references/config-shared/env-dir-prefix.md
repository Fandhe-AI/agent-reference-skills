---
source: https://vite.dev/config/shared-options#envdir
---

# envDir / envPrefix

Where `.env` files are loaded from, and which env variables are exposed to client code.

## Signature / Usage

```js
define: {
  'import.meta.env.ENV_VARIABLE': JSON.stringify(process.env.ENV_VARIABLE)
}
```

(Use `define` to expose an unprefixed variable instead of widening `envPrefix`.)

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `envDir` | `string \| false` | `root` | Directory from which `.env` files are loaded. Absolute path, or relative to the project root. `false` disables `.env` file loading. |
| `envPrefix` | `string \| string[]` | `VITE_` | Env variables starting with `envPrefix` are exposed to client source code via `import.meta.env`. |

## Notes

- Security: `envPrefix` should not be set to `''`, which would expose all env variables and leak sensitive information. Vite throws an error when it detects `''`.

## Related

- [Env variables](../assets-env/env-variables.md)
- [Using Environment Variables in Config](./env-in-config.md)
- [define](./define.md)
