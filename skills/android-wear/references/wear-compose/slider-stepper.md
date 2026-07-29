# Slider / Stepper

Value-input controls for discrete/continuous ranges. `Slider` is an in-line horizontal bar with decrease/increase buttons at each end (e.g. a volume or brightness row inside a list). `Stepper` is a full-screen control with the increase button at the top, decrease button at the bottom, and a content slot (typically `Text` or `Button`) showing the current value in between.

## Signature / Usage

```kotlin
@Composable
public fun Slider(
    value: Float,
    onValueChange: (Float) -> Unit,
    steps: Int,
    modifier: Modifier = Modifier,
    decreaseIcon: @Composable () -> Unit = { SliderDefaults.DecreaseIcon() },
    increaseIcon: @Composable () -> Unit = { SliderDefaults.IncreaseIcon() },
    enabled: Boolean = true,
    valueRange: ClosedFloatingPointRange<Float> = 0f..(steps + 1).toFloat(),
    segmented: Boolean = steps <= SliderDefaults.MaxSegmentSteps,
    shape: Shape = SliderDefaults.shape,
    colors: SliderColors = SliderDefaults.sliderColors(),
)
```

```kotlin
Slider(
    value = volume,
    onValueChange = { volume = it },
    steps = 4,
)
```

```kotlin
@Composable
public fun Stepper(
    value: Float,
    onValueChange: (Float) -> Unit,
    steps: Int,
    decreaseIcon: @Composable () -> Unit,
    increaseIcon: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    valueRange: ClosedFloatingPointRange<Float> = 0f..(steps + 1).toFloat(),
    colors: StepperColors = StepperDefaults.colors(),
    content: @Composable BoxScope.() -> Unit,
)
```

```kotlin
Stepper(
    value = brightness,
    onValueChange = { brightness = it },
    steps = 9,
    decreaseIcon = { Icon(Icons.Filled.Remove, contentDescription = "Decrease") },
    increaseIcon = { Icon(Icons.Filled.Add, contentDescription = "Increase") },
) {
    Text("$brightness")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` / `onValueChange` | `Float` / `(Float) -> Unit` | — | Current value and update callback. Both also have an `Int` overload taking `valueProgression: IntProgression` instead of `steps` / `valueRange`. |
| `steps` | `Int` | — | Number of discrete values excluding min/max, evenly spread across the range; must be `>= 0`. |
| `decreaseIcon` / `increaseIcon` | `@Composable () -> Unit` | `SliderDefaults.DecreaseIcon()` / `IncreaseIcon()` (Slider only) | Icon slots on the decrease/increase buttons; required parameters (no default) on `Stepper`. |
| `segmented` (Slider only) | `Boolean` | `steps <= SliderDefaults.MaxSegmentSteps` | Draws separators between steps on the bar when true. |
| `valueRange` | `ClosedFloatingPointRange<Float>` | `0f..(steps + 1).toFloat()` | Range the value is coerced into. |
| `content` (Stepper only) | `@Composable BoxScope.() -> Unit` | — | Middle slot, typically `Text` or `Button` displaying the current value. |
| `colors` | `SliderColors` / `StepperColors` | `SliderDefaults.sliderColors()` / `StepperDefaults.colors()` | Bar/track/button colors per state. |

## Notes

- `Slider` is the Material3 successor to the older `InlineSlider`; unlike `Stepper` it is not full-screen and has no `content` slot.
- `Stepper` doesn't display the current value itself — show it via the `content` slot or a `StepperLevelIndicator`, and doesn't provide default icon composables (unlike `Slider`'s `SliderDefaults.DecreaseIcon()` / `IncreaseIcon()`) — supply your own, e.g. from `androidx.compose.material.icons`.
- This `Slider` (button-driven, `steps`-based) is distinct from the mobile Jetpack Compose `androidx.compose.material3.Slider` (drag-a-thumb, continuous, in android-compose-components); `Stepper` has no mobile Compose equivalent.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [Picker / PickerGroup / DatePicker / TimePicker](./picker.md)
- [Progress indicators](./progress-indicators.md)
