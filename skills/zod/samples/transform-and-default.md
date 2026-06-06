# Transform and Default

Convert validated data into different shapes, and provide fallback values for missing inputs.

```typescript
import { z } from "zod";

// Transform: convert a string to its length
const stringToLength = z.string().transform((val) => val.length);
stringToLength.parse("hello"); // => 5

type Input = z.input<typeof stringToLength>;   // string
type Output = z.output<typeof stringToLength>; // number

// Default: return a fallback when input is undefined
const withDefault = z.string().default("guest");
withDefault.parse(undefined); // => "guest"
withDefault.parse("alice");   // => "alice"

// Preprocess: transform input before validation
const coercedInt = z.preprocess((val) => {
  if (typeof val === "string") return Number.parseInt(val);
  return val;
}, z.int());
coercedInt.parse("42"); // => 42

// Combined example: env var parsing
const EnvSchema = z.object({
  PORT: z.preprocess((v) => Number(v), z.number().int().positive()).default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.url(),
});

const env = EnvSchema.parse(process.env);
```

## Notes

- When a schema has transforms, `z.input<>` and `z.output<>` types may differ; `z.infer<>` returns the output type
- `.default()` short-circuits parsing — the default value bypasses validation; use `.prefault()` if the default should be parsed
- `.transform()` functions must never throw; push to `ctx.issues` to report errors inside a transform
- `.parseAsync()` is required when transforms are async
