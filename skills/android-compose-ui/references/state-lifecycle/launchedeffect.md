# LaunchedEffect

Runs a suspend function scoped to the Composition. Launches a coroutine when it enters the Composition and cancels it when it leaves, or restarts it whenever one of the given keys changes.

## Signature / Usage

```kotlin
@Composable
fun LaunchedEffect(key1: Any?, block: suspend CoroutineScope.() -> Unit)

@Composable
fun LaunchedEffect(key1: Any?, key2: Any?, block: suspend CoroutineScope.() -> Unit)

@Composable
fun LaunchedEffect(key1: Any?, key2: Any?, key3: Any?, block: suspend CoroutineScope.() -> Unit)

@Composable
fun LaunchedEffect(vararg keys: Any?, block: suspend CoroutineScope.() -> Unit)
```

```kotlin
var pulseRateMs by remember { mutableLongStateOf(3000L) }
val alpha = remember { Animatable(1f) }

LaunchedEffect(pulseRateMs) { // Restart the effect when the pulse rate changes
    while (isActive) {
        delay(pulseRateMs)
        alpha.animateTo(0f)
        alpha.animateTo(1f)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `key1`, `key2`, `key3`, `keys` | `Any?` | — | When any key does not compare equal (`==`) to the previous composition, the running coroutine is cancelled and `block` is relaunched. |
| `block` | `suspend CoroutineScope.() -> Unit` | — | Suspend code to run in the composition's `CoroutineContext`. |

## Notes

- Calling `LaunchedEffect` with no keys at all is a compile error — at least one key (often a constant like `Unit` or `true` to run once) is required, to make restart behavior explicit.
- Package: `androidx.compose.runtime`.

## Related

- [rememberCoroutineScope](./remembercoroutinescope.md)
- [rememberUpdatedState](./rememberupdatedstate.md)
- [DisposableEffect](./disposableeffect.md)
