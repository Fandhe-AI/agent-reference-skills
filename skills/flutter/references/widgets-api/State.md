---
source: https://api.flutter.dev/flutter/widgets/State-class.html
---

# State class

The logic and internal state for a `StatefulWidget`. `State<T extends StatefulWidget>` is an abstract class (mixes in `Diagnosticable`, annotated `@optionalTypeArgs`).

## Signature / Usage

```dart
State()                                  // constructor

BuildContext get context                 // the location in the tree where this widget builds
bool get mounted                         // whether this State object is currently in a tree
T get widget                             // the current configuration

void initState()                         // called when inserted into the tree
void didChangeDependencies()             // called when a dependency of this State changes
void didUpdateWidget(covariant T oldWidget) // called whenever the widget configuration changes
Widget build(BuildContext context)       // describes the UI represented by this widget
void setState(VoidCallback fn)           // notify the framework that internal state changed
void reassemble()                        // called on hot reload
void deactivate()                        // called when removed from the tree
void activate()                          // called when reinserted after deactivate
void dispose()                           // called when removed from the tree permanently
void debugFillProperties(DiagnosticPropertiesBuilder properties)
```

## Options / Props

Properties:

| Name | Type | Description |
| --- | --- | --- |
| context | BuildContext | The location in the tree where this widget builds. |
| mounted | bool | Whether this `State` object is currently in a tree. (no setter) |
| widget | T | The current configuration. (no setter) |

Lifecycle methods:

| Name | Signature | Description |
| --- | --- | --- |
| initState | `void initState()` | Called when this object is inserted into the tree. |
| didChangeDependencies | `void didChangeDependencies()` | Called when a dependency of this `State` object changes. |
| didUpdateWidget | `void didUpdateWidget(covariant T oldWidget)` | Called whenever the widget configuration changes. |
| build | `Widget build(BuildContext context)` | Describes the part of the user interface represented by this widget. |
| setState | `void setState(VoidCallback fn)` | Notify the framework that the internal state of this object has changed. |
| reassemble | `void reassemble()` | Called whenever the application is reassembled during debugging, for example during hot reload. |
| deactivate | `void deactivate()` | Called when this object is removed from the tree. |
| activate | `void activate()` | Called when this object is reinserted into the tree after having been removed via `deactivate`. |
| dispose | `void dispose()` | Called when this object is removed from the tree permanently. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- State is information that (1) can be read synchronously when the widget is built and (2) might change during the lifetime of the widget. The implementer must ensure the `State` is promptly notified using `setState`.
- `State` objects are created by `StatefulWidget.createState` when the widget is inflated. One `StatefulWidget` instance can have more than one `State` (inserted in multiple places); if a widget is removed and later re-inserted, `createState` is called again to create a fresh `State`.
- Lifecycle, in order: (1) the framework creates the `State` via `createState`; (2) it is associated with a `BuildContext` permanently (the context can move around the tree with its subtree) and is considered `mounted`; (3) `initState` is called for one-time initialization that depends on `context` or `widget`; (4) `didChangeDependencies` is called for initialization involving `InheritedWidget`s, and again if `BuildContext.dependOnInheritedWidgetOfExactType` was called and the inherited widgets change or the widget moves in the tree; (5) the `State` is fully initialized and `build` may be called any number of times; `setState` requests a rebuild.
- When a parent rebuilds with a new widget of the same `runtimeType` and `Widget.key`, the framework updates the `widget` property and calls `didUpdateWidget` with the previous widget; `build` is always called afterwards, so calls to `setState` in `didUpdateWidget` are redundant.
- On hot reload (pressing `r` in the `flutter` tool or from an IDE) `reassemble` is called, providing an opportunity to reinitialize data prepared in `initState`.
- If the subtree is removed from the tree, `deactivate` is called (clean up links between this object and other elements, e.g., a pointer to a descendant's `RenderObject`). The framework may reinsert the subtree before the end of the animation frame, in which case it calls `build`; resource release can be deferred to `dispose`.
- If the subtree is not reinserted by the end of the animation frame, `dispose` is called: the `State` will never build again; release retained resources (e.g., stop active animations). After `dispose`, `mounted` is false and calling `setState` is an error. This stage is terminal: a disposed `State` cannot be remounted.

## Related

- [StatefulWidget](./StatefulWidget.md)
- [StatelessWidget](./StatelessWidget.md)
- [InheritedWidget](./InheritedWidget.md)
- [BuildContext](./BuildContext.md)
