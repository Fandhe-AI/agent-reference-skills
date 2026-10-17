---
source: https://docs.expo.dev/versions/v58.0.0/sdk/ui/
---

# Expo UI

`@expo/ui`: a set of native input components for building fully native interfaces with Jetpack Compose and SwiftUI from React. Components map one to one to their native counterparts and can be adopted one screen at a time or used for a whole app.

## Signature / Usage

```sh
npx expo install @expo/ui
```

```tsx
import { Host, Button } from '@expo/ui/jetpack-compose';

export function SaveButton() {
  return (
    <Host matchContents>
      <Button onClick={() => alert('Saved!')}>Save changes</Button>
    </Host>
  );
}
```

```tsx
import { Host, Button } from '@expo/ui/swift-ui';

export function SaveButton() {
  return (
    <Host style={{ flex: 1 }}>
      <Button label="Save changes" />
    </Host>
  );
}
```

## Options / Props

### Available platforms

| Import path | Description | Page |
| --- | --- | --- |
| `@expo/ui/jetpack-compose` | Native Android interfaces with Jetpack Compose components. | [expo-ui-jetpack-compose.md](./expo-ui-jetpack-compose.md) |
| `@expo/ui/swift-ui` | Native iOS interfaces with SwiftUI components. | [expo-ui-swift-ui.md](./expo-ui-swift-ui.md) |
| `@expo/ui` (package root) | Universal components that run on Android, iOS and web from a single source. Start here for one component tree. | [expo-ui-universal.md](./expo-ui-universal.md) |
| drop-in replacements | API-compatible replacements for popular React Native community libraries. | [expo-ui-drop-in-replacements.md](./expo-ui-drop-in-replacements.md) |

### Available components

Jetpack Compose: `AlertDialog`, `Badge`, `BadgedBox`, `BasicAlertDialog`, `Box`, `Button`, `Card`, `Carousel`, `Checkbox`, `Chip`, `Column`, `DateTimePicker`, `Divider`, `DockedSearchBar`, `DropdownMenu`, `ExposedDropdownMenuBox`, `FloatingActionButton`, `FlowRow`, `HorizontalFloatingToolbar`, `HorizontalPager`, `Host`, `Icon`, `IconButton`, `Image`, `LazyColumn`, `LazyRow`, `ListItem`, `LoadingIndicator`, `Material Colors`, `ModalBottomSheet`, `Modifiers`, `NavigationBar`, `Progress indicators`, `PullToRefreshBox`, `RadioButton`, `RNHostView`, `Row`, `SearchBar`, `SegmentedButton`, `Shape`, `Slider`, `Snackbar`, `Spacer`, `Surface`, `Switch`, `Text`, `TextField`, `ToggleButton`, `Tooltip`, `useNativeState`.

SwiftUI: `AccessoryWidgetBackground`, `Alert`, `ArrangementView`, `BottomSheet`, `Button`, `ColorPicker`, `ConfirmationDialog`, `ContextMenu`, `ControlGroup`, `DatePicker`, `DisclosureGroup`, `Divider`, `Form`, `Gauge`, `Group`, `Host`, `HStack`, `Image`, `Label`, `LazyHStack`, `LazyVStack`, `Link`, `List`, `Menu`, `Modifiers`, `Namespace`, `NavigationSplitView`, `NavigationStack`, `Overlay`, `Picker`, `Popover`, `ProgressView`, `RNHostView`, `ScrollView`, `Section`, `SecureField`, `Slider`, `Spacer`, `SwipeActions`, `TabView`, `Text`, `TextField`, `Toggle`, `Toolbar`, `useNativeState`, `VStack`, `ZStack`.

Drop-in replacements: `BottomSheet` (@gorhom/bottom-sheet), `DateTimePicker` (@react-native-community/datetimepicker), `MaskedView` (@react-native-masked-view/masked-view), `Menu` (@react-native-menu/menu), `PagerView` (react-native-pager-view), `Picker` (@react-native-picker/picker), `SegmentedControl` (@react-native-segmented-control/segmented-control), `Slider` (@react-native-community/slider).

Universal: `BottomSheet`, `Button`, `Checkbox`, `Collapsible`, `Column`, `FieldGroup`, `Host`, `Icon`, `List`, `Picker`, `RNHostView`, `Row`, `ScrollView`, `Slider`, `Spacer`, `Switch`, `Text`, `TextInput`.

## Notes

- Platforms: Android, iOS, tvOS, included in Expo Go. Package `@expo/ui`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-ui`. Pinned to Expo SDK 58 docs (modificationDate September 23, 2026). Per-component pages (about 50 for Jetpack Compose, 50 for SwiftUI, plus universal and drop-in pages) exist in the official docs but are not collected here.
- Every Expo UI component must be wrapped in a `Host`, the bridge between React Native and the native UI toolkit (like `<svg>` in the DOM or `<Canvas>` in react-native-skia). On iOS it uses `UIHostingController`. Flexbox styles apply to the `Host` itself; inside the native context Yoga is not available, so lay out with `Row` / `Column` (Android) or `HStack` / `VStack` (iOS).
- `@expo/ui/swift-ui` renders SwiftUI views that exist only on Apple platforms; it cannot be used on Android or web. Use `@expo/ui/jetpack-compose` for Android, or the universal components for one tree across Android, iOS and web.
- React Native components can be placed as JSX children of Expo UI components (an automatic `UIViewRepresentable` wrapper is created on iOS). SwiftUI controls the UIKit view's `center`, `bounds`, `frame` and `transform`, so do not set those directly. Once you render React Native components you leave the SwiftUI context; reintroduce a `Host` to add Expo UI components again.
- Expo UI is a primitives library that exposes native Jetpack Compose and SwiftUI components to JavaScript, not an opinionated design kit like react-native-paper or react-native-elements.
- Distinct from the native API references: these are `@expo/ui` wrappers, not the Android Jetpack Compose or Apple SwiftUI documentation. See the android-compose-ui and android-compose-components skills for Jetpack Compose APIs and the apple-swiftui skill for SwiftUI APIs.
- Official extras: example app source in `expo/expo` (`apps/native-component-list/src/screens/UI`), the Hot Chocolate app (`expo/hot-chocolate`), and an Expo UI multiplatform TV demo.

## Related

- [Jetpack Compose](./expo-ui-jetpack-compose.md)
- [SwiftUI](./expo-ui-swift-ui.md)
- [Universal](./expo-ui-universal.md)
- [Drop-in replacements](./expo-ui-drop-in-replacements.md)
