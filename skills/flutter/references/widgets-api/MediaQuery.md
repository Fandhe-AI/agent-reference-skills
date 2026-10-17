---
source: https://api.flutter.dev/flutter/widgets/MediaQuery-class.html
---

# MediaQuery class

Establishes a subtree in which media queries resolve to the given data. (inherits `Object` > `DiagnosticableTree` > `Widget` > `ProxyWidget` > `InheritedWidget` > `InheritedModel<_MediaQueryAspect>`)

## Signature / Usage

```dart
MediaQuery.sizeOf(context)
```

Constructors:

```dart
const MediaQuery({Key? key, required MediaQueryData data, required Widget child})
MediaQuery.removePadding({Key? key, required BuildContext context, bool removeLeft = false, bool removeTop = false, bool removeRight = false, bool removeBottom = false, required Widget child})
MediaQuery.removeViewInsets({Key? key, required BuildContext context, bool removeLeft = false, bool removeTop = false, bool removeRight = false, bool removeBottom = false, required Widget child})
MediaQuery.removeViewPadding({Key? key, required BuildContext context, bool removeLeft = false, bool removeTop = false, bool removeRight = false, bool removeBottom = false, required Widget child})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| data | MediaQueryData | required | Contains information about the current media. |
| child | Widget | required | The widget below this widget in the tree. |

Static methods (selection; each has a `maybe...` variant that returns null instead of throwing):

| Name | Signature | Description |
| --- | --- | --- |
| of | `MediaQueryData of(BuildContext context)` | The data from the closest instance of this class that encloses the given context. |
| maybeOf | `MediaQueryData? maybeOf(BuildContext context)` | The data from the closest instance of this class that encloses the given context, if any. |
| sizeOf | `Size sizeOf(BuildContext context)` | Returns `MediaQueryData.size` from the nearest `MediaQuery` ancestor or throws an exception, if no such ancestor exists. |
| paddingOf | `EdgeInsets paddingOf(BuildContext context)` | Returns `MediaQueryData.padding` for the nearest `MediaQuery` ancestor or throws an exception, if no such ancestor exists. |

The page also lists these other static accessors (and their `maybe...` variants): `accessibleNavigationOf`, `boldTextOf`, `devicePixelRatioOf`, `disableAnimationsOf`, `displayCornerRadiiOf`, `displayFeaturesOf`, `gestureSettingsOf`, `heightOf`, `highContrastOf`, `invertColorsOf`, `navigationModeOf`, `onOffSwitchLabelsOf`, `orientationOf`, `platformBrightnessOf`, `supportsAnnounceOf`, `supportsShowingSystemContextMenu`, `systemGestureInsetsOf`, `textScaleFactorOf`, `textScalerOf`, `viewInsetsOf`, `viewPaddingOf`, `widthOf`; and `maybeLetterSpacingOverrideOf`, `maybeLineHeightScaleFactorOverrideOf`, `maybeParagraphSpacingOverrideOf`, `maybeWordSpacingOverrideOf`; plus `fromView`, `fromWindow`, `applyTextStyleOverrides`, `withClampedTextScaling`, `withNoTextScaling`.

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- To learn the size of the current view (e.g., the `FlutterView` containing the app), use `MediaQuery.sizeOf(context)`.
- Querying with specific methods (e.g., `MediaQuery.sizeOf`, `MediaQuery.paddingOf`) causes the widget to rebuild automatically whenever that specific property changes. Querying with `MediaQuery.of` causes a rebuild whenever any field of `MediaQueryData` changes (e.g., the user rotates the device); unless you are concerned with the entire `MediaQueryData` object changing, prefer the specific methods, which rebuild more efficiently.
- If no `MediaQuery` is in scope, `MediaQuery.of` and the "...Of" methods like `sizeOf` throw an exception. The "maybe-" variants (`MediaQuery.maybeOf`, `MediaQuery.maybeSizeOf`) return null instead.
- `WidgetsApp` and `MaterialApp` introduce a `MediaQuery` and keep it up to date with the current screen metrics. `MediaQueryData` is the data structure that represents the metrics.
- `MediaQuery.removePadding`, `removeViewInsets` and `removeViewPadding` create a new `MediaQuery` that inherits from the ambient one but removes the specified padding, view insets or view padding.

## Related

- [InheritedWidget](./InheritedWidget.md)
- [LayoutBuilder](./LayoutBuilder.md)
- [Image](./Image.md)
