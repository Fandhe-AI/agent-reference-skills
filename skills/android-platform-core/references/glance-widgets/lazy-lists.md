# LazyColumn / LazyVerticalGrid

Scrollable lazy containers that only lay out currently visible items, translating to `ListView` / `GridView`. Package: `androidx.glance.appwidget.lazy`.

## Signature / Usage

```kotlin
@Composable
public fun LazyColumn(
    modifier: GlanceModifier = GlanceModifier,
    horizontalAlignment: Alignment.Horizontal = Alignment.Start,
    content: LazyListScope.() -> Unit,
)

@Composable
public fun LazyColumn(
    verticalScrollMode: VerticalScrollMode,
    modifier: GlanceModifier = GlanceModifier,
    horizontalAlignment: Alignment.Horizontal = Alignment.Start,
    content: LazyListScope.() -> Unit,
)

@Composable
public fun LazyVerticalGrid(
    gridCells: GridCells,
    modifier: GlanceModifier = GlanceModifier,
    horizontalAlignment: Alignment.Horizontal = Alignment.Start,
    content: LazyVerticalGridScope.() -> Unit,
)
```

```kotlin
LazyColumn {
    items(peopleNameList) { name ->
        Text(name)
    }
    items(items = peopleList, itemId = { it.id.hashCode().toLong() }) { person ->
        Text(person.name)
    }
}

LazyVerticalGrid(gridCells = GridCells.Fixed(2)) {
    items(10) { index -> Text("Item $index") }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `GlanceModifier` | `GlanceModifier` | Applied to the list/grid container. |
| `horizontalAlignment` | `Alignment.Horizontal` | `Alignment.Start` | Cross-axis alignment of items. |
| `verticalScrollMode` | `VerticalScrollMode` | `VerticalScrollMode.Normal` | `Normal` or `SnapScrollMatchHeight(height)` for snap-to-item scrolling (Glance 1.3.0-alpha02+, compileSdk 37+, Android 17+). |
| `gridCells` (LazyVerticalGrid) | `GridCells` | — | `GridCells.Fixed(count)` (1–5 columns) or `GridCells.Adaptive(minSize)`. |
| `content` | `LazyListScope.() -> Unit` / `LazyVerticalGridScope.() -> Unit` | — | DSL block using `item()` / `items()` / `itemsIndexed()`. |
| `itemId` (in `items`) | `(item: T) -> Long` | unspecified id | Stable id per item, improves recomposition/performance across updates. |

## Notes

- Package: `androidx.glance.appwidget.lazy` (part of `androidx.glance:glance-appwidget`, not the base `glance` module).
- Snap scrolling (`VerticalScrollMode.SnapScrollMatchHeight`) requires Glance `1.3.0-alpha02`+, `compileSdk` 37+, and falls back to `VerticalScrollMode.Normal` on older devices.
- Distinct from mobile Compose `LazyColumn`/`LazyVerticalGrid` (`androidx.compose.foundation.lazy.*`); the Glance versions compile to `RemoteViews`-backed `ListView`/`GridView` and share none of the mobile API surface.

## Related

- [layout-containers](./layout-containers.md)
