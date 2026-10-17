---
source: https://kotlinlang.org/docs/multiplatform/compose-popups.html
---

# Popups

A popup is a floating container that renders its content on top of the current UI within the same window. Unlike `Dialog()` (modal, focus-taking, centered, dimmed scrim), a `Popup()` is non-modal: no scrim, no width restriction, the underlying UI stays interactive, and it is not centered by default.

## Signature / Usage

Alignment and offset:

```kotlin
var isPopupOpen by remember { mutableStateOf(false) }

Box(Modifier.padding(24.dp)) {
    Button(onClick = { isPopupOpen = !isPopupOpen }) {
        Text("Toggle popup")
    }

    if (isPopupOpen) {
        Popup(
            // Positions the popup relative to the button
            alignment = Alignment.TopStart,
            // Shifts the popup by (x, y) in pixels
            offset = IntOffset(30, 70),
            // Hides the popup when it is dismissed,
            // for example, when the user clicks outside it
            onDismissRequest = { isPopupOpen = false }
        ) {
            Box(
                Modifier
                    .background(Color.LightGray, RoundedCornerShape(4.dp))
                    .padding(12.dp)
            ) {
                Text("Popup content on top of UI")
            }
        }
    }
}
```

Anchored placement with a custom `PopupPositionProvider`:

```kotlin
val belowAnchor = remember {
    object : PopupPositionProvider {
        override fun calculatePosition(
            anchorBounds: IntRect,
            windowSize: IntSize,
            layoutDirection: LayoutDirection,
            popupContentSize: IntSize
        ) = IntOffset(x = anchorBounds.left - 20, y = anchorBounds.bottom - 20)
    }
}

Popup(
    popupPositionProvider = belowAnchor,
    onDismissRequest = { isPopupOpen = false }
) {
    Text("Anchored to the button")
}
```

## Options / Props

`PopupProperties`:

| Name | Type | Description |
| --- | --- | --- |
| focusable | — | Whether the popup receives key events; disabled by default |
| dismissOnBackPress | — | Dismisses on Android's back button or **Esc** on desktop; enabled by default; requires `focusable = true` |
| dismissOnClickOutside | — | Dismisses when the user presses outside its bounds; enabled by default |

## Notes

- Use `Dialog()` to interrupt the user and require a decision (confirmations, alerts, short forms); for separate OS-level dialogs on desktop see `DialogWindow()` in compose-desktop/windows-management.md. Use `Popup()` for lightweight, non-blocking overlays such as dropdowns, tooltips and menus.
- `Popup()` and `PopupProperties` are common API, but some properties are not in the common source set; for example `usePlatformInsets` is available on iOS and limits the popup content to the platform insets (the safe area).
- Distance line: the common `Popup` / `Dialog` API reference is on the Jetpack Compose side (android-compose-ui / android-compose-components); this page covers the multiplatform behavior.

## Related

- [Top-level windows management](../compose-desktop/windows-management.md)
- [Tooltips](../compose-desktop/tooltips.md)
