# Modifier.indication / IndicationNodeFactory / ripple()

Applies a reusable visual effect (such as a ripple) to a component in response to `Interaction`s emitted on an `InteractionSource`. `clickable`, `toggleable`, and `selectable` apply this automatically using `LocalIndication` unless an explicit `indication` is supplied.

## Signature / Usage

```kotlin
fun Modifier.indication(
    interactionSource: InteractionSource,
    indication: Indication,
): Modifier

interface IndicationNodeFactory : Indication {
    fun create(interactionSource: InteractionSource): DelegatableNode
}
```

```kotlin
Box(
    modifier = Modifier
        .size(100.dp)
        .clickable(
            interactionSource = null,
            indication = ripple(),
            onClick = {},
        ),
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `interactionSource` | `InteractionSource` | Source whose emitted `Interaction`s drive the visual effect. |
| `indication` | `Indication` | Reusable visual-effect factory, e.g. `ripple()` or a custom `IndicationNodeFactory`. |

## Notes

- To build a custom indication, implement `Modifier.Node` + `DrawModifierNode`, collect `interactionSource.interactions` in `onAttach()`, and always call `drawContent()` inside `override fun ContentDrawScope.draw()`; wrap it in an `IndicationNodeFactory` object so it can be reused across components.
- `ripple()` renders the Material ripple; on Android it draws on the `RenderThread` via the platform `RippleDrawable`, keeping the animation smooth even when the UI thread is busy.
- Package: `androidx.compose.foundation` (`ripple()` in `androidx.compose.material.ripple` / `androidx.compose.material3.ripple`).

## Related

- [interaction-source](./interaction-source.md)
- [clickable](./clickable.md)
