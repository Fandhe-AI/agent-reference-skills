# ListDetailPaneScaffold

Three-pane layout implementing the canonical list-detail pattern: shows list and detail panes side by side on expanded windows, and a single pane at a time on compact/medium windows.

## Signature / Usage

```kotlin
@ExperimentalMaterial3AdaptiveApi
@Composable
public fun ListDetailPaneScaffold(
    directive: PaneScaffoldDirective,
    value: ThreePaneScaffoldValue,
    listPane: @Composable ThreePaneScaffoldPaneScope.() -> Unit,
    detailPane: @Composable ThreePaneScaffoldPaneScope.() -> Unit,
    modifier: Modifier = Modifier,
    extraPane: (@Composable ThreePaneScaffoldPaneScope.() -> Unit)? = null,
    paneExpansionDragHandle: (@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)? = null,
    paneExpansionState: PaneExpansionState? = null,
)

// Overload accepting a ThreePaneScaffoldState (value + in-flight transitions) instead of a raw value
@ExperimentalMaterial3AdaptiveApi
@Composable
public fun ListDetailPaneScaffold(
    directive: PaneScaffoldDirective,
    scaffoldState: ThreePaneScaffoldState,
    listPane: @Composable ThreePaneScaffoldPaneScope.() -> Unit,
    detailPane: @Composable ThreePaneScaffoldPaneScope.() -> Unit,
    modifier: Modifier = Modifier,
    extraPane: (@Composable ThreePaneScaffoldPaneScope.() -> Unit)? = null,
    paneExpansionDragHandle: (@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)? = null,
    paneExpansionState: PaneExpansionState? = null,
)
```

```kotlin
val navigator = rememberListDetailPaneScaffoldNavigator<MyItem>()

ListDetailPaneScaffold(
    directive = navigator.scaffoldDirective,
    value = navigator.scaffoldValue,
    listPane = { AnimatedPane { ListContent() } },
    detailPane = { AnimatedPane { DetailContent() } },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `directive` | `PaneScaffoldDirective` | — | How many panes to show and how to size them. |
| `value` | `ThreePaneScaffoldValue` | — | Adapted state (shown/hidden/expanded) of each pane. |
| `scaffoldState` | `ThreePaneScaffoldState` | — | (2nd overload) Value plus in-progress pane transitions/animations. |
| `listPane` | `@Composable ThreePaneScaffoldPaneScope.() -> Unit` | — | Content of the list pane. |
| `detailPane` | `@Composable ThreePaneScaffoldPaneScope.() -> Unit` | — | Content of the detail pane. |
| `modifier` | `Modifier` | `Modifier` | Applied to the scaffold. |
| `extraPane` | `(@Composable ThreePaneScaffoldPaneScope.() -> Unit)?` | `null` | Optional third pane for supplementary content. |
| `paneExpansionDragHandle` | `(@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)?` | `null` | Draggable handle for resizing the split between panes. |
| `paneExpansionState` | `PaneExpansionState?` | `null` | State controlling pane expansion/resizing. |

## Notes

- `@ExperimentalMaterial3AdaptiveApi` opt-in required. Requires `androidx.compose.material3.adaptive:adaptive` and `:adaptive-layout` (1.1.0-beta1+).
- `ListDetailPaneScaffoldRole` maps semantic roles to `ThreePaneScaffoldRole`: `List` → `Secondary`, `Detail` → `Primary`, `Extra` → `Tertiary`.
- For built-in navigation and predictive back handling, prefer `NavigableListDetailPaneScaffold` over manually driving `directive`/`value` from a `ThreePaneScaffoldNavigator`.
- Internally implemented on top of `androidx.compose.material3.adaptive.layout.ThreePaneScaffold`, which is `internal` (not part of the public API surface).
- Package: `androidx.compose.material3.adaptive.layout`.

## Related

- [NavigableListDetailPaneScaffold](./navigable-list-detail-pane-scaffold.md)
- [SupportingPaneScaffold](./supporting-pane-scaffold.md)
- [ThreePaneScaffoldNavigator](./three-pane-scaffold-navigator.md)
- [AnimatedPane](./animated-pane.md)
- [PaneScaffoldDirective](./pane-scaffold-directive.md)
