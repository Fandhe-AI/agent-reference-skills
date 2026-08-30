---
source: https://orm.drizzle.team/docs/generated-columns
---

# Generated Columns

Stored (persistent) generated columns are computed from other columns on insert/update and their values are physically stored, so they can be indexed like any other column.

## Signature / Usage

```ts
export const test = pgTable("test", {
  name: text("first_name"),
  generatedName: text("gen_name").generatedAlwaysAs(
    (): SQL => sql`'hi, ' || ${test.name} || '!'`
  ),
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `.generatedAlwaysAs(sql\`...\`)` | column method | generates the column using an `sql` tagged template (values escaped by Drizzle) |
| `.generatedAlwaysAs((): SQL => sql\`...\`)` | column method | generates the column via a callback, needed to reference other columns of the same table |

## Notes

- Only `STORED` generation is supported (no virtual/`VIRTUAL` generated columns)
- Cannot specify a `.default()` on a generated column; expressions cannot reference other generated columns or use subqueries
- Generated columns cannot be used directly in primary keys, foreign keys, or unique constraints
- Common use case: full-text search columns via `to_tsvector(...)` paired with a `gin` index

## Related

- [Custom types](./custom-types.md)
- [Indexes & Constraints](./indexes-constraints.md)
