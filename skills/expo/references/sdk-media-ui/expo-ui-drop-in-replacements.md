---
source: https://docs.expo.dev/versions/v58.0.0/sdk/ui/drop-in-replacements/
---

# Drop-in replacements

API-compatible replacements for popular React Native community libraries, powered by `@expo/ui` native components (Jetpack Compose on Android and SwiftUI on iOS).

## Signature / Usage

```sh
npx expo install @expo/ui
```

## Options / Props

| Component | Replaces | Description |
| --- | --- | --- |
| `BottomSheet` | @gorhom/bottom-sheet | A bottom sheet compatible with @gorhom/bottom-sheet. |
| `DateTimePicker` | @react-native-community/datetimepicker | A date and time picker compatible with @react-native-community/datetimepicker. |
| `MaskedView` | @react-native-masked-view/masked-view | A masked view compatible with @react-native-masked-view/masked-view. |
| `Menu` | @react-native-menu/menu | A menu compatible with @react-native-menu/menu. |
| `PagerView` | react-native-pager-view | A horizontally paged view compatible with react-native-pager-view. |
| `Picker` | @react-native-picker/picker | A picker compatible with @react-native-picker/picker. |
| `SegmentedControl` | @react-native-segmented-control/segmented-control | A segmented control compatible with @react-native-segmented-control/segmented-control. |
| `Slider` | @react-native-community/slider | A slider compatible with @react-native-community/slider. |

## Notes

- Platforms: Android, iOS, Web, included in Expo Go. Package `@expo/ui`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-ui`. Pinned to Expo SDK 58 docs (modificationDate September 15, 2026).
- The source page for this section is only an index (no code example). The install command above comes from the sibling Expo UI pages. The per-component pages (`/versions/v58.0.0/sdk/ui/drop-in-replacements/<name>/`) are not collected here.
- These are `@expo/ui` components, not the native Jetpack Compose or SwiftUI API references; see the android-compose-components and apple-swiftui skills for those.

## Related

- [Expo UI](./expo-ui.md)
- [Jetpack Compose](./expo-ui-jetpack-compose.md)
- [SwiftUI](./expo-ui-swift-ui.md)
- [Universal](./expo-ui-universal.md)
