# Kit: AST

`ast` is `kubb/kit`'s namespace for the entire AST surface: `factory` node builders, `transform` and `collect` visitors, guards, ref and string helpers, the macro engine, and printer helpers.

## Signature / Usage

```typescript
import { ast } from 'kubb/kit'

const root = ast.factory.createInput({
  schemas: [ast.factory.createSchema({ name: 'Pet', type: 'object', properties: [] })],
  operations: [],
})
```

`ast.factory.createFile`, `createSource`, and `createText` build the `FileNode` tree a generator returns.

## Schema node types

A `SchemaNode` is discriminated by `type`.

| Family | Types |
| --- | --- |
| Structural | `object`, `array`, `tuple`, `union`, `intersection`, `enum` |
| Scalar | `string`, `number`, `integer`, `bigint`, `boolean`, `null`, `any`, `unknown`, `void`, `never` |
| Special | `ref` (from `$ref`), `date`, `datetime`, `time`, `uuid`, `email`, `url`, `blob` |

## Factory functions

| Factory | Purpose |
| --- | --- |
| `createFile`, `createSource`, `createText` | Build `FileNode`s emitted by generators. |
| `createImport`, `createExport` | Emit `import` / `export` statements. |
| `createConst`, `createFunction`, `createArrowFunction`, `createJsx` | Emit TypeScript declarations and JSX. |
| `createParameter` | Describe operation parameters. |
| `createProperty`, `createType` | Compose object properties and TypeScript types. |
| `createResponse`, `createRequestBody`, `createContent` | Model responses, request bodies, and content entries. |
| `createBreak` | Emit line breaks between nodes. |

Also `createInput`, `createSchema`, and `createOperation`. Never build AST literals by hand.

## Visitors

`transform` rewrites the tree synchronously and returns a new tree. `collect` is a generator that yields matches lazily; `collectSync` is the eager counterpart returning `Array<T>`. Visitor keys are lowercase: `input`, `operation`, `schema`, `property`, `parameter`, `response`.

```typescript
import { ast } from 'kubb/kit'

const root = ast.factory.createInput({ schemas: [], operations: [] })

const enhanced = ast.transform(root, {
  schema(node) {
    if (node.type === 'object' && node.additionalProperties === undefined) {
      return { ...node, additionalProperties: false }
    }
    return node
  },
  operation(node) {
    return { ...node, tags: node.tags?.length ? node.tags : ['untagged'] }
  },
})

const mutations = ast.collectSync<ast.OperationNode>(root, {
  operation(node) {
    return node.method === 'POST' ? node : undefined
  },
})
```

## Guards and narrowing

```typescript
import { ast } from 'kubb/kit'

const root = ast.factory.createInput({ schemas: [], operations: [] })

for (const node of ast.collect<ast.SchemaNode>(root, { schema: (node) => node })) {
  const obj = ast.narrowSchema(node, 'object')
  if (obj) {
    console.log(`object with ${obj.properties.length} properties`)
  }
}

for (const node of ast.collect<ast.OperationNode>(root, { operation: (node) => node })) {
  if (ast.isHttpOperationNode(node)) {
    console.log(`${node.method} ${node.path}`)
  }
}
```

## Refs and naming helpers

`resolveRefName` ships on the `ast` namespace. `extractRefName`, `childName`, `enumPropName`, and `syncSchemaRef` are named exports of `kubb/kit` itself. The same split applies to `containsCircularRef` and the built-in macros.

| Helper | Purpose |
| --- | --- |
| `extractRefName` | Turn `'#/components/schemas/Pet'` into `'Pet'`. |
| `resolveRefName` | Resolve the name a ref node emits, preferring its `targetName`. |
| `childName` | Derive a child property name from context. |
| `enumPropName` | Convert an enum value into a valid property name. |
| `syncSchemaRef` | Merge a ref node with its resolved schema, letting usage-site fields (`description`, `nullable`) override. |

## Schema graph

`collectUsedSchemaNames` and `findCircularSchemas` ship on the `ast` namespace.

| Helper | Purpose |
| --- | --- |
| `collectUsedSchemaNames` | Collect the names of every top-level schema transitively used by a set of operations. Pair with `include` filters to leave unreferenced schemas ungenerated. |
| `findCircularSchemas` | Find every schema in a circular dependency chain, so those positions can be wrapped in a lazy getter or `z.lazy(() => …)`. |
| `containsCircularRef` | Report whether a schema, or anything nested inside it, references a circular schema. |

`schemaTypes` is the map of every schema `type` discriminant.

## Macros

A macro is a named, composable transform built on `transform` that rewrites nodes before printing.

| Export | Purpose |
| --- | --- |
| `defineMacro` | Type a macro and read it as one definition. |
| `composeMacros` | Fold an ordered list of macros into one visitor. |
| `applyMacros` | Run a list of macros over a node tree. |

Built-in macros:

| Macro | Purpose |
| --- | --- |
| `macroSimplifyUnion` | Drop union members a broader scalar primitive already covers. |
| `macroDiscriminatorEnum` | Replace a discriminator property's schema with a string enum of its allowed values. |
| `macroEnumName` | Name an inline enum schema from its parent and property name. |
| `macroRenameSchema` | Rename a schema's declaration and stamp `targetName` on every ref pointing at it. |

```typescript
type Macro = {
  name: string
  enforce?: 'pre' | 'post'
  match?: (node: Node) => boolean
  schema?(node: SchemaNode, context): SchemaNode | null | undefined
  operation?(node: OperationNode, context): OperationNode | null | undefined
  // input, output, property, parameter, response
}
```

Each callback returns a replacement node, or `undefined` or `null` to leave the node untouched.

## Printers

`createPrinter` is the typed helper for creating a `Printer`. It takes an `overrides` map to replace the handler for individual schema node types.

```typescript
type PrinterNodes = Partial<{
  [K in SchemaType]: (this: Context, node: SchemaNodeByType[K]) => Output | null
}>
```

## Notes

- `macroDiscriminatorEnum`, `macroEnumName`, and `macroRenameSchema` read options, so call them to build the macro. Plugins that import another plugin's output compute names from the nodes they see, so register a rename on every plugin that touches the schema (for example pass one shared `macros` array to each plugin).
- Pass printer overrides through the `overrides` field rather than spreading them into `nodes`, otherwise `this.base` cannot find the original handler. The `printer.nodes` option on `@kubb/plugin-ts`, `@kubb/plugin-zod`, and `@kubb/plugin-faker` feeds this map.
- Printer handlers run with a `this` context, so write them as regular functions, not arrow functions. `this.transform(node)` recurses through the full handler map, `this.base(node)` runs the built-in handler, `this.options` reads resolved printer options, and `this.import(ast.factory.createImport(...))` declares an import. In your own generator, call `printer.drainImports()` after printing to collect them.
- For rewriting nodes inside a plugin, prefer macros over bare `transform`.

## Related

- [Generators](./generators.md)
- [Adapters](./adapters.md)
- [Parsers](./parsers.md)
