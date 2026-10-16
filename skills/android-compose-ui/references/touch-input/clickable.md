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
- Interaction sounds (Android): Compose UI 1.12.0 (from 1.12.0-alpha03) adds automatic interaction sounds (clicks and focus navigation) using the platform sound configuration, gated by `AndroidComposeUiFlags.isInteractionSoundEffectsEnabled` (default `true` in 1.12.1; `@ExperimentalComposeUiApi`). Opt out for a subtree with `SoundEffectOnInteraction(enabled = false) { ... }`, i.e. `@Composable fun SoundEffectOnInteraction(enabled: Boolean, content: @Composable () -> Unit)` from `androidx.compose.ui.platform`. Semantics click listeners must now be called from the main thread, which may affect a small number of tests. The Compose Foundation 1.13.0-alpha01 release notes state "Clicks on clickable elements now automatically play interaction sound effects on Android" (pre-release).
- The first usage snippet is the official tap-and-press sample; it uses Material `Surface(onClick)`, which applies clickable internally. Use `Modifier.clickable` directly on foundation-only layouts.
- Package: `androidx.compose.foundation`.

## Related

- [combinedClickable](./combined-clickable.md)
- [toggleable](./toggleable.md)
- [selectable](./selectable.md)
- [InteractionSource](./interaction-source.md)
- [indication](./indication.md)
