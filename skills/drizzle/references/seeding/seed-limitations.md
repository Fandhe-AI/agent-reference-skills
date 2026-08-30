---
source: https://orm.drizzle.team/docs/seed-overview#limitations
---

# Seeding limitations

Known constraints of `drizzle-seed` around type inference for relations and unique constraint combinations.

## Signature / Usage

```ts
// Composite unique constraints sharing a column are NOT supported for seeding
const composite = pgTable(
  "composite_example",
  {
    id: integer("id").notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
  },
  (t) => [
    unique("custom_name").on(t.id, t.name),
    unique("custom_name1").on(t.name, t.slug), // shares column `name` with the constraint above
  ]
);
```

## Notes

- **Types limitations for `with`**: TypeScript cannot properly infer references between tables, especially with circular dependencies, so `with` displays all tables in the schema and requires manually selecting the one-to-many side (`with` only works for one-to-many, e.g. `users.with(posts)` is valid but `posts.with(users)` is not).
- **Composite unique constraints**: seeding is not supported when two composite unique constraints share a column; it is allowed if one of the constraints is instead a single-column unique constraint.
- You can't use a generator that doesn't expose an `isUnique` option in its config, unless it's one of the always-unique generators: `intPrimaryKey`, `email`, `phoneNumber`, or `uuid`.
- Transcribed from the `## Limitations` section of `pg/seed-overview.mdx`; the repository also ships a root-level `seed-limitations.mdx`, but that file's body is only a placeholder comment (`// type limitations for third param`), not the real content, so `pg/seed-overview.mdx` is the source of truth.

## Related

- [seed-overview](./seed-overview.md)
- [seed-functions](./seed-functions.md)
