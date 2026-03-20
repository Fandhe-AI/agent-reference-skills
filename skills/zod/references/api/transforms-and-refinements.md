# Transforms and Refinements

Refinements, superRefine, codecs, pipes, transforms, defaults, catch, brand, readonly, and apply in Zod.

## `.refine()`

Perform custom validation that Zod does not provide a native API for:

```typescript
import { z } from "zod";

const myString = z.string().refine((val) => val.length <= 255);
```

> Refinement functions should never throw. Return a falsy value to signal failure. Thrown errors are not caught by Zod.

### `error` Parameter

Customize the error message:

```typescript
import { z } from "zod";

const myString = z.string().refine((val) => val.length > 8, {
  error: "Too short!"
});
```

### `abort` Parameter

By default, validation issues from checks are continuable -- Zod executes all checks even if one fails. Use `abort` to stop on failure:

```typescript
import { z } from "zod";

const myString = z.string()
  .refine((val) => val.length > 8, { error: "Too short!", abort: true })
  .refine((val) => val === val.toLowerCase(), { error: "Must be lowercase", abort: true });

const result = myString.safeParse("OH NO");
result.error?.issues;
// => [{ "code": "custom", "message": "Too short!" }]
// Second refinement did NOT run because first was aborted
```

Without `abort`, both errors would be reported:

```typescript
const myString = z.string()
  .refine((val) => val.length > 8, { error: "Too short!" })
  .refine((val) => val === val.toLowerCase(), { error: "Must be lowercase" });

const result = myString.safeParse("OH NO");
result.error?.issues;
// => [
//   { "code": "custom", "message": "Too short!" },
//   { "code": "custom", "message": "Must be lowercase" }
// ]
```

### `path` Parameter

Customize the error path (useful with object schemas):

```typescript
import { z } from "zod";

const passwordForm = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const result = passwordForm.safeParse({ password: "asdf", confirm: "qwer" });
result.error.issues;
// [{ "code": "custom", "path": ["confirm"], "message": "Passwords don't match" }]
```

### Async Refinements

Pass an `async` function for asynchronous validation:

```typescript
import { z } from "zod";

const userId = z.string().refine(async (id) => {
  // verify that ID exists in database
  return true;
});

// Must use parseAsync for async refinements
const result = await userId.parseAsync("abc123");
```

### `when` Parameter

Control when a refinement runs. By default, refinements do not run if any non-continuable issues have been encountered:

```typescript
import { z } from "zod";

const schema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
    anotherField: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],

    // run if password & confirmPassword are valid
    when(payload) {
      return schema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  });
```

## `.superRefine()`

Generate multiple issues using any of Zod's internal issue types:

```typescript
import { z } from "zod";

const UniqueStringArray = z.array(z.string()).superRefine((val, ctx) => {
  if (val.length > 3) {
    ctx.addIssue({
      code: "too_big",
      maximum: 3,
      origin: "array",
      inclusive: true,
      message: "Too many items",
      input: val,
    });
  }

  if (val.length !== new Set(val).size) {
    ctx.addIssue({
      code: "custom",
      message: "No duplicates allowed.",
      input: val,
    });
  }
});
```

## `.check()`

A low-level API that provides full control over generated issue objects. More verbose but can be faster in performance-sensitive code:

```typescript
import { z } from "zod";

const UniqueStringArray = z.array(z.string()).check((ctx) => {
  if (ctx.value.length > 3) {
    ctx.issues.push({
      code: "too_big",
      maximum: 3,
      origin: "array",
      inclusive: true,
      message: "Too many items",
      input: ctx.value,
    });
  }

  if (ctx.value.length !== new Set(ctx.value).size) {
    ctx.issues.push({
      code: "custom",
      message: "No duplicates allowed.",
      input: ctx.value,
      continue: true, // make this issue continuable (default: false)
    });
  }
});
```

## `z.codec()`

Codecs implement bidirectional transformations between two schemas (introduced in Zod 4.1):

```typescript
import { z } from "zod";

const stringToDate = z.codec(
  z.iso.datetime(),  // input schema: ISO date string
  z.date(),          // output schema: Date object
  {
    decode: (isoString) => new Date(isoString), // ISO string -> Date
    encode: (date) => date.toISOString(),       // Date -> ISO string
  }
);
```

### `decode()` (Forward Transform)

A regular `.parse()` calls the codec's `decode` function:

```typescript
stringToDate.parse("2024-01-15T10:30:00.000Z"); // => Date
```

### `z.decode()`

Strongly-typed input alternative to `.parse()`:

```typescript
import { z } from "zod";

z.decode(stringToDate, "2024-01-15T10:30:00.000Z"); // => Date
```

### `z.encode()` (Reverse Transform)

Perform the reverse transformation:

```typescript
import { z } from "zod";

z.encode(stringToDate, new Date("2024-01-15")); // => "2024-01-15T00:00:00.000Z"
```

## `.pipe()`

Chain schemas together into pipes. Primarily useful with transforms:

```typescript
import { z } from "zod";

const stringToLength = z.string().pipe(z.transform(val => val.length));

stringToLength.parse("hello"); // => 5
```

## `z.transform()` / `.transform()`

Transforms perform unidirectional transformation on data. They accept anything and transform it:

```typescript
import { z } from "zod";

const castToString = z.transform((val) => String(val));

castToString.parse("asdf"); // => "asdf"
castToString.parse(123);    // => "123"
castToString.parse(true);   // => "true"
```

> Transform functions should never throw. Thrown errors are not caught by Zod.

### Validation Inside Transforms

Report validation issues by pushing onto `ctx.issues`:

```typescript
import { z } from "zod";

const coercedInt = z.transform((val, ctx) => {
  try {
    return Number.parseInt(String(val));
  } catch (e) {
    ctx.issues.push({
      code: "custom",
      message: "Not a number",
      input: val,
    });
    return z.NEVER; // exit without impacting inferred return type
  }
});
```

### `.transform()` Convenience Method

Piping a schema into a transform is common, so Zod provides a shortcut:

```typescript
import { z } from "zod";

const stringToLength = z.string().transform(val => val.length);
```

### Async Transforms

```typescript
import { z } from "zod";

const idToUser = z
  .string()
  .transform(async (id) => {
    return db.getUserById(id);
  });

const user = await idToUser.parseAsync("abc123");
```

> If you use async transforms, you must use `.parseAsync` or `.safeParseAsync` when parsing.

## `z.preprocess()`

Pipe a transform into another schema. Convenience for pre-processing input before validation:

```typescript
import { z } from "zod";

const coercedInt = z.preprocess((val) => {
  if (typeof val === "string") {
    return Number.parseInt(val);
  }
  return val;
}, z.int());
```

## `.default()`

Set a default value for `undefined` inputs. The default value is eagerly returned (short-circuits parsing):

```typescript
import { z } from "zod";

const defaultTuna = z.string().default("tuna");
defaultTuna.parse(undefined); // => "tuna"
```

Pass a function for dynamic defaults:

```typescript
import { z } from "zod";

const randomDefault = z.number().default(Math.random);
randomDefault.parse(undefined); // => 0.4413456736055323
randomDefault.parse(undefined); // => 0.1871840107401901
```

## `.prefault()`

Set a pre-parse default. Unlike `.default()`, the prefault value is parsed (not short-circuited). The prefault must be assignable to the **input type**:

```typescript
import { z } from "zod";

const schema = z.string().transform(val => val.length).prefault("tuna");
schema.parse(undefined); // => 4 (parses "tuna", then transforms to length)
```

Comparison with `.default()`:

```typescript
import { z } from "zod";

const a = z.string().trim().toUpperCase().prefault("  tuna  ");
a.parse(undefined); // => "TUNA" (prefault is parsed through the chain)

const b = z.string().trim().toUpperCase().default("  tuna  ");
b.parse(undefined); // => "  tuna  " (default short-circuits, no trim/uppercase)
```

## `.catch()`

Define a fallback value returned on validation error:

```typescript
import { z } from "zod";

const numberWithCatch = z.number().catch(42);

numberWithCatch.parse(5);      // => 5
numberWithCatch.parse("tuna"); // => 42
```

Pass a function for dynamic catch values:

```typescript
import { z } from "zod";

const numberWithRandomCatch = z.number().catch((ctx) => {
  ctx.error; // the caught ZodError
  return Math.random();
});

numberWithRandomCatch.parse("sup"); // => 0.4413456736055323
```

## `.brand<>()`

Simulate nominal typing with branded types:

```typescript
import { z } from "zod";

const Cat = z.object({ name: z.string() }).brand<"Cat">();
const Dog = z.object({ name: z.string() }).brand<"Dog">();

type Cat = z.infer<typeof Cat>; // { name: string } & z.$brand<"Cat">
type Dog = z.infer<typeof Dog>; // { name: string } & z.$brand<"Dog">

const pluto = Dog.parse({ name: "pluto" });
const simba: Cat = pluto; // type error -- not assignable
```

By default, only the output type is branded. Customize with a second generic (requires Zod 4.2+):

```typescript
import { z } from "zod";

z.string().brand<"Cat", "out">();   // output is branded (default)
z.string().brand<"Cat", "in">();    // input is branded
z.string().brand<"Cat", "inout">(); // both are branded
```

> Note: Branded types are a static-only construct. They do not affect the runtime result of `.parse()`.

## `.readonly()`

Mark a schema as readonly. The parsed result is frozen with `Object.freeze()`:

```typescript
import { z } from "zod";

const ReadonlyUser = z.object({ name: z.string() }).readonly();
type ReadonlyUser = z.infer<typeof ReadonlyUser>;
// Readonly<{ name: string }>

const result = ReadonlyUser.parse({ name: "fido" });
result.name = "simba"; // throws TypeError
```

Works with objects, arrays, tuples, `Set`, and `Map`:

```typescript
import { z } from "zod";

z.object({ name: z.string() }).readonly();              // { readonly name: string }
z.array(z.string()).readonly();                          // readonly string[]
z.tuple([z.string(), z.number()]).readonly();            // readonly [string, number]
z.map(z.string(), z.date()).readonly();                  // ReadonlyMap<string, Date>
z.set(z.string()).readonly();                            // ReadonlySet<string>
```

## `.apply()`

Incorporate external functions into Zod's method chain:

```typescript
import { z } from "zod";

function setCommonNumberChecks<T extends z.ZodNumber>(schema: T) {
  return schema
    .min(0)
    .max(100);
}

const schema = z.number()
  .apply(setCommonNumberChecks)
  .nullable();

schema.parse(0);    // => 0
schema.parse(-1);   // throws ZodError
schema.parse(101);  // throws ZodError
schema.parse(null); // => null
```

## Notes
- `.refine()` generates a single issue with a `"custom"` error code
- `.superRefine()` can generate multiple issues with any of Zod's issue types
- `.check()` is a lower-level, more verbose API than `.superRefine()` -- it can be faster but is less ergonomic
- Refinement functions must never throw -- return falsy to signal failure
- Async refinements and transforms require `.parseAsync()` / `.safeParseAsync()`
- `z.codec()` (Zod 4.1+) supports bidirectional transforms with `z.decode()` and `z.encode()`
- `.default()` short-circuits parsing; `.prefault()` does not
- `.catch()` returns the fallback value on any validation error
- `.brand<>()` is static-only -- it does not affect runtime behavior
- `.readonly()` calls `Object.freeze()` on the parsed result

## Related
- [Primitives](../api/primitives.md)
- [Special Types](../api/special-types.md)
- [Objects](../api/objects.md)
- [Collections](../api/collections.md)
