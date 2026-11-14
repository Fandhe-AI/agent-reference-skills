# Kit: Adapters

An adapter converts an input specification into the shared AST. Define one with `defineExtension` and `kind: 'adapter'`.

## Signature / Usage

```typescript
import { ast, defineExtension } from 'kubb/kit'
import type { AdapterFactoryOptions } from 'kubb/kit'

type AdapterCustom = AdapterFactoryOptions<'custom', { strict?: boolean }, { strict: boolean }>

export const adapterCustom = defineExtension<AdapterCustom>({
  kind: 'adapter',
  meta: { name: 'custom' },
  setup: (options) => ({ strict: options.strict ?? false }),
  build: () => ({
    document: null,
    async parse(_source) {
      return ast.factory.createInput({ schemas: [], operations: [] })
    },
    async validate() {
      // Throw here when the spec is invalid.
    },
  }),
})
```

Pass the adapter to the config:

```typescript
import { defineConfig } from 'kubb/config'
import { adapterCustom } from './adapterCustom.ts'

export default defineConfig({
  input: './my-spec.json',
  output: { path: './src/gen' },
  adapter: adapterCustom({ strict: true }),
  plugins: [],
})
```

`setup` turns the user's options into the resolved options. `build` receives the resolved options and returns the adapter's `document`, `parse`, and `validate`. Without `setup`, the user's options are the resolved options.

## Adapter anatomy

| Property | Type | Required | Purpose |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Unique adapter identifier, filled from `meta.name`. Use the spec identifier, such as `'oas'`. |
| `meta` | `ExtensionMeta` | No | The `meta` object from the definition, filled by the factory. |
| `options` | `TOptions` | Yes | The options the factory was called with, before `setup` applies defaults. |
| `document` | `TDocument \| null` | Yes | The raw parsed source document, for plugins that need direct access. `null` before `parse()`. |
| `parse` | `(source: AdapterSource, options?: { signal?: AbortSignal; fileRefs?: string[] }) => InputNode \| Promise<InputNode>` | Yes | Convert the spec into the universal AST. When `fileRefs` is set, a `$ref` may only read local files inside those folders, and none when the list is empty. |
| `validate` | `(input: string, options?: { throwOnError?: boolean }) => Promise<void>` | Yes | Validate the document at a path or URL without running the full pipeline. |
| `settle` | `() => Promise<void>` | No | Waits for work `parse` left running, such as spec validation in a worker thread. Kubb awaits it before `kubb:build:end`. It must not reject. |
| `locate` | `(source: string, location: DiagnosticLocation) => { start: number; end: number } \| undefined` | No | Where a diagnostic sits in the source text, for CLI code frames. |
| `sources` | `Array<string>` | No | The files and URLs the last `parse()` read, such as the files external `$ref`s point at, including any that could not be read. A watcher rebuilds when one of them changes. |

`locate` receives the local input's source text and a `DiagnosticLocation`, and returns zero-based UTF-16 offsets with an exclusive `end`, or `undefined` when it cannot place that location. Kubb formats the line, column, and frame from that range. The OpenAPI adapter resolves JSON pointers in YAML and JSON. Adapters without `locate` still show diagnostic messages and locations without code frames.

`kubb validate` calls the configured adapter's `validate` method with `throwOnError: true`. Validation errors must throw to fail the command.

## Adapter naming convention

| Surface | Pattern | Example |
| --- | --- | --- |
| npm package | `@<scope>/adapter-<name>` or `kubb-adapter-<name>` | `@kubb/adapter-oas` |
| Adapter runtime name | The spec identifier (lowercase) | `'oas'` |
| Factory export | `adapter<Name>` (camelCase) | `adapterOas` |
| Name constant | `adapter<Name>Name` | `adapterOasName` |
| `AdapterFactoryOptions` alias | `Adapter<Name>` (PascalCase) | `AdapterOas` |

## Notes

- Source: https://kubb.dev/docs/5.x/reference/kit/adapters (docs/5.x/reference/kit/adapters.md at kubb@5.20.0, retrieved 2026-11-14)
- For OpenAPI 2.0, 3.0, 3.1, and 3.2 use the official `@kubb/adapter-oas`; `defineConfig` from the `kubb` package sets it when the config has no `adapter`. Write a custom adapter only for other specs (AsyncAPI, GraphQL, JSON Schema, gRPC).
- `createAdapter` is deprecated. Use `defineExtension` with `kind: 'adapter'`: rename the call and add `kind: 'adapter'`.
- Cross-references need no adapter hook: every plugin resolves `$ref` imports through `resolver.imports`, which defaults each ref to its pointer's last segment. An adapter that renames a schema stamps `targetName` on every ref node pointing at it.
- Migration (5.11 → 5.20): `Adapter` gains optional `settle`, `locate`, and `sources`, and `parse` takes an optional second argument `{ signal, fileRefs }`. `adapter.sources` was added in 5.14.5 (changelog v5.14.5, #4478); the adapter naming convention changed from `adapter-<id>` to the bare spec identifier (docs diff 5.11 → 5.20).
- Throw from `parse()` with a clear, user-facing message when the input is invalid.
- Export a `satisfies`-typed name constant so consumers can reuse the runtime name.

## Related

- [Extensions](./extensions.md)
- [Resolvers](./resolvers.md)
- [AST](./ast.md)
- [@kubb/adapter-oas](../adapters/adapter-oas.md)
