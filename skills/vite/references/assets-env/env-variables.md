---
source: https://vite.dev/guide/env-and-mode#env-variables
---

# Env Variables and .env Files

Vite exposes env variables under `import.meta.env` as strings. Only variables prefixed with `VITE_` are exposed to client-side source code. Additional variables are loaded from `.env` files via dotenv.

## Signature / Usage

```[.env]
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

```js
console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
```

`.env` files loaded from the environment directory:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

Variable expansion (dotenv-expand); escape `$` with `\`:

```[.env]
KEY=123
NEW_KEY1=test$foo   # test
NEW_KEY2=test\$foo  # test$foo
NEW_KEY3=test$KEY   # test123
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `envPrefix` | config option | Customize the exposed variable prefix (default `VITE_`) |
| `envDir` | config option | Directory the `.env` files are loaded from |

## Notes

- Parsed values are always strings (`VITE_SOME_KEY=123` yields `"123"`; same for booleans). Convert to the desired type in code.
- `VITE_*` variables should not contain sensitive information such as API keys: their values are bundled into source code at build time. For production, consider a backend server or serverless/edge functions.
- Env loading priority: a mode-specific file (e.g. `.env.production`) takes precedence over a generic one (`.env`). `.env` and `.env.local` are always loaded in addition to `.env.[mode]`; variables only defined in them remain available. Environment variables that already exist when Vite runs have the highest priority and are not overwritten by `.env` files (e.g. `VITE_SOME_KEY=123 vite build`).
- `.env` files are loaded at the start of Vite. Restart the server after making changes.
- Bun automatically loads `.env` files into `process.env` before the script runs, which can interfere with Vite because Vite respects existing `process.env` values (see oven-sh/bun#5515 for workarounds).
- Vite supports expanding variables in reverse order (e.g. `VITE_FOO=foo${VITE_BAR}` then `VITE_BAR=bar` evaluates to `VITE_FOO=foobar`). This does not work in shell scripts or tools like `docker compose`; the docs recommend not relying on it, and Vite may start emitting warnings for it in the future.
- Add `*.local` to `.gitignore`: `.env.*.local` files are local-only and can contain sensitive variables.
- This is Vite's own `VITE_` convention. Next.js `NEXT_PUBLIC_` variables belong to nextjs-app; tanstack-start has its own environment variable handling.

## Related

- [built-in-constants.md](./built-in-constants.md)
- [modes.md](./modes.md)
- [env-intellisense.md](./env-intellisense.md)
- [../config-shared/env-dir-prefix.md](../config-shared/env-dir-prefix.md)
- [../config-shared/env-in-config.md](../config-shared/env-in-config.md)
- [../javascript-api/load-env.md](../javascript-api/load-env.md)
