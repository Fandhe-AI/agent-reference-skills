---
source: https://docs.expo.dev/versions/v58.0.0/sdk/router/split-view/
---

# Router Split View

`expo-router/unstable-split-view` is a submodule of `expo-router` that exports components to build split view layouts using platform-native system split views. Alpha API, iOS only.

## Signature / Usage

```js
import { SplitView } from 'expo-router/unstable-split-view';
```

Two-column layout (sidebar plus main content):

```tsx
import { Link } from 'expo-router';
import { SplitView } from 'expo-router/unstable-split-view';
import { Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-screens/experimental';

export default function Layout() {
  return (
    <SplitView>
      <SplitView.Column>
        <SafeAreaView edges={{ left: true, top: true }} style={{ flex: 1 }}>
          <Link href="/inbox">
            <Pressable style={{ padding: 16 }}>
              <Text>Inbox</Text>
            </Pressable>
          </Link>
        </SafeAreaView>
      </SplitView.Column>
    </SplitView>
  );
}
```

Inspector (supplementary column sliding in from the trailing edge):

```tsx
<SplitView>
  <SplitView.Column>{/* Sidebar */}</SplitView.Column>
  <SplitView.Inspector>
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Inspector Panel</Text>
    </View>
  </SplitView.Inspector>
</SplitView>
```

Programmatically show a column on iPhone (collapsed):

```tsx
import { useRef } from 'react';
import { Pressable, Text } from 'react-native';
import { SplitView } from 'expo-router/unstable-split-view';
import type { SplitHostCommands } from 'react-native-screens/experimental';

export default function Layout() {
  const ref = useRef<SplitHostCommands>(null);

  return (
    <SplitView ref={ref} topColumnForCollapsing="primary">
      <SplitView.Column>
        <Pressable onPress={() => ref.current?.show('secondary')}>
          <Text>Show main content</Text>
        </Pressable>
      </SplitView.Column>
    </SplitView>
  );
}
```

## Options / Props

| Component | Name | Type | Description |
| --- | --- | --- | --- |
| `SplitView` (iOS) | `activityEnabled` | `boolean` (default `false`) | Enables React Activity for screens rendered by the detail slot. |
| `SplitView` | `children` | `ReactNode` | Only `SplitView.Column` and `SplitView.Inspector` are accepted as direct children. |
| `SplitView` | inherited | `Omit<SplitHostProps, 'children'>` | Full list of supported props is `SplitHostProps` in `react-native-screens`. |
| `SplitView` | `topColumnForCollapsing` | `primary`, `supplementary`, or `secondary` | Which column is displayed when the split view is collapsed (iPhone). System default when not set. |
| `SplitView.Column` (iOS) | `children` | `ReactNode` | Defines additional columns; you can add up to two columns before the main content area. |
| `SplitView.Inspector` (iOS 26+) | `children` | `ReactNode` | Supplementary column that slides in from the trailing edge. |

## Notes

- SplitView is an alpha API available on iOS only in Expo SDK 55 and later. The API is subject to breaking changes and is not ready for production usage.
- On other platforms the `SplitView` component falls back to rendering as a standard `Slot` navigator.
- On iPhone, `SplitView` collapses all columns into a single view; only one column is visible at a time. Going back to a previous column uses the system back button.
- The `.show()` method requires `react-native-screens` 4.24.0 or later. SDK 55 bundles `~4.23.0`, so install `react-native-screens@~4.24.0` manually to use it.
- Known limitations: only one `SplitView` in the navigation hierarchy (nesting errors); it cannot be used inside another navigator except `Slot` and must be used at the root layout level; other children than `SplitView.Column` / `SplitView.Inspector` are ignored with a warning; the header (navigation bar) within columns cannot be customized yet; the API surface is minimal.
- Source: https://docs.expo.dev/versions/v58.0.0/sdk/router/split-view/ (modificationDate September 16, 2026).

## Related

- [Router](./router-api.md)
- [Router Native tabs](./router-native-tabs.md)
- [Router Color](./router-color.md)
