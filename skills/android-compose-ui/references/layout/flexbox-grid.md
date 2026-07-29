# FlexBox / Grid (experimental)

`FlexBox` and `Grid` are experimental, non-lazy layout composables in `androidx.compose.foundation.layout` inspired by CSS Flexbox and CSS Grid. They are distinct from the lazy `LazyVerticalGrid`/`LazyHorizontalGrid` and from `FlowRow`/`FlowColumn`, targeting small item counts that need flexible resizing, wrapping, or two-dimensional item placement rather than lazy composition of large datasets.

## Signature / Usage

```kotlin
@ExperimentalFlexBoxApi
@Composable
fun FlexBox(
    modifier: Modifier = Modifier,
    config: FlexBoxConfig,
    content: @Composable () -> Unit,
)
```

```kotlin
@OptIn(ExperimentalFlexBoxApi::class)
@Composable
fun FlexBoxSample() {
    FlexBox(
        config = FlexBoxConfig(wrap = true, justifyContent = JustifyContent.SpaceBetween),
    ) {
        Text("A", Modifier.flex(grow = 1f))
        Text("B", Modifier.flex(grow = 1f))
        Text("C", Modifier.flex(grow = 2f))
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `FlexBoxConfig.direction` | enum | row | Main-axis layout direction (row/column), like CSS `flex-direction`. |
| `FlexBoxConfig.wrap` | `Boolean` | `false` | Wraps items onto new lines when the main axis runs out of space. |
| `FlexBoxConfig.justifyContent` | enum | — | Distributes items along the main axis (like CSS `justify-content`). |
| `FlexBoxConfig.alignItems` | enum | — | Aligns items along the cross axis (like CSS `align-items`). |
| `FlexBoxConfig.alignContent` | enum | — | Distributes extra cross-axis space across multiple wrapped lines. |
| `FlexBoxConfig.rowGap` / `columnGap` | `Dp` | `0.dp` | Spacing between items and between wrapped lines. |
| `Modifier.flex(basis, grow, shrink, alignSelf, order)` | mixed | — | Per-item flex properties: initial size (`basis`), growth/shrink share of extra/deficit space, per-item cross-axis alignment override, and explicit ordering. |

## Notes

- Both APIs are experimental/alpha (require `@OptIn(ExperimentalFlexBoxApi::class)` or the equivalent Grid opt-in) and their surface may change; prefer `FlowRow`/`FlowColumn` or the lazy grids for stable, production layouts today.
- `FlexBox` targets small, flexible item sets with grow/shrink/wrap behavior; `Grid` targets larger, lazy-loadable two-dimensional layouts — neither replaces `LazyVerticalGrid`/`LazyHorizontalGrid` for large datasets.
- Package: `androidx.compose.foundation.layout`.

## Related

- [FlowRow / FlowColumn](./flow-layout.md)
- [LazyVerticalGrid](./lazyverticalgrid.md)
- [LazyVerticalStaggeredGrid](./lazyverticalstaggeredgrid.md)
