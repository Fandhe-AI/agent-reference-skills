# MutableInteractionSource / Interaction

`MutableInteractionSource` emits and tracks low-level user interaction events (press, drag, hover, focus) for a component, exposed as a Kotlin `Flow`. High-level components hoist it as a parameter so callers can observe or drive visual state.

## Signature / Usage

```kotlin
interface InteractionSource {
    val interactions: Flow<Interaction>
}

interface MutableInteractionSource : InteractionSource {
    suspend fun emit(interaction: Interaction)
    fun tryEmit(interaction: Interaction): Boolean
}
```

```kotlin
val interactionSource = remember { MutableInteractionSource() }
val isPressed by interactionSource.collectIsPressedAsState()

Button(onClick = { /* ... */ }, interactionSource = interactionSource) {
    Text(if (isPressed) "Pressed!" else "Not pressed")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `PressInteraction.Press` / `.Release` / `.Cancel` | `Interaction` | Emitted for touch/click presses; `Release` completes the click, `Cancel` when dragged away and released. |
| `DragInteraction.Start` / `.Stop` / `.Cancel` | `Interaction` | Emitted for drag gestures. |
| `HoverInteraction.Enter` / `.Exit` | `Interaction` | Emitted when a pointer hovers in/out. |
| `FocusInteraction.Focus` / `.Unfocus` | `Interaction` | Emitted on focus gain/loss. |

## Notes

- Convenience state collectors: `collectIsPressedAsState()`, `collectIsFocusedAsState()`, `collectIsDraggedAsState()`, `collectIsHoveredAsState()`.
- Interactions come in start/end pairs; end interactions (`Release`, `Cancel`, `Stop`, `Exit`, `Unfocus`) reference their corresponding start interaction, useful for tracking multiple concurrent interactions in a `mutableStateListOf<Interaction>()`.
- Interactions starting and ending within the same frame may not be observable in derived state — account for this when driving animations directly from interaction flow.
- Package: `androidx.compose.foundation.interaction`.

## Related

- [indication](./indication.md)
- [clickable](./clickable.md)
