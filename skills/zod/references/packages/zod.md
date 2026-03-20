# Zod (zod/v4)

The flagship Zod package, balancing developer experience and bundle size for the vast majority of applications.

## Overview

`zod/v4` provides a schema API that maps one-to-one to TypeScript's type system, using a concise, chainable, autocomplete-friendly method API.

```typescript
import * as z from "zod";

const schema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
  email: z.email(),
});
```

Methods can be chained for expressive schema definitions:

```typescript
z.string()
  .min(5)
  .max(10)
  .toLowerCase();
```

## ZodType Base Class

All schemas extend `z.ZodType`, which in turn extends `z.$ZodType` from `zod/v4/core`. Every instance of `ZodType` implements the methods listed below.

## Parsing

```typescript
import * as z from "zod";

const mySchema = z.string();

// synchronous parsing — throws on failure
const result = mySchema.parse(data);

// synchronous safe parsing — returns { success, data?, error? }
const safe = mySchema.safeParse(data);
if (safe.success) {
  console.log(safe.data);
} else {
  console.log(safe.error);
}

// async parsing — throws on failure
const asyncResult = await mySchema.parseAsync(data);

// async safe parsing — returns { success, data?, error? }
const asyncSafe = await mySchema.safeParseAsync(data);
```

## Refinement

### `.refine()`

Add a custom validation check that does not affect the inferred type:

```typescript
const nonEmpty = z.string().refine((val) => val.length > 0, {
  message: "String must not be empty",
});
```

### `.superRefine()` (deprecated)

Deprecated in favor of `.check()`. Provides full control over issue reporting:

```typescript
// deprecated — use .check() instead
const schema = z.string().superRefine((val, ctx) => {
  if (val.length < 5) {
    ctx.addIssue({
      code: "too_small",
      message: "Must be at least 5 characters",
    });
  }
});
```

### `.overwrite()`

Mutate the parsed value without affecting the inferred type:

```typescript
const trimmed = z.string().overwrite((val) => val.trim());
```

### `.check()`

The preferred way to add refinements and checks to any schema:

```typescript
const schema = z.string().check(
  z.minLength(5),
  z.maxLength(10),
  z.refine((val) => val.includes("@"))
);
```

## Wrappers

### `.optional()` / `.nonoptional()`

```typescript
const optionalString = z.string().optional();
// => z.ZodOptional<z.ZodString>
// inferred type: string | undefined

const requiredAgain = optionalString.nonoptional();
// inferred type: string
```

### `.nullable()` / `.nullish()`

```typescript
const nullableString = z.string().nullable();
// inferred type: string | null

const nullishString = z.string().nullish();
// inferred type: string | null | undefined
```

### `.default()`

Provide a default value when the input is `undefined`:

```typescript
const withDefault = z.string().default("hello");
// input type: string | undefined
// output type: string
```

### `.array()`

Wrap the schema in an array schema:

```typescript
const stringArray = z.string().array();
// equivalent to z.array(z.string())
// inferred type: string[]
```

### `.or()`

Create a union type:

```typescript
const stringOrNumber = z.string().or(z.number());
// inferred type: string | number
```

### `.transform()`

Transform the parsed value and change the output type:

```typescript
const toNumber = z.string().transform((val) => parseInt(val, 10));
// input type: string
// output type: number
```

### `.catch()`

Provide a fallback value when parsing fails:

```typescript
const withCatch = z.string().catch("fallback");
// never throws — returns "fallback" on failure
```

### `.pipe()`

Pipe the output of one schema into another:

```typescript
const coerced = z.string().pipe(z.coerce.number());
// input: string -> output: number
```

### `.readonly()`

Mark the output type as `readonly`:

```typescript
const readonlyArray = z.array(z.string()).readonly();
// inferred type: readonly string[]
```

## Metadata

### `.register()`

Register a schema in a registry with associated metadata:

```typescript
const myRegistry = z.registry<{ title: string }>();

z.string().register(myRegistry, { title: "User name" });
```

### `.describe()`

Add a description string (shorthand for setting `description` in metadata):

```typescript
const schema = z.string().describe("The user's email address");
```

### `.meta()`

Attach arbitrary metadata to a schema (registers in `z.globalRegistry`):

```typescript
const schema = z.string().meta({
  title: "Email",
  description: "A valid email address",
});
```

## Utility

### `.clone()`

Returns an identical clone of the schema using the provided `def`:

```typescript
const original = z.string();
const cloned = original.clone(original._zod.def);
```

### `.brand<T>()`

Brand a schema with a unique type tag for nominal typing:

```typescript
const USD = z.number().brand<"USD">();
type USD = z.infer<typeof USD>;
// number & { __brand: "USD" }

const amount: USD = USD.parse(100);
```

### `.isOptional()` / `.isNullable()`

Check whether a schema accepts `undefined` or `null`:

```typescript
z.string().isOptional();  // false
z.string().optional().isOptional();  // true

z.string().isNullable();  // false
z.string().nullable().isNullable();  // true
```

## Related

- [Zod Mini](../packages/mini.md)
- [Zod Core](../packages/core.md)
