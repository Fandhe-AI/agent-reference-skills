# State

A read-only value holder. Reading `value` during the execution of a `@Composable` function subscribes the current recompose scope to changes of that value.

## Signature / Usage

```kotlin
interface State<out T> {
    val value: T
}
```

```kotlin
val showButton: State<Boolean> = remember {
    derivedStateOf { listState.firstVisibleItemIndex > 0 }
}
```

## Notes

- This is the Jetpack Compose (Kotlin, `androidx.compose.runtime`) API — distinct from the same-named SwiftUI / Ark UI / Chakra UI / fandhe-frontend API.
- Returned by [derivedStateOf](./derivedstateof.md), [produceState](./producestate.md), [collectAsState](./collectasstate.md), [rememberUpdatedState](./rememberupdatedstate.md), and as the supertype of [MutableState](./mutablestate.md).
- Package: `androidx.compose.runtime`.

## Related

- [MutableState](./mutablestate.md)
- [derivedStateOf](./derivedstateof.md)
