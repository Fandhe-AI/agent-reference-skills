# Kit: Parsers

A parser turns a `FileNode` into source code. Define one with `defineExtension` and `kind: 'parser'`.

## Signature / Usage

```typescript
import { defineExtension } from 'kubb/kit'

export const parserText = defineExtension({
  kind: 'parser',
  meta: { name: 'text', version: '1.0.0' },
  build() {
    return {
      extNames: ['.txt'],
      parse(file) {
        return file.sources
          .flatMap((source) => source.nodes ?? [])
          .map((node) => (node.kind === 'Text' ? node.value : ''))
          .join('\n')
      },
      print(...nodes) {
        return nodes.map(String).join('\n')
      },
    }
  },
})
```

Add the parser to the config. A `parsers` array replaces the default parsers, so list `parserTs()` and `parserTsx()` again to keep TypeScript output:

```typescript
import { defineConfig } from 'kubb/config'
import { parserTs, parserTsx } from '@kubb/parser-ts'
import { parserText } from './parserText.ts'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  parsers: [parserTs(), parserTsx(), parserText()],
})
```

`build` receives the caller's options, or an empty object when omitted.

## Parser anatomy

`build` returns every field except `name`, `meta`, and `options`, which the factory fills.

| Property | Type | Required | When called | Purpose |
| --- | --- | --- | --- | --- |
| `name` | `string` | Yes | | Unique parser identifier, filled from `meta.name`. Use the output language or format, such as `'typescript'`. |
| `extNames` | `Array<FileNode['extname']> \| undefined` | Yes | | File extensions this parser handles. Kubb registers the parser for each one. A parser with `undefined` here is registered for no extension, so `parse` is never called for it. |
| `parse` | `(file: FileNode) => string` | Yes | After all plugins run | Serializes the file's sources into the final output string. Must return synchronously. |
| `print` | `(...nodes: TNode[]) => string` | Yes | By plugins, while they generate files | Renders compiler AST nodes to source text. Node type is parser-specific (`ts.Node` for `parserTs`). |
| `inline` | `InlineLanguage` | No | Before barrels, for inline sources | Finds the names in this language (`replaceIdentifiers`) and makes a definition safe to put where a name was (`wrap`). Files of this parser's extensions can then absorb inline sources. `parserTs` supports it. |
| `copy` | `(file: FileNode, source: string) => UserFileNode` | No | For each `copy` file | Describes a copied template's raw content as nodes. Kubb prints the result with `parse`. Omit it to write copied files verbatim. |

## Parser naming convention

| Surface | Pattern | Example |
| --- | --- | --- |
| npm package | `@<scope>/parser-<name>` or `kubb-parser-<name>` | `@kubb/parser-ts` |
| Parser runtime name | The output language or format (lowercase) | `'typescript'`, `'markdown'` |
| Factory export | `parser<Name>` (camelCase) | `parserTs`, `parserMd` |

## Notes

- Source: https://kubb.dev/docs/5.x/reference/kit/parsers (docs/5.x/reference/kit/parsers.md at kubb@5.20.0, retrieved 2026-11-14)
- Migration (5.11 → 5.20): `Parser` gains the optional `inline` member, added with inline sources in v5.14.0 (changelog: "Add inline sources ... The parser for the file's extension supplies the language rules through the new `inline` member"). A parser whose `extNames` is `undefined` no longer acts as a catch-all fallback: it is registered for no extension (docs diff 5.11 → 5.20).
- For TypeScript and JavaScript output use the built-in `@kubb/parser-ts`, added by `defineConfig` from the `kubb` package when the config sets no `parsers`. Build a custom parser only for other languages.
- `defineParser` is deprecated. Use `defineExtension` with `kind: 'parser'`: rename the call and add `kind: 'parser'`.
- If two parsers register the same extension, the last one in the `parsers` array wins.
- When no parser matches a file's extension, Kubb writes the file's source strings joined together.
- Kubb checks `meta.compatibility` before the build, as for plugins.
- Parsers compose by extension: `parserTs` (`.ts`, `.js`) and `parserTsx` (`.tsx`, `.jsx`) ship in `@kubb/parser-ts` and register side by side.

## Related

- [Extensions](./extensions.md)
- [AST](./ast.md)
- [@kubb/parser-ts](../parsers/parser-ts.md)
