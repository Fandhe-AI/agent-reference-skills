# Basic Usage

Core concepts for defining schemas, parsing data, handling errors, and inferring types.

## Defining a Schema

Before you can do anything else, you need to define a schema. Schemas describe the shape and constraints of your data.

```ts
import { z } from "zod";

const PlayerSchema = z.object({
  username: z.string(),
  xp: z.number(),
});
```

## Parsing Data

Given any Zod schema, use `.parse` to validate an input. If it is valid, Zod returns a strongly-typed _deep clone_ of the input.

```ts
const data = PlayerSchema.parse({ username: "billie", xp: 100 });
// => returns { username: "billie", xp: 100 }
```

### `.parse(data)`

Validates `data` against the schema. Returns the parsed (and possibly transformed) data on success. Throws a `ZodError` on failure.

```ts
PlayerSchema.parse({ username: "billie", xp: 100 });
// => { username: "billie", xp: 100 }

PlayerSchema.parse({ username: 42, xp: 100 });
// => throws ZodError
```

### `.parseAsync(data)`

Asynchronous version of `.parse()`. Returns a `Promise` that resolves with the parsed data or rejects with a `ZodError`. Required when using asynchronous refinements or transforms.

```ts
const result = await schema.parseAsync(data);
```

## Handling Errors

When validation fails, the `.parse()` method throws a `ZodError` instance with granular information about the validation issues.

```ts
try {
  PlayerSchema.parse({ username: 42, xp: 100 });
} catch (error) {
  if (error instanceof z.ZodError) {
    error.issues;
    /* [
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'number',
        path: [ 'username' ],
        message: 'Expected string, received number',
      }
    ] */
  }
}
```

### `.safeParse(data)`

To avoid a `try/catch` block, use `.safeParse()` to get back a plain result object containing either the successfully parsed data or a `ZodError`. The result type is a [discriminated union](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions), so you can handle both cases conveniently.

```ts
const result = PlayerSchema.safeParse({ username: "billie", xp: 100 });

if (!result.success) {
  result.error;   // ZodError instance
} else {
  result.data;    // { username: string; xp: number }
}
```

On success, `result` has the shape:

```ts
{ success: true; data: T }
```

On failure:

```ts
{ success: false; error: ZodError }
```

### `.safeParseAsync(data)`

Asynchronous version of `.safeParse()`. Returns a `Promise` that resolves with the discriminated union result object. Required when using asynchronous refinements or transforms.

```ts
const result = await schema.safeParseAsync(data);

if (!result.success) {
  result.error; // ZodError
} else {
  result.data;  // parsed value
}
```

### `.validate(data)`

When you only need to know whether an input is acceptable, use `.validate()`, or the top-level `z.validate(schema, data)`, which is the form `zod/mini` uses. It returns a boolean, never builds an error, and acts as a type guard on the schema's input type. On invalid input it is up to 16x faster than `.safeParse().success`.

```ts
PlayerSchema.validate({ username: "billie", xp: 100 }); // true
PlayerSchema.validate({ username: 42, xp: "100" });     // false

z.validate(z.string(), "hi"); // true
```

Use `.validateAsync()` for schemas with async refinements or transforms. On a compiled schema (`z.compile()`), `.validate()` answers directly from the compiled fast path.

## Inferring Types

Zod infers a static type from your schema definitions. You can extract this type with the `z.infer<>` utility and use it however you like.

### `z.infer<typeof schema>`

Extracts the TypeScript output type from a schema.

```ts
import { z } from "zod";

const PlayerSchema = z.object({
  username: z.string(),
  xp: z.number(),
});

type Player = z.infer<typeof PlayerSchema>;
// => { username: string; xp: number }

// use it in your code
const player: Player = { username: "billie", xp: 100 };
```

### `z.input<typeof schema>` and `z.output<typeof schema>`

In some cases, the input and output types of a schema can diverge. For instance, the `.transform()` API can convert the input from one type to another. In these cases, you can extract the input and output types independently:

```ts
const schema = z.string().transform((val) => val.length);

type Input = z.input<typeof schema>;
// => string

type Output = z.output<typeof schema>;
// => number
```

> **Note:** `z.infer<>` is an alias for `z.output<>`. They return the same type.

### Matching an existing type

Sometimes the type comes first: a database model, a type from a generated client, an interface you don't own. Pass it to `z.toZod<T>()` and TypeScript checks that the schema's output type is exactly `T`.

```ts
type Player = {
  username: string;
  xp: number;
};

const Player = z.toZod<Player>()(
  z.object({
    username: z.string(),
    xp: z.number(),
  })
);

Player.shape.username; // ZodString — the schema is returned unchanged
```

The check is exact type equality, so any drift from the type is a compile error (for example an extra `admin: z.boolean()` key). The usual alternative, `satisfies z.ZodType<Player>`, only checks assignability: it catches a missing required key, but extra keys, omitted optional keys, and a bare `z.any()` all slip through.

An enum target matches `z.enum(...)`, and stays nominal; a plain literal union doesn't satisfy it:

```ts
enum Level {
  Noob = "noob",
  Pro = "pro",
}

z.toZod<{ level: Level }>()(z.object({ level: z.enum(Level) }));           // ok
z.toZod<{ level: Level }>()(z.object({ level: z.enum(["noob", "pro"]) })); // type error
```

## Notes

- Since 4.6, `.safeParse()` builds its error lazily: error maps (global, locale, and per-schema `error`) run on the first read of `result.error`, not at parse time, so a `z.config()` swap between the parse and the read takes effect. An error map with a side effect never runs if nothing reads the error. `.parse()` is unaffected: it builds and throws its error immediately
- Since 4.5, `.safeParse()` no longer captures a stack trace on failure (failure-path parses about 7.5x faster)
- `.validate()` / `.validateAsync()` arrived in 4.6; `z.toZod<T>()` in 4.5

## Related

- [Introduction](./introduction.md)
