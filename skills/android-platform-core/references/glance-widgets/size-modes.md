# SizeMode

Controls how a `GlanceAppWidget` composes across different widget sizes. Package: `androidx.glance.appwidget`.

## Signature / Usage

```kotlin
public sealed interface SizeMode

public sealed interface PreviewSizeMode : SizeMode

public object SizeMode.Single : SizeMode, PreviewSizeMode
public object SizeMode.Exact : SizeMode
public class SizeMode.Responsive(public val sizes: Set<DpSize>) : SizeMode, PreviewSizeMode
```

```kotlin
class MyAppWidget : GlanceAppWidget() {
    override val sizeMode = SizeMode.Responsive(
        setOf(
            DpSize(100.dp, 100.dp),
            DpSize(250.dp, 100.dp),
            DpSize(250.dp, 250.dp),
        ),
    )

    @Composable
    private fun MyContent() {
        val size = LocalSize.current
        if (size.height >= 250.dp) Text("Large layout") else Text("Compact layout")
    }
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `SizeMode.Single` (default) | One composition; `LocalSize.current` reports the widget's minimum size. Cheapest, but content doesn't adapt to resize. |
| `SizeMode.Exact` | Recomposes for the widget's exact current size every time it changes; read `LocalSize.current` to branch layout. |
| `SizeMode.Responsive(sizes: Set<DpSize>)` | Precomputes a fixed set of layouts; on Android 12+ they compose concurrently and the system maps the closest match. |

## Notes

- Set via `GlanceAppWidget.sizeMode`; `previewSizeMode` uses the same `SizeMode` type (restricted to `PreviewSizeMode` implementers — `Single` or `Responsive`) for `providePreview` rendering.
- `LocalSize.current` (`DpSize`) is the standard way to branch layout inside the composition regardless of `sizeMode`.
- Artifact: `androidx.glance:glance-appwidget`.

## Related

- [composition-locals](./composition-locals.md)
- [glance-app-widget](./glance-app-widget.md)
