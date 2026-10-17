---
source: https://docs.flutter.dev/flutter-for/declarative
---

# Introduction to declarative UI

The conceptual difference between the declarative style used by Flutter and the imperative style used by many other UI frameworks.

## Signature / Usage

Imperative style (as in many UI frameworks): retrieve the view instance and mutate it.

```java
// Imperative style
b.setColor(red)
b.clearChildren()
ViewC c3 = new ViewC(...)
b.add(c3)
```

Declarative style (Flutter): describe the current UI state and let the framework do the transition.

```dart
// Declarative style
return ViewB(color: red, child: const ViewC());
```

### Why a declarative UI?

Frameworks from Win32 to web to Android and iOS typically use an imperative style, where you manually construct a full-functioned UI entity such as a UIView and later mutate it with methods and setters. Flutter instead lets the developer describe the current UI state and leaves the transitioning to the framework.

### How to change UI in a declarative framework

In the imperative style you go to ViewB's owner, retrieve instance `b` (selectors, `findViewById`, or similar), and invoke mutations on it. You might also need to replicate that configuration in the constructor of ViewB, since the source of truth for the UI might outlive instance `b`.

In the declarative style, view configurations (Flutter's `Widget`s) are immutable, lightweight "blueprints". To change the UI, a widget triggers a rebuild on itself (most commonly by calling `setState` on a `StatefulWidget`) and constructs a new `Widget` subtree. Rather than mutating an old instance, Flutter constructs new `Widget` instances.

The framework manages many traditional UI-object responsibilities (such as maintaining layout state) behind the scenes with `RenderObject`s. A `RenderObject` is a persistent, mutable object that handles the heavy lifting of layout, painting, and hit testing. `RenderObject`s persist between frames and the lightweight, immutable `Widget`s serve as blueprints that tell the framework to mutate the `RenderObject`s between states.

## Notes

- Flutter's declarative model (Dart) is conceptually parallel to, but a separate API from, SwiftUI (apple-swiftui) and Jetpack Compose (android-compose-ui).

## Related

- [Building user interfaces](./building-user-interfaces.md)
- [Architectural overview](./architectural-overview.md)
- [Inside Flutter](./inside-flutter.md)
