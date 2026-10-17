---
source: https://api.flutter.dev/flutter/widgets/LayoutBuilder-class.html
---

# LayoutBuilder class

Builds a widget tree that can depend on the parent widget's size. (inherits `Object` > `DiagnosticableTree` > `Widget` > `RenderObjectWidget` > `AbstractLayoutBuilder<BoxConstraints>` > `ConstrainedLayoutBuilder<BoxConstraints>`)

## Signature / Usage

```dart
const LayoutBuilder({
  Key? key,
  required Widget Function(BuildContext context, BoxConstraints constraints) builder,
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| builder | Widget Function(BuildContext context, BoxConstraints constraints) | required | Called at layout time to construct the widget tree. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Similar to `Builder`, except that the framework calls the `builder` function at layout time and provides the parent widget's constraints. Useful when the parent constrains the child's size and doesn't depend on the child's intrinsic size. The `LayoutBuilder`'s final size matches its child's size.
- The `builder` is called: the first time the widget is laid out; when the parent passes different layout constraints; when the parent updates this widget and `updateShouldRebuild` returns `true`; and when the dependencies the `builder` subscribes to change. It is not called during layout if the parent passes the same constraints repeatedly.
- If an ancestor skips the layout of this subtree so the constraints become outdated, the `builder` rebuilds with the last known constraints.
- If the child should be smaller than the parent, consider wrapping it in an `Align`. If the child might want to be bigger, consider wrapping it in a `SingleChildScrollView` or `OverflowBox`.
- Official example (DartPad sample `widgets.LayoutBuilder.1`; the code is not included in the API page HTML; create locally with `flutter create --sample=widgets.LayoutBuilder.1 mysample`): builds a different widget depending on the available width.
- See also `SliverLayoutBuilder` (sliver counterpart), `Builder` (calls `builder` at build time), `StatefulBuilder`, and `CustomSingleChildLayout`.

## Related

- [MediaQuery](./MediaQuery.md)
- [Container](./Container.md)
- [Stack](./Stack.md)
