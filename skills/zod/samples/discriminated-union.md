# Discriminated Union

Model tagged variant types with a shared discriminator key for efficient parsing and TypeScript narrowing.

```typescript
import { z } from "zod";

const ApiResponse = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.object({ status: z.literal("error"), code: z.number(), message: z.string() }),
  z.object({ status: z.literal("pending"), estimatedMs: z.number() }),
]);

type ApiResponse = z.infer<typeof ApiResponse>;

const result = ApiResponse.parse({ status: "success", data: "ok" });

// TypeScript narrows the type based on the discriminator
function handle(res: ApiResponse) {
  if (res.status === "success") {
    console.log(res.data);     // string
  } else if (res.status === "error") {
    console.log(res.message);  // string
  } else {
    console.log(res.estimatedMs); // number
  }
}

// Nested discriminated unions
const BaseError = { status: z.literal("failed"), message: z.string() };
const HttpError = z.discriminatedUnion("code", [
  z.object({ ...BaseError, code: z.literal(400) }),
  z.object({ ...BaseError, code: z.literal(404) }),
  z.object({ ...BaseError, code: z.literal(500) }),
]);

const Response = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  HttpError,
]);
```

## Notes

- `z.discriminatedUnion()` is more efficient than `z.union()` for large unions because it jumps directly to the matching option via the discriminator key
- Each option must be an object schema with a discriminator property set to a literal, enum, `null`, or `undefined` value
- Discriminated unions can be nested; Zod determines the optimal parsing strategy at each level
- TypeScript can narrow the inferred type using the discriminator key in if/switch statements
