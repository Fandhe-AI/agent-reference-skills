---
source: https://orm.drizzle.team/docs/guides/conditional-filters-in-query
---

# Conditional filters in a query

Build a `.where()` clause whose conditions are only applied when the corresponding search parameter is provided, by passing `undefined` for skipped conditions.

```ts
import { and, gt, ilike, inArray } from 'drizzle-orm';

const searchPosts = async (term?: string, categories: string[] = [], views = 0) => {
  await db
    .select()
    .from(posts)
    .where(
      and(
        term ? ilike(posts.title, term) : undefined,
        categories.length > 0 ? inArray(posts.category, categories) : undefined,
        views > 100 ? gt(posts.views, views) : undefined,
      ),
    );
};

await searchPosts(); // no filters
await searchPosts('AI', ['Tech', 'Art', 'Science'], 200);
```

## Notes

- `and()`/`or()` silently drop `undefined` arguments, so ternaries like `condition ? eq(...) : undefined` compose cleanly without a manual "build an array and filter falsy" step.
- Filters can also be accumulated into an `SQL[]` array across different parts of a codebase and combined later with `and(...filters)`.
- Custom filter operators are just `sql` template expressions returning a boolean condition (e.g. ``sql`length(${column}) < ${value}` ``), so any operator you're missing can be hand-rolled the same way built-ins like `lt` are implemented internally.
