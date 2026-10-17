---
source: https://kotlinlang.org/docs/multiplatform/compose-desktop-mouse-events.html
---

# Mouse event listeners

In a desktop project you can listen to mouse events such as clicking, moving, scrolling, or entering and exiting the input region.

## Signature / Usage

Click listeners (`onClick`, `onDoubleClick`, `onLongClick`) via `combinedClickable`; available on Android and desktop:

```kotlin
@OptIn(ExperimentalFoundationApi::class)
Box(modifier = Modifier
    .background(Color.Magenta)
    .fillMaxWidth(0.7f)
    .fillMaxHeight(0.7f)
    .combinedClickable(
        onClick = {
            text = "Click! ${count++}"
        },
        onDoubleClick = {
            text = "Double click! ${count++}"
        },
        onLongClick = {
            text = "Long click! ${count++}"
        }
    )
)
```

Move listener (experimental `onPointerEvent`, needs `@OptIn(ExperimentalComposeUiApi::class)`):

```kotlin
Box(modifier = Modifier
    .wrapContentSize(Alignment.Center)
    .fillMaxSize()
    .background(color = color)
    .onPointerEvent(PointerEventType.Move) {
        val position = it.changes.first().position
        color = Color(position.x.toInt() % 256, position.y.toInt() % 256, 0)
    }
)
```

Enter and exit listeners:

```kotlin
Text(modifier = Modifier
    .fillMaxWidth()
    .background(color = if (active) Color.Green else Color.White)
    .onPointerEvent(PointerEventType.Enter) { active = true }
    .onPointerEvent(PointerEventType.Exit) { active = false },
    fontSize = 30.sp,
    fontStyle = if (active) FontStyle.Italic else FontStyle.Normal,
    text = "Item $index",
    textAlign = TextAlign.Center
)
```

Scroll listener:

```kotlin
Box(
    Modifier
        .fillMaxSize()
        .onPointerEvent(PointerEventType.Scroll) {
            number += it.changes.first().scrollDelta.y
        },
    contentAlignment = Alignment.Center
) {
    Text("Scroll to change the number: $number", fontSize = 30.sp)
}
```

Experimental `Modifier.onClick` (desktop only, `@OptIn(ExperimentalFoundationApi::class)`), with matcher and keyboard modifiers:

```kotlin
Box(modifier = Modifier
    .size(300.dp, 200.dp)
    .background(Color.LightGray)
    // The most generic click handler (without extra conditions) should be the first one
    .onClick {
        // Receives all left mouse button clicks except for when Shift is pressed
        println("Click with primary button")
        topBoxText = "LMB ${topBoxCount++}"
    }.onClick(
        keyboardModifiers = { isShiftPressed } // Accepts clicks only when Shift is pressed
    ) {
        // Receives all left mouse button clicks when Shift is pressed
        println("Click with primary button and shift pressed")
        topBoxCount++
        topBoxText = "LMB + Shift ${topBoxCount++}"
    }
)

Box(modifier = Modifier
    .size(300.dp, 200.dp)
    .background(Color.Yellow)
    .onClick(
        enabled = true,
        interactionSource = interactionSource,
        matcher = PointerMatcher.mouse(PointerButton.Secondary), // Right mouse button
        keyboardModifiers = { isAltPressed }, // Accepts clicks only when Alt is pressed
        onLongClick = { // Optional
            println("Long Click with secondary button and Alt pressed")
        },
        onDoubleClick = { // Optional
            println("Double Click with secondary button and Alt pressed")
        },
        onClick = {
            println("Click with secondary button and Alt pressed")
        }
    )
    .onClick(interactionSource = interactionSource) { // Uses default parameters
        println("Click with primary button (mouse left button)")
    }
    .indication(interactionSource, LocalIndication.current)
)
```

Experimental `Modifier.onDrag` (desktop only):

```kotlin
Box(modifier = Modifier
    .offset {
        IntOffset(topBoxOffset.x.toInt(), topBoxOffset.y.toInt())
    }
    .size(200.dp)
    .background(Color.Green)
    .onDrag { // By default: enabled = true, matcher = PointerMatcher.Primary (left mouse button)
        topBoxOffset += it
    }
)

Box(modifier = Modifier
    .size(200.dp)
    .background(Color.LightGray)
    .onDrag(
        matcher = PointerMatcher.mouse(PointerButton.Secondary), // Right mouse button
        onDragStart = {
            println("Gray Box: drag start")
        },
        onDragEnd = {
            println("Gray Box: drag end")
        }
    ) {
        val keyboardModifiers = windowInfo.keyboardModifiers
        bottomBoxOffset += if (keyboardModifiers.isCtrlPressed) it * 2f else it
    }
)
```

Non-modifier drag handling with `detectDragGestures`:

```kotlin
.pointerInput(Unit) {
    detectDragGestures(
        matcher = PointerMatcher.Primary
    ) {
        topBoxOffset += it
    }
}
```

Raw AWT events:

```kotlin
.onPointerEvent(PointerEventType.Press) {
    text = it.awtEventOrNull?.locationOnScreen?.toString().orEmpty()
}
```

Raw events in common code via the stable `Modifier.pointerInput`:

```kotlin
Column(
    Modifier
        .fillMaxSize()
        .pointerInput(Unit) {
            awaitPointerEventScope {
                while (true) {
                    val event = awaitPointerEvent()
                    val position = event.changes.first().position
                    // On each relayout, Compose will send a synthetic Move event,
                    // so we skip it to avoid event spam
                    if (event.type != PointerEventType.Move) {
                        list.add(0, "${event.type} $position")
                    }
                }
            }
        },
) {
    for (item in list.take(20)) {
        Text(item)
    }
}
```

## Options / Props

`Modifier.onClick` parameters described in the source:

| Name | Type | Description |
| --- | --- | --- |
| `matcher` | `PointerMatcher` | Chooses which mouse button triggers the click event. |
| `keyboardModifiers` | `PointerKeyboardModifiers.() -> Boolean` | Filters pointer events that have the specified key pressed. |

## Notes

- `combinedClickable` supports only the primary (left) mouse button and touch events; use `Modifier.onClick` to handle other buttons.
- Experimental: `onPointerEvent` (desktop-only helper, short variant of `pointerInput`, not usable in common code; use it only for evaluation; stable alternative is `Modifier.pointerInput`), `Modifier.onClick`, and `Modifier.onDrag` (desktop projects only). Opt-in is required.
- `Modifier.onClick` handles pointer events only and does not handle accessibility `click` events out of the box. Unlike `clickable`, it has no default `Modifier.indication` and `Modifier.semantics`, and does not trigger on Enter. Declare the most generic `onClick` handlers (fewest conditions) first to ensure correct propagation.
- Chains of several `onClick` or `onDrag` modifiers are allowed. Keyboard modifier state during a drag is available via `LocalWindowInfo.current.keyboardModifier(s)`.
- Distance line: `clickable`, `pointerInput`, and gesture detectors are common androidx.compose APIs covered by android-compose-ui; this page covers the desktop mouse-specific modifiers.

## Related

- [Keyboard events](./keyboard.md)
- [Scrollbars](./scrollbars.md)
- [Context menus](./context-menus.md)
- [Swing interoperability](./swing-interoperability.md)
