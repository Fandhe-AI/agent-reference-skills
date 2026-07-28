# IdlingResource / IdlingRegistry / CountingIdlingResource

Mechanism for synchronizing Espresso with asynchronous work (background threads, network calls, database access) that Espresso's built-in `MessageQueue`/`AsyncTask` synchronization does not cover, so tests don't need `Thread.sleep()` or retry loops.

## Signature / Usage

```kotlin
interface IdlingResource {
    fun getName(): String
    fun isIdleNow(): Boolean
    fun registerIdleTransitionCallback(callback: IdlingResource.ResourceCallback)
}
```

```kotlin
val idlingResource = CountingIdlingResource("NetworkCall")

// In production code
idlingResource.increment()
// ... async work ...
idlingResource.decrement()

// In test setup/teardown
@Before
fun setUp() {
    IdlingRegistry.getInstance().register(idlingResource)
}

@After
fun tearDown() {
    IdlingRegistry.getInstance().unregister(idlingResource)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isIdleNow()` | `() -> Boolean` | Returns whether the resource is currently idle. Called repeatedly by Espresso. |
| `getName()` | `() -> String` | Identifier for the resource, useful for debugging timeouts. |
| `IdlingRegistry.register(resource)` | `(IdlingResource) -> Unit` | Registers an idling resource; the only supported registration method. |
| `IdlingRegistry.unregister(resource)` | `(IdlingResource) -> Unit` | Unregisters a previously registered resource. |
| `CountingIdlingResource(name)` | constructor | Built-in implementation; idle when its internal counter reaches zero via `increment()`/`decrement()`. |
| `UriIdlingResource` | class | Like `CountingIdlingResource`, but waits for the counter to stay at zero for a configured period (handles consecutive requests). |
| `IdlingThreadPoolExecutor` / `IdlingScheduledThreadPoolExecutor` | class | `ThreadPoolExecutor`/`ScheduledThreadPoolExecutor` variants that track running tasks via a `CountingIdlingResource`. |

## Notes

- Call `callback.onTransitionToIdle()` only from the point where the async work completes — never from inside `isIdleNow()` itself.
- Keep idling resource logic in production code; register/unregister only in test `@Before`/`@After`.
- Do not hold `View` references inside an `IdlingResource`, and avoid adding test-only delays as a substitute.
- Artifact: `androidx.test.espresso:espresso-idling-resource`.

## Related

- [Espresso.onView](./onview.md)
