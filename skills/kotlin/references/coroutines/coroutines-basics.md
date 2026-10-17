---
source: https://kotlinlang.org/docs/coroutines-basics.html
---

# Coroutines basics

A coroutine is a suspendable computation that lets you write concurrent code in a sequential style. Covers suspending functions, the kotlinx.coroutines dependency, coroutine scope and structured concurrency, builders, dispatchers, and a comparison with JVM threads.

## Signature / Usage

```kotlin
// Imports the coroutines library
import kotlinx.coroutines.*

// Imports the kotlin.time.Duration to express duration in seconds
import kotlin.time.Duration.Companion.seconds

// Defines a suspending function
suspend fun greet() {
    println("The greet() on the thread: ${Thread.currentThread().name}")
    // Suspends for 1 second and releases the thread
    delay(1.seconds) 
    // The delay() function simulates a suspending API call here
    // You can add suspending API calls here like a network request
}

suspend fun main() {
    // Runs the code inside this block on a shared thread pool
    withContext(Dispatchers.Default) { // this: CoroutineScope
        this.launch() {
            greet()
        }

        // Starts another coroutine
        this.launch() {
            println("The CoroutineScope.launch() on the thread: ${Thread.currentThread().name}")
            delay(1.seconds)
            // The delay function simulates a suspending API call here
            // You can add suspending API calls here like a network request
        }

        println("The withContext() on the thread: ${Thread.currentThread().name}")
    }
}
```

### Add the dependency

```kotlin
// build.gradle.kts
repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
}
```

Groovy: `implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0'`. Maven: `org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0` in `pom.xml` dependencies.

### Suspending functions

Declare with `suspend`. A suspending function can only be called from another suspending function. Mark `main()` with `suspend` to call suspending functions at the application entry point.

### Coroutine scope and structured concurrency

Coroutines form a tree of parent and child tasks with linked lifecycles. A parent waits for its children; if the parent fails or is canceled, all children are recursively canceled. New coroutines can only be launched in a `CoroutineScope`. `coroutineScope()` creates a scope with the current coroutine context and waits until the block and all coroutines launched in it complete.

```kotlin
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

To extract builders into another function, that function must declare a `CoroutineScope` receiver (otherwise a compilation error occurs). It needs no `suspend` keyword if it only starts coroutines and returns immediately.

```kotlin
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

### Coroutine builder functions

A builder accepts a `suspend` lambda that defines a coroutine. Examples: `CoroutineScope.launch()`, `CoroutineScope.async()`, `runBlocking()`, `withContext()`, `coroutineScope()`.

| Builder | Behavior |
|---------|----------|
| `CoroutineScope.launch()` | Starts a new coroutine without blocking the scope; returns a `Job` handle |
| `CoroutineScope.async()` | Starts a concurrent computation; returns a `Deferred` handle; `.await()` suspends until the result is ready |
| `runBlocking()` | Creates a scope and blocks the current thread until coroutines launched in it finish; use only when there is no other option to call suspending code from non-suspending code |

```kotlin
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

```kotlin
// A third-party interface you can't change
interface Repository {
    fun readItem(): Int
}

object MyRepository : Repository {
    override fun readItem(): Int {
        // Bridges to a suspending function
        return runBlocking {
            myReadItem()
        }
    }
}
```

### Coroutine dispatchers

A dispatcher controls which thread or thread pool coroutines use. Coroutines can suspend on one thread and resume on another. By default a coroutine inherits the dispatcher from its parent scope; if the context has no dispatcher, builders use `Dispatchers.Default` (shared background pool). Pass a dispatcher to a builder, or use `withContext()`:

```kotlin
suspend fun runWithDispatcher() = coroutineScope { // this: CoroutineScope
    this.launch(Dispatchers.Default) {
        println("Running on ${Thread.currentThread().name}")
    }
}
```

### Comparing coroutines and JVM threads

```kotlin
suspend fun printPeriods() = coroutineScope { // this: CoroutineScope
    // Launches 50,000 coroutines that each wait five seconds, then print a period
    repeat(50_000) {
        this.launch {
            delay(5.seconds)
            print(".")
        }
    }
}
```

The equivalent with `kotlin.concurrent.thread { Thread.sleep(5000L); print(".") }` uses much more memory: up to 100 GB for 50,000 threads versus roughly 500 MB for the same number of coroutines. The JVM thread version may throw an out-of-memory error or slow thread creation.

## Notes

- `Dispatchers.Default` uses up to as many threads as there are CPU cores available at runtime, with a minimum of two.
- Values written before a coroutine suspends are guaranteed to be available within the same coroutine when it resumes, even on a different thread.
- Pass the `-Dkotlinx.coroutines.debug` VM option to display coroutine names next to thread names.
- In the page's examples, `this.launch` can also be written `launch`; the explicit `this` highlights that builders are extension functions on `CoroutineScope`.
- Android-side `viewModelScope` and `StateFlow` UI state are covered by android-architecture; testing coroutines and Flow is covered by android-testing. This page covers the language and kotlinx.coroutines concepts only.

## Related

- [Coroutines](./coroutines-overview.md)
- [Coroutine context and dispatchers](./coroutine-context-and-dispatchers.md)
- [Cancellation and timeouts](./coroutines-cancellation.md)
- [Composing suspending functions](./composing-suspending-functions.md)
- [Flows](./coroutines-flow.md)
- [Debug coroutines](./coroutines-debugging.md)
