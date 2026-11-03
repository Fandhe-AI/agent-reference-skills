---
source: https://developers.cloudflare.com/d1/reference/glossary/
---

# Glossary

Definitions of terms used across the D1 documentation.

## Signature / Usage

Adapted (not in the official docs): `getBookmark()` is not destructured and a query is run first; see Notes.

```ts
// bookmark and session terms in code
const session = env.DB.withSession("first-primary");
await session.prepare("SELECT 1").run(); // run a query first; otherwise getBookmark() returns null
const bookmark = session.getBookmark(); // string | null
```

## Options / Props

| Term | Definition |
| --- | --- |
| bookmark | Represents the state of a database at a specific point in time. Bookmarks are lexicographically sortable; sorting orders them oldest-to-newest. |
| primary database instance | The original instance of a database; exists in only one location in the world. |
| query planner | A component in a DBMS that takes a user query and generates the most efficient plan (e.g. which indices to use, which table to access first). |
| read replica | An eventually-replicated copy of the primary database instance serving only read requests. There may be multiple per primary. |
| replica lag | The time it takes for the primary to replicate its changes to a specific read replica. |
| session | Encapsulates all the queries from one logical session for your application (e.g. a particular web browser session). |

## Notes

- Corrected from the official docs: the official example destructures `{ bookmark }`, but `getBookmark()` returns `String | null` directly (see D1Database). The `prepare(...).run()` line is added so the bookmark is not `null`.

## Related

- [Global read replication](./read-replication.md)
- [Time Travel and backups](./time-travel.md)
- [D1Database](./d1-database.md)
