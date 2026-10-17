---
source: https://docs.expo.dev/router/advanced/native-tabs/
---

# Native tabs

Use the platform's native system tab bar in Expo Router with `NativeTabs` (liquid glass tabs on iOS).

## Signature / Usage

```text
src
  app
    _layout.tsx
    index.tsx
    settings.tsx
```

SDK 58 and later (`expo-router/native-tabs`; SDK 55-57 use `expo-router/unstable-native-tabs`):

```tsx
import { NativeTabs } from 'expo-router/native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

Icons: different default and selected states, and custom images:

```tsx
<NativeTabs.Trigger name="index">
  <NativeTabs.Trigger.Icon
    sf={{ default: 'house', selected: 'house.fill' }}
    md={{ default: 'home', selected: 'home_filled' }}
  />
</NativeTabs.Trigger>
<NativeTabs.Trigger name="settings">
  <NativeTabs.Trigger.Icon src={require('../../../assets/setting_icon.png')} />
</NativeTabs.Trigger>
```

Label, badge, hiding, and disabling:

```tsx
<NativeTabs.Trigger name="settings">
  <NativeTabs.Trigger.Label hidden />
</NativeTabs.Trigger>
<NativeTabs.Trigger name="messages">
  <NativeTabs.Trigger.Badge>9+</NativeTabs.Trigger.Badge>
</NativeTabs.Trigger>
<NativeTabs.Trigger name="messages" hidden={shouldHideMessagesTab} />
<NativeTabs.Trigger name="settings" disabled />
```

Dynamic icon color for iOS liquid glass:

```tsx
<NativeTabs
  labelStyle={{
    // For the text color
    color: DynamicColorIOS({
      dark: 'white',
      light: 'black',
    }),
  }}
  // For the selected icon color
  tintColor={DynamicColorIOS({
    dark: 'white',
    light: 'black',
  })}>
```

Asset catalog icons (iOS, SDK 55 and later):

```tsx
<NativeTabs.Trigger.Icon
  xcasset={{
    default: 'home-outline',
    selected: 'home-filled',
  }}
/>
```

Vector icons through `src` (needs a development build):

```tsx
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { NativeTabs } from 'expo-router/native-tabs';

const homeIcon = MaterialDesignIcons.getImageSourceSync('home', 24, 'black');
const starOutlineIcon = MaterialDesignIcons.getImageSourceSync('star-outline', 24, 'black');
const starIcon = MaterialDesignIcons.getImageSourceSync('star', 24, 'black');

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        {/* `sf` is used on iOS, `src` (the vector icon) on Android. */}
        <NativeTabs.Trigger.Icon sf="house" src={homeIcon} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        {/* Outlined when unselected, filled when selected. */}
        <NativeTabs.Trigger.Icon
          sf={{ default: 'star', selected: 'star.fill' }}
          src={{ default: starOutlineIcon, selected: starIcon }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

Hide the whole tab bar, minimize on scroll, separate search tab, bottom accessory, Android keyboard:

```tsx
<NativeTabs hidden={isTabBarHidden}>
<NativeTabs minimizeBehavior="onScrollDown">
<NativeTabs.Trigger name="search" role="search">
<NativeTabs.BottomAccessory>
  <MiniPlayer isPlaying={isPlaying} onToggle={() => setIsPlaying(!isPlaying)} />
</NativeTabs.BottomAccessory>
<NativeTabs tabBarRespectsIMEInsets>
```

Search input in the tab bar: nest a `Stack` in the search route and use `Stack.SearchBar`:

```tsx
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function SearchIndex() {
  return (
    <>
      <Stack.Title>Search</Stack.Title>
      <Stack.SearchBar placement="automatic" placeholder="Search" onChangeText={() => {}} />
      <ScrollView>{/* Screen content */}</ScrollView>
    </>
  );
}
```

Custom web layout with a platform-specific component (`app-tabs.tsx` and `app-tabs.web.tsx`):

```tsx
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot />
      <TabList style={styles.tabList}>
        <TabTrigger name="index" href="/" style={styles.tab}>
          Home
        </TabTrigger>
        <TabTrigger name="settings" href="/settings" style={styles.tab}>
          Settings
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `NativeTabs.Trigger` `name` | string | Route name; tabs are not added automatically, each must have a `Trigger` |
| `NativeTabs.Trigger.Icon` `sf` / `md` | string or `{ default, selected }` | SF Symbols (iOS) / Material Symbols (Android) |
| `NativeTabs.Trigger.Icon` `src` | image source or `{ default, selected }` | Custom images; `renderingMode` (`template` default, or `original`) is iOS only (SDK 55 and later) |
| `NativeTabs.Trigger.Icon` `xcasset` | string or `{ default, selected }` | Xcode asset catalog icon (iOS, SDK 55 and later); `renderingMode` has no effect |
| `NativeTabs.Trigger.Label` `hidden` | boolean | Hide the label. Without a label the route name is used |
| `NativeTabs.Trigger.Badge` | children | Badge on the tab item |
| `NativeTabs.Trigger` `hidden` | boolean | Hide a tab; it cannot be navigated to in any way |
| `NativeTabs.Trigger` `disabled` | boolean | SDK 56 and later. Suppresses native tap selection only; JavaScript navigation (`router.push`, `Link`) still navigates |
| `NativeTabs.Trigger` `disablePopToTop` | boolean | Android, SDK 55 and later. Tapping an active tab otherwise pops its stack to root |
| `NativeTabs.Trigger` `disableScrollToTop` | boolean | Android, SDK 55 and later. Tapping an active root tab otherwise scrolls to top |
| `NativeTabs.Trigger` `disableAutomaticContentInsets` | boolean | SDK 55 and later. Manage safe area insets manually |
| `NativeTabs.Trigger` `disableTransparentOnScrollEdge` | boolean | Keep the iOS 18-and-earlier tab bar from turning transparent at the scroll end |
| `NativeTabs.Trigger` `role` | `'search'` | iOS 26: separate search tab (compile with Xcode 26 or higher) |
| `NativeTabs.Trigger` `contentStyle` | style | Use for a specific background color |
| `NativeTabs` `hidden` | boolean | SDK 55 and later. Hide the tab bar |
| `NativeTabs` `minimizeBehavior` | string | iOS 26. For example `"onScrollDown"` |
| `NativeTabs` `tabBarRespectsIMEInsets` | boolean | Android, SDK 56 and later. Lift the tab bar above the keyboard; needs Android 11 or later and `android.softwareKeyboardLayoutMode` set to `"resize"` |
| `NativeTabs` `labelStyle`, `tintColor`, `iconColor` | style / color | Label and icon styling; use `DynamicColorIOS` / `PlatformColor` for liquid glass |
| `NativeTabs.BottomAccessory` | component | SDK 55 and later. Floating view above the tab bar; `NativeTabs.BottomAccessory.usePlacement()` returns `'regular'` or `'inline'` |

## Notes

- Native tabs use the native system tab bar, unlike JavaScript tabs. The examples use `expo-router/native-tabs` (SDK 58 and later); SDK 54 through 57 use `expo-router/unstable-native-tabs`.
- SDK 54 used separately imported `Icon`, `Label`, `Badge`; SDK 55 changed to `NativeTabs.Trigger.Icon` / `.Label` / `.Badge`, with `md` the recommended prop for Android Material Symbols.
- Android distinct selected icons need SDK 56 or later (`react-native-screens` 4.25+). On SDK 55, `drawable` and `md` accept only a string.
- Not a drop-in replacement for JavaScript tabs: use `Trigger` instead of `Screen`, React components instead of props, and nest a native `Stack` inside tabs for headers and pushing screens.
- Platform tab bar differences: on iOS 26 the tab bar background props (`backgroundColor`, `blurEffect`, `shadowColor`, `disableTransparentOnScrollEdge`) only affect iOS 18 and earlier.
- Safe area: Android wraps screen content in a `SafeAreaView` applying the bottom inset; on iOS the first nested `ScrollView` has automatic content inset adjustment. Manual handling can use `SafeAreaView` from `react-native-screens/experimental`.
- All tab screens render eagerly; defer expensive content with `useIsFocused` or a `useFocusEffect` flag.
- White flash on iOS 26 and liquid glass header flicker in dark mode: wrap in `ThemeProvider` from `expo-router` (SDK 56 and later; SDK 55 imports `ThemeProvider`, `DarkTheme`, `DefaultTheme` from `@react-navigation/native`).
- Scroll to top and large-title behavior need the `ScrollView` to be the first child (or `collapsable={false}` on the wrapper).
- Known limitations: default and selected image icons share one rendering mode on iOS; maximum of 5 tabs on Android; tab bar height cannot be measured; no nested native tabs (JavaScript tabs can nest inside); limited FlatList support; no dynamically adding or removing tabs.
- On web there is no system tab bar; native tabs fall back to a basic implementation. Use headless tabs from `expo-router/ui` via `_layout.web.tsx` or a shared component with platform extensions.
- Expo Router is file-based and built on React Navigation; its `Tabs` and `Link` differ from same-named APIs in react-router and tanstack-router.
- Page modification date: September 30, 2026. Source fetched 2026-10-17.

## Related

- [JavaScript tabs](./tabs.md)
- [Stack](./stack.md)
- [Platform-specific extensions and module](./platform-specific-modules.md)
