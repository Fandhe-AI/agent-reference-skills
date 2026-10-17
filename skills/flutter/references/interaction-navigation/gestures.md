---
source: https://docs.flutter.dev/ui/interactivity/gestures
---

# Taps, drags, and other gestures

How gestures, such as taps and drags, work in Flutter. The gesture system has two layers: raw pointer events, and gestures that describe semantic actions made of one or more pointer movements.

## Signature / Usage

Listen to raw pointer events with `Listener`; listen to gestures with `GestureDetector`. The `GestureDetector` decides which gestures to attempt to recognize based on which of its callbacks are non-null.

```dart
return GestureDetector(
  onTapDown: _handleTapDown, // Handle the tap events in the order that
  onTapUp: _handleTapUp, // they occur: down, up, tap, cancel
  onTap: _handleTap,
  onTapCancel: _handleTapCancel,
  child: Container(
```

(This page itself contains no code block. The snippet above is verbatim from the `TapboxC` example on the interactivity page, https://docs.flutter.dev/ui/interactivity, and is truncated at `child:`.)

### Pointers

Four types of pointer events:

| Event | Meaning |
|-------|---------|
| `PointerDownEvent` | The pointer has contacted the screen at a particular location. |
| `PointerMoveEvent` | The pointer has moved from one location on the screen to another. |
| `PointerUpEvent` | The pointer has stopped contacting the screen. |
| `PointerCancelEvent` | Input from this pointer is no longer directed towards this app. |

On pointer down, the framework does a _hit test_ to determine which widget exists at that location. The pointer down event (and subsequent events for that pointer) are dispatched to the innermost widget found by the hit test, then bubble up the tree to all widgets on the path to the root. There is no mechanism for canceling or stopping pointer events from being dispatched further.

To listen to pointer events directly from the widgets layer, use a `Listener` widget. Generally, consider using gestures instead.

### Gesture callbacks

| Group | Callback | Description |
|-------|----------|-------------|
| Tap | `onTapDown` | A pointer that might cause a tap has contacted the screen at a particular location. |
| Tap | `onTapUp` | A pointer that triggers a tap has stopped contacting the screen at a particular location. |
| Tap | `onTap` | The pointer that previously triggered the `onTapDown` has also triggered `onTapUp` which ends up causing a tap. |
| Tap | `onTapCancel` | The pointer that previously triggered the `onTapDown` won't end up causing a tap. |
| Double tap | `onDoubleTap` | The user has tapped the screen at the same location twice in quick succession. |
| Long press | `onLongPress` | A pointer has remained in contact with the screen at the same location for a long period of time. |
| Vertical drag | `onVerticalDragStart` | A pointer has contacted the screen and might begin to move vertically. |
| Vertical drag | `onVerticalDragUpdate` | A pointer that is in contact with the screen and moving vertically has moved in the vertical direction. |
| Vertical drag | `onVerticalDragEnd` | A pointer that was previously in contact with the screen and moving vertically is no longer in contact with the screen and was moving at a specific velocity when it stopped contacting the screen. |
| Horizontal drag | `onHorizontalDragStart` | A pointer has contacted the screen and might begin to move horizontally. |
| Horizontal drag | `onHorizontalDragUpdate` | A pointer that is in contact with the screen and moving horizontally has moved in the horizontal direction. |
| Horizontal drag | `onHorizontalDragEnd` | A pointer that was previously in contact with the screen and moving horizontally is no longer in contact with the screen and was moving at a specific velocity when it stopped contacting the screen. |
| Pan | `onPanStart` | A pointer has contacted the screen and might begin to move horizontally or vertically. This callback crashes if `onHorizontalDragStart` or `onVerticalDragStart` is set. |
| Pan | `onPanUpdate` | A pointer that is in contact with the screen and is moving in the vertical or horizontal direction. This callback crashes if `onHorizontalDragUpdate` or `onVerticalDragUpdate` is set. |
| Pan | `onPanEnd` | A pointer that was previously in contact with screen is no longer in contact with the screen and is moving at a specific velocity when it stopped contacting the screen. This callback crashes if `onHorizontalDragEnd` or `onVerticalDragEnd` is set. |

### Gesture disambiguation

At a given location on screen, there might be multiple gesture detectors (for example a `ListTile` tap recognizer with a nested trailing icon button, or one `GestureDetector` handling both tap and long press). When more than one recognizer exists for a pointer, each recognizer joins the _gesture arena_. Rules:

- At any time, a recognizer can eliminate itself and leave the arena. If there's only one recognizer left in the arena, that recognizer wins.
- At any time, a recognizer can declare itself the winner, causing all of the remaining recognizers to lose.

When disambiguating horizontal and vertical dragging, both recognizers enter the arena on pointer down; whichever sees the pointer move more than a certain number of logical pixels in its direction declares the win. The arena is beneficial with only a horizontal (or vertical) drag recognizer: it is recognized immediately, so the first pixel of horizontal movement can be treated as a drag.

## Notes

- If you're using Material Components, many widgets already respond to taps or gestures: `IconButton` and `TextButton` respond to presses (taps), and `ListView` responds to swipes to trigger scrolling. For the "ink splash" effect on a tap without those widgets, use `InkWell`.
- Flutter gesture system (Dart, `GestureDetector` / gesture arena); distinct from browser DOM pointer events, Jetpack Compose `pointerInput`, and SwiftUI gesture modifiers in the other skills.

## Related

- [Add interactivity to your Flutter app](./interactivity.md)
- [Drag outside an app](./drag-outside.md)
