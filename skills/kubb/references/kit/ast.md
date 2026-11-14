# Kit: AST

`ast` is `kubb/kit`'s namespace for the entire AST surface. Each group reads or builds one kind of thing: `ast.factory` builds nodes, `ast.node` walks them, and the other groups read schemas, refs, media types, servers, auth and HTTP operations. Each helper is a verb plus what it returns, such as `getName` or `findProperties`, or a yes-or-no question such as `isJson`. Inside a group whose name is the noun, the bare verb is enough: `ast.schema.find`, `ast.macro.apply`.

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
| Structural | `object`, `array`, `tuple`, `union`, `intersection`, `enum`, `not` |
| Scalar | `string`, `number`, `integer`, `bigint`, `boolean`, `null`, `any`, `unknown`, `void`, `never` |
| Special | `ref` (from `$ref`), `date`, `datetime`, `time`, `uuid`, `email`, `url`, `ipv4`, `ipv6`, `blob` |

Object schemas can also include `propertyNames`, a schema that validates each key name. The OpenAPI adapter maps this field from the input schema.

### Groups

| Group | Covers |
| --- | --- |
| `ast.factory` | Build nodes. |
| `ast.node` | Walk, rewrite and read any node. |
| `ast.file` | Rewrite file nodes. |
| `ast.macro` | Run macros. |
| `ast.ref` | Read `$ref` nodes. |
| `ast.graph` | Walk the schema graph. |
| `ast.schema` | Narrow, find and read schema nodes. |
| `ast.mediaType` | Read a media type or a content entry. |
| `ast.server` | Pick from the document's servers. |
| `ast.auth` | Join auth requirements with their schemes. |
| `ast.http` | Read HTTP operations, their responses and statuses. |
| `kubb/kit` authoring | `createPrinter` and `defineMacro`. |

The old top-level names, such as `ast.narrowSchema`, `ast.transform` or `ast.isHttpOperationNode`, still work as deprecated aliases. Each one's JSDoc names its replacement, and Kubb v6 removes them.

### `ast.factory`

Factories return defaulted, fully typed nodes for adapters and generator handlers. Never build AST literals by hand.

| Factory | Builds |
| --- | --- |
| `createInput`, `createSchema`, `createOperation` | The input tree, its schemas and operations. |
| `createParameter`, `createProperty` | Operation parameters and object properties. |
| `createResponse`, `createRequestBody`, `createContent` | Responses, request bodies, and content entries. |
| `createFile`, `createSource`, `createText` | The `FileNode`s a generator returns. |
| `createImport`, `createExport` | `import` and `export` statements. |
| `createConst`, `createFunction`, `createArrowFunction`, `createJsx` | TypeScript declarations and JSX. |
| `createType`, `createBreak` | TypeScript types and line breaks between nodes. |

```typescript
import { ast } from 'kubb/kit'

ast.factory.createSchema({ type: 'string', format: 'email' })
// { kind: 'Schema', type: 'string', primitive: 'string', format: 'email' }

ast.factory.createText('export const a = 1')
// { kind: 'Text', value: 'export const a = 1' }
```

### `ast.node`

`ast.node` walks and reads any node. Visitor objects use lowercase, kind-style keys (`input`, `operation`, `schema`, `property`, `parameter`, `response`). To rewrite nodes inside a plugin, use macros, which add names, ordering, and composition on top of `transform`.

| Helper | Returns |
| --- | --- |
| `ast.node.transform` | A copy of the tree with each visited node replaced by what the visitor returns. |
| `ast.node.collect` | Every non-null value a visitor returns, depth-first, as an array. |
| `ast.node.kinds` | The `kind` value of every node, such as `'Schema'`. |
| `ast.node.getText` | The text of code nodes, joined with new lines. |

Pass `depth: 'shallow'` to `transform` or `collect` to skip nested schema subtrees.

```typescript
import { ast } from 'kubb/kit'

const root = ast.factory.createInput({ schemas: [], operations: [] })

const strict = ast.node.transform(root, {
  schema(node) {
    return node.type === 'object' && node.additionalProperties === undefined ? { ...node, additionalProperties: false } : node
  },
})

const mutations = ast.node.collect<ast.OperationNode>(root, {
  operation(node) {
    return node.method === 'POST' ? node : undefined
  },
})
// Array<OperationNode>

ast.node.kinds.schema // 'Schema'
```

### `ast.file`

| Helper | Returns |
| --- | --- |
| `ast.file.inline` | `{ files, virtualPaths, problems }`, with names imported from virtual files replaced by their inline expression. |

### `ast.macro`

A macro is a named transform that rewrites nodes before printing. On top of `transform`, a macro adds ordering through `enforce` and gating through `match`. Define one with `defineMacro` from `kubb/kit`.

| Helper | Returns |
| --- | --- |
| `ast.macro.apply` | The tree after running a list of macros over it. |
| `ast.macro.compareOrder` | A sort result that puts `pre` macros first and `post` macros last. |

```typescript
import { ast, defineMacro } from 'kubb/kit'

const macroUntagged = defineMacro({
  name: 'untagged',
  operation: (node) => (node.tags?.length ? undefined : { ...node, tags: ['untagged'] }),
})

ast.macro.apply(operation, [macroUntagged]).tags // ['untagged']
```

Built-in macros:

| Macro | Purpose |
| --- | --- |
| `macroDedupeUnion` | Drop union members that repeat an earlier one, ignoring the source pointer. |
| `macroDiscriminatorEnum` | Replace a discriminator property's schema with an enum of its allowed values. |
| `macroEnumName` | Name an inline enum schema from its parent and property name. |

`macroSimplifyUnion` is the name `macroDedupeUnion` had before 5.16. It still works, but is deprecated: update the import.

```typescript
type Macro = {
  name: string
  enforce?: 'pre' | 'post'
  match?: (node: Node) => boolean
  schema?(node: SchemaNode, context): SchemaNode | null | undefined
  operation?(node: OperationNode, context): OperationNode | null | undefined
  // input, property, parameter, response
}
```

Each callback returns a replacement node, or `undefined` or `null` to leave the node untouched.

### `ast.ref`

| Helper | Returns |
| --- | --- |
| `ast.ref.getName` | The name a ref points at. A ref node gives its `targetName` first, so pass the node, not `node.ref`. Other nodes give `null`. |
| `ast.ref.getSchema` | The schema a ref node points at, or the node itself. |
| `ast.ref.isAlias` | Whether a ref adds nothing to its target, so it prints as just the target name. |
| `ast.ref.mergeSchema` | The ref node with its resolved schema merged in. Usage-site fields such as `description` and `nullable` win. |

`childName` and `enumPropName` build names, so they are named exports of `kubb/kit`.

```typescript
import { ast } from 'kubb/kit'

ast.ref.getName('#/components/schemas/Pet') // 'Pet'
ast.ref.getSchema(petRef).type // 'object'
ast.ref.isAlias(petRef) // true
```

### `ast.graph`

Analyze how schemas reference each other, to prune unused schemas or wrap circular ones in a lazy construct.

| Helper | Returns |
| --- | --- |
| `ast.graph.getRefNames` | Every schema name a node refers to, at any depth. |
| `ast.graph.getImportedNames` | The ref names a printed schema imports. Pass `{ checks: true }` to include refs inside `conditionals`, `contains`, and `content`. |
| `ast.graph.getUsedNames` | The schema names a set of operations reaches, directly or through other schemas. |
| `ast.graph.getCircularNames` | The schemas that take part in a circular chain, so they can be wrapped in a lazy getter. |
| `ast.graph.containsCircular` | Whether a schema reaches one of the circular schemas. |

```typescript
import { ast } from 'kubb/kit'

ast.graph.getRefNames(ownerSchema) // Set { 'Pet' }
ast.graph.getCircularNames([nodeSchema, tagSchema]) // Set { 'Node' }
ast.graph.containsCircular(ownerSchema, { circularSchemas: new Set(['Pet']) }) // true
```

### `ast.schema`

`ast.schema` narrows, finds and reads schema nodes, so a plugin does not walk them again.

| Helper | Returns |
| --- | --- |
| `ast.schema.types` | The `type` value of every schema, such as `'string'`. |
| `ast.schema.narrow` | The schema typed as the given `type`, or `null` when it is another type. |
| `ast.schema.find` | The first schema in a tree that matches. Set `followRefs: true` to look through resolved refs, and pass a `cache` to reuse earlier answers. |
| `ast.schema.applyOptionality` | The schema marked `optional` when not required, or `nullish` when it is also nullable. |
| `ast.schema.findProperties` | Every property with a given name on an object, a resolved ref, or an intersection. Unions are not searched. |
| `ast.schema.getLiterals` | The literal values an enum, a resolved ref, or a union of literals allows. |
| `ast.schema.inferDiscriminator` | The property every member pins to its own literal, which can act as an implicit discriminator. |
| `ast.schema.getEmbeddedJson` | The schema of the JSON document a string holds (`contentMediaType` with `contentSchema`). |
| `ast.schema.isString` | Whether a schema prints as a plain `string`, including `date` and `time` as strings. |
| `ast.schema.getNumberBounds` | The tightest inclusive `{ min, max }`, with exclusive bounds moved to the next `step`. |

```typescript
import { ast } from 'kubb/kit'

const root = ast.factory.createInput({ schemas: [], operations: [] })

const dateSchema = ast.schema.find(root, {
  followRefs: true,
  predicate: (schema) => schema.type === 'date',
})
```

To ask the same question for many schemas, keep one `cache` per predicate and `followRefs` value. Schemas that later calls reach again are not searched twice.

```typescript
const dateCache = new WeakMap<ast.SchemaNode, ast.SchemaNode | null>()
const hasDate = (schema: ast.SchemaNode) =>
  ast.schema.find(schema, { followRefs: true, cache: dateCache, predicate: (node) => node.type === 'date' }) !== undefined
```

```typescript
for (const node of ast.node.collect<ast.SchemaNode>(root, { schema: (node) => node })) {
  const obj = ast.schema.narrow(node, 'object')
  if (obj) {
    console.log(`object with ${obj.properties.length} properties`)
  }
}
```

```typescript
ast.schema.getLiterals(petKind) // ['cat', 'dog']
ast.schema.inferDiscriminator([catSchema, dogSchema]) // 'kind'
ast.schema.getNumberBounds({ min: 0.5, exclusive: { max: 10 }, integer: true }) // { min: 1, max: 9 }
```

### `ast.mediaType`

Every `ast.mediaType` helper takes a media type string or a content entry.

| Helper | Returns |
| --- | --- |
| `ast.mediaType.getBase` | The media type without parameters, in lowercase. |
| `ast.mediaType.isJson` | Whether a media type is `application/json`, `text/json`, or has a `+json` suffix. |
| `ast.mediaType.isStream` | Whether a media type is server-sent events, JSON Lines, or a JSON text sequence (`+json-seq`). |

```typescript
ast.mediaType.getBase('Application/JSON; charset=utf-8') // 'application/json'
ast.mediaType.isJson('application/problem+json') // true
ast.mediaType.isStream('text/event-stream') // true
```

### `ast.server`

| Helper | Returns |
| --- | --- |
| `ast.server.get` | The server at `index`, falling back to the first one. |
| `ast.server.groupByName` | Each server name mapped to its server. The first server with a name wins. |

### `ast.auth`

| Helper | Returns |
| --- | --- |
| `ast.auth.getRequirements` | Each of `node.auth`'s requirements with its schemes. Undeclared and repeated requirements are dropped. |

```typescript
ast.auth.getRequirements({ auth: node.auth, schemes })
// [[{ name: 'oauth', credential: { type: 'oauth2' }, scopes: ['read:pets'] }]]
```

### `ast.http`

`ast.http` works for HTTP operations only.

| Helper | Returns |
| --- | --- |
| `ast.http.isOperation` | Whether an operation is an HTTP operation, narrowing it so `method` and `path` are present. |
| `ast.http.groupParameters` | The parameters by location (`path`, `query`, `header`, `cookie`), first of a repeated name. |
| `ast.http.getBaseURL` | A server's URL when it is absolute and has no template variables, else `undefined`. |
| `ast.http.requestBody.getSchema` | The schema of the first request body entry, or `undefined` when the operation takes no body. |

```typescript
import { ast } from 'kubb/kit'

// string | undefined
const baseURL = ast.http.getBaseURL(ast.server.get({ servers: node.servers, index: 0 }))
```

#### `ast.http.responses`

| Helper | Returns |
| --- | --- |
| `ast.http.responses.filterSuccess` | The operation's `2xx` responses, ranges included. |
| `ast.http.responses.findPrimary` | The success response a client returns: one with a body first, then an exact code over a range. |
| `ast.http.responses.filterError` | The operation's `4xx` and `5xx` responses, ranges included. |
| `ast.http.responses.getImportedNames` | The ref names the response bodies import, so a generator can import their types. |

#### `ast.http.status`

Every `ast.http.status` helper takes a status code, a range, or a response.

| Helper | Returns |
| --- | --- |
| `ast.http.status.getClass` | The class digit: `2` for `201` and `2xx`, `null` for `default`. |
| `ast.http.status.isSuccess` | Whether the code is `2xx`. |
| `ast.http.status.isError` | Whether the code is `4xx` or `5xx`. |
| `ast.http.status.toCode` | One concrete code: `200` for `2xx` and `default`. |

## Printers

`createPrinter` and `defineMacro` are authoring helpers, so they are top-level exports of `kubb/kit`, next to `defineGenerator` and `definePlugin`.

| Export | Returns |
| --- | --- |
| `createPrinter` | A printer factory: it takes the printer options and returns a `Printer`. |
| `defineMacro` | The same macro object, typed as a `Macro`. |

`createPrinter` takes an `overrides` map to replace the handler for individual schema node types.

```typescript
type PrinterNodes = Partial<{
  [K in SchemaType]: (this: Context, node: SchemaNodeByType[K]) => Output | null
}>
```

## Notes

- Source: https://kubb.dev/docs/5.x/reference/kit/ast (docs/5.x/reference/kit/ast.md at kubb@5.20.0, retrieved 2026-11-14)
- Migration (5.11 → 5.20): the top-level helpers moved into groups (`ast.transform` → `ast.node.transform`, `ast.collect` / `ast.collectSync` → `ast.node.collect`, `ast.narrowSchema` → `ast.schema.narrow`, `ast.findSchema` → `ast.schema.find`, `ast.applyMacros` → `ast.macro.apply`, `ast.inlineFiles` → `ast.file.inline`, `ast.isHttpOperationNode` → `ast.http.isOperation`); the old names are deprecated aliases that Kubb v6 removes (changelog v5.18.6, #4583). `ast.createPrinter` and `ast.defineMacro` are now `createPrinter` and `defineMacro` from `kubb/kit`.
- Migration (5.11 → 5.20): `macroSimplifyUnion` is renamed `macroDedupeUnion` (v5.16.0, #4536) and kept as a deprecated alias (v5.16.1, #4552); `macroRenameSchema` is removed from `kubb/kit` (v5.15.2, #4508) and `ast.composeMacros`, `ast.forEachChild`, `ast.forEachSchema`, `ast.isVirtualFile`, `ast.findCircularSchemasFromGraph` and the `ParentOf` type are removed (use `ast.node.collect` to walk nodes and `ast.macro.apply` to run macros); the Macro callbacks no longer list `output`.
- Migration (5.11 → 5.20): `InputMeta.circularNames` and `InputMeta.enumNames` were made `ReadonlySet<string>` in v5.15.1 (#4506) and removed in v5.15.2 (#4508), along with the matching `BannerMeta` fields. Build them once per build with `ctx.memo('circularNames:set', () => ast.findCircularSchemas(schemas))` (as the changelog shows; the grouped equivalent is `ast.graph.getCircularNames`). `ctx.cache` and the `NodeCache` type are also removed there: replace `ctx.cache.ensureItem(key, compute)` with `ctx.memo(key, compute)`.
- `macroDiscriminatorEnum` and `macroEnumName` read options, so call them to build the macro. A plugin that imports another plugin's output computes names from the nodes it sees, so register a rename on every plugin that touches the schema (for example pass one shared `macros` array to each plugin). The official macros guide shows a rename macro to copy into your project, since `macroRenameSchema` is gone.
- Pass printer overrides through the `overrides` field rather than spreading them into `nodes`, otherwise `this.base` cannot find the original handler. The `printer.nodes` option on `@kubb/plugin-ts`, `@kubb/plugin-zod`, and `@kubb/plugin-faker` feeds this map.
- Printer handlers run with a `this` context, so write them as regular functions, not arrow functions. `this.transform(node)` recurses through the full handler map, `this.base(node)` runs the built-in handler, `this.options` reads resolved printer options, and `this.import(ast.factory.createImport(...))` declares an import. In your own generator, call `printer.drainImports()` after printing to collect them.
- For rewriting nodes inside a plugin, prefer macros over bare `transform`.

## Related

- [Generators](./generators.md)
- [Adapters](./adapters.md)
- [Parsers](./parsers.md)
