# NavDisplay.TransitionKey / PopTransitionKey / PredictivePopTransitionKey

Per-entry metadata keys that override `NavDisplay`'s global `transitionSpec` / `popTransitionSpec` / `predictivePopTransitionSpec` for a single destination.

## Signature / Usage

```kotlin
public object TransitionKey :
    NavMetadataKey<AnimatedContentTransitionScope<Scene<*>>.() -> ContentTransform>

public object PopTransitionKey :
    NavMetadataKey<AnimatedContentTransitionScope<Scene<*>>.() -> ContentTransform>

public object PredictivePopTransitionKey :
    NavMetadataKey<
        AnimatedContentTransitionScope<Scene<*>>.(
            @NavigationEvent.SwipeEdge Int
        ) -> ContentTransform?
    >
```

```kotlin
entry<ScreenC>(
    metadata = metadata {
        put(NavDisplay.TransitionKey) {
            slideInVertically(initialOffsetY = { it }, animationSpec = tween(1000)) togetherWith
                ExitTransition.KeepUntilTransitionsFinished
        }
        put(NavDisplay.PopTransitionKey) {
            EnterTransition.None togetherWith
                slideOutVertically(targetOffsetY = { it }, animationSpec = tween(1000))
        }
        put(NavDisplay.PredictivePopTransitionKey) {
            EnterTransition.None togetherWith
                slideOutVertically(targetOffsetY = { it }, animationSpec = tween(1000))
        }
    }
) {
    ContentGreen("This is Screen C")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `NavDisplay.TransitionKey` | `NavMetadataKey<AnimatedContentTransitionScope<Scene<*>>.() -> ContentTransform>` | Overrides `NavDisplay.transitionSpec` for entries carrying this metadata (forward navigation). |
| `NavDisplay.PopTransitionKey` | `NavMetadataKey<AnimatedContentTransitionScope<Scene<*>>.() -> ContentTransform>` | Overrides `NavDisplay.popTransitionSpec` (back navigation). |
| `NavDisplay.PredictivePopTransitionKey` | `NavMetadataKey<AnimatedContentTransitionScope<Scene<*>>.(Int) -> ContentTransform?>` | Overrides `NavDisplay.predictivePopTransitionSpec` (predictive back gesture); receives the swipe edge. |

## Notes

- Animation is driven by `ContentTransform` (`androidx.compose.animation`), triggered when the key derived from the current `Scene`'s class and `key` property changes.
- For apps with custom multi-`Scene` layouts, wrap `NavDisplay` in `SharedTransitionLayout` and pass it via `NavDisplay`'s `sharedTransitionScope` parameter so an entry displayed in at most one `Scene` at a time animates smoothly across `Scene` changes.
- Package: `androidx.navigation3.ui` (module `androidx.navigation3:navigation3-ui`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [NavDisplay](./navdisplay.md)
- [NavEntry](./naventry.md)
- `../back-navigation/predictive-back-animations.md`
