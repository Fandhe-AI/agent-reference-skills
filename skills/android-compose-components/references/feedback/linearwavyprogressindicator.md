# LinearWavyProgressIndicator

Material Expressive linear progress indicator that renders the active indicator as a waveform. Determinate and indeterminate overloads share an otherwise identical API; the wave flattens automatically at 0% and near 100% progress.

## Signature / Usage

```kotlin
@Composable
fun LinearWavyProgressIndicator(
    progress: () -> Float,
    modifier: Modifier = Modifier,
    color: Color = WavyProgressIndicatorDefaults.indicatorColor,
    trackColor: Color = WavyProgressIndicatorDefaults.trackColor,
    stroke: Stroke = WavyProgressIndicatorDefaults.linearIndicatorStroke,
    trackStroke: Stroke = WavyProgressIndicatorDefaults.linearTrackStroke,
    gapSize: Dp = WavyProgressIndicatorDefaults.LinearIndicatorTrackGapSize,
    stopSize: Dp = WavyProgressIndicatorDefaults.LinearTrackStopIndicatorSize,
    amplitude: (progress: Float) -> Float = WavyProgressIndicatorDefaults.indicatorAmplitude,
    wavelength: Dp = WavyProgressIndicatorDefaults.LinearDeterminateWavelength,
    waveSpeed: Dp = wavelength,
)

@Composable
fun LinearWavyProgressIndicator(
    modifier: Modifier = Modifier,
    color: Color = WavyProgressIndicatorDefaults.indicatorColor,
    trackColor: Color = WavyProgressIndicatorDefaults.trackColor,
    stroke: Stroke = WavyProgressIndicatorDefaults.linearIndicatorStroke,
    trackStroke: Stroke = WavyProgressIndicatorDefaults.linearTrackStroke,
    gapSize: Dp = WavyProgressIndicatorDefaults.LinearIndicatorTrackGapSize,
    amplitude: Float = 1f,
    wavelength: Dp = WavyProgressIndicatorDefaults.LinearIndeterminateWavelength,
    waveSpeed: Dp = wavelength,
)
```

```kotlin
LinearWavyProgressIndicator(
    progress = { currentProgress },
    modifier = Modifier.fillMaxWidth(),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `() -> Float` | — | Progress value in `0.0..1.0`; omit to get the indeterminate overload. |
| `modifier` | `Modifier` | `Modifier` | Applied to this indicator. |
| `color` | `Color` | `WavyProgressIndicatorDefaults.indicatorColor` | Color of the progress indicator. |
| `trackColor` | `Color` | `WavyProgressIndicatorDefaults.trackColor` | Color of the background track. |
| `stroke` | `Stroke` | `WavyProgressIndicatorDefaults.linearIndicatorStroke` | Stroke used to draw the indicator. |
| `trackStroke` | `Stroke` | `WavyProgressIndicatorDefaults.linearTrackStroke` | Stroke used to draw the track. |
| `gapSize` | `Dp` | `WavyProgressIndicatorDefaults.LinearIndicatorTrackGapSize` | Gap between indicator and track. |
| `stopSize` | `Dp` | `WavyProgressIndicatorDefaults.LinearTrackStopIndicatorSize` | Size of the stop indicator at track end (determinate overload only). |
| `amplitude` | `(progress: Float) -> Float` (determinate) / `Float` (indeterminate) | `WavyProgressIndicatorDefaults.indicatorAmplitude` / `1f` | Wave amplitude; `0.0` is a flat line, `1.0` is full-height wave. |
| `wavelength` | `Dp` | `LinearDeterminateWavelength` / `LinearIndeterminateWavelength` | Length of one wave cycle. |
| `waveSpeed` | `Dp` | `wavelength` | Wave travel speed in dp/second; defaults to one wavelength per second. |

## Notes

- Omitting `progress` selects the indeterminate, continuously animating overload.
- The default `indicatorAmplitude` flattens the wave to `0f` at `progress <= 0.1f` or `progress >= 0.95f`.
- Use `WavyProgressIndicatorDefaults.ProgressAnimationSpec` when animating `progress` between values.
- Package: `androidx.compose.material3`. Stable (non-experimental) since `1.5.0-alpha19`.

## Related

- [LinearProgressIndicator](./linearprogressindicator.md)
- [CircularWavyProgressIndicator](./circularwavyprogressindicator.md)
- [LoadingIndicator](./loadingindicator.md)
