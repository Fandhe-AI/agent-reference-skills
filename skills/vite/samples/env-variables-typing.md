---
source: https://vite.dev/guide/env-and-mode#intellisense-for-typescript
---

# Env Variables and Type Augmentation

Expose `VITE_`-prefixed variables from `.env` files and type them via `ImportMetaEnv`.

```
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

```js
console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
```

```ts
// src/vite-env.d.ts
interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## Notes

- Values are always strings; convert numbers and booleans yourself.
- `VITE_*` values are bundled into client code at build time, so never put secrets in them.
- `vite-env.d.ts` must not contain any `import` statement, otherwise the augmentation does not work.
- Env files load from the env directory: `.env`, `.env.local`, `.env.[mode]`, `.env.[mode].local`. Restart the server after editing. This is Vite's `import.meta.env` (`VITE_` prefix); it differs from the `NEXT_PUBLIC_` convention of nextjs-app and the env handling of tanstack-start.
