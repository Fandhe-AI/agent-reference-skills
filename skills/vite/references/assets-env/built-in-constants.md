---
source: https://vite.dev/guide/env-and-mode#built-in-constants
---

# Built-in Constants (import.meta.env)

Vite exposes constants under `import.meta.env`. They are defined as global variables during dev and statically replaced at build time to make tree-shaking effective.

## Signature / Usage

```js
if (import.meta.env.DEV) {
  // code inside here will be tree-shaken in production builds
  console.log('Dev mode')
}
```

Type definition (`packages/vite/types/importMeta.d.ts`, tag v8.3.4):

```ts
interface ImportMetaEnv extends Record<ImportMetaEnvFallbackKey, any> {
  BASE_URL: string
  MODE: string
  DEV: boolean
  PROD: boolean
  SSR: boolean
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `import.meta.env.MODE` | string | The mode the app is running in |
| `import.meta.env.BASE_URL` | string | The base url the app is served from, determined by the `base` config option |
| `import.meta.env.PROD` | boolean | Whether the app runs in production (dev server with `NODE_ENV='production'`, or an app built with `NODE_ENV='production'`) |
| `import.meta.env.DEV` | boolean | Whether the app runs in development (always the opposite of `import.meta.env.PROD`) |
| `import.meta.env.SSR` | boolean | Whether the app is running on the server |

## Notes

- Built-in constants are available in all cases.
- Env variables like `VITE_*` are covered in env-variables.md.

## Related

- [env-variables.md](./env-variables.md)
- [modes.md](./modes.md)
- [env-intellisense.md](./env-intellisense.md)
- [../config-shared/root-base-mode.md](../config-shared/root-base-mode.md)
- [../ssr/conditional-logic.md](../ssr/conditional-logic.md)
