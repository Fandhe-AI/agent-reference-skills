# Testing WorkManager

Unit-testing individual workers with `TestWorkerBuilder` / `TestListenableWorkerBuilder`, and integration-testing full WorkManager behavior with `WorkManagerTestInitHelper`.

## Signature / Usage

```kotlin
// Unit test: TestWorkerBuilder for Worker (SleepWorker extends Worker)
import androidx.work.ListenableWorker.Result
import org.hamcrest.CoreMatchers.`is`
import org.hamcrest.MatcherAssert.assertThat

val worker = TestWorkerBuilder<SleepWorker>(
    context = context,
    executor = executor,
    inputData = workDataOf("SLEEP_DURATION" to 1000L),
).build()
val result = worker.doWork()
assertThat(result, `is`(Result.success()))
```

```kotlin
// Unit test: TestListenableWorkerBuilder for CoroutineWorker/RxWorker/ListenableWorker
// (SleepWorker extends CoroutineWorker); same imports as above
val worker = TestListenableWorkerBuilder<SleepWorker>(context).build()
runBlocking {
    val result = worker.doWork()
    assertThat(result, `is`(Result.success()))
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
| `TestListenableWorkerBuilder<W>(context)` | builder | — | Builds a `ListenableWorker`/`CoroutineWorker`/`RxWorker`/`Worker` instance for unit testing; relies on the worker's own threading logic rather than a supplied executor. Recommended for `CoroutineWorker` tests because the `work-testing` artifact uses `Dispatchers.Default` rather than the worker implementation's `CoroutineDispatcher`. |
| `WorkManagerTestInitHelper.initializeTestWorkManager(context, config)` | function | — | Initializes a test-mode `WorkManager` for instrumentation tests. |
| `SynchronousExecutor` | class | — | Executes work synchronously, avoiding manual thread/lock/latch coordination in tests. |
| `WorkManagerTestInitHelper.getTestDriver(context)` | `(Context) -> TestDriver?` | — | Returns a `TestDriver` for simulating constraint/delay/period completion. The no-arg `getTestDriver()` is `@Deprecated`. |
| `WorkManagerTestInitHelper.ExecutorsMode` | enum | — | `LEGACY_OVERRIDE_WITH_SYNCHRONOUS_EXECUTORS`, `PRESERVE_EXECUTORS`, `USE_TIME_BASED_SCHEDULING`; accepted by the `initializeTestWorkManager` overloads. |
| `TestListenableWorkerBuilder.build(Class<out ListenableWorker>)` | `(Class) -> W` | — | Since 2.11.0-alpha01. Builds the worker with a worker class different from the one being built, e.g. for a custom `WorkerFactory`. |
| `TestDriver.stopRunningWorkWithReason(id, reason)` | `(UUID, @StopReason Int) -> Unit` | — | Default method added in 2.11.0-beta01. Stops running work with the given stop reason. |
| `TestDriver.setInitialDelayMet(workId)` | `(UUID) -> Unit` | — | Marks a request's initial delay as satisfied. |
| `TestDriver.setAllConstraintsMet(workId)` | `(UUID) -> Unit` | — | Marks a request's constraints as satisfied. |
| `TestDriver.setPeriodDelayMet(workId)` | `(UUID) -> Unit` | — | Marks a periodic request's interval as elapsed. |

## Notes

- Distinct from the same-named page in the `android-data` skill's `room` category, which covers Room database testing, not WorkManager worker testing.
- The two unit-test snippets split the official per-section test classes into separate blocks and add the imports the official examples omit (`androidx.work.ListenableWorker.Result`, Hamcrest `assertThat` / `is`); without the import, `Result` resolves to `kotlin.Result`.
- Add the dependency: `androidTestImplementation "androidx.work:work-testing:$work_version"`.
- `TestWorkerBuilder` and `TestListenableWorkerBuilder` let you test worker business logic without initializing WorkManager via `WorkManagerTestInitHelper`.
- Integration tests run against a real (test) database rather than mocks.
- Package: `androidx.work.testing`.

## Related

- [Worker / ListenableWorker / Result](./worker.md)
- [CoroutineWorker](./coroutineworker.md)
- [WorkInfo and monitoring](./workinfo.md)
