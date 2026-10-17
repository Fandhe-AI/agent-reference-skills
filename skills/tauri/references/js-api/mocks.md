---
source: https://v2.tauri.app/reference/javascript/api/namespacemocks/
---

# mocks

Test helpers that stand in for the Tauri backend. Importing other modules of this package in a plain Node/browser test environment fails, because there is no `window.__TAURI_INTERNALS__`; these functions install a fake one. Also accessible with `window.__TAURI__.mocks` when `app.withGlobalTauri` is `true`.

## Signature / Usage

```typescript
import { afterEach, expect, test } from 'vitest';
import { mockIPC, clearMocks } from '@tauri-apps/api/mocks';
import { invoke } from '@tauri-apps/api/core';

afterEach(() => {
  clearMocks();
});

test('greet', async () => {
  mockIPC((cmd, args) => {
    if (cmd === 'greet') {
      return `Hello, ${(args as { name: string }).name}!`;
    }
  });

  await expect(invoke('greet', { name: 'tauri' })).resolves.toBe('Hello, tauri!');
});
```

## Functions

| Function | Signature | Since |
| --- | --- | --- |
| mockIPC | `mockIPC(cb: (cmd: string, payload?: InvokeArgs) => unknown, options?: MockIPCOptions): void` | 1.0.0 |
| mockWindows | `mockWindows(current: string, ..._additionalWindows: string[]): void` | 1.0.0 |
| mockConvertFileSrc | `mockConvertFileSrc(osName: string): void` (`linux`, `macos` or `windows`) | 1.6.0 |
| clearMocks | `clearMocks(): void` | 1.0.0 |

## Options / Props

`interface MockIPCOptions` (since 2.7.0):

| Name | Type | Description |
| --- | --- | --- |
| shouldMockEvents | `boolean` | If true, `listen` and `emit` are mocked so event handling can be tested without a backend. This consumes any events emitted with the `plugin:event` prefix |

## Examples

Async callback:

```js
mockIPC((cmd, payload) => {
  if (cmd === "get_data") {
    return fetch("https://example.com/data.json").then((response) => response.json())
  }
});
```

Event mocking:

```js
import { expect, vi } from 'vitest';
import { mockIPC } from '@tauri-apps/api/mocks';
import { emit, listen } from '@tauri-apps/api/event';

mockIPC(() => {}, { shouldMockEvents: true }); // enable event mocking

const eventHandler = vi.fn();
listen('test-event', eventHandler);

emit('test-event', { foo: 'bar' });
expect(eventHandler).toHaveBeenCalledWith({
  event: 'test-event',
  payload: { foo: 'bar' }
});
```

Window presence:

```js
import { mockWindows } from "@tauri-apps/api/mocks";
import { getCurrentWindow } from "@tauri-apps/api/window";

mockWindows("main", "second", "third");
const win = getCurrentWindow();
win.label // "main"
```

## Notes

- `mockIPC` can be used when testing Tauri frontends or when running the frontend in Node.js during static site generation.
- `emitTo` is currently not supported by the `mockIPC` event mock.
- `mockWindows` only mocks the presence of windows (the first argument is the current window label); window properties such as width and height are mocked like regular IPC calls with `mockIPC`. In a non-Tauri context call it before using `@tauri-apps/api/window`.
- `mockConvertFileSrc("windows")` makes `convertFileSrc` return `http://<protocol>.localhost/<encoded path>`; other OS names return `<protocol>://localhost/<encoded path>`.
- Call `clearMocks` after each test when the runner reuses the same `window` object.
- Tauri (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/mocks.ts`.

## Related

- [core](./core.md)
- [event](./event.md)
- [window](./window.md)
