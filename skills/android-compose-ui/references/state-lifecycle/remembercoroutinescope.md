# rememberCoroutineScope

Returns a `CoroutineScope` bound to the point in the Composition where it is called, for launching coroutines in event handlers (outside a composable's direct execution). The scope is cancelled when the call site leaves the Composition.

## Signature / Usage

```kotlin
@Composable
inline fun rememberCoroutineScope(
    crossinline getContext: @DisallowComposableCalls () -> CoroutineContext = { EmptyCoroutineContext },
): CoroutineScope
```

```kotlin
@Composable
fun MoviesScreen(snackbarHostState: SnackbarHostState) {
    val scope = rememberCoroutineScope()

    Button(onClick = {
        scope.launch {
            snackbarHostState.showSnackbar("Something happened!")
        }
    }) {
        Text("Press me")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getContext` | `@DisallowComposableCalls () -> CoroutineContext` | `{ EmptyCoroutineContext }` | Extra `CoroutineContext` merged into the scope, computed once. |

## Notes

- Use for coroutines launched imperatively in callbacks (click handlers, etc.); use [LaunchedEffect](./launchedeffect.md) for coroutines that should run automatically as part of composition.
- Package: `androidx.compose.runtime`.

## Related

- [LaunchedEffect](./launchedeffect.md)
