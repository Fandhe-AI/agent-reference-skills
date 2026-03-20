# Zod 4 Release Notes

New features, performance benchmarks, bundle size improvements, and architectural changes in Zod 4.

## Installation

```bash
npm install zod@^4
```

Zod 4 is published under the `zod` package name. There are three entry points:

```typescript
import { z } from "zod";           // Full Zod package
import { z } from "zod/v4/mini";   // Zod Mini (smaller bundle)
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
| `zod/v4/mini` | ~4 kB    | ~6.6x smaller       |

## Zod Mini

Zod Mini (`zod/v4/mini`) is a tree-shakable, smaller build of Zod that uses a functional API for refinements and transforms instead of method chaining.

```typescript
import { z } from "zod/v4/mini";

// Same schema creation API
const schema = z.object({
  name: z.string(),
  age: z.number(),
});

// Functional API for checks and transforms
import { z } from "zod/v4/mini";

const positiveNumber = z.pipe(
  z.number(),
  z.check((val) => val > 0, "Must be positive")
);

const doubled = z.pipe(
  z.number(),
  z.transform((val) => val * 2)
);
```

Key differences from the full `zod` package:

- No `.refine()`, `.transform()`, `.superRefine()` methods on schemas
- Uses `z.check()` (instead of `.refine()`) and `z.transform()` (instead of `.transform()`) as standalone pipe stages
- Better tree-shaking since unused features are not bundled
- Same runtime behavior and type inference

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
  target: "draft-2020-12", // or "draft-7", "draft-2019-09"
  unrepresentable: "throw", // or "any" — how to handle schemas that can't be represented
});
```

## Recursive Object Type Inference

Zod 4 can infer recursive types without manual type annotations:

```typescript
import { z } from "zod";

const Category = z.object({
  name: z.string(),
  subcategories: z.lazy(() => z.array(Category)),
});

// TypeScript correctly infers the recursive type
type Category = z.infer<typeof Category>;
// { name: string; subcategories: Category[] }
```

In Zod 3, recursive schemas required explicit type annotations. Zod 4 handles this automatically through improved `z.lazy()` inference.

## File Schema Validation

Zod 4 adds a `z.file()` schema for validating `File` and `Blob` objects:

```typescript
import { z } from "zod";

const fileSchema = z.file();
fileSchema.parse(new File(["content"], "file.txt")); // OK

// With constraints
const imageSchema = z
  .file()
  .type("image/png")     // MIME type check
  .max(5 * 1024 * 1024); // 5MB max

const multiType = z
  .file()
  .type("image/*");       // Wildcard MIME matching
```

## Internationalization (i18n)

Zod 4 supports localized error messages via `z.locales`:

```typescript
import { z } from "zod";

// Set a locale globally
z.locales.set("en", {
  invalid_type: ({ expected, received }) =>
    `Expected ${expected}, received ${received}`,
  too_small: ({ minimum }) =>
    `Value must be at least ${minimum}`,
});

// Activate a locale
z.locales.activate("en");

// Or set per-parse
z.string().min(5).safeParse("hi", { locale: "ja" });
```

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

Parse string representations of booleans:

```typescript
import { z } from "zod";

const schema = z.stringbool();

schema.parse("true");  // => true
schema.parse("false"); // => false
schema.parse("1");     // => true
schema.parse("0");     // => false
schema.parse("yes");   // Error
schema.parse(true);    // Error (input must be a string)

// Customize accepted values
const custom = z.stringbool({
  truthy: ["yes", "on", "1", "true"],
  falsy: ["no", "off", "0", "false"],
});
```

## Discriminated Union Improvements

Zod 4 automatically detects discriminator keys in unions — no need for `z.discriminatedUnion()`:

```typescript
import { z } from "zod";

// z.union() now automatically optimizes discriminated unions
const Shape = z.union([
  z.object({ type: z.literal("circle"), radius: z.number() }),
  z.object({ type: z.literal("square"), side: z.number() }),
  z.object({ type: z.literal("triangle"), base: z.number(), height: z.number() }),
]);

// z.discriminatedUnion() still works but is no longer necessary
// z.union() with literal discriminators is just as fast
```

Zod 4 can detect discriminators across nested properties and even multiple discriminator keys.

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
zod/v4/mini   ← Zod Mini (functional API, smaller bundle)
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

Both `zod` and `zod/v4/mini` are built on top of `zod/v4/core`, sharing the same internal types and parsing engine. Library authors should depend on `zod/v4/core` to avoid coupling to either API style.

## Related

- [Zod 4 Migration Guide](./v4-migration-guide.md)
- [Error Customization](../errors/error-customization.md)
- [Error Formatting](../errors/error-formatting.md)
- [Metadata and Registries](../advanced/metadata.md)
