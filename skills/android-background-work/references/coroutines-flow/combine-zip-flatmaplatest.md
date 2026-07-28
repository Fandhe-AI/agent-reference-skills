# combine, zip, flatMapLatest

`combine`, `zip`, and `flatMapLatest` are `Flow` operators for working with multiple flows or with flows-of-flows. `combine` recomputes on every emission from any source flow; `zip` pairs emissions one-to-one; `flatMapLatest` switches to a new inner flow whenever the upstream emits, cancelling the previous inner flow.

## Signature / Usage

```kotlin
fun <T1, T2, R> combine(
    flow1: Flow<T1>, flow2: Flow<T2>,
    transform: suspend (T1, T2) -> R
): Flow<R>

fun <T1, T2, R> zip(
    flow1: Flow<T1>, flow2: Flow<T2>,
    transform: suspend (T1, T2) -> R
): Flow<R>

fun <T, R> Flow<T>.flatMapLatest(transform: suspend (T) -> Flow<R>): Flow<R>
```

```kotlin
// combine: always reacts with the latest value from each flow
combine(nameFlow, ageFlow) { name, age -> "$name is $age" }
    .collect { println(it) }
```

```kotlin
// flatMapLatest: cancels the previous search when a new query arrives
searchQueryFlow
    .flatMapLatest { query -> searchRepository.search(query) }
    .collect { results -> showResults(results) }
```

## Notes

- `combine` emits whenever *any* input flow emits, using the latest value from each — suited to merging independent state sources (e.g. filters + data).
- `zip` waits for a value from *both* flows before emitting a pair, and only emits as many times as the shorter/slower flow allows.
- `flatMapLatest` is the standard operator for "only care about the latest request" patterns like search-as-you-type, cancelling in-flight inner flows automatically when a new upstream value arrives.

## Related

- [Flow operators](./flow-operators.md)
- [Flow basics](./flow-basics.md)
