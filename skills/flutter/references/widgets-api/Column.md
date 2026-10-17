---
source: https://api.flutter.dev/flutter/widgets/Column-class.html
---

# Column class

A widget that displays its children in a vertical array. (inherits `Object` > `DiagnosticableTree` > `Widget` > `RenderObjectWidget` > `MultiChildRenderObjectWidget` > `Flex`)

## Signature / Usage

```dart
const Column(
  children: <Widget>[
    Text('Deliver features faster'),
    Text('Craft beautiful UIs'),
    Expanded(
      child: FittedBox(
        child: FlutterLogo(),
      ),
    ),
  ],
)
```

Left-aligned and shrink-wrapped:

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  mainAxisSize: MainAxisSize.min,
  children: <Widget>[
    const Text('We move under cover and we move as one'),
    const Text('Through the night, we have one shot to live another day'),
    const Text('We cannot let a stray gunshot give us away'),
    const Text('We will fight up close, seize the moment and stay in it'),
    const Text("It's either that or meet the business end of a bayonet"),
    const Text("The code word is 'Rochambeau,' dig me?"),
    Text('Rochambeau!', style: DefaultTextStyle.of(context).style.apply(fontSizeFactor: 2.0)),
  ],
)
```

## Options / Props

Constructor: `const Column({Key? key, MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start, MainAxisSize mainAxisSize = MainAxisSize.max, CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center, TextDirection? textDirection, VerticalDirection verticalDirection = VerticalDirection.down, TextBaseline? textBaseline, double spacing = 0.0, List<Widget> children = const <Widget>[]})`

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

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- To cause a child to expand to fill the available vertical space, wrap it in an `Expanded` widget.
- `Column` does not scroll, and in general it is an error to have more children than will fit in the available room. If widgets should scroll when space is insufficient, consider a `ListView`. For a horizontal variant, see `Row`. For a single child, consider `Align` or `Center`.
- Troubleshooting (incoming vertical constraints are unbounded): a `Column` with `Expanded` or `Flexible` children placed in another `Column`, a `ListView`, or any context without a maximum height constraint throws a runtime exception saying that there are children with non-zero flex but the vertical constraints are unbounded (remaining space after laying out the other children cannot be shared if it is infinite). Usually determine why the `Column` receives unbounded constraints. When nested in another `Column` without `Expanded`/`Flexible` around the inner one, wrap the inner column in an `Expanded`. When nested in a `ListView` or other vertical scrollable, there really is infinite vertical space: typically remove the `Expanded`/`Flexible` widgets from around the inner children. See `BoxConstraints` for more on constraints.
- Troubleshooting (yellow and black striped banner): when the contents exceed the available space the `Column` overflows and the contents are clipped; in debug mode a yellow and black striped bar is rendered at the overflowing edge and a message is printed below the `Column` saying how much overflow was detected. The usual solution is to use a `ListView` rather than a `Column`. `SingleChildScrollView` documents ways to use a `Column` inside a scrolling container.
- Layout algorithm, in six steps: (1) lay out each child with a null or zero flex factor with unbounded vertical constraints and the incoming horizontal constraints (tight horizontal constraints matching the incoming max width if `crossAxisAlignment` is `CrossAxisAlignment.stretch`); (2) divide the remaining vertical space among children with non-zero flex factors according to their flex factor; (3) lay out the remaining children with the same horizontal constraints and vertical constraints based on the allocated space (`FlexFit.tight` children get tight constraints, `FlexFit.loose` children loose constraints); (4) the width of the `Column` is the maximum width of the children; (5) the height is determined by `mainAxisSize` (`MainAxisSize.max`: the max height of the incoming constraints; `MainAxisSize.min`: the sum of the children's heights, subject to incoming constraints); (6) position each child according to `mainAxisAlignment` and `crossAxisAlignment`.
- See also `Flex`, `Expanded`, `Flexible`, and `Spacer`.

## Related

- [Row](./Row.md)
- [Expanded](./Expanded.md)
- [ListView](./ListView.md)
- [Stack](./Stack.md)
