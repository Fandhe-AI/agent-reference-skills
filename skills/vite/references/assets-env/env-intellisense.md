---
source: https://vite.dev/guide/env-and-mode#intellisense-for-typescript
---

# IntelliSense for Env Variables

Vite provides `import.meta.env` type definitions in `vite/client.d.ts`. User-defined `VITE_` variables get IntelliSense by augmenting `ImportMetaEnv` in `src/vite-env.d.ts`.

## Signature / Usage

```typescript [vite-env.d.ts]
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

If code relies on browser types such as DOM and WebWorker, update the `lib` field in `tsconfig.json`:

```json [tsconfig.json]
{
  "lib": ["WebWorker"]
}
```

## Notes

- Uncommenting `strictImportMetaEnv: unknown` in `ViteTypeOptions` makes `ImportMetaEnv` strict and disallows unknown keys (in `types/importMeta.d.ts`, the `Record<string, any>` fallback applies only when that key is absent).
- If the `ImportMetaEnv` augmentation does not work, make sure `vite-env.d.ts` has no `import` statements (an import turns the file into a module, which breaks the augmentation).

- The official snippet abbreviates the tsconfig structure: `lib` is a compiler option, so in an actual `tsconfig.json` it must be placed under `compilerOptions` (`{ "compilerOptions": { "lib": ["WebWorker"] } }`).

## Related

- [env-variables.md](./env-variables.md)
- [built-in-constants.md](./built-in-constants.md)
- [../features/client-types.md](../features/client-types.md)
