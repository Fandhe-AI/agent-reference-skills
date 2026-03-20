# Unions and Intersections

Union, exclusive union (XOR), discriminated union, and intersection schemas in Zod.

## `z.union()`

Union types (`A | B`) represent a logical "OR". Zod checks the input against each option in order and returns the first value that validates:

```typescript
import { z } from "zod";

const stringOrNumber = z.union([z.string(), z.number()]);
// string | number

stringOrNumber.parse("foo"); // passes
stringOrNumber.parse(14);    // passes
```

### `.options`

Extract the internal option schemas:

```typescript
stringOrNumber.options; // [ZodString, ZodNumber]
```

## `z.xor()` (Exclusive Unions)

An exclusive union (XOR) is a union where **exactly one** option must match. Fails if zero options match OR if multiple options match:

```typescript
import { z } from "zod";

const schema = z.xor([z.string(), z.number()]);

schema.parse("hello"); // passes
schema.parse(42);       // passes
schema.parse(true);     // fails (zero matches)
```

Useful for ensuring mutual exclusivity between options:

```typescript
import { z } from "zod";

const payment = z.xor([
  z.object({ type: z.literal("card"), cardNumber: z.string() }),
  z.object({ type: z.literal("bank"), accountNumber: z.string() }),
]);

payment.parse({ type: "card", cardNumber: "1234" }); // passes
```

If the input could match multiple options, `z.xor()` will fail:

```typescript
const overlapping = z.xor([z.string(), z.any()]);
overlapping.parse("hello"); // fails (matches both string and any)
```

## `z.discriminatedUnion()`

A discriminated union uses a shared "discriminator" key to efficiently parse the correct option. More efficient than `z.union()` for large unions:

```typescript
import { z } from "zod";

const MyResult = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.object({ status: z.literal("failed"), error: z.string() }),
]);
```

Each option should be an object schema whose discriminator property corresponds to some literal value, typically `z.literal()`, `z.enum()`, `z.null()`, or `z.undefined()`.

### Type Narrowing

TypeScript can narrow the type based on the discriminator:

```typescript
type MyResult =
  | { status: "success"; data: string }
  | { status: "failed"; error: string };

function handleResult(result: MyResult) {
  if (result.status === "success") {
    result.data;  // string
  } else {
    result.error; // string
  }
}
```

### Nesting Discriminated Unions

Discriminated unions can be nested. Zod determines the optimal parsing strategy to leverage discriminators at each level:

```typescript
import { z } from "zod";

const BaseError = { status: z.literal("failed"), message: z.string() };
const MyErrors = z.discriminatedUnion("code", [
  z.object({ ...BaseError, code: z.literal(400) }),
  z.object({ ...BaseError, code: z.literal(401) }),
  z.object({ ...BaseError, code: z.literal(500) }),
]);

const MyResult = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  MyErrors
]);
```

## `z.intersection()`

Intersection types (`A & B`) represent a logical "AND":

```typescript
import { z } from "zod";

const a = z.union([z.number(), z.string()]);
const b = z.union([z.number(), z.boolean()]);
const c = z.intersection(a, b);

type c = z.infer<typeof c>; // => number
```

Useful for intersecting two object types:

```typescript
import { z } from "zod";

const Person = z.object({ name: z.string() });
const Employee = z.object({ role: z.string() });

const EmployedPerson = z.intersection(Person, Employee);
type EmployedPerson = z.infer<typeof EmployedPerson>;
// Person & Employee
```

> Warning: When merging object schemas, prefer `A.extend(B.shape)` over intersections. Using `.extend()` gives you a new object schema with methods like `.pick()` and `.omit()`, whereas `z.intersection()` returns a `ZodIntersection` instance which lacks those methods.

## Notes
- `z.union()` checks options in order and returns the first match -- order can matter for performance
- `z.xor()` fails when zero or multiple options match, making it stricter than `z.union()`
- `z.discriminatedUnion()` is more efficient than `z.union()` for large unions of objects that share a common discriminator key
- `z.intersection()` returns a `ZodIntersection` which lacks object methods like `.pick()`, `.omit()`, etc.
- Prefer `.extend()` or spread syntax for merging objects instead of `z.intersection()`
- Discriminated unions can be nested for advanced use cases

## Related
- [Objects](../api/objects.md)
- [Enums and Literals](../api/enums-and-literals.md)
- [Collections](../api/collections.md)
