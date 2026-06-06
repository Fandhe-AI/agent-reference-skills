# Device Emulation

Test across devices, viewports, locales, timezones, and geolocation.

```typescript
// playwright.config.ts — project-level emulation
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'Desktop Chrome (FR)',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'fr-FR',
        timezoneId: 'Europe/Paris',
      },
    },
  ],
});
```

```typescript
// tests/emulation.spec.ts — per-test overrides
import { test, expect } from '@playwright/test';

test.use({
  viewport: { width: 375, height: 667 },
  locale: 'de-DE',
  timezoneId: 'Europe/Berlin',
  geolocation: { longitude: 13.404954, latitude: 52.520008 },
  permissions: ['geolocation'],
  colorScheme: 'dark',
});

test('mobile dark mode', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveScreenshot('mobile-dark.png');
});

test('dynamic viewport resize', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('https://example.com');
});
```

## Notes

- `devices` preset includes viewport, userAgent, deviceScaleFactor, isMobile, and hasTouch
- `test.use()` at the describe or file level applies to all tests in that scope without affecting others
- Update geolocation at runtime with `context.setGeolocation()` for location-change scenarios
- `colorScheme`, `offline`, and `javaScriptEnabled` are additional emulation options available in `use`
