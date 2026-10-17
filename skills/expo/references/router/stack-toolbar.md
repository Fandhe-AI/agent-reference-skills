---
source: https://docs.expo.dev/router/advanced/stack-toolbar/
---

# Stack Toolbar

Add native toolbar items (buttons, menus, custom views) to Stack screens on Android and iOS, in the header or the bottom toolbar.

## Signature / Usage

Header buttons with `placement="right"` or `placement="left"` (iOS shown; on Android `icon` is an image source):

```tsx
import { useState } from 'react';
import { Stack } from 'expo-router';
import { View, Text, Alert } from 'react-native';

export default function NoteScreen() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon={isFavorite ? 'star.fill' : 'star'}
          onPress={() => setIsFavorite(!isFavorite)}
        />
        <Stack.Toolbar.Button icon="square.and.arrow.up" onPress={() => Alert.alert('Share')} />
      </Stack.Toolbar>
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button icon="sidebar.left" onPress={() => Alert.alert('Sidebar')} />
      </Stack.Toolbar>

      <View style={{ flex: 1, padding: 16 }}>
        <Text>Note content...</Text>
      </View>
    </>
  );
}
```

Same icon on Android and iOS (Material Symbols via `@expo/material-symbols`, installed with `npx expo install @expo/material-symbols`):

```tsx
import Star from '@expo/material-symbols/star.xml';

<Stack.Toolbar.Button
  icon={process.env.EXPO_OS === 'ios' ? 'star.fill' : Star}
  onPress={() => {}}
/>;
```

The remaining fragments are excerpts of the JSX returned by a screen component like the one above. They assume the same imports (`Stack` from `expo-router`, `Alert` / `Pressable` from `react-native`, plus `SymbolView` and `bellIcon` from your own setup) and your own `useState` values (`sortBy`, `showHiddenFiles`, `unreadCount`, `isEditing` and their setters).

Menus with nested submenus (iOS shown):

```tsx
<Stack.Toolbar>
  <Stack.Toolbar.Menu icon="ellipsis.circle">
    {/* Inline submenu - options appear directly in the menu */}
    <Stack.Toolbar.Menu inline title="Sort By">
      <Stack.Toolbar.MenuAction isOn={sortBy === 'name'} onPress={() => setSortBy('name')}>
        Name
      </Stack.Toolbar.MenuAction>
    </Stack.Toolbar.Menu>

    {/* Nested submenu - opens as a separate menu */}
    <Stack.Toolbar.Menu title="Preferences">
      <Stack.Toolbar.MenuAction
        isOn={showHiddenFiles}
        onPress={() => setShowHiddenFiles(!showHiddenFiles)}>
        Show Hidden Files
      </Stack.Toolbar.MenuAction>
    </Stack.Toolbar.Menu>
  </Stack.Toolbar.Menu>
</Stack.Toolbar>
```

Bottom toolbar (no `placement`, defaults to `"bottom"`):

```tsx
<Stack.Toolbar>
  <Stack.Toolbar.Button icon="photo.on.rectangle" onPress={() => Alert.alert('Select')}>
    Select
  </Stack.Toolbar.Button>
  <Stack.Toolbar.Spacer />
  <Stack.Toolbar.Button icon="plus" onPress={() => Alert.alert('Add')}>
    Add
  </Stack.Toolbar.Button>
</Stack.Toolbar>
```

Badges and labels in header placements:

```tsx
<Stack.Toolbar placement="right">
  <Stack.Toolbar.Button
    icon={process.env.EXPO_OS === 'ios' ? 'bell' : bellIcon}
    onPress={() => {}}>
    <Stack.Toolbar.Label>Notifications</Stack.Toolbar.Label>
    {unreadCount > 0 && <Stack.Toolbar.Badge>{String(unreadCount)}</Stack.Toolbar.Badge>}
  </Stack.Toolbar.Button>
</Stack.Toolbar>
```

Custom view and dynamic visibility:

```tsx
<Stack.Toolbar>
  <Stack.Toolbar.View>
    <Pressable onPress={() => Alert.alert('Filter pressed')}>
      <SymbolView name={{ ios: 'line.3.horizontal.decrease.circle', android: 'filter_list' }} size={24} />
    </Pressable>
  </Stack.Toolbar.View>
</Stack.Toolbar>

<Stack.Toolbar.Button hidden={isEditing} icon="pencil" onPress={() => setIsEditing(true)} />
```

## Options / Props

| Component / prop | Description |
| --- | --- |
| `Stack.Toolbar` `placement` | `"left"`, `"right"` or omitted (`"bottom"`) |
| `Stack.Toolbar.Button` | Toolbar button; `icon` (SF Symbol name on iOS, `ImageSourcePropType` on Android), `image` (iOS bottom toolbar, from `useImage`), `iconRenderingMode` (`'template'` default, or `"original"`), `hidden`, `onPress` |
| `Stack.Toolbar.Menu` | Dropdown menu; `icon`, `title`, `inline` for inline submenus |
| `Stack.Toolbar.MenuAction` | Menu item; `icon`, `isOn`, `destructive`, `onPress` |
| `Stack.Toolbar.Spacer` | Space between items; iOS without `width` is flexible, Android always needs `width` |
| `Stack.Toolbar.Icon` / `Label` / `Badge` | Compose button content; `Icon` accepts a `src` prop for cross-platform icons; Badge only in header placements |
| `Stack.Toolbar.View` | Embeds any React Native component |
| `Stack.Toolbar.SearchBarSlot` | iOS only; renders nothing on Android (use `Stack.SearchBar`) |

## Notes

- `Stack.Toolbar` is available on Android in SDK 56 and later, and on iOS in SDK 55 and later.
- Some `Stack.Toolbar.Menu` and `Stack.Toolbar.MenuAction` props are iOS-only; see the API reference for per-prop availability.
- iOS custom images inside submenus (`Stack.Toolbar.Menu`) in header placements need `react-native-screens` 4.24.0 or later (SDK 55 bundles `~4.23.0`; SDK 56 bundles a compatible version).
- The `useImage` + `image` pattern for bottom toolbar custom images is iOS-only and a temporary API that may change.
- Limitations: native only (no web toolbar); Android icons must be image sources; bottom toolbar only in page components, not layout files; toolbars cannot be nested; badges only in header placements; `Stack.Toolbar.Label` children are dropped on Android; `SearchBarSlot` unsupported on Android.
- Liquid glass flicker / white background flash: wrap the root layout in `ThemeProvider` from `expo-router` with `DarkTheme` / `DefaultTheme`. Large title not collapsing: make the `ScrollView` the first child, or set `collapsable={false}` on its wrapper.
- Expo Router is file-based and built on React Navigation; its `Stack` differs from same-named APIs in react-router and tanstack-router.
- The later code fragments are condensed excerpts; their imports and state declarations are described in prose rather than repeated.
- Page modification date: October 06, 2026. Source fetched 2026-10-17.

## Related

- [Stack](./stack.md)
- [Native tabs](./native-tabs.md)
