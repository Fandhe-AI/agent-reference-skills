# TypeScript

## Usage

Shared config — `@repo/typescript-config`:

```
packages/typescript-config/
  base.json
  nextjs.json
  react-library.json
```

```json
// Representative options in base.json
{ "compilerOptions": { "target": "es2022", "module": "NodeNext", "strict": true, "isolatedModules": true } }
```

`exports` field:

```json
{
  "exports": {
    "./*": { "types": "./src/*.ts", "default": "./dist/*.js" }
  }
}
```

Type checking:

```json
{ "scripts": { "check-types": "tsc --noEmit" } }
```

## Notes

- Use `tsc` rather than a bundler.
- Enable `declaration: true` and `declarationMap: true`.
- Prefer Node.js subpath imports over TypeScript `paths` (TS 5.4+).
- Do not create a root `tsconfig.json`.
- **Do not use TypeScript Project References** (they complicate configuration and hurt caching efficiency).
- Keep the TypeScript version consistent across the whole workspace.
