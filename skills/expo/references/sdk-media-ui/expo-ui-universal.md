---
source: https://docs.expo.dev/versions/v58.0.0/sdk/ui/universal/
---

# Universal

Cross-platform `@expo/ui` components for shared UIs across Android, iOS and web. A single-API layer: on Android they delegate to `@expo/ui/jetpack-compose`, on iOS to `@expo/ui/swift-ui`, and on web they are JS implementations using `react-dom` or `react-native-web`, chosen per component.

## Signature / Usage

```sh
npx expo install @expo/ui
```

```tsx
import { useColorScheme } from 'react-native';
import { Host, Column, Button, Text } from '@expo/ui';

export default function UniversalExample() {
  const colorScheme = useColorScheme();

  return (
    <Host style={{ flex: 1 }}>
      <Column spacing={12} alignment="center">
        <Text textStyle={{ color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }}>
          Hello, world!
        </Text>
        <Button label="Press me" onPress={() => alert('Pressed')} />
      </Column>
    </Host>
  );
}
```

## Options / Props

| Component | Description |
| --- | --- |
| `BottomSheet` | A modal sheet that slides up from the bottom of the screen. |
| `Button` | A pressable button with multiple visual variants. |
| `Checkbox` | A toggle control that represents a checked or unchecked state. |
| `Collapsible` | A labelled tappable header that toggles visibility of its content. |
| `Column` | A vertical layout container for universal @expo/ui components. |
| `FieldGroup` | A scrollable container of grouped settings-style rows. |
| `Host` | A cross-platform Host component that wraps universal @expo/ui content. |
| `Icon` | A platform-native icon: SF Symbol on iOS, Material Symbol on Android. |
| `List` | A virtualized vertical container of rows, paired with a tappable ListItem primitive. |
| `Picker` | A single-selection input with menu and wheel appearances. |
| `RNHostView` | A cross-platform component for hosting React Native views inside @expo/ui views. |
| `Row` | A horizontal layout container for universal @expo/ui components. |
| `ScrollView` | A scrollable container that supports vertical or horizontal scrolling. |
| `Slider` | A control for selecting a value from a continuous or stepped range. |
| `Spacer` | A layout spacer that produces empty space between siblings. |
| `Switch` | A toggle control that switches between on and off states. |
| `Text` | A component for displaying styled text content. |
| `TextInput` | A text input backed by native SwiftUI and Jetpack Compose components, with a React Native-compatible API. |

## Notes

- Platforms: Android, iOS, Web, included in Expo Go. Package `@expo/ui`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-ui`. Pinned to Expo SDK 58 docs (modificationDate September 15, 2026). Per-component pages (`/versions/v58.0.0/sdk/ui/universal/<name>/`) are not collected here.
- Universal components must still be wrapped in a universal `Host`, but everything including `Host` is imported from the package root `@expo/ui`; the `Host` dispatches to the platform-native host, so there is no need to import `@expo/ui/swift-ui` or `@expo/ui/jetpack-compose` directly.
- Use universal components when you want one component tree that runs unmodified on Android, iOS and web, keeping the platform-native look on Android and iOS. Use `@expo/ui/jetpack-compose` or `@expo/ui/swift-ui` when you need platform-specific controls, modifiers or behavior the universal API does not surface.
- These are `@expo/ui` wrappers, not the native API references; see the android-compose-ui and android-compose-components skills (Jetpack Compose) and the apple-swiftui skill (SwiftUI) for native APIs.

## Related

- [Expo UI](./expo-ui.md)
- [Jetpack Compose](./expo-ui-jetpack-compose.md)
- [SwiftUI](./expo-ui-swift-ui.md)
- [Drop-in replacements](./expo-ui-drop-in-replacements.md)
