# Object Composition

Extend, pick, omit, and partially apply object schemas using TypeScript-style utility methods.

```typescript
import { z } from "zod";

const BaseUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  role: z.enum(["admin", "user"]),
});

// Extend with additional fields (prefer spread syntax for better TS performance)
const AdminUser = z.object({
  ...BaseUser.shape,
  permissions: z.array(z.string()),
});

// Pick specific fields
const UserSummary = BaseUser.pick({ id: true, name: true });
// => { id: string; name: string }

// Omit sensitive fields
const PublicUser = BaseUser.omit({ email: true });
// => { id: string; name: string; role: "admin" | "user" }

// Make all or specific fields optional (for PATCH request bodies)
const UserUpdate = BaseUser.partial();
// => { id?: string; name?: string; email?: string; role?: "admin" | "user" }

const PartialUpdate = BaseUser.partial({ name: true, email: true });
// => { id: string; name?: string; email?: string; role: "admin" | "user" }
```

## Notes

- Prefer spread syntax (`...Schema.shape`) over `.extend()` for better TypeScript compiler performance
- `.extend()` can overwrite existing fields without type errors; use `.safeExtend()` to prevent this
- `.partial()` is the equivalent of TypeScript's `Partial<T>` utility type
- `.pick()` and `.omit()` mirror TypeScript's built-in `Pick<T>` and `Omit<T>` utility types
