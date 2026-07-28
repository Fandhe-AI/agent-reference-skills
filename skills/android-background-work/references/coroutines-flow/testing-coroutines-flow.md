# Testing Coroutines and Flow

Coroutine and Flow code is tested with `runTest` (a coroutine test builder from `kotlinx-coroutines-test`), `TestDispatcher` implementations for deterministic virtual time, and optionally the third-party Turbine library for ergonomic flow assertions.

## Signature / Usage

```kotlin
@Test
fun myRepositoryTest() = runTest {
    val repository = MyRepository(fakeSource1, fakeSource2)
    val firstItem = repository.counter.first()
    assertEquals(ITEM_1, firstItem)
}
```

```kotlin
// Continuous collection while interleaving actions/assertions
@Test
fun continuouslyCollect() = runTest {
    val values = mutableListOf<Int>()
    backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) {
        repository.scores().toList(values)
    }
    dataSource.emit(1)
    assertEquals(10, values[0])
}
```

```kotlin
// Turbine (third-party library)
@Test
fun usingTurbine() = runTest {
    repository.scores().test {
        dataSource.emit(1)
        assertEquals(10, awaitItem())
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `runTest { }` | test builder | — | Runs coroutine test code on a virtual-time `TestScheduler`, skipping real `delay()` waits. |
| `TestDispatcher` | `CoroutineDispatcher` | — | Substitute for `Dispatchers.IO`/`Default`/`Main` in tests; typically injected via constructor. |
| `UnconfinedTestDispatcher` | `TestDispatcher` | — | Eagerly launches coroutines, useful for continuously collecting a hot flow inside a test. |
| `backgroundScope` | `CoroutineScope` | — | `runTest`-provided scope whose coroutines are automatically cancelled when the test ends. |

## Notes

- Inject `CoroutineDispatcher`s into production classes (default value `Dispatchers.IO`/`Default`) so tests can pass a `TestDispatcher`.
- Use `backgroundScope.launch(...)` rather than `runTest`'s own scope for a flow collector that must run for the whole test, so it is auto-cancelled and does not hang the test.
- Testing a `StateFlow` built with `stateIn` requires at least one active collector (e.g. an empty `backgroundScope.launch { flow.collect {} }`) or the sharing coroutine never starts.
- Turbine is a third-party library, not part of `kotlinx.coroutines` — mentioned here only as the common Android testing pattern.

## Related

- [Flow basics](./flow-basics.md)
- [StateFlow](./stateflow.md)
