---
source: https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html
---

# StatelessWidget class

A widget that does not require mutable state. (abstract class; inherits `Object` > `DiagnosticableTree` > `Widget`)

## Signature / Usage

```dart
class GreenFrog extends StatelessWidget {
  const GreenFrog({ super.key });

  @override
  Widget build(BuildContext context) {
    return Container(color: const Color(0xFF2DBD3A));
  }
}
```

Constructor:

```dart
const StatelessWidget({Key? key})
```

A more generic widget that can be given a color and a child:

```dart
class Frog extends StatelessWidget {
  const Frog({
    super.key,
    this.color = const Color(0xFF2DBD3A),
    this.child,
  });

  final Color color;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return ColoredBox(color: color, child: child);
  }
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Initializes `key` for subclasses. |

Methods:

| Name | Signature | Description |
| --- | --- | --- |
| build | `Widget build(BuildContext context)` | Describes the part of the user interface represented by this widget. |
| createElement | `StatelessElement createElement()` | Creates a `StatelessElement` to manage this widget's location in the tree. (override) |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Stateless widgets are useful when the part of the UI does not depend on anything other than the configuration in the object itself and the `BuildContext` in which the widget is inflated. For compositions that change dynamically, use `StatefulWidget`.
- `build` is typically only called when the widget is first inserted in the tree, when the parent changes its configuration (see `Element.rebuild`), and when an `InheritedWidget` it depends on changes.
- Performance techniques: minimize the number of nodes created by `build` (e.g., prefer `Align` or `CustomSingleChildLayout` over elaborate `Row`/`Column`/`Padding`/`SizedBox` arrangements; a single `CustomPaint` over layered `Container`s with `Decoration`s); use `const` widgets and provide a `const` constructor; refactor into a stateful widget to cache subtrees or use `GlobalKey`s; split widgets that depend on frequently changing `InheritedWidget`s so only leaves rebuild; prefer a widget over a helper method for reusable UI.
- By convention, widget constructors only use named arguments; the first argument is `key`, and the last is `child`, `children`, or the equivalent.

## Related

- [StatefulWidget](./StatefulWidget.md)
- [State](./State.md)
- [InheritedWidget](./InheritedWidget.md)
- [BuildContext](./BuildContext.md)
