# Service Workers

Playwright provides APIs for interacting with service workers. Service worker support is **Chromium-only** -- Firefox and WebKit do not expose service worker APIs.

## Blocking Service Workers

To prevent service workers from interfering with tests, set `serviceWorkers` to `'block'` in the configuration. This produces more predictable and performant tests:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    serviceWorkers: 'block',
  },
});
```

The default value is `'allow'`, which lets service workers register and intercept requests normally.

## Waiting for Service Worker Registration

Detect when a service worker activates using the browser context event:

```ts
const serviceWorkerPromise = context.waitForEvent('serviceworker');
await page.goto('/example-with-a-service-worker.html');
const serviceWorker = await serviceWorkerPromise;
```

Before evaluating code in the worker, ensure it has fully activated:

```ts
await page.evaluate(async () => {
  const registration = await window.navigator.serviceWorker.getRegistration();
  if (registration.active?.state === 'activated') return;
  await new Promise<void>((resolve) => {
    window.navigator.serviceWorker.addEventListener(
      'controllerchange',
      () => resolve()
    );
  });
});
```

## Network Events

When a service worker makes network requests, those requests fire events on the browser context (not the page):

- `browserContext.on('request')`
- `browserContext.on('response')`
- `browserContext.on('requestfinished')`
- `browserContext.on('requestfailed')`

Use `request.serviceWorker()` to identify requests originating from a service worker.

## Conditional Routing

Route requests differently depending on whether they come from a service worker or a page:

```ts
await context.route('**', async (route) => {
  if (route.request().serviceWorker()) {
    // Mock responses for service worker requests
    await route.fulfill({
      contentType: 'text/plain',
      status: 200,
      body: 'from sw',
    });
  } else {
    // Let page requests pass through
    await route.continue();
  }
});
```

## Limitations

- Service workers are supported on **Chromium-based browsers only**.
- Requests for updated service worker main script code (the script URL itself) **cannot** be routed via Playwright's routing APIs.
