# ModalNavigationDrawer

Modal navigation drawer that slides in over app content and blocks interaction with the rest of the app via a scrim, until dismissed.

## Signature / Usage

```kotlin
@Composable
fun ModalNavigationDrawer(
    drawerContent: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    drawerState: DrawerState = rememberDrawerState(DrawerValue.Closed),
    gesturesEnabled: Boolean = true,
    scrimColor: Color = DrawerDefaults.scrimColor,
    content: @Composable () -> Unit,
)
```

```kotlin
val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
val scope = rememberCoroutineScope()

ModalNavigationDrawer(
    drawerState = drawerState,
    drawerContent = {
        ModalDrawerSheet {
            Text("Drawer title", modifier = Modifier.padding(16.dp))
            HorizontalDivider()
            NavigationDrawerItem(
                label = { Text("Item") },
                selected = false,
                onClick = { scope.launch { drawerState.close() } }
            )
        }
    }
) {
    // Screen content
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `drawerContent` | `@Composable () -> Unit` | — | Drawer content, typically a `ModalDrawerSheet`. |
| `modifier` | `Modifier` | `Modifier` | Applied to the root layout. |
| `drawerState` | `DrawerState` | `rememberDrawerState(DrawerValue.Closed)` | Controls open/close state; has suspend `open()` / `close()` and `isOpen` / `isClosed`. |
| `gesturesEnabled` | `Boolean` | `true` | Whether the drawer responds to swipe gestures. |
| `scrimColor` | `Color` | `DrawerDefaults.scrimColor` | Color of the scrim overlay behind the drawer. |
| `content` | `@Composable () -> Unit` | — | Main screen content behind the drawer. |

## Notes

- `DismissibleNavigationDrawer` is a variant sharing `drawerContent` / `modifier` / `drawerState` / `gesturesEnabled` / `content` (no `scrimColor`): the drawer shares space with content instead of overlaying it with a scrim; use for layouts prioritizing content or infrequent destination switching.
- `PermanentNavigationDrawer` is a variant with only `drawerContent`, `modifier`, `content` (no state/gestures — always visible); use for frequently switching destinations.
- Each variant pairs with its own sheet composable: `ModalDrawerSheet`, `DismissibleDrawerSheet`, `PermanentDrawerSheet`, all accepting `modifier`, `shape` (modal only), `containerColor`, `contentColor`, `tonalElevation`, `windowInsets`, and a `content: ColumnScope.() -> Unit` slot.
- `NavigationDrawerItem(label, selected, onClick, modifier, icon, badge, shape, ...)` renders an individual row inside a drawer sheet.
- Package: `androidx.compose.material3`.

## Related

- [Scaffold](./scaffold.md)
- [Divider](./divider.md)
