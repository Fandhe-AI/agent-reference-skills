---
source: https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html
---

# StatefulWidget class

A widget that has mutable state. (abstract class; inherits `Object` > `DiagnosticableTree` > `Widget`)

## Signature / Usage

```dart
class YellowBird extends StatefulWidget {
  const YellowBird({ super.key });

  @override
  State<YellowBird> createState() => _YellowBirdState();
}

class _YellowBirdState extends State<YellowBird> {
  @override
  Widget build(BuildContext context) {
    return Container(color: const Color(0xFFFFE306));
  }
}
```

A more generic widget with internal state mutated by a method:

```dart
class Bird extends StatefulWidget {
  const Bird({
    super.key,
    this.color = const Color(0xFFFFE306),
    this.child,
  });

  final Color color;
  final Widget? child;

  @override
  State<Bird> createState() => _BirdState();
}

class _BirdState extends State<Bird> {
  double _size = 1.0;

  void grow() {
    setState(() { _size += 0.1; });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: widget.color,
      transform: Matrix4.diagonal3Values(_size, _size, 1.0),
      child: widget.child,
    );
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
| createState | `State<StatefulWidget> createState()` | Creates the mutable state for this widget at a given location in the tree. |
| createElement | `StatefulElement createElement()` | Creates a `StatefulElement` to manage this widget's location in the tree. (override) |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- State is information that (1) can be read synchronously when the widget is built and (2) might change during the lifetime of the widget. The implementer must ensure the `State` is promptly notified of changes using `State.setState`.
- `StatefulWidget` instances are immutable; mutable state lives in separate `State` objects created by `createState`, or in objects to which that `State` subscribes (e.g., `Stream` or `ChangeNotifier`), referenced from final fields on the widget.
- The framework calls `createState` whenever it inflates a `StatefulWidget`; multiple `State` objects may be associated with one widget if it is inserted in multiple places. If a widget is removed and re-inserted, `createState` is called again to create a fresh `State`.
- A `StatefulWidget` keeps the same `State` when moving within the tree if its creator used a `GlobalKey` for its `key`; to be eligible for grafting the widget must be inserted into the new location in the same animation frame in which it was removed.
- Two categories: widgets that allocate resources in `State.initState` and dispose them in `State.dispose` but neither depend on `InheritedWidget`s nor call `setState` (cheap; built once), and widgets that use `setState` or depend on `InheritedWidget`s (rebuild often; minimize rebuild impact).
- Techniques to minimize rebuild impact: push state to the leaves; minimize nodes created by `build`; cache unchanging subtrees in `final` state variables (or extract the mutable part into a `StatefulWidget` that accepts a child); use `const` widgets; avoid changing subtree depth or widget types (e.g., always wrap in `IgnorePointer` and toggle `IgnorePointer.ignoring`); if depth must change, wrap common parts with a consistent `GlobalKey` (`KeyedSubtree` may help); prefer a widget over a helper method for reusable UI. See also `Element.rebuild`.
- By convention, widget constructors only use named arguments; the first argument is `key`, and the last is `child`, `children`, or the equivalent.

## Related

- [State](./State.md)
- [StatelessWidget](./StatelessWidget.md)
- [InheritedWidget](./InheritedWidget.md)
- [Key](./Key.md)
