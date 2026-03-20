# Enums and Literals

Enum schemas, boolean validation, and string-to-boolean coercion in Zod.

## `z.enum()`

Use `z.enum()` to validate inputs against a fixed set of allowable string values:

```typescript
import { z } from "zod";

const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);

FishEnum.parse("Salmon");    // => "Salmon"
FishEnum.parse("Swordfish"); // throws ZodError
```

### Using `as const`

If you declare the string array as a variable, you must use `as const` for Zod to properly infer the exact values:

```typescript
import { z } from "zod";

// Without `as const` -- inferred type is just `string`
const fish = ["Salmon", "Tuna", "Trout"];
const BadEnum = z.enum(fish);
type BadEnum = z.infer<typeof BadEnum>; // string

// With `as const` -- inferred type is the union
const fishConst = ["Salmon", "Tuna", "Trout"] as const;
const GoodEnum = z.enum(fishConst);
type GoodEnum = z.infer<typeof GoodEnum>; // "Salmon" | "Tuna" | "Trout"
```

### Enum-Like Object Literals

Enum-like object literals (`{ [key: string]: string | number }`) are supported:

```typescript
import { z } from "zod";

const Fish = {
  Salmon: 0,
  Tuna: 1
} as const;

const FishEnum = z.enum(Fish);
FishEnum.parse(Fish.Salmon); // passes
FishEnum.parse(0);           // passes
FishEnum.parse(2);           // fails
```

### TypeScript Enums

You can pass an externally-declared TypeScript enum:

```typescript
import { z } from "zod";

enum Fish {
  Salmon = 0,
  Tuna = 1
}

const FishEnum = z.enum(Fish);
FishEnum.parse(Fish.Salmon); // passes
FishEnum.parse(0);           // passes
FishEnum.parse(2);           // fails
```

> Note: In Zod 4, `z.enum()` replaces the old `z.nativeEnum()` API from Zod 3. Using TypeScript's `enum` keyword is generally not recommended.

String enums also work:

```typescript
enum Fish {
  Salmon = "Salmon",
  Tuna = "Tuna",
  Trout = "Trout",
}

const FishEnum = z.enum(Fish);
```

### `.enum` Accessor

To extract the schema's values as an enum-like object:

```typescript
import { z } from "zod";

const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);

FishEnum.enum;
// => { Salmon: "Salmon", Tuna: "Tuna", Trout: "Trout" }
```

### `.exclude()`

Create a new enum schema excluding certain values:

```typescript
import { z } from "zod";

const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
const TunaOnly = FishEnum.exclude(["Salmon", "Trout"]);
```

> Note: `.exclude()` is available in Zod but not in Zod Mini.

### `.extract()`

Create a new enum schema extracting only certain values:

```typescript
import { z } from "zod";

const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
const SalmonAndTroutOnly = FishEnum.extract(["Salmon", "Trout"]);
```

> Note: `.extract()` is available in Zod but not in Zod Mini.

## `z.stringbool()`

New in Zod 4. Parse string "boolish" values to a plain `boolean` value. Useful for parsing environment variables:

```typescript
import { z } from "zod";

const strbool = z.stringbool();

strbool.parse("true");      // => true
strbool.parse("1");         // => true
strbool.parse("yes");       // => true
strbool.parse("on");        // => true
strbool.parse("y");         // => true
strbool.parse("enabled");   // => true

strbool.parse("false");     // => false
strbool.parse("0");         // => false
strbool.parse("no");        // => false
strbool.parse("off");       // => false
strbool.parse("n");         // => false
strbool.parse("disabled");  // => false

strbool.parse("anything else"); // throws ZodError
```

### Custom Truthy/Falsy Values

```typescript
import { z } from "zod";

// these are the defaults
z.stringbool({
  truthy: ["true", "1", "yes", "on", "y", "enabled"],
  falsy: ["false", "0", "no", "off", "n", "disabled"],
});
```

### Case Sensitivity

By default, the schema is case-insensitive (all inputs are lowercased before comparison). To make it case-sensitive:

```typescript
import { z } from "zod";

z.stringbool({
  case: "sensitive"
});
```

## `z.boolean()`

To validate boolean values:

```typescript
import { z } from "zod";

z.boolean().parse(true);  // => true
z.boolean().parse(false); // => false
```

## Notes
- Always pass arrays directly to `z.enum()` or use `as const` to preserve literal types
- `z.enum()` in Zod 4 replaces both `z.enum()` and `z.nativeEnum()` from Zod 3
- `.exclude()` and `.extract()` are only available in Zod (not Zod Mini)
- `z.stringbool()` is case-insensitive by default
- `z.stringbool()` is new in Zod 4 and is a common solution for parsing environment variables
- For JavaScript truthy/falsy coercion, use `z.coerce.boolean()` instead

## Related
- [Primitives](../api/primitives.md)
- [Unions and Intersections](../api/unions-and-intersections.md)
- [Objects](../api/objects.md)
