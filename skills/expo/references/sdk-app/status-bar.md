---
source: https://docs.expo.dev/versions/v58.0.0/sdk/status-bar/
---

# StatusBar

`expo-status-bar` provides a component and imperative interface to control the app status bar: change its text color, hide it, and animate these changes. Built on top of React Native's `StatusBar` with defaults that work better for Expo users.

## Signature / Usage

```sh
npx expo install expo-status-bar
```

```jsx
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notice that the status bar has light text!</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
```

Config plugin:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-status-bar",
        {
          "hidden": false,
          "style": "dark"
        }
      ]
    ]
  }
}
```

## Options / Props

### Config plugin properties

| Name | Default | Description |
| --- | --- | --- |
| `hidden` | `undefined` | Whether the status bar starts hidden (`true` / `false`). |
| `style` | `undefined` | Initial style: `light` or `dark`. |

### StatusBar component props (Android, iOS, tvOS, Web unless noted)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `animated` | `boolean` | — | Whether transitions between property changes are animated. Supported for `style` and `hidden`. |
| `hidden` | `boolean` | — | Whether the status bar is hidden. |
| `hideTransitionAnimation` | `StatusBarAnimation` | `'fade'` | iOS. Transition effect when showing/hiding via `hidden`. |
| `style` | `StatusBarStyle` | `'auto'` | Color of the status bar text. `"auto"` picks a value for the active color scheme (dark mode app gives `"light"`). |

Multiple `StatusBar` components can be mounted at once (for example one per screen); their props are merged in mount order.

### Component methods

| Name | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `StatusBar.setHidden(hidden, animation)` | `hidden: boolean`, `animation?: StatusBarAnimation` (defaults to `'none'`) | `void` | Toggles visibility. Example: `StatusBar.setHidden(true, 'slide');` |
| `StatusBar.setStyle(style, animated)` | `style: StatusBarStyle`, `animated?: boolean` | `void` | Sets the bar style. Example: `StatusBar.setStyle('dark', true);` |
| `StatusBar.setStatusBarHidden(hidden, animation)` | same as `setHidden` | `void` | Deprecated: use `StatusBar.setHidden`; will be removed. |
| `StatusBar.setStatusBarStyle(style, animated)` | same as `setStyle` | `void` | Deprecated: use `StatusBar.setStyle`; will be removed. |

### Types

| Name | Definition |
| --- | --- |
| `StatusBarAnimation` | `'none' \| 'fade' \| 'slide'` |
| `StatusBarStyle` | `'auto' \| 'inverted' \| 'light' \| 'dark'` |

## Notes

- Platforms: android, ios, tvos, web, expo-go.
- tvOS: the code compiles and runs but no status bar is shown. Web: no API controls the OS status bar, so the library does nothing and does not throw.
- Existing React Native app (without CNG): on Android add `<item name="expoStatusBarHidden">true</item>` to the `AppTheme` style in `android/app/src/main/res/values/styles.xml`; on iOS set `UIStatusBarHidden` to `<true/>` in `ios/<project>/Info.plist`.
- Source: `sdk-58` branch `packages/expo-status-bar`; modificationDate September 15, 2026.

## Related

- [NavigationBar](./navigation-bar.md)
- [SystemUI](./system-ui.md)
- [SplashScreen](./splash-screen.md)
