---
source: https://kotlinlang.org/docs/coroutines-overview.html
---

# Coroutines

Overview of Kotlin coroutines: lightweight, suspendable alternatives to threads, with most features provided by the kotlinx.coroutines library.

## Signature / Usage

```kotlin
// Suspending function: pauses and resumes without blocking a thread
suspend fun greet() {
    println("Hello world from a suspending function")
}
```

### Coroutine concepts

| Concept | Role |
|---------|------|
| `suspend` function | Pauses and resumes without blocking a thread |
| `launch()` / `async()` | Coroutine builders; extension functions on `CoroutineScope`, which defines the lifecycle and provides the coroutine context |
| `Job` | Tracks the coroutine's lifecycle and enables structured concurrency |
| `CoroutineDispatcher` | Controls where the coroutine runs (background thread, main thread in UI applications) |
| `CoroutineExceptionHandler` | Handles uncaught exceptions |
| `Flow` | Produces values only when a coroutine actively collects them |
| `Channel` | Multiple coroutines send and receive; each value is delivered to exactly one coroutine |
| `SharedFlow` | Continuously shares every value with all active collecting coroutines |
| `StateFlow` | Wraps shared data; update from one coroutine, collect the latest value from others |

## Notes

- Threads are managed by the operating system and are relatively heavy; coroutines can suspend without blocking system resources and suit fine-grained concurrency.
- Elements such as `Job`, dispatcher and `CoroutineExceptionHandler` make up the coroutine context, inherited by default from the parent. This hierarchy enables structured concurrency: related coroutines can be canceled together or handle exceptions as a group.
- Without coordination, shared mutable state leads to race conditions.
- Further reading named on the page: the Coroutines and channels tutorial, debugging coroutines and Flow with IntelliJ IDEA, the Guide to UI programming with coroutines, Android coroutines best practices, and the kotlinx.coroutines API reference at `kotlinlang.org/api/kotlinx.coroutines/`.

## Related

- [Coroutines basics](./coroutines-basics.md)
- [Coroutine context and dispatchers](./coroutine-context-and-dispatchers.md)
- [Cancellation and timeouts](./coroutines-cancellation.md)
- [Coroutine exceptions handling](./exception-handling.md)
- [Flows](./coroutines-flow.md)
- [Channels](./channels.md)
- [Coroutines guide](./coroutines-guide.md)
