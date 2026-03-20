# Objects

Object schemas, property manipulation, and recursive types in Zod.

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

> Warning: Passing cyclical data into Zod will cause an infinite loop.

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

## Related
- [Collections](../api/collections.md)
- [Unions and Intersections](../api/unions-and-intersections.md)
- [Enums and Literals](../api/enums-and-literals.md)
