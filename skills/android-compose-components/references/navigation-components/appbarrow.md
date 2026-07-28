# AppBarRow

Arranges children horizontally (e.g. app bar `actions`), and if children overflow the available width, displays an overflow indicator that moves excess items into a dropdown menu.

## Signature / Usage

```kotlin
@Composable
fun AppBarRow(
    modifier: Modifier = Modifier,
    overflowIndicator: @Composable (AppBarMenuState) -> Unit = { menuState ->
        AppBarOverflowIndicator(menuState)
    },
    maxItemCount: Int = Int.MAX_VALUE,
    content: AppBarRowScope.() -> Unit,
)
```

```kotlin
TopAppBar(
    title = { Text("Title") },
    actions = {
        AppBarRow(maxItemCount = 4) {
            clickableItem(onClick = { }, icon = { Icon(Icons.Filled.Share, null) }, label = "Share")
            clickableItem(onClick = { }, icon = { Icon(Icons.Filled.Print, null) }, label = "Print")
        }
    }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to this row. |
| `overflowIndicator` | `@Composable (AppBarMenuState) -> Unit` | `AppBarOverflowIndicator(menuState)` | Content (typically an overflow `IconButton`) shown when items don't fit; opens/closes the overflow menu via `AppBarMenuState`. |
| `maxItemCount` | `Int` | `Int.MAX_VALUE` | Maximum number of items shown inline before overflowing the rest into the menu. |
| `content` | `AppBarRowScope.() -> Unit` | — | Items declared via `AppBarRowScope` DSL (e.g. `clickableItem`), laid out left-to-right (right-to-left in RTL). |

## Notes

- Package: `androidx.compose.material3`.
- `AppBarColumn` is the vertical counterpart with an identical signature (`AppBarColumnScope` instead of `AppBarRowScope`, children laid out top-to-bottom), used for vertical action layouts such as inside `VerticalFloatingToolbar`.
- Typically used inside the `actions` slot of `TopAppBar` / `BottomAppBar` or the content of a floating toolbar, to automatically collapse overflowing actions into a menu instead of manually deciding which icons to hide.

## Related

- [TopAppBar](./topappbar.md)
- [HorizontalFloatingToolbar](./horizontalfloatingtoolbar.md)
