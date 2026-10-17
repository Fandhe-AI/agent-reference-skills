---
source: https://docs.flutter.dev/ui/layout/scrolling
---

# Scrolling

Overview of Flutter's scrolling support: built-in widgets that scroll automatically and widgets you can customize for specific scrolling behavior.

## Signature / Usage

The page contains no code listing; these are the scrolling widgets and constructors it names, in the order it presents them.

```text
SingleChildScrollView
ListView
GridView
ListView.builder
GridView.builder
DraggableScrollableSheet
ListWheelScrollView
CustomScrollView
Sliver* classes
```

### Basic scrolling

- `SingleChildScrollView` automatically scrolls its child when necessary. `ListView` and `GridView` are other useful widgets; more are on the scrolling page of the Widget catalog.
- **Infinite scrolling**: for a long (including infinite) list in a `ListView` or `GridView`, build items on demand as they scroll into view with `ListView.builder` or `GridView.builder`. This provides a much more performant scrolling experience.
- **Specialized scrollable widgets**: `DraggableScrollableSheet`; `ListWheelScrollView` turns the scrollable area into a wheel.

### Fancy scrolling

For elastic scrolling (scroll bouncing), parallax scrolling, or a scrolling header that shrinks or disappears, use the Flutter `Sliver*` classes. A sliver is a piece of the scrollable area; define and insert slivers into a `CustomScrollView` for finer-grained control. See the slivers page.

### Nested scrolling widgets

To nest a scrolling widget inside another without hurting scrolling performance, choose between setting `shrinkWrap` to true or using a sliver. The page points to the "ShrinkWrap vs Slivers" video (Decoding Flutter).

## Notes

- Flutter scrolling widgets (Dart, `package:flutter/widgets.dart`) are distinct from Compose `LazyColumn` / `LazyVerticalGrid` (android-compose-ui), SwiftUI `List` / `ScrollView` (apple-swiftui), and virtualization libraries such as tanstack-virtual, even where names such as `ListView` / `GridView` coincide.
- Migration (Flutter 3.44): `cacheExtent` and `cacheExtentStyle` on scrolling widgets such as `ListView`, `GridView`, `CustomScrollView`, and `Viewport` are deprecated in favor of `scrollCacheExtent` with a `ScrollCacheExtent` object (`ScrollCacheExtent.pixels(...)` / `ScrollCacheExtent.viewport(...)`). See the release category.

## Related

- [Using slivers to achieve fancy scrolling](./slivers.md)
- ListView
- CustomScrollView
- [Layouts in Flutter](./overview.md)
- Deprecated cacheExtent and cacheExtentStyle
