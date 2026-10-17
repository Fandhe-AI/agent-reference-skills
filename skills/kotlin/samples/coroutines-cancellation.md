---
source: https://kotlinlang.org/docs/coroutines-cancellation.html
---

# Coroutines: Cancellation

Cancel a coroutine through its `Job` and propagate cancellation to its children.

```kotlin
import kotlinx.coroutines.*

suspend fun main() {
withContext(Dispatchers.Default) {
    // Used as a signal that the coroutine has started running
    val childStarted = CompletableDeferred<Unit>()
    
    val childJob: Job = launch {
        println("The coroutine has started")

        // Completes the CompletableDeferred,
        // signaling that the coroutine has started running
        childStarted.complete(Unit)
        try {
            // Suspends indefinitely
            // This call will never return unless the coroutine is canceled
            awaitCancellation()
        } catch (e: CancellationException) {
            println("The coroutine was canceled: $e")
          
            // Always rethrow cancellation exceptions!
            throw e
        }
        println("This line will never be executed")
    }
  
    // Waits for the coroutine to start before canceling it
    childStarted.await()

    // Cancels the coroutine,
    // so awaitCancellation() throws a CancellationException
    childJob.cancel()
}
// Coroutine builders such as withContext() or coroutineScope()
// wait for all child coroutines to complete,
// even when the children are canceled
println("All coroutines have completed")
}
```

Make coroutines that do not suspend cooperative with `yield()`:

```kotlin
import kotlinx.coroutines.*

fun main() {
// runBlocking uses the current thread for running all coroutines
runBlocking {
    val coroutineCount = 5
    repeat(coroutineCount) { coroutineIndex ->
        launch {
            val id = coroutineIndex + 1
            repeat(5) { iterationIndex ->
                val iteration = iterationIndex + 1
                // Suspends temporarily to give other coroutines a chance to run
                // Without this, the coroutines run sequentially
                yield()
                // Prints the coroutine index and iteration index
                println("$id * $iteration = ${id * iteration}")
            }
        }
    }
}
}
```

## Notes

- Cancellation is cooperative: a coroutine reacts only when it suspends in a cancellable suspending function or checks explicitly (`yield()`, `ensureActive()`, `isActive`).
- Catching `CancellationException` can break propagation; if you must catch it, rethrow it.
- `CompletableDeferred` in the first snippet only makes the example reproducible; it is not required to cancel a coroutine.
- Canceling a parent `Job` cancels all of its children (structured concurrency).
