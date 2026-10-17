---
source: https://docs.expo.dev/versions/v58.0.0/sdk/router/
---

# Router

`expo-router` is a file-based routing library for React Native and web apps. It manages navigation through a file-based routing system and provides native navigation components.

## Signature / Usage

```js
import { useRouter, Tabs, Navigator, Slot } from 'expo-router';
```

Config plugin in app config:

```json
{
  "expo": {
    "plugins": ["expo-router"]
  }
}
```

Imperative navigation:

```tsx
import { useRouter } from 'expo-router';
import { Text } from 'react-native';

export default function Route() {
 const router = useRouter();

 return (
  <Text onPress={() => router.push('/home')}>Go Home</Text>
 );
}
```

## Options / Props

### Config plugin properties

| Name | Default | Description |
| --- | --- | --- |
| `root` | `"app"` | Changes the routes directory from `app` to another value. Avoid using this property unless you have a specific need. |
| `origin` | `undefined` | Production origin URL where assets in the public folder are hosted. The fetch function is polyfilled to support relative requests from this origin in production. The development origin is inferred using the Expo CLI development server. |
| `headOrigin` | `undefined` | A more specific origin URL used in the `expo-router/head` module for iOS handoff. Defaults to `origin`. |
| `asyncRoutes` | `{ web: true }` | Enable async routes (lazy loading). Stable and enabled by default on web in SDK 58 and later. Experimental and disabled by default on native. Can be an `AsyncRouteOption` or an object with platform-specific `AsyncRouteOption` values (`{ android, ios, web, default }`). Explicit platform values take precedence over `default`. Production async routes are web-only. |
| `platformRoutes` | `true` | Enable or disable platform-specific routes (for example, `index.android.tsx` and `index.ios.tsx`). |
| `sitemap` | `true` | Enable or disable the automatically generated sitemap at `/_sitemap`. |
| `partialRouteTypes` | `true` | Enable partial typed routes generation. This allows TypeScript to provide type checking for routes without requiring all routes to be statically known. |
| `redirects` | `undefined` | An array of static redirect rules. Each rule is a `RedirectConfig` with `source`, `destination`, and optionally `permanent` (defaults to `false`) and `methods` (HTTP methods to redirect). |
| `rewrites` | `undefined` | An array of static rewrite rules. Each rule is a `RewriteConfig` with `source`, `destination`, and optionally `methods` (HTTP methods to rewrite). |
| `headers` | `undefined` | A list of headers that are set on every route response from the server. The value can be a string or an array of strings. |
| `pageHeaders` | `undefined` | An array of header rules that are set on a specific page's response from the server. Each rule is a `PageHeadersConfig` with `source` and `headers`. Rules match HTML page paths and do not apply to API routes. Later matching rules override earlier rules. |
| `disableSynchronousScreensUpdates` | `false` | Disable synchronous layout updates for native screens. This can help with performance in some cases. |
| `unstable_useServerMiddleware` | `false` | Deprecated. No longer required as of SDK 58 and has no effect. Remove this option from your app config. |
| `unstable_useServerDataLoaders` | `false` | Deprecated. No longer required as of SDK 58 and has no effect. Remove this option from your app config. |
| `unstable_useServerRendering` | `false` | Deprecated. No longer required as of SDK 58 and has no effect. Remove this option from your app config. |
| `apiRoutes` | Depends on `web.output` | Enable API routes with static or server output. Defaults to `true` for server output and `false` for static output. |

### Components

All components below list supported platforms Android, iOS, tvOS, Web.

| Name | Description |
| --- | --- |
| `Badge` | Props are `BadgeProps`; inherits `NativeTabsTriggerBadgeProps` and `StackToolbarBadgeProps`. |
| `ErrorBoundary` | Props passed to a page's `ErrorBoundary` export: `error` (`Error`, the error that was thrown) and `retry` (`() => Promise<void>`, re-renders the route component by clearing the `error` state). |
| `ExperimentalStack` | Renders the new `react-native-screens/experimental` native stack. Sibling to `Stack`. Native-only; on web it falls back to the standard `Stack`. Opt-in per navigator: replace `<Stack />` with `<ExperimentalStack />` in the specific layout you want to migrate. Sub-components: `ExperimentalStack.Screen`, `ExperimentalStack.Screen.BackButton` (deprecated: use `Stack.Title` instead), `ExperimentalStack.Screen.Title`. |
| `Icon` | Props are `IconProps`; inherits `NativeTabsTriggerIconProps` and `StackToolbarIconProps`. |
| `Label` | Props are `LabelProps`; inherits `NativeTabsTriggerLabelProps` and `StackToolbarLabelProps`. |
| `LocaleProvider` | Props are `LocaleProviderProps` (`direction`: `LocaleDirection`, `'ltr'` or `'rtl'`). |
| `NativeStackView` | Native stack view component. |
| `ScrollViewStyleReset` | Root style-reset for full-screen React Native web apps with a root `<ScrollView />`, to ensure native parity. |
| `Sitemap` | Renders the route sitemap. |
| `Slot` | Renders the currently selected content. Two implementations: used inside a `_layout` as the `Navigator`, and used inside a `Navigator` as the content. |
| `SuspenseFallback` | Props passed to a route's `SuspenseFallback` export: `route` (`string`, the route module's `contextKey`, for example `./index.tsx`) and `params` (`Record<string, string \| string[]>`, the route's URL parameters). |
| `ThemeProvider` | Provides a navigation `Theme`. |
| `VectorIcon` | Helper component for loading vector icons. Props: `family` (object with `getImageSource(name, size, color)`) and `name`. Prefer the `md` and `sf` props on `Icon`; use `VectorIcon` only to load a specific icon from a vector icon family. |

`VectorIcon` example:

```tsx
import { Icon, VectorIcon } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

<Icon src={<VectorIcon family={MaterialCommunityIcons} name="home" />} />
```

### Constants

| Name | Type | Description |
| --- | --- | --- |
| `DarkTheme` | `Theme` | Dark navigation theme. |
| `DefaultTheme` | `Theme` | Default navigation theme. |
| `IsWithinNativeNavigator` | `Context<boolean>` | Indicates that descendants are rendered inside a native navigator. Native navigator integrations should provide `true` so incompatible nested navigators can fail before reaching the native view hierarchy. |
| `router` | `ImperativeRouter` | Imperative router object. |
| `Tabs` | — | Renders a tabs navigator. |
| `unstable_performance` | `Pick<Performance, 'getEntries' \| 'getEntriesByName' \| 'getEntriesByType' \| 'clearMarks'>` | Reads the performance marks that Expo Router records during navigation. On web it is the global `performance` object, so `getEntries()` also returns entries Expo Router did not record. On native, Expo Router keeps the latest 250 marks and passes each mark to the global `performance.mark()`, so the marks show in the React Native DevTools timeline. |

### Hooks

| Hook | Returns | Description |
| --- | --- | --- |
| `useCurrentRouteInfo()` | `UrlObject \| undefined` | Returns route info for a screen it is called from. |
| `useFocusEffect(effect, do_not_pass_a_second_prop)` | `void` | Runs an effect whenever a route is focused; the optional cleanup runs when the screen loses focus, the dependencies change, or the component unmounts. `effect` is a memoized `EffectCallback`; wrap it in `React.useCallback`. |
| `useGlobalSearchParams()` | `RouteOutputParams<TRoute> & TParams` | URL parameters for the globally selected route, including dynamic path segments. Updates even when the route is not focused. |
| `useIsFocused()` | `boolean` | Whether the screen is focused. |
| `useLoaderData()` | `LoaderFunctionResult<T>` | Result of the `loader` function for the calling route. |
| `useLocalSearchParams()` | `RouteOutputParams<TRoute> & TParams` | URL parameters for the contextually focused route; both route parameters and search parameters for dynamic routes. |
| `useNavigation(parent)` | `T` | Navigation object for the current route. `parent` (optional, `string \| HrefObject`) is an absolute path such as `/(root)` or a relative path such as `../../` to the parent route. Throws `Could not find parent navigation with route "/non-existent"` for a layout that does not exist. |
| `useNavigationContainerRef()` | `NavigationContainerRefWithCurrent<RootParamList>` | The root `<NavigationContainer />` ref; `ref.current` may be `null` before mount. |
| `usePathname()` | `string` | Current route location without search parameters, segments normalized (`/[id]?id=normal` becomes `/normal`). |
| `usePreventRemove(preventRemove, callback, options)` | `() => void` | Prevents the screen from being removed while `preventRemove` is `true` and calls `callback` with the blocked navigation action. On web it also prevents the browser from unloading the page. |
| `useRootNavigation()` | `NavigationContainerRef<ParamListBase> \| null` | Deprecated: use `useNavigationContainerRef` instead. |
| `useRootNavigationState()` | `NavigationState` | Navigation state of the root navigator. |
| `useRoute()` | `T` | Route prop of the parent screen. |
| `useRoutePath()` | `string` | Path for the current route based on linking options. |
| `useRouter()` | `ImperativeRouter` | Router object for imperative navigation. |
| `useScrollToTop(ref)` | `void` | `ref` is a `RefObject<ScrollableWrapper>`. |
| `useSegments()` | `RouteSegments<TSegments>` | Selected file segments for the current route, not normalized (`/[id]?id=normal` becomes `["[id]"]`). |
| `useServerDocumentContext()` | `ServerDocumentData` | Server document data for SSR (`htmlAttributes`, `bodyAttributes`, `headNodes`, `bodyNodes`); import from `expo-router/html`. |
| `useSitemap()` | `SitemapType \| null` | Sitemap data. |
| `useTheme()` | `Theme` | Current theme. |
| `unstable_useIsNavigating()` | `boolean` | Whether a navigation is queued or its state update is pending. `navigation.dispatchSync` bypasses the queue and native back gestures never enter it, so neither is reported. Returns `false` outside an Expo Router root. Listed as deprecated in the source ("Use `integrateWithRouter` instead"). |

`usePreventRemove` parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `preventRemove` | `boolean` | Whether to prevent the screen from being removed. |
| `callback` (optional) | `(options: { data: { action: NavigationAction }, repeat: () => void }) => void` | Called when the screen was prevented from being removed. |
| `options` (optional) | `PreventRemoveOptions` | Options that configure removal prevention. |

### ImperativeRouter

| Property | Type | Description |
| --- | --- | --- |
| `back` | `(options: TransitionOptions) => void` | Goes back in the navigation history. |
| `canDismiss` | `() => boolean` | `true` if the router is within a stack with more than one screen in the stack's history. |
| `canGoBack` | `() => boolean` | Navigates to a route in the navigator's history if it supports invoking the `back` function. |
| `dismiss` | `(count: number, options: TransitionOptions) => void` | Navigates to a stack lower than the current screen using the provided count if possible, otherwise 1. If the current screen is the only route, dismisses the entire stack. |
| `dismissAll` | `(options: TransitionOptions) => void` | Returns to the first screen of the closest stack, dismissing all screens above it. |
| `dismissTo` | `(href: Href, options: NavigationOptions) => void` | Dismisses screens until the provided href is reached. If the href is not found, replaces the current screen with the provided `href`. |
| `navigate` | `(href: Href, options: NavigationOptions) => void` | Navigates to the provided `href`. |
| `prefetch` | `(href: Href, options: NavigationOptions) => void` | Prefetches a route in the background before navigating to it. |
| `push` | `(href: Href, options: NavigationOptions) => void` | Navigates to the provided `href` using a push operation if possible. |
| `replace` | `(href: Href, options: NavigationOptions) => void` | Navigates to a route without appending to the history. |
| `setParams` | `(params: Partial<RouteInputParams<T>>) => void` | Updates the current route's query params. |
| `setTransitionMode` | `(mode: NavigationTransitionMode) => void` | Configures which queued navigation operations use React transitions. The default is `preload-only`; `never` cannot be overridden by individual operations. |

### Methods

| Method | Description |
| --- | --- |
| `attachRouteState(route, action)` | Attaches trusted nested state from a navigation action to a route and removes Expo Router's internal state markers at every nested level. State without the internal `__internal__routerActionState` marker is ignored and triggers a warning in development. |
| `createBaseStackProps(dependencies)` | Creates the shared props for integrating a stack navigator with Expo Router. Returns `{ isPreloaded, isRemovalPrevented, pop, subscribePopToTopOnParentTabPress }`. |
| `createBaseTabProps(dependencies)` | Creates the shared props for integrating a tab navigator. Returns `{ isPreloaded, isRemovalPrevented, preload, routeNames }`. |
| `createNativeStackProps(args)` | Creates the props required to integrate Expo Router's native stack navigator. Returns `NativeStackNavigatorCreateProps`. |
| `createStandardRouterNavigator(NavigatorContent, router, ...options)` | Creates a `standard-navigation` navigator and wires it into Expo Router in one step. |
| `enableLegacyHeaderAppearance()` | iOS only. Restores the previous header appearance on iOS 26+ for all native stack screens: an opaque header that uses the theme fonts, with content below the header. Call it before the root layout renders. |
| `extendRouter(base, extension, namedParameters)` | Creates a router factory that merges the members returned by `extension` over the router created by `base`. |
| `extendRouterActions(base, reducer)` | Creates a router factory whose `getStateForAction` runs `reducer` before the base router. |
| `integrateWithRouter(navigator, router, ...options)` | Wires an existing `standard-navigation` navigator into Expo Router, returning a navigator component (with a `.Screen` child) usable as a layout. |
| `isActionHandled(result)` | Checks whether a router's `getStateForAction` handled the action. Use it instead of comparing the result with `null`. |
| `NavigationAwareActivity(hideWhenNestedAtLevel)` | Wraps the screen contents in a React `Activity` that hides once the screen is buried deep enough in the stack. Must be rendered inside a screen component. The source marks this API unstable. |
| `StackRouter(options)` | Considered an internal implementation; its behavior may change without notice between versions. |
| `TabRouter(options)` | Considered an internal implementation; deprecated: use `createStandardRouterNavigator` instead. |
| `unstable_createStandardRouterNavigator(...)` | Same parameters as `createStandardRouterNavigator`. |
| `unstable_enablePerformanceIntegration()` | Starts recording the performance marks of Expo Router navigation. Call it before the root layout mounts. Deprecated per the source: use `integrateWithRouter` instead. |
| `unstable_integrateWithRouter(...)` | Same parameters as `integrateWithRouter`. |
| `withLayoutContext(Nav, processScreens)` | Returns a navigator that automatically injects matched routes and renders nothing when there are no children. Enables other React Navigation navigators and custom navigators. `processScreens` must preserve every screen name exactly once. |

`unstable_PerformanceObserver` is a class implementing `PerformanceObserver` for Expo Router's navigation marks (on web, the global `PerformanceObserver`).

### Key types

| Type | Definition |
| --- | --- |
| `Href<T>` | The main routing type. A string (full path such as `/profile/settings` or relative path such as `../settings`) or a `HrefObject`. |
| `HrefObject` | `{ pathname: string; params?: UnknownInputParams }`. |
| `ExternalPathString` | `{string}:{string}` or `//{string}`. |
| `NativeIntent` | Defined in `+native-intent.tsx` in the `app` directory; exports `redirectSystemPath` (`(event: { initial: boolean, path: string }) => Promise<string \| null> \| string \| null`) or `legacy_subscribe` (`(listener: (url: string) => void) => undefined \| void \| () => void`). |
| `LocaleDirection` | `'ltr'` or `'rtl'`. |
| `AsyncRouteOption` | `'development' \| 'production' \| boolean`. Production async routes are web-only. |
| `HttpMethod` | `'GET' \| 'POST' \| 'PUT' \| 'DELETE' \| 'PATCH' \| 'OPTIONS' \| 'HEAD'`. |
| `PageHeadersConfig` | `{ source: string; headers: Record<string, string \| string[]> }`. |
| `RedirectConfig` (config plugin) | `{ source: string; destination: string; permanent?: boolean (default false; 301 or 308 when true, else 302 or 307); methods?: HttpMethod[] }`. |
| `RewriteConfig` | `{ source: string; destination: string; methods?: HttpMethod[] }`. |
| `RouterActionHandling` (enum) | `Delegate = "DELEGATE"` (lets the base router handle the action; only from `extendRouter` / `extendRouterActions`) and `Unhandled = "UNHANDLED"` (navigator ignores the action). |

The source page also documents the following types, not reproduced here: `BaseRouterPerformanceMark`, `RouterActionMarkDetail`, `RouterPageMarkDetail`, `StandardNavigatorDescriptor`, `CommonNavigationAction`, `DefaultRouterOptions`, `EffectCallback`, `ExperimentalStackNavigationEventMap` / `Options` / `Prop`, `IntegrateWithRouterOptions`, `NativeStack*` (descriptor map, header items, event map, `NativeStackNavigationOptions`, navigation prop, options args, view state), `NavigationAction`, `NavigationState`, `NavigationTransitionMode`, `PickPartial`, `PreventRemoveOptions`, `RelativePathString`, `ResultState`, `RoutePath`, `Router`, `RouterAction*`, `RouterBrowserHistoryAction`, `RouterConfigOptions`, `RouterExtension*`, `RouterFactory`, `RouterPage*Mark`, `RouterPerformanceMark*`, `RouteSource`, `ScreenProps`, `SearchOrHash`, `SingularOptions`, `SitemapType`, `StackActionType`, `StackNavigationState`, `StackRouterOptions`, `StandardNavigator*`, `TabActionType`, `TabNavigationState`, `TabRouterOptions`, `Theme`.

## Notes

- Platforms: android, ios, tvos, web, expo-go (frontmatter `platforms`). Package `expo-router`; source code `https://github.com/expo/expo/tree/sdk-58/packages/expo-router`.
- In SDK 56 and later, Expo Router no longer supports importing from external `@react-navigation/*` packages in application code; repoint those imports to the matching `expo-router` entry points.
- `useLocalSearchParams` is preferred over `useGlobalSearchParams` in stacks because it only updates when the route is focused.
- Expo Router is file-based and built on React Navigation. Its `Link`, `useRouter`, and `Stack` are different APIs from the same-named APIs in react-router and tanstack-router.
- The v58 API page says the `useFocusEffect` cleanup runs "not on unmount"; this page follows the focus-handling guide, which states cleanup also runs on dependency change and unmount.
- Source: https://docs.expo.dev/versions/v58.0.0/sdk/router/ (modificationDate October 13, 2026).

## Related

- [Router Link](./router-link.md)
- [Router Stack](./router-stack.md)
- [Router Native tabs](./router-native-tabs.md)
- [Router UI](./router-ui.md)
- [Router Split View](./router-split-view.md)
- [Router Color](./router-color.md)
- [Router Experimental Stack](./router-experimental-stack.md)
- [Using URL parameters](./url-parameters.md)
- [Typed routes](./typed-routes.md)
- [Redirects](./redirects.md)
