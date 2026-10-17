---
source: https://docs.flutter.dev/ui/interactivity/gestures/drag-outside
---

# Drag outside an app

How to drag from an app to another app or the operating system. Two approaches: Flutter's own `Draggable` / `DragTarget` widgets, or the `super_drag_and_drop` package from pub.dev.

## Signature / Usage

The page contains no code block. Links given on the page:

```text
Draggable        https://api.flutter.dev/flutter/widgets/Draggable-class.html
DragTarget       https://api.flutter.dev/flutter/widgets/DragTarget-class.html
super_drag_and_drop   https://pub.dev/packages/super_drag_and_drop
Recipe: Drag a UI element within an app   https://docs.flutter.dev/cookbook/effects/drag-a-widget
```

### Create draggable widgets within your app

To implement drag and drop within your application, use the `Draggable` widget (see the "Drag a UI element within an app" recipe). An advantage of `Draggable` and `DragTarget` is that you can supply Dart code to decide whether to accept a drop.

### Implement drag and drop between apps

To implement drag and drop within your application _and_ between your application and another (possibly non-Flutter) app, use the `super_drag_and_drop` package.

## Notes

- To avoid implementing two styles of drag and drop, you can supply `local data` to the package to perform drags within your app.
- Unlike `Draggable`, you must tell the package up front what data your app accepts, because the platform APIs need a synchronous response, which doesn't allow an asynchronous response from the framework.
- The package approach works across desktop, mobile, _and_ web.
- `super_drag_and_drop` is a pub.dev package, not part of the Flutter SDK; its API is not covered by this skill.

## Related

- [Taps, drags, and other gestures](./gestures.md)
