# Migrate from Navigation 2 to Navigation 3

A single, atomic migration path from `NavController`/`NavHost` (Navigation Compose 2.x) to Navigation 3's state-based back stack. It assumes one or more top-level routes (e.g. bottom-nav destinations), each owning its own back stack, and does not support incremental (partial) migration.

## Signature / Usage

```kotlin
// 1. Routes implement NavKey instead of being plain @Serializable classes.
@Serializable data class RouteA(val id: String) : NavKey
@Serializable data object RouteB : NavKey
@Serializable data object RouteD : NavKey

// 2. Replace NavGraphBuilder DSL (composable<T>/navigation<T>/dialog<T>) with entryProvider/entry.
val entryProvider = entryProvider<NavKey> {
    entry<RouteA> { key -> ScreenA(title = "Screen has ID: ${key.id}") }
    entry<RouteB> { ScreenB() }
    // dialog<RouteD> {...} becomes entry<RouteD> with DialogSceneStrategy metadata:
    entry<RouteD>(metadata = DialogSceneStrategy.dialog()) { ScreenD() }
}

// 3. Replace NavHost with NavDisplay, driven by app-owned NavigationState/Navigator
//    instead of NavController.
NavDisplay(
    entries = navigationState.toEntries(entryProvider),
    onBack = { navigator.goBack() },
    sceneStrategies = remember { listOf(DialogSceneStrategy()) },
)
```

## Options / Props

| Navigation 2 (`NavController`) | Navigation 3 equivalent |
|------|-------------|
| `navigate(route)` | `navigator.navigate(route)` (app-owned `Navigator` wrapping `NavigationState`) |
| `popBackStack()` | `navigator.goBack()` |
| `currentBackStack` | `navigationState.backStacks[topLevelRoute]` |
| `currentBackStackEntryAsState()` | Compare against `navigationState.topLevelRoute` directly |
| `composable<T> { }` | `entry<T> { key -> }` inside `entryProvider { }` |
| `navigation<BaseRoute>(startDestination) { }` | Deleted — no nested graphs; register the child routes directly |
| `dialog<T> { }` | `entry<T>(metadata = DialogSceneStrategy.dialog()) { }` |
| `NavHost(navController, startDestination) { }` | `NavDisplay(entries = ..., onBack = ..., sceneStrategies = ...)` |

## Notes

- Steps, in order: (1) add `androidx.navigation3:navigation3-runtime`/`navigation3-ui` and `androidx.lifecycle:lifecycle-viewmodel-navigation3`, and raise `minSdk` to 23 / `compileSdk` to 36; (2) make every route implement `NavKey`; (3) write app-owned `NavigationState` (one `NavBackStack` per top-level route plus the active `topLevelRoute`) and a `Navigator` wrapping it; (4) replace all `NavController` call sites per the table above; (5) convert the `NavGraphBuilder` DSL to `entryProvider`/`entry`, dropping nested `navigation<T>` graphs; (6) swap `NavHost` for `NavDisplay`; (7) remove Navigation 2 dependencies and imports.
- Migrate string-based routes to strongly-typed (`@Serializable`) routes *before* starting this migration if the app hasn't already.
- Supported out of the box: composable destinations, dialog destinations (via `DialogSceneStrategy`). Bottom sheets, Hilt-based modularized navigation, `ViewModel` arguments, and result-passing between screens require following a recipe rather than being built-in.
- Not supported by this migration path: multiple levels of nested navigation, destinations shared across more than one back stack, custom destination types, and deep links.
- Runnable end-to-end samples for this migration and related recipes live in the [android/nav3-recipes](https://github.com/android/nav3-recipes) repository.
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) migration guide — Navigation 2 here refers to Navigation Compose (`androidx.navigation.compose`), not any other framework's routing API.

## Related

- [Navigation 3](./navigation-3.md)
- [NavKey](./navkey.md)
- [entryProvider / entry](./entryprovider.md)
- [NavDisplay](./navdisplay.md)
- [DialogSceneStrategy](./dialogscenestrategy.md)
