# Primitives

Core primitive type schemas and coercion utilities in Zod.

## Primitive Types

```typescript
import { z } from "zod";

// primitive types
z.string();
z.number();
z.bigint();
z.boolean();
z.symbol();
z.undefined();
z.null();
```

Each of these returns a Zod schema that validates values of the corresponding JavaScript primitive type.

## Coercion

To coerce input data to the appropriate type, use `z.coerce` instead:

```typescript
import { z } from "zod";

z.coerce.string();    // String(input)
z.coerce.number();    // Number(input)
z.coerce.boolean();   // Boolean(input)
z.coerce.bigint();    // BigInt(input)
z.coerce.date();      // new Date(input)
```

The coerced variant attempts to convert the input value using the built-in JavaScript constructors:

```typescript
const schema = z.coerce.string();

schema.parse("tuna");    // => "tuna"
schema.parse(42);        // => "42"
schema.parse(true);      // => "true"
schema.parse(null);      // => "null"
```

### Coercion Table

| Zod API                  | Coercion                   |
|--------------------------|----------------------------|
| `z.coerce.string()`      | `String(value)`            |
| `z.coerce.number()`      | `Number(value)`            |
| `z.coerce.boolean()`     | `Boolean(value)`           |
| `z.coerce.bigint()`      | `BigInt(value)`            |
| `z.coerce.date()`        | `new Date(value)`          |

### Input Type Customization

The input type of coerced schemas is `unknown` by default. To specify a more specific input type, pass a generic parameter:

```typescript
import { z } from "zod";

const A = z.coerce.number();
type AInput = z.input<typeof A>; // => unknown

const B = z.coerce.number<number>();
type BInput = z.input<typeof B>; // => number
```

### Boolean Coercion Caveat

Boolean coercion with `z.coerce.boolean()` may not work as expected. Any truthy value is coerced to `true`, and any falsy value is coerced to `false`:

```typescript
import { z } from "zod";

const schema = z.coerce.boolean(); // Boolean(input)

schema.parse("tuna");     // => true
schema.parse("true");     // => true
schema.parse("false");    // => true  (non-empty string is truthy!)
schema.parse(1);          // => true
schema.parse([]);         // => true

schema.parse(0);          // => false
schema.parse("");         // => false
schema.parse(undefined);  // => false
schema.parse(null);       // => false
```

For total control over coercion logic, consider using `z.transform()` or `z.pipe()`.

## Literals

Literal schemas represent a literal type, like `"hello world"` or `5`:

```typescript
import { z } from "zod";

const tuna = z.literal("tuna");
const twelve = z.literal(12);
const twobig = z.literal(2n);
const tru = z.literal(true);
```

To represent the JavaScript literals `null` and `undefined`:

```typescript
z.null();
z.undefined();
z.void(); // equivalent to z.undefined()
```

### Multiple Literal Values

To allow multiple literal values:

```typescript
import { z } from "zod";

const colors = z.literal(["red", "green", "blue"]);

colors.parse("green");  // => "green"
colors.parse("yellow"); // throws ZodError
```

### `.values` Property

To extract the set of allowed values from a literal schema:

```typescript
colors.values; // => Set<"red" | "green" | "blue">
```

> Note: The `.values` property is available in Zod but not in Zod Mini.

## Notes
- Coercion uses built-in JavaScript constructors (`String()`, `Number()`, etc.) -- not custom parsing logic
- `z.coerce.boolean()` uses JavaScript truthiness rules, which may be surprising (e.g. `"false"` coerces to `true`)
- For more nuanced string-to-boolean coercion, use `z.stringbool()` instead
- `z.void()` is functionally equivalent to `z.undefined()`
- Literal schemas with multiple values use an array syntax: `z.literal(["a", "b", "c"])`

## Related
- [Strings](../api/strings.md)
- [Numbers](../api/numbers.md)
- [Enums and Literals](../api/enums-and-literals.md)
- [Transforms and Refinements](../api/transforms-and-refinements.md)
