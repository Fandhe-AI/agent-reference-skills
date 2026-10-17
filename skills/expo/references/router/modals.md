---
source: https://docs.expo.dev/router/advanced/modals/
---

# Modals

Present content on top of the existing screen, using React Native's `Modal` component or an Expo Router modal screen (a route in the navigation system).

## Signature / Usage

Modal route: create **src/app/modal.tsx** and set `presentation` in the root layout.

```tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
```

```tsx
import { Link } from 'expo-router';

<Link href="/modal">Open modal</Link>
```

Dismiss on web (provide dismiss behavior manually):

```tsx
import { Link, router} from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Modal() {
  const isPresented = router.canGoBack();

  return (
    <View style={styles.container}>
      <Text>Modal screen</Text>
      {isPresented && <Link href="../">Dismiss modal</Link>}
    </View>
  );
}
```

iOS status bar appearance inside the modal:

```tsx
<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
```

Deep-linked modals need an anchor:

```tsx
export const unstable_settings = {
  anchor: 'index', // Anchor to the index route
};
```

Form sheet with detents:

```tsx
<Stack.Screen
  name="modal"
  options={{
    presentation: 'formSheet',
    sheetAllowedDetents: [0.25, 0.5, 1],
    sheetInitialDetentIndex: 0,
    sheetGrabberVisible: true,
    sheetCornerRadius: 24,
    sheetLargestUndimmedDetentIndex: 1,
  }}
/>
```

Android-only sheet footer:

```tsx
<Stack.Screen
  name="modal"
  options={{
    presentation: 'formSheet',
    sheetAllowedDetents: [0.5, 1],
    unstable_sheetFooter: () => (
      <View style={{ padding: 16, backgroundColor: 'white' }}>
        <Button title="Confirm" onPress={() => {}} />
      </View>
    ),
  }}
/>
```

## Options / Props

Sheet options:

| Name | Type | Description |
| --- | --- | --- |
| `sheetAllowedDetents` | `number[]` or `'fitToContents'` | Snap positions as fractions of screen height between 0 and 1, ascending (`[0.25, 0.5, 1]`), or size to content |
| `sheetInitialDetentIndex` | `number \| 'last'` | Index of the detent where the sheet opens (default: `0`) |
| `sheetGrabberVisible` | `boolean` | Shows a grabber handle at the top of the sheet (iOS only) |
| `sheetCornerRadius` | `number` | Corner radius of the sheet in pixels |
| `sheetLargestUndimmedDetentIndex` | `number \| 'none' \| 'last'` | Largest detent index that keeps the background undimmed |
| `unstable_sheetFooter` | `() => ReactElement` | Android-only experimental footer visible at all detents |

`presentation` values:

| Option | Description |
| --- | --- |
| `card` | New screen pushed onto a stack. iOS slides from the side; Android animation varies by OS version and theme |
| `modal` | Presented modally, allowing a nested stack inside the screen |
| `transparentModal` | Presented modally with the previous screen remaining visible (translucent background) |
| `containedModal` | Android falls back to `modal`. iOS uses `UIModalPresentationCurrentContext` |
| `containedTransparentModal` | Android falls back to `transparentModal`. iOS uses `UIModalPresentationOverCurrentContext` |
| `fullScreenModal` | Android falls back to `modal`. iOS uses `UIModalPresentationFullScreen` |
| `formSheet` | Bottom sheet with configurable detents |

## Notes

- Android: the modal slides on top; dismiss with the back button. iOS: slides from the bottom; swipe down to dismiss. Web: presented as a separate route; dismiss behavior must be provided manually.
- Without an anchor, the screen behind a deep-linked modal is wiped away, leaving no navigation context. For nested stacks, define the anchor on the nested stack.
- By default on iOS the modal has a dark background that hides the status bar.
- `fitToContents` requires explicit content sizing; `flex: 1` is not supported there. Android supports a maximum of 3 detents; iOS accepts any number.
- SDK 55 and later: `flex: 1` works correctly on iOS with custom numeric detents.
- Android form sheets use the platform bottom sheet: native stack headers and nested stack navigators are not supported inside form sheet screens (`headerShown`, `title` and header buttons do not render); render titles and actions as sheet content.
- `unstable_sheetFooter` is Android-only and experimental; it may change in future releases.
- Use React Native's `Modal` for standalone interactions and temporary alerts; use a modal screen for complex flows that belong to the navigation system.
- Source fetched 2026-10-17.

## Related

- [Stack](./stack.md)
- [Navigation layouts](./navigation-layouts.md)
- [Common navigation patterns](./common-navigation-patterns.md)
