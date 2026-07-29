# touch-input

| Name | Description | Path |
|------|-------------|------|
| Modifier.anchoredDraggable | Enables drag gestures between a predefined set of anchor points (values), with automatic settle/fling animation to the nearest anchor on release. | [anchored-draggable.md](./anchored-draggable.md) |
| Modifier.clickable | Configures a component to receive clicks via touch, mouse, keyboard (Enter), d-pad center, or accessibility "click" events. | [clickable.md](./clickable.md) |
| Modifier.combinedClickable | Configures a component to receive click, double-click, and long-click gestures via touch, mouse, or accessibility events. | [combined-clickable.md](./combined-clickable.md) |
| detectDragGestures / detectHorizontalDragGestures / detectVerticalDragGestures / detectDragGesturesAfterLongPress | Low-level drag gesture detectors used inside a `pointerInput` block. | [detect-drag-gestures.md](./detect-drag-gestures.md) |
| detectTapGestures | Low-level tap/press/double-tap/long-press gesture detector used inside a `pointerInput` block. | [detect-tap-gestures.md](./detect-tap-gestures.md) |
| detectTransformGestures | Low-level multitouch gesture detector for combining pan, zoom, and rotation with other custom pointer handling. | [detect-transform-gestures.md](./detect-transform-gestures.md) |
| Modifier.dragAndDropSource / dragAndDropTarget | OS-level drag-and-drop built on the platform `DragEvent`/`ClipData` mechanism, interoperable with Android View drag-and-drop. | [drag-and-drop.md](./drag-and-drop.md) |
| Modifier.draggable | High-level entry point for single-orientation drag gestures. Only detects the gesture and reports pixel deltas via `DraggableState`. | [draggable.md](./draggable.md) |
| Modifier.focusable / FocusRequester / Modifier.focusRequester / onFocusChanged | `focusable` makes a component participate in the focus system (tab/d-pad/accessibility). | [focusable.md](./focusable.md) |
| LocalHapticFeedback / HapticFeedback | `LocalHapticFeedback` is a `CompositionLocal<HapticFeedback>` providing access to the platform's tactile feedback (vibration) capability. | [haptic-feedback.md](./haptic-feedback.md) |
| Modifier.hoverable / Modifier.pointerHoverIcon | `hoverable` makes a component emit hover interactions for mouse/stylus pointer enter/exit. | [hover.md](./hover.md) |
| Modifier.indication / IndicationNodeFactory / ripple() | Applies a reusable visual effect (such as a ripple) to a component in response to `Interaction`s emitted on an `InteractionSource`. | [indication.md](./indication.md) |
| MutableInteractionSource / Interaction | `MutableInteractionSource` emits and tracks low-level user interaction events (press, drag, hover, focus) for a component. | [interaction-source.md](./interaction-source.md) |
| Modifier.onKeyEvent / Modifier.onPreviewKeyEvent | Handle raw hardware/software keyboard events on a focused, `focusable` component. | [keyboard-input.md](./keyboard-input.md) |
| Modifier.nestedScroll | Enables an element to participate in the nested scrolling hierarchy: as a scrolling child dispatching events or as an ancestor that intercepts/observes. | [nested-scroll.md](./nested-scroll.md) |
| Modifier.pointerInput | Entry point for low-level, custom gesture handling. Installs a suspending coroutine that receives raw pointer events. | [pointer-input.md](./pointer-input.md) |
| Modifier.scrollable | Configures low-level touch scrolling and flinging for a UI element in a single orientation. | [scrollable.md](./scrollable.md) |
| Modifier.selectable / Modifier.selectableGroup | `selectable` configures a component to be selectable, typically as part of a mutually exclusive group. | [selectable.md](./selectable.md) |
| Modifier.semantics / clearAndSetSemantics / contentDescription | `semantics` attaches semantic properties to a composable for accessibility services, autofill, and UI testing. | [semantics.md](./semantics.md) |
| Stylus input & Ink API | Stylus-specific pointer data (pressure, tilt, orientation, hover distance, palm rejection) and the `androidx.ink` Ink API. | [stylus-input.md](./stylus-input.md) |
| Modifier.testTag | Attaches a string tag to a composable so it can be located in Compose UI tests, independent of visible text or content description. | [test-tag.md](./test-tag.md) |
| Modifier.toggleable / Modifier.triStateToggleable | Configures a component to support on/off (or tri-state) toggle behavior via input and accessibility events. | [toggleable.md](./toggleable.md) |
| Modifier.transformable | High-level modifier that detects multitouch pan, zoom, and rotation gestures. | [transformable.md](./transformable.md) |
