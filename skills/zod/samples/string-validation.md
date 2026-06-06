# String Validation

Validate string length, format, and content using built-in string checks and format validators.

```typescript
import { z } from "zod";

// Length and pattern checks
const username = z.string().min(3).max(20).regex(/^[a-z0-9_]+$/);

// Built-in format validators (top-level functions, not methods on z.string())
const emailSchema = z.email();
const urlSchema = z.url();
const uuidSchema = z.uuid();
const datetimeSchema = z.iso.datetime();

// String transforms
const normalized = z.string().trim().toLowerCase();

// Usage in an object schema
const SignupSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
  website: z.url().optional(),
  createdAt: z.iso.datetime(),
});

SignupSchema.parse({
  username: "billie",
  email: "billie@example.com",
  createdAt: "2024-01-15T10:30:00Z",
});
```

## Notes

- Format validators like `z.email()`, `z.url()`, `z.uuid()` are top-level functions, not methods on `z.string()`
- `z.iso.datetime()` disallows timezone offsets by default; use `{ offset: true }` to allow them
- All validation APIs accept an `error` parameter: `z.string().min(5, { error: "Too short!" })`
- String transforms (`.trim()`, `.toLowerCase()`, `.toUpperCase()`) are applied during parsing
