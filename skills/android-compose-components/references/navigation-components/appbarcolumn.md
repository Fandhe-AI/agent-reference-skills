# AppBarColumn

Arranges children vertically, and if children overflow the available height, displays an overflow indicator that moves excess items into a dropdown menu.

## Signature / Usage

```kotlin
@Composable
fun AppBarColumn(
    modifier: Modifier = Modifier,
    overflowIndicator: @Composable (AppBarMenuState) -> Unit = { menuState ->
        AppBarOverflowIndicator(menuState)
    },
    maxItemCount: Int = Int.MAX_VALUE,
    content: AppBarColumnScope.() -> Unit,
)
```

```kotlin
VerticalFloatingToolbar(
    expanded = true,
    content = {
        AppBarColumn(maxItemCount = 3) {
            clickableItem(onClick = { }, icon = { Icon(Icons.Filled.Share, null) }, label = "Share")
            clickableItem(onClick = { }, icon = { Icon(Icons.Filled.Print, null) }, label = "Print")
        }
    },
    floatingActionButton = { /* ... */ },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to this column. |
| `overflowIndicator` | `@Composable (AppBarMenuState) -> Unit` | `AppBarOverflowIndicator(menuState)` | Content (typically an overflow `IconButton`) shown when items don't fit; opens/closes the overflow menu via `AppBarMenuState`. |
| `maxItemCount` | `Int` | `Int.MAX_VALUE` | Maximum number of items shown inline before overflowing the rest into the menu. |
| `content` | `AppBarColumnScope.() -> Unit` | — | Items declared via `AppBarColumnScope` DSL (e.g. `clickableItem`), laid out top-to-bottom. |

## Notes

- Package: `androidx.compose.material3`.
- `AppBarRow` is the horizontal counterpart with an identical signature (`AppBarRowScope` instead of `AppBarColumnScope`, children laid out left-to-right), used for horizontal action layouts such as `TopAppBar` / `BottomAppBar` actions.
- Typically used inside vertical floating toolbars (e.g. `VerticalFloatingToolbar`) to automatically collapse overflowing actions into a menu instead of manually deciding which icons to hide.

## Related

- [AppBarRow](./appbarrow.md)
- [VerticalFloatingToolbar](./verticalfloatingtoolbar.md)
