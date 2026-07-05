# Testing: Jest

Set up Jest with Next.js for Unit Testing and Snapshot Testing, using the built-in `next/jest` transformer.

## Signature / Usage

```ts filename="jest.config.ts"
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
}

export default createJestConfig(config)
```

```jsx filename="__tests__/page.test.jsx"
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})
```

## Setup

1. Quickstart: `create-next-app --example with-jest with-jest-app`.
2. Manual: install `jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest` as dev deps, run `npm init jest@latest`, then wrap the config with `next/jest` as above.
3. Add a `test`/`test:watch` script to `package.json` (`jest` / `jest --watch`).
4. Create tests in a `__tests__` folder (or colocated in `app`).

## Notes

- `next/jest` auto-configures: SWC-based `transform`, auto-mocking stylesheets/images/`next/font`, loading `.env*` into `process.env`, ignoring `node_modules`/`.next`, and reading `next.config.js` for SWC flags.
- For path aliases, mirror `tsconfig.json`/`jsconfig.json` `paths` in `jest.config.js`'s `moduleNameMapper`.
- Add `setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']` importing `@testing-library/jest-dom` for custom matchers (e.g. `.toBeInTheDocument()`); `extend-expect` was removed in `jest-dom` v6.
- Jest does not support `async` Server Components — use E2E tests for those.

## Related

- [Testing](./testing.md)
- [Vitest](./vitest.md)
