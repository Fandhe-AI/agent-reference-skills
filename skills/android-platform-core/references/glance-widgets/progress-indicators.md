# CircularProgressIndicator / LinearProgressIndicator

Progress indicator composables. Package: `androidx.glance.appwidget`.

## Signature / Usage

```kotlin
@Composable
public fun CircularProgressIndicator(
    modifier: GlanceModifier = GlanceModifier,
    color: ColorProvider = ProgressIndicatorDefaults.IndicatorColorProvider,
)

@Composable
public fun LinearProgressIndicator(
    progress: Float,
    modifier: GlanceModifier = GlanceModifier,
    color: ColorProvider = ProgressIndicatorDefaults.IndicatorColorProvider,
    backgroundColor: ColorProvider = ProgressIndicatorDefaults.BackgroundColorProvider,
)

@Composable
public fun LinearProgressIndicator(
    modifier: GlanceModifier = GlanceModifier,
    color: ColorProvider = ProgressIndicatorDefaults.IndicatorColorProvider,
    backgroundColor: ColorProvider = ProgressIndicatorDefaults.BackgroundColorProvider,
)
```

```kotlin
CircularProgressIndicator()

LinearProgressIndicator(progress = 0.6f)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `progress` (LinearProgressIndicator determinate overload) | `Float` | — | Progress value 0.0–1.0; omit the parameter to get the indeterminate overload. |
| `modifier` | `GlanceModifier` | `GlanceModifier` | Applied to the indicator. |
| `color` | `ColorProvider` | `ProgressIndicatorDefaults.IndicatorColorProvider` | Indicator color. |
| `backgroundColor` (LinearProgressIndicator only) | `ColorProvider` | `ProgressIndicatorDefaults.BackgroundColorProvider` | Track background color. |

## Notes

- `CircularProgressIndicator` has no determinate/progress parameter — it is always indeterminate.
- `LinearProgressIndicator` has separate determinate (`progress: Float`) and indeterminate overloads.
- Package: `androidx.glance.appwidget`, artifact `androidx.glance:glance-appwidget`; renders to `RemoteViews` `ProgressBar`.

## Related

- [glance-theme](./glance-theme.md)
