---
source: https://docs.expo.dev/versions/v58.0.0/sdk/router/stack/
---

# Router Stack

An Expo Router API that provides the `Stack` navigator, header, toolbar, search bar, and screen components.

## Signature / Usage

```tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack />;
}
```

`Stack` renders a native stack navigator. Platforms: Android, iOS, tvOS, Web (unless noted below).

## Options / Props

### `Stack.Header`

Configures header styling for a stack screen (blur effect, background color, shadow visibility). If multiple instances are rendered for the same screen, the last one rendered takes precedence.

| Name | Type | Description |
| --- | --- | --- |
| `asChild` | `boolean` (default `false`) | Renders children as a custom header component, replacing the default header entirely. |
| `blurEffect` | `BlurEffect` | iOS only. Blur effect for the header background (for example `'regular'`, `'prominent'`, `'systemMaterial'`). |
| `children` | `ReactNode` | Child elements for custom header when `asChild` is true. |
| `hidden` | `boolean` (default `false`) | Hides the header completely. |
| `largeStyle` | `StyleProp<{ backgroundColor: ColorValue, shadowColor: 'transparent' }>` | iOS only. Style for the large title header. |
| `style` | `StyleProp<{ backgroundColor: ColorValue, color: ColorValue, shadowColor: 'transparent' }>` | Style for the standard-sized header. `color` is the tint color for header elements; `shadowColor: 'transparent'` hides the shadow/border. |
| `transparent` | `boolean` | When `true`, the header is absolutely positioned and content scrolls underneath. Auto-enabled when `style.backgroundColor` is `'transparent'` or `blurEffect` is set. Defaults to `true` on iOS 26+ with Liquid Glass when no header background is set, and `false` otherwise. Call `enableLegacyHeaderAppearance()` to make it `false` on iOS. |

### `Stack.Screen`

Inherits `PropsWithChildren`.

| Name | Type | Description |
| --- | --- | --- |
| `name` | `string` | Required when used inside a Layout component. |
| `options` | `NativeStackNavigationOptions \| (prop: { navigation: any, route: DescriptorRouteProp<ParamListBase, string> }) => NativeStackNavigationOptions` | Options to configure the screen. The function form `options={({ route }) => ({})}` is only supported inside a Layout component; in a page component pass an options object directly. |
| `activityEnabled` | `number \| boolean` | Overrides React Activity behavior inherited from the stack. A number is how many screens must be above this route before its content is hidden. Layout only. |
| `dangerouslySingular` | `SingularOptions` | When enabled, the navigator reuses an existing screen instead of pushing a new one. Layout only. The source also lists a deprecated entry reading "Use `dangerouslySingular` instead". |
| `getId` | `(__namedParameters: { params: Record<string, any> }) => string \| undefined` | Determines a unique ID for the screen. |
| `listeners` | `Partial<{ blur, focus, gestureCancel, removed, removePrevented, sheetDetentChange, state, transitionEnd, transitionStart }> \| (prop: { navigation: any, route: RouteProp<ParamListBase, string> }) => ScreenListeners<TState, TEventMap>` | Listeners for navigation events. Layout only. |

### `Stack.Screen.BackButton`

Configures the back button; usable inside `Stack.Screen` in a layout or directly inside a screen component. Last instance rendered wins.

| Name | Type | Description |
| --- | --- | --- |
| `children` | `string` | Title for the back button. |
| `displayMode` | `BackButtonDisplayMode` | iOS only. Display mode. |
| `hidden` | `boolean` | Hides the back button. |
| `src` | `ImageSourcePropType` | Custom image source. |
| `style` | `StyleProp<{ fontFamily: string, fontSize: number }>` | Style for the back button title. |
| `withMenu` | `boolean` | iOS only. Shows a context menu on long press. |

### `Stack.SearchBar`

Search bar integrated with the native stack header. Props inherit `SearchBarProps`. Using it automatically makes the header visible (`headerShown: true`). To display the search bar in the bottom toolbar on iOS 26+, use `Stack.Toolbar.SearchBarSlot` inside `Stack.Toolbar`.

### `Stack.Title`

Sets the screen title; usable inside `Stack.Screen` in a layout or directly in a screen. Last instance rendered wins.

| Name | Type | Description |
| --- | --- | --- |
| `asChild` | `boolean` | Render a custom component as the header title. |
| `children` | `ReactNode` | A string for plain text, or a custom component when `asChild` is enabled. |
| `large` | `boolean` | iOS only. Enables large title mode. |
| `largeStyle` | `StyleProp<{ color, fontFamily, fontSize, fontWeight }>` | iOS only. Style for the large title. |
| `style` | `StyleProp<{ color, fontFamily, fontSize, fontWeight, textAlign: 'left' \| 'center' }>` | Title style. |

### `Stack.Toolbar`

Platforms: Android, iOS. Configures the stack toolbar. `placement="left"` / `"right"` customize that side of the header and automatically make the header visible (`headerShown: true`); `placement="bottom"` (default) shows a bottom toolbar and can only be used inside page components, not layout components. Last instance rendered for a screen wins. `Stack.Toolbar.View` accepts the same props as `Stack.Toolbar` plus its own below.

| Name | Type | Description |
| --- | --- | --- |
| `placement` | `ToolbarPlacement` (default `'bottom'`) | `'left'`, `'right'`, or `'bottom'`. |
| `asChild` | `boolean` (default `false`) | Renders children as a custom component in the header area. Only for `left` / `right`. |
| `children` | `ReactNode` | Can include `Stack.Toolbar.Button`, `Menu`, `View`, `Spacer`, and `SearchBarSlot` (bottom placement, iOS only). |
| `backgroundColor` | `ColorValue` | Android only. Background color for the toolbar and its menus. |
| `tintColor` | `ColorValue` | Android only. Tint color for toolbar items; items can override with their own `tintColor`. |
| `disableImePadding` | `boolean` (default `false`) | Android only. Disables automatic keyboard (IME) padding on the bottom toolbar (`placement="bottom"`). |

### `Stack.Toolbar.Button`

| Name | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Button content: text children, or `Stack.Toolbar.Icon` / `Label` / `Badge` components. When `icon` is used, the label is only for accessibility. Badge is only supported in left/right placements. |
| `accessibilityHint` | `string` | iOS only. |
| `accessibilityLabel` | `string` | Android, iOS. Spoken by screen readers. |
| `disabled` | `boolean` | Android, iOS. |
| `hidden` | `boolean` (default `false`) | Android, iOS. Hides the button. |
| `hidesSharedBackground` | `boolean` | iOS 26+. Hides the shared background. |
| `icon` | `ImageSourcePropType \| SFSymbols7_0` | Android: image source only. iOS: SF Symbol string, image source, or xcasset. For `placement="bottom"` on iOS only string SF Symbols are supported; use `image` for custom images. |
| `iconRenderingMode` | `'template' \| 'original'` | Image-based icons only. iOS default is `'template'` if `tintColor` is set, else `'original'`; Android default is `'template'`. |
| `image` | `SharedRef<'image', Record<never, never>> \| null` | iOS only, bottom placement only. |
| `onPress` | `() => void` | Press handler. |
| `selected` | `boolean` | iOS only. Selected state. |
| `separateBackground` | `boolean` (default `false`) | iOS only. Separates this item's background from other header items. |
| `style` | `StyleProp<TextStyle>` | Android, iOS. Label style. |
| `tintColor` | `ColorValue` | Android, iOS. |
| `variant` | `'done' \| 'plain' \| 'prominent'` (default `'plain'`) | iOS only. |

### `Stack.Toolbar.Icon`, `Label`, `Badge`

| Component | Props |
| --- | --- |
| `Stack.Toolbar.Icon` | `src` (`ImageSourcePropType`), `sf` (iOS, SF Symbol name), `xcasset` (iOS, `.xcassets` image name), `renderingMode` (`'template' \| 'original'`; iOS default `'template'` with parent `tintColor` else `'original'`; Android `'template'`, `'original'` skips the tint) |
| `Stack.Toolbar.Label` | `children` (`string`) |
| `Stack.Toolbar.Badge` | `children` (`string`), `style` (`StyleProp<Pick<TextStyle, 'color' \| 'backgroundColor' \| 'fontSize' \| 'fontWeight' \| 'fontFamily'>>`) |

### `Stack.Toolbar.Menu`

| Name | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Menu content: icons, labels, badges, and menu actions. |
| `title` | `string` | Title shown on top of the menu (Android, iOS). |
| `accessibilityHint` / `accessibilityLabel` | `string` | iOS / Android, iOS. |
| `cornerRadius` | `number` | Android only. Corner radius in dp for the dropdown container; defaults to the Material3 `MenuDefaults.shape` corner radius. |
| `destructive` | `boolean` | iOS only. |
| `disabled` | `boolean` | Android, iOS. |
| `elementSize` | `'auto' \| 'small' \| 'medium' \| 'large'` | iOS 16.0+. Only supported in `Stack.Toolbar.Bottom`. |
| `hidden` | `boolean` (default `false`) | Android, iOS. |
| `hidesSharedBackground` | `boolean` | iOS 26+. |
| `icon` | `ImageSourcePropType \| SFSymbols7_0` | On Android only `ImageSourcePropType` icons are rendered at the menu root; SF Symbols and `xcasset` names are silently dropped. On iOS bottom placement only string SF Symbols are supported. |
| `iconRenderingMode` | `'template' \| 'original'` | Same defaults as `Button`. |
| `image` | `SharedRef<'image', Record<never, never>> \| null` | iOS, bottom placement only. |
| `inline` | `boolean` | Android, iOS. Inline menus are only supported in submenus. |
| `palette` | `boolean` | iOS only. Displays as one row; only supported in submenus. |
| `separateBackground` | `boolean` (default `false`) | iOS only. |
| `style` | `StyleProp<BasicTextStyle>` | Android, iOS. |
| `tintColor` | `ColorValue` | Android, iOS. |
| `variant` | `'done' \| 'plain' \| 'prominent'` (default `'plain'`) | iOS only. |

### `Stack.Toolbar.MenuAction`

| Name | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | An Icon, Label, or string title. |
| `destructive` | `boolean` | Android, iOS. |
| `disabled` | `boolean` | Disabled and not selectable. |
| `discoverabilityLabel` | `string` | iOS only. Elaborated title explaining the action. |
| `hidden` | `boolean` | |
| `icon` | `ImageSourcePropType \| SFSymbols7_0` | On Android only `ImageSourcePropType` is rendered; SF Symbols are silently dropped. |
| `iconRenderingMode` | `'template' \| 'original'` | iOS only. |
| `image` | `SharedRef<'image', Record<never, never>> \| null` | iOS only, `Stack.Toolbar.Bottom` only. |
| `isOn` | `boolean` | Android, iOS. Displays as selected. |
| `onPress` | `() => void` | Press handler. |
| `subtitle` | `string` | iOS only. |
| `unstable_keepPresented` | `boolean` | Android, iOS. Keeps the menu presented after selection; unstable because on iOS selecting recreates the menu, closing open submenus and resetting scroll position. |

### `Stack.Toolbar.SearchBarSlot`, `Spacer`, `View`

| Component | Name | Type | Description |
| --- | --- | --- | --- |
| `SearchBarSlot` | `hidden` | `boolean` (default `false`) | Hides the slot. |
| `SearchBarSlot` | `hidesSharedBackground` | `boolean` | iOS 26+. |
| `SearchBarSlot` | `separateBackground` | `boolean` | iOS 26+. When `true`, the search bar always renders as `integratedButton`. Ensure adjacent items have `separateBackground` set or use `Stack.Toolbar.Spacer`. |
| `Spacer` | `hidden` | `boolean` (default `false`) | Android, iOS. |
| `Spacer` | `sharesBackground` | `boolean` | iOS 26+, bottom placement only. |
| `Spacer` | `width` | `number` | Android, iOS. Required in left/right placements; in bottom placement without `width` the spacer is flexible. On Android, `width` is required in every placement. |
| `View` | `children` | `ReactElement` | Any React node. |
| `View` | `hidden` | `boolean` (default `false`) | Hides the view. |
| `View` | `hidesSharedBackground` | `boolean` | iOS 26+. |
| `View` | `separateBackground` | `boolean` (default `false`) | iOS; bottom placement only. |

Examples:

```tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index">
        <Stack.Title large>Home</Stack.Title>
        <Stack.Header blurEffect="systemMaterial" />
        <Stack.Toolbar placement="left">
          <Stack.Toolbar.Button icon="sidebar.left" onPress={() => alert('Left button pressed!')} />
        </Stack.Toolbar>
      </Stack.Screen>
    </Stack>
  );
}
```

```tsx
<Stack.SearchBar onChangeText={()=>{}} />
<Stack.Toolbar placement="bottom">
  <Stack.Toolbar.SearchBarSlot />
  <Stack.Toolbar.Spacer />
  <Stack.Toolbar.Button icon="square.and.pencil" />
</Stack.Toolbar>
```

## Notes

- Platforms: android, ios, tvos, web, expo-go. `Stack.Toolbar` is Android and iOS only; `Stack.Toolbar.Bottom`-only props are noted per row.
- Expo Router `Stack` is a native stack navigator for file-based routes. It is a different API from react-router and tanstack-router routing, and `Stack.Screen` options follow React Navigation native stack options.
- `StackHeaderItemSharedProps` interface (shared by toolbar items) lists optional `accessibilityHint`, `accessibilityLabel`, `children`, `disabled`, `hidesSharedBackground`, `icon`, `iconRenderingMode`, `separateBackground`, `style`, `tintColor`, `variant` (default `'plain'`).
- Source: https://docs.expo.dev/versions/v58.0.0/sdk/router/stack/ (stack layout guide: https://docs.expo.dev/router/advanced/stack/).

## Related

- [Router](./router-api.md)
- [Router Link](./router-link.md)
- [Router Experimental Stack](./router-experimental-stack.md)
- [Router Native tabs](./router-native-tabs.md)
