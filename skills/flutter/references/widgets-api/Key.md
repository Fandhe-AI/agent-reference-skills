---
source: https://api.flutter.dev/flutter/foundation/Key-class.html
---

# Key class

A `Key` is an identifier for `Widget`s, `Element`s and `SemanticsNode`s. (abstract class from `package:flutter/foundation.dart`, annotated `@immutable`; implemented by `GlobalKey` and `LocalKey`)

## Signature / Usage

```dart
const factory Key(String value)   // Construct a ValueKey<String> with the given String.
const Key.empty()                 // Default constructor, used by subclasses.
```

## Options / Props

Constructors:

| Name | Parameters | Description |
| --- | --- | --- |
| Key | `String value` | `const` `factory`. Construct a `ValueKey<String>` with the given `String`. |
| Key.empty | — | `const`. Default constructor, used by subclasses. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- A new widget will only be used to update an existing element if its key is the same as the key of the current widget associated with the element.
- If no key is provided, the default value is null and the widget is considered unkeyed; Flutter then matches widgets based on their `Widget.runtimeType` and position in the tree during rebuilds.
- Keys must be unique amongst the `Element`s with the same parent.
- Subclasses of `Key` should either subclass `LocalKey` or `GlobalKey`.
- A common mistake is to rebuild the widget tree in such a way that Flutter attaches the incorrect `State` object to an unkeyed `StatefulWidget`. This can often be solved by using an appropriate `Key` on the `StatefulWidget`; see `ValueKey` for a common case. See also `Widget.key`.

## Related

- [StatefulWidget](./StatefulWidget.md)
- [State](./State.md)
