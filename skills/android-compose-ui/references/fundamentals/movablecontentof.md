# movableContentOf

Wraps a `@Composable` lambda so that when the returned lambda is called from a new location in the Composition, the remembered state and layout nodes created by a previous call are **moved** to that new location instead of being disposed and recreated.

## Signature / Usage

```kotlin
fun movableContentOf(content: @Composable () -> Unit): @Composable () -> Unit

fun <P> movableContentOf(content: @Composable (P) -> Unit): @Composable (P) -> Unit

fun <R> movableContentWithReceiverOf(content: @Composable R.() -> Unit): @Composable R.() -> Unit
```

```kotlin
val movableContent = remember {
    movableContentOf {
        // Content whose remembered state should survive moving between parents.
        ExpensiveWidget()
    }
}

if (isWide) {
    Row { movableContent() }
} else {
    Column { movableContent() }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `@Composable () -> Unit` (or with up to 4 parameters `P1..P4`) | — | The composable content whose remembered state/nodes should move rather than reset when its call site changes. |

## Notes

- Tracking compositions can produce a composable that moves its content between a `Row` and a `Column` based on a parameter, or ensure composition state tracks with a model as it moves in the layout.
- Must be created once with `remember { movableContentOf { ... } }` (`@RememberInComposition`); calling `movableContentOf` again on every recomposition defeats the purpose.
- `movableContentWithReceiverOf` is the receiver-scoped variant (e.g. for content defined with a scope receiver such as `RowScope`).
- Package: `androidx.compose.runtime`.

## Related

- [Composition and Recomposition](./recomposition.md)
