# Page Object Model

Encapsulate page interactions in reusable classes to reduce duplication and centralise selectors.

```typescript
// models/playwright-dev-page.ts
import { expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightDevPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly gettingStartedHeader: Locator;
  readonly pomLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.gettingStartedHeader = page.getByRole('heading', { name: 'Installation' });
    this.pomLink = page.getByRole('link', { name: 'Page Object Model' });
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async getStarted() {
    await this.getStartedLink.first().click();
    await expect(this.gettingStartedHeader).toBeVisible();
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.pomLink.click();
  }
}
```

```typescript
// tests/playwright-dev.spec.ts
import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../models/playwright-dev-page';

test('getting started should contain table of contents', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();
  await expect(playwrightDev.gettingStartedHeader).toBeVisible();
});

test('should show page object model docs', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.pageObjectModel();
});
```

## Notes

- Store locators as class properties to centralise selector maintenance
- Combine POM with custom fixtures to automatically instantiate page objects per test
- Avoid assertions in the constructor; keep setup logic in explicit methods like `goto()`
- POM classes do not need to extend any Playwright base class
