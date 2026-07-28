# Modifier.hoverable / Modifier.pointerHoverIcon

`hoverable` makes a component emit hover interactions for mouse/stylus pointer enter/exit (e.g. to show a hover highlight). `pointerHoverIcon` sets the cursor icon shown while the pointer hovers over the element.

## Signature / Usage

```kotlin
fun Modifier.hoverable(
    interactionSource: MutableInteractionSource,
    enabled: Boolean = true,
): Modifier

fun Modifier.pointerHoverIcon(
    icon: PointerIcon,
    overrideDescendants: Boolean = false,
): Modifier
```

```kotlin
val interactionSource = remember { MutableInteractionSource() }
val isHovered by interactionSource.collectIsHoveredAsState()

Box(
    Modifier
        .hoverable(interactionSource)
        .pointerHoverIcon(PointerIcon.Hand)
        .background(if (isHovered) Color.LightGray else Color.Transparent),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `interactionSource` | `MutableInteractionSource` | — | Emits `HoverInteraction.Enter` / `.Exit`. |
| `enabled` (hoverable) | `Boolean` | `true` | When `false`, hover events are ignored. |
| `icon` | `PointerIcon` | — | Cursor to display, e.g. `PointerIcon.Hand`, `PointerIcon.Text`, `PointerIcon.Crosshair`, or a custom icon. |
| `overrideDescendants` | `Boolean` | `false` | When `true`, descendants cannot override this icon with their own `pointerHoverIcon`. |

## Notes

- `clickable` and similar interactive modifiers already handle hover visuals via their `indication`; use `hoverable` directly only for custom hover-driven visuals outside those modifiers.
- Combine with `collectIsHoveredAsState()` on the same `MutableInteractionSource` to derive a simple `Boolean` hover state.
- Package: `androidx.compose.foundation` (`hoverable`), `androidx.compose.ui.input.pointer` (`pointerHoverIcon`).

## Related

- [interaction-source](./interaction-source.md)
- [focusable](./focusable.md)
