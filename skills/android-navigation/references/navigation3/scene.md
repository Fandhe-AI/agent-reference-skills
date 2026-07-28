# Scene

The unit that renders one or more `NavEntry`s for a given back stack state. A `Scene` is identified by its `key` plus its own class; that identity change drives `NavDisplay`'s top-level animation.

## Signature / Usage

```kotlin
@Immutable
public interface Scene<T : Any> {
    public val key: Any
    public val entries: List<NavEntry<T>>
    public val previousEntries: List<NavEntry<T>>
    public val content: @Composable () -> Unit
    public val metadata: Map<String, Any>
        get() = entries.lastOrNull()?.metadata ?: emptyMap()
}
```

```kotlin
data class ListDetailScene<T : Any>(
    override val key: Any,
    override val previousEntries: List<NavEntry<T>>,
    val listEntry: NavEntry<T>,
    val detailEntry: NavEntry<T>,
) : Scene<T> {
    override val entries: List<NavEntry<T>> = listOf(listEntry, detailEntry)
    override val content: @Composable (() -> Unit) = {
        Row(modifier = Modifier.fillMaxSize()) {
            Column(Modifier.weight(0.4f)) { listEntry.Content() }
            Column(Modifier.weight(0.6f)) { detailEntry.Content() }
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `key` | `Any` | Uniquely identifies this `Scene` instance, combined with its class, for animation purposes. |
| `entries` | `List<NavEntry<T>>` | Entries this `Scene` is responsible for rendering; `content` should invoke each at most once concurrently. |
| `previousEntries` | `List<NavEntry<T>>` | Entries that would result from a "back" action; used for predictive back state. |
| `content` | `@Composable () -> Unit` | Renders `entries` and any surrounding layout UI. |
| `metadata` | `Map<String, Any>` | Scene-level information for other components; defaults to the last entry's `metadata`. |

## Notes

- If the same `NavEntry` appears in multiple `Scene`s during a transition, its content is only rendered by the most recent target `Scene`.
- Custom `Scene` implementations should be data classes, or otherwise correctly implement `equals`/`hashCode` (excluding callbacks) so the same `Scene` instance is reused across recompositions.
- Package: `androidx.navigation3.scene` (module `androidx.navigation3:navigation3-ui`).
- Distinct from `ListDetailPaneScaffold` / `NavigableListDetailPaneScaffold` / `ThreePaneScaffoldNavigator` (owned by `android-compose-ui`'s `adaptive-layout` category) — `ListDetailSceneStrategy` in this category builds a `Scene` on top of those Material adaptive primitives specifically for Navigation 3 back stacks.
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [SceneStrategy](./scenestrategy.md)
- [SinglePaneSceneStrategy](./singlepanescenestrategy.md)
- [ListDetailSceneStrategy](./listdetailscenestrategy.md)
