# SceneStrategy

Determines how a list of back-stack `NavEntry`s should be arranged into a `Scene`. `NavDisplay` calls each configured `SceneStrategy` in order until one returns a non-null `Scene`.

## Signature / Usage

```kotlin
@Immutable
public fun interface SceneStrategy<T : Any> {
    public fun SceneStrategyScope<T>.calculateScene(entries: List<NavEntry<T>>): Scene<T>?
}
```

```kotlin
class ListDetailSceneStrategy<T : Any>(val windowSizeClass: WindowSizeClass) : SceneStrategy<T> {
    override fun SceneStrategyScope<T>.calculateScene(entries: List<NavEntry<T>>): Scene<T>? {
        if (!windowSizeClass.isWidthAtLeastBreakpoint(WIDTH_DP_MEDIUM_LOWER_BOUND)) return null
        val detailEntry = entries.lastOrNull()?.takeIf { it.metadata.contains(DetailKey) } ?: return null
        val listEntry = entries.findLast { it.metadata.contains(ListKey) } ?: return null
        return ListDetailScene(
            key = listEntry.contentKey,
            previousEntries = entries.dropLast(1),
            listEntry = listEntry,
            detailEntry = detailEntry,
        )
    }
}

NavDisplay(
    backStack = backStack,
    sceneStrategies = listOf(listDetailStrategy),
    entryProvider = entryProvider { /* ... */ },
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `calculateScene(entries)` | `SceneStrategyScope<T>.(List<NavEntry<T>>) -> Scene<T>?` | Returns a `Scene` claiming responsibility for rendering some/all of `entries`, or `null` to defer to the next strategy in `NavDisplay`'s `sceneStrategies` list. |

## Notes

- `NavDisplay` tries `sceneStrategies` in list order and falls back to `SinglePaneSceneStrategy` if none produce a `Scene`.
- Custom strategies commonly key off `NavEntry.metadata` (e.g. pane assignment) and window size (`WindowSizeClass`) to decide whether/how to combine entries into a multi-pane `Scene`.
- Package: `androidx.navigation3.scene` (module `androidx.navigation3:navigation3-ui`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [Scene](./scene.md)
- [SinglePaneSceneStrategy](./singlepanescenestrategy.md)
- [ListDetailSceneStrategy](./listdetailscenestrategy.md)
- [SupportingPaneSceneStrategy](./supportingpanescenestrategy.md)
