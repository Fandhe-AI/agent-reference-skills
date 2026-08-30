---
source: https://orm.drizzle.team/docs/gotchas
---

# Drizzle Gotchas

Placeholder page in the official docs for a future library of gotchas with Drizzle use cases.

## Signature / Usage

```ts
// faq.mdx: PostgreSQL index gotcha (the one published gotcha-style entry in the docs)
index().on(table.id, table.email) // OK, name auto-generated
index('my_name').on(table.id, table.email) // OK

// but
index().on(sql`lower(${table.email})`) // error: name required
index('my_name').on(sql`lower(${table.email})`) // OK
```

## Notes

- As of the current docs source (`gotchas.mdx`), this page contains only the heading and the sentence "This will be a library of `gotchas` with Drizzle use cases" — no gotcha entries have been published yet.
- No code example exists on this page itself; the snippet above is quoted from `faq.mdx` (see `faq.md` in this category), the closest published "gotcha" entry in the current docs (PostgreSQL indexes with expressions require a manual name, and `push` cannot detect changes to an existing index's expression/where-clause/op-class).

## Related

- [faq](./faq.md)
