# ListDetailSceneStrategy

Material adaptive `SceneStrategy` that lays out a list pane, detail pane, and optional extra pane side-by-side when the window is wide enough, based on `NavEntry.metadata` declaring each entry's pane role.

## Signature / Usage

```kotlin
@ExperimentalMaterial3AdaptiveApi
public class ListDetailSceneStrategy<T : Any>(
    public val shouldHandleSinglePaneLayout: Boolean,
    public val backNavigationBehavior: BackNavigationBehavior,
    public val directive: PaneScaffoldDirective,
    public val adaptStrategies: ThreePaneScaffoldAdaptStrategies,
    public val paneExpansionDragHandle: (@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)?,
    public val paneExpansionState: PaneExpansionState?,
) : SceneStrategy<T>

@ExperimentalMaterial3AdaptiveApi
@Composable
public fun <T : Any> rememberListDetailSceneStrategy(
    shouldHandleSinglePaneLayout: Boolean = false,
    backNavigationBehavior: BackNavigationBehavior = BackNavigationBehavior.PopUntilScaffoldValueChange,
    directive: PaneScaffoldDirective = calculatePaneScaffoldDirective(currentWindowAdaptiveInfoV2()),
    adaptStrategies: ThreePaneScaffoldAdaptStrategies = ListDetailPaneScaffoldDefaults.adaptStrategies(),
    paneExpansionDragHandle: (@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)? = null,
    paneExpansionState: PaneExpansionState? = null,
): ListDetailSceneStrategy<T>

// companion object
public fun listPane(
    sceneKey: Any = Unit,
    detailPlaceholder: @Composable ThreePaneScaffoldScope.() -> Unit = {},
): Map<String, Any>
public fun detailPane(sceneKey: Any = Unit): Map<String, Any>
public fun extraPane(sceneKey: Any = Unit): Map<String, Any>
```

```kotlin
val listDetailStrategy = rememberListDetailSceneStrategy<NavKey>()

NavDisplay(
    backStack = backStack,
    sceneStrategies = listOf(listDetailStrategy),
    entryProvider = entryProvider {
        entry<ProductList>(
            metadata = ListDetailSceneStrategy.listPane(
                detailPlaceholder = { ContentYellow("Choose a product from the list") }
            )
        ) { /* ... */ }
        entry<ProductDetail>(
            metadata = ListDetailSceneStrategy.detailPane()
        ) { /* ... */ }
    }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shouldHandleSinglePaneLayout` | `Boolean` | `false` | Whether this strategy also handles the single-pane (narrow window) case instead of deferring to `SinglePaneSceneStrategy`. |
| `backNavigationBehavior` | `BackNavigationBehavior` | `PopUntilScaffoldValueChange` | Controls how many back stack entries a single back action pops in the multi-pane layout. |
| `directive` | `PaneScaffoldDirective` | `calculatePaneScaffoldDirective(currentWindowAdaptiveInfoV2())` | Derives pane count/arrangement from window size and posture. |
| `adaptStrategies` | `ThreePaneScaffoldAdaptStrategies` | `ListDetailPaneScaffoldDefaults.adaptStrategies()` | Per-pane behavior when a pane can't be shown (hide, reflow, etc.). |
| `paneExpansionDragHandle` / `paneExpansionState` | drag-handle composable / `PaneExpansionState?` | `null` | Optional user-draggable pane resizing. |
| `listPane(sceneKey, detailPlaceholder)` | metadata factory | — | Marks an entry as the list pane; `detailPlaceholder` renders when no detail is selected. |
| `detailPane(sceneKey)` | metadata factory | — | Marks an entry as the detail pane. |
| `extraPane(sceneKey)` | metadata factory | — | Marks an entry as a third, extra pane (e.g. shown alongside list+detail on very wide screens). |

## Notes

- Requires the `androidx.compose.material3.adaptive:adaptive-navigation3` add-on artifact; `@ExperimentalMaterial3AdaptiveApi`.
- This is a `SceneStrategy` built on top of `ListDetailPaneScaffold` / `ThreePaneScaffoldNavigator` (owned by `android-compose-ui`'s `adaptive-layout` category) — use this page for the Navigation-3-integrated version; use `android-compose-ui`'s adaptive-layout reference for the standalone scaffold API.
- Package: `androidx.compose.material3.adaptive.navigation3` (module `androidx.compose.material3.adaptive:adaptive-navigation3`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [SceneStrategy](./scenestrategy.md)
- [SupportingPaneSceneStrategy](./supportingpanescenestrategy.md)
- [Scene](./scene.md)
