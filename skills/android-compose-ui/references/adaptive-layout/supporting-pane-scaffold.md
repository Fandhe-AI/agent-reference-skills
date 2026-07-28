# SupportingPaneScaffold

Three-pane layout implementing the canonical supporting-pane pattern: shows a main content pane alongside a supporting pane on expanded windows, and only the main pane on compact/medium windows.

## Signature / Usage

```kotlin
@ExperimentalMaterial3AdaptiveApi
@Composable
public fun SupportingPaneScaffold(
    directive: PaneScaffoldDirective,
    value: ThreePaneScaffoldValue,
    mainPane: @Composable ThreePaneScaffoldPaneScope.() -> Unit,
    supportingPane: @Composable ThreePaneScaffoldPaneScope.() -> Unit,
    modifier: Modifier = Modifier,
    extraPane: (@Composable ThreePaneScaffoldPaneScope.() -> Unit)? = null,
    paneExpansionDragHandle: (@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)? = null,
    paneExpansionState: PaneExpansionState? = null,
)

// Overload accepting a ThreePaneScaffoldState instead of a raw value
@ExperimentalMaterial3AdaptiveApi
@Composable
public fun SupportingPaneScaffold(
    directive: PaneScaffoldDirective,
    scaffoldState: ThreePaneScaffoldState,
    mainPane: @Composable ThreePaneScaffoldPaneScope.() -> Unit,
    supportingPane: @Composable ThreePaneScaffoldPaneScope.() -> Unit,
    modifier: Modifier = Modifier,
    extraPane: (@Composable ThreePaneScaffoldPaneScope.() -> Unit)? = null,
    paneExpansionDragHandle: (@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)? = null,
    paneExpansionState: PaneExpansionState? = null,
)
```

```kotlin
val navigator = rememberSupportingPaneScaffoldNavigator()

SupportingPaneScaffold(
    directive = navigator.scaffoldDirective,
    value = navigator.scaffoldValue,
    mainPane = { AnimatedPane { MainContent() } },
    supportingPane = { AnimatedPane { SupportingContent() } },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `directive` | `PaneScaffoldDirective` | — | How many panes to show and how to size them. |
| `value` | `ThreePaneScaffoldValue` | — | Adapted state of each pane. |
| `scaffoldState` | `ThreePaneScaffoldState` | — | (2nd overload) Value plus in-progress pane transitions. |
| `mainPane` | `@Composable ThreePaneScaffoldPaneScope.() -> Unit` | — | Primary content pane. |
| `supportingPane` | `@Composable ThreePaneScaffoldPaneScope.() -> Unit` | — | Supporting/secondary content pane. |
| `modifier` | `Modifier` | `Modifier` | Applied to the scaffold. |
| `extraPane` | `(@Composable ThreePaneScaffoldPaneScope.() -> Unit)?` | `null` | Optional third pane. |
| `paneExpansionDragHandle` | `(@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)?` | `null` | Draggable handle for resizing panes. |
| `paneExpansionState` | `PaneExpansionState?` | `null` | State controlling pane expansion/resizing. |

## Notes

- `@ExperimentalMaterial3AdaptiveApi` opt-in required. Requires `androidx.compose.material3.adaptive:adaptive` and `:adaptive-layout` (1.1.0-beta1+).
- `SupportingPaneScaffoldRole` maps semantic roles to `ThreePaneScaffoldRole`: `Main` → `Primary`, `Supporting` → `Secondary`, `Extra` → `Tertiary`.
- For built-in navigation and predictive back handling, prefer `NavigableSupportingPaneScaffold` over manually driving `directive`/`value` from a `ThreePaneScaffoldNavigator`.
- Internally implemented on top of `androidx.compose.material3.adaptive.layout.ThreePaneScaffold`, which is `internal` (not part of the public API surface).
- Package: `androidx.compose.material3.adaptive.layout`.

## Related

- [NavigableSupportingPaneScaffold](./navigable-supporting-pane-scaffold.md)
- [ListDetailPaneScaffold](./list-detail-pane-scaffold.md)
- [ThreePaneScaffoldNavigator](./three-pane-scaffold-navigator.md)
- [AnimatedPane](./animated-pane.md)
