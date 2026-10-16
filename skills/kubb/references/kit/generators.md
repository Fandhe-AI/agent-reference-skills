# Kit: Generators

`defineGenerator` declares a named generator unit consumed by a plugin. Generators walk the AST and emit files; Kubb calls each method for the matching node type.

## Signature / Usage

```typescript
import { ast, defineGenerator } from 'kubb/kit'

const myGenerator = defineGenerator({
  name: 'my-generator',
  operation(node, ctx) {
    return [
      ast.factory.createFile({
        baseName: `${node.operationId}.ts`,
        path: `./${node.operationId}.ts`,
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
    return node.kind === 'Operation' && ast.isHttpOperationNode(node) && node.method.toLowerCase() === 'get'
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
| `ctx.root` | `string` | Absolute path to the output directory for the current plugin |
| `ctx.options` | `TResolvedOptions` | Per-node resolved options (after exclude/include/override filtering) |
| `ctx.plugin` | `Plugin` | The owning plugin descriptor |
| `ctx.resolver` | `Resolver` | Resolver for the current plugin |
| `ctx.driver` | `KubbDriver` | Plugin driver for cross-plugin access |
| `ctx.hooks` | `Hookable<KubbHooks>` | Event bus for `KubbHooks` events |
| `ctx.adapter` | `Adapter` | The adapter that parsed the input spec |
| `ctx.meta` | `InputMeta` | Document metadata from the adapter: `title`, `version`, `baseURL`, every declared `servers` and `securitySchemes` entry, and the pre-computed `circularNames` and `enumNames` arrays |
| `ctx.cache` | `NodeCache` | Cache scoped to the node being generated, shared by every plugin generating from that node in the current pass. Exposes `readItem`, `writeItem`, `ensureItem` |
| `ctx.addFile()` | `(...files: FileNode[]) => Promise<void>` | Add files, skipping any that already exist |
| `ctx.upsertFile()` | `(...files: FileNode[]) => Promise<void>` | Add or merge files (concatenates sources and imports) |
| `ctx.getPlugin()` | `(name: string) => Plugin \| undefined` | Get a plugin by name |
| `ctx.requirePlugin()` | `(name: string) => Plugin` | Get a plugin by name or throw a descriptive error |
| `ctx.getResolver()` | `(name: string) => Resolver` | Get a resolver by plugin name |
| `ctx.info()` | `(message: string, options?: { code?, help?, location? }) => void` | Emit an info message via the build event system |
| `ctx.warn()` | `(message: string, options?: { code?, help?, location? }) => void` | Emit a warning. `options` sets the fix and the source pointer |
| `ctx.error()` | `(error: string \| Error, options?: { code?, help?, location? }) => void` | Emit an error. A `Diagnostics.Error` keeps its code, help, and location |

## Notes

- A `false` result from `match(node, ctx)` skips that node; omitting `match` runs the generator for every node. `match` does not filter `operations()`.

## Related

- [Plugins](./plugins.md)
- [AST](./ast.md)
- [Resolvers](./resolvers.md)
- [Lifecycle hooks](./hooks.md)
