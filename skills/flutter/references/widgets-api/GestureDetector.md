---
source: https://api.flutter.dev/flutter/widgets/GestureDetector-class.html
---

# GestureDetector class

A widget that detects gestures. (inherits `Object` > `DiagnosticableTree` > `Widget` > `StatelessWidget`)

## Signature / Usage

```dart
GestureDetector({
  Key? key,
  Widget? child,
  GestureTapCallback? onTap,
  GestureTapDownCallback? onTapDown,
  GestureTapUpCallback? onTapUp,
  GestureTapCancelCallback? onTapCancel,
  GestureTapCallback? onDoubleTap,
  GestureLongPressCallback? onLongPress,
  GestureDragStartCallback? onPanStart,
  GestureDragUpdateCallback? onPanUpdate,
  GestureDragEndCallback? onPanEnd,
  GestureScaleStartCallback? onScaleStart,
  GestureScaleUpdateCallback? onScaleUpdate,
  GestureScaleEndCallback? onScaleEnd,
  HitTestBehavior? behavior,
  bool excludeFromSemantics = false,
  DragStartBehavior dragStartBehavior = DragStartBehavior.start,
  // ... (full parameter list below)
})
```

(The snippet above is an excerpt of the constructor signature on the API page; the page embeds only DartPad samples `widgets.GestureDetector.1`–`.3`.)

## Options / Props

All callback parameters are optional (`?`). Groups of named parameters in the constructor:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| child | Widget? | — | The widget below this widget in the tree. |
| onTapDown / onTapUp / onTap / onTapMove / onTapCancel | GestureTapDownCallback? / GestureTapUpCallback? / GestureTapCallback? / GestureTapMoveCallback? / GestureTapCancelCallback? | — | Primary-button tap callbacks. |
| onSecondaryTap / onSecondaryTapDown / onSecondaryTapUp / onSecondaryTapCancel | tap callbacks | — | Secondary-button taps. |
| onTertiaryTapDown / onTertiaryTapUp / onTertiaryTapCancel | tap callbacks | — | Tertiary-button taps. |
| onDoubleTapDown / onDoubleTap / onDoubleTapCancel | tap callbacks | — | Double tap. |
| onLongPressDown / onLongPressCancel / onLongPress / onLongPressStart / onLongPressMoveUpdate / onLongPressUp / onLongPressEnd | GestureLongPress*Callback? | — | Primary long press. The same set exists with `onSecondaryLongPress*` and `onTertiaryLongPress*` prefixes. |
| onVerticalDragDown / Start / Update / End / Cancel | GestureDrag*Callback? | — | Vertical drag. |
| onHorizontalDragDown / Start / Update / End / Cancel | GestureDrag*Callback? | — | Horizontal drag. |
| onPanDown / onPanStart / onPanUpdate / onPanEnd / onPanCancel | GestureDrag*Callback? | — | Pan. |
| onForcePressStart / Peak / Update / End | GestureForcePress*Callback? | — | Force press. |
| onScaleStart / onScaleUpdate / onScaleEnd | GestureScale*Callback? | — | Scale. |
| behavior | HitTestBehavior? | — | How this gesture detector should behave during hit testing when deciding how the hit test propagates to children and whether to consider targets behind this one. |
| excludeFromSemantics | bool | false | Whether to exclude these gestures from the semantics tree. For example, the long-press gesture for showing a tooltip is excluded because the tooltip itself is included in the semantics tree directly and so having a gesture to show it would result in duplication of information. |
| dragStartBehavior | DragStartBehavior | DragStartBehavior.start | Determines the way that drag start behavior is handled. |
| trackpadScrollCausesScale | bool | false | Whether scrolling up/down on a trackpad should cause scaling instead of panning. |
| trackpadScrollToScaleFactor | Offset | kDefaultTrackpadScrollToScaleFactor | Scale factor applied to trackpad scrolling when `trackpadScrollCausesScale` is true. |
| supportedDevices | Set&lt;PointerDeviceKind&gt;? | — | The kind of devices that are allowed to be recognized. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Attempts to recognize gestures that correspond to its non-null callbacks. If it has a child, it defers to that child for its sizing behavior; if it has no child, it grows to fit the parent.
- By default a `GestureDetector` with an invisible child ignores touches; this can be controlled with `behavior`. It also listens for accessibility events and maps them to the callbacks; set `excludeFromSemantics` to true to ignore them. See flutter.dev/to/gestures.
- Material design applications typically react to touches with ink splash effects; `InkWell` implements this and can be used in place of a `GestureDetector` for handling taps.
- Troubleshooting (why isn't my parent `onTap` called?): given a parent `GestureDetector` with an `onTap` and a child `GestureDetector` that also defines `onTap`, tapping the inner one sends a `GestureRecognizer` from both into the gesture arena (the pointer coordinates are within both bounds). The child wins because it was first to enter the arena (first come, first served); the child `onTap` is called and the parent's is not. Setting `behavior` to `HitTestBehavior.opaque` or `HitTestBehavior.translucent` has no impact on parent-child relationships. Some callbacks (e.g. `onTapDown`) can fire before a recognizer wins the arena, and others (e.g. `onTapCancel`) fire even when it loses, so the parent may call some callbacks even though it loses. See "Gesture disambiguation" (flutter.dev/to/gesture-disambiguation).
- Debugging: to see how large the hit test box is, set `debugPaintPointersEnabled` to true; `debugPrintGestureArenaDiagnostics` prints useful information about gesture arenas.
- See also `Listener` (lower-level raw pointer events), `MouseRegion`, and `RawGestureDetector` (custom gestures).

## Related

- [Text](./Text.md)
- [Container](./Container.md)
- [Navigator](./Navigator.md)
