---
source: https://api.flutter.dev/flutter/widgets/Row-class.html
---

# Row class

A widget that displays its children in a horizontal array. (inherits `Object` > `DiagnosticableTree` > `Widget` > `RenderObjectWidget` > `MultiChildRenderObjectWidget` > `Flex`)

## Signature / Usage

```dart
const Row(
  children: <Widget>[
    Expanded(
      child: Text('Deliver features faster', textAlign: TextAlign.center),
    ),
    Expanded(
      child: Text('Craft beautiful UIs', textAlign: TextAlign.center),
    ),
    Expanded(
      child: FittedBox(
        child: FlutterLogo(),
      ),
    ),
  ],
)
```

Fixing overflow by wrapping the text child in `Expanded`:

```dart
const Row(
  children: <Widget>[
    FlutterLogo(),
    Expanded(
      child: Text("Flutter's hot reload helps you quickly and easily experiment, build UIs, add features, and fix bug faster. Experience sub-second reload times, without losing state, on emulators, simulators, and hardware for iOS and Android."),
    ),
    Icon(Icons.sentiment_very_satisfied),
  ],
)
```

## Options / Props

Constructor: `const Row({Key? key, MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start, MainAxisSize mainAxisSize = MainAxisSize.max, CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center, TextDirection? textDirection, VerticalDirection verticalDirection = VerticalDirection.down, TextBaseline? textBaseline, double spacing = 0.0, List<Widget> children = const <Widget>[]})`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| mainAxisAlignment | MainAxisAlignment | MainAxisAlignment.start | How the children should be placed along the main axis. |
| mainAxisSize | MainAxisSize | MainAxisSize.max | How much space should be occupied in the main axis. |
| crossAxisAlignment | CrossAxisAlignment | CrossAxisAlignment.center | How the children should be placed along the cross axis. |
| textDirection | TextDirection? | — | Determines the order to lay children out horizontally and how to interpret `start` and `end` in the horizontal direction. |
| verticalDirection | VerticalDirection | VerticalDirection.down | Determines the order to lay children out vertically and how to interpret `start` and `end` in the vertical direction. |
| textBaseline | TextBaseline? | — | If aligning items according to their baseline, which baseline to use. |
| spacing | double | 0.0 | How much space to place between children in the main axis. |
| children | List&lt;Widget&gt; | const &lt;Widget&gt;[] | The widgets below this widget in the tree. |

Inherited property (from `Flex`): `clipBehavior` (`Clip`) — the content will be clipped (or not) according to this option.

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- To cause a child to expand to fill the available horizontal space, wrap it in an `Expanded` widget.
- `Row` does not scroll, and in general it is an error to have more children than will fit in the available room. For a line of widgets that should scroll if there is insufficient room, consider a `ListView`. For a vertical variant, see `Column`. For a single child, consider `Align` or `Center`.
- By default `crossAxisAlignment` is `CrossAxisAlignment.center`, which centers the children in the vertical axis; children containing text with different font metrics may appear misaligned. Consider `CrossAxisAlignment.baseline` instead.
- Troubleshooting (yellow and black warning stripe): if the non-flexible contents (not wrapped in `Expanded` or `Flexible`) are together wider than the row, the row overflows and draws a yellow and black striped warning box on the overflowing edge (the overflow amount is printed in red if there is room outside the row). The fix is to wrap the unbounded-width child (e.g., a long `Text`) in an `Expanded`, so the row gives it the remaining room.
- `textDirection` controls the direction children are rendered in. When null (the default) it is taken from the ambient `Directionality`, so in an LTR context the first child is at the start (left); set `TextDirection.rtl` explicitly to order children right to left.
- The class overview says TextDirection.ltr is the default; the constructor default is null, resolved from the ambient Directionality.
- Layout algorithm, in six steps: (1) lay out each child with a null or zero flex factor with unbounded horizontal constraints and the incoming vertical constraints (tight vertical constraints matching the incoming max height if `crossAxisAlignment` is `CrossAxisAlignment.stretch`); (2) divide the remaining horizontal space among children with non-zero flex factors according to their flex factor; (3) lay out the remaining children with the same vertical constraints and horizontal constraints based on the allocated space (`FlexFit.tight` children get tight constraints, `FlexFit.loose` children get loose constraints); (4) the height of the `Row` is the maximum height of the children; (5) the width is determined by `mainAxisSize` (`MainAxisSize.max`: the max width of the incoming constraints; `MainAxisSize.min`: the sum of the children's widths, subject to incoming constraints); (6) position each child according to `mainAxisAlignment` and `crossAxisAlignment` (e.g., with `MainAxisAlignment.spaceBetween`, unallocated horizontal space is divided evenly between the children).
- See also `Flex` (if you don't know in advance whether the arrangement is horizontal or vertical), `Expanded`, `Flexible` (share the remaining room but may be sized smaller), and `Spacer`.

## Related

- [Column](./Column.md)
- [Expanded](./Expanded.md)
- [ListView](./ListView.md)
- [Stack](./Stack.md)
