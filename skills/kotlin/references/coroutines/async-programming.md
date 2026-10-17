---
source: https://kotlinlang.org/docs/async-programming.html
---

# Asynchronous control flow and suspending functions

Walks through a small reminder application to show how threads, actors, callbacks and control-flow abstractions manage asynchronous control flow, and how suspending functions express the same flow in a sequential style. Teaching examples only, not production-ready.

## Signature / Usage

```kotlin
// Processes user input in a suspending function
suspend fun suspendMain(
    printlnActor: SimpleActor,
    userInputActor: SimpleActor
) {
    while (true) {
        printlnActor.sendRequest {
            println("Please enter your input:")
        }

        val input = readlnOrNull() ?: break
        val command = input
            .trim().split("\\s".toRegex())
            .toMutableList()
        val operation = command.removeFirstOrNull() ?: continue

        when (val operationInLowerCase = operation.lowercase()) {
            // Handles other commands
            /* ... */

            "quit" -> break
        }
    }

    printlnActor.sendRequest {
        println("All done! The program will exit once all pending reminders fire.")
        shouldTerminate.store(true)
    }
}
```

### Progression of approaches

1. Concurrent computations: start another operation on a separate `Thread` while the main thread continues. Concurrent access to a shared resource (the console) can interleave output, a race condition.

```kotlin
// Starts a new thread that waits for the specified duration before printing the reminder
fun scheduleReminder(remindIn: Duration, reminderText: List<String>) {
    Thread {
        // Waits for the specified duration on a separate thread
        Thread.sleep(remindIn.inWholeMilliseconds)

        println(/* reminder text */)
    }.apply {
        // Keeps the JVM running until the reminder thread finishes
        isDaemon = false

        // Starts the thread
        start()
    }
}
```

2. Actor-based shared resource coordination: one component processes requests one at a time from a queue. `sendRequest()` submits a request and returns without waiting.

```kotlin
// Coordinates access to a shared resource by processing requests one at a time
class SimpleActor {
    private val requests = mutableListOf<() -> Unit>()

    init {
        Thread {
            while (true) {
                // Gets the next request from the queue when available
                val request = /* ... */

                // Executes one request at a time
                request()
            }
        }.apply {
            // Allows the JVM to exit while the actor thread is still running
            isDaemon = true

            // Starts the actor thread
            start()
        }
    }

    fun sendRequest(request: () -> Unit) {
        // Adds the request to the queue
        /* ... */
    }
}
```

3. Callbacks: define subsequent work as a function passed to another function, invoked when a condition is met. Each execution path must explicitly schedule what follows, which becomes error-prone as control flow grows.

```kotlin
fun processUserInput(
    printlnActor: SimpleActor,
    userInputActor: SimpleActor,
    doLast: () -> Unit
) {
    // Processes the current command
    /* ... */

    // Schedules processing of the next command
    userInputActor.sendRequest {
        processUserInput(printlnActor, userInputActor, doLast)
    }
}
```

4. Control-flow abstractions: helper functions such as `runInfiniteLoop()` with a `LoopIterationResult` enum centralize continue / break / resume-later logic. The example does not handle exceptions thrown from the iteration, the schedule callback, or `actionOnLoopExit`.

```kotlin
enum class LoopIterationResult {
    BREAK,
    CONTINUE,
    WILL_BE_RESUMED_ASYNCHRONOUSLY
}

// Runs the input-processing loop asynchronously
fun runInfiniteLoop(
    schedule: (RequestType) -> Unit,
    iteration: (scheduleNextIteration: () -> Unit) -> LoopIterationResult,
    actionOnLoopExit: () -> Unit,
) {
    fun helper() {
        when (iteration { schedule(::helper) }) {
            LoopIterationResult.BREAK -> {
                // Runs the action that follows the loop
                actionOnLoopExit()
            }

            LoopIterationResult.CONTINUE -> {
                // Schedules the next loop iteration
                schedule(::helper)
            }

            LoopIterationResult.WILL_BE_RESUMED_ASYNCHRONOUSLY -> {
                // Another operation schedules the next iteration
            }
        }
    }

    // Schedules the first loop iteration
    schedule(::helper)
}
```

5. Suspending functions: declare with the `suspend` keyword. A function can pause at a suspension point and continue later; `while`, `continue`, `break`, `return`, `try`, `catch`, `finally` and calls to other suspending functions work directly. The compiler creates a continuation representing the execution that follows a suspension point.

```kotlin
"fun_animation" -> {
    // Suspends execution until another operation resumes it
    suspendCoroutine { continuation ->
        printlnActor.sendRequest {
            for (frame in funAnimationFrames) {
                println(frame)
                Thread.sleep(200)
            }

            userInputActor.sendRequest {
                // Resumes execution after the animation finishes
                continuation.resumeWith(Result.success(Unit))
            }
        }
    }
}
```

Running the suspending function from `main()` starts a coroutine with `startCoroutineUninterceptedOrReturn()`:

```kotlin
userInputActor.sendRequest {
    suspend {
        suspendMain(printlnActor, userInputActor)
    }.startCoroutineUninterceptedOrReturn(
        Continuation<Unit>(EmptyCoroutineContext) {
        }
    )
}
```

## Notes

- `suspendCoroutine()` is used only to demonstrate how suspension works. Do not use it in production code that needs to support cancellation (see [Cancellation and timeouts](./coroutines-cancellation.md)).
- The page's examples use `@file:OptIn(kotlin.concurrent.atomics.ExperimentalAtomicApi::class)` with `kotlin.concurrent.atomics.AtomicBoolean` in the callback, control-flow-abstraction and suspending-function versions.
- Source examples are in the `kotlin-hands-on/suspending-functions-intro` repository (`Example1.kt` to `Example5.kt`).
- For production-ready asynchronous code, start with [Coroutines basics](./coroutines-basics.md).

## Related

- [Coroutines](./coroutines-overview.md)
- [Coroutines basics](./coroutines-basics.md)
- [Cancellation and timeouts](./coroutines-cancellation.md)
