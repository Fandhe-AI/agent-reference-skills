# Numbers

Number, integer, BigInt, and Date validations in Zod.

## Number Validations

Use `z.number()` to validate numbers. It allows any finite number (rejects `NaN` and `Infinity`):

```typescript
import { z } from "zod";

const schema = z.number();

schema.parse(3.14);      // passes
schema.parse(NaN);       // fails
schema.parse(Infinity);  // fails
```

### Validation Methods

```typescript
import { z } from "zod";

z.number().gt(5);            // greater than 5
z.number().gte(5);           // greater than or equal to 5 (alias: .min(5))
z.number().lt(5);            // less than 5
z.number().lte(5);           // less than or equal to 5 (alias: .max(5))
z.number().positive();       // greater than 0 (alias: .gt(0))
z.number().nonnegative();    // greater than or equal to 0
z.number().negative();       // less than 0
z.number().nonpositive();    // less than or equal to 0
z.number().multipleOf(5);   // divisible by 5 (alias: .step(5))
```

## NaN

To validate `NaN` specifically:

```typescript
import { z } from "zod";

z.nan().parse(NaN);              // passes
z.nan().parse("anything else");  // fails
```

## Integers

To validate integers:

```typescript
import { z } from "zod";

z.int();     // restricts to safe integer range (Number.MIN_SAFE_INTEGER to Number.MAX_SAFE_INTEGER)
z.int32();   // restricts to int32 range (-2147483648 to 2147483647)
```

## BigInts

To validate BigInt values:

```typescript
import { z } from "zod";

z.bigint();
```

### BigInt Validation Methods

BigInt schemas support the same validation methods as numbers, but with BigInt values:

```typescript
import { z } from "zod";

z.bigint().gt(5n);            // greater than 5n
z.bigint().gte(5n);           // greater than or equal to 5n (alias: .min(5n))
z.bigint().lt(5n);            // less than 5n
z.bigint().lte(5n);           // less than or equal to 5n (alias: .max(5n))
z.bigint().positive();        // greater than 0n (alias: .gt(0n))
z.bigint().nonnegative();     // greater than or equal to 0n
z.bigint().negative();        // less than 0n
z.bigint().nonpositive();     // less than or equal to 0n
z.bigint().multipleOf(5n);   // divisible by 5n (alias: .step(5n))
```

## Dates

Use `z.date()` to validate `Date` instances:

```typescript
import { z } from "zod";

z.date().safeParse(new Date());                        // success: true
z.date().safeParse("2022-01-12T06:15:00.000Z");       // success: false
```

### Custom Error Messages

```typescript
import { z } from "zod";

z.date({
  error: issue => issue.input === undefined ? "Required" : "Invalid date"
});
```

### Date Validations

```typescript
import { z } from "zod";

z.date().min(new Date("1900-01-01"), { error: "Too old!" });
z.date().max(new Date(), { error: "Too young!" });
```

## Notes
- `z.number()` rejects `NaN` and `Infinity` by default -- use `z.nan()` if you specifically need to validate `NaN`
- `z.int()` restricts to the safe integer range (`Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`)
- `z.int32()` restricts to the 32-bit signed integer range
- `z.date()` validates `Date` instances, not date strings -- use `z.iso.datetime()` or `z.iso.date()` for string validation
- `.gte()` is aliased as `.min()`, `.lte()` is aliased as `.max()`, `.multipleOf()` is aliased as `.step()`

## Related
- [Primitives](../api/primitives.md)
- [Strings](../api/strings.md)
- [Transforms and Refinements](../api/transforms-and-refinements.md)
