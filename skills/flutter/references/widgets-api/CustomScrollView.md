---
source: https://api.flutter.dev/flutter/widgets/CustomScrollView-class.html
---

# CustomScrollView class

A `ScrollView` that creates custom scroll effects using `slivers`. (inherits `Object` > `DiagnosticableTree` > `Widget` > `StatelessWidget` > `ScrollView`)

## Signature / Usage

```dart
CustomScrollView(
  slivers: <Widget>[
    const SliverAppBar(
      pinned: true,
      expandedHeight: 250.0,
      flexibleSpace: FlexibleSpaceBar(
        title: Text('Demo'),
      ),
    ),
    SliverGrid(
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 200.0,
        mainAxisSpacing: 10.0,
        crossAxisSpacing: 10.0,
        childAspectRatio: 4.0,
      ),
      delegate: SliverChildBuilderDelegate(
        (BuildContext context, int index) {
          return Container(
            alignment: Alignment.center,
            color: Colors.teal[100 * (index % 9)],
            child: Text('Grid Item $index'),
          );
        },
        childCount: 20,
      ),
    ),
    SliverFixedExtentList(
      itemExtent: 50.0,
      delegate: SliverChildBuilderDelegate(
        (BuildContext context, int index) {
          return Container(
            alignment: Alignment.center,
            color: Colors.lightBlue[100 * (index % 9)],
            child: Text('List Item $index'),
          );
        },
      ),
    ),
  ],
)
```

## Options / Props

Constructor: `const CustomScrollView({Key? key, Axis scrollDirection = Axis.vertical, bool reverse = false, ScrollController? controller, bool? primary, ScrollPhysics? physics, ScrollBehavior? scrollBehavior, bool shrinkWrap = false, Key? center, double anchor = 0.0, double? cacheExtent /* deprecated */, ScrollCacheExtent? scrollCacheExtent, SliverPaintOrder paintOrder = SliverPaintOrder.firstIsTop, List<Widget> slivers = const <Widget>[], int? semanticChildCount, DragStartBehavior dragStartBehavior = DragStartBehavior.start, ScrollViewKeyboardDismissBehavior? keyboardDismissBehavior, String? restorationId, Clip clipBehavior = Clip.hardEdge, HitTestBehavior hitTestBehavior = HitTestBehavior.opaque})`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| scrollDirection | Axis | Axis.vertical | The `Axis` along which the scroll view's offset increases. |
| reverse | bool | false | Whether the scroll view scrolls in the reading direction. |
| controller | ScrollController? | — | An object that can be used to control the position to which this scroll view is scrolled. |
| primary | bool? | — | Whether this is the primary scroll view associated with the parent `PrimaryScrollController`. |
| physics | ScrollPhysics? | — | How the scroll view should respond to user input. |
| scrollBehavior | ScrollBehavior? | — | A `ScrollBehavior` that will be applied to this widget individually. |
| shrinkWrap | bool | false | Whether the extent of the scroll view in the `scrollDirection` should be determined by the contents being viewed. |
| center | Key? | — | The first child in the `GrowthDirection.forward` growth direction. |
| anchor | double | 0.0 | The relative position of the zero scroll offset. |
| cacheExtent | double? | — | Deprecated: "Use scrollCacheExtent instead. This feature was deprecated after v3.41.0-0.0.pre." |
| scrollCacheExtent | ScrollCacheExtent? | — | The viewport has an area before and after the visible area to cache items that are about to become visible when the user scrolls. |
| paintOrder | SliverPaintOrder | SliverPaintOrder.firstIsTop | The order in which to paint the slivers; equivalently, the order in which to arrange them in the z-direction. |
| slivers | List&lt;Widget&gt; | const &lt;Widget&gt;[] | The slivers to place inside the viewport. |
| semanticChildCount | int? | — | The number of children that will contribute semantic information (see Accessibility in the Notes). |
| dragStartBehavior | DragStartBehavior | DragStartBehavior.start | Determines the way that drag start behavior is handled. |
| keyboardDismissBehavior | ScrollViewKeyboardDismissBehavior? | — | Defines how this `ScrollView` will dismiss the keyboard automatically. |
| restorationId | String? | — | Restoration ID to save and restore the scroll offset of the scrollable. |
| clipBehavior | Clip | Clip.hardEdge | The content will be clipped (or not) according to this option. |
| hitTestBehavior | HitTestBehavior | HitTestBehavior.opaque | Defines the behavior of gesture detector used in this `Scrollable`. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Migration (Flutter 3.44): `cacheExtent` and `cacheExtentStyle` are deprecated in scrolling-related widgets such as `ListView`, `GridView`, `CustomScrollView`, and `Viewport`. Use `scrollCacheExtent` with a `ScrollCacheExtent` object, e.g. `cacheExtent: 500.0` becomes `scrollCacheExtent: const ScrollCacheExtent.pixels(500.0)`. See the scroll-cache-extent breaking change (landed in 3.41.0-0.0.pre, in stable 3.44).
- Lets you supply slivers directly to create scrolling effects such as lists, grids, and expanding headers: for an expanding app bar followed by a list and a grid, use a list of three slivers: `SliverAppBar`, `SliverList`, and `SliverGrid`. Widgets in these slivers must produce `RenderSliver` objects.
- To control the initial scroll offset, provide a `controller` with its `ScrollController.initialScrollOffset` set.
- By default, items inserted at the "top" of a scrolling container like `ListView` or `CustomScrollView` push the top item and everything below downwards. To let the top of the list just grow upwards without changing the scroll position, use a `CustomScrollView` with two `SliverList` children and `CustomScrollView.center` set to the key of the bottom `SliverList` (DartPad sample `widgets.CustomScrollView.2`; the code is not included in the API page HTML).
- Accessibility: to let TalkBack/VoiceOver announce scroll state (e.g., "showing items 1 to 10 of 23"), the scroll view needs the first visible child index, the total number of children, and the total number of visible children. The last is computed by the framework; the first two must be provided (higher-level widgets such as `ListView` do this automatically). Associate the generated semantics of each scrollable item with a semantic index by wrapping child widgets in an `IndexedSemantics`; the semantic index is not necessarily the widget index (e.g., `ListView.separated` dividers have no semantic information, so only odd-numbered widgets have a semantic index equal to `index ~/ 2`). `semanticChildCount` should always equal the number of widgets wrapped in `IndexedSemantics`.
- Persisting scroll position: scroll views attempt to persist their scroll position using `PageStorage`. Disable by setting `ScrollController.keepScrollOffset` to false on the `controller`. If enabled, use a `PageStorageKey` for the widget's `key` to disambiguate different scroll views.
- See also `SliverList`, `SliverFixedExtentList`, `SliverGrid`, `SliverPadding`, `SliverAppBar`, `ScrollNotification` and `NotificationListener`, and `IndexedSemantics`.

## Related

- [ListView](./ListView.md)
- [Container](./Container.md)
- [Text](./Text.md)
