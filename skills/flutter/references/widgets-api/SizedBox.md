---
source: https://api.flutter.dev/flutter/widgets/SizedBox-class.html
---

# SizedBox class

A box with a specified size. (inherits `Object` > `DiagnosticableTree` > `Widget` > `RenderObjectWidget` > `SingleChildRenderObjectWidget`)

## Signature / Usage

```dart
const SizedBox(
  width: 200.0,
  height: 300.0,
  child: Card(child: Text('Hello World!')),
)
```

Constructors:

```dart
const SizedBox({Key? key, double? width, double? height, Widget? child})
const SizedBox.expand({Key? key, Widget? child})
SizedBox.fromSize({Key? key, Widget? child, Size? size})
const SizedBox.shrink({Key? key, Widget? child})
const SizedBox.square({Key? key, Widget? child, double? dimension})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| width | double? | — | If non-null, requires the child to have exactly this width. |
| height | double? | — | If non-null, requires the child to have exactly this height. |
| child | Widget? | — | The widget below this widget in the tree. |

Named constructors:

| Constructor | Description |
| --- | --- |
| `SizedBox` | Creates a fixed size box. The `width` and `height` parameters can be null to indicate that the size of the box should not be constrained in the corresponding dimension. |
| `SizedBox.expand` | Creates a box that will become as large as its parent allows. |
| `SizedBox.fromSize` | Creates a box with the specified size. |
| `SizedBox.shrink` | Creates a box that will become as small as its parent allows. |
| `SizedBox.square` | Creates a box whose `width` and `height` are equal (`dimension`). |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- If given a child, this widget tries to size its child as close to the specified `height` and `width` as possible given the parent's constraints. If either is null, it tries to size itself to match the child's size in that dimension. If the child's size depends on the size of its parent, the height and width must be provided.
- If not given a child, `SizedBox` tries to size itself as close to the specified height and width as possible given the parent's constraints. If `height` or `width` is null or unspecified, it is treated as zero.
- `SizedBox.expand` is equivalent to setting `width` and `height` to `double.infinity`.
- Troubleshooting (why is my `SizedBox` ignored?): in Flutter's layout protocol constraints go down and sizes go up; a widget must respect the constraints passed by its parent. In the following snippet the inner 100x100 size is ignored because it is incompatible with its parent's constraints of exactly 200x200:

  ```dart
  const SizedBox(
    width: 200.0,
    height: 200.0,
    child: SizedBox( // Ignored!
      width: 100.0,
      height: 100.0,
      child: ColoredBox(color: Colors.green),
    ),
  )
  ```

  This can be fixed by wrapping the child `SizedBox` in a widget that lets it be any size up to the size of the parent, such as `Center` or `Align`.
- See also `ConstrainedBox` (takes arbitrary `BoxConstraints`), `UnconstrainedBox`, `FractionallySizedBox`, `AspectRatio`, and `FittedBox`. In-depth article: "Understanding constraints" (docs.flutter.dev/ui/layout/constraints).

## Related

- [Container](./Container.md)
- [Row](./Row.md)
- [Column](./Column.md)
- [Stack](./Stack.md)
