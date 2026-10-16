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

test('webp snapshot', async ({ page }) => {
  await page.goto('https://playwright.dev');
  // The .webp extension stores the snapshot as lossless WebP instead of PNG
  await expect(page).toHaveScreenshot('landing.webp');
});
```

```typescript
// playwright.config.ts — store all unnamed snapshots as WebP
import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      type: 'webp',
    },
  },
});
```

## Notes

- `toHaveScreenshot()` generates a baseline on the first run and diffs on subsequent runs
- Use `--update-snapshots` CLI flag to regenerate golden snapshots after intentional UI changes
- Set `threshold` and `maxDiffPixels` options on `toHaveScreenshot()` to control diff sensitivity
- Screenshots are stored per platform by default; use `snapshotPathTemplate` in config to customise paths
- `.webp` snapshot names and `expect.toHaveScreenshot.type: 'webp'` are documented for v1.64. Snapshots default to PNG
- v1.64 change: `--update-snapshots=missing` now passes the run when tests only create missing snapshots. The mode used when the option is omitted is now named `'default'` (missing snapshots are written and the test fails)
