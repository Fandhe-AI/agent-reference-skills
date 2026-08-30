---
source: https://orm.drizzle.team/docs/faq
---

# FAQ & Troubleshooting

Answers to common Drizzle Kit workflow questions: `generate` vs `push`, and PostgreSQL index limitations under `push`/`generate`.

## Signature / Usage

```ts
index().on(table.id, table.email) // OK, name auto-generated
index('my_name').on(table.id, table.email) // OK

// but
index().on(sql`lower(${table.email})`) // error: name required
index('my_name').on(sql`lower(${table.email})`) // OK
```

## Notes

- `generate` creates a SQL migration file (plus metadata for `drizzle-kit`) but does not apply it to a database — apply it via `migrate` (see `migrations`).
- `push` syncs your schema directly to the database without generating migration files; recommended only for local development and local databases (see `drizzle-kit-push`).
- PostgreSQL index limitation 1: if an index has at least one expression (e.g. an index on `lower(email)` via `sql` template), you must specify an index name manually.
- PostgreSQL index limitation 2: `push` will not generate statements for changes to `.on()`/`.using()` expressions, `.where()` clauses, or `.op()` operator classes on an *existing* index. Workaround: comment out the index, push, uncomment with the new definition, push again. `generate` has no such limitation — it detects any property change on the new indexes API.

## Related

- [gotchas](./gotchas.md)
