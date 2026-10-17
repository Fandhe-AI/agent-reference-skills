---
source: https://kotlinlang.org/docs/exception-handling.html
---

# Coroutine exceptions handling

Exception propagation, `CoroutineExceptionHandler`, cancellation and exceptions, exception aggregation, and supervision (`SupervisorJob`, `supervisorScope`).

## Signature / Usage

```kotlin
@OptIn(DelicateCoroutinesApi::class)
fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { _, exception -> 
        println("CoroutineExceptionHandler got $exception") 
    }
    val job = GlobalScope.launch(handler) { // root coroutine, running in GlobalScope
        throw AssertionError()
    }
    val deferred = GlobalScope.async(handler) { // also root, but async instead of launch
        throw ArithmeticException() // Nothing will be printed, relying on user to call deferred.await()
    }
    joinAll(job, deferred)
}
```

### Exception propagation

Builders propagate exceptions automatically (`launch`) or expose them to the user (`async`, `produce`). For a root coroutine, `launch` treats exceptions as uncaught (like `Thread.uncaughtExceptionHandler`), while `async` / `produce` rely on the user consuming the exception through `await` or `receive`.

### CoroutineExceptionHandler

A context element on a root coroutine acting as a generic `catch` block for that coroutine and its children. You cannot recover from the exception in the handler: the coroutine has already completed with it; use it to log, show an error, terminate or restart. It is invoked only for uncaught exceptions: children delegate to their parent up to the root, so handlers installed on children are never used, and `async` always catches exceptions into its `Deferred`. Coroutines in a supervision scope are excluded from this rule.

### Cancellation and exceptions

`CancellationException` is used for cancellation and is ignored by all handlers; `Job.cancel` terminates a coroutine without canceling its parent. Any other exception cancels the parent with that exception; this cannot be overridden. The original exception is handled by the parent only when all its children terminate.

```kotlin
val job = launch {
    val child = launch {
        try {
            delay(Long.MAX_VALUE)
        } finally {
            println("Child is cancelled")
        }
    }
    yield()
    println("Cancelling child")
    child.cancel()
    child.join()
    yield()
    println("Parent is not cancelled")
}
job.join()
```

### Exceptions aggregation

When multiple children fail, the first exception wins; later ones are attached as suppressed exceptions. Cancellation exceptions are transparent and unwrapped by default.

```kotlin
val handler = CoroutineExceptionHandler { _, exception ->
    println("CoroutineExceptionHandler got $exception with suppressed ${exception.suppressed.contentToString()}")
}
```

### Supervision

`SupervisorJob` is like a regular `Job` except that a failure or cancellation of a child does not propagate to the supervisor or its other children; canceling the supervisor cancels its children.

```kotlin
val supervisor = SupervisorJob()
with(CoroutineScope(coroutineContext + supervisor)) {
    // launch the first child -- its exception is ignored for this example (don't do this in practice!)
    val firstChild = launch(CoroutineExceptionHandler { _, _ ->  }) {
        println("The first child is failing")
        throw AssertionError("The first child is cancelled")
    }
    // launch the second child
    val secondChild = launch {
        firstChild.join()
        // Cancellation of the first child is not propagated to the second child
        println("The first child is cancelled: ${firstChild.isCancelled}, but the second one is still active")
        try {
            delay(Long.MAX_VALUE)
        } finally {
            // But cancellation of the supervisor is propagated
            println("The second child is cancelled because the supervisor was cancelled")
        }
    }
    // wait until the first child fails & completes
    firstChild.join()
    println("Cancelling the supervisor")
    supervisor.cancel()
    secondChild.join()
}
```

`supervisorScope` replaces `coroutineScope` for scoped concurrency: it propagates cancellation in one direction only (cancels children only if it fails itself) and waits for all children. Children launched directly inside use the `CoroutineExceptionHandler` installed in their scope, like root coroutines, because a child's failure does not propagate to the parent.

```kotlin
supervisorScope {
    val child = launch(handler) {
        println("The child throws an exception")
        throw AssertionError()
    }
    println("The scope is completing")
}
println("The scope is completed")
```

## Notes

- `GlobalScope` is a delicate API; the page uses it only to create root coroutines and requires `@OptIn(DelicateCoroutinesApi::class)`.
- Installing a handler on a coroutine launched in the scope of `runBlocking` has no effect, since the main coroutine is always cancelled when its child completes with an exception.
- The suppressed-exception mechanism works on Java 1.7+; the page says JS and Native restrictions are temporary.

## Related

- [Cancellation and timeouts](./coroutines-cancellation.md)
- [Composing suspending functions](./composing-suspending-functions.md)
- [Channels](./channels.md)
