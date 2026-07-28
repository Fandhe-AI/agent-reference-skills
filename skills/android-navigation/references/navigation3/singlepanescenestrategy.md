# SinglePaneSceneStrategy

The default `SceneStrategy`: always produces a single-entry `Scene` displaying the last back stack entry. `NavDisplay` uses this automatically when no other configured strategy returns a `Scene`.

## Signature / Usage

```kotlin
public class SinglePaneSceneStrategy<T : Any> : SceneStrategy<T> {
    override fun SceneStrategyScope<T>.calculateScene(entries: List<NavEntry<T>>): Scene<T> {
        return SinglePaneScene(
            key = entries.last().contentKey,
            entry = entries.last(),
            previousEntries = entries.dropLast(1),
        )
    }
}
```

```kotlin
// NavDisplay's default sceneStrategies is already listOf(SinglePaneSceneStrategy())
NavDisplay(
    backStack = backStack,
    entryProvider = entryProvider { /* ... */ },
)
```

## Notes

- `SinglePaneScene` (its returned `Scene` type) is `internal`; construct `SinglePaneSceneStrategy` directly rather than the scene class.
- Because it always returns a non-null `Scene`, `SinglePaneSceneStrategy` should be placed last when combined with other strategies (or simply omitted — `NavDisplay` falls back to it automatically).
- Package: `androidx.navigation3.scene` (module `androidx.navigation3:navigation3-ui`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [SceneStrategy](./scenestrategy.md)
- [Scene](./scene.md)
- [ListDetailSceneStrategy](./listdetailscenestrategy.md)
