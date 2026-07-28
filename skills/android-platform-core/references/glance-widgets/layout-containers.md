# Layout containers: Box, Column, Row, Spacer

Glance layout composables that translate to `RemoteViews` layouts (`RelativeLayout` / `LinearLayout`). Package: `androidx.glance.layout`.

## Signature / Usage

```kotlin
@Composable
public fun Box(
    modifier: GlanceModifier = GlanceModifier,
    contentAlignment: Alignment = Alignment.TopStart,
    content: @Composable () -> Unit,
)

@Composable
public fun Column(
    modifier: GlanceModifier = GlanceModifier,
    verticalAlignment: Alignment.Vertical = Alignment.Top,
    horizontalAlignment: Alignment.Horizontal = Alignment.Start,
    content: @Composable ColumnScope.() -> Unit,
)

@Composable
public fun Row(
    modifier: GlanceModifier = GlanceModifier,
    horizontalAlignment: Alignment.Horizontal = Alignment.Start,
    verticalAlignment: Alignment.Vertical = Alignment.Top,
    content: @Composable RowScope.() -> Unit,
)

@Composable
public fun Spacer(modifier: GlanceModifier = GlanceModifier)
```

```kotlin
Column(
    modifier = GlanceModifier.fillMaxSize(),
    verticalAlignment = Alignment.Top,
    horizontalAlignment = Alignment.CenterHorizontally,
) {
    Text("Where to?", modifier = GlanceModifier.padding(12.dp))
    Row(horizontalAlignment = Alignment.CenterHorizontally) {
        Button(text = "Home", onClick = actionStartActivity<MyActivity>())
        Spacer(modifier = GlanceModifier.width(8.dp))
        Button(text = "Work", onClick = actionStartActivity<MyActivity>())
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `GlanceModifier` | `GlanceModifier` | Applied to the container/spacer. |
| `contentAlignment` (Box) | `Alignment` | `Alignment.TopStart` | Alignment of children smaller than the Box; children stack on top of each other. |
| `verticalAlignment` / `horizontalAlignment` (Column, Row) | `Alignment.Vertical` / `Alignment.Horizontal` | `Top` / `Start` | Cross-axis and main-axis alignment of children. |
| `content` | `@Composable () -> Unit` / `ColumnScope.() -> Unit` / `RowScope.() -> Unit` | — | Child composables. |

## Notes

- `Box` translates to `RelativeLayout`; `Column`/`Row` translate to `LinearLayout` with vertical/horizontal orientation; `Spacer` is an empty layout sized via `GlanceModifier.width`/`height`/`size`.
- Each container supports **up to 10 direct child elements** on App Widgets; additional children are truncated from the `RemoteViews` output.
- All are Glance-specific composables (`androidx.glance.layout`), not the mobile Jetpack Compose `Box`/`Column`/`Row`/`Spacer` (`androidx.compose.foundation.layout`).
- Artifact: `androidx.glance:glance`.

## Related

- [lazy-lists](./lazy-lists.md)
- [glance-modifier](./glance-modifier.md)
