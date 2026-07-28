# RangeSlider

Lets users select two bounded values (a range) via two thumbs on a horizontal track. The thumbs cannot cross each other.

## Signature / Usage

```kotlin
@Composable
public fun RangeSlider(
    value: ClosedFloatingPointRange<Float>,
    onValueChange: (ClosedFloatingPointRange<Float>) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    valueRange: ClosedFloatingPointRange<Float> = 0f..1f,
    @IntRange(from = 0) steps: Int = 0,
    onValueChangeFinished: (() -> Unit)? = null,
    colors: SliderColors = SliderDefaults.colors(),
    startThumbInteractionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    endThumbInteractionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    startThumb: @Composable (RangeSliderState) -> Unit = {
        SliderDefaults.Thumb(
            interactionSource = startThumbInteractionSource,
            colors = colors,
            enabled = enabled,
        )
    },
    endThumb: @Composable (RangeSliderState) -> Unit = {
        SliderDefaults.Thumb(
            interactionSource = endThumbInteractionSource,
            colors = colors,
            enabled = enabled,
        )
    },
    track: @Composable (RangeSliderState) -> Unit = { rangeSliderState ->
        SliderDefaults.Track(
            colors = colors,
            enabled = enabled,
            rangeSliderState = rangeSliderState,
        )
    },
)
```

```kotlin
var sliderPosition by remember { mutableStateOf(0f..100f) }
RangeSlider(
    value = sliderPosition,
    onValueChange = { range -> sliderPosition = range },
    valueRange = 0f..100f,
    steps = 5,
    onValueChangeFinished = { /* commit sliderPosition */ }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `ClosedFloatingPointRange<Float>` | — | Current start/end values. |
| `onValueChange` | `(ClosedFloatingPointRange<Float>) -> Unit` | — | Called on range change while dragging. |
| `modifier` | `Modifier` | `Modifier` | Applied to this range slider. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `valueRange` | `ClosedFloatingPointRange<Float>` | `0f..1f` | Range of selectable values. |
| `steps` | `Int` | `0` | Number of discrete steps between endpoints; `0` for continuous. |
| `onValueChangeFinished` | `(() -> Unit)?` | `null` | Called when dragging finishes. |
| `colors` | `SliderColors` | `SliderDefaults.colors()` | Resolves thumb/track colors. |
| `startThumbInteractionSource` | `MutableInteractionSource` | `remember { MutableInteractionSource() }` | Interaction source for the start thumb. |
| `endThumbInteractionSource` | `MutableInteractionSource` | `remember { MutableInteractionSource() }` | Interaction source for the end thumb. |
| `startThumb` | `@Composable (RangeSliderState) -> Unit` | `SliderDefaults.Thumb(startThumbInteractionSource, colors, enabled)` | Composable rendering the start thumb. |
| `endThumb` | `@Composable (RangeSliderState) -> Unit` | `SliderDefaults.Thumb(endThumbInteractionSource, colors, enabled)` | Composable rendering the end thumb. |
| `track` | `@Composable (RangeSliderState) -> Unit` | `SliderDefaults.Track(colors, enabled, rangeSliderState)` | Composable rendering the track. |

## Notes

- Package: `androidx.compose.material3`.

## Related

- [Slider](./slider.md)
