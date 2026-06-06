# Error Formatting

Convert ZodError instances into structured formats suitable for form validation, logging, or API responses.

```typescript
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  age: z.number().int().positive(),
});

const result = FormSchema.safeParse({ username: "a", email: "not-an-email", age: -1 });

if (!result.success) {
  // Flat structure — best for simple form field errors
  const flat = z.flattenError(result.error);
  flat.fieldErrors;
  // {
  //   username: ["Too small: expected string to have >=3 characters"],
  //   email: ["Invalid email address"],
  //   age: ["Too small: expected number to be >0"]
  // }

  // Nested tree — best for deeply nested schemas
  const tree = z.treeifyError(result.error);
  tree.properties?.username?.errors;
  // => ["Too small: expected string to have >=3 characters"]

  // Human-readable string — best for logs and CLI output
  const pretty = z.prettifyError(result.error);
  console.error(pretty);
  // ✖ Too small: expected string to have >=3 characters
  //   → at username
  // ✖ Invalid email address
  //   → at email
  // ✖ Too small: expected number to be >0
  //   → at age
}
```

## Notes

- `z.flattenError()` is best for flat, one-level-deep schemas like HTML forms; it produces `{ formErrors, fieldErrors }`
- `z.treeifyError()` mirrors the schema shape; use optional chaining (`?.`) when traversing nested properties
- `z.prettifyError()` returns a human-readable string — not suitable for programmatic use
- `z.formatError()` is deprecated; use `z.treeifyError()` instead
