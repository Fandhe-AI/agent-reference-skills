# CircularProgressIndicator

Material Design circular progress indicator, a circle whose stroke grows to express determinate progress or spins continuously to express an indeterminate wait. Determinate and indeterminate overloads share an otherwise identical API.

## Signature / Usage

```kotlin
@Composable
fun CircularProgressIndicator(
    progress: () -> Float,
    modifier: Modifier = Modifier,
    color: Color = ProgressIndicatorDefaults.circularColor,
    strokeWidth: Dp = ProgressIndicatorDefaults.CircularStrokeWidth,
    trackColor: Color = ProgressIndicatorDefaults.circularDeterminateTrackColor,
    strokeCap: StrokeCap = ProgressIndicatorDefaults.CircularDeterminateStrokeCap,
    gapSize: Dp = ProgressIndicatorDefaults.CircularIndicatorTrackGapSize,
)

@Composable
fun CircularProgressIndicator(
    modifier: Modifier = Modifier,
    color: Color = ProgressIndicatorDefaults.circularColor,
    strokeWidth: Dp = ProgressIndicatorDefaults.CircularStrokeWidth,
    trackColor: Color = ProgressIndicatorDefaults.circularIndeterminateTrackColor,
    strokeCap: StrokeCap = ProgressIndicatorDefaults.CircularIndeterminateStrokeCap,
    gapSize: Dp = ProgressIndicatorDefaults.CircularIndicatorTrackGapSize,
)
```

```kotlin
CircularProgressIndicator(
    modifier = Modifier.width(64.dp),
    color = MaterialTheme.colorScheme.secondary,
    trackColor = MaterialTheme.colorScheme.surfaceVariant,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `() -> Float` | — | Progress value in `0.0..1.0`; omit to get the indeterminate overload. |
| `modifier` | `Modifier` | `Modifier` | Applied to this indicator. |
| `color` | `Color` | `ProgressIndicatorDefaults.circularColor` | Color of the progress indicator. |
| `strokeWidth` | `Dp` | `ProgressIndicatorDefaults.CircularStrokeWidth` | Width of the indicator's stroke. |
| `trackColor` | `Color` | determinate/indeterminate track color default | Color of the background track. |
| `strokeCap` | `StrokeCap` | determinate/indeterminate stroke cap default | End cap style of the indicator arc. |
| `gapSize` | `Dp` | `ProgressIndicatorDefaults.CircularIndicatorTrackGapSize` | Gap between indicator and track. |

## Notes

- Omitting `progress` selects the indeterminate, continuously spinning overload.
- Update `progress` from a coroutine (e.g. via `rememberCoroutineScope()`) to avoid blocking the UI thread.
- Package: `androidx.compose.material3`.

## Related

- [LinearProgressIndicator](./linearprogressindicator.md)
- [LoadingIndicator](./loadingindicator.md)
- [CircularWavyProgressIndicator](./circularwavyprogressindicator.md)
