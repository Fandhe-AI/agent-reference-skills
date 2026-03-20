# Zod 4 Migration Guide

Complete reference for all breaking changes, deprecated APIs, and migration steps when upgrading from Zod 3 to Zod 4.

## Error Customization

### `message` replaced by `error`

The `message`, `invalid_type_error`, `required_error`, and `errorMap` options are removed. Use the unified `error` parameter instead.

```typescript
// Zod 3
z.string({ invalid_type_error: "Not a string", required_error: "Required" });
z.string({ message: "Bad input" });
z.string({ errorMap: (issue) => ({ message: "Custom" }) });

// Zod 4
z.string("Not a string!");
z.string({ error: "Not a string!" });
z.string({ error: (issue) => "Not a string!" });
```

The `error` parameter accepts a string or a function that receives the issue and returns a string:

```typescript
// Zod 4 — dynamic error messages
z.number().min(5, (issue) => `Minimum is 5, got ${issue.input}`);
z.string().max(100, { error: "Too long!" });
```

## ZodError Changes

### Streamlined Issue Types

Zod 4 reduces the number of issue codes. Many previously distinct codes are consolidated:

```typescript
// Zod 3 — many specific codes
"invalid_string" | "too_small" | "too_big" | "invalid_enum_value" | ...

// Zod 4 — simplified set
"invalid_type" | "invalid_value" | "too_small" | "too_big" | "invalid_format" | "custom" | ...
```

### Precedence Rules

When multiple error customizations apply, Zod 4 follows a clear precedence:

1. Per-parse `error` option (highest)
2. Schema-level `error` parameter
3. Global locale / error map
4. Default error messages (lowest)

### Deprecated Methods

```typescript
// Zod 3
error.format();   // nested formatting
error.flatten();  // flat formatting
error.formErrors; // alias for flatten()

// Zod 4 — use z.prettifyError() or iterate .issues directly
z.prettifyError(error);

// .format() and .flatten() still exist on ZodError (not on core.$ZodError)
// but are deprecated. Prefer z.prettifyError() or manual iteration.
```

### Removed Methods

```typescript
// Zod 3
error.addIssue(issue);
error.addIssues(issues);

// Zod 4 — removed. Construct a new ZodError or push to .issues directly.
error.issues.push(newIssue);
```

The `.formErrors` getter is dropped. Use `.flatten()` (deprecated) or iterate `.issues`.

## `z.number()` Changes

### No Infinite Values

`z.number()` no longer accepts `Infinity` or `-Infinity` by default:

```typescript
// Zod 3
z.number().parse(Infinity); // OK

// Zod 4
z.number().parse(Infinity); // Error: invalid_type
z.number().parse(-Infinity); // Error: invalid_type
```

To allow infinite values, use `.min()` / `.max()` with `Infinity`:

```typescript
// Zod 4 — allow infinite
z.number().min(-Infinity).max(Infinity);
```

### `.safe()` Rejects Floats

In Zod 4, `.safe()` validates safe integers (not just numbers within safe integer range):

```typescript
// Zod 3 — .safe() allowed floats if within safe integer range
z.number().safe().parse(3.14); // OK

// Zod 4 — .safe() rejects floats
z.number().safe().parse(3.14); // Error
z.number().safe().parse(42);   // OK
```

### `.int()` Validates Safe Integers Only

```typescript
// Zod 4
z.number().int().parse(9007199254740992); // Error — exceeds Number.MAX_SAFE_INTEGER
z.number().int().parse(42);               // OK
```

## `z.string()` Changes

### Deprecated Format Methods

String format methods are deprecated in favor of top-level functions:

```typescript
// Zod 3
z.string().email();
z.string().uuid();
z.string().url();
z.string().datetime();

// Zod 4 — prefer top-level functions
z.email();
z.uuid();
z.url();
z.iso.datetime();

// The method-chaining versions still work but are deprecated
```

### Stricter `.uuid()` Validation

Zod 4 validates UUIDs more strictly (RFC 4122 compliant):

```typescript
// Zod 3 — accepted uppercase and non-standard variants
z.string().uuid().parse("550E8400-E29B-41D4-A716-446655440000"); // OK

// Zod 4 — lowercase only by default
z.uuid().parse("550e8400-e29b-41d4-a716-446655440000"); // OK
z.uuid().parse("550E8400-E29B-41D4-A716-446655440000"); // Error
```

### `.base64url()` No Padding

```typescript
// Zod 3 — .base64url() accepted padding (=)
z.string().base64url().parse("SGVsbG8="); // OK

// Zod 4 — .base64url() rejects padding by default
z.base64url().parse("SGVsbG8");  // OK (no padding)
z.base64url().parse("SGVsbG8="); // Error
```

### `.ip()` Split into `.ipv4()` / `.ipv6()`

```typescript
// Zod 3
z.string().ip();                       // accepts both IPv4 and IPv6
z.string().ip({ version: "v4" });      // IPv4 only
z.string().ip({ version: "v6" });      // IPv6 only

// Zod 4
z.ipv4();    // IPv4 only
z.ipv6();    // IPv6 only
// No combined .ip() — use z.union([z.ipv4(), z.ipv6()]) if needed
```

### `.cidr()` Split into `.cidrv4()` / `.cidrv6()`

```typescript
// Zod 3
z.string().cidr();
z.string().cidr({ version: "v4" });

// Zod 4
z.cidrv4();
z.cidrv6();
```

## `z.coerce` Changes

### Input Type is `unknown`

All coerced schemas now have an input type of `unknown` by default:

```typescript
// Zod 3
const schema = z.coerce.number();
type Input = z.input<typeof schema>; // number

// Zod 4
const schema = z.coerce.number();
type Input = z.input<typeof schema>; // unknown
```

## `.default()` Changes

### Short-Circuits on `undefined`

In Zod 4, `.default()` injects the default value and skips further validation when the input is `undefined`:

```typescript
// Zod 3 — default was injected then validated
z.string().min(5).default("hi").parse(undefined);
// Error: string must be at least 5 characters

// Zod 4 — default short-circuits, skips validation
z.string().min(5).default("hi").parse(undefined);
// => "hi" (no validation error)
```

### Default Must Match Output Type

The default value must match the schema's output type:

```typescript
// Zod 4 — type error if default doesn't match output
z.string().default(42);  // TypeScript error: number is not assignable to string
```

### `.prefault()`

Use `.prefault()` for Zod 3 behavior where the default value is injected before validation:

```typescript
// Zod 4
z.string().min(5).prefault("hi").parse(undefined);
// Error: string must be at least 5 characters

// .prefault() injects the value, then runs full validation
```

## `z.object()` Changes

### Defaults in Optional Fields

Optional fields with `.default()` are now reflected in the output type:

```typescript
// Zod 4
const User = z.object({
  name: z.string(),
  role: z.string().default("user"),
});

type User = z.infer<typeof User>;
// { name: string; role: string }
// Note: role is NOT optional in the output because it has a default
```

### Deprecated Methods

```typescript
// Zod 3
z.object({ ... }).strict();       // reject unknown keys
z.object({ ... }).passthrough();  // keep unknown keys
z.object({ ... }).strip();        // remove unknown keys (default)
z.object({ ... }).nonstrict();    // alias for passthrough

// Zod 4 — use z.strictObject(), z.looseObject(), or the `error` option
z.strictObject({ name: z.string() });  // rejects unknown keys
z.looseObject({ name: z.string() });   // passes through unknown keys
z.object({ name: z.string() });        // strips unknown keys (default)

// .strict(), .passthrough(), .strip() still work but are deprecated
// .nonstrict() is removed
```

### `.deepPartial()` Removed

```typescript
// Zod 3
z.object({ a: z.object({ b: z.string() }) }).deepPartial();

// Zod 4 — removed. Use a recursive utility or define partial schemas manually.
```

### `.merge()` Deprecated

```typescript
// Zod 3
schema1.merge(schema2);

// Zod 4 — use the spread syntax with z.object()
const merged = z.object({
  ...schema1.shape,
  ...schema2.shape,
});

// Or use z.extend()
const merged = schema1.extend(schema2.shape);
```

## `z.nativeEnum()` Deprecated

```typescript
// Zod 3
enum Color { Red, Green, Blue }
z.nativeEnum(Color);

// Zod 4 — use z.enum() with the values
enum Color { Red = "red", Green = "green", Blue = "blue" }
z.enum(Color);

// z.enum() now accepts TypeScript enums directly
// z.nativeEnum() still works but is deprecated
```

## `z.array()` Changes

### `.nonempty()` Equals `.min(1)`

```typescript
// Zod 3 — .nonempty() had a special branded type [T, ...T[]]
z.array(z.string()).nonempty();
// type: [string, ...string[]]

// Zod 4 — .nonempty() is equivalent to .min(1)
z.array(z.string()).nonempty();
// type: string[]  (with min length 1 validation)
// Use z.tuple() if you need the [T, ...T[]] type
```

## `z.promise()` Deprecated

```typescript
// Zod 3
z.promise(z.string());

// Zod 4 — deprecated
// If you need to validate the resolved value of a promise,
// await the promise first and then parse the result.
const result = await myPromise;
z.string().parse(result);
```

## `z.function()` Restructured

The function schema API is completely restructured:

```typescript
// Zod 3
const fn = z.function()
  .args(z.string(), z.number())
  .returns(z.boolean())
  .implement((a, b) => a.length > b);

// Zod 4
const fn = z
  .function({
    input: z.tuple([z.string(), z.number()]),
    output: z.boolean(),
  })
  .implement((a, b) => a.length > b);

// Async implementation
const asyncFn = z
  .function({
    input: z.tuple([z.string()]),
    output: z.number(),
  })
  .implementAsync(async (url) => {
    const res = await fetch(url);
    return res.status;
  });
```

## `.refine()` Changes

### Ignores Type Predicates

```typescript
// Zod 3 — type predicates narrowed the output type
z.string().refine((val): val is "hello" => val === "hello");
// output type: "hello"

// Zod 4 — type predicates are ignored by .refine()
z.string().refine((val): val is "hello" => val === "hello");
// output type: string

// Use .check() in Zod Mini or z.pipe() with z.literal() instead
```

### `ctx.path` Removed

```typescript
// Zod 3
z.string().superRefine((val, ctx) => {
  console.log(ctx.path); // available
});

// Zod 4
z.string().superRefine((val, ctx) => {
  // ctx.path is not available
  // Use ctx.issue() to add issues with a path
  ctx.issue({ code: "custom", message: "bad", path: ["field"] });
});
```

### Function as Second Argument Removed

```typescript
// Zod 3
z.string().refine(
  (val) => val.length > 5,
  (val) => ({ message: `${val} is too short` }) // function as 2nd arg
);

// Zod 4 — use the error parameter directly
z.string().refine(
  (val) => val.length > 5,
  { error: "Too short" }
);

// Or use a dynamic message with the error function form
z.string().min(5, (issue) => `${issue.input} is too short`);
```

## Removed Utility Schemas

```typescript
// Zod 3
z.ostring(); // z.string().optional()
z.onumber(); // z.number().optional()
z.oboolean(); // z.boolean().optional()

// Zod 4 — removed. Use .optional() explicitly.
z.string().optional();
z.number().optional();
z.boolean().optional();
```

## `.literal()` Drops Symbol Support

```typescript
// Zod 3
const sym = Symbol("foo");
z.literal(sym); // OK

// Zod 4 — symbols are not supported as literal values
z.literal(sym); // Error
// Use z.custom() to validate symbols
```

## `.create()` Removed

```typescript
// Zod 3
z.ZodString.create();
z.ZodNumber.create();

// Zod 4 — removed. Use the z.* factory functions.
z.string();
z.number();
```

## `z.record()` Changes

### Single-Arg Form Dropped

```typescript
// Zod 3 — single arg meant record<string, T>
z.record(z.number());

// Zod 4 — must provide both key and value schemas
z.record(z.string(), z.number());
```

### Enum Key Support

```typescript
// Zod 4 — record keys can be enums
const Status = z.enum(["active", "inactive"]);
z.record(Status, z.number());
// => Record<"active" | "inactive", number>
```

### `z.partialRecord()`

```typescript
// Zod 4 — new API for partial records
const schema = z.partialRecord(z.string(), z.number());
// => Partial<Record<string, number>>

// Equivalent to making all record values optional
```

## `z.intersection()` Changes

```typescript
// Zod 3 — intersection failures threw ZodError
try {
  z.intersection(schemaA, schemaB).parse(data);
} catch (e) {
  e instanceof z.ZodError; // true
}

// Zod 4 — throws a regular Error (not ZodError)
try {
  z.intersection(schemaA, schemaB).parse(data);
} catch (e) {
  e instanceof Error;      // true
  e instanceof z.ZodError; // false (for merge conflicts)
}
```

## Internal / Structural Changes

### `_def` Replaced by `_zod`

```typescript
// Zod 3
schema._def;          // internal definition
schema._def.typeName; // e.g., "ZodString"

// Zod 4
schema._zod.def;      // internal definition
schema._zod.def.type; // e.g., "string"

// _def is removed. All internals are under _zod.
```

### Removed Internal Classes

```typescript
// Zod 3 — special wrapper classes
z.ZodEffects;    // wrapped .refine()/.transform()/.preprocess()
z.ZodPreprocess; // .preprocess()
z.ZodBranded;    // .brand()

// Zod 4
// ZodEffects is removed — refine/transform are part of the pipe system
// ZodPreprocess is removed — use z.pipe(z.transform(...), schema) instead
// ZodBranded is removed — use z.brand() which returns the original schema type
```

### New `ZodTransform` Class

```typescript
// Zod 4 — transforms are represented as ZodTransform in the pipe
import * as core from "zod/v4/core";

const schema = z.pipe(z.string(), z.transform((val) => val.length));
// Internal: ZodPipe(ZodString, ZodTransform)
```

### `.preprocess()` Migration

```typescript
// Zod 3
z.preprocess((val) => String(val), z.string());

// Zod 4 — use z.pipe() with z.transform()
z.pipe(z.unknown(), z.transform((val) => String(val)), z.string());
```

### `.brand()` Changes

```typescript
// Zod 3
const Branded = z.string().brand<"UserId">();
type Branded = z.infer<typeof Branded>; // string & { __brand: "UserId" }

// Zod 4
const Branded = z.string().brand<"UserId">();
type Branded = z.infer<typeof Branded>; // string & { __brand: "UserId" }
// Works similarly but no longer wraps in ZodBranded class internally
```

## Quick Migration Checklist

| Zod 3 API | Zod 4 Replacement |
|---|---|
| `{ message: "..." }` | `"..."` or `{ error: "..." }` |
| `{ invalid_type_error, required_error }` | `{ error: fn }` |
| `{ errorMap: fn }` | `{ error: fn }` |
| `error.format()` | `z.prettifyError(error)` |
| `error.flatten()` | iterate `error.issues` |
| `error.addIssue()` | `error.issues.push()` |
| `z.string().email()` | `z.email()` |
| `z.string().uuid()` | `z.uuid()` |
| `z.string().ip()` | `z.ipv4()` / `z.ipv6()` |
| `z.string().cidr()` | `z.cidrv4()` / `z.cidrv6()` |
| `z.string().datetime()` | `z.iso.datetime()` |
| `z.object({}).strict()` | `z.strictObject({})` |
| `z.object({}).passthrough()` | `z.looseObject({})` |
| `z.object({}).nonstrict()` | removed |
| `z.object({}).deepPartial()` | removed |
| `schema1.merge(schema2)` | `schema1.extend(schema2.shape)` |
| `z.nativeEnum(E)` | `z.enum(E)` |
| `z.promise(schema)` | await then parse |
| `z.function().args().returns()` | `z.function({ input, output })` |
| `z.ostring()` / `z.onumber()` | `z.string().optional()` |
| `z.record(valueSchema)` | `z.record(z.string(), valueSchema)` |
| `z.preprocess(fn, schema)` | `z.pipe(z.unknown(), z.transform(fn), schema)` |
| `schema._def` | `schema._zod.def` |
| `ZodEffects` | `ZodPipe` / `ZodTransform` |

## Related

- [Zod 4 Release Notes](./v4-release-notes.md)
- [Error Customization](../errors/error-customization.md)
- [Error Formatting](../errors/error-formatting.md)
- [Strings](../api/strings.md)
- [Numbers](../api/numbers.md)
