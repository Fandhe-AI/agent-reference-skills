# rememberUpdatedState

Remembers a `mutableStateOf(newValue)` and updates its value to `newValue` on every recomposition, without restarting effects that captured a reference to it.

## Signature / Usage

```kotlin
@Composable
fun <T> rememberUpdatedState(newValue: T): State<T>
```

```kotlin
@Composable
fun LandingScreen(onTimeout: () -> Unit) {
    val currentOnTimeout by rememberUpdatedState(onTimeout)

    LaunchedEffect(true) {
        delay(SplashWaitTimeMillis)
        currentOnTimeout()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `newValue` | `T` | — | Latest value (often a lambda) to keep up to date without triggering an effect restart. |

## Notes

- Use when an effect (typically [LaunchedEffect](./launchedeffect.md)) has a long-lived operation that shouldn't restart just because a captured lambda/value changed identity between recompositions.
- Package: `androidx.compose.runtime`.

## Related

- [LaunchedEffect](./launchedeffect.md)
- [DisposableEffect](./disposableeffect.md)
