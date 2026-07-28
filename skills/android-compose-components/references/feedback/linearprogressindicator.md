# LinearProgressIndicator

Material Design linear progress indicator, expressing an unspecified wait time or the duration of a process as a horizontal bar. Determinate and indeterminate overloads share an otherwise identical API.

## Signature / Usage

```kotlin
@Composable
fun LinearProgressIndicator(
    progress: () -> Float,
    modifier: Modifier = Modifier,
    color: Color = ProgressIndicatorDefaults.linearColor,
    trackColor: Color = ProgressIndicatorDefaults.linearTrackColor,
    strokeCap: StrokeCap = ProgressIndicatorDefaults.LinearStrokeCap,
    gapSize: Dp = ProgressIndicatorDefaults.LinearIndicatorTrackGapSize,
    drawStopIndicator: DrawScope.() -> Unit = { /* draws stop indicator */ },
)

@Composable
fun LinearProgressIndicator(
    modifier: Modifier = Modifier,
    color: Color = ProgressIndicatorDefaults.linearColor,
    trackColor: Color = ProgressIndicatorDefaults.linearTrackColor,
    strokeCap: StrokeCap = ProgressIndicatorDefaults.LinearStrokeCap,
    gapSize: Dp = ProgressIndicatorDefaults.LinearIndicatorTrackGapSize,
)
```

```kotlin
if (loading) {
    LinearProgressIndicator(
        progress = { currentProgress },
        modifier = Modifier.fillMaxWidth(),
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `() -> Float` | — | Progress value in `0.0..1.0`; omit to get the indeterminate overload. |
| `modifier` | `Modifier` | `Modifier` | Applied to this indicator. |
| `color` | `Color` | `ProgressIndicatorDefaults.linearColor` | Color of the progress indicator. |
| `trackColor` | `Color` | `ProgressIndicatorDefaults.linearTrackColor` | Color of the background track. |
| `strokeCap` | `StrokeCap` | `ProgressIndicatorDefaults.LinearStrokeCap` | End cap style of the indicator bar. |
| `gapSize` | `Dp` | `ProgressIndicatorDefaults.LinearIndicatorTrackGapSize` | Gap between indicator and track. |
| `drawStopIndicator` | `DrawScope.() -> Unit` | draws default stop indicator | Custom drawing for the stop indicator (determinate overload only). |

## Notes

- Omitting `progress` selects the indeterminate, continuously animating overload.
- Update `progress` from a coroutine (e.g. via `rememberCoroutineScope()`) to avoid blocking the UI thread.
- Package: `androidx.compose.material3`.

## Related

- [CircularProgressIndicator](./circularprogressindicator.md)
- [LoadingIndicator](./loadingindicator.md)
