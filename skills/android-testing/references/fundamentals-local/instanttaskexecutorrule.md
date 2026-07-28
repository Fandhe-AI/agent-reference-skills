# InstantTaskExecutorRule

`InstantTaskExecutorRule` is a JUnit `TestRule` that swaps the Architecture Components background executor for one that runs tasks synchronously, so `LiveData` updates happen immediately in local unit tests.

## Signature / Usage

```kotlin
class MyLiveDataTest {
    @get:Rule
    val instantExecutorRule = InstantTaskExecutorRule()

    @Test
    fun liveData_updatesSynchronously() {
        val liveData = MutableLiveData<String>()
        liveData.value = "Hello"
        assertEquals("Hello", liveData.value)
    }
}
```

## Notes

- Provided by `androidx.arch.core:core-testing` (`testImplementation "androidx.arch.core:core-testing:$arch_testing_version"`).
- Swaps the Architecture Components background `ArchTaskExecutor` delegate: while the rule is active, both disk I/O tasks and main-thread tasks run synchronously (`runnable.run()`) instead of being posted asynchronously, and `isMainThread()` reports `true`. The delegate is reset after the test.
- For host-side (local, `test/`) tests using Architecture Components (`LiveData`, `ViewModel`); not needed for `StateFlow`-only code.

## Related

- [viewmodel-testing](./viewmodel-testing.md)
- [junit4-basics](./junit4-basics.md)
