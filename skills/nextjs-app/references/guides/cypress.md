# Testing: Cypress

Set up Cypress with Next.js for End-to-End (E2E) and Component Testing.

## Signature / Usage

```js filename="cypress/e2e/app.cy.js"
describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="about"]').click()
    cy.url().should('include', '/about')
    cy.get('h1').contains('About')
  })
})
```

```ts filename="cypress.config.ts"
import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: { framework: 'next', bundler: 'webpack' },
  },
})
```

## Setup

1. Quickstart: `create-next-app --example with-cypress with-cypress-app`.
2. Manual: install `cypress` as a dev dependency, add a `cypress:open` script, then run it once to configure **E2E Testing** and/or **Component Testing** (creates `cypress.config.js` and a `cypress` folder).
3. For component tests, select **Next.js** as the framework when configuring Component Testing.

## Running tests

- E2E: build and start the app (`next build && next start`), then run `cypress:open`/`cypress run --e2e` in another terminal — or use `start-server-and-test` to run the server and Cypress together.
- Component: run `cypress:open`/`cypress run --component` (no Next.js server required).
- CI: use `cypress run` (headless) rather than `cypress open`.

## Notes

- Cypress versions below 13.6.3 don't support TypeScript 5 with `moduleResolution: "bundler"`.
- Cypress doesn't support Component Testing for `async` Server Components — use E2E tests instead.
- Component tests don't run a Next.js server, so server-dependent features (e.g. `<Image />` optimization) may not work out of the box.

## Related

- [Testing](./testing.md)
- [Playwright](./playwright.md)
