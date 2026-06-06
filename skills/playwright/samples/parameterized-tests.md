# Parameterized Tests

Run the same test logic against multiple data sets.

```typescript
// tests/greet.spec.ts — inline data
import { test, expect } from '@playwright/test';

[
  { name: 'Alice', expected: 'Hello, Alice!' },
  { name: 'Bob',   expected: 'Hello, Bob!' },
  { name: 'Carol', expected: 'Hello, Carol!' },
].forEach(({ name, expected }) => {
  test(`greeting for ${name}`, async ({ page }) => {
    await page.goto(`https://example.com/greet?name=${name}`);
    await expect(page.getByRole('heading')).toHaveText(expected);
  });
});
```

```typescript
// my-test.ts — project-level options
import { test as base } from '@playwright/test';

type TestOptions = { person: string };

export const test = base.extend<TestOptions>({
  person: ['John', { option: true }],
});
```

```typescript
// playwright.config.ts — parameterized projects
import { defineConfig } from '@playwright/test';
import type { TestOptions } from './my-test';

export default defineConfig<TestOptions>({
  projects: [
    { name: 'alice', use: { person: 'Alice' } },
    { name: 'bob',   use: { person: 'Bob' } },
  ],
});
```

```typescript
// tests/person.spec.ts
import { test, expect } from '../my-test';

test('greet person', async ({ page, person }) => {
  await page.goto('/greet');
  await expect(page.getByRole('heading')).toContainText(person);
});
```

## Notes

- Place `beforeEach` / `afterEach` hooks outside the `forEach` loop so they run once per suite, not once per iteration
- Project-level parameterization via custom options is preferred for cross-environment scenarios (staging vs production)
- External data sources (CSV, JSON) can be read with `fs.readFileSync` and iterated with `for...of` to generate tests dynamically
