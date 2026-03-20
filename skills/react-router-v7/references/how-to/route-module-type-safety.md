# Route Module Type Safety

React Router automatically generates route-specific TypeScript types (params, loader data, etc.) into a `.react-router/` directory. This guide covers setup if you didn't start from a template.

**Available in:** Framework mode only.

## 実装方法

1. Add `.react-router/` to `.gitignore`
2. Add the generated types to `tsconfig.json` via `include` and `rootDirs`
3. Run `react-router typegen && tsc` for CI type checking
4. Declare `AppLoadContext` shape in a `.d.ts` file
5. Optionally enable `verbatimModuleSyntax` for automatic `import type` enforcement

## コード例

```txt
# .gitignore
.react-router/
```

```json
// tsconfig.json
{
  "include": [".react-router/types/**/*"],
  "compilerOptions": {
    "rootDirs": [".", "./.react-router/types"]
  }
}
```

```json
// package.json
{
  "scripts": {
    "typecheck": "react-router typegen && tsc"
  }
}
```

```ts
// app/load-context.d.ts
import "react-router";
declare module "react-router" {
  interface AppLoadContext {
    db: Database;
  }
}
```

## 注意点

- The Vite plugin regenerates types automatically when `routes.ts` changes during `react-router dev`
- Apply `tsconfig.json` changes to the config that includes your app directory (relevant in monorepos)
- `verbatimModuleSyntax` adds the `type` modifier automatically, helping bundlers tree-shake type-only imports

## 関連

- [./file-route-conventions.md](./file-route-conventions.md)
