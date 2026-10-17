---
source: https://api.flutter.dev/flutter/widgets/Container-class.html
---

# Container class

A convenience widget that combines common painting, positioning, and sizing widgets. (inherits `Object` > `DiagnosticableTree` > `Widget` > `StatelessWidget`)

## Signature / Usage

```dart
Center(
  child: Container(
    margin: const EdgeInsets.all(10.0),
    color: Colors.amber[600],
    width: 48.0,
    height: 48.0,
  ),
)
```

Using many features at once:

```dart
Container(
  constraints: BoxConstraints.expand(
    height: Theme.of(context).textTheme.headlineMedium!.fontSize! * 1.1 + 200.0,
  ),
  padding: const EdgeInsets.all(8.0),
  color: Colors.blue[600],
  alignment: Alignment.center,
  transform: Matrix4.rotationZ(0.1),
  child: Text('Hello World',
    style: Theme.of(context)
        .textTheme
        .headlineMedium!
        .copyWith(color: Colors.white)),
)
```

## Options / Props

Constructor: `Container({Key? key, AlignmentGeometry? alignment, EdgeInsetsGeometry? padding, Color? color, bool isAntiAlias = true, Decoration? decoration, Decoration? foregroundDecoration, double? width, double? height, BoxConstraints? constraints, EdgeInsetsGeometry? margin, Matrix4? transform, AlignmentGeometry? transformAlignment, Widget? child, Clip clipBehavior = Clip.none})`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| alignment | AlignmentGeometry? | — | Align the `child` within the container. |
| padding | EdgeInsetsGeometry? | — | Empty space to inscribe inside the `decoration`. The `child`, if any, is placed inside this padding. |
| color | Color? | — | The color to paint behind the `child`. |
| isAntiAlias | bool | true | Whether to apply anti-aliasing when painting the box. |
| decoration | Decoration? | — | The decoration to paint behind the `child`. |
| foregroundDecoration | Decoration? | — | The decoration to paint in front of the `child`. |
| width | double? | — | Incorporated as a constraint on the padded extent. |
| height | double? | — | Incorporated as a constraint on the padded extent. |
| constraints | BoxConstraints? | — | Additional constraints to apply to the child. |
| margin | EdgeInsetsGeometry? | — | Empty space to surround the `decoration` and `child`. |
| transform | Matrix4? | — | The transformation matrix to apply before painting the container. |
| transformAlignment | AlignmentGeometry? | — | The alignment of the origin, relative to the size of the container, if `transform` is specified. |
| child | Widget? | — | The child contained by the container. |
| clipBehavior | Clip | Clip.none | The clip behavior when `Container.decoration` is not null. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- A container first surrounds the child with `padding` (inflated by any borders present in the `decoration`) and then applies additional `constraints` to the padded extent (incorporating `width` and `height` as constraints, if either is non-null). The container is then surrounded by empty space described by `margin`.
- During painting, the container first applies `transform`, then paints the `decoration` to fill the padded extent, then paints the child, and finally paints the `foregroundDecoration`, also filling the padded extent.
- Containers with no children try to be as big as possible unless the incoming constraints are unbounded, in which case they try to be as small as possible. Containers with children size themselves to their children. `width`, `height`, and `constraints` override this.
- By default, containers return false for all hit tests. If `color` is specified, hit testing is handled by `ColoredBox`, which always returns true. If `decoration` or `foregroundDecoration` are specified, hit testing is handled by `Decoration.hitTest`.
- Layout behavior (see `BoxConstraints`): `Container` tries, in order, to honor `alignment`, to size itself to the `child`, to honor `width`, `height`, and `constraints`, to expand to fit the parent, to be as small as possible. Specifically: with no child, no height/width/constraints and unbounded parent constraints it sizes as small as possible; with no child and no alignment but a height, width or constraints it is as small as possible given those and the parent's constraints; with no child, height, width, constraints or alignment but bounded parent constraints it expands to fit the parent; with an `alignment` and unbounded parent constraints it sizes around the child; with an `alignment` and bounded parent constraints it expands to fit the parent and positions the child per the alignment; otherwise (a child but no height, width, constraints or alignment) it passes the parent's constraints to the child and sizes itself to match the child. `margin` and `padding` merely augment these rules; the `decoration` can implicitly increase the padding (e.g., borders in a `BoxDecoration`; see `Decoration.padding`).
- Variants and related: `AnimatedContainer` smoothly animates the properties when they change; `Ink` paints a `Decoration` on a `Material`, allowing `InkResponse` and `InkWell` splashes to paint over them.

## Related

- [Row](./Row.md)
- [Column](./Column.md)
- [SizedBox](./SizedBox.md)
- [Text](./Text.md)
