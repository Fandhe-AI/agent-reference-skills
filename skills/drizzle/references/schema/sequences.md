---
source: https://orm.drizzle.team/docs/sequences
---

# Sequences

PostgreSQL sequences are special single-row objects that generate unique, thread-safe sequential identifiers, commonly used for auto-incrementing primary keys.

## Signature / Usage

```ts
import { pgSchema, pgSequence } from "drizzle-orm/pg-core";

// No params specified
export const customSequence = pgSequence("name");

// Sequence with params
export const customSequenceWithParams = pgSequence("name", {
  startWith: 100,
  maxValue: 10000,
  minValue: 100,
  cycle: true,
  cache: 10,
  increment: 2,
});

// Sequence in custom schema
export const customSchema = pgSchema("custom_schema");
export const customSchemaSequence = customSchema.sequence("name");
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `startWith` | number | initial value of the sequence |
| `maxValue` | number | maximum value the sequence can reach |
| `minValue` | number | minimum value the sequence can reach |
| `cycle` | boolean | whether the sequence wraps around after hitting `maxValue`/`minValue` |
| `cache` | number | number of sequence values to preallocate for performance |
| `increment` | number | step size between successive sequence values |

## Related

- [Schema declaration](./sql-schema-declaration.md)
- [Schemas](./schemas.md)
