# Zod Mini

A tree-shakable variant of Zod that uses a functional API for significantly smaller bundle sizes.

## Overview

Zod Mini implements the exact same functionality as `zod`, but using a functional, tree-shakable API. Methods are replaced with top-level functions that bundlers can eliminate when unused.

## Installation

```sh
npm install zod@^4.0.0
```

```typescript
import * as z from "zod/mini";
```

## Functional vs Method API

In regular Zod, schemas expose chainable methods. In Zod Mini, you use functions and wrappers instead:

```typescript
// regular Zod
const mySchema = z.string().optional().nullable();

// Zod Mini
const mySchema = z.nullable(z.optional(z.string()));
```

```typescript
// regular Zod
z.string().min(5).max(10).trim();

// Zod Mini
z.string().check(z.minLength(5), z.maxLength(10), z.trim());
```

## Tree-shaking Benefits

Tree-shaking (dead-code elimination) works on unused top-level functions but not on unused class methods. Zod Mini leverages this for significantly smaller bundles.

### Bundle Size: Simple Schema

```typescript
z.boolean().parse(true);
```

| Package  | Bundle size (gzip) |
|----------|--------------------|
| Zod Mini | `2.12kb`           |
| Zod      | `5.91kb`           |

**64% reduction** with Zod Mini.

### Bundle Size: Object Schema

```typescript
const schema = z.object({ a: z.string(), b: z.number(), c: z.boolean() });
schema.parse({ a: "asdf", b: 123, c: true });
```

| Package  | Bundle size (gzip) |
|----------|--------------------|
| Zod Mini | `4.0kb`            |
| Zod      | `13.1kb`           |

## When (Not) to Use Zod Mini

Use regular Zod unless you have uncommonly strict bundle size constraints. Consider the following:

### DX

The Zod Mini API is more verbose and less discoverable. Regular Zod methods are easier to discover and autocomplete through IntelliSense. Chained APIs are not available in Zod Mini.

### Backend Development

Bundle size on the scale of Zod is not meaningful on the backend, even in resource-constrained environments like AWS Lambda:

| Bundle size                            | Lambda cold start time      |
|----------------------------------------|-----------------------------|
| `1kb`                                  | `171ms`                     |
| `17kb` (gzipped non-Mini Zod)         | `~171.6ms` (interpolated)  |
| `128kb`                                | `176ms`                     |

The entirety of regular Zod gzipped is roughly `17kb`, corresponding to a `~0.6ms` increase in startup time.

### Internet Speed

The round trip time to the server (`100-200ms`) dwarfs the time to download an additional `10kb`. Only on slow 3G connections (sub-`1Mbps`) does this become significant. Unless optimizing specifically for users in rural or developing areas, bundle size at this scale is not the bottleneck.

## ZodMiniType

All Zod Mini schemas extend `z.ZodMiniType`, which extends `z.core.$ZodType` from `zod/v4/core`. It implements fewer methods than `ZodType` in regular Zod.

## Parsing

All Zod Mini schemas implement the same parsing methods as regular Zod:

```typescript
import * as z from "zod/mini";

const mySchema = z.string();

mySchema.parse("asdf");
await mySchema.parseAsync("asdf");
mySchema.safeParse("asdf");
await mySchema.safeParseAsync("asdf");
```

## `.check()` Method

In Zod Mini, dedicated subclass methods (like `.min()`, `.max()`) are not available. Instead, pass checks into schemas using `.check()`:

```typescript
import * as z from "zod/mini";

z.string().check(
  z.minLength(5),
  z.maxLength(10),
  z.refine((val) => val.includes("@")),
  z.trim()
);
```

### Numeric Checks

```typescript
z.lt(value);          // less than
z.lte(value);         // less than or equal (alias: z.maximum())
z.gt(value);          // greater than
z.gte(value);         // greater than or equal (alias: z.minimum())
z.positive();         // > 0
z.negative();         // < 0
z.nonpositive();      // <= 0
z.nonnegative();      // >= 0
z.multipleOf(value);  // divisible by value
```

### Size Checks (Arrays, Sets, Maps)

```typescript
z.maxSize(value);
z.minSize(value);
z.size(value);        // exact size
```

### String Checks

```typescript
z.maxLength(value);
z.minLength(value);
z.length(value);      // exact length
z.regex(regex);
z.lowercase();
z.uppercase();
z.includes(value);
z.startsWith(value);
z.endsWith(value);
```

### Object Checks

```typescript
z.property(key, schema);
```

### Media Checks

```typescript
z.mime(value);
```

### Custom Checks

```typescript
z.refine((val) => val.length > 0);    // custom refinement
z.check((val, ctx) => {               // replaces .superRefine()
  if (!isValid(val)) {
    ctx.addIssue({ message: "Invalid" });
  }
});
```

## Mutations

Mutations change the value without affecting the inferred type:

```typescript
z.overwrite((value) => newValue);   // arbitrary overwrite
z.normalize();                       // Unicode NFC normalization
z.trim();                            // trim whitespace
z.toLowerCase();                     // convert to lowercase
z.toUpperCase();                     // convert to uppercase
```

Example combining checks and mutations:

```typescript
import * as z from "zod/mini";

const emailSchema = z.string().check(
  z.trim(),
  z.toLowerCase(),
  z.minLength(5),
  z.includes("@")
);
```

## Metadata

### `.register()`

Register a schema in a registry:

```typescript
const myReg = z.registry<{ title: string }>();

z.string().register(myReg, { title: "My cool string schema" });
```

### `.meta()` / `.describe()`

Attach metadata (registers in `z.globalRegistry`):

```typescript
z.meta({ title: "...", description: "..." });
z.describe("...");
```

### `.brand()`

Brand a schema for nominal typing:

```typescript
import * as z from "zod/mini";

const USD = z.string().brand("USD");
```

### `.clone()`

Returns an identical clone of the schema:

```typescript
const mySchema = z.string();
mySchema.clone(mySchema._zod.def);
```

## No Default Locale

Unlike regular Zod, Zod Mini does **not** automatically load the English (`en`) locale. This reduces bundle size when error messages are unnecessary, localized to a non-English language, or otherwise customized.

By default, the `message` property of all issues will read `"Invalid input"`. To load the English locale:

```typescript
import * as z from "zod/mini";

z.config(z.locales.en());
```

## Related

- [Zod](../packages/zod.md)
- [Zod Core](../packages/core.md)
