# Error Formatting

Utilities for converting `$ZodError` instances into more useful formats for display, logging, and form validation.

## Setup Example

All examples on this page use the following schema and invalid input:

```typescript
import * as z from "zod";

const schema = z.strictObject({
  username: z.string(),
  favoriteNumbers: z.array(z.number()),
});

const result = schema.safeParse({
  username: 1234,
  favoriteNumbers: [1234, "4567"],
  extraKey: 1234,
});

result.error!.issues;
// [
//   {
//     expected: 'string',
//     code: 'invalid_type',
//     path: [ 'username' ],
//     message: 'Invalid input: expected string, received number'
//   },
//   {
//     expected: 'number',
//     code: 'invalid_type',
//     path: [ 'favoriteNumbers', 1 ],
//     message: 'Invalid input: expected number, received string'
//   },
//   {
//     code: 'unrecognized_keys',
//     keys: [ 'extraKey' ],
//     path: [],
//     message: 'Unrecognized key: "extraKey"'
//   }
// ];
```

## `z.treeifyError()`

Converts a `$ZodError` into a nested object structure that mirrors the schema. Each node has an `errors` array, and special `properties` and `items` fields for traversing deeper into the tree.

```typescript
const tree = z.treeifyError(result.error);

// =>
// {
//   errors: [ 'Unrecognized key: "extraKey"' ],
//   properties: {
//     username: { errors: [ 'Invalid input: expected string, received number' ] },
//     favoriteNumbers: {
//       errors: [],
//       items: [
//         undefined,
//         {
//           errors: [ 'Invalid input: expected number, received string' ]
//         }
//       ]
//     }
//   }
// }
```

### Accessing Errors with Optional Chaining

Use optional chaining (`?.`) to safely access nested properties and avoid runtime errors when a path has no issues:

```typescript
tree.properties?.username?.errors;
// => ["Invalid input: expected string, received number"]

tree.properties?.favoriteNumbers?.items?.[1]?.errors;
// => ["Invalid input: expected number, received string"];
```

> Be sure to use optional chaining (`?.`) to avoid errors when accessing nested properties.

## `z.prettifyError()`

Returns a human-readable string representation of the error, suitable for logging or CLI output.

```typescript
const pretty = z.prettifyError(result.error);
```

Output:

```
✖ Unrecognized key: "extraKey"
✖ Invalid input: expected string, received number
  → at username
✖ Invalid input: expected number, received string
  → at favoriteNumbers[1]
```

## `z.formatError()`

> **Deprecated** -- Use `z.treeifyError()` instead.

Converts a `$ZodError` into a nested object where each node contains an `_errors` array of error message strings. The structure mirrors the parsed data shape.

```typescript
const formatted = z.formatError(result.error);

// =>
// {
//   _errors: [ 'Unrecognized key: "extraKey"' ],
//   username: {
//     _errors: [ 'Invalid input: expected string, received number' ]
//   },
//   favoriteNumbers: {
//     _errors: [],
//     1: {
//       _errors: [ 'Invalid input: expected number, received string' ]
//     }
//   }
// }
```

Access errors at a specific path:

```typescript
formatted.username?._errors;
// => ["Invalid input: expected string, received number"]

formatted.favoriteNumbers?.[1]?._errors;
// => ["Invalid input: expected number, received string"]
```

## `z.flattenError()`

Converts a `$ZodError` into a shallow object with `formErrors` (top-level errors where `path` is `[]`) and `fieldErrors` (per-field error arrays). Best suited for flat, one-level-deep schemas such as form validation.

```typescript
const flattened = z.flattenError(result.error);
// { formErrors: string[], fieldErrors: { [key: string]: string[] } }

// =>
// {
//   formErrors: [ 'Unrecognized key: "extraKey"' ],
//   fieldErrors: {
//     username: [ 'Invalid input: expected string, received number' ],
//     favoriteNumbers: [ 'Invalid input: expected number, received string' ]
//   }
// }
```

### Accessing Flattened Errors

```typescript
flattened.fieldErrors.username;
// => [ 'Invalid input: expected string, received number' ]

flattened.fieldErrors.favoriteNumbers;
// => [ 'Invalid input: expected number, received string' ]
```

## Choosing a Formatter

| Utility              | Best For                                | Structure               |
|----------------------|-----------------------------------------|-------------------------|
| `z.treeifyError()`   | Deeply nested schemas, programmatic use | Nested tree with `errors`, `properties`, `items` |
| `z.prettifyError()`  | Logging, CLI output, debugging          | Human-readable string   |
| `z.flattenError()`   | Flat form validation                    | `formErrors` + `fieldErrors` |
| `z.formatError()`    | Legacy code (deprecated)                | Nested `_errors` arrays |

## Related

- [Error Customization](./error-customization.md)
- [Defining Schemas](../api/README.md)
