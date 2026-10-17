---
source: https://vite.dev/config/#using-environment-variables-in-config
---

# Conditional Config with Env Variables

Branch the config on `command` / `mode` and load `.env*` values into the config with `loadEnv`.

```js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
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

- The config function also receives `isSsrBuild` and `isPreview`; some tools pass `undefined` for them, so compare explicitly against `true` / `false`. `command` is `serve` during dev and `build` for production builds.
- Values in `.env`, `.env.local`, `.env.[mode]`, `.env.[mode].local` are not in `process.env` while the config runs; `loadEnv` is needed only when the config itself depends on them.
- An async function (`defineConfig(async ({ command, mode }) => { ... })`) is also accepted when the config needs to await.
