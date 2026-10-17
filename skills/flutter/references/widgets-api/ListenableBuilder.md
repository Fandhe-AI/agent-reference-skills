---
source: https://api.flutter.dev/flutter/widgets/ListenableBuilder-class.html
---

# ListenableBuilder class

A general-purpose widget for building a widget subtree when a `Listenable` changes. (inherits `Object` > `DiagnosticableTree` > `Widget` > `StatefulWidget` > `AnimatedWidget`)

## Signature / Usage

```dart
const ListenableBuilder({
  Key? key,
  required Listenable listenable,
  required TransitionBuilder builder,
  Widget? child,
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| listenable | Listenable | required | The `Listenable` supplied to the constructor. |
| builder | TransitionBuilder | required | Called every time the `listenable` notifies about a change. |
| child | Widget? | — | The child widget to pass to the `builder`. |

Override: `Widget build(BuildContext context)` — build widgets that depend on the state of the listenable.

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Useful for more complex widgets that wish to listen to changes in other objects as part of a larger build function. Any `Listenable` subtype (`ChangeNotifier`, `ValueNotifier`, `Animation`) can be used to rebuild only certain parts of a widget when it notifies its listeners. If an `Animation` is being listened to, consider `AnimatedBuilder` instead for better readability (identical implementation).
- Performance: if the `builder` contains a subtree that does not depend on the `listenable`, specify it via the prebuilt `child`; `ListenableBuilder` passes it back to `builder` so it is built once instead of on every change. Using the pre-built `child` is optional but good practice.
- Official examples (DartPad samples `widgets.ListenableBuilder.1`–`.3`; the code is not included in the API page HTML): a `ChangeNotifier` subclass holding a counter with a `ListenableBuilder` updating a `Text`; the same with a `ValueNotifier` for a single immutable value; and a `ListenableBuilder` listening to a `FocusNode` (also a `ChangeNotifier`) so only the `Container` rebuilds on focus changes.
- See also `AnimatedBuilder` (same functionality, named for `Animation`s) and `ValueListenableBuilder` (specialized for `ValueNotifier`s, reports the new value in its builder callback).

## Related

- [ChangeNotifier](./ChangeNotifier.md)
- [StatefulWidget](./StatefulWidget.md)
- [Container](./Container.md)
