# SupportingPaneSceneStrategy

Material adaptive `SceneStrategy` that lays out a main pane alongside a supporting pane (and optional extra pane) when the window is wide enough, based on `NavEntry.metadata` declaring each entry's pane role.

## Signature / Usage

```kotlin
public class SupportingPaneSceneStrategy<T : Any>(
    public val shouldHandleSinglePaneLayout: Boolean,
    public val backNavigationBehavior: BackNavigationBehavior,
    public val directive: PaneScaffoldDirective,
    public val adaptStrategies: ThreePaneScaffoldAdaptStrategies,
    public val paneExpansionDragHandle: (@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)?,
    public val paneExpansionState: PaneExpansionState?,
) : SceneStrategy<T>

@ExperimentalMaterial3AdaptiveApi
@Composable
public fun <T : Any> rememberSupportingPaneSceneStrategy(
    shouldHandleSinglePaneLayout: Boolean = false,
    backNavigationBehavior: BackNavigationBehavior = BackNavigationBehavior.PopUntilCurrentDestinationChange,
    directive: PaneScaffoldDirective = calculatePaneScaffoldDirective(currentWindowAdaptiveInfoV2()),
    adaptStrategies: ThreePaneScaffoldAdaptStrategies = SupportingPaneScaffoldDefaults.adaptStrategies(),
    paneExpansionDragHandle: (@Composable ThreePaneScaffoldScope.(PaneExpansionState) -> Unit)? = null,
    paneExpansionState: PaneExpansionState? = null,
): SupportingPaneSceneStrategy<T>

// companion object
public fun mainPane(sceneKey: Any = Unit): Map<String, Any>
public fun supportingPane(sceneKey: Any = Unit): Map<String, Any>
public fun extraPane(sceneKey: Any = Unit): Map<String, Any>
```

```kotlin
val supportingStrategy = rememberSupportingPaneSceneStrategy<NavKey>()

NavDisplay(
    backStack = backStack,
    sceneStrategies = listOf(supportingStrategy),
    entryProvider = entryProvider {
        entry<Main>(metadata = SupportingPaneSceneStrategy.mainPane()) { /* ... */ }
        entry<Supporting>(metadata = SupportingPaneSceneStrategy.supportingPane()) { /* ... */ }
    }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shouldHandleSinglePaneLayout` | `Boolean` | `false` | Whether this strategy also handles the single-pane (narrow window) case. |
| `backNavigationBehavior` | `BackNavigationBehavior` | `PopUntilCurrentDestinationChange` | Controls how many back stack entries a single back action pops in the multi-pane layout. |
| `directive` | `PaneScaffoldDirective` | `calculatePaneScaffoldDirective(currentWindowAdaptiveInfoV2())` | Derives pane count/arrangement from window size and posture. |
| `adaptStrategies` | `ThreePaneScaffoldAdaptStrategies` | `SupportingPaneScaffoldDefaults.adaptStrategies()` | Per-pane behavior when a pane can't be shown. |
| `paneExpansionDragHandle` / `paneExpansionState` | drag-handle composable / `PaneExpansionState?` | `null` | Optional user-draggable pane resizing. |
| `mainPane(sceneKey)` | metadata factory | — | Marks an entry as the main pane. |
| `supportingPane(sceneKey)` | metadata factory | — | Marks an entry as the supporting pane. |
| `extraPane(sceneKey)` | metadata factory | — | Marks an entry as a third, extra pane. |

## Notes

- Requires the `androidx.compose.material3.adaptive:adaptive-navigation3` add-on artifact.
- Sibling of `ListDetailSceneStrategy`; use `SupportingPaneSceneStrategy` for main/supporting layouts (e.g. content + related info) rather than list/detail navigation.
- Package: `androidx.compose.material3.adaptive.navigation3` (module `androidx.compose.material3.adaptive:adaptive-navigation3`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [ListDetailSceneStrategy](./listdetailscenestrategy.md)
- [SceneStrategy](./scenestrategy.md)
- [Scene](./scene.md)
