---
source: https://docs.flutter.dev/ui/adaptive-responsive/general
---

# General approach to adaptive apps

Google engineers recommend a 3-step approach to take an app designed for conventional mobile devices and make it work on a wide range of devices: Abstract, Measure, Branch.

## Signature / Usage

The page contains no code listing; these are the measurement APIs it compares.

```text
MediaQuery.sizeOf(context)
LayoutBuilder
```

### Step 1: Abstract

Identify the widgets to make dynamic, analyze their constructors, and abstract out the data that can be shared. Common widgets that need adaptability:

- Dialogs, both fullscreen and modal
- Navigation UI, both rail and bottom bar
- Custom layout, such as "is the UI area taller or wider?"

For example, a `Dialog` can share the info that contains its content. To switch between a `NavigationBar` (small window) and a `NavigationRail` (large window), the widgets likely share a list of navigable destinations; a `Destination` widget can hold an icon and a text label.

### Step 2: Measure

Two ways to determine the size of the display area: `MediaQuery` and `LayoutBuilder`.

#### MediaQuery

- `MediaQuery.of` can mislead: the app may occupy a small window on a large screen. If you conclude the screen is small and have portrait-locked the app, the app's window locks to the center of the screen, surrounded with black.
- `MediaQuery.sizeOf` returns the current size of the app's entire window (in logical pixels), not a single widget. Use it to choose the UI based on the size of the app window.
- Prefer `MediaQuery.sizeOf` over `MediaQuery.of` **for performance reasons**: `MediaQuery` contains a lot of data, and the specialized per-property functions are more efficient when you only need the size.
- Calling `MediaQuery.sizeOf(context)` in `build` causes the given `BuildContext` to rebuild whenever the size property changes.

#### LayoutBuilder

- Provides the layout constraints from the parent widget instead of the app window size, so the information is based on the specific spot in the widget tree.
- Returns a `BoxConstraints` object (valid minimum and maximum width and height ranges) rather than a fixed `Size`. Useful for custom widgets sized by the space given to that widget.

### Step 3: Branch

Decide what breakpoints to use. The Material layout guidelines suggest a bottom navigation bar for windows less than 600 logical pixels wide, and a navigation rail for windows 600 pixels wide or greater. The choice should depend on the available window size, not the _type_ of device.

## Notes

- The Material Guidelines encourage never portrait locking your app (by disabling landscape mode). If you must, at least define portrait mode to work in top-down mode as well as bottom up.
- The page links the codelab "Building an animated responsive app layout with Material 3" for a worked `NavigationRail` / `NavigationBar` switch.
- Flutter `NavigationBar` / `NavigationRail` (Dart) are distinct from Compose Material3 `NavigationBar` / `NavigationRail` (android-compose-components); Flutter `MediaQuery` is not a CSS media query.

## Related

- [SafeArea & MediaQuery](./safearea-mediaquery.md)
- [Large screen devices](./large-screens.md)
- [Best practices for adaptive design](./adaptive-best-practices.md)
- [MediaQuery](../widgets-api/MediaQuery.md)
- [LayoutBuilder](../widgets-api/LayoutBuilder.md)
