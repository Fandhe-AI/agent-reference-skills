# NavDisplay / SwipeDismissableSceneStrategy (Navigation 3)

Wear OS integration for the cross-platform Navigation 3 library. `NavDisplay` (from `androidx.navigation3.ui`) renders whichever destination is on top of a back stack of type-safe `NavKey` entries; `rememberSwipeDismissableSceneStrategy()` (Wear-specific) is passed into `NavDisplay` to add swipe-to-dismiss gesture / predictive-back handling on top. This is the newer, recommended navigation approach for Wear Compose, alongside the older `SwipeDismissableNavHost`.

## Signature / Usage

```kotlin
@Composable
public fun <T : Any> rememberSwipeDismissableSceneStrategy(
    isUserSwipeEnabled: Boolean = true
): SwipeDismissableSceneStrategy<T>
```

```kotlin
@Composable
public fun <T : Any> NavDisplay(
    backStack: List<T>,
    modifier: Modifier = Modifier,
    onBack: () -> Unit = { /* pops backStack if it's a MutableList */ },
    entryDecorators: List<NavEntryDecorator<T>> = listOf(rememberSaveableStateHolderNavEntryDecorator()),
    sceneStrategies: List<SceneStrategy<T>> = listOf(SinglePaneSceneStrategy()),
    entryProvider: (key: T) -> NavEntry<T>,
)
```

```kotlin
@Serializable
sealed interface Screen : NavKey {
    @Serializable data object Home : Screen
    @Serializable data class Details(val itemId: String) : Screen
}

@Composable
fun AppNavigation() {
    val backStack = rememberNavBackStack(Screen.Home)
    val sceneStrategy = rememberSwipeDismissableSceneStrategy<NavKey>()

    NavDisplay(
        backStack = backStack,
        sceneStrategies = listOf(sceneStrategy),
        entryProvider = entryProvider {
            entry<Screen.Home> {
                HomeScreen(onNavigateToDetails = { id -> backStack.add(Screen.Details(id)) })
            }
            entry<Screen.Details> { key ->
                DetailsScreen(itemId = key.itemId, onBack = { backStack.removeLast() })
            }
        },
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isUserSwipeEnabled` (`rememberSwipeDismissableSceneStrategy`) | `Boolean` | `true` | Whether the swipe-to-dismiss gesture is enabled for the strategy's scenes. |
| `backStack` (NavDisplay) | `List<T>` | — | Typically a `NavBackStack<NavKey>` from `rememberNavBackStack(vararg elements: NavKey)`. Since it's a `MutableList`, navigate with `backStack.add(key)` / `backStack.removeLast()`. |
| `sceneStrategies` (NavDisplay) | `List<SceneStrategy<T>>` | `listOf(SinglePaneSceneStrategy())` | Pass `listOf(rememberSwipeDismissableSceneStrategy())` to get Wear's swipe-to-dismiss / predictive-back scene; without it `NavDisplay` falls back to plain single-pane display. |
| `entryProvider` (NavDisplay) | `(key: T) -> NavEntry<T>` | — | Built with the `entryProvider { entry<Key> { ... } }` DSL (`androidx.navigation3.runtime`), mapping each `NavKey` subtype to its composable content. |
| `entryDecorators` (NavDisplay) | `List<NavEntryDecorator<T>>` | `listOf(rememberSaveableStateHolderNavEntryDecorator())` | Add cross-cutting entry behavior, e.g. `rememberViewModelStoreNavEntryDecorator()` to scope `ViewModel`s to each back-stack entry. |

## Notes

- Requires `androidx.navigation3:navigation3-runtime` / `navigation3-ui` (core, cross-platform) plus `androidx.wear.compose:compose-navigation3` for `rememberSwipeDismissableSceneStrategy` / `SwipeDismissableSceneStrategy`.
- `NavKey` destinations are typically a `@Serializable` sealed interface with `data object` / `data class` implementations, replacing the string routes used by `SwipeDismissableNavHost` / `NavGraphBuilder`; requires `kotlinx-serialization-json`. The zero-arg `rememberNavBackStack(vararg elements: NavKey)` overload (Android-only, reflection-based) is the simplest way to create the back stack; a cross-platform overload takes an explicit `SavedStateConfiguration` instead.
- Below API 36, `SwipeDismissableSceneStrategy` renders the current entry inside a `BasicSwipeToDismissBox` to detect the swipe-back gesture; from API 36 it uses platform predictive back instead.
- `SwipeDismissableNavHost` (`androidx.wear.compose.navigation`) remains supported for apps that have not migrated to Navigation 3 — both are valid, but Navigation 3 is the direction new guidance points to.
- Package: `androidx.wear.compose.navigation3` (artifact `androidx.wear.compose:compose-navigation3`) for the Wear-specific `rememberSwipeDismissableSceneStrategy` / `SwipeDismissableSceneStrategy`; core types (`NavKey`, `NavBackStack`, `rememberNavBackStack`, `entryProvider`) come from `androidx.navigation3.runtime`, and `NavDisplay` from `androidx.navigation3.ui` — neither is Wear-specific.

## Related

- [SwipeDismissableNavHost](./swipe-dismissable-nav-host.md)
