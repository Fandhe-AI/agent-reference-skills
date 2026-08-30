---
source: https://orm.drizzle.team/docs/why-drizzle
---

# Why Drizzle?

`/docs/why-drizzle` is a routed page on the docs site, but it renders the same "Drizzle ORM" pitch as `overview` (headless ORM, SQL-like core, Relational Queries API, serverless-ready, 0 dependencies) — verified live, same H1 and body copy.

## Notes

- Source `why-drizzle.mdx` in the docs repo is the root-level file behind this route; it is near-verbatim identical to `overview.mdx`, down to the same `db.select()...leftJoin()` and `db.query.users.findMany({ with: { posts: true } })` code samples.
- Use `overview.md` in this category as the canonical page for this content; this file exists only so the `/docs/why-drizzle` URL has a corresponding entry.

## Related

- [overview](./overview.md)
