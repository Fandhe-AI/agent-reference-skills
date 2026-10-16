# Objects

Object schemas, property manipulation, and recursive types in Zod.

## Signature / Usage

```typescript
z.object({ key: schema, ... })
```

## `z.object()`

Define an object schema. All properties are required by default:

```typescript
import { z } from "zod";

const Person = z.object({
  name: z.string(),
  age: z.number(),
});

type Person = z.infer<typeof Person>;
// => { name: string; age: number }
```

To make properties optional:

```typescript
const Dog = z.object({
  name: z.string(),
  age: z.number().optional(),
});

Dog.parse({ name: "Yeller" }); // passes
```

By default, unrecognized keys are **stripped** from the parsed result:

```typescript
Dog.parse({ name: "Yeller", extraKey: true });
// => { name: "Yeller" }
```

## `z.strictObject()`

Throws an error when unknown keys are found:

```typescript
import { z } from "zod";

const StrictDog = z.strictObject({
  name: z.string(),
});

StrictDog.parse({ name: "Yeller", extraKey: true });
// throws ZodError
```

## `z.looseObject()`

Allows unknown keys to pass through unchanged:

```typescript
import { z } from "zod";

const LooseDog = z.looseObject({
  name: z.string(),
});

LooseDog.parse({ name: "Yeller", extraKey: true });
// => { name: "Yeller", extraKey: true }
```

## `.catchall()`

Define a catchall schema that validates any unrecognized keys:

```typescript
import { z } from "zod";

const DogWithStrings = z.object({
  name: z.string(),
  age: z.number().optional(),
}).catchall(z.string());

DogWithStrings.parse({ name: "Yeller", extraKey: "extraValue" }); // passes
DogWithStrings.parse({ name: "Yeller", extraKey: 42 });           // fails
```

## `.shape`

Access the internal schemas for each property:

```typescript
Dog.shape.name; // => string schema
Dog.shape.age;  // => number schema
```

## `.keyof()`

Create a `ZodEnum` schema from the keys of an object schema:

```typescript
const keySchema = Dog.keyof();
// => ZodEnum<["name", "age"]>
```

## `.extend()`

Add additional fields to an object schema:

```typescript
import { z } from "zod";

const DogWithBreed = Dog.extend({
  breed: z.string(),
});
```

This API can overwrite existing fields. Be careful with this.

### Alternative: Spread Syntax

You can use spread syntax to merge object shapes. This makes the strictness level visually obvious:

```typescript
import { z } from "zod";

const DogWithBreed = z.object({
  ...Dog.shape,
  breed: z.string(),
});

// merge multiple objects
const Combined = z.object({
  ...Animal.shape,
  ...Pet.shape,
  breed: z.string(),
});
```

Spread syntax advantages:
1. Uses language-level features instead of library-specific APIs
2. Same syntax works in Zod and Zod Mini
3. More `tsc`-efficient (`.extend()` can be expensive on large schemas and gets quadratically more expensive when chained)
4. You can change the strictness level by using `z.strictObject()` or `z.looseObject()`

## `.safeExtend()`

Works like `.extend()` but prevents overwriting a property with a non-assignable schema. The result's inferred type `extends` the original:

```typescript
import { z } from "zod";

z.object({ a: z.string() }).safeExtend({ a: z.string().min(5) }); // passes
z.object({ a: z.string() }).safeExtend({ a: z.any() });           // passes
z.object({ a: z.string() }).safeExtend({ a: z.number() });        // type error
```

Use `.safeExtend()` to extend schemas that contain refinements (regular `.extend()` will throw on schemas with refinements):

```typescript
import { z } from "zod";

const Base = z.object({
  a: z.string(),
  b: z.string()
}).refine(user => user.a === user.b);

// Extended inherits the refinements of Base
const Extended = Base.safeExtend({
  a: z.string().min(10)
});
```

## `.pick()`

Pick certain keys from an object schema (inspired by TypeScript's `Pick`):

```typescript
import { z } from "zod";

const Recipe = z.object({
  title: z.string(),
  description: z.string().optional(),
  ingredients: z.array(z.string()),
});

const JustTheTitle = Recipe.pick({ title: true });
```

## `.omit()`

Omit certain keys from an object schema (inspired by TypeScript's `Omit`):

```typescript
import { z } from "zod";

const RecipeNoDescription = Recipe.omit({ description: true });
```

## `.partial()`

Make some or all properties optional (inspired by TypeScript's `Partial`):

```typescript
import { z } from "zod";

// make all fields optional
const PartialRecipe = Recipe.partial();
// { title?: string; description?: string; ingredients?: string[] }

// make specific fields optional
const RecipeOptionalIngredients = Recipe.partial({
  ingredients: true,
});
// { title: string; description?: string; ingredients?: string[] }
```

## `.exactPartial()`

Identical to `.partial()`, but wraps each field in `exactOptional()` instead of `optional()` (keys may be omitted, an explicit `undefined` is rejected). In Zod Mini: `z.exactPartial(Recipe)`.

```typescript
const PartialRecipe = Recipe.exactPartial();
// { title?: string; description?: string | undefined; ingredients?: string[] }
```

## `z.deepPartial()`

Where `.partial()` only touches the top-level shape, `z.deepPartial()` recurses to every object in the tree: through arrays, tuples, unions, records, and wrappers.

```typescript
const Post = z.object({
  title: z.string(),
  author: z.object({ name: z.string(), email: z.string() }),
});

z.deepPartial(Post).parse({ author: {} }); // passes
```

The source schema is never modified, and the result is still a `ZodObject`, so `.shape` and `.extend()` keep working. A discriminated union degrades to a plain `z.union()`, since an optional discriminator defeats the discriminated lookup. Like `.partial()`, it throws on an object carrying its own refinement.

## `.required()`

Make some or all properties required (inspired by TypeScript's `Required`):

```typescript
import { z } from "zod";

// make all fields required
const RequiredRecipe = Recipe.required();
// { title: string; description: string; ingredients: string[] }

// make specific fields required
const RecipeRequiredDescription = Recipe.required({ description: true });
// { title: string; description: string; ingredients: string[] }
```

## Symbol keys

A shape can declare a symbol key. A `const` symbol infers as `unique symbol`, so the key is tracked in the inferred type and its value is validated like any other:

```typescript
const TAG = Symbol("tag");
const Post = z.object({ title: z.string(), [TAG]: z.number() });
// { title: string; [TAG]: number }

Post.parse({ title: "hello", [TAG]: 42 }); // passes
Post.parse({ title: "hello" });            // fails (the symbol key is required)
```

Declared symbol keys work with `.partial()`, `.pick()`, `.omit()`, `.extend()`, and the rest. Symbol keys the shape doesn't declare are ignored: `z.looseObject()` won't pass them through, and `z.strictObject()` won't flag them.

## Recursive Objects

Use a getter on the key to define self-referential types. JavaScript resolves the cyclical schema at runtime:

```typescript
import { z } from "zod";

const Category = z.object({
  name: z.string(),
  get subcategories() {
    return z.array(Category);
  }
});

type Category = z.infer<typeof Category>;
// { name: string; subcategories: Category[] }
```

Cyclical inputs work out of the box with Zod (since 4.5). For bundle size reasons, Zod Mini requires you to register a memoizer explicitly, before schemas are defined:

```typescript
// Zod
const input: any = { name: "root", subcategories: [] };
input.subcategories.push(input);

const result = Category.parse(input);
result.subcategories[0] === result; // true

// Zod Mini: register a memoizer before defining any schemas
z.config({ memoizer: z.memoizer() });
```

## Mutually Recursive Types

```typescript
import { z } from "zod";

const User = z.object({
  email: z.email(),
  get posts() {
    return z.array(Post);
  }
});

const Post = z.object({
  title: z.string(),
  get author() {
    return User;
  }
});
```

All object APIs (`.pick()`, `.omit()`, `.required()`, `.partial()`, etc.) work with recursive types.

### Resolving Circularity Errors

For complicated recursive types, TypeScript may produce circularity errors. Resolve them with a type annotation on the getter:

```typescript
import { z } from "zod";

const Activity = z.object({
  name: z.string(),
  get subactivities(): z.ZodNullable<z.ZodArray<typeof Activity>> {
    return z.nullable(z.array(Activity));
  },
});
```

## Notes
- `z.object()` strips unrecognized keys by default
- `z.strictObject()` throws on unrecognized keys
- `z.looseObject()` passes through unrecognized keys
- `.extend()` can overwrite existing fields -- use `.safeExtend()` if you want type safety
- `.safeExtend()` is required for extending schemas that have refinements
- Prefer spread syntax (`...Schema.shape`) over `.extend()` for better TypeScript performance
- Recursive schemas use JavaScript getters for self-reference at runtime
- Cyclical input data no longer loops forever since 4.5 (the previous "infinite loop" warning applies to 4.4 and earlier); Zod Mini needs `z.config({ memoizer: z.memoizer() })`
- `.deepPartial()` as a method was removed in v4.0; it returned in 4.5 as the functional `z.deepPartial()`
- Since 4.5, `__proto__` is always stripped by object and record parsers, and `.strict()` reports an own `__proto__` input key as `unrecognized_keys`. An `unrecognized_keys` issue no longer aborts its schema, so a strict object with an extra key and a bad value reports both issues
- Since 4.6, recursive schemas no longer retain the last parsed input (fixes a 4.5 out-of-memory regression)

## Related
- [Collections](../api/collections.md)
- [Unions and Intersections](../api/unions-and-intersections.md)
- [Enums and Literals](../api/enums-and-literals.md)
