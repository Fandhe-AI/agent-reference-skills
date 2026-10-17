---
source: https://api.flutter.dev/flutter/foundation/ChangeNotifier-class.html
---

# ChangeNotifier class

A class that can be extended or mixed in that provides a change notification API using `VoidCallback` for notifications. (`mixin` / class from `package:flutter/foundation.dart`; implements `Listenable`)

## Signature / Usage

```dart
ChangeNotifier()                            // constructor

bool get hasListeners                       // whether any listeners are currently registered
void addListener(VoidCallback listener)     // register a closure to be called when the object changes
void removeListener(VoidCallback listener)  // remove a previously registered closure
void notifyListeners()                      // call all the registered listeners
void dispose()                              // discards any resources used by the object
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| hasListeners | `bool` (no setter) | Whether any listeners are currently registered. |
| addListener | `void addListener(VoidCallback listener)` | Register a closure to be called when the object changes. |
| removeListener | `void removeListener(VoidCallback listener)` | Remove a previously registered closure from the list of closures that are notified when the object changes. |
| notifyListeners | `void notifyListeners()` | Call all the registered listeners. |
| dispose | `void dispose()` | Discards any resources used by the object. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Adding listeners is O(1); removing listeners and dispatching notifications is O(N), where N is the number of listeners.
- A data structure can extend or mix in `ChangeNotifier` to implement the `Listenable` interface and thus become usable with widgets that listen for changes to `Listenable`s, such as `ListenableBuilder`.
- Official examples (rendered as DartPad samples `foundation.ChangeNotifier.1` / `.2`; create locally with `flutter create --sample=foundation.ChangeNotifier.1 mysample`): a simple counter whose count is stored in a `ChangeNotifier` subclass and displayed via a `ListenableBuilder` limiting rebuilds to the `Text` widget; and a `ChangeNotifier` subclass encapsulating a list that notifies clients whenever an item is added. The code is not included in the API page HTML.
- See also `ValueNotifier`, a `ChangeNotifier` that wraps a single value.

## Related

- [ListenableBuilder](./ListenableBuilder.md)
- [StatefulWidget](./StatefulWidget.md)
