# Modifier (layout)

Layout-related `Modifier` extension functions for sizing, padding, offsetting, and aspect ratio, from `androidx.compose.foundation.layout`.

## Signature / Usage

```kotlin
public fun Modifier.size(size: Dp): Modifier
public fun Modifier.size(width: Dp, height: Dp): Modifier
public fun Modifier.width(width: Dp): Modifier
public fun Modifier.height(height: Dp): Modifier
public fun Modifier.requiredSize(size: Dp): Modifier
public fun Modifier.sizeIn(
    minWidth: Dp = Dp.Unspecified,
    minHeight: Dp = Dp.Unspecified,
    maxWidth: Dp = Dp.Unspecified,
    maxHeight: Dp = Dp.Unspecified,
): Modifier
public fun Modifier.fillMaxSize(@FloatRange(from = 0.0, to = 1.0) fraction: Float = 1f): Modifier
public fun Modifier.fillMaxWidth(@FloatRange(from = 0.0, to = 1.0) fraction: Float = 1f): Modifier
public fun Modifier.fillMaxHeight(@FloatRange(from = 0.0, to = 1.0) fraction: Float = 1f): Modifier
public fun Modifier.wrapContentSize(align: Alignment = Alignment.Center, unbounded: Boolean = false): Modifier
public fun Modifier.padding(start: Dp = 0.dp, top: Dp = 0.dp, end: Dp = 0.dp, bottom: Dp = 0.dp): Modifier
public fun Modifier.padding(horizontal: Dp = 0.dp, vertical: Dp = 0.dp): Modifier
public fun Modifier.padding(paddingValues: PaddingValues): Modifier
public fun Modifier.offset(x: Dp = 0.dp, y: Dp = 0.dp): Modifier
public fun Modifier.absoluteOffset(x: Dp = 0.dp, y: Dp = 0.dp): Modifier
public fun Modifier.aspectRatio(
    @FloatRange(from = 0.0, fromInclusive = false) ratio: Float,
    matchHeightConstraintsFirst: Boolean = false,
): Modifier
```

```kotlin
Column(
    Modifier
        .fillMaxWidth()
        .padding(16.dp)
) {
    Box(Modifier.size(48.dp).aspectRatio(1f))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size(size: Dp)` / `size(width, height)` | `Dp` | — | Preferred exact width/height; may be overridden by incoming constraints. |
| `requiredSize(...)` | `Dp` | — | Like `size` but ignores incoming constraints, enforcing the exact size. |
| `sizeIn(minWidth, minHeight, maxWidth, maxHeight)` | `Dp` | `Dp.Unspecified` | Constrains size within a min/max range. |
| `fillMaxSize` / `fillMaxWidth` / `fillMaxHeight` | `Float fraction` | `1f` | Fills the given fraction of available space in the respective dimension(s). |
| `wrapContentSize(align, unbounded)` | `Alignment`, `Boolean` | `Alignment.Center`, `false` | Allows content to be measured with unbounded constraints, then aligned within the original space. |
| `padding(start, top, end, bottom)` | `Dp` | `0.dp` | Directional padding, respects `LayoutDirection` (LTR/RTL). |
| `padding(horizontal, vertical)` | `Dp` | `0.dp` | Symmetric padding. |
| `padding(paddingValues)` | `PaddingValues` | — | Padding from a `PaddingValues` instance (e.g. `Scaffold` content padding). |
| `offset(x, y)` | `Dp` | `0.dp` | Shifts the element without affecting layout of siblings; respects layout direction. |
| `absoluteOffset(x, y)` | `Dp` | `0.dp` | Like `offset` but ignores layout direction. |
| `aspectRatio(ratio, matchHeightConstraintsFirst)` | `Float`, `Boolean` | —, `false` | Attempts to size content to match `width / height == ratio` given incoming constraints. |

## Notes

- Negative padding values throw `IllegalArgumentException`.
- Modifier order matters: `.padding().fillMaxWidth()` differs from `.fillMaxWidth().padding()` since each modifier wraps the next.
- `weight()` (for `Row`/`Column` children) is documented on the [Column](./column.md) and [Row](./row.md) pages, not here, since it is scoped to `RowScope`/`ColumnScope`.
- Package: `androidx.compose.foundation.layout`.

## Related

- [Column](./column.md)
- [Row](./row.md)
- [IntrinsicSize](./intrinsicsize.md)
