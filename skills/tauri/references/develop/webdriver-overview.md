---
source: https://v2.tauri.app/develop/tests/webdriver/
---

# WebDriver

WebDriver is a standardized interface to interact with web documents, primarily intended for automated testing. The recommended way to use it with Tauri is WebdriverIO with `@wdio/tauri-service`, which works on Windows, Linux and macOS.

## Signature / Usage

Scaffold with the WebdriverIO starter, pick Desktop Testing and choose Tauri at the framework prompt:

```shell
npm create wdio@latest ./
```

Minimal configuration:

```typescript
export const config: WebdriverIO.Config = {
  services: [
    [
      'tauri',
      {
        appBinaryPath: './src-tauri/target/release/my-tauri-app',
        driverProvider: 'embedded',
      },
    ],
  ],
};
```

## Overview

- The service (maintained under the WebdriverIO project) provides Tauri API access through `browser.tauri.execute()`, command (IPC) mocking, frontend and backend log capture, and multiremote.
- By default the service runs an embedded WebDriver server inside the app, so no external driver is needed on any platform; this is how macOS is supported. It can also drive the platform's native WebDriver through `tauri-driver` on Windows and Linux, or CrabNebula's cross-platform fork of `tauri-driver` on all platforms (a paid API key is required for macOS). The service detects the application binary, and on the `tauri-driver` route keeps the Edge WebDriver in sync on Windows.
- Two small Tauri plugins, both optional depending on requirements:
  - `tauri-plugin-wdio-webdriver` runs the embedded WebDriver server. Required for the `embedded` provider (the default); skip it for the `external` or `crabnebula` provider.
  - `tauri-plugin-wdio` enables backend access including `browser.tauri.execute()`, command (IPC) mocking and log capture.
- Browser mode: fast, renderer-only tests that run the Tauri frontend in plain Chrome against a Vite dev server, with no Tauri binary, driver or plugin required. It intercepts `invoke()` calls so commands can be mocked and their arguments asserted with the same WDIO API.
- Full setup, configuration and API reference: WebdriverIO Tauri documentation (https://webdriver.io/docs/desktop-testing/tauri). Runnable examples: the WebdriverIO desktop-mobile repository (`fixtures/e2e-apps/tauri`).

## Driving tauri-driver directly

For non-Node.js setups, Selenium, or custom test harnesses, drive `tauri-driver` directly instead of using the service. Driven directly, only Windows and Linux are supported on desktop, as macOS has no WKWebView driver tool available (use the service's embedded WebDriver server for macOS). See Manual WebDriver setup.

## Notes

- Tauri uses WebDriver via `tauri-driver` / `@wdio/tauri-service`. This is not Playwright; see the playwright skill for Playwright.
- CI guidance is in the Continuous Integration (WebDriver) page.

## Related

- [WebDriver Manual Setup](./webdriver-manual-setup.md)
- [Continuous Integration (WebDriver)](./webdriver-ci.md)
- [Mock Tauri APIs](./mocking.md)
- [Tests](./tests-overview.md)
