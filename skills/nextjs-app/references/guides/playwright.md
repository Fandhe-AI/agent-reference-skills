# Testing: Playwright

Set up Playwright with Next.js for End-to-End (E2E) Testing across Chromium, Firefox, and WebKit.

## Signature / Usage

```ts filename="tests/example.spec.ts"
import { test, expect } from '@playwright/test'

test('should navigate to the about page', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.click('text=About')
  await expect(page).toHaveURL('http://localhost:3000/about')
  await expect(page.locator('h1')).toContainText('About')
})
```

## Setup

1. Quickstart: `create-next-app --example with-playwright with-playwright-app`.
2. Manual: run `npm init playwright` (or `pnpm create playwright` / `yarn create playwright`), which generates `playwright.config.ts` and prompts through setup.
3. Set `baseURL` in `playwright.config.ts` to use relative `page.goto("/")` calls.

## Running tests

Run `npm run build && npm run start` (test against a production-like build), then `npx playwright test` in another terminal. Alternatively use Playwright's `webServer` option to have it start the dev server automatically.

## Notes

- Playwright runs headless by default in CI; run `npx playwright install-deps` to install required system dependencies.

## Related

- [Testing](./testing.md)
- [Cypress](./cypress.md)
