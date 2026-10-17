---
source: https://kotlinlang.org/docs/coroutines-flow.html
---

# Flow: Collect and Cancel

Build a cold flow, collect it, change its upstream context with `flowOn`, and cancel collection through the collecting coroutine's `Job`.

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.time.Duration.Companion.milliseconds

suspend fun main() {
    withContext(Dispatchers.Default) {
        val pageFlow = flow {
            for (page in 1..3) {
                println("Loading page $page...")
                emit("Page $page")
            }
        }
        // Collects the flow with a lambda that receives each emitted page
        pageFlow.collect { page ->
            println("Processing $page...")
            delay(100.milliseconds)
            println("Done processing $page.")
        }
    }
}
```

Run the upstream in a different context while collecting in the caller's context:

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

suspend fun main() {
    withContext(Dispatchers.Default + CoroutineName("downstream")) {
        flow {
            val coroutineName = currentCoroutineContext()[CoroutineName]?.name

            // Emits in the coroutine context applied with .flowOn()
            println("Emitting '1' in $coroutineName")
            // Emitting '1' in upstream
            emit(1)

        // Changes the coroutine context of the upstream flow
        }.flowOn(Dispatchers.IO + CoroutineName("upstream"))
            .collect {
            val coroutineName = currentCoroutineContext()[CoroutineName]?.name

            // Collects in the caller's coroutine context
            println("Collecting '$it' in $coroutineName")
            // Collecting '1' in downstream
        }
    }
}
```

Cancel collection by canceling the collecting coroutine:

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.time.Duration.Companion.milliseconds

val myFlow = flow {
    var i = 0
    try {
        while (true) {
            println("Emitting $i")
            emit(i)
            println("Emitted $i")
            ++i
            delay(10.milliseconds)
        }
    } catch (e: Throwable) {
        println("Upstream finished with $e")
        throw e
    }
}

suspend fun main() {
    coroutineScope {
        val job = launch {
            try {
                myFlow.collect {
                    println("Processing $it")
                    delay(5.milliseconds)
                }
            } catch (e: Throwable) {
                println("Collection finished with $e")
                throw e
            }
        }
        delay(100.milliseconds)

        // Cancels the coroutine that collects the flow
        job.cancel()
    }
}
```

## Notes

- A cold flow does not run until collected; each collector triggers a new, independent execution.
- A `flow()` builder must emit from the same coroutine context where it runs: no `withContext()` and no emitting from another coroutine. Use `.flowOn()` or `channelFlow()` instead.
- `.take(3)` stops collection by throwing a `CancellationException` from the collector.
- Android `viewModelScope` / `collectAsStateWithLifecycle` / `StateFlow` UI state belongs to android-architecture; Flow testing belongs to android-testing.
