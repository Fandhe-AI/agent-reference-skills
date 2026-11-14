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
- `renderRouter(fixturePath: string, options: RenderOptions)` - path to a fixture directory, relative to the directory where you run Jest (usually the project root).
- `renderRouter({ appDir: string, overrides: Record<string, ReactComponent>}, options: RenderOptions)` - fixture directory (`appDir`, relative to the directory where you run Jest) plus inline overrides.

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
| `toHaveSearchParams()` | Asserts the current route's URL params, e.g. `expect(screen).toHaveSearchParams({ first: 'abc' });` |
| `toHaveRouterState()` | Advanced: asserts router state, e.g. `expect(screen).toHaveRouterState({ routes: [{ name: 'index', path: '/' }] });` |

## Notes

- Set up `jest-expo` per the Unit testing with Jest guide and `@testing-library/react-native` first. `expo-router/testing-library` requires `@testing-library/react-native` version 14 or newer.
- Do not put test files inside the **app** directory; everything there must be a route or layout file. Use `__tests__` or a separate directory.
- Await `renderRouter` and the `testRouter` methods `navigate`, `push`, `replace`, `back`, `setParams`, and `dismissAll` before asserting. `testRouter.canGoBack()` remains synchronous.
- The previous official page listed these matchers as `useLocalSearchParams()` / `useGlobalSearchParams()`; the current page lists `toHaveSearchParams()` (asserting the `useGlobalSearchParams` value on the current `screen`). expo-router 58.0.23 (`build/testing-library/expect.js`) registers only `toHavePathname`, `toHavePathnameWithParams`, `toHaveSegments`, `toHaveSearchParams`, and `toHaveRouterState`; there is no separate global-params matcher.
- In SDK 57, `expo-router/testing-library` works only with `@testing-library/react-native` version 13.
- Source: https://docs.expo.dev/router/reference/testing/ (docs/pages/router/reference/testing.mdx at tag expo@58.0.25).

## Related

- [Migrate Expo Router from SDK 57 to SDK 58](./migrate-sdk-57-to-58.md)
- [Router API](./router-api.md)
