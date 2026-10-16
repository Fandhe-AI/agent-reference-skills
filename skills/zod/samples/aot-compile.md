---
source: https://zod.dev/compile
---

# AOT Compile

Compile a schema ahead of time into a flat, loop-free validator for hot validation paths.

```typescript
import * as z from "zod";

const Player = z.object({
  username: z.string(),
  xp: z.number(),
});

// Compile the final schema, not an intermediate
const CompiledPlayer = z.compile(Player);
CompiledPlayer.parse({ username: "billie", xp: 100 });

// ❌ the .refine() result is not compiled
const bad = z.compile(z.string()).refine((val) => val.length > 1);
// ✅ compile last
const good = z.compile(z.string().refine((val) => val.length > 1));

// Throw instead of silently falling back to the uncompiled schema
const Async = z.string().refine(async (val) => val.length > 1);
z.compile(Async, { strict: true }); // throws ZodCompileAsyncError

// Boolean hot path: .validate() answers directly from the compiled fast path
CompiledPlayer.validate({ username: "billie", xp: 100 }); // true
CompiledPlayer.validate({ username: 42, xp: "100" }); // false
```

Global opt-in (applications only, not libraries):

```typescript
import "zod/compile"; // must come before modules that define schemas
import * as z from "zod";

const schema = z.object({ name: z.string() });
schema.parse({ name: "ok" }); // compiled on first parse
```

```sh
node --import zod/compile app.js   # ESM
node --require zod/compile app.cjs # CommonJS
```

## Notes

- A compiled schema is a normal Zod schema: same methods, types, issues, and error messages. On invalid input the uncompiled schema runs as a fallback, so failures are barely faster
- Methods that derive a new schema (`.refine()`, `.extend()`, `.optional()`, `.meta()`) return uncompiled schemas; call `z.compile()` last
- Unsupported schemas (async checks, `z.xor()`, recursive schemas, `z.coerce.*`, custom `when` checks, `.catch()` with a callback) are returned uncompiled unless `strict: true`; `ZodCompileAsyncError` is thrown for async schemas and `ZodCompileUnsupportedError` for the rest
- `z.compile()` uses `new Function`, so it is unavailable in no-`eval` CSP environments; it adds about 7 KB gzipped to the bundle
