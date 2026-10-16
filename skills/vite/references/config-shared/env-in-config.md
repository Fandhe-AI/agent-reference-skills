---
source: https://vite.dev/config/#using-environment-variables-in-config
---

# Using Environment Variables in Config

While the config is evaluated, only variables already present in `process.env` are available. Use `loadEnv` to read `.env*` files inside the config.

## Signature / Usage

```js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      // Provide an explicit app-level constant derived from an env var.
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    // Example: use an env var to set the dev server port conditionally.
    server: {
      port: env.APP_PORT ? Number(env.APP_PORT) : 5173,
    },
  }
})
```

## Notes

- Vite defers loading `.env*` files until after the user config is resolved, because the set of files depends on config options such as `root` and `envDir`, and on the final `mode`.
- Variables in `.env`, `.env.local`, `.env.[mode]`, `.env.[mode].local` are not injected into `process.env` while `vite.config.*` runs. They are loaded later and exposed to application code via `import.meta.env` (default `VITE_` prefix filter), so no call is needed in the config if values only go to the app.

## Related

- [Conditional / Async Config](./conditional-async-config.md)
- [envDir / envPrefix](./env-dir-prefix.md)
- [define](./define.md)
