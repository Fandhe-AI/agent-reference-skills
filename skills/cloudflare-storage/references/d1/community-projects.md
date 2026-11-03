---
source: https://developers.cloudflare.com/d1/reference/community-projects/
---

# Community projects

ORMs, query builders and tools built by the community on top of D1. These are not maintained by the Cloudflare D1 team; report issues to each project's repository.

## Signature / Usage

```sh
# NuxtHub: use the remote D1 database in development
npx nuxt dev --remote
```

## Options / Props

| Project | Description |
|---------|-------------|
| Sutando ORM | Node.js ORM; each table has a model handling CRUD. |
| knex-cloudflare-d1 | Cloudflare D1 dialect for Knex.js (not official). |
| Prisma ORM | JavaScript / TypeScript ORM with a D1 tutorial and docs. |
| D1 adapter for Kysely ORM (`kysely-d1`) | Type-safe TypeScript SQL query builder adapter. |
| feathers-kysely | FeathersJS query syntax adapter built on the Kysely D1 adapter. |
| Drizzle ORM | Headless TypeScript ORM with `drizzle-kit` migrations; generates D1 schema from TypeScript types. |
| UQL | TypeScript ORM querying with plain JSON objects; binds to D1 via `uql-orm/d1`, splitting large writes to stay within the bound-parameter cap. |
| workers-qb | Zero-dependency query builder for direct SQL access. |
| d1-console | Interactive console: multi-line queries, history, formatted tables. |
| D1 Migration Guard (`d1-migration-guard`) | Zero-dependency CLI: checks migration filename ordering / duplicates, `wrangler.toml` `database_id` validation, destructive SQL patterns before `wrangler d1 migrations apply`. Reads local files only. |
| L1 | Brings Worker bindings (D1 via PDO, KV, Queues) into PHP / Laravel via the Cloudflare API. |
| Staff Directory | Demo using D1, HonoX and Cloudflare Pages. |
| NuxtHub | Nuxt module exposing D1 (`hubDatabase()`), KV (`hubKV()`), R2 (`hubBlob()`); `npx nuxt dev --remote` uses the remote D1 in development. |
| Grainlift | Connects D1 to DuckDB, Python and browser apps via Arrow Database Connectivity (ADBC); open-source gateway runs on Workers in your account. |

## Notes

- For Drizzle ORM (drizzle-orm/d1), see the drizzle skill.
- Prisma is covered by the official tutorial `d1-and-prisma-orm` (not included in this skill).

## Related

- [Workers Binding API](./worker-binding-api.md)
- [Migrations](./migrations.md)
