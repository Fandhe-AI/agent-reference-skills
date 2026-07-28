# Testing ViewModel

`ViewModel`s are tested as plain local unit tests: construct the `ViewModel` with fake dependencies, drive its public functions, and assert on its exposed state (`StateFlow`/`LiveData`).

## Signature / Usage

```kotlin
class HomeViewModelTest {
    @Test
    fun settingMainDispatcher() = runTest {
        val testDispatcher = UnconfinedTestDispatcher(testScheduler)
        Dispatchers.setMain(testDispatcher)
        try {
            val viewModel = HomeViewModel()
            viewModel.loadMessage()
            assertEquals("Greetings!", viewModel.message.value)
        } finally {
            Dispatchers.resetMain()
        }
    }
}
```

## Notes

- `viewModelScope` uses `Dispatchers.Main` internally, so `Dispatchers.setMain(testDispatcher)` (or a `MainDispatcherRule`) must be installed before constructing/exercising the `ViewModel`, and reset afterward.
- Inject fake repositories/use cases via the `ViewModel`'s constructor (see [testable-design](./testable-design.md)) rather than letting it construct real dependencies.
- If the `ViewModel` exposes `LiveData` instead of `StateFlow`, add [InstantTaskExecutorRule](./instanttaskexecutorrule.md) so `setValue`/`postValue` execute synchronously in the local test.
- For `StateFlow` built with `stateIn`, keep a collector active (e.g. `backgroundScope.launch { viewModel.state.collect {} }`) before asserting `.value`; see [flow-testing](./flow-testing.md).
- `ViewModel` itself (construction, `viewModelScope`, lifecycle) is owned by the `android-architecture` skill; this page covers only how to test it.

## Related

- [coroutines-testing](./coroutines-testing.md)
- [flow-testing](./flow-testing.md)
- [instanttaskexecutorrule](./instanttaskexecutorrule.md)
- [testable-design](./testable-design.md)
