# Zod 4 Release Notes

New features, performance benchmarks, bundle size improvements, and architectural changes in Zod 4.

## Installation

```bash
npm install zod@^4
```

Zod 4 is published under the `zod` package name. There are three entry points:

```typescript
import { z } from "zod";           // Full Zod package
import * as z from "zod/mini";      // Zod Mini (smaller bundle)
import * as core from "zod/v4/core"; // Core internals for library authors
```

## Performance Benchmarks

Zod 4 delivers dramatic speed improvements over Zod 3:

| Benchmark         | Improvement |
|-------------------|-------------|
| String parsing    | ~14x faster |
| Array parsing     | ~7x faster  |
| Object parsing    | ~6.5x faster|

These gains come from a ground-up rewrite of the parsing engine, eliminating unnecessary allocations and optimizing the hot path for common schemas.

## TypeScript Compiler Efficiency

Zod 4 achieves a ~100x reduction in TypeScript compiler instantiations compared to Zod 3. This means:

- Faster `tsc` compilation times in projects using Zod
- Lower memory usage from the TypeScript language server
- Better IDE responsiveness when working with complex schemas

The improvement comes from simplified internal generic types and reduced reliance on deeply nested conditional types.

## Bundle Size

| Package   | Minified Size | Reduction vs Zod 3 |
|-----------|---------------|---------------------|
| `zod`     | ~13 kB        | ~2x smaller         |
| `zod/mini` | ~4 kB    | ~6.6x smaller       |

## Zod Mini

Zod Mini (`zod/mini`) is a variant with a functional, tree-shakable API that corresponds one-to-one with `zod`. Where Zod uses methods, Zod Mini generally uses wrapper functions:

```ts
import * as z from "zod/mini";

z.optional(z.string());

z.union([z.string(), z.number()]);

z.extend(z.object({ /* ... */ }), { age: z.number() });
```

The parsing methods are identical in Zod and Zod Mini. There is also a general-purpose `.check()` method used to add refinements:

```ts
import * as z from "zod/mini";

z.array(z.number()).check(
  z.minLength(5), 
  z.maxLength(10),
  z.refine(arr => arr.includes(5))
);
```

## Metadata System

Zod 4 introduces a first-class metadata system using registries.

### Global Registry

```typescript
import { z } from "zod";

const schema = z.string().meta({
  description: "A user's email address",
  example: "alice@example.com",
});

// Read metadata
schema._zod.meta;
// => { description: "A user's email address", example: "alice@example.com" }
```

### Custom Registries

Registries let you associate typed metadata with any schema:

```typescript
import { z } from "zod";

// Create a typed registry
const myRegistry = z.registry<{
  title: string;
  description?: string;
}>();

const emailSchema = z.string().meta(myRegistry, {
  title: "Email",
  description: "A valid email address",
});

// Read from a specific registry
myRegistry.get(emailSchema);
// => { title: "Email", description: "A valid email address" }
```

### Global Registry

The `z.globalRegistry` is the default registry used by `.meta()` when no registry is specified:

```typescript
import { z } from "zod";

const schema = z.string().meta({ description: "A name" });

// Equivalent to:
const schema2 = z.string().meta(z.globalRegistry, { description: "A name" });

z.globalRegistry.get(schema);
// => { description: "A name" }
```

## JSON Schema Conversion

Zod 4 has built-in JSON Schema generation via `z.toJSONSchema()`:

```typescript
import { z } from "zod";

const User = z.object({
  name: z.string(),
  age: z.number().int().min(0),
  email: z.email().optional(),
});

const jsonSchema = z.toJSONSchema(User);
// {
//   type: "object",
//   properties: {
//     name: { type: "string" },
//     age: { type: "integer", minimum: 0 },
//     email: { type: "string", format: "email" }
//   },
//   required: ["name", "age"]
// }
```

Metadata from registries can be included in generated JSON Schema:

```typescript
import { z } from "zod";

const schema = z.string().meta({
  description: "User's full name",
  title: "Name",
});

z.toJSONSchema(schema);
// { type: "string", description: "User's full name", title: "Name" }
```

Configure the output with options:

```typescript
z.toJSONSchema(schema, {
  target: "draft-2020-12", // or "draft-07", "draft-04", "openapi-3.0"
  unrepresentable: "throw", // or "any" — how to handle schemas that can't be represented
});
```

## Recursive Object Type Inference

Zod 4 can infer recursive types without manual type annotations:

```typescript
import { z } from "zod";

const Category = z.object({
  name: z.string(),
  get subcategories(){
    return z.array(Category)
  }
});

type Category = z.infer<typeof Category>;
// { name: string; subcategories: Category[] }
```

Unlike the Zod 3 pattern for recursive types, there's no type casting required. The resulting schemas are plain `ZodObject` instances and have the full set of methods available.

## File Schema Validation

To validate `File` instances:

```ts
const fileSchema = z.file();

fileSchema.min(10_000); // minimum .size (bytes)
fileSchema.max(1_000_000); // maximum .size (bytes)
fileSchema.mime(["image/png"]); // MIME type
```

## Internationalization (i18n)

Zod 4 introduces a new `locales` API for globally translating error messages into different languages.

```typescript
import * as z from "zod";
import { en } from "zod/locales";

// configure English locale (default)
z.config(en());
```

See the full list of supported locales in [Error Customization](../errors/error-customization.md); the official release notes keep that list up to date as new languages become available.

## `z.prettifyError()`

Format `ZodError` into a human-readable string:

```typescript
import { z } from "zod";

const result = z.object({
  name: z.string(),
  age: z.number(),
}).safeParse({ name: 42, age: "old" });

if (!result.success) {
  console.log(z.prettifyError(result.error));
  // ┌ ZodError
  // │
  // ├ name  Invalid input: expected string, received number
  // ├ age   Invalid input: expected number, received string
  // │
  // └
}
```

## Unified `error` Parameter

In Zod 4, virtually every API that can fail accepts an `error` parameter (replacing the Zod 3 `message` option and `invalid_type_error` / `required_error`):

```typescript
import { z } from "zod";

// Pass a string directly
z.string("Must be a string!");
z.number().min(5, "Too small!");
z.uuid("Invalid UUID!");

// Pass a function for dynamic messages
z.number().max(100, (issue) => `Got ${issue.input}, max is 100`);

// Pass an error map function (applies to all issues from this schema)
z.string({
  error: (issue) => {
    if (issue.code === "invalid_type") return "Not a string!";
    return "Invalid string!";
  },
});
```

## String Format Functions (Top-Level)

Zod 4 exposes commonly used string formats as top-level functions:

```typescript
import { z } from "zod";

// These are standalone schemas, not methods on z.string()
z.email();          // validates email addresses
z.uuid();           // validates UUIDs
z.url();            // validates URLs
z.emoji();          // validates emoji strings
z.nanoid();         // validates nanoid strings
z.cuid();           // validates CUIDs
z.cuid2();          // validates CUID2s
z.ulid();           // validates ULIDs
z.ipv4();           // validates IPv4 addresses
z.ipv6();           // validates IPv6 addresses
z.cidrv4();         // validates CIDR v4 notation
z.cidrv6();         // validates CIDR v6 notation
z.base64();         // validates base64 strings
z.base64url();      // validates base64url strings
z.jwt();            // validates JWTs (structure only)
z.json();           // validates JSON strings (and parses them)

// ISO format functions under z.iso namespace
z.iso.date();       // validates ISO date strings (YYYY-MM-DD)
z.iso.time();       // validates ISO time strings
z.iso.datetime();   // validates ISO datetime strings
z.iso.duration();   // validates ISO duration strings
```

These are equivalent to `z.string().email()` etc. but more concise and better for tree-shaking.

## Template Literals

Zod 4 supports template literal schemas:

```typescript
import { z } from "zod";

const idSchema = z.templateLiteral([z.literal("user_"), z.string()]);
type Id = z.infer<typeof idSchema>; // `user_${string}`

idSchema.parse("user_abc123"); // OK
idSchema.parse("post_abc123"); // Error

// Complex template literals
const versionSchema = z.templateLiteral([
  z.literal("v"),
  z.number(),
  z.literal("."),
  z.number(),
]);
type Version = z.infer<typeof versionSchema>; // `v${number}.${number}`
```

## Fixed-Width Numeric Formats

Zod 4 adds fixed-width integer and float schemas for precise numeric validation:

```typescript
import { z } from "zod";

// Signed integers
z.int32();   // -2^31 to 2^31-1
z.int64();   // uses bigint under the hood for full range

// Unsigned integers
z.uint32();  // 0 to 2^32-1

// Floating point
z.float32(); // 32-bit float range
z.float64(); // 64-bit float range (same as standard JS number range)
```

These are useful for interoperability with APIs, databases, or binary protocols that require specific numeric ranges.

## `z.stringbool()`

The existing `z.coerce.boolean()` API is very simple: falsy values (`false`, `undefined`, `null`, `0`, `""`, `NaN` etc) become `false`, truthy values become `true`.

This is still a good API, and its behavior aligns with the other `z.coerce` APIs. But some users requested a more sophisticated "env-style" boolean coercion. To support this, Zod 4 introduces `z.stringbool()`:

```ts
const strbool = z.stringbool();

strbool.parse("true")         // => true
strbool.parse("1")            // => true
strbool.parse("yes")          // => true
strbool.parse("on")           // => true
strbool.parse("y")            // => true
strbool.parse("enabled")      // => true

strbool.parse("false");       // => false
strbool.parse("0");           // => false
strbool.parse("no");          // => false
strbool.parse("off");         // => false
strbool.parse("n");           // => false
strbool.parse("disabled");    // => false

strbool.parse(/* anything else */); // ZodError<[{ code: "invalid_value" }]>
```

To customize the truthy and falsy values:

```ts
z.stringbool({
  truthy: ["yes", "true"],
  falsy: ["no", "false"]
})
```

## Upgraded `z.discriminatedUnion()`

Discriminated unions now support a number of schema types not previously supported, including unions and pipes:

```ts
const MyResult = z.discriminatedUnion("status", [
  // simple literal
  z.object({ status: z.literal("aaa"), data: z.string() }),
  // union discriminator
  z.object({ status: z.union([z.literal("bbb"), z.literal("ccc")]) }),
  // pipe discriminator
  z.object({ status: z.literal("fail").transform(val => val.toUpperCase()) }),
]);
```

Perhaps most importantly, discriminated unions now *compose*—you can use one discriminated union as a member of another.

```ts
const BaseError = z.object({ status: z.literal("failed"), message: z.string() });

const MyResult = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.discriminatedUnion("code", [
    BaseError.extend({ code: z.literal(400) }),
    BaseError.extend({ code: z.literal(401) }),
    BaseError.extend({ code: z.literal(500) })
  ])
]);
```

## `.overwrite()`

The `.overwrite()` method lets you modify the parsed value in-place without changing the output type:

```typescript
import { z } from "zod";

const schema = z.string().overwrite((val) => val.trim().toLowerCase());

schema.parse("  HELLO  "); // => "hello"

// The output type remains `string` (unlike .transform() which changes the type)
type Output = z.output<typeof schema>; // string
```

This is useful for normalization where the type doesn't change, avoiding the type-widening issues of `.transform()`.

## `zod/v4/core` Architecture

Zod 4 is built on a layered architecture:

```
zod/v4/core   ← Internal core (for library authors)
    ↑
   zod         ← Full Zod package (method-chaining API)
    ↑
zod/mini      ← Zod Mini (functional API, smaller bundle)
```

### `zod/v4/core`

The core package exposes the internal schema classes and parsing logic. It is intended for library authors building Zod-compatible tools:

```typescript
import * as core from "zod/v4/core";

// Access internal schema classes
core.$ZodString;
core.$ZodNumber;
core.$ZodObject;

// The base error class
core.$ZodError;

// Schema internals are accessed via `_zod` property
const schema = z.string();
schema._zod.def;      // the schema definition object
schema._zod.meta;     // attached metadata
schema._zod.parse(value, ctx); // internal parse method
```

Both `zod` and `zod/mini` are built on top of `zod/v4/core`, sharing the same internal types and parsing engine. Library authors should depend on `zod/v4/core` to avoid coupling to either API style.

## Related

- [Zod 4 Migration Guide](./v4-migration-guide.md)
- [Error Customization](../errors/error-customization.md)
- [Error Formatting](../errors/error-formatting.md)
- [Metadata and Registries](../advanced/metadata.md)
