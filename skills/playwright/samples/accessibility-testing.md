# Accessibility Testing

Scan pages and components for accessibility violations using axe-core.

```bash
npm install --save-dev @axe-core/playwright
```

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('full page has no accessibility violations', async ({ page }) => {
  await page.goto('https://your-site.com/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('navigation flyout is accessible', async ({ page }) => {
  await page.goto('https://your-site.com/');
  await page.getByRole('button', { name: 'Navigation Menu' }).click();
  await page.locator('#navigation-menu-flyout').waitFor();

  const results = await new AxeBuilder({ page })
    .include('#navigation-menu-flyout')
    .analyze();
  expect(results.violations).toEqual([]);
});

test('WCAG 2.1 AA compliance', async ({ page }) => {
  await page.goto('https://your-site.com/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('ignore known issues', async ({ page }) => {
  await page.goto('https://your-site.com/');
  const results = await new AxeBuilder({ page })
    .exclude('#third-party-widget')
    .disableRules(['duplicate-id'])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

## Notes

- `@axe-core/playwright` wraps axe-core for use in Playwright tests; install separately
- `include()` and `exclude()` accept CSS selectors to scope or skip sections
- `withTags()` limits the ruleset to specific WCAG standards
- Print `results.violations` in the failure message with `JSON.stringify(results.violations, null, 2)` for diagnostics
