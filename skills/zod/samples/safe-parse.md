# Safe Parse

Validate data without try/catch using the discriminated union result object.

```typescript
import { z } from "zod";

const PlayerSchema = z.object({
  username: z.string(),
  xp: z.number(),
});

const result = PlayerSchema.safeParse({ username: 42, xp: "100" });

if (!result.success) {
  result.error.issues;
  // [
  //   { code: "invalid_type", expected: "string", received: "number", path: ["username"], message: "..." },
  //   { code: "invalid_type", expected: "number", received: "string", path: ["xp"], message: "..." }
  // ]
} else {
  result.data; // { username: string; xp: number }
}

// Async variant — required when schema has async refinements or transforms
const asyncResult = await PlayerSchema.safeParseAsync({ username: "billie", xp: 100 });
```

## Notes

- `.safeParse()` never throws; returns `{ success: true; data: T }` or `{ success: false; error: ZodError }`
- Use `.safeParseAsync()` when the schema contains async refinements or transforms
- `result.error.issues` is an array of structured issue objects with `code`, `path`, and `message`
- Prefer `.safeParse()` over try/catch in application code for cleaner control flow
