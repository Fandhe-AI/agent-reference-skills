# Chrome Extensions

Playwright supports testing Chrome extensions in Chromium only. Extensions require a persistent browser context and specific launch arguments.

## Requirements

- **Chromium only** -- Firefox and WebKit do not support extensions.
- **Persistent context** -- Use `chromium.launchPersistentContext()` instead of the standard `browser.newContext()`.
- **Channel `chromium`** -- Set `channel: 'chromium'` to enable headless extension support. Google Chrome and Microsoft Edge have removed command-line flags for side-loading extensions, so the Playwright-bundled Chromium must be used.

## Launch Arguments

Two flags are required to load an unpacked extension:

| Flag                              | Purpose                                  |
| --------------------------------- | ---------------------------------------- |
| `--disable-extensions-except=PATH` | Disable all extensions except the target |
| `--load-extension=PATH`            | Load the unpacked extension from PATH    |

## Accessing the Service Worker

Extensions expose their background service worker through the browser context:

```ts
let [serviceWorker] = browserContext.serviceWorkers();
if (!serviceWorker) {
  serviceWorker = await browserContext.waitForEvent('serviceworker');
}
```

The extension ID is extracted from the service worker URL:

```ts
const extensionId = serviceWorker.url().split('/')[2];
```

## Test Fixture

Create a reusable fixture that launches Chromium with the extension loaded:

```ts
import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, 'my-extension');
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    let [serviceWorker] = context.serviceWorkers();
    if (!serviceWorker) {
      serviceWorker = await context.waitForEvent('serviceworker');
    }
    const extensionId = serviceWorker.url().split('/')[2];
    await use(extensionId);
  },
});

export const expect = test.expect;
```

## Testing Extension Pages

### Page Content Modified by the Extension

Verify that the extension modifies page content:

```ts
test('extension modifies page', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('body')).toHaveText('Changed by my-extension');
});
```

### Extension Popup

Navigate directly to the extension popup using `chrome-extension://` protocol:

```ts
test('extension popup', async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  await expect(page.locator('body')).toHaveText('my-extension popup');
});
```

## Headless and Headed Modes

With `channel: 'chromium'`, extensions work in both headless and headed modes. To run headed (useful for debugging):

```bash
npx playwright test --headed
```

The default headless mode runs without a visible browser window, which is suitable for CI environments.
