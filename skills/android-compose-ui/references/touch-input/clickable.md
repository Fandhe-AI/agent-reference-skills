# Modifier.clickable

Configures a component to receive clicks via touch, mouse, keyboard (Enter), d-pad center, or accessibility "click" events. Applies the default `Indication` from `LocalIndication` (typically a ripple).

## Signature / Usage

```kotlin
fun Modifier.clickable(
    enabled: Boolean = true,
    onClickLabel: String? = null,
    role: Role? = null,
    interactionSource: MutableInteractionSource? = null,
    onClick: () -> Unit,
): Modifier
```

```kotlin
Surface(onClick = { /* handle click */ }) {
    Text("Click me!", Modifier.padding(24.dp))
}

LazyVerticalGrid(columns = GridCells.Adaptive(minSize = 128.dp)) {
    items(photos, { it.id }) { photo ->
        ImageItem(photo, Modifier.clickable { activePhotoId = photo.id })
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `Boolean` | `true` | Controls whether the element responds to input and accessibility events. |
| `onClickLabel` | `String?` | `null` | Semantic / accessibility label describing the click action. |
| `role` | `Role?` | `null` | Role of the clickable element used by accessibility services (e.g. `Role.Button`). |
| `interactionSource` | `MutableInteractionSource?` | `null` | Hoisted source for observing press interactions. Lazily created internally when `null`. |
| `onClick` | `() -> Unit` | — | Called when the element is clicked. |

## Notes

- There is also an overload `clickable(interactionSource: MutableInteractionSource?, indication: Indication?, enabled, onClickLabel, role, onClick)` that lets you supply an explicit `Indication` instead of the one from `LocalIndication`.
- Adds visual ripple indication, focus support, mouse/stylus hover, and accessibility semantics automatically — prefer it over building tap handling manually with `pointerInput`.
- Package: `androidx.compose.foundation`.

## Related

- [combinedClickable](./combined-clickable.md)
- [toggleable](./toggleable.md)
- [selectable](./selectable.md)
- [InteractionSource](./interaction-source.md)
- [indication](./indication.md)
