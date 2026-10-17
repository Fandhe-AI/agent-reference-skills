---
source: https://kotlinlang.org/docs/coroutines-basics.html
---

# Coroutines: Structured Concurrency with launch and async

Run child coroutines inside a scope; the scope waits for all of them, and `async` returns a `Deferred` result.

```kotlin
// build.gradle.kts
repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
}
```

```kotlin
// Imports the kotlin.time.Duration to express duration in seconds
import kotlin.time.Duration.Companion.seconds

import kotlinx.coroutines.*

suspend fun main() {
    // Root of the coroutine subtree
    coroutineScope { // this: CoroutineScope
        this.launch {
            this.launch {
                delay(2.seconds)
                println("Child of the enclosing coroutine completed")
            }
            println("Child coroutine 1 completed")
        }
        this.launch {
            delay(1.seconds)
            println("Child coroutine 2 completed")
        }
    }
    // Runs only after all children in the coroutineScope have completed
    println("Coroutine scope completed")
}
```

Parallel results with `async` and `await()`:

```kotlin
import kotlin.time.Duration.Companion.milliseconds

import kotlinx.coroutines.*

suspend fun main() = withContext(Dispatchers.Default) { // this: CoroutineScope
    // Starts downloading the first page
    val firstPage = this.async {
        delay(50.milliseconds)
        "First page"
    }

    // Starts downloading the second page in parallel
    val secondPage = this.async {
        delay(100.milliseconds)
        "Second page"
    }

    // Awaits both results and compares them
    val pagesAreEqual = firstPage.await() == secondPage.await()
    println("Pages are equal: $pagesAreEqual")
}
```

Extracting builders into a function requires a `CoroutineScope` receiver:

```kotlin
import kotlinx.coroutines.*

suspend fun main() {
    coroutineScope {
        launchAll()
    }
}

fun CoroutineScope.launchAll() { // this: CoroutineScope
    // Calls .launch() on CoroutineScope
    this.launch { println("1") }
    this.launch { println("2") } 
}
```

## Notes

- A parent coroutine waits for its children; canceling or failing the parent cancels all children recursively.
- Use `runBlocking()` only to call suspending code from non-suspending code that you cannot change.
- Android `viewModelScope` / `StateFlow` UI state belongs to android-architecture; coroutine and Flow testing belongs to android-testing. This sample covers the language-level `kotlinx.coroutines` API only.
