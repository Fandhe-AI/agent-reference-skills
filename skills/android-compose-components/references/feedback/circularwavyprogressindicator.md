# CircularWavyProgressIndicator

Material Expressive circular progress indicator that renders the active indicator as a waveform. Determinate and indeterminate overloads share an otherwise identical API; the wave flattens automatically at 0% and near 100% progress.

## Signature / Usage

```kotlin
@Composable
fun CircularWavyProgressIndicator(
    progress: () -> Float,
    modifier: Modifier = Modifier,
    color: Color = WavyProgressIndicatorDefaults.indicatorColor,
    trackColor: Color = WavyProgressIndicatorDefaults.trackColor,
    stroke: Stroke = WavyProgressIndicatorDefaults.circularIndicatorStroke,
    trackStroke: Stroke = WavyProgressIndicatorDefaults.circularTrackStroke,
    gapSize: Dp = WavyProgressIndicatorDefaults.CircularIndicatorTrackGapSize,
    amplitude: (progress: Float) -> Float = WavyProgressIndicatorDefaults.indicatorAmplitude,
    wavelength: Dp = WavyProgressIndicatorDefaults.CircularWavelength,
    waveSpeed: Dp = wavelength,
)

@Composable
fun CircularWavyProgressIndicator(
    modifier: Modifier = Modifier,
    color: Color = WavyProgressIndicatorDefaults.indicatorColor,
    trackColor: Color = WavyProgressIndicatorDefaults.trackColor,
    stroke: Stroke = WavyProgressIndicatorDefaults.circularIndicatorStroke,
    trackStroke: Stroke = WavyProgressIndicatorDefaults.circularTrackStroke,
    gapSize: Dp = WavyProgressIndicatorDefaults.CircularIndicatorTrackGapSize,
    amplitude: Float = 1f,
    wavelength: Dp = WavyProgressIndicatorDefaults.CircularWavelength,
    waveSpeed: Dp = wavelength,
)
```

```kotlin
CircularWavyProgressIndicator(
    progress = { currentProgress },
    modifier = Modifier.size(64.dp),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `() -> Float` | — | Progress value in `0.0..1.0`; omit to get the indeterminate overload. |
| `modifier` | `Modifier` | `Modifier` | Applied to this indicator. |
| `color` | `Color` | `WavyProgressIndicatorDefaults.indicatorColor` | Color of the progress indicator. |
| `trackColor` | `Color` | `WavyProgressIndicatorDefaults.trackColor` | Color of the background track. |
| `stroke` | `Stroke` | `WavyProgressIndicatorDefaults.circularIndicatorStroke` | Stroke used to draw the indicator. |
| `trackStroke` | `Stroke` | `WavyProgressIndicatorDefaults.circularTrackStroke` | Stroke used to draw the track. |
| `gapSize` | `Dp` | `WavyProgressIndicatorDefaults.CircularIndicatorTrackGapSize` | Gap between indicator and track. |
| `amplitude` | `(progress: Float) -> Float` (determinate) / `Float` (indeterminate) | `WavyProgressIndicatorDefaults.indicatorAmplitude` / `1f` | Wave amplitude; `0.0` is a flat circle, `1.0` is max amplitude. |
| `wavelength` | `Dp` | `WavyProgressIndicatorDefaults.CircularWavelength` | Target length of one wave cycle; the actual wavelength may be adjusted slightly to keep the wave continuous around the circle. |
| `waveSpeed` | `Dp` | `wavelength` | Wave travel speed in dp/second; defaults to one wavelength per second. |

## Notes

- Omitting `progress` selects the indeterminate, continuously spinning overload.
- The default `indicatorAmplitude` flattens the wave to `0f` at `progress <= 0.1f` or `progress >= 0.95f`.
- Use `ProgressIndicatorDefaults.ProgressAnimationSpec` when animating `progress` between values.
- Package: `androidx.compose.material3`. Stable (non-experimental) since `1.5.0-alpha19`.

## Related

- [CircularProgressIndicator](./circularprogressindicator.md)
- [LinearWavyProgressIndicator](./linearwavyprogressindicator.md)
- [LoadingIndicator](./loadingindicator.md)
