# Composable Functions

The `@Composable` annotation marks a Kotlin function as part of Compose's declarative UI model: it converts data into UI by emitting other composables, never returns a value, and must be fast, idempotent, and free of side-effects.

## Signature / Usage

```kotlin
@Composable
fun Greeting(name: String) {
    Text("Hello $name")
}
```

## Notes

- Composable functions are stateless in the imperative sense — they hold no internal getters/setters; the caller supplies new arguments and the framework re-invokes the function to update the UI (see [Recomposition](./recomposition.md)).
- Full Kotlin control flow (`if`, loops, helper functions) is supported for dynamic content; a composable can call itself or other composables conditionally or in a loop.
- Never mutate shared state (properties, `ViewModel`s, local `var`s captured across recomposition) directly from a composable body — the framework may skip, reorder, or repeat the call. Compute derived values from parameters instead of mutating counters.
- Composable functions may run every frame during animation, may in principle run in any order or in parallel, and are expected to finish before their inputs change again (optimistic recomposition); if inputs change mid-execution, Compose cancels and restarts with the new inputs.
- Expensive/blocking work (e.g. reading `SharedPreferences`) should happen outside composition (background thread/coroutine) and be passed in as a parameter rather than performed inline.
- Package: `androidx.compose.runtime`.

## Related

- [Recomposition](./recomposition.md)
- [Phases of Compose](./phases.md)
