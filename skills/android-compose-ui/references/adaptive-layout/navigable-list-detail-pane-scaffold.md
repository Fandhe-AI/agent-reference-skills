# NavigableListDetailPaneScaffold

A version of `ListDetailPaneScaffold` that adds built-in navigation and predictive back handling, driven by a `ThreePaneScaffoldNavigator`.

## Signature / Usage

```kotlin
@ExperimentalMaterial3AdaptiveApi
@Composable
public fun <T> NavigableListDetailPaneScaffold(
    navigator: ThreePaneScaffoldNavigator<T>,
    listPane: @Composable ThreePaneScaffoldPaneScope.() -> Unit,
    detailPane: @Composable ThreePaneScaffoldPaneScope.() -> Unit,
    modifier: Modifier = Modifier,
    extraPane: (@Composable ThreePaneScaffoldPaneScope.() -> Unit)? = null,
    defaultBackBehavior: BackNavigationBehavior = BackNavigationBehavior.PopUntilScaffoldValueChange,
    paneExpansionDragHandle: (@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)? = null,
    paneExpansionState: PaneExpansionState? = null,
)
```

```kotlin
val navigator = rememberListDetailPaneScaffoldNavigator<MyItem>()
val scope = rememberCoroutineScope()

NavigableListDetailPaneScaffold(
    navigator = navigator,
    listPane = {
        AnimatedPane {
            ListContent(onItemClick = { item ->
                scope.launch { navigator.navigateTo(ListDetailPaneScaffoldRole.Detail, item) }
            })
        }
    },
    detailPane = {
        AnimatedPane {
            DetailContent(
                item = navigator.currentDestination?.contentKey,
                onClosePane = { scope.launch { navigator.navigateBack() } },
            )
        }
    },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `navigator` | `ThreePaneScaffoldNavigator<T>` | — | Drives which panes are shown and holds navigation history. |
| `listPane` | `@Composable ThreePaneScaffoldPaneScope.() -> Unit` | — | Content of the list pane. |
| `detailPane` | `@Composable ThreePaneScaffoldPaneScope.() -> Unit` | — | Content of the detail pane. |
| `modifier` | `Modifier` | `Modifier` | Applied to the scaffold. |
| `extraPane` | `(@Composable ThreePaneScaffoldPaneScope.() -> Unit)?` | `null` | Optional third pane. |
| `defaultBackBehavior` | `BackNavigationBehavior` | `BackNavigationBehavior.PopUntilScaffoldValueChange` | Default behavior for the built-in predictive-back handler. |
| `paneExpansionDragHandle` | `(@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)?` | `null` | Draggable handle for resizing panes. |
| `paneExpansionState` | `PaneExpansionState?` | `null` | State controlling pane expansion/resizing. |

## Notes

- `@ExperimentalMaterial3AdaptiveApi` opt-in required. Android-only (`androidMain`); requires `androidx.activity:activity-compose` and module `androidx.compose.material3.adaptive:adaptive-navigation` (1.1.0-beta1+).
- Add `android:enableOnBackInvokedCallback="true"` to `<application>`/`<activity>` in `AndroidManifest.xml` to opt in to predictive back on Android 15 and lower; enabled by default on Android 16+.
- Package: `androidx.compose.material3.adaptive.navigation`.

## Related

- [ListDetailPaneScaffold](./list-detail-pane-scaffold.md)
- [ThreePaneScaffoldNavigator](./three-pane-scaffold-navigator.md)
- [BackNavigationBehavior](./back-navigation-behavior.md)
- [NavigableSupportingPaneScaffold](./navigable-supporting-pane-scaffold.md)
