# Visual Testing

Capture screenshots and perform visual snapshot comparisons.

```typescript
import { test, expect } from '@playwright/test';

test('full page screenshot', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
});

test('element screenshot', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.locator('.navbar').screenshot({ path: 'navbar.png' });
});

test('visual snapshot comparison', async ({ page }) => {
  await page.goto('https://playwright.dev');
  // First run generates the golden snapshot; subsequent runs compare against it
  await expect(page).toHaveScreenshot('homepage.png');
});

test('element snapshot comparison', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page.locator('.hero')).toHaveScreenshot('hero.png');
});
```

## Notes

- `toHaveScreenshot()` generates a baseline on the first run and diffs on subsequent runs
- Use `--update-snapshots` CLI flag to regenerate golden snapshots after intentional UI changes
- Set `threshold` and `maxDiffPixels` options on `toHaveScreenshot()` to control diff sensitivity
- Screenshots are stored per platform by default; use `snapshotPathTemplate` in config to customise paths
