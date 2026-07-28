# NavigableSupportingPaneScaffold

A version of `SupportingPaneScaffold` that adds built-in navigation and predictive back handling, driven by a `ThreePaneScaffoldNavigator`.

## Signature / Usage

```kotlin
@ExperimentalMaterial3AdaptiveApi
@Composable
public fun <T> NavigableSupportingPaneScaffold(
    navigator: ThreePaneScaffoldNavigator<T>,
    mainPane: @Composable ThreePaneScaffoldPaneScope.() -> Unit,
    supportingPane: @Composable ThreePaneScaffoldPaneScope.() -> Unit,
    modifier: Modifier = Modifier,
    extraPane: (@Composable ThreePaneScaffoldPaneScope.() -> Unit)? = null,
    defaultBackBehavior: BackNavigationBehavior = BackNavigationBehavior.PopUntilScaffoldValueChange,
    paneExpansionDragHandle: (@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)? = null,
    paneExpansionState: PaneExpansionState? = null,
)
```

```kotlin
val navigator = rememberSupportingPaneScaffoldNavigator()
val scope = rememberCoroutineScope()

NavigableSupportingPaneScaffold(
    navigator = navigator,
    mainPane = {
        AnimatedPane {
            if (navigator.scaffoldValue[SupportingPaneScaffoldRole.Supporting] == PaneAdaptedValue.Hidden) {
                Button(onClick = {
                    scope.launch { navigator.navigateTo(SupportingPaneScaffoldRole.Supporting) }
                }) { Text("Show supporting pane") }
            }
        }
    },
    supportingPane = { AnimatedPane { Text("Supporting pane") } },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `navigator` | `ThreePaneScaffoldNavigator<T>` | — | Drives which panes are shown and holds navigation history. |
| `mainPane` | `@Composable ThreePaneScaffoldPaneScope.() -> Unit` | — | Primary content pane. |
| `supportingPane` | `@Composable ThreePaneScaffoldPaneScope.() -> Unit` | — | Supporting/secondary content pane. |
| `modifier` | `Modifier` | `Modifier` | Applied to the scaffold. |
| `extraPane` | `(@Composable ThreePaneScaffoldPaneScope.() -> Unit)?` | `null` | Optional third pane. |
| `defaultBackBehavior` | `BackNavigationBehavior` | `BackNavigationBehavior.PopUntilScaffoldValueChange` | Default behavior for the built-in predictive-back handler. |
| `paneExpansionDragHandle` | `(@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)?` | `null` | Draggable handle for resizing panes. |
| `paneExpansionState` | `PaneExpansionState?` | `null` | State controlling pane expansion/resizing. |

## Notes

- `@ExperimentalMaterial3AdaptiveApi` opt-in required. Android-only (`androidMain`); requires `androidx.activity:activity-compose` and module `androidx.compose.material3.adaptive:adaptive-navigation` (1.1.0-beta1+).
- Add `android:enableOnBackInvokedCallback="true"` in `AndroidManifest.xml` to opt in to predictive back on Android 15 and lower.
- Package: `androidx.compose.material3.adaptive.navigation`.

## Related

- [SupportingPaneScaffold](./supporting-pane-scaffold.md)
- [ThreePaneScaffoldNavigator](./three-pane-scaffold-navigator.md)
- [BackNavigationBehavior](./back-navigation-behavior.md)
- [NavigableListDetailPaneScaffold](./navigable-list-detail-pane-scaffold.md)
