# Stories in end-to-end tests (Cypress / Playwright)

Stories (Component Story Format named exports) can be loaded in Cypress or Playwright through Storybook's isolated iframe to run end-to-end checks against a story, including values set by its play function.

## Signature / Usage

Cypress:

```js
/// <reference types="cypress" />

describe('Login Form', () => {
  it('Should contain valid login information', () => {
    cy.visit('/iframe.html?id=components-login-form--example');
    cy.get('#login-form').within(() => {
      cy.log('**enter the email**');
      cy.get('#email').should('have.value', 'email@provider.com');
      cy.log('**enter password**');
      cy.get('#password').should('have.value', 'a-random-password');
    });
  });
});
```

Playwright:

```js
import { test, expect } from '@playwright/test';

test('Login Form inputs', async ({ page }) => {
  await page.goto('http://localhost:6006/iframe.html?id=components-login-form--example');
  await expect(page.locator('#email')).toHaveValue('email@provider.com');
  await expect(page.locator('#password')).toHaveValue('a-random-password');
});
```

## Notes

- Both examples assume a story (`components-login-form--example`) whose play function fills the email and password inputs; the test then asserts the input values.
- The story is addressed via `/iframe.html?id=<story-id>`. Playwright example targets `http://localhost:6006`.
- The play function runs after the story renders and sequences interactions.
- The official snippet reads values with `page.inputValue()` + `toBe`, which does not wait for the play function; web-first `toHaveValue` retries until it completes.
- Source: https://storybook.js.org/docs/writing-tests/integrations/stories-in-end-to-end-tests (Storybook v10.6.2).

## Related

- [Interaction testing](./interaction-testing.md)
- [Portable stories](./portable-stories.md)
- [Test runner](./test-runner.md)
- [Vitest addon](./vitest-addon.md)
