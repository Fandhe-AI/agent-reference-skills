---
source: https://vite.dev/guide/api-javascript#loadenv
---

# loadEnv

Loads `.env` files within `envDir` and merges them with matching variables already in `process.env`.

## Signature / Usage

```ts
function loadEnv(
  mode: string,
  envDir: string,
  prefixes: string | string[] = 'VITE_',
): Record<string, string>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| mode | string | — | Mode used to pick `.env.[mode]` files. |
| envDir | string | — | Directory containing the `.env` files. |
| prefixes | `string \| string[]` | `'VITE_'` | Only env variables with these prefixes are loaded. |

## Notes

- By default, only env variables prefixed with `VITE_` are loaded, unless `prefixes` is changed.
- This is Vite's `.env` loader. The `NEXT_PUBLIC_` convention of nextjs-app and the environment variable handling of tanstack-start are separate mechanisms.

## Related

- [Env Variables and .env Files](../assets-env/env-variables.md)
- [Using Environment Variables in Config](../config-shared/env-in-config.md)
