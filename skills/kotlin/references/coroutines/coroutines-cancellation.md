---
source: https://kotlinlang.org/docs/coroutines-cancellation.html
---

# Cancellation and timeouts

Cancellation requests a coroutine to stop before it completes. It works through the `Job` handle and propagates to children under structured concurrency. Coroutine cancellation is cooperative.

## Signature / Usage

```kotlin
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

### API summary

| API | Behavior |
|-----|----------|
| `Job.cancel()` | Cancels the coroutine; builders such as `.launch()` return a `Job`, `.async()` returns a `Deferred` which implements `Job` |
| `awaitCancellation()` | Suspends until canceled; equivalent to `delay(Duration.INFINITE)` |
| `CancellationException` | Thrown the next time the coroutine checks for cancellation |
| `yield()` | Releases the thread, gives other coroutines a chance, and throws `CancellationException` if canceled |
| `isActive` | Property; `false` when the coroutine is canceled |
| `ensureActive()` | Throws `CancellationException` when the coroutine is canceled |
| `runInterruptible()` | Interrupts the thread running blocking code (such as `Thread.sleep()`) when the coroutine is canceled |
| `NonCancellable` | Pass to `withContext()` to run a block that cancellation does not affect |
| `withTimeoutOrNull()` | Cancels after a `Duration`; returns `null` on timeout |

### Cancellation propagation

Canceling a coroutine also cancels all of its children.

```kotlin
// Launches two child coroutines
val parentJob = launch {
    launch {
        println("Child coroutine 1 has started running")
        try {
            awaitCancellation()
        } finally {
            println("Child coroutine 1 has been canceled")
        }
    }
    launch {
        println("Child coroutine 2 has started running")
        try {
            awaitCancellation()
        } finally {
            println("Child coroutine 2 has been canceled")
        }
    }
    // Completes the CompletableDeferred,
    // signaling that the child coroutines have been launched
    childrenLaunched.complete(Unit)
}
// Waits for the parent coroutine to signal that it has launched
// all of its children
childrenLaunched.await()

// Cancels the parent coroutine, which cancels all its children
parentJob.cancel()
```

### Suspension points and cancellation

A canceled coroutine continues until a suspension point. If it suspends there, the suspending function checks for cancellation and throws `CancellationException`. A call to a `suspend` function is a suspension point but does not always suspend (awaiting a completed `Deferred` does not suspend). All suspending functions in `kotlinx.coroutines` cooperate with cancellation because they use `suspendCancellableCoroutine()` internally; custom suspending functions that use `suspendCoroutine()` do not react to cancellation.

### yield()

```kotlin
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
```

### Interrupt blocking code

```kotlin
val childJob = launch {
    try {
        // Cancellation triggers a thread interruption
        runInterruptible {
            childStarted.complete(Unit)
            try {
                // Blocks the current thread for a very long time
                Thread.sleep(Long.MAX_VALUE)
            } catch (e: InterruptedException) {
                println("Thread interrupted (Java): $e")
                throw e
            }
        }
    } catch (e: CancellationException) {
        println("Coroutine canceled (Kotlin): $e")
        throw e
    }
}
```

### Prompt cancellation and safe cleanup

A suspended coroutine that is canceled resumes with `CancellationException` instead of returning values, even if the values are already available (prompt cancellation). `withContext()` checks for cancellation before entering the block and after the block returns. To avoid losing a resource received just before cancellation, keep cleanup in a place guaranteed to run:

```kotlin
scope.launch {
    // Stores the reader in a variable, so the finally block can close it
    var reader: BufferedReader? = null
    
    try {
        withContext(Dispatchers.IO) {
            reader = Files.newBufferedReader(
                path, Charset.forName("US-ASCII")
            )
        }
        // Uses the stored reader after withContext() completes
        updateUi(reader!!)
    } finally {
        // Ensures the reader is closed even when the coroutine is canceled
        reader?.close()
    }
}
```

### Non-cancelable blocks

```kotlin
val childJob = launch {
    startService()
    try {
        awaitCancellation()
    } finally {
        withContext(NonCancellable) {
            // Without withContext(NonCancellable),
            // this function doesn't complete because the coroutine is canceled
            shutdownServiceAndWait()
        }
    }
}
```

### Timeout

```kotlin
val slow = withTimeoutOrNull(100.milliseconds) {
    slowOperation()
}
println("The slow operation finished with $slow")
```

## Notes

- Catching `CancellationException` can break cancellation propagation. If you must catch it, rethrow it.
- Avoid `NonCancellable` with builders like `.launch()` or `.async()`; it breaks the parent-child relationship and disrupts structured concurrency.
- A coroutine that does not suspend for a long time does not stop when canceled and blocks other coroutines on the same thread; call `yield()` periodically, or use `isActive` / `ensureActive()` when intentional.
- On the JVM, cancellation alone does not interrupt `Thread.sleep()` or `BlockingQueue.take()`; wrap them in `runInterruptible()`.

## Related

- [Coroutines basics](./coroutines-basics.md)
- [Coroutine exceptions handling](./exception-handling.md)
- [Coroutine context and dispatchers](./coroutine-context-and-dispatchers.md)
