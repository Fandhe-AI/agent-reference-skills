# Recursive Schema

Define self-referential and mutually recursive schemas using JavaScript getters.

```typescript
import { z } from "zod";

// Self-referential schema using a getter
const Category = z.object({
  name: z.string(),
  get subcategories() {
    return z.array(Category);
  },
});

type Category = z.infer<typeof Category>;
// { name: string; subcategories: Category[] }

Category.parse({
  name: "Electronics",
  subcategories: [
    { name: "Phones", subcategories: [] },
    { name: "Laptops", subcategories: [{ name: "Gaming", subcategories: [] }] },
  ],
});

// Cyclical input works out of the box with Zod
const input: any = { name: "root", subcategories: [] };
input.subcategories.push(input);

const result = Category.parse(input);
result.subcategories[0] === result; // true

// the output graph mirrors the input graph
result.subcategories[0].subcategories[0] === result; // true

// Zod Mini requires a memoizer, registered before schemas are defined
z.config({ memoizer: z.memoizer() });

// Mutually recursive schemas
const User = z.object({
  email: z.email(),
  get posts() {
    return z.array(Post);
  },
});

const Post = z.object({
  title: z.string(),
  get author() {
    return User;
  },
});

// Resolve TypeScript circularity errors with an explicit return type annotation
const Activity = z.object({
  name: z.string(),
  get subactivities(): z.ZodNullable<z.ZodArray<typeof Activity>> {
    return z.nullable(z.array(Activity));
  },
});
```

## Notes

- Use a JavaScript getter on the schema key to defer resolution until runtime, enabling self-reference
- Cyclical inputs (an object that contains itself) parse out of the box in Zod; Zod Mini requires `z.config({ memoizer: z.memoizer() })` registered before schemas are defined (the memoizer line is Zod Mini only)
- For TypeScript circularity errors, add an explicit return type annotation to the getter
- All object utility methods (`.pick()`, `.omit()`, `.partial()`, etc.) work with recursive schemas
