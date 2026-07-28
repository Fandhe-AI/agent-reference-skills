# Testing Kotlin Flow

Testing a `Flow` depends on whether it is input (replace the producer with a fake) or output (collect and assert emitted items), typically inside `runTest`.

## Signature / Usage

```kotlin
@Test
fun myRepositoryTestList() = runTest {
    val repository = MyFakeRepository()
    val messages = repository.observeChatMessages().toList()
    assertEquals(ALL_MESSAGES, messages)
}
```

## Notes

- `flow.first()` suspends until, and returns, the first emitted item; `flow.drop(n).first()` skips the first `n` items first.
- `flow.toList()` collects all emissions of a finite flow into a `List`; `flow.take(n).toList()` collects only the first `n`.
- `flow.single()` asserts exactly one emission; `flow.count()` (optionally with a predicate) counts emissions.
- For a never-completing flow (e.g. a `StateFlow` built with `stateIn`), collect it continuously in `backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) { flow.toList(values) }` and interleave assertions on `values` with emissions from the fake producer.
- For `StateFlow`, prefer asserting on the `.value` property rather than collecting all intermediate values, since `StateFlow` conflates emissions.
- `stateIn(SharingStarted.WhileSubscribed(...))` or `.Lazily` requires at least one active collector (e.g. via `backgroundScope`) in the test, or the flow never starts.
- The [Turbine](https://github.com/cashapp/turbine) library (third-party, not part of the Android SDK) offers a `flow.test { awaitItem() }` API as a more readable alternative to `toList()`/`first()`.

## Related

- [coroutines-testing](./coroutines-testing.md)
- [viewmodel-testing](./viewmodel-testing.md)
