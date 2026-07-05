# Testing: Vitest

Set up Vitest with Next.js for Unit Testing.

## Signature / Usage

```ts filename="vitest.config.mts"
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: { environment: 'jsdom' },
})
```

```tsx filename="__tests__/page.test.tsx"
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

test('Page', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})
```

## Setup

1. Quickstart: `create-next-app --example with-vitest with-vitest-app`.
2. Manual: install `vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom` (add `vite-tsconfig-paths` for TypeScript path aliases) as dev deps.
3. Create `vitest.config.mts`/`.js` as above.
4. Add `"test": "vitest"` to `package.json` scripts — running `npm run test` watches by default.

## Notes

- Test files commonly live in `__tests__`, but can also be colocated inside the `app` router.
- Vitest does not currently support `async` Server Components — use E2E tests for those instead.

## Related

- [Testing](./testing.md)
- [Jest](./jest.md)
