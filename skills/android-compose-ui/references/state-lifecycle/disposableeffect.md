# DisposableEffect

A side effect of composition that requires cleanup, run when the given keys change or when the composable leaves the Composition. Must end its block with an `onDispose` clause.

## Signature / Usage

```kotlin
@Composable
fun DisposableEffect(key1: Any?, effect: DisposableEffectScope.() -> DisposableEffectResult)

@Composable
fun DisposableEffect(key1: Any?, key2: Any?, effect: DisposableEffectScope.() -> DisposableEffectResult)

@Composable
fun DisposableEffect(key1: Any?, key2: Any?, key3: Any?, effect: DisposableEffectScope.() -> DisposableEffectResult)

@Composable
fun DisposableEffect(vararg keys: Any?, effect: DisposableEffectScope.() -> DisposableEffectResult)
```

```kotlin
DisposableEffect(lifecycleOwner) {
    val observer = LifecycleEventObserver { _, event ->
        if (event == Lifecycle.Event.ON_START) currentOnStart()
        else if (event == Lifecycle.Event.ON_STOP) currentOnStop()
    }
    lifecycleOwner.lifecycle.addObserver(observer)

    onDispose {
        lifecycleOwner.lifecycle.removeObserver(observer)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `key1`, `key2`, `key3`, `keys` | `Any?` | — | When any key changes, the previous effect is disposed (`onDispose` runs) and `effect` runs again. |
| `effect` | `DisposableEffectScope.() -> DisposableEffectResult` | — | Must call `onDispose { ... }` as its last statement; the returned `DisposableEffectResult` runs the cleanup. |

## Notes

- Calling `DisposableEffect` with no keys at all is a compile error, same reasoning as `LaunchedEffect`.
- Use for registering/unregistering listeners, observers, or callbacks tied to the Composition lifecycle.
- Package: `androidx.compose.runtime`.

## Related

- [LaunchedEffect](./launchedeffect.md)
- [SideEffect](./sideeffect.md)
