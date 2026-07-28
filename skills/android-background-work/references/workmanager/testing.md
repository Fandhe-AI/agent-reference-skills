# Testing WorkManager

Unit-testing individual workers with `TestWorkerBuilder` / `TestListenableWorkerBuilder`, and integration-testing full WorkManager behavior with `WorkManagerTestInitHelper`.

## Signature / Usage

```kotlin
// Unit test: TestWorkerBuilder for Worker
val worker = TestWorkerBuilder<SleepWorker>(
    context = context,
    executor = executor,
    inputData = workDataOf("SLEEP_DURATION" to 1000L),
).build()
val result = worker.doWork()

// Unit test: TestListenableWorkerBuilder for CoroutineWorker/RxWorker/ListenableWorker
val worker = TestListenableWorkerBuilder<SleepWorker>(context).build()
runBlocking {
    val result = worker.doWork()
}
```

```kotlin
// Integration test setup
@Before
fun setup() {
    val config = Configuration.Builder()
        .setMinimumLoggingLevel(Log.DEBUG)
        .setExecutor(SynchronousExecutor())
        .build()
    WorkManagerTestInitHelper.initializeTestWorkManager(context, config)
}

@Test
fun testSimpleEchoWorker() {
    val request = OneTimeWorkRequestBuilder<EchoWorker>()
        .setInputData(workDataOf(KEY_1 to 1))
        .build()

    val workManager = WorkManager.getInstance(applicationContext)
    workManager.enqueue(request).result.get()

    val workInfo = workManager.getWorkInfoById(request.id).get()
    assertThat(workInfo.state, `is`(WorkInfo.State.SUCCEEDED))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `TestWorkerBuilder<W>(context, executor, inputData?)` | builder | — | Builds a `Worker` instance for unit testing; lets you specify the background `Executor` explicitly. |
| `TestListenableWorkerBuilder<W>(context)` | builder | — | Builds a `ListenableWorker`/`CoroutineWorker`/`RxWorker`/`Worker` instance for unit testing; relies on the worker's own threading logic rather than a supplied executor. Recommended for `CoroutineWorker` since it uses `Dispatchers.Default` rather than the worker's own dispatcher. |
| `WorkManagerTestInitHelper.initializeTestWorkManager(context, config)` | function | — | Initializes a test-mode `WorkManager` for instrumentation tests. |
| `SynchronousExecutor` | class | — | Executes work synchronously, avoiding manual thread/lock/latch coordination in tests. |
| `WorkManagerTestInitHelper.getTestDriver()` | `() -> TestDriver` | — | Returns a `TestDriver` for simulating constraint/delay/period completion. |
| `TestDriver.setInitialDelayMet(workId)` | `(UUID) -> Unit` | — | Marks a request's initial delay as satisfied. |
| `TestDriver.setAllConstraintsMet(workId)` | `(UUID) -> Unit` | — | Marks a request's constraints as satisfied. |
| `TestDriver.setPeriodDelayMet(workId)` | `(UUID) -> Unit` | — | Marks a periodic request's interval as elapsed. |

## Notes

- Distinct from the same-named page in the `android-data` skill's `room` category, which covers Room database testing, not WorkManager worker testing.
- Add the dependency: `androidTestImplementation "androidx.work:work-testing:$work_version"`.
- `TestWorkerBuilder` and `TestListenableWorkerBuilder` let you test worker business logic without initializing WorkManager via `WorkManagerTestInitHelper`.
- Integration tests run against a real (test) database rather than mocks.
- Package: `androidx.work.testing`.

## Related

- [Worker / ListenableWorker / Result](./worker.md)
- [CoroutineWorker](./coroutineworker.md)
- [WorkInfo and monitoring](./workinfo.md)
