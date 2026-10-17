---
source: https://api.flutter.dev/flutter/widgets/Stack-class.html
---

# Stack class

A widget that positions its children relative to the edges of its box. (inherits `Object` > `DiagnosticableTree` > `Widget` > `RenderObjectWidget` > `MultiChildRenderObjectWidget`)

## Signature / Usage

```dart
Stack(
  children: <Widget>[
    Container(
      width: 100,
      height: 100,
      color: Colors.red,
    ),
    Container(
      width: 90,
      height: 90,
      color: Colors.green,
    ),
    Container(
      width: 80,
      height: 80,
      color: Colors.blue,
    ),
  ],
)
```

Enhancing text visibility with a gradient backdrop:

```dart
SizedBox(
  width: 250,
  height: 250,
  child: Stack(
    children: <Widget>[
      Container(
        width: 250,
        height: 250,
        color: Colors.white,
      ),
      Container(
        padding: const EdgeInsets.all(5.0),
        alignment: Alignment.bottomCenter,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: <Color>[
              Colors.black.withAlpha(0),
              Colors.black12,
              Colors.black45
            ],
          ),
        ),
        child: const Text(
          'Foreground Text',
          style: TextStyle(color: Colors.white, fontSize: 20.0),
        ),
      ),
    ],
  ),
)
```

## Options / Props

Constructor: `const Stack({Key? key, AlignmentGeometry alignment = AlignmentDirectional.topStart, TextDirection? textDirection, StackFit fit = StackFit.loose, Clip clipBehavior = Clip.hardEdge, List<Widget> children = const <Widget>[]})`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| alignment | AlignmentGeometry | AlignmentDirectional.topStart | How to align the non-positioned and partially-positioned children in the stack. |
| textDirection | TextDirection? | — | The text direction with which to resolve `alignment`. |
| fit | StackFit | StackFit.loose | How to size the non-positioned children in the stack. |
| clipBehavior | Clip | Clip.hardEdge | The content will be clipped (or not) according to this option. |
| children | List&lt;Widget&gt; | const &lt;Widget&gt;[] | The widgets below this widget in the tree. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Useful to overlap several children in a simple way, e.g., some text and an image overlaid with a gradient and a button attached to the bottom.
- Each child is either positioned or non-positioned. Positioned children are those wrapped in a `Positioned` widget that has at least one non-null property. The stack sizes itself to contain all the non-positioned children, which are positioned according to `alignment` (default: the top-left corner in left-to-right environments, the top-right in right-to-left). Positioned children are then placed relative to the stack according to their top, right, bottom, and left properties.
- The stack paints its children in order, with the first child at the bottom. To change the paint order, rebuild the stack with the children in the new order; if you reorder, consider giving the children non-null keys so the framework moves the underlying objects rather than recreating them.
- For more details on the stack layout algorithm, see `RenderStack`. When using a `Stack` you can't position children relative to their size or the stack's own size; for a particular pattern or a custom layout manager, use `CustomMultiChildLayout`.
- See also `Align`, `CustomSingleChildLayout`, `CustomMultiChildLayout`, and `Flow` (paint-time control of children using transform matrices).

## Related

- [Container](./Container.md)
- [SizedBox](./SizedBox.md)
- [Row](./Row.md)
- [Column](./Column.md)
