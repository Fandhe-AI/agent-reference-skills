# AnimatedPane

Root composable for the content of a single pane inside a `ThreePaneScaffold`, applying default enter/exit and bounds-change motion when panes switch adapted state.

## Signature / Usage

```kotlin
@ExperimentalMaterial3AdaptiveApi
@Composable
public fun <
    RoleT : PaneScaffoldRole,
    ScaffoldValueT : PaneScaffoldValue<RoleT>,
> ExtendedPaneScaffoldPaneScope<RoleT, ScaffoldValueT>.AnimatedPane(
    modifier: Modifier = Modifier,
    enterTransition: EnterTransition = motionDataProvider.calculateDefaultEnterTransition(paneRole),
    exitTransition: ExitTransition = motionDataProvider.calculateDefaultExitTransition(paneRole),
    boundsAnimationSpec: FiniteAnimationSpec<IntRect> = PaneMotionDefaults.AnimationSpec,
    dragToResizeHandle: (@Composable (DragToResizeState) -> Unit)? = null,
    shape: Shape = RectangleShape,
    content: (@Composable AnimatedPaneScope.() -> Unit),
)
```

```kotlin
ListDetailPaneScaffold(
    directive = navigator.scaffoldDirective,
    value = navigator.scaffoldValue,
    listPane = {
        AnimatedPane {
            ListContent()
        }
    },
    detailPane = {
        AnimatedPane {
            DetailContent()
        }
    },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the pane container. |
| `enterTransition` | `EnterTransition` | motion-provider default for this pane's role | Animation used when the pane appears. |
| `exitTransition` | `ExitTransition` | motion-provider default for this pane's role | Animation used when the pane disappears. |
| `boundsAnimationSpec` | `FiniteAnimationSpec<IntRect>` | `PaneMotionDefaults.AnimationSpec` | Animation spec for bounds changes (e.g. pane resizing). |
| `dragToResizeHandle` | `(@Composable (DragToResizeState) -> Unit)?` | `null` | Optional draggable handle rendered for resizing this pane. |
| `shape` | `Shape` | `RectangleShape` | Clip shape applied to the pane during motion. |
| `content` | `@Composable AnimatedPaneScope.() -> Unit` | — | Pane content. |

## Notes

- `@ExperimentalMaterial3AdaptiveApi` opt-in required. Must be called from within a pane scope (`listPane`, `detailPane`, `mainPane`, `supportingPane`, `extraPane`) of a `ListDetailPaneScaffold` / `SupportingPaneScaffold`.
- Wrapping pane content in `AnimatedPane` is what gives list-detail / supporting-pane layouts their default cross-fade and slide motion when the window size class changes.
- Package: `androidx.compose.material3.adaptive.layout`.

## Related

- [ListDetailPaneScaffold](./list-detail-pane-scaffold.md)
- [SupportingPaneScaffold](./supporting-pane-scaffold.md)
- [PaneAdaptedValue](./pane-adapted-value.md)
