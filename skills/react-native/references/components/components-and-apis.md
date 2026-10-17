---
source: https://reactnative.dev/docs/0.87/components-and-apis
---

# Core Components and APIs

Overview of the built-in Core Components, grouped by category (Basic, User Interface, List Views, Android-specific, iOS-specific, Others).

## Signature / Usage

```text
Basic Components
- View: The most fundamental component for building a UI.
- Text: A component for displaying text.
- Image: A component for displaying images.
- TextInput: A component for inputting text into the app via a keyboard.
- Pressable: A wrapper component that can detect various stages of press interactions on any of its children.
- ScrollView: Provides a scrolling container that can host multiple components and views.
- StyleSheet: Provides an abstraction layer similar to CSS stylesheets.

User Interface
- Button: A basic button component for handling touches that should render nicely on any platform.
- Switch: Renders a boolean input.

List Views
- FlatList: A component for rendering performant scrollable lists.
- SectionList: Like FlatList, but for sectioned lists.
```

### Categories

| Category | Items |
| --- | --- |
| Basic Components | View, Text, Image, TextInput, Pressable, ScrollView, StyleSheet |
| User Interface | Button, Switch |
| List Views | FlatList, SectionList |
| Android Components and APIs | BackHandler, DrawerLayoutAndroid, PermissionsAndroid, ToastAndroid |
| iOS Components and APIs | ActionSheetIOS |
| Others | ActivityIndicator, Alert, Animated, Dimensions, KeyboardAvoidingView, Linking, Modal, PixelRatio, ReactNativeVersion, RefreshControl, StatusBar |

## Notes

- List view components (`FlatList`, `SectionList`) only render elements that are currently showing on the screen, unlike the more generic `ScrollView`. This makes them a performant choice for displaying long lists of data.
- Many of the Android components "provide wrappers for commonly used Android classes"; the iOS ones "provide wrappers for commonly used UIKit classes".
- For libraries beyond the bundled components and APIs, the original page refers to the "finding libraries" guide.
- This is the React Native core component index (imported from `react-native`, rendered as native views). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [View](./view.md)
- [Text](./text.md)
- [Image](./image.md)
- [TextInput](./textinput.md)
- [Pressable](./pressable.md)
- [ScrollView](./scrollview.md)
- [Button](./button.md)
- [Switch](./switch.md)
- [FlatList](./flatlist.md)
- [SectionList](./sectionlist.md)
