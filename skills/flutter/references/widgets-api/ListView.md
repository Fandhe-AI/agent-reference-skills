---
source: https://api.flutter.dev/flutter/widgets/ListView-class.html
---

# ListView class

A scrollable list of widgets arranged linearly. (inherits `Object` > `DiagnosticableTree` > `Widget` > `StatelessWidget` > `ScrollView` > `BoxScrollView`)

## Signature / Usage

```dart
ListView(
  padding: const EdgeInsets.all(8),
  children: <Widget>[
    Container(
      height: 50,
      color: Colors.amber[600],
      child: const Center(child: Text('Entry A')),
    ),
    Container(
      height: 50,
      color: Colors.amber[500],
      child: const Center(child: Text('Entry B')),
    ),
    Container(
      height: 50,
      color: Colors.amber[100],
      child: const Center(child: Text('Entry C')),
    ),
  ],
)
```

`ListView.builder` (children built lazily, can be infinite in number):

```dart
final List<String> entries = <String>['A', 'B', 'C'];
final List<int> colorCodes = <int>[600, 500, 100];

Widget build(BuildContext context) {
  return ListView.builder(
    padding: const EdgeInsets.all(8),
    itemCount: entries.length,
    itemBuilder: (BuildContext context, int index) {
      return Container(
        height: 50,
        color: Colors.amber[colorCodes[index]],
        child: Center(child: Text('Entry ${entries[index]}')),
      );
    }
  );
}
```

`ListView.separated`:

```dart
final List<String> entries = <String>['A', 'B', 'C'];
final List<int> colorCodes = <int>[600, 500, 100];

Widget build(BuildContext context) {
  return ListView.separated(
    padding: const EdgeInsets.all(8),
    itemCount: entries.length,
    itemBuilder: (BuildContext context, int index) {
      return Container(
        height: 50,
        color: Colors.amber[colorCodes[index]],
        child: Center(child: Text('Entry ${entries[index]}')),
      );
    },
    separatorBuilder: (BuildContext context, int index) {
      return const SizedBox(
        height: 1.0,
        width: double.infinity,
        child: ColoredBox(color: Color(0xFF000000)),
      );
    },
  );
}
```

## Options / Props

Four ways to construct a `ListView`:

| Constructor | Use |
| --- | --- |
| `ListView` (default) | Takes an explicit `List<Widget>` of children. Appropriate for a small number of children because constructing the `List` requires doing work for every child that could possibly be displayed. |
| `ListView.builder` | Takes an `IndexedWidgetBuilder` that builds the children on demand. Appropriate for a large (or infinite) number of children because the builder is called only for visible children. |
| `ListView.separated` | Takes two `IndexedWidgetBuilder`s: `itemBuilder` builds child items on demand, and `separatorBuilder` builds separators that appear in between. Appropriate for a fixed number of children. |
| `ListView.custom` | Takes a `SliverChildDelegate` (`childrenDelegate`), which can customize additional aspects of the child model, e.g. the algorithm used to estimate the size of children that are not visible. |

Named parameters of the default constructor: `key`, `scrollDirection = Axis.vertical`, `reverse = false`, `controller`, `primary`, `physics`, `shrinkWrap = false`, `padding`, `itemExtent`, `itemExtentBuilder`, `prototypeItem`, `addAutomaticKeepAlives = true`, `addRepaintBoundaries = true`, `addSemanticIndexes = true`, `cacheExtent` (deprecated), `scrollCacheExtent`, `children = const <Widget>[]`, `semanticChildCount`, `dragStartBehavior = DragStartBehavior.start`, `keyboardDismissBehavior`, `restorationId`, `clipBehavior = Clip.hardEdge`, `hitTestBehavior = HitTestBehavior.opaque`.

`ListView.builder` additionally takes `itemBuilder`, `findChildIndexCallback` and `itemCount` (instead of `children`). `ListView.separated` takes `itemBuilder`, `findChildIndexCallback`, `findItemIndexCallback`, `separatorBuilder` and `itemCount` (no `itemExtent` / `prototypeItem` / `semanticChildCount`). `ListView.custom` takes `childrenDelegate` (instead of `children` and the `add*` flags).

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| itemExtent | double? | — | If non-null, forces the children to have the given extent in the scroll direction. |
| prototypeItem | Widget? | — | If non-null, forces the children to have the same extent as the given widget in the scroll direction. |
| itemExtentBuilder | — | — | Per-item extent callback (listed in the constructor on the API page). |
| padding | EdgeInsetsGeometry? | — | The amount of space by which to inset the children. |
| addAutomaticKeepAlives | bool | true | Inserts `AutomaticKeepAlive` widgets around children. |
| addRepaintBoundaries | bool | true | Wraps each child in a `RepaintBoundary`. |
| addSemanticIndexes | bool | true | Wraps children in `IndexedSemantics`. |
| scrollCacheExtent | ScrollCacheExtent? | — | Replaces the deprecated `cacheExtent` / `cacheExtentStyle`. |
| scrollDirection, reverse, controller, primary, physics, shrinkWrap, semanticChildCount, dragStartBehavior, keyboardDismissBehavior, restorationId, clipBehavior, hitTestBehavior | — | see above | Same meaning as the identically named properties of `CustomScrollView`. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Migration (Flutter 3.44): `cacheExtent` and `cacheExtentStyle` are deprecated; use `scrollCacheExtent` with a `ScrollCacheExtent` object, e.g. `ListView(cacheExtent: 500.0, ...)` becomes `ListView(scrollCacheExtent: const ScrollCacheExtent.pixels(500.0), ...)`. See the scroll-cache-extent breaking change.
- `ListView` is the most commonly used scrolling widget. It displays its children one after another in the scroll direction; in the cross axis, the children are required to fill the `ListView`.
- Specifying an `itemExtent` or a `prototypeItem` is more efficient than letting children determine their own extent, because the scrolling machinery can use the foreknowledge of extent (e.g., when the scroll position changes drastically). You can't specify both, only one or none.
- To control the initial scroll offset, provide a `controller` with `ScrollController.initialScrollOffset` set.
- By default, `ListView` automatically pads the list's scrollable extremities to avoid partial obstructions indicated by `MediaQuery`'s padding. To avoid this, override with a zero `padding`.
- Child elements' lifecycle: visible children's elements, states and render objects are created lazily; when a child is scrolled out of view, the element subtree, states and render objects are destroyed and recreated lazily when scrolled back. To preserve state: move ownership of non-trivial UI-state-driving business logic out of the list child subtree (use `StatefulWidget`s in the child subtree to store instantaneous UI state only); make `KeepAlive` the root widget of the child subtree to preserve (only works if `addAutomaticKeepAlives` and `addRepaintBoundaries` are false); or use `AutomaticKeepAlive` widgets (inserted by default when `addAutomaticKeepAlives` is true), where descendants (e.g., `EditableText` while its text field has focus) signal to stay alive, typically via `AutomaticKeepAliveClientMixin` (`wantKeepAlive`, `updateKeepAlive`).
- Transitioning to `CustomScrollView`: a `ListView` is basically a `CustomScrollView` with a single `SliverList` in its `slivers`. `key`, `scrollDirection`, `reverse`, `controller`, `primary`, `physics` and `shrinkWrap` map directly. `slivers` should contain a `SliverList` if both `itemExtent` and `prototypeItem` were null, a `SliverFixedExtentList` if `itemExtent` was not null, or a `SliverPrototypeExtentList` if `prototypeItem` was not null. `childrenDelegate` corresponds to `SliverList.delegate`; `children` corresponds to a `SliverChildListDelegate`; `ListView.builder`'s `itemBuilder` / `itemCount` correspond to a `SliverChildBuilderDelegate`. `padding` corresponds to a `SliverPadding` wrapping the `SliverList`. `CustomScrollView`s don't automatically avoid `MediaQuery` obstructions like `ListView`s; wrap the slivers in `SliverSafeArea`s to reproduce it.
- Empty list: conditionally replace the `ListView` at build time with the widgets for the empty state, e.g. `itemCount > 0 ? ListView.builder(...) : const Center(child: Text('No items'))`.
- `ListView` has no built-in notion of selected items; see `ListTile.selected` (DartPad sample `widgets.ListView.7` shows a custom `ListTile` selection in a `ListView` or `GridView`).
- Scroll views are often decorated with `Scrollbar`s and overscroll indicators managed by the inherited `ScrollBehavior`; a `ScrollConfiguration` above the scroll view, or `MaterialApp.scrollBehavior` / `CupertinoApp.scrollBehavior`, modifies them.
- Persisting scroll position: scroll views attempt to persist it using `PageStorage`; disable via `ScrollController.keepScrollOffset = false`; if enabled, use a `PageStorageKey` for the widget's `key`.
- See also `SingleChildScrollView`, `PageView`, `GridView`, `CustomScrollView`, `ListBody` (arranges children similarly, without scrolling), and the cookbook pages on lists (basic list, long lists, horizontal list, mixed list, swipe to dismiss).

## Related

- [CustomScrollView](./CustomScrollView.md)
- [Row](./Row.md)
- [Column](./Column.md)
- [Container](./Container.md)
