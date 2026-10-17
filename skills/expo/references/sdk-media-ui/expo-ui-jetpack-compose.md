---
source: https://docs.expo.dev/versions/v58.0.0/sdk/ui/jetpack-compose/
---

# Jetpack Compose

`@expo/ui/jetpack-compose`: Jetpack Compose components for building fully native Android interfaces from React Native. Every component must be wrapped in a `Host`.

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

Modifiers are applied with the `modifiers` prop, in array order. Put `background` before `paddingAll` so the padding sits inside the background rather than outside it.

```tsx
import { Column, Host, Text } from '@expo/ui/jetpack-compose';
import {
  background,
  border,
  fillMaxWidth,
  paddingAll,
  shadow,
} from '@expo/ui/jetpack-compose/modifiers';

export default function ComposeModifiersExample() {
  return (
    <Host style={{ flex: 1 }}>
      <Column
        verticalArrangement={{ spacedBy: 16 }}
        modifiers={[paddingAll(16)]}>
        <Text
          color="#FFFFFF"
          modifiers={[
            fillMaxWidth(),
            shadow(4),
            background('#6750A4'),
            paddingAll(16),
          ]}>
          Background, shadow and padding
        </Text>
        <Text
          color="#1D192B"
          modifiers={[
            fillMaxWidth(),
            background('#E8DEF8'),
            border(2, '#6750A4'),
            paddingAll(16),
          ]}>
          Background, border and padding
        </Text>
      </Column>
    </Host>
  );
}
```

Settings-style row with `ListItem` slots and `useMaterialColors`:

```tsx
import {
  Column,
  Host,
  ListItem,
  Text,
  useMaterialColors,
} from '@expo/ui/jetpack-compose';

export default function ComposeSecondaryTextExample() {
  const colors = useMaterialColors();

  return (
    <Host style={{ flex: 1 }}>
      <Column>
        <ListItem>
          <ListItem.HeadlineContent>
            <Text>Chrome</Text>
          </ListItem.HeadlineContent>
          <ListItem.SupportingContent>
            <Text color={colors.onSurfaceVariant}>
              Last used: Today
            </Text>
          </ListItem.SupportingContent>
          <ListItem.TrailingContent>
            <Text color={colors.onSurfaceVariant}>1.57 GB</Text>
          </ListItem.TrailingContent>
        </ListItem>
      </Column>
    </Host>
  );
}
```

Slider flanked by icons using the `weight` modifier:

```tsx
import {
  Host,
  Icon,
  Row,
  Slider,
  useMaterialColors,
} from '@expo/ui/jetpack-compose';
import {
  paddingAll,
  weight,
} from '@expo/ui/jetpack-compose/modifiers';
import BacklightHigh from '@expo/material-symbols/backlight_high.xml';
import BacklightLow from '@expo/material-symbols/backlight_low.xml';
import { useState } from 'react';

export default function ComposeBrightnessRowExample() {
  const [brightness, setBrightness] = useState(0.5);
  const colors = useMaterialColors();

  return (
    <Host style={{ flex: 1 }}>
      <Row
        verticalAlignment="center"
        horizontalArrangement={{ spacedBy: 12 }}
        modifiers={[paddingAll(16)]}>
        <Icon
          source={BacklightLow}
          tint={colors.onSurfaceVariant}
          contentDescription="Dimmer"
        />
        <Slider
          value={brightness}
          onValueChange={setBrightness}
          modifiers={[weight(1)]}
        />
        <Icon
          source={BacklightHigh}
          tint={colors.onSurfaceVariant}
          contentDescription="Brighter"
        />
      </Row>
    </Host>
  );
}
```

## Options / Props

Components exported from `@expo/ui/jetpack-compose` (modifiers from `@expo/ui/jetpack-compose/modifiers`):

| Component | Description |
| --- | --- |
| `AlertDialog` | Native alert dialogs. |
| `Badge` | Status indicators and counts. |
| `BadgedBox` | Overlay badges on content. |
| `BasicAlertDialog` | Dialogs with custom content. |
| `Box` | Stacking child elements. |
| `Button` | Native Material3 buttons. |
| `Card` | Content in a styled container. |
| `Carousel` | Scrollable collections of items. |
| `Checkbox` | Selection controls. |
| `Chip` | Compact elements. |
| `Column` | Place children vertically. |
| `DateTimePicker` | Select dates and times. |
| `Divider` | Visual separators. |
| `DockedSearchBar` | Inline search input. |
| `DropdownMenu` | Dropdown menus. |
| `ExposedDropdownMenuBox` | Dropdown menu with a customizable anchor. |
| `FloatingActionButton` | Floating action buttons following Material Design 3. |
| `FlowRow` | Wrap children horizontally. |
| `HorizontalFloatingToolbar` | Floating action bar. |
| `HorizontalPager` | Swipeable pages. |
| `Host` | Bridges React Native and Jetpack Compose. |
| `Icon` | Icons. |
| `IconButton` | Native Material3 icon buttons. |
| `Image` | Images. |
| `LazyColumn` | Scrollable lists. |
| `LazyRow` | Horizontally scrolling lists. |
| `ListItem` | Structured list entries (slots: `LeadingContent`, `HeadlineContent`, `SupportingContent`, `TrailingContent`). |
| `LoadingIndicator` | Loading state. |
| `Material Colors` | Read the Material 3 color palette (including Dynamic Colors) from JavaScript (`useMaterialColors`). |
| `ModalBottomSheet` | Content presented from the bottom of the screen. |
| `Modifiers` | Layout modifiers for @expo/ui components. |
| `NavigationBar` | Material 3 bottom navigation. |
| `Progress indicators` | Operation status. |
| `PullToRefreshBox` | Pull-to-refresh interactions. |
| `RadioButton` | Single-selection controls. |
| `RNHostView` | Enables React Native views inside Jetpack Compose. |
| `Row` | Place children horizontally. |
| `SearchBar` | Search input. |
| `SegmentedButton` | Single or multi-choice selection. |
| `Shape` | Geometric shapes. |
| `Slider` | Select values from a range. |
| `Snackbar` | Brief notification at the bottom of the screen. |
| `Spacer` | Flexible space between elements. |
| `Surface` | Styled content containers. |
| `Switch` | Toggle controls. |
| `Text` | Styled text. |
| `TextField` | Native Material3 text input. |
| `ToggleButton` | Native Material3 toggle buttons. |
| `Tooltip` | Contextual information on long-press. |
| `useNativeState` | Hook creating observable state shared between JavaScript and native Jetpack Compose views. |

## Notes

- Platforms: Android, included in Expo Go. Package `@expo/ui`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-ui`. Pinned to Expo SDK 58 docs (modificationDate September 23, 2026). The official section has 52 pages; per-component pages (`/versions/v58.0.0/sdk/ui/jetpack-compose/<name>/`) and the "Extending with Jetpack Compose" page (custom components and modifiers) are not collected here.
- Using a component requires wrapping it in `Host` (a container for Jetpack Compose views). Flexbox applies to `Host` only; inside, use `Row` and `Column`.
- Distinct from native Jetpack Compose: these are `@expo/ui` React wrappers (`Host`, `Button` with `onClick`, `modifiers` arrays), not `androidx.compose.*`. See the android-compose-ui and android-compose-components skills for the native Compose APIs, and apple-swiftui for the iOS counterpart; Expo UI SwiftUI wrappers are in swift-ui here.

## Related

- [Expo UI](./expo-ui.md)
- [SwiftUI](./expo-ui-swift-ui.md)
- [Universal](./expo-ui-universal.md)
- [Drop-in replacements](./expo-ui-drop-in-replacements.md)
