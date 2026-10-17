---
source: https://vite.dev/config/shared-options#root
---

# root / base / mode

Project root directory, public base path, and the mode that overrides the serve/build default.

## Signature / Usage

```js
export default defineConfig({
  root: process.cwd(),
  base: '/foo/',
  mode: 'development',
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root` | `string` | `process.cwd()` | Project root directory (where `index.html` is located). Absolute path, or relative to the current working directory. |
| `base` | `string` | `/` | Base public path when served in development or production. Related: `server.origin`. |
| `mode` | `string` | `'development'` for serve, `'production'` for build | Overrides the default mode for both serve and build. Can also be overridden via the `--mode` CLI option. |

## Notes

- Valid `base` values: absolute URL pathname (e.g. `/foo/`); full URL (e.g. `https://bar.com/foo/`, the origin part is not used in development so it is the same as `/foo/`); empty string or `./` (for embedded deployment).
- See Project Root, Public Base Path, and Env Variables and Modes guides for details.

## Related

- [input](./input.md)
- [envDir / envPrefix](./env-dir-prefix.md)
- [Public Base Path](../build-deploy/public-base-path.md)
- [Modes](../assets-env/modes.md)
