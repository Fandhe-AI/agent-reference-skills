# NavDisplay

Observes a Navigation 3 back stack and renders it, delegating layout to a list of `SceneStrategy`s and animating between `Scene`s with the `ContentTransform` API.

## Signature / Usage

```kotlin
@Composable
public fun <T : Any> NavDisplay(
    backStack: List<T>,
    modifier: Modifier = Modifier,
    contentAlignment: Alignment = Alignment.TopStart,
    onBack: () -> Unit = {
        if (backStack is MutableList<T>) {
            backStack.removeLastOrNull()
        }
    },
    entryDecorators: List<NavEntryDecorator<T>> =
        listOf(rememberSaveableStateHolderNavEntryDecorator()),
    sceneStrategies: List<SceneStrategy<T>> = listOf(SinglePaneSceneStrategy()),
    sceneDecoratorStrategies: List<SceneDecoratorStrategy<T>> = emptyList(),
    sharedTransitionScope: SharedTransitionScope? = null,
    sizeTransform: SizeTransform? = null,
    transitionSpec: AnimatedContentTransitionScope<Scene<T>>.() -> ContentTransform =
        defaultTransitionSpec(),
    popTransitionSpec: AnimatedContentTransitionScope<Scene<T>>.() -> ContentTransform =
        defaultPopTransitionSpec(),
    predictivePopTransitionSpec:
        AnimatedContentTransitionScope<Scene<T>>.(
            @NavigationEvent.SwipeEdge Int
        ) -> ContentTransform =
        defaultPredictivePopTransitionSpec(),
    entryProvider: (key: T) -> NavEntry<T>,
)
```

```kotlin
val backStack = rememberNavBackStack(Home)

NavDisplay(
    backStack = backStack,
    onBack = { backStack.removeLastOrNull() },
    entryProvider = entryProvider {
        entry<Home> { Text("Home") }
        entry<Product> { product -> Text("Product ${product.id}") }
    }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `backStack` | `List<T>` | — | Back stack to observe. Mutating it (e.g. `add`/`removeLastOrNull`) triggers navigation. |
| `modifier` | `Modifier` | `Modifier` | Applied to the display container. |
| `contentAlignment` | `Alignment` | `Alignment.TopStart` | Alignment of `Scene` content within the container. |
| `onBack` | `() -> Unit` | removes the last back stack item when it is a `MutableList` | Invoked on system/predictive back. |
| `entryDecorators` | `List<NavEntryDecorator<T>>` | `[rememberSaveableStateHolderNavEntryDecorator()]` | Decorators wrapping every `NavEntry`; add `rememberViewModelStoreNavEntryDecorator()` to scope ViewModels. |
| `sceneStrategies` | `List<SceneStrategy<T>>` | `[SinglePaneSceneStrategy()]` | Tried in order to compute the `Scene` to render; falls back to `SinglePaneSceneStrategy` if none match. |
| `sceneDecoratorStrategies` | `List<SceneDecoratorStrategy<T>>` | `emptyList()` | Optional strategies that further decorate the resolved `Scene`. |
| `sharedTransitionScope` | `SharedTransitionScope?` | `null` | Wrap in `SharedTransitionLayout` and pass `this` to animate shared elements/entries between `Scene`s. |
| `sizeTransform` | `SizeTransform?` | `null` | Animates size changes between `Scene`s. |
| `transitionSpec` | `AnimatedContentTransitionScope<Scene<T>>.() -> ContentTransform` | `defaultTransitionSpec()` | Animation for forward navigation. |
| `popTransitionSpec` | `AnimatedContentTransitionScope<Scene<T>>.() -> ContentTransform` | `defaultPopTransitionSpec()` | Animation for back navigation. |
| `predictivePopTransitionSpec` | `AnimatedContentTransitionScope<Scene<T>>.(Int) -> ContentTransform` | `defaultPredictivePopTransitionSpec()` | Animation for predictive-back gestures; receives the swipe edge. |
| `entryProvider` | `(key: T) -> NavEntry<T>` | — | Resolves each back stack key to a `NavEntry`; typically built with `entryProvider { ... }`. |

## Notes

- Per-entry animation overrides are set via `metadata`, using the keys `NavDisplay.TransitionKey`, `NavDisplay.PopTransitionKey`, and `NavDisplay.PredictivePopTransitionKey` — see [navdisplay-animation](./navdisplay-animation.md).
- If no `SceneStrategy` returns a non-null `Scene`, `NavDisplay` falls back to `SinglePaneSceneStrategy`.
- Destination lifecycle: `NavDisplay` uses custom `LifecycleOwner`s to cap each `NavEntry`'s lifecycle from Scene-level and Entry-level constraints.
  - Scene-level, non-overlay scenes: `RESUMED` only when the scene transition has settled and no overlay scene is displayed on top; otherwise capped at `STARTED` (during navigation forward/back, or when covered by an overlay).
  - Scene-level, overlay scenes (dialogs, bottom sheets): `RESUMED` only for the topmost active overlay; underlying overlays covered by a newer overlay are capped at `STARTED`.
  - Entry-level: an entry present in the current back stack may reach `RESUMED` (subject to the scene cap); an entry no longer in the back stack (popped but still animating out) is capped at `CREATED`, so exiting entries stop work bound to `RESUMED`/`STARTED`.

| Scenario | Scene-Level Cap | Entry-Level Cap | Effective Cap |
| --- | --- | --- | --- |
| Active entry, settled screen (no transitions or overlays) | `RESUMED` | `RESUMED` | `RESUMED` |
| Active entry, during transition (navigating to or from) | `STARTED` | `RESUMED` | `STARTED` |
| Active entry, covered by an overlay (for example, a Dialog is open) | `STARTED` | `RESUMED` | `STARTED` |
| Popped entry, animating out | `STARTED` or `RESUMED` | `CREATED` | `CREATED` |

- 1.2.0 improved predictive back transitions, including predictive back gestures triggered mid-flight during forward animations.
- Package: `androidx.navigation3.ui` (module `androidx.navigation3:navigation3-ui`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [NavEntry](./naventry.md)
- [entryProvider / entry](./entryprovider.md)
- [NavEntryDecorator](./naventrydecorator.md)
- [SceneStrategy](./scenestrategy.md)
- [navdisplay-animation](./navdisplay-animation.md)
