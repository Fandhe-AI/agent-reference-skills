# DialogSceneStrategy / OverlayScene

`DialogSceneStrategy` is a built-in `SceneStrategy` that renders an entry marked with `DialogSceneStrategy.dialog()` metadata inside a Compose `Dialog`. It produces a `DialogScene`, which implements `OverlayScene` — the `Scene` subtype for content that renders in a separate window (dialog, popup, bottom sheet) above the `Scene`s calculated from the entries underneath it.

## Signature / Usage

```kotlin
public class DialogSceneStrategy<T : Any>() : SceneStrategy<T> {
    public override fun SceneStrategyScope<T>.calculateScene(entries: List<NavEntry<T>>): Scene<T>?

    public companion object {
        public object DialogKey : NavMetadataKey<DialogProperties>

        public fun dialog(
            dialogProperties: DialogProperties = DialogProperties()
        ): Map<String, Any>
    }
}

public interface OverlayScene<T : Any> : Scene<T> {
    public val overlaidEntries: List<NavEntry<T>>
    public suspend fun onRemove() {}
}
```

```kotlin
val entryProvider = entryProvider<NavKey> {
    entry<RouteD>(metadata = DialogSceneStrategy.dialog()) {
        ScreenD()
    }
}

NavDisplay(
    backStack = backStack,
    // DialogSceneStrategy must precede non-overlay strategies so it gets first refusal.
    sceneStrategies = listOf(DialogSceneStrategy(), rememberListDetailSceneStrategy()),
    entryProvider = entryProvider,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `DialogSceneStrategy.dialog(dialogProperties)` | `(DialogProperties) -> Map<String, Any>` | `DialogProperties()` | Metadata factory; pass to an `entry`'s `metadata` to mark it for display inside a `Dialog`. |
| `OverlayScene.overlaidEntries` | `List<NavEntry<T>>` | — | The entries handled by the `Scene` sitting below this overlay; must be non-empty so content remains visible underneath. |
| `OverlayScene.onRemove()` | `suspend () -> Unit` | no-op | Called after the entry is popped from the back stack but before it leaves composition; run exit animations here so they complete first. |

## Notes

- Only the last entry in the list can become a `DialogScene`; `DialogSceneStrategy` reads `DialogSceneStrategy.DialogKey` off its metadata via `NavEntry.metadata`.
- `NavDisplay` does not apply `SceneDecoratorStrategy` decoration to `OverlayScene`s — they animate separately from non-overlay scenes since their content renders in a separate window.
- Implement `equals`/`hashCode` on any custom `OverlayScene` (or make it a `data class`) so `NavDisplay` can correctly key overlay lifecycles and exit animations across recompositions.
- Package: `androidx.navigation3.scene` (module `androidx.navigation3:navigation3-ui`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [Scene](./scene.md)
- [SceneStrategy](./scenestrategy.md)
- [SceneDecoratorStrategy](./scenedecoratorstrategy.md)
- [NavDisplay](./navdisplay.md)
