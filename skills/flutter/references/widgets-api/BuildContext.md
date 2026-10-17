---
source: https://api.flutter.dev/flutter/widgets/BuildContext-class.html
---

# BuildContext class

A handle to the location of a widget in the widget tree. (abstract class)

## Signature / Usage

```dart
@override
Widget build(BuildContext context) {
  // here, Scaffold.of(context) throws because no Scaffold is an ancestor of this context (Scaffold.maybeOf returns null)
  return Scaffold(
    appBar: AppBar(title: const Text('Demo')),
    body: Builder(
      builder: (BuildContext context) {
        return TextButton(
          child: const Text('BUTTON'),
          onPressed: () {
            Scaffold.of(context).showBottomSheet(
              (BuildContext context) {
                return Container(
                  alignment: Alignment.center,
                  height: 200,
                  color: Colors.amber,
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        const Text('BottomSheet'),
                        ElevatedButton(
                          child: const Text('Close BottomSheet'),
                          onPressed: () {
                            Navigator.pop(context);
                          },
                        )
                      ],
                    ),
                  ),
                );
              },
            );
          },
        );
      },
    )
  );
}
```

Checking `mounted` across an asynchronous gap:

```dart
  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
      onPressed: () async {
        await Future<void>.delayed(const Duration(seconds: 1));
        if (context.mounted) {
          Navigator.of(context).pop();
        }
      },
      child: const Text('Delayed pop'),
    );
  }
```

## Options / Props

Properties:

| Name | Type | Description |
| --- | --- | --- |
| debugDoingBuild | bool | Whether the `widget` is currently updating the widget or render tree. (no setter) |
| mounted | bool | Whether the `Widget` this context is associated with is currently mounted in the widget tree. (no setter) |
| owner | BuildOwner? | The `BuildOwner` for this context; in charge of managing the rendering pipeline for this context. (no setter) |
| size | Size? | The size of the `RenderBox` returned by `findRenderObject`. (no setter) |
| widget | Widget | The current configuration of the `Element` that is this `BuildContext`. (no setter) |

Methods:

| Name | Signature | Description |
| --- | --- | --- |
| dependOnInheritedElement | `InheritedWidget dependOnInheritedElement(InheritedElement ancestor, {Object? aspect})` | Registers this build context with `ancestor` such that when `ancestor`'s widget changes this build context is rebuilt. |
| dependOnInheritedWidgetOfExactType | `T? dependOnInheritedWidgetOfExactType<T extends InheritedWidget>({Object? aspect})` | Returns the nearest widget of the given type `T` and creates a dependency on it, or null if none is found. |
| dispatchNotification | `void dispatchNotification(Notification notification)` | Start bubbling this notification at the given build context. |
| findAncestorRenderObjectOfType | `T? findAncestorRenderObjectOfType<T extends RenderObject>()` | Returns the `RenderObject` of the nearest ancestor `RenderObjectWidget` that is an instance of `T`. |
| findAncestorStateOfType | `T? findAncestorStateOfType<T extends State<StatefulWidget>>()` | Returns the `State` object of the nearest ancestor `StatefulWidget` that is an instance of `T`. |
| findAncestorWidgetOfExactType | `T? findAncestorWidgetOfExactType<T extends Widget>()` | Returns the nearest ancestor widget of the given type `T`, which must be the type of a concrete `Widget` subclass. |
| findRenderObject | `RenderObject? findRenderObject()` | The current `RenderObject` for the widget (for a `RenderObjectWidget`, the one it created; otherwise the first descendant `RenderObjectWidget`'s). |
| findRootAncestorStateOfType | `T? findRootAncestorStateOfType<T extends State<StatefulWidget>>()` | Returns the `State` object of the furthest ancestor `StatefulWidget` that is an instance of `T`. |
| getElementForInheritedWidgetOfExactType | `InheritedElement? getElementForInheritedWidgetOfExactType<T extends InheritedWidget>()` | Returns the `InheritedElement` for the nearest ancestor widget of type `T` without registering a dependency. |
| describeElement / describeWidget / describeMissingAncestor / describeOwnershipChain | — | Diagnostics helpers returning `DiagnosticsNode`s for error reports. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Methods are usable from `StatelessWidget.build` and from methods on `State` objects. `BuildContext` objects are passed to `WidgetBuilder` functions and are available from `State.context`. Static functions such as `showDialog` and `Theme.of` take build contexts to act on behalf of the calling widget.
- Each widget has its own `BuildContext`, which becomes the parent of the widget returned by `build`. Within a build method, the context of the widget that has the build method is not the same as the context of the widgets it returns (e.g., `Theme.of(context)` will not find a `Theme` the build method itself returns). Use a `Builder` widget to obtain a context for a subpart of the returned tree.
- A widget's `BuildContext` can change location over time as the widget moves around the tree, so values returned from its methods should not be cached beyond the execution of a single synchronous function.
- Avoid storing `BuildContext` instances: they may become invalid if the widget is unmounted. If a context is used across an asynchronous gap, check `mounted` before interacting with it.
- The official sample comment says Scaffold.of(context) returns null; it actually throws, and only Scaffold.maybeOf returns null.
- `BuildContext` objects are actually `Element` objects; the interface is used to discourage direct manipulation of `Element` objects.

## Related

- [StatelessWidget](./StatelessWidget.md)
- [State](./State.md)
- [InheritedWidget](./InheritedWidget.md)
