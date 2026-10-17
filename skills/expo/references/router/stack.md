---
source: https://docs.expo.dev/router/advanced/stack/
---

# Stack

Create a `Stack` navigator and configure route options, header, push behavior and dismissal in Expo Router.

## Signature / Usage

```text
src
  app
    _layout.tsx
    index.tsx
    details.tsx
```

```tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack />;
}
```

Configure the header for all routes with `screenOptions`, and static options with `Stack.Screen`:

```tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="home" options={{}} />
    </Stack>
  );
}
```

Set options dynamically (options API):

```tsx
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: params.name,
          headerStyle: { backgroundColor: 'lightblue' },
        }}
      />
      <Text
        onPress={() => {
          router.setParams({ name: 'Updated' });
        }}>
        Update the title
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

Composition components (alpha, SDK 55 and later):

```tsx
<Stack.Title>{params.name}</Stack.Title>
<Stack.Header style={{ backgroundColor: 'lightblue' }} />
```

Native header interface style (iOS, SDK 58 and later):

```tsx
<Stack>
  <Stack.Screen name="index" options={{ headerLargeTitleEnabled: true }} />
  <Stack.Screen name="details" options={{ headerUserInterfaceStyle: 'dark' }} />
</Stack>
```

Custom push behavior with `getId()`:

```tsx
<Stack>
  <Stack.Screen
    name="[profile]"
    getId={
      ({ params }) => String(Date.now())
    }
  />
</Stack>
```

Removing screens:

```tsx
router.dismiss(count);
router.dismissTo('/');
router.dismissAll();
if (router.canDismiss()) {
  router.dismiss(count);
}
```

Opt out of iOS 26 Liquid Glass headers with the JavaScript stack:

```tsx
import { Stack as JsStack } from 'expo-router/js-stack';

export default function Layout() {
  return <JsStack />;
}
```

Or with app config (development build required):

```json
{
  "ios": {
    "infoPlist": {
      "UIDesignRequiresCompatibility": true
    }
  }
}
```

Fix white flashes between screens by wrapping the root layout in `ThemeProvider`:

```tsx
import { ThemeProvider, DarkTheme, DefaultTheme, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack />
    </ThemeProvider>
  );
}
```

## Options / Props

Header options (set in `screenOptions` or `Stack.Screen` `options`):

| Option | Platform | Description |
| --- | --- | --- |
| `header` | Android, iOS | Custom header function returning a React Element; receives `navigation`, `route`, `options`, `back`. Native functionality such as large title and search bar won't work with a custom header |
| `headerBackButtonDisplayMode` | iOS | `default`, `generic` or `minimal`; how the back button displays icon and title |
| `headerBackButtonMenuEnabled` | iOS | Show the menu on long press of the back button (iOS >= 14). Defaults to `true` |
| `headerBackground` | Android, iOS | Function returning a React Element rendered as header background |
| `headerBackIcon` | Android, iOS | Icon for the back button; currently only image sources. Defaults to a chevron on iOS and an arrow on Android |
| `headerBackTitle` | iOS | Title string used by the back button |
| `headerBackTitleStyle` | iOS | Style object (`fontFamily`, `fontSize`) |
| `headerBackVisible` | Android, iOS | Whether the back button is visible; no effect on the first screen in the stack |
| `headerBlurEffect` | iOS | Blur effect for the translucent header; requires `headerTransparent: true` |
| `headerLargeStyle` | iOS | Style of the header when a large title is shown (`backgroundColor`) |
| `headerLargeTitleEnabled` | iOS | Large title that collapses to a regular header on scroll. Defaults to `false`. Needs a scrollable view and `contentInsetAdjustmentBehavior="automatic"` |
| `headerLargeTitleShadowVisible` | Android, iOS | Whether the drop shadow of the header is visible when a large title is shown |
| `headerLargeTitleStyle` | iOS | Style object (`fontFamily`, `fontSize`, `fontWeight`, `color`) |
| `headerLeft` | Android, iOS | Function returning a React Element for the left side; replaces the back button. Receives `tintColor`, `canGoBack`, `label`, `href` |
| `headerRight` | Android, iOS | Function returning a React Element for the right side. Receives `tintColor`, `canGoBack` |
| `headerSearchBarOptions` | Android, iOS | Options to render a native search bar (for example `placement`, `placeholder`, `onChangeText`, `onSearchButtonPress`, `hideWhenScrolling`, `inputType`, `autoCapitalize`, `autoFocus`, `ref` methods `focus` / `blur` / `setText` / `clearText` / `cancelSearch` / `toggleCancelButton`) |
| `headerShadowVisible` | Android, iOS | Whether to hide the elevation shadow (Android) or the bottom border (iOS) |
| `headerShown` | Android, iOS | Whether to show the header. Shown by default |
| `headerStyle` | Android, iOS | Style object (`backgroundColor`) |
| `headerTintColor` | Android, iOS | Tint color for the header; changes the back button and title color |
| `headerTitle` | Android, iOS | String or function returning a React Element. Defaults to `title` or the screen name |
| `headerTitleAlign` | Android, iOS | `left` or `center`. Not supported on iOS (always `center`) |
| `headerTitleStyle` | Android, iOS | Style object (`fontFamily`, `fontSize`, `fontWeight`, `color`) |
| `headerTransparent` | Android, iOS | Whether the navigation bar is translucent. Defaults to `false`; the header floats over the content |
| `headerUserInterfaceStyle` | iOS | SDK 58 and later. `'light'` or `'dark'` native header without changing the navigation theme; omitted follows the theme; not changeable while the screen is visible |
| `title` | Android, iOS | String used as a fallback for `headerTitle` |
| `unstable_headerInsets` | Android | Which edges of the native header apply window insets; set an edge to `false` to remove it. May change in a minor release |
| `unstable_headerLeftItems` | iOS | Experimental. Function returning an array of items for the left side; overrides `headerLeft` |
| `unstable_headerRightItems` | iOS | Experimental. Function returning an array of items for the right side; overrides `headerRight` |

Other screen options:

| Option | Platform | Description |
| --- | --- | --- |
| `animation` | Android | `default`, `fade`, `fade_from_bottom`, `flip`, `simple_push`, `slide_from_bottom`, `slide_from_right`, `slide_from_left`, `none` |
| `animationDuration` | iOS | Duration in ms of `slide_from_bottom`, `fade_from_bottom`, `fade` and `simple_push` transitions. Defaults to `350` |
| `animationMatchesGesture` | iOS | Whether the dismiss gesture uses the `animation` prop animation. Defaults to `false` |
| `animationTypeForReplace` | Android, iOS | `push` (default) or `pop` when this screen replaces another |
| `autoHideHomeIndicator` | iOS | Whether the home indicator prefers to stay hidden. Defaults to `false` |
| `contentStyle` | Android, iOS | Style object for the scene content |
| `freezeOnBlur` | iOS | Prevent inactive screens from re-rendering. Defaults to `false` |
| `fullScreenGestureEnabled` | iOS | Whether the dismiss gesture works on the whole screen. Defaults to `false` |
| `fullScreenGestureShadowEnabled` | Android, iOS | Shadow under view during full screen dismiss gesture. Defaults to `true` |
| `gestureDirection` | iOS | `vertical` or `horizontal` swipe direction to dismiss |
| `gestureEnabled` | iOS | Whether gestures can dismiss this screen. Defaults to `true` |
| `navigationBarColor` | Android | Deprecated, will be removed in a future release |
| `navigationBarHidden` | Android | Whether the navigation bar is hidden. Defaults to `false` |
| `orientation` | Android, iOS | `default`, `all`, `portrait`, `portrait_up`, `portrait_down`, `landscape`, `landscape_left`, `landscape_right` |
| `presentation` | Android, iOS | `card`, `modal`, `containedModal`, `fullScreenModal`, `transparentModal`, `containedTransparentModal`, `formSheet` |
| `scrollEdgeEffects` | iOS | iOS 26 and later. Per-edge `automatic`, `hard`, `soft`, `hidden`. Defaults to `automatic` |
| `sheetAllowedDetents` | Android, iOS | `'fitToContents'` or an ascending array of fractions. Android limited to 3 detents. Defaults to `[1.0]` |
| `sheetCornerRadius` | Android, iOS | Corner radius of the sheet |
| `sheetElevation` | Android | Elevation of the sheet. Defaults to `24` |
| `sheetExpandsWhenScrolledToEdge` | iOS | Whether the sheet expands to a larger detent when scrolling. Defaults to `true` |
| `sheetGrabberVisible` | iOS | Whether the sheet shows a grabber handle. Defaults to `false` |
| `sheetInitialDetentIndex` | Android, iOS | Detent index after opening, or `'last'`. Defaults to `0` |
| `sheetLargestUndimmedDetentIndex` | Android, iOS | Index, `'none'` (default) or `'last'` |
| `sheetResizeAnimationEnabled` | Android | Native animation when content size changes. Defaults to `true` |
| `sheetShouldOverflowTopInset` | Android | Render sheet content behind the status bar or cutouts. Defaults to `false` |
| `statusBarAnimation` | Android, iOS | `"fade"`, `"none"`, `"slide"` |
| `statusBarBackgroundColor` | Android | Deprecated, will be removed in a future release |
| `statusBarHidden` | Android, iOS | Whether the status bar is hidden on this screen |
| `statusBarStyle` | Android, iOS | `"auto"`, `"inverted"`, `"dark"`, `"light"` |
| `statusBarTranslucent` | Android | Deprecated, will be removed in a future release. Defaults to `false` |
| `tabBarAccessibilityLabel`, `tabBarActiveBackgroundColor`, `tabBarActiveTintColor`, `tabBarBackground`, `tabBarBadge`, `tabBarBadgeStyle`, `tabBarButton`, `tabBarButtonTestID`, `tabBarHideOnKeyboard`, `tabBarIcon`, `tabBarIconStyle`, `tabBarInactiveBackgroundColor`, `tabBarInactiveTintColor`, `tabBarItemStyle`, `tabBarLabel`, `tabBarLabelPosition`, `tabBarLabelStyle`, `tabBarPosition`, `tabBarShowLabel`, `tabBarStyle`, `tabBarVariant` | Android, iOS | Tab bar options also listed on this page; see the JavaScript tabs page for their descriptions |

## Notes

- The official Other screen options table labels presentation/orientation/sheet* options as Android only; corrected to Android, iOS per the Modals page and the SDK 58 router API reference. The same correction is applied to statusBarAnimation/statusBarHidden/statusBarStyle (SDK 58 API reference lists android, iOS).
- On Android a stacked route animates on top of the current screen; on iOS it animates from the right.
- Starting in SDK 55, screen options and the header can be configured with the options-based API or the composition components API (alpha); both can be used interchangeably.
- `Stack.Toolbar` adds header buttons; see the Stack Toolbar page.
- By default `Stack` removes duplicate screens when pushing a route already in the stack; provide `getId()` on `Stack.Screen` to change it.
- `dismiss` targets the closest stack, not the current navigator (differs from `back`); dismissing the only route dismisses the whole stack. `dismissTo` (added in Expo Router `4.0.8`) dismisses until the `Href` is reached, else replaces the current screen. `dismissAll` returns to the first screen of the closest stack. `canDismiss` returns `true` in a stack with more than one screen.
- iOS 26 Liquid Glass headers are on by default and cannot be disabled per screen. `UIDesignRequiresCompatibility` is a temporary workaround (not supported in Expo Go; Apple removes it from iOS 27). `expo-router/js-stack` is the SDK 56 replacement for the `@react-navigation/stack` library and gives full header control at the cost of native performance.
- Large title not collapsing: make `ScrollView` / `FlatList` the first child of the screen, or set `collapsable={false}` on the wrapper.
- Expo Router is file-based and built on React Navigation; its `Stack` and `useRouter` differ from same-named APIs in react-router and tanstack-router.
- Page modification date: September 29, 2026. Source fetched 2026-10-17.

## Related

- [Stack Toolbar](./stack-toolbar.md)
- [JavaScript tabs](./tabs.md)
- [Modals](./modals.md)
- [Navigation layouts](./navigation-layouts.md)
