---
source: https://docs.expo.dev/router/migrate/from-react-navigation/
---

# Migrate from React Navigation

How to migrate a project using React Navigation to Expo Router. This guide targets SDK 56 and later: in SDK 56, Expo Router stopped accepting application-code imports from `@react-navigation/*`; they now come from `expo-router/*` entry points (the samples use the SDK 56+ import paths). Upgrading an existing Expo Router app from SDK 55 or earlier needs the SDK 55 to 56 migration guide.

## Signature / Usage

Replace navigators with directories. Rename the "main" route (for example **Home**) to **index** so it matches `/`, use lowercase names, and move screens into the app directory:

```text
src
  app
    _layout.tsx
    (home)
      _layout.tsx
      index.tsx
      feed.tsx
    profile.tsx
    settings.tsx
```

```tsx
// src/app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(home)"
        options={
          {
            title: 'Home Screen',
          }
        }
      />
    </Stack>
  );
}
```

```tsx
// src/app/(home)/_layout.tsx
import { Tabs } from 'expo-router/js-tabs';

export default function HomeLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="feed" />
    </Tabs>
  );
}
```

Configure **tsconfig.json** and **app.json**:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/assets/*": ["./assets/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

```json
{
  "expo": {
    "plugins": ["expo-router"]
  }
}
```

Link: Expo's `Link` uses `href` instead of `to`; use `asChild` instead of a custom `useLinkProps` Link:

```jsx
// React Navigation
<Link to="Settings" />

// Expo Router
<Link href="/settings" />
```

Params to nested screens use a qualified href:

```js
// React Navigation
navigation.navigate('Account', {
  screen: 'Settings',
  params: { user: 'jane' },
});

// Expo Router
router.push({ pathname: '/account/settings', params: { user: 'jane' } });
```

Navigate to the initial route (replacement for `resetRoot`); `router.replace('/')` replaces only the current entry and does not clear earlier history. To reset the whole navigation state use `CommonActions.reset` with complete state (see Notes):

```jsx
import { Text } from 'react-native';
import { useRouter } from 'expo-router';

function Example() {
  const router = useRouter();

  return (
    <Text
      onPress={() => {
        // Go to the initial route of the application.
        router.replace('/');
      }}>
      Reset App
    </Text>
  );
}
```

Theme (the container is managed by Expo Router, so use `ThemeProvider` directly at any layer; read it with `useTheme`):

```tsx
import { ThemeProvider, DarkTheme, DefaultTheme, useTheme } from 'expo-router/react-navigation';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Slot />
    </ThemeProvider>
  );
}
```

Reset navigation state with `CommonActions.reset` (SDK 58 and later require `stale: false` in the reset state):

```tsx
import { Button } from 'react-native'
import { useNavigation } from 'expo-router'
import { CommonActions } from 'expo-router/react-navigation'

export default function Screen() {
  const navigation = useNavigation();

  const handleResetAction = () => {
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{key: "(tabs)", name: "(tabs)"}],
      stale: false
    }))
  }

  return (
    <>
      {/* ...rest of the code */}
      <Button title='Reset' onPress={handleResetAction} />
    </>
  );
}
```

Custom navigators (stable APIs in SDK 58 and later; in SDK 56 and 57 use `unstable_createStandardRouterNavigator` and `unstable_integrateWithRouter`):

```tsx
import { createStandardRouterNavigator, TabRouter } from 'expo-router';
import { CustomTabsContent } from './CustomTabsContent';

export const CustomTabs = createStandardRouterNavigator(CustomTabsContent, TabRouter);
```

Re-exported React Navigation Elements (SDK 56+, no separate package):

```tsx
import { Header, HeaderBackButton } from 'expo-router/react-navigation';
```

## Options / Props

`NavigationContainer` replacements:

| React Navigation | Expo Router |
| --- | --- |
| `ref` | Use `useNavigationContainerRef()`. Do not access the container ref directly. |
| `resetRoot` | `router.replace('/')` navigates to the initial route but does not clear history; for a full reset dispatch `CommonActions.reset` with complete state (`stale: false`, SDK 58+). |
| `getRootState` | `useRootNavigationState()`. |
| `getCurrentRoute` | `usePathname()` or `useSegments()` (any route is representable as a string). |
| `getCurrentOptions` | `useLocalSearchParams()`. |
| `addListener` `state` | `usePathname()` / `useSegments()` with `useEffect`. |
| `addListener` `options` | `useLocalSearchParams()` with `useEffect`. |
| `initialState` | Rehydrate from a route string; use redirects / shared routes. Prefer deep linking. |
| `onStateChange` | `usePathname()`, `useSegments()`, `useGlobalSearchParams()` with `useEffect`; for analytics follow the screen tracking guide. |
| `onReady` | Navigation is always ready; screen tracking guide for analytics, Splash Screen feature for splash. |
| `onUnhandledAction` | Actions are always handled; use dynamic routes and 404 screens. |
| `linking` | Automatically constructed from the **app** directory. |
| `fallback` | Handled automatically by Expo Router (Splash Screen reference). |
| `theme` | `ThemeProvider` from `expo-router/react-navigation`. |
| `children` | Populated from files in **app** and the open URL. |
| `independent` | Not supported; the router manages the single container. |
| `documentTitle` | Use the `Head` component for the page title. |
| screen props `{ navigation, route }` | `useRouter` replaces `navigation`; `useLocalSearchParams` replaces `route`; `useNavigation` for `navigation.navigate`. |

## Notes

- The official resetRoot example uses router.replace('/') only; the note that it does not clear history and the pointer to CommonActions.reset (per the SDK 57 to 58 migration table) were added here.
- Pitch: automatic deep linking, type safety, deferred bundling, static rendering on web. Anti-pitch: a custom `getPathFromState` or `getStateFromPath` may not fit Expo Router (fine if used to support shared routes, which Expo Router supports built in).
- Recommended before migrating: split screen components into individual files; convert to TypeScript; convert relative imports to typed aliases (for example `@/components/button`); migrate away from `resetRoot`; rename the initial route to `index`; use kebab-case lowercase filenames.
- Search parameters can only serialize top-level values such as `number`, `boolean`, `string`. React Navigation params may contain Functions, Objects, Maps; restructure so a function is accessed from the destination screen (for example push from the "followers" screen via the router).
- Do not `return null` from the root component while assets and fonts load. React Native 0.72 (SDK 49) swaps the default font when a custom font loads. On web, returning `null` from the root makes static rendering skip all children.
- Expo Router adds `react-native-safe-area-context` support automatically but does not add `react-native-gesture-handler` (as of v3); add it yourself for Gesture Handler or the Drawer layout, and avoid it on web.
- The `NavigationContainer` is completely managed by Expo Router.
- The `Text` / `Button` imports from `react-native` are added here; the source snippets omit them.
- The official reset sample passes only `routes`; `index` and `stale: false` were added here because SDK 58 requires `stale: false` for `CommonActions.reset` (see the SDK 57 to 58 migration).
- The official guide shows `<Tabs />` with no children; since SDK 58, JavaScript tabs show only screens declared in the layout (Expo Router SDK 57 to 58 migration guide), so the example declares `index` and `feed` explicitly.
- With groups or shared routes, navigate to specific tabs by the fully qualified route name, for example `/(home)/settings`.
- Splash screen: import `SplashScreen` from `expo-router` instead of `expo-splash-screen`; Expo Router hides it after navigation mounts and when an unexpected error is caught.
- Initial routes for deep linking and server navigation: use layout settings (Router settings) instead of `initialRouteName` in the linking configuration.
- Expo Router distance: Expo Router is file-based and built on React Navigation; its `Link`, `useRouter` and `Stack` differ from the same-named APIs in react-router and tanstack-router.
- Source: https://docs.expo.dev/router/migrate/from-react-navigation/ (unversioned guide, fetched 2026-10-17, modificationDate September 17, 2026).

## Related

- [Migrate Expo Router from SDK 57 to SDK 58](./migrate-sdk-57-to-58.md)
- [Router API](./router-api.md)
- [Redirects](./redirects.md)
- [Typed routes](./typed-routes.md)
