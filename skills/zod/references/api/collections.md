# Collections

Array, tuple, record, map, set, and file schemas in Zod.

## `z.array()`

Define an array schema:

```typescript
import { z } from "zod";

const stringArray = z.array(z.string()); // or z.string().array()
```

### `.unwrap()`

Access the inner element schema:

```typescript
stringArray.unwrap(); // => string schema
```

### Array Validations

```typescript
import { z } from "zod";

z.array(z.string()).min(5);    // must contain 5 or more items
z.array(z.string()).max(5);    // must contain 5 or fewer items
z.array(z.string()).length(5); // must contain exactly 5 items
```

## `z.tuple()`

Tuples are fixed-length arrays with different schemas for each index:

```typescript
import { z } from "zod";

const MyTuple = z.tuple([
  z.string(),
  z.number(),
  z.boolean()
]);

type MyTuple = z.infer<typeof MyTuple>;
// [string, number, boolean]
```

### Variadic (Rest) Arguments

Add a variadic rest argument as the second parameter:

```typescript
import { z } from "zod";

const variadicTuple = z.tuple([z.string()], z.number());
// => [string, ...number[]]
```

## `z.record()`

Record schemas validate types such as `Record<string, string>`:

```typescript
import { z } from "zod";

const IdCache = z.record(z.string(), z.string());
type IdCache = z.infer<typeof IdCache>; // Record<string, string>

IdCache.parse({
  carlotta: "77d2586b-9e8e-4ecf-8b21-ea7e0530eadd",
  jimmie: "77d2586b-9e8e-4ecf-8b21-ea7e0530eadd",
});
```

The key schema can be any Zod schema assignable to `string | number | symbol`:

```typescript
import { z } from "zod";

const Keys = z.union([z.string(), z.number(), z.symbol()]);
const AnyObject = z.record(Keys, z.unknown());
// Record<string | number | symbol, unknown>
```

### Records with Enum Keys

Create objects with keys defined by an enum. Zod exhaustively checks that all enum values exist as keys:

```typescript
import { z } from "zod";

const Keys = z.enum(["id", "name", "email"]);
const Person = z.record(Keys, z.string());
// { id: string; name: string; email: string }
```

### Numeric Keys

As of v4.2, Zod properly supports numeric keys. A `number` schema as a record key validates that the key is a valid numeric string:

```typescript
import { z } from "zod";

const numberKeys = z.record(z.number(), z.string());
numberKeys.parse({
  1: "one",       // passes
  2: "two",       // passes
  "1.5": "one",   // passes
  "-3": "two",    // passes
  abc: "one"      // fails
});

// further validation is also supported
const intKeys = z.record(z.int().step(1).min(0).max(10), z.string());
intKeys.parse({
  0: "zero",      // passes
  12: "twelve",   // fails
});
```

## `z.partialRecord()`

Use for partial record types. Skips the exhaustiveness checks that `z.record()` runs with `z.enum()` and `z.literal()` key schemas:

```typescript
import { z } from "zod";

const Keys = z.enum(["id", "name", "email"]);
const Person = z.partialRecord(Keys, z.string());
// { id?: string; name?: string; email?: string }
```

> Note: In Zod 3, `z.record()` did not check exhaustiveness. `z.partialRecord()` replicates the old Zod 3 behavior.

## `z.looseRecord()`

By default, `z.record()` errors on keys that do not match the key schema. Use `z.looseRecord()` to pass through non-matching keys unchanged:

```typescript
import { z } from "zod";

const schema = z
  .object({ name: z.string() })
  .and(z.looseRecord(z.string().regex(/_phone$/), z.e164()));

type schema = z.infer<typeof schema>;
// => { name: string } & Record<string, string>

schema.parse({
  name: "John",
  home_phone: "+12345678900",   // validated as phone number
  work_phone: "+12345678900",   // validated as phone number
});
```

## `z.map()`

Validate `Map` instances:

```typescript
import { z } from "zod";

const StringNumberMap = z.map(z.string(), z.number());
type StringNumberMap = z.infer<typeof StringNumberMap>; // Map<string, number>

const myMap = new Map();
myMap.set("one", 1);
myMap.set("two", 2);

StringNumberMap.parse(myMap);
```

## `z.set()`

Validate `Set` instances:

```typescript
import { z } from "zod";

const NumberSet = z.set(z.number());
type NumberSet = z.infer<typeof NumberSet>; // Set<number>

const mySet = new Set();
mySet.add(1);
mySet.add(2);
NumberSet.parse(mySet);
```

### Set Validations

```typescript
import { z } from "zod";

z.set(z.string()).min(5);  // must contain 5 or more items
z.set(z.string()).max(5);  // must contain 5 or fewer items
z.set(z.string()).size(5); // must contain exactly 5 items
```

## `z.file()`

Validate `File` instances:

```typescript
import { z } from "zod";

const fileSchema = z.file();

fileSchema.min(10_000);                         // minimum .size (bytes)
fileSchema.max(1_000_000);                      // maximum .size (bytes)
fileSchema.mime("image/png");                    // single MIME type
fileSchema.mime(["image/png", "image/jpeg"]);    // multiple MIME types
```

## Notes
- `z.array()` supports both function and method syntax: `z.array(z.string())` or `z.string().array()`
- `z.record()` with enum keys is exhaustive in Zod 4 (all keys must be present) -- use `z.partialRecord()` for non-exhaustive behavior
- `z.looseRecord()` is useful for modeling multiple pattern properties when combined with intersections
- `z.set()` and `z.file()` validation methods use `.min()`, `.max()`, and `.size()` / `.mime()` respectively
- As of v4.2, `z.record()` properly handles numeric keys with additional validation support

## Related
- [Objects](../api/objects.md)
- [Unions and Intersections](../api/unions-and-intersections.md)
- [Transforms and Refinements](../api/transforms-and-refinements.md)
