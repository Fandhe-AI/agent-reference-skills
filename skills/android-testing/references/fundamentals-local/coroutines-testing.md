# Testing Coroutines (kotlinx-coroutines-test)

`kotlinx-coroutines-test` provides `runTest` and `TestDispatcher` implementations to deterministically test suspending code by controlling virtual time.

## Signature / Usage

```kotlin
@Test
fun dataShouldBeHelloWorld() = runTest {
    val data = fetchData() // suspend fun with delay(1000L)
    assertEquals("Hello world", data)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `runTest { }` | coroutine builder | — | Primary test builder; runs the test body in a `TestScope`, auto-skipping delays. |
| `StandardTestDispatcher(scheduler)` | `TestDispatcher` | `runTest` default | Queues new coroutines on the scheduler; they run only when yielded to (`advanceUntilIdle()`, `advanceTimeBy()`, `runCurrent()`). |
| `UnconfinedTestDispatcher(scheduler)` | `TestDispatcher` | — | Starts new coroutines eagerly on the current thread; simpler but doesn't mirror production scheduling. |
| `Dispatchers.setMain(dispatcher)` / `Dispatchers.resetMain()` | function | — | Replaces the unavailable `Main` dispatcher in local tests; must be reset in `finally` or a `TestWatcher` rule. |
| `testScheduler` | `TestCoroutineScheduler` | shared per `runTest` | Pass to additional `TestDispatcher`s to share virtual time with the one `runTest` uses. |

## Notes

- Add via `testImplementation "org.jetbrains.kotlinx:kotlinx-coroutines-test:$coroutines_version"` (guide targets 1.6+).
- Inject `CoroutineDispatcher` / `CoroutineScope` into classes under test so `TestDispatcher`/`TestScope` can replace them.
- A reusable `MainDispatcherRule : TestWatcher` that calls `Dispatchers.setMain`/`resetMain` in `starting`/`finished` avoids repeating boilerplate per test class.
- Only one `TestCoroutineScheduler` should back all `TestDispatcher`s within a single test.

## Related

- [flow-testing](./flow-testing.md)
- [viewmodel-testing](./viewmodel-testing.md)
- [junit4-basics](./junit4-basics.md)
