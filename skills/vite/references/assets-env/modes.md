---
source: https://vite.dev/guide/env-and-mode#modes
---

# Modes and NODE_ENV

By default the dev server runs in `development` mode and `vite build` runs in `production` mode. The mode selects which `.env.[mode]` file is loaded and is independent from `NODE_ENV`.

## Signature / Usage

```[.env.production]
VITE_APP_TITLE=My App
```

Override the mode with `--mode`:

```bash
vite build --mode staging
```

```[.env.staging]
VITE_APP_TITLE=My App (staging)
```

Run a development build by setting `NODE_ENV` in a mode-specific env file:

```[.env.testing]
NODE_ENV=development
```

## Options / Props

| Command | NODE_ENV | Mode |
| --- | --- | --- |
| `vite build` | `"production"` | `"production"` |
| `vite build --mode development` | `"production"` | `"development"` |
| `NODE_ENV=development vite build` | `"development"` | `"production"` |
| `NODE_ENV=development vite build --mode development` | `"development"` | `"development"` |

| Command | `import.meta.env.PROD` | `import.meta.env.DEV` |
| --- | --- | --- |
| `NODE_ENV=production` | `true` | `false` |
| `NODE_ENV=development` | `false` | `true` |
| `NODE_ENV=other` | `false` | `true` |

| Command | `import.meta.env.MODE` |
| --- | --- |
| `--mode production` | `"production"` |
| `--mode development` | `"development"` |
| `--mode staging` | `"staging"` |

## Notes

- `NODE_ENV` (`process.env.NODE_ENV`) and modes are two different concepts.
- `NODE_ENV=...` can be set in the command and also in a `.env` file. If specified in a `.env.[mode]` file, the mode can control its value; both remain separate concepts.
- Setting `NODE_ENV=...` in the command lets Vite detect the value early, and lets you read `process.env.NODE_ENV` in the Vite config, because Vite can only load env files once the config is evaluated.

## Related

- [env-variables.md](./env-variables.md)
- [built-in-constants.md](./built-in-constants.md)
- [../config-shared/root-base-mode.md](../config-shared/root-base-mode.md)
- [../config-shared/env-in-config.md](../config-shared/env-in-config.md)
