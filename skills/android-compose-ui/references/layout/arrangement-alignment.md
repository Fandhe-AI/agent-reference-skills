# Arrangement / Alignment

`Arrangement` controls spacing/positioning of children along a layout's main axis (`Row`/`Column`/lazy layouts). `Alignment` controls positioning along the cross axis or within a `Box`.

## Signature / Usage

```kotlin
Row(horizontalArrangement = Arrangement.SpaceBetween) { /* ... */ }
Column(verticalArrangement = Arrangement.spacedBy(8.dp)) { /* ... */ }
Box(contentAlignment = Alignment.Center) { /* ... */ }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Arrangement.Start` / `End` | `Arrangement.Horizontal` | — | Places children as close as possible to the start/end. |
| `Arrangement.Top` / `Bottom` | `Arrangement.Vertical` | — | Places children as close as possible to the top/bottom. |
| `Arrangement.Center` | `HorizontalOrVertical` | — | Groups and centers children on the main axis. |
| `Arrangement.SpaceBetween` | `HorizontalOrVertical` | — | Distributes children evenly; no free space before the first or after the last child. |
| `Arrangement.SpaceEvenly` | `HorizontalOrVertical` | — | Distributes children evenly including space before the first and after the last. |
| `Arrangement.SpaceAround` | `HorizontalOrVertical` | — | Like `SpaceEvenly` but edge spacing is half of the space between children. |
| `Arrangement.spacedBy(space: Dp)` | function | — | Fixed spacing between children (`HorizontalOrVertical`). |
| `Arrangement.spacedBy(space: Dp, alignment: Alignment.Horizontal / Vertical)` | function | — | Fixed spacing plus a group alignment. |
| `Alignment.TopStart / TopCenter / TopEnd / CenterStart / Center / CenterEnd / BottomStart / BottomCenter / BottomEnd` | `Alignment` | — | 2D alignment, used by `Box` `contentAlignment` / `align`. |
| `Alignment.Start / CenterHorizontally / End` | `Alignment.Horizontal` | — | Horizontal-axis alignment, used by `Column` `horizontalAlignment`. |
| `Alignment.Top / CenterVertically / Bottom` | `Alignment.Vertical` | — | Vertical-axis alignment, used by `Row` `verticalAlignment`. |

## Notes

- `Arrangement.Horizontal` / `Vertical` interfaces expose a `spacing: Dp` property (default `0.dp`) and an `arrange()` function used by layout implementations; custom arrangements can implement these interfaces.
- `Arrangement.aligned(alignment: Alignment.Horizontal / Vertical)` groups children and aligns the group without adding spacing.
- Package: `androidx.compose.foundation.layout` (`Arrangement`), `androidx.compose.ui` (`Alignment`).

## Related

- [Column](./column.md)
- [Row](./row.md)
- [Box](./box.md)
