---
source: https://docs.expo.dev/router/reference/testing/
---

# Testing configuration for Expo Router

`expo-router/testing-library` is a set of testing utilities built on `@testing-library/react-native` that lets you create in-memory Expo Router apps pre-configured for testing. This guide covers SDK 58 and later (see the SDK 57 to 58 migration page for router test changes).

## Signature / Usage

```tsx
// app.test.tsx
import { renderRouter, screen } from 'expo-router/testing-library';
import { View } from 'react-native';

it('my-test', async () => {
  const MockComponent = jest.fn(() => <View />);

  await renderRouter(
    {
      index: MockComponent,
      'directory/a': MockComponent,
      '(group)/b': MockComponent,
    },
    {
      initialUrl: '/directory/a',
    }
  );

  expect(screen).toHavePathname('/directory/a');
});
```

`renderRouter` forms:

- `renderRouter(mock: Record<string, ReactComponent>, options: RenderOptions)` - inline file system. Keys are mock filesystem paths; do not use leading `./` or `/` and exclude file extensions.
- `renderRouter(mock: string[], options: RenderOptions)` - inline file system with `null` components (`{ default: () => null }`).
- `renderRouter(fixturePath: string, options: RenderOptions)` - path to a fixture directory, relative to the current test file.
- `renderRouter({ appDir: string, overrides: Record<string, ReactComponent>}, options: RenderOptions)` - fixture directory plus inline overrides.

```tsx
await renderRouter(['index', 'directory/a', '(group)/b'], {
  initialUrl: '/directory/a',
});

await renderRouter({
  appDir: './my-test-fixture',
  overrides: {
    'directory/(auth)/_layout': MockAuthLayout,
  },
});
```

Navigation helpers:

```tsx
import { renderRouter, screen, testRouter } from 'expo-router/testing-library';

it('navigates to the profile', async () => {
  await renderRouter(['index', 'profile']);
  await testRouter.push('/profile');

  expect(screen).toHavePathname('/profile');
});
```

## Options / Props

`renderRouter` accepts the same options as `render` plus:

| Name | Type | Description |
| --- | --- | --- |
| `initialUrl` | string | Sets an initial route for simulating deep-linking. |

Jest matchers added to `expect` for `screen`:

| Matcher | Description |
| --- | --- |
| `toHavePathname()` | Asserts the current pathname (uses `usePathname`), e.g. `expect(screen).toHavePathname('/my-router');` |
| `toHavePathnameWithParams()` | Asserts pathname including URL parameters, e.g. `expect(screen).toHavePathnameWithParams('/my-router?hello=world');` |
| `toHaveSegments()` | Asserts current segments (uses `useSegments`), e.g. `expect(screen).toHaveSegments(['[id]']);` |
| `useLocalSearchParams()` | Asserts local URL params, e.g. `expect(screen).useLocalSearchParams({ first: 'abc' });` |
| `useGlobalSearchParams()` | Asserts global URL params, e.g. `expect(screen).useGlobalSearchParams({ first: 'abc' });` |
| `toHaveRouterState()` | Advanced: asserts router state, e.g. `expect(screen).toHaveRouterState({ routes: [{ name: 'index', path: '/' }] });` |

## Notes

- Set up `jest-expo` per the Unit testing with Jest guide and `@testing-library/react-native` first. `expo-router/testing-library` requires `@testing-library/react-native` version 14 or newer.
- Do not put test files inside the **app** directory; everything there must be a route or layout file. Use `__tests__` or a separate directory.
- Await `renderRouter` and the `testRouter` methods `navigate`, `push`, `replace`, `back`, `setParams`, and `dismissAll` before asserting. `testRouter.canGoBack()` remains synchronous.
- Source: https://docs.expo.dev/router/reference/testing/ (unversioned guide, fetched 2026-10-17, modificationDate October 13, 2026).

## Related

- [Migrate Expo Router from SDK 57 to SDK 58](./migrate-sdk-57-to-58.md)
- [Router API](./router-api.md)
