# JSON Schema

Convert between Zod schemas and JSON Schema for OpenAPI definitions, AI structured outputs, and interoperability.

## `z.fromJSONSchema()`

> **Experimental** -- This function is experimental and may undergo changes in future releases.

Convert a JSON Schema into a Zod schema:

```typescript
import * as z from "zod";

const jsonSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
  },
  required: ["name", "age"],
};

const zodSchema = z.fromJSONSchema(jsonSchema);
```

Since 4.6 it also enforces six validation keywords it used to ignore: `minProperties` / `maxProperties`, `uniqueItems`, `contains`, and `minContains` / `maxContains`.

```typescript
const schema = z.fromJSONSchema({
  type: "object",
  minProperties: 2,      // also maxProperties
});

schema.parse({ a: 1 });        // fails (too few properties)
schema.parse({ a: 1, b: 2 });  // passes
```

Both property bounds count the input's own keys. Array uniqueness is structural, so `[{ a: 1 }, { a: 1 }]` is a duplicate.

```typescript
z.fromJSONSchema({ type: "array", uniqueItems: true }).parse([{ a: 1 }, { a: 1 }]); // fails

z.fromJSONSchema({
  type: "array",
  contains: { type: "number" },   // also minContains and maxContains
  minContains: 2,
}).parse(["a", 2]);               // fails (only one number)
```

## `z.toJSONSchema()`

Convert a Zod schema to JSON Schema:

```typescript
import * as z from "zod";

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

z.toJSONSchema(schema);
// => {
//   type: 'object',
//   properties: { name: { type: 'string' }, age: { type: 'number' } },
//   required: [ 'name', 'age' ],
//   additionalProperties: false,
// }
```

### Parameters

A second argument customizes the conversion logic:

```typescript
interface ToJSONSchemaParams {
  /** JSON Schema version to target.
   * - "draft-2020-12" — Default
   * - "draft-07" — JSON Schema Draft 7
   * - "draft-04" — JSON Schema Draft 4
   * - "openapi-3.0" — OpenAPI 3.0 Schema Object */
  target?:
    | "draft-04"
    | "draft-4"
    | "draft-07"
    | "draft-7"
    | "draft-2020-12"
    | "openapi-3.0"
    | ({} & string)
    | undefined;

  /** A registry used to look up metadata for each schema.
   * Any schema with an `id` property will be extracted as a $def. */
  metadata?: $ZodRegistry<Record<string, any>>;

  /** How to handle unrepresentable types.
   * - "throw" — Default. Throws an error
   * - "any" — Becomes {} */
  unrepresentable?: "throw" | "any";

  /** How to handle cycles.
   * - "ref" — Default. Cycles broken using $defs
   * - "throw" — Throws an error */
  cycles?: "ref" | "throw";

  /** How to handle reused schemas.
   * - "inline" — Default. Reused schemas are inlined
   * - "ref" — Extracted as $defs */
  reused?: "ref" | "inline";

  /** Convert `id` values to URIs for external $refs.
   * Default is (id) => id. */
  uri?: (id: string) => string;
}
```

### `io`

Some schema types have different input and output types (e.g. `ZodPipe`, `ZodDefault`, coerced primitives). By default, `z.toJSONSchema` represents the **output type**; use `"io": "input"` to extract the input type instead.

```typescript
const mySchema = z.string().transform((val) => val.length).pipe(z.number());

const jsonSchema = z.toJSONSchema(mySchema);
// => { type: "number" }

const jsonSchema = z.toJSONSchema(mySchema, { io: "input" });
// => { type: "string" }
```

### `target`

Set the target JSON Schema version. Default is Draft 2020-12.

```typescript
z.toJSONSchema(schema, { target: "draft-07" });
z.toJSONSchema(schema, { target: "draft-2020-12" });
z.toJSONSchema(schema, { target: "draft-04" });
z.toJSONSchema(schema, { target: "openapi-3.0" });
```

### `metadata`

Metadata stored in registries is included in the output. The `.meta()` method registers metadata in `z.globalRegistry`:

```typescript
import * as z from "zod";

const emailSchema = z.string().meta({
  title: "Email address",
  description: "Your email address",
});

z.toJSONSchema(emailSchema);
// => { type: "string", title: "Email address", description: "Your email address", ... }
```

All metadata fields get copied into the resulting JSON Schema:

```typescript
const schema = z.string().meta({
  whatever: 1234,
});

z.toJSONSchema(schema);
// => { type: "string", whatever: 1234 }
```

Metadata takes precedence over the keywords Zod generates:

```typescript
z.toJSONSchema(z.string().meta({ type: "number" }));
// => { type: "number" }

z.toJSONSchema(z.date().meta({ type: "string", format: "date-time" }), { unrepresentable: "any" });
// => { type: "string", format: "date-time" }
```

To drop metadata entirely, pass an empty registry: `z.toJSONSchema(schema, { metadata: z.registry() })`. To modify a generated schema, use `override`.

### `unrepresentable`

The following types have no JSON Schema equivalent and will throw by default:

```typescript
z.bigint();    // not representable
z.int64();     // not representable
z.symbol();    // not representable
z.undefined(); // not representable
z.void();      // not representable
z.date();      // not representable
z.map();       // not representable
z.set();       // not representable
z.transform(); // not representable
z.nan();       // not representable
z.custom();    // not representable
z.number().multipleOf(0); // not representable (the divisor must be finite and non-zero)
```

```typescript
z.toJSONSchema(z.bigint());
// => throws Error

z.toJSONSchema(z.bigint(), { unrepresentable: "any" });
// => {}  (equivalent of unknown in JSON Schema)
```

`"any"` converts any unrepresentable type to `{}` and drops an unrepresentable check from the schema that carries it:

```typescript
z.toJSONSchema(z.number().multipleOf(0), { unrepresentable: "any" });
// => { type: "number" }
```

To decide case by case, pass a function instead: `unrepresentable: ({ zodSchema, path, message }) => JSONSchema | "any" | "throw"`. It's called for each unrepresentable schema encountered. Return a JSON Schema to use in its place, `"any"`, or `"throw"` (the default when you return nothing).

```typescript
z.toJSONSchema(z.object({ createdAt: z.date(), id: z.bigint() }), {
  unrepresentable: ({ zodSchema }) =>
    zodSchema._zod.def.type === "date" ? { type: "string", format: "date-time" } : "throw",
});
// => throws Error (BigInt cannot be represented in JSON Schema)
```

The handler also receives the `path` of the schema and the `message` Zod would have thrown, and any error it throws propagates, so you can report unrepresentable types in your own words.

```typescript
z.toJSONSchema(schema, {
  unrepresentable: ({ path, message }) => {
    throw new Error(`${message} (at /${path.join("/")})`);
  },
});
```

Two schemas can share a `zodSchema` but not a `message` (an `undefined` member and a `bigint` member of the same literal both arrive as the literal), so branch on `message` to tell those apart.

A default value that can't be serialized to JSON goes through the same handler, as the `.default()` schema. Under `"any"` the default is dropped and the rest of the schema is emitted as usual; return a JSON Schema to supply your own.

```typescript
z.toJSONSchema(z.bigint().default(0n), {
  unrepresentable: ({ zodSchema }) => {
    const def = zodSchema._zod.def;
    if (def.type === "bigint") return { type: "integer", format: "int64" };
    if (def.type === "default") return { default: String(def.defaultValue) };
    return "throw";
  },
});
// => { type: "integer", format: "int64", default: "0" }
```

Returning a JSON Schema for a literal replaces the whole literal, dropping its representable members: `z.literal(["a", 1n])` becomes just what you returned, and `"a"` is gone. Return `"any"` instead to keep the existing per-value behavior.

### `cycles`

Cycles are represented using `$ref`:

```typescript
const User = z.object({
  name: z.string(),
  get friend() {
    return User;
  },
});

z.toJSONSchema(User);
// => {
//   type: 'object',
//   properties: { name: { type: 'string' }, friend: { '$ref': '#' } },
//   required: [ 'name', 'friend' ],
//   additionalProperties: false,
// }

z.toJSONSchema(User, { cycles: "throw" });
// => throws Error
```

### `reused`

Control how schemas that occur multiple times are handled:

```typescript
const name = z.string();
const User = z.object({
  firstName: name,
  lastName: name,
});

// Default: "inline"
z.toJSONSchema(User);
// => {
//   type: 'object',
//   properties: {
//     firstName: { type: 'string' },
//     lastName: { type: 'string' }
//   },
//   required: [ 'firstName', 'lastName' ],
//   additionalProperties: false,
// }

// Extract to $defs
z.toJSONSchema(User, { reused: "ref" });
// => {
//   type: 'object',
//   properties: {
//     firstName: { '$ref': '#/$defs/__schema0' },
//     lastName: { '$ref': '#/$defs/__schema0' }
//   },
//   required: [ 'firstName', 'lastName' ],
//   additionalProperties: false,
//   '$defs': { __schema0: { type: 'string' } }
// }
```

### `override`

Define custom conversion logic. The callback receives the original Zod schema and the default JSON Schema. **Directly modify `ctx.jsonSchema`**:

```typescript
const mySchema = /* ... */;
z.toJSONSchema(mySchema, {
  override: (ctx) => {
    ctx.zodSchema; // the original Zod schema
    ctx.jsonSchema; // the default JSON Schema

    // directly modify
    ctx.jsonSchema.whatever = "sup";
  },
});
```

To handle unrepresentable types with override, set `unrepresentable: "any"` alongside it:

```typescript
// support z.date() as ISO datetime strings
const result = z.toJSONSchema(z.date(), {
  unrepresentable: "any",
  override: (ctx) => {
    const def = ctx.zodSchema._zod.def;
    if (def.type === "date") {
      ctx.jsonSchema.type = "string";
      ctx.jsonSchema.format = "date-time";
    }
  },
});
```

## Conversion Details

### String Formats

```typescript
// Supported via `format`
z.email();          // => { type: "string", format: "email" }
z.iso.datetime();   // => { type: "string", format: "date-time" }
z.iso.date();       // => { type: "string", format: "date" }
z.iso.duration();   // => { type: "string", format: "duration" }
z.ipv4();           // => { type: "string", format: "ipv4" }
z.ipv6();           // => { type: "string", format: "ipv6" }
z.uuid();           // => { type: "string", format: "uuid" }
z.guid();           // => { type: "string", format: "uuid" }
z.url();            // => { type: "string", format: "uri" }

// Supported via `contentEncoding`
z.base64();         // => { type: "string", contentEncoding: "base64" }

// Supported via `pattern`
z.iso.time();
z.base64url();
z.cuid();
z.emoji();
z.nanoid();
z.cuid2();
z.ulid();
z.cidrv4();
z.cidrv6();
z.mac();
z.currencyCode();
```

The `local: true` and `precision: -1` variants of `z.iso.datetime()` fall back to `pattern`, since RFC 3339 `date-time` requires both an offset and seconds.

### Numeric Types

```typescript
// number
z.number();   // => { type: "number" }
z.float32();  // => { type: "number", exclusiveMinimum: ..., exclusiveMaximum: ... }
z.float64();  // => { type: "number", exclusiveMinimum: ..., exclusiveMaximum: ... }

// integer
z.int();      // => { type: "integer" }
z.int32();    // => { type: "integer", exclusiveMinimum: ..., exclusiveMaximum: ... }
```

### Object Schemas

By default, `z.object()` schemas include `additionalProperties: false` (matching Zod's default stripping behavior):

```typescript
z.toJSONSchema(z.object({ name: z.string() }));
// => { type: 'object', properties: { name: { type: 'string' } }, required: ['name'], additionalProperties: false }

// In "input" mode, additionalProperties is not set
z.toJSONSchema(z.object({ name: z.string() }), { io: "input" });
// => { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] }
```

- `z.looseObject()` -- never sets `additionalProperties: false`
- `z.strictObject()` -- always sets `additionalProperties: false`

### File Schemas

```typescript
z.file();
// => { type: "string", format: "binary", contentEncoding: "binary" }

z.file().min(1).max(1024 * 1024).mime("image/png");
// => {
//   type: "string",
//   format: "binary",
//   contentEncoding: "binary",
//   contentMediaType: "image/png",
//   minLength: 1,
//   maxLength: 1048576,
// }
```

### Nullability

```typescript
z.null();
// => { type: "null" }

z.nullable(z.string());
// => { oneOf: [{ type: "string" }, { type: "null" }] }

z.optional(z.string());
// => { type: "string" }
```

Note: `z.undefined()` is unrepresentable in JSON Schema.

## Registries with External `$ref`

Pass a registry into `z.toJSONSchema()` to generate multiple interlinked JSON Schemas. All schemas must have a registered `id` property.

```typescript
import * as z from "zod";

const User = z.object({
  name: z.string(),
  get posts() {
    return z.array(Post);
  },
});

const Post = z.object({
  title: z.string(),
  content: z.string(),
  get author() {
    return User;
  },
});

z.globalRegistry.add(User, { id: "User" });
z.globalRegistry.add(Post, { id: "Post" });

z.toJSONSchema(z.globalRegistry);
// => {
//   schemas: {
//     User: {
//       id: 'User',
//       type: 'object',
//       properties: {
//         name: { type: 'string' },
//         posts: { type: 'array', items: { '$ref': 'Post' } }
//       },
//       ...
//     },
//     Post: {
//       id: 'Post',
//       type: 'object',
//       properties: {
//         title: { type: 'string' },
//         content: { type: 'string' },
//         author: { '$ref': 'User' }
//       },
//       ...
//     }
//   }
// }
```

Use the `uri` option to produce fully-qualified `$ref` URIs:

```typescript
z.toJSONSchema(z.globalRegistry, {
  uri: (id) => `https://example.com/${id}.json`,
});
// $ref values become e.g. 'https://example.com/Post.json'
```

## Notes

- Since 4.6, chained checks fold as a conjunction in the output, so the order they are chained in no longer changes it. `z.number().min(0).max(23).int()` emits `{ minimum: 0, maximum: 23 }` (4.5 emitted `{ minimum: -9007199254740991, maximum: 9007199254740991 }`); a repeated `multipleOf` is kept (`z.number().multipleOf(2).multipleOf(3)` no longer emits a schema that accepts 4); `z.string().min(8).length(5)` no longer emits `minLength: 5`. Runtime parsing enforced the bounds in every version
- Since 4.6, the `z.email()` `pattern` emitted here no longer carries a lookahead, so validators outside ECMAScript can compile it
- `z.base64()` / `z.base64url()` JSON Schema output is unchanged in 4.6 (the runtime patterns changed, the emitted block forms did not)

## Related

- [Metadata and Registries](./metadata.md)
- [Codecs](./codecs.md)
- [Defining Schemas](../api/README.md)
