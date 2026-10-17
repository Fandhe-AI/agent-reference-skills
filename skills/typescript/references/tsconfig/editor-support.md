---
source: https://www.typescriptlang.org/tsconfig/#Editor_Support_6249
---

# Editor Support options

Options that affect the TypeScript language server and editor integration: `disableSizeLimit` and `plugins`.

## Signature / Usage

```json
{
  "compilerOptions": {
    "disableSizeLimit": true
  }
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `disableSizeLimit` | — | — | Remove the 20mb cap on total source code size for JavaScript files in the TypeScript language server. |
| `plugins` | — | — | Specify a list of language service plugins to include. |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default for that option.
- `disableSizeLimit`: to avoid memory bloat in very large JavaScript projects there is an upper limit on the memory TypeScript allocates; turning this flag on removes the limit.
- `plugins`: language service plugins run inside the editor. They provide additional information based on existing TypeScript files, either enhancing messages between TypeScript and the editor or providing their own error messages. Examples listed on the official page: ts-sql-plugin (SQL linting in template strings), typescript-styled-plugin (CSS linting inside template strings), typescript-eslint-language-service (eslint messaging and fix-its in the compiler output), ts-graphql-plugin (GraphQL validation and completion in template strings).
- VS Code extensions can automatically include language service plugins (`typescriptServerPlugins` contribution point), so some may run without being declared in `tsconfig.json`.
- The `plugins` option page shows no code example, so none is given here.
- Changed (7.0): the official 7.0 README states the compiler API is not ready for 7.0 (new API planned for 7.1), so plugin behavior under the native compiler is not documented in the sources used for this skill; unverified.

## Related

- [javascript-support](./javascript-support.md)
- [watch-options](./watch-options.md)
