---
source: https://docs.expo.dev/versions/v58.0.0/sdk/ui/swift-ui/
---

# SwiftUI

`@expo/ui/swift-ui`: SwiftUI components for building fully native iOS interfaces from React Native. To cross the boundary from React Native (UIKit) to SwiftUI, wrap components in `Host` (rendered with `UIHostingController`).

## Signature / Usage

```sh
npx expo install @expo/ui
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

Modifiers (imported from `@expo/ui/swift-ui/modifiers`, passed as an array to `modifiers`). The `glassEffect` modifier requires Xcode 26+ and iOS 26+.

```tsx
import { Host, Text } from '@expo/ui/swift-ui';
import {
  font,
  glassEffect,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import { MeshGradientView } from 'expo-mesh-gradient';
import { View } from 'react-native';

export default function GlassEffectExample() {
  return (
    <View style={{ flex: 1 }}>
      <MeshGradientView
        style={{ flex: 1 }}
        columns={3}
        rows={3}
        colors={[
          'red',
          'purple',
          'indigo',
          'orange',
          'white',
          'blue',
          'yellow',
          'green',
          'cyan',
        ]}
        points={[
          [0.0, 0.0],
          [0.5, 0.0],
          [1.0, 0.0],
          [0.0, 0.5],
          [0.5, 0.5],
          [1.0, 0.5],
          [0.0, 1.0],
          [0.5, 1.0],
          [1.0, 1.0],
        ]}
      />
      <Host
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}>
        <Text
          modifiers={[
            font({ size: 32 }),
            padding({
              all: 16,
            }),
            glassEffect({
              glass: {
                variant: 'clear',
              },
            }),
          ]}>
          Glass effect text
        </Text>
      </Host>
    </View>
  );
}
```

Slider with icons in a `Form`:

```tsx
import { useState } from 'react';
import {
  Form,
  Host,
  HStack,
  Image,
  List,
  Section,
  Slider,
  Spacer,
  Text,
  Toggle,
} from '@expo/ui/swift-ui';
import { padding } from '@expo/ui/swift-ui/modifiers';

export default function SliderWithIconsExample() {
  const [brightness, setBrightness] = useState(0.5);
  const [trueToneEnabled, setTrueToneEnabled] = useState(true);

  return (
    <Host style={{ flex: 1 }}>
      <Form>
        <Section
          header={<Text>Brightness</Text>}
          footer={
            <Text>
              Automatically adapt iPhone display based on ambient
              lighting conditions to make colors appear consistent
              in different environments.
            </Text>
          }>
          <List>
            <HStack modifiers={[padding({ vertical: 6 })]}>
              <Image
                systemName="sun.min.fill"
                size={22}
                color="#8E8E93"
              />
              <Spacer />
              <Slider
                value={brightness}
                onValueChange={setBrightness}
              />
              <Spacer />
              <Image
                systemName="sun.max.fill"
                size={22}
                color="#8E8E93"
              />
            </HStack>
            <Toggle
              label="True Tone"
              isOn={trueToneEnabled}
              onIsOnChange={setTrueToneEnabled}
            />
          </List>
        </Section>
      </Form>
    </Host>
  );
}
```

Secondary text with a hierarchical `foregroundStyle`:

```tsx
<Text
  modifiers={[
    foregroundStyle({
      type: 'hierarchical',
      style: 'secondary',
    }),
    font({ size: 14 }),
  ]}>
  Save up to 280.7 MB.
</Text>
```

## Options / Props

Components exported from `@expo/ui/swift-ui`:

| Component | Description |
| --- | --- |
| `AccessoryWidgetBackground` | Adaptive background view with a standard appearance based on the widget's environment. |
| `Alert` | Native iOS alert dialogs. |
| `ArrangementView` | Arranges a primary and a secondary view with an adaptive layout. |
| `BottomSheet` | Content presented from the bottom of the screen. |
| `Button` | Native buttons. |
| `ColorPicker` | Select colors. |
| `ConfirmationDialog` | Confirmation prompts. |
| `ContextMenu` | Context menus. |
| `ControlGroup` | Group interactive controls. |
| `DatePicker` | Select dates and times. |
| `DisclosureGroup` | Expandable content. |
| `Divider` | Visual separators. |
| `Form` | Structured layout for collecting user input. |
| `Gauge` | Progress with visual indicators. |
| `Group` | Group views without affecting layout. |
| `Host` | Enables SwiftUI components in React Native. |
| `HStack` | Horizontal layouts. |
| `Image` | Display SF Symbols. |
| `Label` | Text with an icon. |
| `LazyHStack` / `LazyVStack` | Lazy horizontal / vertical layouts. |
| `Link` | Clickable links. |
| `List` | Scrollable lists of items. |
| `Menu` | Dropdown menus. |
| `Modifiers` | View modifiers for appearance and behavior (from `@expo/ui/swift-ui/modifiers`). |
| `Namespace` | Create Namespaces in SwiftUI. |
| `NavigationSplitView` | Two or three columns side by side. |
| `NavigationStack` | Root view that can push other views on top of it. |
| `Overlay` | Layer content on top of another view. |
| `Picker` | Select options from a list. |
| `Popover` | Content in a floating overlay. |
| `ProgressView` | Progress indicators. |
| `RNHostView` | Enables React Native views inside SwiftUI. |
| `ScrollView` | Scrollable content. |
| `Section` | Group content within lists and forms. |
| `SecureField` | Password input. |
| `Slider` | Select values from a range. |
| `Spacer` | Flexible spacing. |
| `SwipeActions` | Leading and trailing swipe actions on row content. |
| `TabView` | Paged or tabbed content. |
| `Text` | Styled text with nested text support. |
| `TextField` | Text input. |
| `Toggle` | Native toggles. |
| `Toolbar` | Places items in the toolbar of the wrapped view. |
| `useNativeState` | Hook creating observable state shared between JavaScript and native SwiftUI views. |
| `VStack` / `ZStack` | Vertical / overlapping layouts. |

## Notes

- Platforms: iOS, tvOS, included in Expo Go. Package `@expo/ui`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-ui`. Pinned to Expo SDK 58 docs (modificationDate September 23, 2026). The official section has 50 pages; per-component pages (`/versions/v58.0.0/sdk/ui/swift-ui/<name>/`) and the "Extending with SwiftUI" page are not collected here.
- `@expo/ui/swift-ui` works only on Apple platforms; use `@expo/ui/jetpack-compose` for Android or the universal components for cross-platform.
- `glassEffect` (Liquid Glass) requires Xcode 26+ and iOS 26+. This is distinct from the `expo-glass-effect` package (see the GlassEffect page).
- Distinct from native SwiftUI: these are `@expo/ui` React wrappers (`Host`, `HStack` with `modifiers` arrays), not Apple's SwiftUI API. See the apple-swiftui skill for the native SwiftUI reference and android-compose-ui / android-compose-components for Compose.
- Inside a `Link` from `expo-router` the example uses `buttonStyle('plain')` to avoid the default blue button style, and text inside needs an explicit `foregroundStyle`.

## Related

- [Expo UI](./expo-ui.md)
- [Jetpack Compose](./expo-ui-jetpack-compose.md)
- [Universal](./expo-ui-universal.md)
- [GlassEffect](./glass-effect.md)
- [Symbols](./symbols.md)
