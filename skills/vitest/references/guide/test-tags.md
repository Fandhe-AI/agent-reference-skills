# Test Tags

Tags (since 4.1.0) label tests so you can filter what runs and apply shared options such as `timeout` or `retry` to a category of tests.

## Signature / Usage

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    tags: [
      { name: 'frontend', description: 'Tests written for frontend.' },
      { name: 'db', description: 'Tests for database queries.', timeout: 60_000 },
      {
        name: 'flaky',
        description: 'Flaky CI tests.',
        retry: process.env.CI ? 3 : 0,
        timeout: 30_000,
        priority: 1,
      },
    ],
  },
})
```

```ts
import { describe, test } from 'vitest'

test('renders homepage', { tags: ['frontend'] }, () => {})

describe('API endpoints', { tags: ['backend'] }, () => {
  test('validates input', { tags: ['validation'] }, () => {
    // has both "backend" (inherited) and "validation"
  })
})
```

```bash
vitest --tags-filter="(unit || e2e) && !slow"
```

## Options / Props

Filter expression syntax:

| Token | Meaning |
|-------|---------|
| `and` / `&&` | Both expressions |
| `or` / `||` | At least one |
| `not` / `!` | Exclude |
| `*` | Wildcard for any number of characters (e.g. `unit/*`) |
| `()` | Grouping |

Precedence: `not` > `and` > `or`.

## Notes

- Tags must be defined in config; using an undefined tag throws unless `strictTags` is disabled. No built-in tags exist.
- Reserved names: `and`, `or`, `not` (case-insensitive). Names cannot contain `(`, `)`, `&`, `|`, `!`, `*`, or spaces.
- Type-safe names: augment `TestTags` via `declare module 'vitest' { interface TestTags { tags: 'frontend' | 'db' } }`.
- List tags with `vitest --list-tags` (or `--list-tags=json`).
- Conflict resolution when several tags set the same option: by `priority` first (lower number wins), then order in the test's `tags` array; tags without priority merge first. Options on the test itself always win; `undefined` options are ignored.
- JSDoc `@module-tag name` at the top of a file tags every test in that file (not only the next test).
- Multiple `--tags-filter` flags combine with AND. Vitest UI accepts a `tag:` prefix. Programmatic: `tagsFilter` option of `startVitest` / `createVitest`, or `testTagsFilter` in `createSpecification`.
- Runtime check: `TestRunner.matchesTags(['db'])` returns whether the current `--tags-filter` would include a test with those tags (always `true` without a filter).

```ts
import { beforeAll, TestRunner } from 'vitest'

beforeAll(async () => {
  if (TestRunner.matchesTags(['db'])) {
    await seedDatabase()
  }
})
```

- Use projects instead of tags when categories need different runner settings (isolation, pool, environment).

## Related

- [Test Filtering](./filtering.md)
- [CLI](./cli.md)
- [Workspace](./workspace.md)
