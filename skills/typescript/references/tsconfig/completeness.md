---
source: https://www.typescriptlang.org/tsconfig/#Completeness_6257
---

# Completeness options

Options to skip type checking of declaration files: `skipDefaultLibCheck` and `skipLibCheck`.

## Signature / Usage

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `skipDefaultLibCheck` | — | — | Skip type checking .d.ts files that are included with TypeScript. |
| `skipLibCheck` | — | — | Skip type checking all .d.ts files. (Recommended) |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default for that option. "(Recommended)" is the page's Recommended badge.
- `skipDefaultLibCheck`: use `skipLibCheck` instead. It skips type checking of default library declaration files.
- `skipLibCheck`: saves compilation time at the expense of type-system accuracy; TypeScript type checks only the code you specifically refer to in your app's source. Typical triggers: two copies of a library's types in `node_modules` (prefer fixing the duplicate, e.g. with yarn resolutions) or breakages in `node_modules` / JS standard library declarations while migrating between TypeScript releases. If the problem comes from the TypeScript standard library, the TypeScript 4.5 lib replacement technique can be used instead.

## Related

- [language-and-environment](./language-and-environment.md)
- [type-checking](./type-checking.md)
