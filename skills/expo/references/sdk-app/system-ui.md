---
source: https://docs.expo.dev/versions/v58.0.0/sdk/system-ui/
---

# SystemUI

`expo-system-ui` interacts with UI elements outside of the React tree: the root view background color, and locking the user interface style globally on Android.

## Signature / Usage

```sh
npx expo install expo-system-ui
```

```ts
import * as SystemUI from 'expo-system-ui';

SystemUI.setBackgroundColorAsync("black");
const color = await SystemUI.getBackgroundColorAsync();
```

## Options / Props

### Config plugin

```json
{
  "expo": {
    "backgroundColor": "#ffffff",
    "userInterfaceStyle": "light",
    "ios": { "backgroundColor": "#ffffff" },
    "android": { "userInterfaceStyle": "light" },
    "plugins": ["expo-system-ui"]
  }
}
```

The config plugin applies `userInterfaceStyle` on Android and `backgroundColor` on iOS from the app config. These app config values cannot be changed at runtime; a new app binary must be built for them to take effect. The root view background color itself can be changed at runtime with `SystemUI.setBackgroundColorAsync`.

### Methods

All: Android, iOS, tvOS, Web.

| Name | Signature | Description |
| --- | --- | --- |
| `SystemUI.getBackgroundColorAsync()` | `Promise<ColorValue \| null>` | Current root view background color in hex format; `null` if not set. |
| `SystemUI.setBackgroundColorAsync(color)` | `(color: ColorValue \| null) => Promise<void>` | Changes the root view background color (any valid CSS 3 / SVG color). Call in the root file outside of your component. |

## Notes

- Platforms: android, ios, tvos, web.
- Without CNG, Android needs `expo_system_ui_user_interface_style` in **android/app/src/main/res/values/strings.xml**: `<string name="expo_system_ui_user_interface_style" translatable="false">light</string>` (or `dark`).
- Without CNG, iOS needs `UIUserInterfaceStyle` in **ios/your-app/Info.plist**: `<key>UIUserInterfaceStyle</key><string>Light</string>` (or `Dark`).
- Source: `sdk-58` branch `packages/expo-system-ui`; modificationDate September 15, 2026.

## Related

- [StatusBar](./status-bar.md)
- [NavigationBar](./navigation-bar.md)
