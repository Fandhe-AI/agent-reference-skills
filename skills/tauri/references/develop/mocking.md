---
source: https://v2.tauri.app/develop/tests/mocking/
---

# Mock Tauri APIs

When writing frontend tests, a fake Tauri environment simulates windows or intercepts IPC calls. The `@tauri-apps/api/mocks` module provides `mockIPC`, `mockWindows` and `clearMocks`.

## Signature / Usage

```typescript
import { beforeAll, expect, test } from "vitest";
import { randomFillSync } from "crypto";

import { mockIPC } from "@tauri-apps/api/mocks";
import { invoke } from "@tauri-apps/api/core";

// jsdom doesn't come with a WebCrypto implementation
beforeAll(() => {
  Object.defineProperty(window, 'crypto', {
    value: {
      // @ts-ignore
      getRandomValues: (buffer) => {
        return randomFillSync(buffer);
      },
    },
  });
});


test("invoke simple", async () => {
  mockIPC((cmd, args) => {
    // simulated rust command called "add" that just adds two numbers
    if(cmd === "add") {
      return (args.a as number) + (args.b as number);
    }
  });
});
```

### IPC requests

`mockIPC` intercepts IPC requests, to ensure the correct backend calls are made and to simulate different results from backend functions. The examples use Vitest, but any frontend testing library such as jest works.

To track how many times a command was invoked, combine `mockIPC()` with spying tools:

```typescript
import { beforeAll, expect, test, vi } from "vitest";
import { randomFillSync } from "crypto";

import { mockIPC } from "@tauri-apps/api/mocks";
import { invoke } from "@tauri-apps/api/core";

// jsdom doesn't come with a WebCrypto implementation
beforeAll(() => {
  Object.defineProperty(window, 'crypto', {
    value: {
      // @ts-ignore
      getRandomValues: (buffer) => {
        return randomFillSync(buffer);
      },
    },
  });
});


test("invoke", async () => {
  mockIPC((cmd, args) => {
    // simulated rust command called "add" that just adds two numbers
    if(cmd === "add") {
      return (args.a as number) + (args.b as number);
    }
  });

  // we can use the spying tools provided by vitest to track the mocked function
  const spy = vi.spyOn(window.__TAURI_INTERNALS__, "invoke");

  expect(invoke("add", { a: 12, b: 15 })).resolves.toBe(27);
  expect(spy).toHaveBeenCalled();
});
```

To mock IPC requests to a shell command run with `execute()` (plugin-shell v2), intercept `plugin:shell|execute` and return the `ChildProcess` result directly:

```javascript
mockIPC(async (cmd, args) => {
  if (cmd === 'plugin:shell|execute') {
    return {
      code: 0,
      signal: null,
      stdout: 'some data sent from the process',
      stderr: '',
    };
  }
});
```

#### Mocking events (since 2.7.0)

Partial support of the Event System to simulate events emitted by Rust code, via the `shouldMockEvents` option:

```javascript
import { mockIPC, clearMocks } from '@tauri-apps/api/mocks';
import { emit, listen } from '@tauri-apps/api/event';
import { afterEach, expect, test, vi } from 'vitest';

test('mocked event', () => {
  mockIPC(() => {}, { shouldMockEvents: true }); // enable event mocking

  const eventHandler = vi.fn();
  listen('test-event', eventHandler);

  emit('test-event', { foo: 'bar' });
  expect(eventHandler).toHaveBeenCalledWith({
    event: 'test-event',
    payload: { foo: 'bar' },
  });
});
```

`emitTo` and `emit_filter` are not supported yet.

### Windows

For window-specific code (e.g. a splash screen), `mockWindows()` creates fake window labels. The first string identifies the "current" window (the window your JavaScript believes itself in); all other strings are additional windows.

```javascript
import { beforeAll, expect, test } from 'vitest';
import { randomFillSync } from 'crypto';

import { mockWindows, mockIPC } from '@tauri-apps/api/mocks';

// jsdom doesn't come with a WebCrypto implementation
beforeAll(() => {
  Object.defineProperty(window, 'crypto', {
    value: {
      // @ts-ignore
      getRandomValues: (buffer) => {
        return randomFillSync(buffer);
      },
    },
  });
});

test('invoke', async () => {
  mockWindows('main', 'second', 'third');
  mockIPC((cmd) => {
    if (cmd === 'plugin:window|get_all_windows') return ['main', 'second', 'third'];
  });

  const { getCurrentWebviewWindow, getAllWebviewWindows } = await import('@tauri-apps/api/webviewWindow');

  expect(getCurrentWebviewWindow()).toHaveProperty('label', 'main');
  expect((await getAllWebviewWindows()).map((w) => w.label)).toEqual(['main', 'second', 'third']);
});
```

## Notes

- Fences of the first two examples changed from `javascript` to `typescript` because the snippets use TypeScript-only syntax (`as number`).
- Upstream shell example targets the v1 shell IPC (`args.message` / `onEventFn`); rewritten for plugin-shell v2 (`plugin:shell|execute`). Mocking `spawn()` (`plugin:shell|spawn` with a `Channel`) is not shown because it was not verified.
- Upstream Windows example imports `getCurrent` / `getAll` from `@tauri-apps/api/webviewWindow`; the module (2.12.4) exports `getCurrentWebviewWindow` / `getAllWebviewWindows` (async).
- In 2.12.4 `mockWindows()` ignores the additional labels and only sets current-window metadata; `getAllWebviewWindows()` invokes `plugin:window|get_all_windows`, so the example mocks it with `mockIPC()`.
- Remember to clear mocks after each test run to undo mock state changes between runs; see `clearMocks()` in the JS API reference.
- `mockWindows()` only fakes the existence of windows, not window properties. To simulate window properties, intercept the corresponding calls with `mockIPC()`.
- `mockIPC` fakes `invoke` under the mock runtime; no real webview or Rust backend runs. To mock the same commands in end-to-end tests, `@wdio/tauri-service` provides an equivalent `browser.tauri.mock()` (see WebDriver).

## Related

- [Tests](./tests-overview.md)
- [WebDriver](./webdriver-overview.md)
- JS API: mocks
- [Calling the Frontend from Rust](./calling-frontend.md)
