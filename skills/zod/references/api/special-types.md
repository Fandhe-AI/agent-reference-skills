# Special Types

Optional, nullable, nullish, unknown, never, any, promise, instanceof, JSON, function, and custom schemas in Zod.

## `z.optional()` / `.optional()`

Make a schema optional (allows `undefined` inputs):

```typescript
import { z } from "zod";

z.optional(z.literal("yoda")); // or z.literal("yoda").optional()
```

Returns a `ZodOptional` instance. To extract the inner schema:

```typescript
const optionalYoda = z.optional(z.literal("yoda"));
optionalYoda.unwrap(); // ZodLiteral<"yoda">
```

## `z.nullable()` / `.nullable()`

Make a schema nullable (allows `null` inputs):

```typescript
import { z } from "zod";

z.nullable(z.literal("yoda")); // or z.literal("yoda").nullable()
```

Returns a `ZodNullable` instance. To extract the inner schema:

```typescript
const nullableYoda = z.nullable(z.literal("yoda"));
nullableYoda.unwrap(); // ZodLiteral<"yoda">
```

## `z.nullish()`

Make a schema both optional and nullable:

```typescript
import { z } from "zod";

const nullishYoda = z.nullish(z.literal("yoda"));
// accepts "yoda" | null | undefined
```

Refer to the TypeScript manual for more about the concept of [nullish](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing).

## `z.unknown()`

Allows any value with inferred type `unknown`:

```typescript
import { z } from "zod";

z.unknown(); // inferred type: unknown
```

## `z.any()`

Allows any value with inferred type `any`:

```typescript
import { z } from "zod";

z.any(); // inferred type: any
```

## `z.never()`

No value will pass validation:

```typescript
import { z } from "zod";

z.never(); // inferred type: never
```

## `z.promise()` (Deprecated)

> **Deprecated** in Zod 4. If you suspect a value might be a `Promise`, simply `await` it before parsing it with Zod.

```typescript
import { z } from "zod";

const numberPromise = z.promise(z.number());
```

Validation happens in two parts:
1. Zod synchronously checks that the input is a Promise (has `.then` and `.catch` methods)
2. Zod attaches an additional validation step onto the Promise via `.then`

```typescript
numberPromise.parse("tuna");
// ZodError: Non-Promise type: string

numberPromise.parse(Promise.resolve("tuna"));
// => Promise<number>

const test = async () => {
  await numberPromise.parse(Promise.resolve("tuna"));
  // ZodError: Non-number type: string

  await numberPromise.parse(Promise.resolve(3.14));
  // => 3.14
};
```

## `z.instanceof()`

Check that the input is an instance of a class. Useful for validating inputs against third-party library classes:

```typescript
import { z } from "zod";

class Test {
  name: string;
}

const TestSchema = z.instanceof(Test);

TestSchema.parse(new Test()); // passes
TestSchema.parse("whatever"); // fails
```

### `.check()` with `z.property()`

Validate a particular property of a class instance against a Zod schema:

```typescript
import { z } from "zod";

const urlSchema = z.instanceof(URL).check(
  z.property("protocol", z.literal("https:" as string, "Only HTTPS allowed"))
);

urlSchema.parse(new URL("https://example.com")); // passes
urlSchema.parse(new URL("http://example.com"));  // fails
```

`z.property()` works with any data type, but is most useful with `z.instanceof()`:

```typescript
import { z } from "zod";

const longString = z.string().check(
  z.property("length", z.number().min(10))
);

longString.parse("hello there!"); // passes
longString.parse("hello.");       // fails
```

## `z.json()`

Validate any JSON-encodable value:

```typescript
import { z } from "zod";

const jsonSchema = z.json();
```

This is a convenience API equivalent to:

```typescript
const jsonSchema = z.lazy(() => {
  return z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonSchema),
    z.record(z.string(), jsonSchema)
  ]);
});
```

## `z.function()`

Define Zod-validated functions to separate validation from business logic:

```typescript
import { z } from "zod";

const MyFunction = z.function({
  input: [z.string()],  // parameters (must be an array or a ZodTuple)
  output: z.number()    // return type
});

type MyFunction = z.infer<typeof MyFunction>;
// (input: string) => number
```

### `.implement()`

Accept a function and return a new function that automatically validates inputs and outputs:

```typescript
import { z } from "zod";

const MyFunction = z.function({
  input: [z.string()],
  output: z.number()
});

const computeTrimmedLength = MyFunction.implement((input) => {
  // TypeScript knows input is a string!
  return input.trim().length;
});

computeTrimmedLength("sandwich"); // => 8
computeTrimmedLength(" asdf ");   // => 4
computeTrimmedLength(42);         // throws ZodError
```

If you only care about validating inputs, omit the `output` field:

```typescript
const MyFunction = z.function({
  input: [z.string()],
});

const fn = MyFunction.implement((input) => input.trim().length);
```

### `.implementAsync()`

Create an async function:

```typescript
import { z } from "zod";

const MyFunction = z.function({
  input: [z.string()],
  output: z.number()
});

const computeTrimmedLengthAsync = MyFunction.implementAsync(
  async (input) => input.trim().length
);

computeTrimmedLengthAsync("sandwich"); // => Promise<8>
```

## `z.custom()`

Create a schema for any TypeScript type, including types not supported by Zod out of the box:

```typescript
import { z } from "zod";

const px = z.custom<`${number}px`>((val) => {
  return typeof val === "string" ? /^\d+px$/.test(val) : false;
});

type px = z.infer<typeof px>; // `${number}px`

px.parse("42px");  // "42px"
px.parse("42vw");  // throws ZodError
```

If you do not provide a validation function, Zod will allow any value (dangerous!):

```typescript
z.custom<{ arg: string }>(); // performs no validation
```

Custom error messages:

```typescript
z.custom<string>((val) => typeof val === "string", "custom error message");
```

## Notes
- `.optional()` wraps with `ZodOptional`, `.nullable()` wraps with `ZodNullable` -- both support `.unwrap()` to get the inner schema
- `z.promise()` is deprecated in Zod 4 -- `await` values before parsing instead
- `z.instanceof()` uses JavaScript's `instanceof` operator under the hood
- `z.property()` is primarily intended for use with `z.instanceof()` but works on any data type
- `z.json()` is a recursive union schema covering all JSON-encodable types
- `z.function()` validates both inputs and outputs; omit `output` to only validate inputs
- `z.custom()` without a validation function is dangerous -- it performs no runtime validation

## Related
- [Primitives](../api/primitives.md)
- [Transforms and Refinements](../api/transforms-and-refinements.md)
- [Unions and Intersections](../api/unions-and-intersections.md)
