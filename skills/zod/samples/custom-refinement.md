# Custom Refinement

Add custom validation logic beyond built-in checks using `.refine()` and `.superRefine()`.

```typescript
import { z } from "zod";

// Cross-field validation: confirm passwords match
const PasswordForm = z
  .object({
    password: z.string().min(8),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    error: "Passwords don't match",
    path: ["confirm"], // attach error to the confirm field
  });

const result = PasswordForm.safeParse({ password: "hunter2!!", confirm: "different" });
result.error?.issues;
// [{ code: "custom", path: ["confirm"], message: "Passwords don't match" }]

// Multiple issues with superRefine
const UniqueStringArray = z.array(z.string()).superRefine((val, ctx) => {
  if (val.length > 3) {
    ctx.addIssue({ code: "too_big", maximum: 3, origin: "array", inclusive: true, message: "Too many items", input: val });
  }
  if (val.length !== new Set(val).size) {
    ctx.addIssue({ code: "custom", message: "No duplicates allowed.", input: val });
  }
});

// Async refinement: check uniqueness against a database
const uniqueUsername = z.string().refine(
  async (val) => {
    const exists = await db.users.exists({ username: val });
    return !exists;
  },
  { error: "Username already taken" }
);
const validated = await uniqueUsername.parseAsync("alice");
```

## Notes

- `.refine()` generates a single `"custom"` issue; `.superRefine()` can generate any number of issues with any issue code
- The `path` option in `.refine()` attaches the error to a specific field path — useful for cross-field validation on objects
- Refinement functions must never throw; returning a falsy value signals failure
- Async refinements require `.parseAsync()` or `.safeParseAsync()`
