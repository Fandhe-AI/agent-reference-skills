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

## Related

- [Introduction](./introduction.md)
