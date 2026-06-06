# Error Customization

Customize validation error messages at the schema level, per-parse level, or globally.

```typescript
import { z } from "zod";

// Schema-level: static string
const username = z.string("Username must be a string").min(3, "Too short!");

// Schema-level: dynamic error map function
const password = z.string({
  error: (iss) => (iss.input === undefined ? "Password is required." : "Invalid password."),
});

// Schema-level: conditional by issue code
const age = z.number().int().min(0, {
  error: (iss) => `Age must be at least ${iss.minimum}, got ${iss.input}`,
});

// Per-parse: override errors for a specific parse call
const schema = z.string();
schema.parse(42, {
  error: (iss) => {
    if (iss.code === "invalid_type") return `Expected a string, got ${typeof iss.input}`;
  },
});

// Global: set a fallback error map for all schemas
z.config({
  customError: (iss) => {
    if (iss.code === "invalid_type") return `invalid type, expected ${iss.expected}`;
    if (iss.code === "too_small") return `minimum is ${iss.minimum}`;
  },
});
```

## Notes

- Precedence (highest to lowest): schema-level error > per-parse error > global error map > locale error map
- Returning `undefined` from an error map falls through to the next lower-priority map
- Schema-level `error` can be a string or a function receiving an issue context object
- Use `z.config()` sparingly for global customization — schema-level errors are more explicit and maintainable
