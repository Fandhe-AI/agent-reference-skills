# Slider

Lets users select a single value from a range by dragging a thumb along a horizontal track.

## Signature / Usage

```kotlin
@Composable
public fun Slider(
    value: Float,
    onValueChange: (Float) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    onValueChangeFinished: (() -> Unit)? = null,
    colors: SliderColors = SliderDefaults.colors(),
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    valueRange: ClosedFloatingPointRange<Float> = 0f..1f,
    @IntRange(from = 0) steps: Int = 0,
    thumb: @Composable (SliderState) -> Unit = {
        SliderDefaults.Thumb(
            interactionSource = interactionSource,
            colors = colors,
            enabled = enabled,
        )
    },
    track: @Composable (SliderState) -> Unit = { sliderState ->
        SliderDefaults.Track(colors = colors, enabled = enabled, sliderState = sliderState)
    },
)
```

```kotlin
var sliderPosition by remember { mutableFloatStateOf(0f) }
Slider(
    value = sliderPosition,
    onValueChange = { sliderPosition = it },
    valueRange = 0f..50f,
    steps = 3
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Float` | — | Current slider value. Coerced into `valueRange`. |
| `onValueChange` | `(Float) -> Unit` | — | Called on value change while dragging. |
| `modifier` | `Modifier` | `Modifier` | Applied to this slider. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `onValueChangeFinished` | `(() -> Unit)?` | `null` | Called when the value finishes changing (e.g. drag ends); ideal place to commit a business-logic update. |
| `colors` | `SliderColors` | `SliderDefaults.colors()` | Resolves thumb/track colors in different states. |
| `interactionSource` | `MutableInteractionSource` | `remember { MutableInteractionSource() }` | Source for observing/emitting `Interaction`s. |
| `valueRange` | `ClosedFloatingPointRange<Float>` | `0f..1f` | Range of selectable values. |
| `steps` | `Int` | `0` | Number of discrete steps between endpoints (excluding endpoints); `0` for a continuous slider. |
| `thumb` | `@Composable (SliderState) -> Unit` | `SliderDefaults.Thumb(interactionSource, colors, enabled)` | Composable rendering the thumb. |
| `track` | `@Composable (SliderState) -> Unit` | `SliderDefaults.Track(colors, enabled, sliderState)` | Composable rendering the track. |

## Notes

- `RangeSlider` is the two-thumb variant for selecting a `ClosedFloatingPointRange<Float>` (min/max); see Related.
- Package: `androidx.compose.material3`.

## Related

- [RangeSlider](./rangeslider.md)
