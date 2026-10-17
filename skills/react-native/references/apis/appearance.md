---
source: https://reactnative.dev/docs/0.87/appearance
---

# Appearance

The `Appearance` module exposes information about the user's appearance preferences, such as their preferred system color scheme (light or dark).

## Signature / Usage

```tsx
import {Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();
if (colorScheme === 'dark') {
  // Use dark color scheme
}
```

```tsx
static getColorScheme(): 'light' | 'dark' | null;
static setColorScheme('light' | 'dark' | 'auto' | 'unspecified'): void;
static addChangeListener(
  listener: (preferences: {colorScheme: 'light' | 'dark' | null}) => void,
): EventSubscription;
```

### Methods

| Method | Description |
| --- | --- |
| `getColorScheme()` | Returns the active color scheme. May change at runtime, either at system level (e.g. scheduled change at sunrise or sunset) or when overridden via `setColorScheme()`. `'light'`: light applied. `'dark'`: dark applied. `null`: may be returned if the native Appearance module is not available. |
| `setColorScheme()` | Forces the application to always adopt a light or dark interface style, including native elements within it (Alerts, Pickers, etc.). App-level override only; does not affect the system's selected style or other applications. Values: `'light'`, `'dark'`, `'auto'` (follow the system, removes any override), `'unspecified'` (deprecated; follow the system, removes any override). |
| `addChangeListener()` | Add an event handler fired when appearance preferences change. On iOS and Android, `colorScheme` in the callback is always `'light'` or `'dark'`. |

## Notes

- Although the color scheme is available immediately, it may change when not overridden via `setColorScheme()`. Rendering logic or styles that depend on it should call `getColorScheme()` on every render rather than caching the value. Recommended: use the `useColorScheme` hook.
- Passing `'auto'` to `setColorScheme()` removes any override, restoring the system preference. `useColorScheme()` reads `getColorScheme()`, which returns the static override if one is set, else the system preference.
- Android: the color scheme maps to the user's Light or Dark theme preference on Android 10 (API level 29) and higher.
- iOS: the color scheme maps to the user's Light or Dark Mode preference on iOS 13 and higher. When taking a screenshot, the color scheme may flicker between light and dark mode by default, because iOS takes snapshots on both color schemes and updating the UI is asynchronous.
- The API is inspired by the W3C Media Queries draft; the preference is modeled after the `prefers-color-scheme` CSS media feature.
- Deprecated since 0.87: `Appearance.setColorScheme('unspecified')` -> use `'auto'` ([0.87 release blog](https://reactnative.dev/blog/2026/08/11/react-native-0.87)).

## Related

- [useColorScheme](./usecolorscheme.md)
- [DynamicColorIOS](./dynamiccolorios.md)
- [PlatformColor](./platformcolor.md)
