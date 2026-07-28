# ButtonGroup

Layout composable that arranges buttons horizontally, animating the pressed button's width to expand while compressing its neighbors, with overflow-menu support for items that don't fit.

## Signature / Usage

```kotlin
@Composable
fun ButtonGroup(
    overflowIndicator: @Composable (ButtonGroupMenuState) -> Unit,
    modifier: Modifier = Modifier,
    expandedRatio: Float = ButtonGroupDefaults.ExpandedRatio,
    horizontalArrangement: Arrangement.Horizontal = ButtonGroupDefaults.HorizontalArrangement,
    verticalAlignment: Alignment.Vertical = Alignment.Top,
    content: ButtonGroupScope.() -> Unit,
)
```

```kotlin
ButtonGroup(
    overflowIndicator = { menuState -> /* overflow icon triggering menuState */ }
) {
    clickableItem(onClick = { /* action */ }, label = "Reply")
    clickableItem(onClick = { /* action */ }, label = "Forward")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `overflowIndicator` | `@Composable (ButtonGroupMenuState) -> Unit` | — | Displayed at the end of the group when content overflows; receives a `ButtonGroupMenuState`. |
| `modifier` | `Modifier` | `Modifier` | Applied to the button group. |
| `expandedRatio` | `Float` | `ButtonGroupDefaults.ExpandedRatio` | Percentage of the interacted child's width used to expand it and compress its neighbors. |
| `horizontalArrangement` | `Arrangement.Horizontal` | `ButtonGroupDefaults.HorizontalArrangement` | Horizontal arrangement of the group's children. |
| `verticalAlignment` | `Alignment.Vertical` | `Alignment.Top` | Vertical alignment of the group's children. |
| `content` | `ButtonGroupScope.() -> Unit` | — | Content displayed in the group, expected to use composables tagged with `ButtonGroupScope.animateWidth`. |

## Notes

- Not experimental at the top level — no `@ExperimentalMaterial3Api` / `@ExperimentalMaterial3ExpressiveApi` annotation on the public `ButtonGroup` composable itself (some internal defaults, e.g. `OverflowIndicator`, are `@OptIn(ExperimentalMaterial3Api::class)`).
- Package: `androidx.compose.material3`.

## Related

- [Button](./button.md)
