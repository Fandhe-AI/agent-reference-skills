---
source: https://zod.dev/v4
---

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

Measured by bundling a simple `z.boolean()` + `schema.parse(true)` script with `rollup`:

| Package   | Bundle (gzip) |
|-----------|--------------|
| Zod 3     |  `12.47kb`      |
| Zod 4 (regular)     | `5.36kb`       |
| Zod 4 (mini) | `1.88kb`       |

The core bundle is ~57% smaller in Zod 4 (2.3x). With Zod Mini the gzipped bundle is `1.88kb`, an 85% (6.6x) reduction in core bundle size compared to `zod@3`.

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

## Metadata

Zod 4 introduces a new system for adding strongly-typed metadata to your schemas. Metadata isn't stored inside the schema itself; instead it's stored in a "schema registry" that associates a schema with some typed metadata. To create a registry with `z.registry()`:

```ts
import * as z from "zod";

const myRegistry = z.registry<{ title: string; description: string }>();
```

To add schemas to your registry:

```ts
const emailSchema = z.string().email();

myRegistry.add(emailSchema, { title: "Email address", description: "..." });
myRegistry.get(emailSchema);
// => { title: "Email address", ... }
```

Alternatively, you can use the `.register()` method on a schema for convenience:

```ts
emailSchema.register(myRegistry, { title: "Email address", description: "..." })
// => returns emailSchema
```

### The global registry

Zod also exports a global registry `z.globalRegistry` that accepts some common JSON Schema-compatible metadata:

```ts
z.globalRegistry.add(z.string(), {
  id: "email_address",
  title: "Email address",
  description: "Provide your email",
  examples: ["naomie@example.com"],
  extraKey: "Additional properties are also allowed"
});
```

### `.meta()`

To conveniently add a schema to `z.globalRegistry`, use the `.meta()` method.

```ts
z.string().meta({
  id: "email_address",
  title: "Email address",
  description: "Provide your email",
  examples: ["naomie@example.com"],
  // ...
});
```

For compatibility with Zod 3, `.describe()` is still available, but `.meta()` is preferred.

```ts
z.string().describe("An email address");

// equivalent to
z.string().meta({ description: "An email address" });
```

## JSON Schema Conversion

Zod 4 introduces first-party JSON Schema conversion via `z.toJSONSchema()`.

```ts
import * as z from "zod";

const mySchema = z.object({name: z.string(), points: z.number()});

z.toJSONSchema(mySchema);
// => {
//   type: "object",
//   properties: {
//     name: {type: "string"},
//     points: {type: "number"},
//   },
//   required: ["name", "points"],
// }
```

Any metadata in `z.globalRegistry` is automatically included in the JSON Schema output.

```ts
const mySchema = z.object({
  firstName: z.string().describe("Your first name"),
  lastName: z.string().meta({ title: "last_name" }),
  age: z.number().meta({ examples: [12, 99] }),
});

z.toJSONSchema(mySchema);
// => {
//   type: 'object',
//   properties: {
//     firstName: { type: 'string', description: 'Your first name' },
//     lastName: { type: 'string', title: 'last_name' },
//     age: { type: 'number', examples: [ 12, 99 ] }
//   },
//   required: [ 'firstName', 'lastName', 'age' ]
// }
```

Configure the output with options:

```typescript
z.toJSONSchema(mySchema, {
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

```ts
const myError = new z.ZodError([
  {
    code: 'unrecognized_keys',
    keys: [ 'extraField' ],
    path: [],
    message: 'Unrecognized key: "extraField"'
  },
  {
    expected: 'string',
    code: 'invalid_type',
    path: [ 'username' ],
    message: 'Invalid input: expected string, received number'
  },
  {
    origin: 'number',
    code: 'too_small',
    minimum: 0,
    inclusive: true,
    path: [ 'favoriteNumbers', 1 ],
    message: 'Too small: expected number to be >=0'
  }
]);

z.prettifyError(myError);
```

This returns the following pretty-printable multi-line string:

```text
✖ Unrecognized key: "extraField"
✖ Invalid input: expected string, received number
  → at username
✖ Too small: expected number to be >=0
  → at favoriteNumbers[1]
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
z.json();           // validates any JSON-encodable value (string/number/boolean/null/array/record); does not parse strings

// ISO format functions under z.iso namespace
z.iso.date();       // validates ISO date strings (YYYY-MM-DD)
z.iso.time();       // validates ISO time strings
z.iso.datetime();   // validates ISO datetime strings
z.iso.duration();   // validates ISO duration strings
```

The method equivalents (`z.string().email()`, etc.) are still available but deprecated, and will be removed in the next major version. Top-level forms are more concise and more tree-shakable.

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

While this will not be relevant to the majority of Zod users, it's worth highlighting. The addition of Zod Mini necessitated the creation of a shared sub-package `zod/v4/core` which contains the core functionality shared between Zod and Zod Mini.

I was resistant to this at first, but now I see it as one of Zod 4's most important features. It lets Zod level up from a simple library to a fast validation "substrate" that can be sprinkled into other libraries.

If you're building a schema library, refer to the implementations of Zod and Zod Mini to see how to build on top of the foundation `zod/v4/core` provides. Don't hesitate to get in touch in GitHub discussions or via [X](https://x.com/colinhacks)/[Bluesky](https://bsky.app/profile/colinhacks.com) for help or feedback.

## Notes

- In the official zod.dev/v4 example, the last line of the `z.prettifyError()` output is `Invalid input: expected number, received string`, which does not match the `too_small` issue. `z.prettifyError()` prints each issue's `message`, so the output here follows the issue as defined. The `ZodError` definition above is unchanged from the original.

## Related

- [Zod 4 Migration Guide](./v4-migration-guide.md)
- [Error Customization](../errors/error-customization.md)
- [Error Formatting](../errors/error-formatting.md)
- [Metadata and Registries](../advanced/metadata.md)
