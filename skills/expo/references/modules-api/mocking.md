---
source: https://docs.expo.dev/modules/mocking/
---

# Mocking native calls in Expo modules

Bundle default Jest mocks with an Expo module so that unit tests (Jest with the `jest-expo` preset) run without native code.

## Signature / Usage

Create a file named after the native module in the module's **mocks** directory and export the mock implementation. `jest-expo` returns the exported functions for a matching `requireNativeModule` call during unit tests.

```ts
// ExpoClipboard.ts
export async function hasStringAsync(): Promise<boolean> {
  return false;
}
```

Automatic generation (requires SourceKitten; run in the directory with **expo-module.config.json**):

```sh
brew install sourcekitten
npx expo-modules-test-core generate-ts-mocks
```

Generated example:

```ts
// example-module/mocks/ExpoModuleName.ts
export type URL = any;

export function hello(): any {}

export async function setValueAsync(value: string): Promise<any> {}

export type ViewProps = {
  url: URL;
  onLoad: (event: any) => void;
};

export function View(props: ViewProps) {}
```

Basic test:

```js
import * as MyModule from '../MyModule';
import ExpoMyModule from '../ExpoMyModule';

describe('MyModule', () => {
  it('calls native module with correct parameters', async () => {
    await MyModule.doSomething('test-param');
    expect(ExpoMyModule.doSomething).toHaveBeenCalledWith('test-param');
  });
});
```

Hook test:

```js
import { renderHook } from '@testing-library/react-native';
import { useMyHook } from '../useMyHook';
import ExpoMyModule from '../ExpoMyModule';

jest.mock('../ExpoMyModule', () => ({
  startOperation: jest.fn().mockResolvedValue(),
  stopOperation: jest.fn().mockResolvedValue(),
}));

describe('useMyHook', () => {
  it('calls native methods on mount and unmount', async () => {
    const hook = await renderHook(useMyHook);
    expect(ExpoMyModule.startOperation).toHaveBeenCalledTimes(1);

    await hook.unmount();
    expect(ExpoMyModule.stopOperation).toHaveBeenCalledTimes(1);
  });
});
```

## Notes

- The generator works from the Swift implementation, for TypeScript (`generate-ts-mocks`) or JavaScript (`generate-js-mocks`). Android-only (Kotlin-only) methods are not generated; add them manually in **mocks**.
- Generated **ExpoModuleName.ts** contains a mock for each native method and view.
- Best practices: reset mocks in `beforeEach` / `afterEach`; test edge cases where native functions throw or return unexpected values; use descriptive test names; group with `describe`.
- Expo SDK ships default mocks for its own community packages; any JS can also be mocked with Jest mock functions.
- Source modificationDate: September 25, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [Module API Reference](./module-api.md)
- [expo-module.config.json](./module-config.md)
