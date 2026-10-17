---
source: https://docs.expo.dev/router/migrate/sdk-57-to-58/
---

# Migrate Expo Router from SDK 57 to SDK 58

SDK 58 changes how Expo Router builds navigation state and integrates with navigators. Apps that use `Stack`, `Link`, and `useRouter` may need a few changes. Apps that import from `expo-router/react-navigation`, access navigation state, or implement custom routers and navigators require closer review. The complete list of SDK 58 changes is in the `expo-router` changelog (the 58.0.0 entry, 2026-09-10).

## Signature / Usage

Migrate nested navigation to complete hrefs and `useRouter`:

```diff
- import { useNavigation } from 'expo-router';
+ import { useRouter } from 'expo-router';
- const navigation = useNavigation();
+ const router = useRouter();
- navigation.navigate('(tabs)', {
- screen: 'feed',
+ router.push({
+ pathname: '/(tabs)/feed/[id]',
  params: { id: '42' },
  });
```

Move `initialRouteName` to `unstable_settings.anchor`:

```diff
import { Stack } from 'expo-router';
+ export const unstable_settings = {
+ anchor: 'index',
+ };
  export default function FeedLayout() {
- return <Stack initialRouteName="index" />;
+ return <Stack />;
  }
```

## Common migrations

### Web safe-area, server rendering, metadata

- Replace web spacing based on `SafeAreaView` or `useSafeAreaInsets()` with CSS (see the safe-area guide's web instructions).
- In SDK 58, `web.output: "server"` renders HTML pages on each request instead of prerendering during export. To keep the SDK 57 behavior, set `web.output` to `"static"` and enable `apiRoutes: true` in the `expo-router` config plugin (this still requires a deployed server):

```json
{
  "expo": {
    "web": {
      "output": "static"
    },
    "plugins": [["expo-router", { "apiRoutes": true }]]
  }
}
```

- With `web.output: "static"` without React Server Components, SDK 58 uses the streaming renderer. Tags rendered through `expo-router/head` are no longer included in the initial static HTML (`Head` still updates metadata after JavaScript loads). Move metadata to a `generateMetadata()` export in each route:

```diff
- import Head from 'expo-router/head';
+ import type { Metadata } from 'expo-router/server';
  import { Text } from 'react-native';
+ export function generateMetadata(): Metadata {
+ return {
+ title: 'About',
+ description: 'About our app',
+ };
+ }
  export default function About() {
- return (
- <>
- <Head>
- <title>About</title>
- <meta name="description" content="About our app" />
- </Head>
- <Text>About</Text>
- </>
- );
+ return <Text>About</Text>;
  }
```

`generateMetadata()` can be asynchronous. For static rendering, its first argument is `undefined` and its second contains the route parameters (also in development). Server rendering with `web.output: "server"` continues to provide the incoming request. Metadata is resolved from the matched route, not its layouts: move shared layout `Head` metadata into each route's `generateMetadata()` or add shared tags in **src/app/+html.tsx**. Move any `<html>` / `<body>` attributes previously set through `Head` onto those elements in the Root HTML component.

### Custom Root HTML components

If the app uses `web.output: "static"` or `"server"` and has **src/app/+html.tsx**, call `useServerDocumentContext()` from `expo-router/html`. Spread `htmlAttributes` and `bodyAttributes` onto their elements, render `headNodes` inside `<head>` and `bodyNodes` after `children` inside `<body>`. In SDK 58, `bodyNodes` includes the JavaScript bundles required for hydration; omitting it prevents the app from becoming interactive. The root HTML component also receives `pathname` and `params` props; use them instead of navigation hooks. Navigation hooks (`usePathname`, `useSegments`, `useLocalSearchParams`, `useRouter`) no longer work in **app/+html.tsx**; use them in the root layout **app/_layout.tsx**.

### Remove deprecated server flags

Remove these `expo-router` config plugin options. In SDK 58 they have no effect and emit a deprecation warning whenever present, even when `false`:

| Deprecated option | SDK 58 behavior |
| --- | --- |
| `unstable_useServerRendering` | Server rendering runs when `web.output` is `"server"`. |
| `unstable_useServerDataLoaders` | Data loaders are available with `web.output: "static"` or `"server"` without an opt-in. |
| `unstable_useServerMiddleware` | Server middleware no longer requires an opt-in. |

### Async route defaults

In SDK 58, async routes are enabled by default on web in development and production. Native defaults are unchanged (native production builds load routes synchronously). Async routes use the default loading fallback instead of custom `SuspenseFallback` exports. To keep custom fallbacks on web:

```json
{
  "expo": {
    "plugins": [["expo-router", { "asyncRoutes": { "web": false } }]]
  }
}
```

Existing explicit `asyncRoutes` settings take precedence over the defaults. After upgrading or changing `asyncRoutes`, clear the Metro cache with `expo start --clear` or `expo export --clear`.

### Update Router tests

`expo-router/testing-library` requires `@testing-library/react-native` version 14 or later. `renderRouter` now returns a promise; `await` it and the `testRouter` methods `navigate`, `push`, `replace`, `back`, `setParams`, `dismissAll`:

```diff
import { renderRouter, screen, testRouter } from 'expo-router/testing-library';
- it('navigates to the profile', () => {
- renderRouter(['index', 'profile']);
+ it('navigates to the profile', async () => {
+ await renderRouter(['index', 'profile']);
- testRouter.push('/profile');
+ await testRouter.push('/profile');
  expect(screen).toHavePathname('/profile');
  });
```

Replace `renderRouterAsync` with `renderRouter` (keep `await`). Replace the removed `RenderRouterAsyncOptions` type with `RenderRouterOptions`. `testRouter.canGoBack()` remains synchronous.

### Prefer `useRouter` in components

Prefer the router from `useRouter()` over `useNavigation().navigate()` or the module-level `router` for href-based navigation from a component; the hook is bound to the Expo Router root that rendered the component. The module-level `router` is still available but throws before the first router render and cannot distinguish multiple router roots. Keep `useNavigation` for navigator-specific APIs (events, options, action dispatching). `useRouter()` includes `push`, `navigate`, `replace`, `back`, `dismiss`, `dismissTo`, `dismissAll`, `canGoBack`, `canDismiss`, `setParams`, `prefetch`.

### Navigate with complete hrefs

In SDK 57, React Navigation could interpret `screen`, `params`, and `initial` as instructions for building nested state. In SDK 58 they are ordinary user parameters. Ancestor route params are also no longer copied into descendant routes during imperative navigation; include the value in the destination href.

### `initialRouteName` to `unstable_settings`

The `initialRouteName` navigator prop is removed. Export `unstable_settings.anchor` from the stack's layout to add a back destination when deep linking. Do not use `anchor` to choose the app's initial screen (the launch URL does; for `/`, use an **index.tsx** route). A stack nested in tabs reads the setting from that stack's own **_layout.tsx**. During imperative navigation pass `{ withAnchor: true }` when the anchor route should be inserted below the destination.

### Replace `redirect` and `initialParams`

Layout `Screen` components no longer accept `redirect` or `initialParams`. Render a `Redirect` from the route file; for access control use a protected route with `redirectTo`:

```tsx
import { Stack } from 'expo-router';

import { useAuth } from '../context/auth';

export default function RootLayout() {
  const isSignedIn = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={isSignedIn} redirectTo="/sign-in">
        <Stack.Screen name="account" />
      </Stack.Protected>
      <Stack.Screen name="sign-in" />
    </Stack>
  );
}
```

Replace `initialParams` with defaults where the screen reads its params:

```tsx
const { sort = 'latest' } = useLocalSearchParams<{ sort?: string }>();
```

### Declare tabs and drawer screens

JavaScript tabs, top tabs, drawer, headless tabs, and native tabs now show only screens declared in the layout:

```tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="feed" />
      <Tabs.Screen name="hidden" options={{ href: null }} />
    </Tabs>
  );
}
```

### Protected routes

Protected routes remain registered in their navigator in SDK 58. A route whose guard fails renders a redirect instead of being removed from the route tree. Set `redirectTo` on `Protected` only to control the destination; otherwise Expo Router uses the navigator's accessible anchor or initial route, then its first accessible route.

### Web modals, `freezeOnBlur`

- The experimental web modal implementation is removed; see the custom web modals guide. Custom implementations can import `NativeStackView` from `expo-router`.
- `freezeOnBlur` has no effect in SDK 58. To preserve state while cleaning up effects after a screen loses focus, set `activityEnabled` on the navigator or a declared screen. A value of `1` hides the screen content as soon as another screen is focused:

```tsx
<Stack>
  {/* Uses the stack default and hides content when two screens are above it. */}
  <Stack.Screen name="feed" activityEnabled />
  {/* Hides content as soon as another screen is focused. */}
  <Stack.Screen name="account" activityEnabled={1} />
</Stack>
```

When `activityEnabled` is `true`, a stack hides a screen's content once two screens sit above it; tabs and drawers hide it as soon as it loses focus. Stack navigators and screens also accept a positive number to override the threshold. To hide only part of a screen, wrap that content in `NavigationAwareActivity` (its `hideWhenNestedAtLevel` prop defaults to `2`).

### Optional native dependencies

`expo-symbols` and `@expo/ui` become optional peer dependencies of Expo Router. Install only what your APIs use, then rebuild development builds:

```sh
# Android md icons in native tabs
npx expo install expo-symbols
# Android Stack.Toolbar
npx expo install @expo/ui
```

### Prevent a screen from being removed

`usePreventRemove` from `expo-router` blocks removal while a screen has unsaved data. To continue the exact blocked action, set the prevention condition to `false` and call the callback's `repeat`:

```tsx
usePreventRemove(hasUnsavedChanges, ({ repeat }) => {
  Alert.alert('Discard changes?', 'Your changes have not been saved.', [
    { text: 'Keep editing', style: 'cancel' },
    {
      text: 'Discard',
      style: 'destructive',
      onPress: () => {
        setHasUnsavedChanges(false);
        repeat();
      },
    },
  ]);
});
```

To navigate somewhere else, keep the `disablePrevention` function returned by `usePreventRemove`: set the condition to `false`, call `disablePrevention()`, then navigate. Do not dispatch from a raw `removePrevented` listener while prevention is active. Always update the boolean passed to `usePreventRemove` when calling `disablePrevention()`; if it stays `true` the hook warns and does not re-enable prevention until the boolean changes.

### iOS header appearance

In SDK 58, `Stack` headers on iOS 26 and later use the system bar appearance by default (transparent with Liquid Glass, content under the header). The default `headerTransparent` is `{ ios: true, android: false, web: false }`; on iOS it applies only when Liquid Glass is available and the screen does not set `headerStyle.backgroundColor` or `headerBackground`. Earlier iOS versions and apps with Liquid Glass off keep the opaque header; Android is unchanged. If content is hidden under the header, add `contentInsetAdjustmentBehavior="automatic"` to the root `ScrollView`, `FlatList`, or `SectionList`; for a screen without a scroll view use `SafeAreaView`; to keep an opaque header set `headerTransparent: false`. Headers now use system fonts instead of theme fonts on iOS 26+; set `fontFamily` in `headerTitleStyle`, `headerBackTitleStyle`, or `headerLargeTitleStyle` to keep a custom font. To restore the previous appearance for all screens:

```tsx
import { enableLegacyHeaderAppearance, Stack } from 'expo-router';

enableLegacyHeaderAppearance();

export default function RootLayout() {
  return <Stack />;
}
```

`enableLegacyHeaderAppearance()` is deprecated; in a future release the native iOS header appearance becomes the only behavior and the function will be removed.

## Advanced migrations

### `navigation.dispatch`

`navigation.dispatch` and helper actions are queued until after the current React commit. Use `navigation.dispatchSync(action)` only when an integration must apply an action immediately. Dispatch functions are no longer supported; read state first, compute an action, dispatch the object:

```diff
- navigation.dispatch(state =>
- CommonActions.reset({
- ...state,
- index: 0,
- routes: [state.routes[0]],
- })
- );
+ const state = navigation.getState();
+ const action = CommonActions.reset({
+ ...state,
+ index: 0,
+ routes: [state.routes[0]],
+ });
+ navigation.dispatch(action);
```

### `navigationKey`, `beforeRemove`, `__unsafe_action__`, `useNavigation`

- Layout `Screen` and `Group` no longer accept `navigationKey`; there is no direct replacement.
- `beforeRemove` and `__unsafe_action__` events are removed. Use `removed` (fires after the route unmounts; defer listener cleanup) and `removePrevented`:

```tsx
useEffect(() => {
  const unsubscribe = navigation.addListener('removed', event => {
    logRemoval(event.data.action);
  });

  return () => queueMicrotask(unsubscribe);
}, [navigation]);
```

- `useNavigation` throws when called outside a navigator (including components rendered by `ExpoRoot`'s `wrapper` prop).

### Navigation state

Navigation state is an implementation detail; prefer `usePathname`, `useSegments`, `useGlobalSearchParams`.

```ts
const history = state.history ?? [];

if (state.type === 'tab') {
  // Handle tab-specific state.
}

const activeRoutes = state.routes.slice(0, state.index + 1);
const preloadedRoutes = state.routes.slice(state.index + 1);

for (const routeName of state.routeNames) {
  const route = state.routes.find(route => route.name === routeName);
  // `route` is undefined when the lazy route has not been created.
}
```

- The navigation state `type` is optional for custom routers; `history` is optional in tab and drawer state.
- `StackNavigationState.preloadedRoutes` is removed; preloaded routes are appended to `state.routes` after the focused index.
- `TabNavigationState.preloadedRouteKeys` is removed; preloaded tabs are unfocused entries with `isPreloaded: true`, lazy routes may be absent. Iterate `state.routeNames` for declared order.
- `DrawerNavigationState.default` is removed; use `useDrawerStatus` from `expo-router/drawer`. `getDrawerStatusFromState` is deprecated and requires the router's default status as its second argument.
- Persisted initial state must be complete: every nested state needs a state key, route keys, `routeKeySeq`, `routeNames`, `index`, and `stale: false`; Expo Router throws on incomplete persisted state. `CommonActions.reset` also requires `stale: false`, but generates omitted route keys and fills an omitted `routeKeySeq`.

### Custom routers

Create custom routers by extending `StackRouter` or `TabRouter` with `extendRouter` or `extendRouterActions`.

| SDK 57 API | SDK 58 migration |
| --- | --- |
| `getInitialState` | Remove it. Expo Router builds initial state. |
| `getRehydratedState` | Remove it. Persisted data must provide complete state. |
| `getStateForRouteNamesChange` | Inherit the base behavior, or handle `ROUTE_NAMES_CHANGED` in the extension. |
| `routeParamList` | Remove it from `RouterConfigOptions`. Put parameter defaults in route code. |
| `RouterActionOptions` | Use `RouterConfigOptions` in `getStateForAction`. |
| Other router members | Inherit them from the base router unless the extension changes the behavior. |

`getStateForAction` now returns the next state with the affected route key; return `RouterActionHandling.Unhandled` when the router cannot handle an action (returning `null` is deprecated). Replace `null` checks with `isActionHandled`:

```diff
const result = baseRouter.getStateForAction(state, action);
- if (result === null) {
+ if (!isActionHandled(result)) {
  return result;
  }
```

```ts
import {
  attachRouteState,
  extendRouter,
  RouterActionHandling,
  StackRouter,
  type CommonNavigationAction,
  type StackActionType,
} from 'expo-router';

type CustomAction = {
  type: 'CUSTOM-ACTION';
  payload: { name: string; params?: object };
};

const CustomStackRouter = extendRouter(StackRouter, ({ nextKey }) => ({
  getStateForAction(state, action: CommonNavigationAction | StackActionType | CustomAction) {
    if (action.type === 'CUSTOM-ACTION') {
      if (!state.routeNames.includes(action.payload.name)) {
        return RouterActionHandling.Unhandled;
      }

      const route = attachRouteState(
        {
          key: nextKey(action.payload.name),
          name: action.payload.name,
          params: action.payload.params,
        },
        action
      );
      const activeRoutes = state.routes.slice(0, state.index + 1);
      const preloadedRoutes = state.routes.slice(state.index + 1);

      return {
        state: {
          ...state,
          index: activeRoutes.length,
          routes: [...activeRoutes, route, ...preloadedRoutes],
        },
        affectedRouteKey: route.key,
      };
    }

    return RouterActionHandling.Delegate;
  },
}));
```

`extendRouter` receives the base router and a `nextKey` function (deterministic route keys; the wrapper writes the updated `routeKeySeq`). Use `extendRouterActions` when only `getStateForAction` needs customization; returning `null` or `undefined` instead of a `RouterActionHandling` value is deprecated and warns in development. `extendRouter` inherits the base router's `type`; pass a different type in the wrapper's options if the state requires it.

### Custom navigators

For new custom integrations use `createStandardRouterNavigator` (app) or `integrateWithRouter` (reusable library); these use the `standard-navigation` contract.

```diff
- import { withLayoutContext } from 'expo-router';
- import { createNavigator } from './navigator';
+ import { createStandardRouterNavigator, TabRouter } from 'expo-router';
+ import { TabNavigatorContent } from './navigator';
- export const Tabs = withLayoutContext(createNavigator().Navigator);
+ export const Tabs = createStandardRouterNavigator(TabNavigatorContent, TabRouter);
```

`withLayoutContext` remains supported for existing React Navigation navigators; remove its former third `useOnlyUserDefinedScreens` argument. Filesystem routes remain registered; use descriptor `routeSource` to distinguish layout-declared from filesystem routes. The `createStackNavigator` export is removed from `expo-router/js-stack` (`createNativeStackNavigator` from `expo-router/native-stack` remains). `createProps` helpers for `integrateWithRouter`:

| Navigator | `createProps` helper |
| --- | --- |
| Custom stack | `createBaseStackProps` |
| Expo Router JavaScript stack | `createJSStackProps` |
| Expo Router native stack | `createNativeStackProps` |
| Custom tab | `createBaseTabProps` |
| Expo Router JavaScript tabs | `createJSTabsProps` |
| Expo Router JavaScript top tabs | `createJSTopTabsProps` |
| Expo Router native tabs | `createNativeTabsProps` |

Import base and native stack helpers from `expo-router`; navigator-specific helpers from `expo-router/js-stack`, `expo-router/js-tabs`, `expo-router/js-top-tabs`, or `expo-router/native-tabs`. The `key` on `descriptor.route` can be `undefined` for a declared route that does not yet have a live state route.

### Removed `expo-router/react-navigation` exports

| Removed API | Replacement |
| --- | --- |
| `UNSTABLE_UnhandledLinkingContext` | No app-level replacement. Expo Router owns unhandled link processing. |
| `BaseNavigationContainer`, `NavigationContainer` | Let Expo Router or `ExpoRoot` own the navigation container. |
| Root `options` event, `DocumentTitleOptions`, `documentTitle` | Use Expo Router `Head` or a `<title>` element for web metadata. |
| `onStateChange` on container props | Prefer Expo Router state hooks, or listen for the navigation ref's `state` event. |
| `NavigationIndependentTree`, `useNavigationIndependentTree` | Use `NavigationContainer` from `@react-navigation/native` for an isolated embedded tree. |
| React Navigation `Link`, `LinkProps`, `useLinkProps` | Use `Link` and `LinkProps` from `expo-router` with an `href`. |
| `navigateDeprecated`, `navigationInChildEnabled` | Navigate to a complete href with `useRouter`. |
| `NavigatorScreenParams`, `getActionFromState`, `LinkingOptions.getActionFromState` | Use complete hrefs and let Expo Router resolve navigation state. |
| `resetRoot` on navigation container refs | Use `router.replace` or dispatch `CommonActions.reset` with complete state. |
| `beforeRemove`, `__unsafe_action__` | Use `usePreventRemove`, `removePrevented`, and `removed`. |
| `PreventRemoveContext`, `usePreventRemoveContext`, `PreventRemoveProvider` | Use `usePreventRemove`. Expo Router owns the provider. |
| `Router.getInitialState`, `Router.getRehydratedState` | Let Expo Router build initial state; return complete state from custom routers. |
| `Router.getStateForRouteNamesChange` | Handle `ROUTE_NAMES_CHANGED` in `getStateForAction`. |
| `RouterActionOptions`, `RouterConfigOptions.routeParamList` | Use `RouterConfigOptions` without `routeParamList`. |
| `DrawerNavigationState.default` | Use `useDrawerStatus`, or pass a default status to the deprecated `getDrawerStatusFromState`. |
| Static navigation APIs and types | Use Expo Router file routes and layouts. |
| `LinkingOptions.enabled` | Remove the option. Expo Router owns linking. |
| `UNSTABLE_routeNamesChangeBehavior` | Use protected route redirects and explicit href navigation. |
| `useOnlyUserDefinedScreens` | Remove the option. All filesystem routes remain registered. |

## Notes

- Expo Router tests: see the Testing page for SDK 58 helpers.
- Original page lists a pull request number per removed API; omitted here.
- Source: https://docs.expo.dev/router/migrate/sdk-57-to-58/ (unversioned guide, fetched 2026-10-17, modificationDate October 15, 2026).

## Related

- [Testing configuration for Expo Router](./testing.md)
- [Error handling and loading states](./error-handling.md)
- [Migrate from React Navigation](./migrate-from-react-navigation.md)
- [Router API](./router-api.md)
