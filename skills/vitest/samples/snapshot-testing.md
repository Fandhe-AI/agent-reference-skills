# Snapshot Testing

Detect unintended output changes by comparing values against stored snapshots.

```ts
import { expect, test } from 'vitest'
import { renderCard } from './card'

// External snapshot: stored in __snapshots__/<file>.snap
test('renders the card component', () => {
  const html = renderCard({ title: 'Hello', body: 'World' })
  expect(html).toMatchSnapshot()
})
```

```ts
// Inline snapshot: stored directly in the test file
test('serializes the config object', () => {
  const config = buildConfig({ env: 'test' })
  expect(config).toMatchInlineSnapshot(`
    {
      "debug": false,
      "env": "test",
      "retries": 3,
    }
  `)
})
```

```ts
// File snapshot: compare against an arbitrary file (async)
test('generates the report HTML', async () => {
  const html = await generateReport()
  await expect(html).toMatchFileSnapshot('./snapshots/report.html')
})
```

```ts
// Error snapshot
test('throws a descriptive error', () => {
  expect(() => parseConfig('')).toThrowErrorMatchingInlineSnapshot(
    `"Config string must not be empty"`,
  )
})
```

## Notes

- Run `vitest run -u` (or press `u` in watch mode) to update snapshots when output changes intentionally
- In CI (`process.env.CI` is truthy) snapshot writes are disabled — mismatches fail the test
- Commit `.snap` files alongside source code so reviewers can see output changes in PRs
- `toMatchInlineSnapshot` is preferred for small values; `toMatchSnapshot` for large outputs such as HTML
