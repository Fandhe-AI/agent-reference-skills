# Kit: Generators

`defineGenerator` declares a named generator unit consumed by a plugin. Generators walk the AST and emit files; Kubb calls each method for the matching node type.

## Signature / Usage

```typescript
import { ast, defineGenerator } from 'kubb/kit'

const myGenerator = defineGenerator({
  name: 'my-generator',
  operation(node, ctx) {
    const file = ctx.resolver.file({
      name: node.operationId,
      extname: '.ts',
      root: ctx.root,
      output: { path: 'operations', mode: 'directory' },
    })

    return [
      ast.factory.createFile({
        baseName: file.baseName,
        path: file.path,
        sources: [
          ast.factory.createSource({
            nodes: [ast.factory.createText(`export const op = '${node.operationId}'`)],
          }),
        ],
      }),
    ]
  },
})
```

`ctx.resolver.file` resolves the path inside the output folder, so this generator writes `operations/<operationId>.ts` there. A plugin with an `output` option passes `ctx.options.output` instead of a fixed value.

Each method returns `TElement | Array<FileNode> | void`. Returning a renderer element (for example JSX from `kubb/jsx`) requires a `renderer` factory on the generator.

## Generator methods

| Method | Input | Output | When to use |
| --- | --- | --- | --- |
| `schema()` | `SchemaNode` (per data schema) | `TElement \| Array<FileNode> \| void` | Generate types, validators, factories. Called once per schema |
| `operation()` | `OperationNode` (per API operation) | `TElement \| Array<FileNode> \| void` | Generate hooks, clients, handlers. Called once per operation |
| `operations()` | `Array<OperationNode>` (all operations) | `TElement \| Array<FileNode> \| void` | Generate index or barrel files. Called once after all operations |

## Scoping with `match`

```typescript
import { ast, defineGenerator } from 'kubb/kit'

const getOnlyGenerator = defineGenerator({
  name: 'get-only-generator',
  match(node, ctx) {
    return node.kind === 'Operation' && ast.http.isOperation(node) && node.method.toLowerCase() === 'get'
  },
  operation(node, ctx) {
    // node is already known to be a GET operation here
    return
  },
})
```

## `GeneratorContext` properties (`ctx`)

| Property | Type | Purpose |
| --- | --- | --- |
| `ctx.config` | `Config` | Resolved Kubb configuration |
| `ctx.signal` | `AbortSignal \| undefined` | Stops generation at the next safe checkpoint when aborted |
| `ctx.root` | `string` | Absolute path to the output directory for the current plugin |
| `ctx.options` | `TResolvedOptions` | Per-node resolved options (after exclude/include/override filtering) |
| `ctx.plugin` | `Plugin` | The owning plugin descriptor |
| `ctx.resolver` | `Resolver` | Resolver for the current plugin |
| `ctx.driver` | `KubbDriver` | Plugin driver for cross-plugin access |
| `ctx.hooks` | `Hookable<KubbHooks>` | Event bus for `KubbHooks` events |
| `ctx.adapter` | `Adapter` | The adapter that parsed the input spec |
| `ctx.meta` | `InputMeta` | Document metadata from the adapter: `title`, `version`, `baseURL`, every declared `servers` entry, and the `auth` schemes |
| `ctx.memo()` | `(key: string, compute: () => T) => T` | Cache that lives for the whole build and is shared by every plugin. See Caching with `ctx.memo` below |
| `ctx.addFile()` | `(...files: FileNode[]) => Promise<void>` | Add files, skipping any that already exist |
| `ctx.upsertFile()` | `(...files: FileNode[]) => Promise<void>` | Add or merge files (concatenates sources and imports) |
| `ctx.getPlugin()` | `(name: string) => Plugin \| undefined` | Get a plugin by name |
| `ctx.requirePlugin()` | `(name: string) => Plugin` | Get a plugin by name or throw a descriptive error |
| `ctx.getResolver()` | `(name: string) => Resolver` | Get a resolver by plugin name |
| `ctx.info()` | `(message: string, options?: { code?, help?, location? }) => void` | Emit an info message via the build event system |
| `ctx.warn()` | `(message: string, options?: { code?, help?, location? }) => void` | Emit a warning. `options` sets the fix and the source pointer |
| `ctx.error()` | `(error: string \| Error, options?: { code?, help?, location? }) => void` | Emit an error. A `Diagnostics.Error` keeps its code, help, and location |

### Caching with `ctx.memo`

`ctx.memo(key, compute)` runs `compute` the first time a build asks for `key` and returns the stored value after that. Every plugin in the build shares the store, so name the key with care:

- Start the key with your plugin name, such as `my-plugin:`, unless every plugin should share the value.
- Put the node in the key when the value comes from one node: `node.operationId` for an operation, `node.name` for a schema.
- Use `ctx.resolver.memo(key, compute)` for a value only your own plugin reads.

```typescript
import { ast, defineGenerator } from 'kubb/kit'

export const operationGenerator = defineGenerator({
  name: 'operation-generator',
  operation(node, ctx) {
    // One entry per operation. Other generators that ask for the same key reuse it.
    const schemas = ctx.memo(`my-plugin:schemas:${node.operationId}`, () =>
      ast.node.collect<ast.SchemaNode>(node, { depth: 'shallow', schema: (schema) => schema }),
    )

    return
  },
})
```

The value stays in memory until the build ends, so store derived data such as names or paths rather than generated source.

## Notes

- Source: https://kubb.dev/docs/5.x/reference/kit/generators (docs/5.x/reference/kit/generators.md at kubb@5.20.0, retrieved 2026-11-14)
- Migration (5.11 → 5.20): `ctx.cache` and the `NodeCache` type are removed (v5.15.2, #4510). Replace `ctx.cache.ensureItem(key, compute)` with `ctx.memo(key, compute)` and put the node in the key, such as `plugin-ts:imports:${node.operationId}`. `ctx.memo` was added in v5.15.0 (#4501). `InputMeta.circularNames` and `InputMeta.enumNames` are removed (v5.15.2, #4508); build them once per build with `ctx.memo('circularNames:set', () => ast.findCircularSchemas(schemas))` as shown in the changelog. `ast.isHttpOperationNode` is a deprecated alias of `ast.http.isOperation` (v5.18.6, #4583).
- A `false` result from `match(node, ctx)` skips that node; omitting `match` runs the generator for every node. `match` does not filter `operations()`.

## Related

- [Plugins](./plugins.md)
- [AST](./ast.md)
- [Resolvers](./resolvers.md)
- [Lifecycle hooks](./hooks.md)
