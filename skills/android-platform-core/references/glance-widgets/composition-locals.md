# LocalContext / LocalGlanceId / LocalSize / LocalState

`CompositionLocal`s available inside any Glance composition. Package: `androidx.glance`.

## Signature / Usage

```kotlin
public val LocalContext: ProvidableCompositionLocal<Context>
public val LocalGlanceId: ProvidableCompositionLocal<GlanceId>
public val LocalSize: ProvidableCompositionLocal<DpSize>
public val LocalState: ProvidableCompositionLocal<Any?>
```

```kotlin
@Composable
private fun MyContent() {
    val context = LocalContext.current
    val glanceId = LocalGlanceId.current
    val size = LocalSize.current

    Text(context.getString(R.string.title))
    if (size.width > 250.dp) {
        Button(text = "Refresh", onClick = actionRunCallback<RefreshAction>())
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `LocalContext` | `ProvidableCompositionLocal<Context>` | Application `Context` for the current composition; used for resource access (`getString`, drawables, etc.). |
| `LocalGlanceId` | `ProvidableCompositionLocal<GlanceId>` | Unique id of the widget instance being generated; pass to `update()`/`updateAppWidgetState()`. |
| `LocalSize` | `ProvidableCompositionLocal<DpSize>` | Current widget size, meaning depends on `sizeMode` (`Single` → minimum size; `Exact`/`Responsive` → the size being composed). |
| `LocalState` | `ProvidableCompositionLocal<Any?>` | Raw view-specific state store; prefer the typed `currentState<T>()` helper over reading this directly. |

## Notes

- `LocalContext`, `LocalGlanceId`, and `LocalSize` are `staticCompositionLocalOf`; `LocalState` is `compositionLocalOf`.
- Reading resources via `LocalContext.current` (instead of baking strings/colors into the composable call) keeps the generated `RemoteViews` smaller.
- Package: `androidx.glance`, artifact `androidx.glance:glance`.

## Related

- [size-modes](./size-modes.md)
- [state-management](./state-management.md)
