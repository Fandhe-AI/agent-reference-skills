# Browser Component Test

Render a React component in Browser Mode with `vitest-browser-react` and assert with auto-retrying `expect.element`.

```tsx
import { render } from 'vitest-browser-react'
import { expect, test } from 'vitest'
import Component from './Component.jsx'

test('counter button increments the count', async () => {
  const screen = await render(<Component count={1} />)

  await screen.getByRole('button', { name: 'Increment' }).click()

  await expect.element(screen.getByText('Count is 2')).toBeVisible()
})
```

## Notes

- `render` is asynchronous (to support `Suspense`); always `await` it
- `expect.element` retries until the assertion passes, even if the element re-rendered in between
- `vitest-browser-react` is a community package for Browser Mode; official-style packages also exist for Vue and Svelte (`vitest-browser-vue`, `vitest-browser-svelte`)
- Distinct from `@playwright/test` (see the playwright skill): this runs component tests under Vitest's Browser Mode, not Playwright Test's runner
- Source: https://vitest.dev/guide/browser/component-testing (Vitest v5.0.5)
