---
source: https://orm.drizzle.team/docs/guides/limit-offset-pagination
---

# Limit/offset pagination

Fetch a specific page number of rows with `.limit()` + `.offset()`, ordered by a unique column for consistent results.

```ts
import { asc } from 'drizzle-orm';
import { users } from './schema';

const db = drizzle(...);

const getUsers = async (page = 1, pageSize = 3) => {
  await db
    .select()
    .from(users)
    .orderBy(asc(users.id)) // order by is mandatory
    .limit(pageSize) // the number of rows to return
    .offset((page - 1) * pageSize); // the number of rows to skip
};

await getUsers(2);
```

RQB equivalent:

```ts
import * as schema from './db/schema';

const db = drizzle({ schema });

const getUsers = async (page = 1, pageSize = 3) => {
  await db.query.users.findMany({
    orderBy: (users, { asc }) => asc(users.id),
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
};
```

## Notes

- Order by a unique column (or append one, e.g. `orderBy(asc(users.firstName), asc(users.id))`) — otherwise results can be inconsistent across pages.
- Large offsets degrade performance because the database must scan and skip all preceding rows; a `deferred join` (select just the ids first, then join) mitigates this on wide tables.
- Rows inserted/deleted between page requests can cause duplicated or skipped rows — use `cursor-pagination.md` when that matters.
- MSSQL uses `.offset(n).fetch(m)` instead of `.limit().offset()`.
