---
source: https://vite.dev/guide/features#client-types
---

# Client Types (vite/client)

Vite's default types are for its Node.js API. Add `vite/client` to shim the client-side environment.

## Signature / Usage

Add `vite/client` to `compilerOptions.types` inside `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["vite/client", "some-other-global-lib"]
  }
}
```

Alternatively, with a triple-slash directive in a `d.ts` declaration file (e.g. `vite-env.d.ts`):

```ts
/// <reference types="vite/client" />
```

To override the default typing (e.g. make the default import of `*.svg` a React component), add a type definition file and place its reference before `vite/client`:

```ts
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>
  export default content
}
```

With triple-slash directives, update the file containing the `vite/client` reference:

```ts
/// <reference types="./vite-env-override.d.ts" />
/// <reference types="vite/client" />
```

## Notes

- `vite/client` provides type shims for: asset imports (e.g. an `.svg` file), the Vite-injected constants on `import.meta.env`, and the HMR API on `import.meta.hot`.
- If `compilerOptions.types` is specified, only those packages are included in the global scope (instead of all visible `@types` packages). This is recommended since TS 5.9.
- If you use `compilerOptions.types`, ensure the override file is included in `tsconfig.json` (`"include": ["src", "./vite-env-override.d.ts"]`).
- In the v8.3.4 `client.d.ts`, `*.module.css` (and `.scss`, `.sass`, `.less`, `.styl`, `.stylus`, `.pcss`, `.sss`) are declared as `CSSModuleClasses` (`{ readonly [key: string]: string }`).

## Related

- [TypeScript](./typescript.md)
- [Env IntelliSense](../assets-env/env-intellisense.md)
