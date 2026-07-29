# SceneDecoratorStrategy

Decorates a `Scene` already produced by a `SceneStrategy`, in a second pass run by `NavDisplay` after `sceneStrategies` has calculated one. Use it to attach behavior shared across many/all `Scene`s (e.g. a shared bottom bar, a `CompositionLocal`) without each `SceneStrategy` implementation having to add it itself.

## Signature / Usage

```kotlin
@Immutable
public class SceneDecoratorStrategyScope<T : Any>
internal constructor(onBack: () -> Unit) : SceneStrategyScope<T>(onBack) {
    public constructor() : this(onBack = {})
}

public fun interface SceneDecoratorStrategy<T : Any> {
    public fun SceneDecoratorStrategyScope<T>.decorateScene(scene: Scene<T>): Scene<T>
}
```

```kotlin
class BottomNavSceneDecoratorStrategy<T : Any> : SceneDecoratorStrategy<T> {
    override fun SceneDecoratorStrategyScope<T>.decorateScene(scene: Scene<T>): Scene<T> {
        if (!scene.entries.last().metadata.containsKey(ShowBottomNavKey)) return scene
        return object : Scene<T> by scene {
            override val content: @Composable () -> Unit = {
                Column {
                    Box(Modifier.weight(1f)) { scene.content() }
                    BottomNavBar()
                }
            }
        }
    }
}

NavDisplay(
    backStack = backStack,
    sceneStrategies = listOf(rememberListDetailSceneStrategy()),
    sceneDecoratorStrategies = listOf(BottomNavSceneDecoratorStrategy()),
    entryProvider = entryProvider { /* ... */ },
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `decorateScene(scene)` | `SceneDecoratorStrategyScope<T>.(Scene<T>) -> Scene<T>` | Returns a `Scene` wrapping (or passing through unchanged) the given `scene`. |

## Notes

- `NavDisplay`'s `sceneDecoratorStrategies` are applied in list order after `sceneStrategies` resolves a `Scene`; each decorator's output becomes the next decorator's input.
- Does not apply to `OverlayScene`s (e.g. the `Scene` produced by `DialogSceneStrategy`) — overlay content animates in a separate window and is intentionally excluded from decoration.
- Custom decorated `Scene`s should copy `entries`, `previousEntries`, `metadata`, and `key` from the wrapped `scene` (directly or via Kotlin interface delegation, `by scene`) unless a property is deliberately being overridden.
- Distinct from `NavEntryDecorator`, which wraps every individual `NavEntry`'s content; `SceneDecoratorStrategy` operates one level up, on the whole `Scene` a `SceneStrategy` already assembled from one or more entries.
- Package: `androidx.navigation3.scene` (module `androidx.navigation3:navigation3-ui`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [Scene](./scene.md)
- [SceneStrategy](./scenestrategy.md)
- [DialogSceneStrategy](./dialogscenestrategy.md)
- [NavEntryDecorator](./naventrydecorator.md)
- [NavDisplay](./navdisplay.md)
