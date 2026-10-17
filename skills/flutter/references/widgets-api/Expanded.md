---
source: https://api.flutter.dev/flutter/widgets/Expanded-class.html
---

# Expanded class

A widget that expands a child of a `Row`, `Column`, or `Flex` so that the child fills the available space. (inherits `Object` > `DiagnosticableTree` > `Widget` > `ProxyWidget` > `ParentDataWidget<FlexParentData>` > `Flexible`)

## Signature / Usage

```dart
const Expanded({
  Key? key,
  int flex = 1,
  required Widget child,
})
```

Typical use inside a `Row`:

```dart
const Row(
  children: <Widget>[
    Expanded(
      child: Text('Deliver features faster', textAlign: TextAlign.center),
    ),
    Expanded(
      child: Text('Craft beautiful UIs', textAlign: TextAlign.center),
    ),
  ],
)
```

(The snippet above is taken from the `Row` API page; the `Expanded` page itself embeds only DartPad samples `widgets.Expanded.1` and `widgets.Expanded.2`.)

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| flex | int | 1 | The flex factor to use for this child. |
| child | Widget | required | The widget below this widget in the tree. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Makes a child of a `Row`, `Column`, or `Flex` expand to fill the available space along the main axis (horizontally for a `Row`, vertically for a `Column`). If multiple children are expanded, the available space is divided among them according to the `flex` factor.
- An `Expanded` widget must be a descendant of a `Row`, `Column`, or `Flex`, and the path from the `Expanded` widget to its enclosing `Row`, `Column`, or `Flex` must contain only `StatelessWidget`s or `StatefulWidget`s (not other kinds of widgets, like `RenderObjectWidget`s).
- Official examples (DartPad samples, create locally with `flutter create --sample=widgets.Expanded.1 mysample`): an `Expanded` in a `Column` so that its middle child, a `Container`, expands to fill the space; and an `Expanded` in a `Row` with multiple expanded children using the `flex` factor to prioritize available space.
- See also `Flexible` (does not force the child to fill the available space) and `Spacer` (takes up space proportional to its flex value).

## Related

- [Row](./Row.md)
- [Column](./Column.md)
- [Container](./Container.md)
