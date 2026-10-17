---
source: https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html
---

# InheritedWidget class

Base class for widgets that efficiently propagate information down the tree. (abstract class; inherits `Object` > `DiagnosticableTree` > `Widget` > `ProxyWidget`)

## Signature / Usage

```dart
class FrogColor extends InheritedWidget {
  const FrogColor({
    super.key,
    required this.color,
    required super.child,
  });

  final Color color;

  static FrogColor? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<FrogColor>();
  }

  static FrogColor of(BuildContext context) {
    final FrogColor? result = maybeOf(context);
    assert(result != null, 'No FrogColor found in context');
    return result!;
  }

  @override
  bool updateShouldNotify(FrogColor oldWidget) => color != oldWidget.color;
}
```

Constructor:

```dart
const InheritedWidget({Key? key, required Widget child})
```

Using it from a descendant context (the `Builder` context is below `FrogColor`, so this works):

```dart
// continuing from previous example...
class MyPage extends StatelessWidget {
  const MyPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FrogColor(
        color: Colors.green,
        child: Builder(
          builder: (BuildContext innerContext) {
            return Text(
              'Hello Frog',
              style: TextStyle(color: FrogColor.of(innerContext).color),
            );
          },
        ),
      ),
    );
  }
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| child | Widget | required | The widget below this widget in the tree. |

Methods:

| Name | Signature | Description |
| --- | --- | --- |
| updateShouldNotify | `bool updateShouldNotify(covariant InheritedWidget oldWidget)` | Whether the framework should notify widgets that inherit from this widget. |
| createElement | `InheritedElement createElement()` | Inflates this configuration to a concrete instance. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- To obtain the nearest instance of a particular type of inherited widget from a build context, use `BuildContext.dependOnInheritedWidgetOfExactType`. Consumers that reference an inherited widget this way rebuild when the inherited widget itself changes state.
- Convention: provide two static methods, `of` and `maybeOf`, that call `BuildContext.dependOnInheritedWidgetOfExactType`. `of` typically returns a non-nullable instance and asserts if the widget isn't found (usually implemented by calling `maybeOf`); `maybeOf` returns a nullable instance and returns null if not found. They may return some data rather than the widget itself (e.g., a `Color`).
- Sometimes the inherited widget is a private implementation detail; `of`/`maybeOf` are then implemented on the public class. For example, `Theme` is a `StatelessWidget` that builds a private inherited widget, and `Theme.of` returns the `ThemeData` inside it.
- The `context` passed to `of`/`maybeOf` must be a descendant of the `InheritedWidget` ("below" it in the tree). A context from a parent (e.g., the `build` context of the page that creates `FrogColor`) does not work and asserts when `FrogColor.of` is called; use a `Builder` to obtain a context below it.

## Related

- [StatefulWidget](./StatefulWidget.md)
- [State](./State.md)
- [StatelessWidget](./StatelessWidget.md)
- [BuildContext](./BuildContext.md)
