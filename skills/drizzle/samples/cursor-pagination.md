---
source: https://orm.drizzle.team/docs/guides/cursor-based-pagination
---

# Cursor-based pagination

Fetch the next page of rows using the last row's id as a cursor instead of `offset`, avoiding scan-and-skip cost and page drift under concurrent writes.

```ts
import { asc, gt } from 'drizzle-orm';
import { users } from './schema';

const db = drizzle(...);

const nextUserPage = async (cursor?: number, pageSize = 3) => {
  await db
    .select()
    .from(users)
    .where(cursor ? gt(users.id, cursor) : undefined) // if cursor is provided, get rows after it
    .limit(pageSize) // the number of rows to return
    .orderBy(asc(users.id)); // ordering
};

// pass the cursor of the last row of the previous page (id)
await nextUserPage(3);
```

RQB equivalent:

```ts
import * as schema from './db/schema';

const db = drizzle(..., { schema });

const nextUserPage = async (cursor?: number, pageSize = 3) => {
  await db.query.users.findMany({
    where: (users, { gt }) => (cursor ? gt(users.id, cursor) : undefined),
    orderBy: (users, { asc }) => asc(users.id),
    limit: pageSize,
  });
};
```

## Notes

- The cursor column must be unique and sequential (e.g. an auto-incrementing `id`); create an index on it for efficient comparisons.
- For non-unique/non-sequential ordering columns, use a compound cursor (`or(gt(a, ca), and(eq(a, ca), gt(id, cid)))`) with a matching composite index.
- Benefits over limit/offset: no skipped/duplicated rows from concurrent inserts/deletes, and no need to scan-and-skip prior rows.
- Drawback: cannot jump directly to an arbitrary page number — use `limit-offset-pagination.md` when direct page navigation is required.
