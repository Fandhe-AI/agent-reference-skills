# Internal Packages

Create a shared TypeScript package consumed by apps inside the monorepo.

Directory layout:

```
packages/math/
  src/
    add.ts
    subtract.ts
  package.json
  tsconfig.json
```

`packages/math/package.json`:

```json
{
  "name": "@repo/math",
  "type": "module",
  "exports": {
    "./add": { "types": "./dist/add.d.ts", "default": "./dist/add.js" },
    "./subtract": { "types": "./dist/subtract.d.ts", "default": "./dist/subtract.js" }
  },
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "latest",
    "@repo/typescript-config": "workspace:*"
  }
}
```

`packages/math/tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": { "outDir": "dist", "rootDir": "src" },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

Declare the dependency in any consuming app (`pnpm` / `bun`):

```json
{ "dependencies": { "@repo/math": "workspace:*" } }
```

For npm / yarn:

```json
{ "dependencies": { "@repo/math": "*" } }
```

Cache build output in root `turbo.json`:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

## Notes

- `include` and `exclude` in `tsconfig.json` are not inherited from the base config — always declare them explicitly
- Use `exports` instead of a barrel `index.ts` to enable tree-shaking and IDE auto-completion per entry point
- `workspace:*` (pnpm/bun) or `"*"` (npm/yarn) tells the package manager to resolve the package from the local workspace
