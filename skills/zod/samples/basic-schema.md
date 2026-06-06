# Basic Schema

Define a schema, parse data, and infer TypeScript types.

```typescript
import { z } from "zod";

const PlayerSchema = z.object({
  username: z.string(),
  xp: z.number(),
});

// Parse validates and returns a strongly-typed deep clone
const data = PlayerSchema.parse({ username: "billie", xp: 100 });
// => { username: "billie", xp: 100 }

// Infer the TypeScript type from the schema
type Player = z.infer<typeof PlayerSchema>;
// => { username: string; xp: number }

const player: Player = { username: "billie", xp: 100 };
```

## Notes

- `.parse()` throws a `ZodError` on validation failure
- `z.infer<typeof Schema>` extracts the static TypeScript type
- All object properties are required by default
- Parsed result is a deep clone of the input, not the original reference
