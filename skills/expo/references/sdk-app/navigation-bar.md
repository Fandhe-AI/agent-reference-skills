---
source: https://docs.expo.dev/versions/v58.0.0/sdk/navigation-bar/
---

# NavigationBar

`expo-navigation-bar` provides a component and an imperative API for controlling the app's navigation bar on Android: change the color of its buttons or hide it.

## Signature / Usage

```sh
npx expo install expo-navigation-bar
```

```jsx
import { StyleSheet, Text, View } from 'react-native';
import { NavigationBar } from 'expo-navigation-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notice that the navigation bar has light buttons!</Text>
      <NavigationBar style="light" />
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
        "expo-navigation-bar",
        {
          "enforceContrast": true,
          "hidden": false,
          "style": "light"
        }
      ]
    ]
  }
}
```

## Options / Props

### Config plugin properties (Android only)

| Name | Default | Description |
| --- | --- | --- |
| `enforceContrast` | `true` | Whether the OS keeps the navigation bar translucent to provide contrast between buttons and app content. No effect on Android 7.1 and below. |
| `hidden` | `undefined` | Whether the bar starts hidden (`true` / `false`). The page describes this as the "status bar" starting hidden. |
| `style` | `undefined` | Initial style of the navigation bar: `light` or `dark`. |

### NavigationBar component props (Android)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `hidden` | `boolean` | — | If the navigation bar is hidden. |
| `style` | `NavigationBarStyle` | `'auto'` | Color of the navigation bar buttons. `"auto"` picks the value for the active color scheme (dark mode app gives `"light"`). Effective only when the device navigation bar uses buttons and the plugin's `enforceContrast` is `false`. |

Multiple `NavigationBar` components can be mounted at once (for example one per screen); their props are merged in mount order.

### Component methods (Android)

| Name | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `NavigationBar.setHidden(hidden)` | `hidden: boolean` | `void` | Sets visibility. Example: `NavigationBar.setHidden(true);` |
| `NavigationBar.setStyle(style)` | `style: NavigationBarStyle` | `void` | Sets the style (same effect conditions as the `style` prop). Example: `NavigationBar.setStyle("dark");` |

### Deprecated (to be removed in a future release)

| Name | Signature | Description |
| --- | --- | --- |
| `useVisibility()` | `NavigationBarVisibility \| null` | Hook with the system navigation bar visibility; `null` during async initialization. |
| `NavigationBar.getVisibilityAsync()` | `Promise<NavigationBarVisibility>` | Current visibility. Returns `hidden` on unsupported platforms (iOS, web). |
| `NavigationBar.setVisibilityAsync(visibility)` | `visibility: NavigationBarVisibility` → `Promise<void>` | Sets visibility. Deprecated: use `NavigationBar.setHidden`. |
| `NavigationBar.addVisibilityListener(listener)` | `listener: (event: NavigationBarVisibilityEvent) => void` → `EventSubscription` | Observes changes; also triggered when the status bar visibility changes. |
| `NavigationBar.setStyle(style)` (module-level) | `style: NavigationBarStyle` → `void` | Deprecated: use the component's `NavigationBar.setStyle`. |

### Types

| Name | Definition |
| --- | --- |
| `NavigationBarStyle` | `'auto' \| 'inverted' \| 'light' \| 'dark'`. `auto` adjusts to the current theme; `light` a light bar with dark content; `dark` a dark bar with light content; `inverted` colors inverted relative to the theme. |
| `NavigationBarVisibility` (deprecated) | `'visible' \| 'hidden'` |
| `NavigationBarVisibilityEvent` (deprecated) | `rawVisibility: number` (native `setOnSystemUiVisibilityChangeListener` value), `visibility: NavigationBarVisibility` |

## Notes

- Platforms: android, expo-go. iOS and web are unsupported.
- Due to a bug in the Android 15 emulator, `style` / `setStyle` may have no effect; try a physical device or a different Android version.
- Existing React Native app (without CNG): to hide the navigation bar on Android, add `<item name="expoNavigationBarHidden">true</item>` to the `AppTheme` style in `android/app/src/main/res/values/styles.xml`.
- Source: `sdk-58` branch `packages/expo-navigation-bar`; modificationDate September 15, 2026.

## Related

- [StatusBar](./status-bar.md)
- [SystemUI](./system-ui.md)
