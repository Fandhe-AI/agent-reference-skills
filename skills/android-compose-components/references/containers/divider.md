# Divider

A thin line that groups content in lists and layouts. Provided as `HorizontalDivider` and `VerticalDivider`.

## Signature / Usage

```kotlin
@Composable
fun HorizontalDivider(
    modifier: Modifier = Modifier,
    thickness: Dp = DividerDefaults.Thickness,
    color: Color = DividerDefaults.color,
)

@Composable
fun VerticalDivider(
    modifier: Modifier = Modifier,
    thickness: Dp = DividerDefaults.Thickness,
    color: Color = DividerDefaults.color,
)
```

```kotlin
Column {
    Text("First item")
    HorizontalDivider(thickness = 2.dp)
    Text("Second item")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the divider line. |
| `thickness` | `Dp` | `DividerDefaults.Thickness` | Thickness of the line. Use `Dp.Hairline` for a density-independent single pixel. |
| `color` | `Color` | `DividerDefaults.color` | Color of the line. |

## Notes

- `HorizontalDivider` spans full width inside a `Column`; `VerticalDivider` spans full height inside a `Row` (parent height must be constrained, e.g. `IntrinsicSize.Min`).
- Package: `androidx.compose.material3`.

## Related

- [ListItem](./listitem.md)
