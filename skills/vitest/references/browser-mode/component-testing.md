# Component Testing

Test individual UI components in isolation using Browser Mode (real browsers via Playwright, WebdriverIO or preview). Covers isolation / integration strategies, Testing Library bridging, accessibility and debugging patterns.

## Signature / Usage

```tsx
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-react'

test('shows error message when email format is invalid', async () => {
  render(<ContactForm />)
  await page.getByRole('button', { name: /submit/i }).click()
  await page.getByLabelText(/email/i).fill('user@example.com')
  await expect.element(page.getByText('Email is required')).toBeInTheDocument()
})
```

Bridging Testing Library output to Vitest locators (for frameworks without an official `vitest-browser-*` package):

```jsx
import { render } from '@testing-library/solid'
import { page } from 'vitest/browser'

test('Solid component handles user interaction', async () => {
  const { baseElement } = render(() => <Counter initialValue={0} />)
  const screen = page.elementLocator(baseElement)
  await expect.element(screen.getByText('Count: 0')).toBeInTheDocument()
  await screen.getByRole('button', { name: /increment/i }).click()
  await expect.element(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

Module mocking uses the `import()` syntax:

```tsx
vi.mock(import('../components/UserCard'), () => ({
  default: vi.fn(({ user }) => `<div>User: ${user.name}</div>`)
}))
```

## Notes

- Test behavior and user experience (props in, events / renders out), not internals such as state variables or CSS classes.
- For API requests the guide recommends MSW (`setupWorker` from `msw/browser`, with `worker.start()` / `worker.resetHandlers()` / `worker.stop()` in `beforeAll` / `afterEach` / `afterAll`).
- `expect.element()` auto-retries until the element is found; use `await expect.element(...)` for DOM assertions instead of `expect()`.
- Use `userEvent` from `vitest/browser`, not `@testing-library/user-event`.
- Migration from Jest + Testing Library: replace `import { render, screen } from '@testing-library/react'` with `import { render } from 'vitest-browser-react'`.
- Debugging: set `headless: false` temporarily to use browser dev tools; `page.getByRole('button').all()` with `.element()` exposes native DOM nodes; `.or()` chains locators with auto-retry; Vitest has no `page.locator()`, use the `getBy*` methods.
- Official packages: `vitest-browser-vue`, `vitest-browser-react`, `vitest-browser-svelte`. Alternatives: `@testing-library/solid`, `@marko/testing-library`, `@testing-library/svelte`, `@testing-library/vue`.
- Source: https://vitest.dev/guide/browser/component-testing (Vitest v5.0.5)

## Related

- [Browser Mode (Getting Started)](./overview.md)
- [Assertion API (expect.element)](./assertions.md)
- [Interactivity API](./interactivity-api.md)
- [Render Function](./render-function.md)
