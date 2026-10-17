---
source: https://v2.tauri.app/develop/tests/
---

# Tests

Techniques for testing inside and outside the Tauri runtime: unit and integration testing with a mock runtime, and end-to-end testing with the WebDriver protocol.

## Signature / Usage

```ts
import { mockIPC } from '@tauri-apps/api/mocks';

mockIPC((cmd, args) => {
  if (cmd === 'add') {
    return (args.a as number) + (args.b as number);
  }
});
```

## Overview

- Unit and integration testing use a mock runtime; native webview libraries are not executed under it (see Mock Tauri APIs).
- End-to-end testing uses the WebDriver protocol. WebdriverIO Tauri testing supports Windows, Linux and macOS; the WebDriver protocol can also be driven directly on Windows and Linux, as macOS provides no desktop WebDriver client (see WebDriver).
- `tauri-action` helps run GitHub Actions, but any CI/CD runner can be used with Tauri as long as each platform has the required libraries installed to compile against.

## Notes

- Tauri is driven through `tauri-driver` / WebdriverIO; this is not Playwright (see the playwright skill for Playwright).

## Related

- [Mock Tauri APIs](./mocking.md)
- [WebDriver](./webdriver-overview.md)
- [Continuous Integration (WebDriver)](./webdriver-ci.md)
