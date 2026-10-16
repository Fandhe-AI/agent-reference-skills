# Kit: Adapters

An adapter converts an input specification into the shared AST. Define one with `defineExtension` and `kind: 'adapter'`.

## Signature / Usage

```typescript
import { ast, defineExtension } from 'kubb/kit'
import type { AdapterFactoryOptions } from 'kubb/kit'

type AdapterCustom = AdapterFactoryOptions<'adapter-custom', { strict?: boolean }, { strict: boolean }>

export const adapterCustom = defineExtension<AdapterCustom>({
  kind: 'adapter',
  meta: { name: 'adapter-custom' },
  setup: (options) => ({ strict: options.strict ?? false }),
  build: () => ({
    document: null,
    async parse(_source) {
      return ast.factory.createInput({ schemas: [], operations: [] })
    },
    async validate() {
      // Throw or call ctx.error here when the spec is invalid.
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

`setup` turns the user's options into the resolved options, and `build` returns the adapter's `document`, `parse`, and `validate`. Without `setup`, the user's options are the resolved options.

## Adapter anatomy

| Property | Type | Required | Purpose |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Unique adapter identifier, filled from `meta.name`. Convention is `adapter-<id>`. |
| `options` | `TResolvedOptions` | Yes | Adapter options after defaults are applied. |
| `document` | `TDocument \| null` | Yes | The raw parsed source document, for plugins that need direct access. `null` before `parse()`. |
| `parse` | `(source: AdapterSource) => InputNode \| Promise<InputNode>` | Yes | Convert the spec into the universal AST. |
| `validate` | `(input: string, options?: { throwOnError?: boolean }) => Promise<void>` | Yes | Validate the document at a path or URL without running the full pipeline. |

## Adapter naming convention

| Surface | Pattern | Example |
| --- | --- | --- |
| npm package | `@<scope>/adapter-<name>` or `kubb-adapter-<name>` | `@kubb/adapter-oas` |
| Adapter runtime name | The spec identifier (lowercase) | `'oas'` |
| Factory export | `adapter<Name>` (camelCase) | `adapterOas` |
| Name constant | `adapter<Name>Name` | `adapterOasName` |
| `AdapterFactoryOptions` alias | `Adapter<Name>` (PascalCase) | `AdapterOas` |

## Notes

- For OpenAPI 2.0, 3.0, and 3.1 use the official `@kubb/adapter-oas`; Kubb picks it when `defineConfig` is imported from the `kubb` package. Write a custom adapter only for other specs (AsyncAPI, GraphQL, JSON Schema, gRPC).
- `createAdapter` is deprecated. Use `defineExtension` with `kind: 'adapter'`: rename the call and add `kind: 'adapter'`.
- Cross-references need no adapter hook: every plugin resolves `$ref` imports through `resolver.imports`, which defaults each ref to its pointer's last segment. An adapter that renames a schema stamps `targetName` on every ref node pointing at it.
- Throw from `parse()` with a clear, user-facing message when the input is invalid.
- Export a `satisfies`-typed name constant so consumers can reuse the runtime name.

## Related

- [Extensions](./extensions.md)
- [Resolvers](./resolvers.md)
- [AST](./ast.md)
- [@kubb/adapter-oas](../adapters/adapter-oas.md)
