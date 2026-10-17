---
source: https://docs.expo.dev/versions/v58.0.0/sdk/router/native-tabs/
---

# Router Native tabs

`expo-router/native-tabs` is a submodule of `expo-router` that exports components to build tab layouts using platform-native system tabs.

## Signature / Usage

```js
import { NativeTabs } from 'expo-router/native-tabs';
```

```tsx
import { NativeTabs } from 'expo-router/native-tabs';

export default function Layout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home" />
      <NativeTabs.Trigger name="settings" />
    </NativeTabs>
  );
}
```

## Options / Props

### `NativeTabs`

Creates the native tabs layout. Inherits `PropsWithChildren`.

| Name | Platforms | Type | Description |
| --- | --- | --- | --- |
| `activityEnabled` | all | `boolean` (default `false`) | Enables React Activity for tab screens. Inactive tabs are hidden while preserving their state. |
| `backBehavior` | Android | `'none' \| 'history' \| 'initialRoute'` | Behavior when navigating back with the back button. |
| `backgroundColor` | all | `ColorValue` | Tab bar background color. No effect on iOS 26 and later (system draws the background). |
| `badgeBackgroundColor` | all | `ColorValue` | Background color of every badge. |
| `badgeTextColor` | Android, Web | `ColorValue` | Badge text color. |
| `blurEffect` | iOS | `'light' \| 'dark' \| 'none' \| 'regular' \| 'systemDefault' \| 'extraLight' \| 'prominent' \| 'systemUltraThinMaterial' \| 'systemThinMaterial' \| 'systemMaterial' \| 'systemThickMaterial' \| 'systemChromeMaterial'` plus `Light` / `Dark` variants of each system material (for example `'systemMaterialLight'`, `'systemChromeMaterialDark'`) | Blur effect applied to the tab bar. No effect on iOS 26 and later. |
| `disableIndicator` | Android | `boolean` | Disables the active indicator. |
| `disableTransparentOnScrollEdge` | iOS | `boolean` | Tab bar does not become transparent when scrolled to the edge. No effect on iOS 26 and later. |
| `hidden` | all | `boolean` (default `false`) | Hides the tab bar. |
| `iconColor` | all | `ColorValue \| { default: ColorValue \| undefined, selected: ColorValue \| undefined }` | Color of every tab icon. |
| `indicatorColor` | Android, Web | `ColorValue` | Color of the tab indicator. |
| `labelStyle` | all | `StyleProp<NativeTabsLabelStyle> \| { default, selected }` | Style of every tab label. |
| `labelVisibilityMode` | Android | `'auto' \| 'selected' \| 'labeled' \| 'unlabeled'` | Visibility mode of the tab item label. |
| `minimizeBehavior` | iOS 26+ | `'never' \| 'automatic' \| 'onScrollDown' \| 'onScrollUp'` (default `automatic`) | `automatic`: system default; `never`: does not minimize; `onScrollDown`: minimizes when scrolling down and expands when scrolling up; `onScrollUp`: the reverse. |
| `rippleColor` | Android | `ColorValue` | Ripple color when the tab is pressed. |
| `screenListeners` | all | `Partial<{ blur, focus, removed, removePrevented, state, tabPress }> \| (props: { navigation: any, route: RouteProp<ParamListBase> }) => ScreenListeners<State, EventMap>` | Listeners for navigation events on all tabs (`tabPress`, `focus`, `blur`). |
| `shadowColor` | iOS | `ColorValue` | Shadow color. No effect on iOS 26 and later. |
| `sidebarAdaptable` | iOS 18+ | `boolean` | Enables the sidebarAdaptable tab bar style on iPadOS and macOS. No effect on iPhone. |
| `tabBarRespectsIMEInsets` | Android | `boolean` (default `false`) | Tab bar lifts above the keyboard instead of being overlaid. Requires `windowSoftInputMode="adjustResize"`; no effect below Android API 30. |
| `tintColor` | all | `ColorValue` | Tint color of the tab icon; can be overridden per tab. |
| `titlePositionAdjustment` | iOS | `{ horizontal: number, vertical: number }` | Title position adjustment. |
| `unstable_nativeProps` | Android, iOS | `Partial<Omit<TabsHostProps, 'children' \| 'navStateRequest' \| 'onTabSelected'>>` | Props passed to the native tab host in `react-native-screens`. Unstable; may change or be removed in minor versions. |
| `unstable_screenErrorBoundary` | all | `ComponentType<ErrorBoundaryProps>` | Component rendered when an individual tab screen throws. |

### `NativeTabs.Trigger`

Customizes native tab options in the `_layout` file (requires `name`) or from the tab screen (`name` has no effect).

| Name | Platforms | Type | Description |
| --- | --- | --- | --- |
| `name` | all | `string` | Route name. Required in a Layout; no effect in a route. |
| `accessibilityLabel` | Android, iOS | `string` | Announced by screen readers; defaults to the visible label. On Android maps to `contentDescription` (API 26+). |
| `activityEnabled` | all | `boolean` | Overrides React Activity behavior inherited from `NativeTabs`. |
| `children` | all | `ReactNode` | Use `Icon`, `Label`, and `Badge` to customize the tab. |
| `contentStyle` | all | `Pick<ViewStyle, 'backgroundColor' \| 'experimental_backgroundImage' \| 'alignContent' \| 'alignItems' \| 'flexDirection' \| 'gap' \| 'justifyContent' \| 'padding*' ...>` | Style applied to the tab content; only certain style properties are supported. |
| `disableAutomaticContentInsets` | Android, iOS | `boolean` | Android wraps content in a `SafeAreaView` (bottom inset applied); iOS enables automatic content inset adjustment on the first nested scroll view. `true` disables this and insets must be managed manually (for example `SafeAreaView` from `react-native-screens/experimental`). |
| `disabled` | Android, iOS | `boolean` (default `false`) | Tab is shown but cannot be selected by tapping. JavaScript navigation such as `router.push()` or `<Link />` still navigates to the tab. |
| `disableIndicator` | Android | `boolean` (default `false`) | Disables the active indicator for this tab; takes precedence over `NativeTabs`. |
| `disablePopToTop` | iOS | `boolean` (default `false`) | Does not pop the stack to root when the tab is selected again. |
| `disableScrollToTop` | iOS | `boolean` (default `false`) | Does not scroll to top when selected again. |
| `disableTransparentOnScrollEdge` | iOS | `boolean` | Takes precedence over `NativeTabs`. |
| `hidden` | all | `boolean` | Hides the tab from the tab bar. A hidden tab cannot be navigated to in any way. Dynamically hiding tabs remounts the navigator and resets state. |
| `indicatorColor` | Android | `ColorValue` | Active indicator color for this tab. |
| `labelVisibilityMode` | Android | `'auto' \| 'selected' \| 'labeled' \| 'unlabeled'` | For this tab; takes precedence over `NativeTabs`. |
| `listeners` | all | `Partial<{ blur, focus, removed, removePrevented, state, tabPress }> \| (prop) => ScreenListeners<TState, TEventMap>` | Listeners for this tab (`tabPress`, `focus`, `blur`). |
| `rippleColor` | Android | `ColorValue` | Ripple color for this tab. |
| `role` | iOS | `'search' \| 'history' \| 'bookmarks' \| 'contacts' \| 'more' \| 'downloads' \| 'favorites' \| 'featured' \| 'mostRecent' \| 'mostViewed' \| 'recents' \| 'topRated'` | System-provided tab bar item with predefined icon and title. Custom `icon` or `selectedIcon` override the system icon; the title cannot be customized. |
| `testID` | Android, iOS | `string` | On iOS maps to the accessibility identifier (XCUITest, Maestro); on Android maps to the view tag (Espresso-based drivers like Detox; Maestro and Appium do not read it, use `accessibilityLabel`). |
| `unstable_nativeProps` | Android, iOS | `Partial<Omit<TabsScreenProps, 'screenKey'>>` | Props for the native tab screen in `react-native-screens`. Overrides other props set by Expo Router; unstable. |

### Sub-components

| Component | Props |
| --- | --- |
| `NativeTabs.BottomAccessory` | `children` (`ReactNode`); static `usePlacement: () => 'regular' \| 'inline'` |
| `NativeTabs.Trigger.Badge` | `children` (`string`; not displayed if omitted), `hidden` (`boolean`, default `false`), `selectedBackgroundColor` (`ColorValue`) |
| `NativeTabs.Trigger.Icon` | `selectedColor` (`ColorValue`) plus icon source props below |
| `NativeTabs.Trigger.Label` | `children` (`string`), `hidden` (`boolean`, default `false`), `selectedStyle` (`StyleProp<NativeTabsLabelStyle>`) |
| `NativeTabs.Trigger.VectorIcon` | Same as `VectorIcon` (`family`, `name`). Prefer the `md` and `sf` props on `Icon`. |

Icon source props (interfaces):

| Interface | Property | Type | Description |
| --- | --- | --- | --- |
| `DrawableIcon` | `drawable` | `string \| { default: string, selected: string }` | Android drawable resource name. |
| `MaterialIcon` | `md` | Material icon name or `{ default, selected }` | Android only. See the Material icons catalog. |
| `SFSymbolIcon` | `sf` | `SFSymbols7_0 \| { default, selected }` | iOS SF Symbol name. |
| `SrcIcon` | `src` | `ImageSourcePropType \| ReactElement \| { default, selected }` | Android, iOS image source. `sf` overrides it on iOS; `drawable` or `material` overrides it on Android. |
| `SrcIcon` | `renderingMode` | `IconRenderingMode` | iOS: `'template'` (tint applied) or `'original'`. Defaults to `'template'` if the tab bar icon color is configured, else `'original'`. |
| `XcassetIcon` | `xcasset` | `string \| { default, selected }` | iOS asset catalog image name. Rendering mode comes from the asset's Render As setting. |

Types: `IconRenderingMode` (`'template' | 'original'`), `NativeTabsLabelStyle` (`Pick<TextStyle, 'fontFamily' | 'fontSize' | 'fontStyle' | 'fontWeight' | 'color'>`), `SymbolOrImageSource` (object with `drawable` / `sf` / `xcasset`, or `renderingMode` / `src`).

Method: `createNativeTabsProps(args)` (imported from `expo-router/unstable-native-tabs`) creates the props required to integrate Expo Router's native tabs navigator; returns `NativeTabsNavigatorCreateProps`.

```tsx
import { TabRouter, integrateWithRouter } from 'expo-router';
import { createNativeTabsProps } from 'expo-router/unstable-native-tabs';
import { navigator } from './navigator';

export const NativeTabs = integrateWithRouter(navigator, TabRouter, {
  createProps: createNativeTabsProps,
});
```

Per-tab customization from a screen:

```tsx
<NativeTabs.Trigger>
  <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
</NativeTabs.Trigger>
```

## Notes

- Platforms: android, ios, tvos, web, expo-go. Requires `expo-router` and the `expo-router` config plugin (`"plugins": ["expo-router"]`).
- Several tab bar background props (`backgroundColor`, `blurEffect`, `shadowColor`, `disableTransparentOnScrollEdge`) have no effect on iOS 26 and later.
- Expo Router native tabs are a different API from react-router and tanstack-router; this page is part of the Expo Router reference.
- Source: https://docs.expo.dev/versions/v58.0.0/sdk/router/native-tabs/ (modificationDate September 16, 2026).

## Related

- [Router](./router-api.md)
- [Router UI](./router-ui.md)
- [Router Stack](./router-stack.md)
- [Router Split View](./router-split-view.md)
