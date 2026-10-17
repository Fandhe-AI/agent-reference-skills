---
source: https://docs.expo.dev/versions/v58.0.0/sdk/router/color/
---

# Router Color

The Color API of Expo Router provides access to platform-specific native colors.

## Signature / Usage

```js
import { Color } from 'expo-router';
```

```tsx
import { Color } from 'expo-router';
import { Text, View, useColorScheme } from 'react-native';

export default function MyComponent() {
  useColorScheme();
  return (
    <View style={{ flex: 1, backgroundColor: Color.android.dynamic.primary }}>
      <Text style={{ color: Color.ios.label }}>Hello</Text>
    </View>
  );
}
```

## Options / Props

`Color.Color` has type `ColorType` (platforms: Android, iOS) with two properties:

| Name | Type | Description |
| --- | --- | --- |
| `android` | `AndroidBaseColorSDK1 & AndroidBaseColorSDK14 & AndroidBaseColorSDK31 & AndroidBaseColorSDK34 & AndroidBaseColorSDK35 & AndroidDeprecatedColor & undefined & { attr: AndroidBaseColorAttr, dynamic: AndroidDynamicMaterialColor, material: AndroidMaterialColor }` | Android colors. |
| `ios` | `IOSBaseColor & undefined` | iOS colors. |

On Android it provides:

| Access | Description | Example |
| --- | --- | --- |
| `Color.android.<name>` | System colors, a type-safe wrapper over `PlatformColor`. | `Color.android.background_light` |
| `Color.android.attr.<name>` | Attribute colors, a type-safe wrapper over `PlatformColor`. | `Color.android.attr.colorPrimary` |
| `Color.android.material.<role>` | Material Design 3 static colors. | `Color.android.material.primary` |
| `Color.android.dynamic.<role>` | Material Design 3 dynamic colors (adapt to the user's wallpaper and theme settings). | `Color.android.dynamic.primary` |

On iOS it is a type-safe wrapper over `PlatformColor` providing system colors, for example `Color.ios.label`.

Color name interfaces (each property is a `ColorValue`, wrapping `PlatformColor`):

| Interface | Contents |
| --- | --- |
| `AndroidBaseColorSDK1` | `background_dark`, `background_light`, `black`, `darker_gray`, `tab_indicator_text`, `transparent`, `white`, `widget_edittext_dark` |
| `AndroidBaseColorSDK14` | `holo_blue_bright`, `holo_blue_dark`, `holo_blue_light`, `holo_green_dark`, `holo_green_light`, `holo_orange_dark`, `holo_orange_light`, `holo_purple`, `holo_red_dark`, `holo_red_light` |
| `AndroidBaseColorSDK31` | `system_accent1_0`, `system_accent1_10`, `system_accent1_100`, ... (Android 12 system palette) |
| `AndroidBaseColorSDK34`, `AndroidBaseColorSDK35` | Additional system colors, for example `system_on_surface_disabled`, `system_outline_disabled`, `system_surface_disabled` |
| `AndroidColorAttrSDK1` / `5` / `14` / `21` / `23` / `25` / `26` | Attribute colors, for example `colorBackground`, `colorForeground` (`PlatformColor("?attr/colorBackground")`) |
| `AndroidDeprecatedColor` | `primary_text_dark`, `primary_text_light`, `secondary_text_dark`, `secondary_text_light`, `tertiary_text_dark`, `tertiary_text_light` and their `_nodisable` variants. Deprecated in Android SDK 28. |
| `AndroidDynamicMaterialColorType`, `AndroidStaticMaterialColorType` | Material Design 3 roles: `background`, `error`, `errorContainer`, `onBackground`, `onError`, `onPrimary`, `onPrimaryContainer`, `onSecondary`, `onSurface`, `onSurfaceVariant`, `onTertiary`, `outline`, `outlineVariant`, `primary`, `primaryContainer`, `primaryFixed`, `primaryFixedDim`, `primaryInverse`, `secondary`, `secondaryContainer`, `surface`, `surfaceBright`, `surfaceContainer`, `surfaceContainerHigh`, `surfaceContainerHighest`, `surfaceContainerLow`, `surfaceContainerLowest`, `surfaceDim`, `surfaceInverse`, `surfaceVariant`, `tertiary`, `tertiaryContainer`, `tertiaryFixed`, `tertiaryFixedDim` (plus `on*` Fixed / Variant / Inverse variants) |
| `IOSBaseColor` | `darkText`, `label`, `lightText`, `link`, `opaqueSeparator`, `placeholderText`, `quaternaryLabel`, `quaternarySystemFill`, `secondaryLabel`, `secondarySystemBackground`, `secondarySystemFill`, `secondarySystemGroupedBackground`, `separator`, `systemBackground`, `systemBlue`, `systemBrown`, `systemCyan`, `systemFill`, `systemGray` to `systemGray6`, `systemGreen`, `systemGroupedBackground`, `systemIndigo`, `systemMint`, `systemOrange`, `systemPink`, `systemPurple`, `systemRed`, `systemTeal`, `systemYellow`, `tertiaryLabel`, `tertiarySystemBackground`, `tertiarySystemFill`, `tertiarySystemGroupedBackground` |

Types `AndroidBaseColor`, `AndroidBaseColorAttr`, `AndroidDynamicMaterialColor`, and `AndroidMaterialColor` combine the interfaces above with an index signature (`key: ColorValue`).

```tsx
import { Color } from 'expo-router';

Color.ios.label; // Access iOS system color
Color.android.background_light; // Access Android system color
Color.android.attr.colorPrimary; // Access Android attribute color
Color.android.material.primary; // Access Android Material Design 3 static color
Color.android.dynamic.primary; // Access Android Material Design 3 dynamic color
```

## Notes

- Platforms: android, ios.
- The color types list the known color names to enable autocomplete. They also accept any string, so TypeScript does not reject misspelled or unsupported color names.
- To ensure the colors align with the system theme on Android, use them within a component that responds to theme changes, such as by using the `useColorScheme` hook from React Native. This is especially important when using React Compiler, which can memoize components.
- Source: https://docs.expo.dev/versions/v58.0.0/sdk/router/color/ (modificationDate September 15, 2026).

## Related

- [Router](./router-api.md)
- [Router Native tabs](./router-native-tabs.md)
- [Router Split View](./router-split-view.md)
