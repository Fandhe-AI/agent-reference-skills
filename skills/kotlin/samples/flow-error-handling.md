---
source: https://kotlinlang.org/docs/coroutines-flow.html
---

# Flow: Error Handling with catch and retry

Handle upstream exceptions with `.catch()` and restart a failing upstream with `.retry()`.

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

suspend fun main() {
    flow {
        emit("a")
        emit("b")

        // Throws an exception from the upstream flow
        throw UnsupportedOperationException(
            "I am tired of listing letters"
        )
    }.catch { upstreamException ->
        println("Upstream completed with $upstreamException!")

        // Emits a fallback value downstream
        emit("Upstream terminated with an exception!")
    }.collect {
        println("Got '$it'")
    }
}
```

Retry on an expected exception type, stop and rethrow otherwise:

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.*
import java.io.IOException
import kotlin.time.Duration.Companion.milliseconds
import kotlin.time.Duration.Companion.seconds

sealed interface LoadingState {
    sealed interface Terminal: LoadingState
    object Started: LoadingState
    data class Percentage(val percents: Int): LoadingState
    object Failed: Terminal
    object Done: Terminal
}

fun loadBlob(url: String) = flow {
    emit(LoadingState.Started)

    val failureChancePerStep = 1 - java.lang.Math.pow(0.99, 10.0)

    repeat(10) { step ->
        if (Random.nextDouble() < failureChancePerStep)
            throw IOException("Failed to load!")
        emit(LoadingState.Percentage((step + 1) * 10))
        delay(10.milliseconds)
    }
    emit(LoadingState.Done)
}.retry(3) { e ->
    if (e is IOException) {
        // This is an expected error
        // Waits for one second before retrying
        delay(1.seconds)
        true
    } else {
        // Stops retrying and rethrows unexpected exceptions
        false
    }
}

suspend fun main() {
    loadBlob("https://example.org/").collect {
        println("Got $it")
    }
}
```

## Notes

- `.catch()` does not handle exceptions thrown by the `collect()` lambda; wrap `collect()` in `try-catch`, or move the code into `.onEach()` placed before `.catch()`.
- When a flow builder catches a downstream exception, rethrow it to preserve exception transparency.
- `.retry(3)` retries up to three times after the first failed attempt; use `.retryWhen()` for attempt numbers and emitting before a retry.
- Android `viewModelScope` / `StateFlow` UI state belongs to android-architecture; Flow testing belongs to android-testing.
