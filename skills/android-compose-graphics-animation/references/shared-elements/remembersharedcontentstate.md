# rememberSharedContentState / SharedContentState

Creates and remembers a `SharedContentState` that stores the unique key used to match a shared element or shared bounds across composable states.

## Signature / Usage

```kotlin
@Composable
fun SharedTransitionScope.rememberSharedContentState(key: Any): SharedContentState

@Composable
fun SharedTransitionScope.rememberSharedContentState(
    key: Any,
    config: SharedTransitionScope.SharedContentConfig,
): SharedContentState

class SharedContentState internal constructor(
    val key: Any,
    config: SharedContentConfig = SharedTransitionDefaults.SharedContentConfig,
) {
    val isMatchFound: Boolean
    val clipPathInOverlay: Path?
    val parentSharedContentState: SharedContentState?
    fun prepareTransitionWithInitialVelocity(initialVelocity: Velocity)
}
```

```kotlin
data class SnackSharedElementKey(
    val snackId: Long,
    val origin: String,
    val type: SnackSharedElementType
)

val contentState = rememberSharedContentState(
    key = SnackSharedElementKey(snackId = 1, origin = "latest", type = SnackSharedElementType.Image)
)
Box(
    modifier = Modifier.sharedElement(
        contentState,
        animatedVisibilityScope = this
    )
) {
    if (contentState.isMatchFound) {
        // A match was found - the animation is happening
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `Any` | — | Unique identifier used to match this element/bounds with its counterpart in the other state. Prefer a data class implementing `hashCode()`/`equals()` over a raw `String`. |
| `config` | `SharedContentConfig` | `SharedTransitionDefaults.SharedContentConfig` | Optional hook to dynamically enable/disable the shared transition for this element (`isEnabled`) and control behavior for in-flight animations. |
| `isMatchFound` | `Boolean` | — | (Property) Whether a counterpart with the same key currently exists, i.e. whether the transition is actually happening. |

## Notes

- `@ExperimentalSharedTransitionApi`.
- For items in a list, append a unique identifier to the key (e.g. item id) so each row gets a distinct match.
- `SharedContentConfig.isEnabled` can dynamically toggle whether a given element participates in the shared transition; `shouldKeepEnabledForOngoingAnimation` (default `true`) controls whether an already-running animation is allowed to finish after being disabled.
- Package: `androidx.compose.animation`.

## Related

- [Modifier.sharedElement](./sharedelement.md)
- [Modifier.sharedBounds](./sharedbounds.md)
- [SharedTransitionScope](./sharedtransitionscope.md)
