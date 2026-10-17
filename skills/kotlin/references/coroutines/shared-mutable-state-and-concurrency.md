---
source: https://kotlinlang.org/docs/shared-mutable-state-and-concurrency.html
---

# Shared mutable state and concurrency

Coroutines on a multi-threaded dispatcher such as `Dispatchers.Default` present the usual problem of synchronizing access to shared mutable state. Compares volatile, atomic data structures, thread confinement and `Mutex`.

## Signature / Usage

```kotlin
suspend fun massiveRun(action: suspend () -> Unit) {
    val n = 100  // number of coroutines to launch
    val k = 1000 // times an action is repeated by each coroutine
    val time = measureTimeMillis {
        coroutineScope { // scope for coroutines 
            repeat(n) {
                launch {
                    repeat(k) { action() }
                }
            }
        }
    }
    println("Completed ${n * k} actions in $time ms")    
}
```

### Approaches

| Approach | Result |
|----------|--------|
| Plain `var counter` incremented by 100 coroutines on `Dispatchers.Default` | Highly unlikely to print `Counter = 100000` (no synchronization) |
| `@Volatile` | Still wrong: guarantees atomic reads and writes, but not atomicity of larger actions such as increment |
| Thread-safe data structure (`AtomicInteger`) | Fastest for plain counters, collections, queues; does not easily scale to complex state or operations |
| Fine-grained thread confinement (`withContext(counterContext)` per increment) | Correct but very slow (each increment switches context) |
| Coarse-grained thread confinement (whole block in a single-threaded context) | Correct and much faster; the practical form of confinement |
| `Mutex` with `withLock` | Correct; fine-grained locking pays a price, good when no natural thread owns the state |

```kotlin
val counter = AtomicInteger()

fun main() = runBlocking {
    withContext(Dispatchers.Default) {
        massiveRun {
            counter.incrementAndGet()
        }
    }
    println("Counter = $counter")
}
```

```kotlin
val counterContext = newSingleThreadContext("CounterContext")
var counter = 0

fun main() = runBlocking {
    // confine everything to a single-threaded context
    withContext(counterContext) {
        massiveRun {
            counter++
        }
    }
    println("Counter = $counter")
}
```

### Mutual exclusion

`Mutex` is the coroutine alternative to `synchronized` / `ReentrantLock`; `lock()` is a suspending function and does not block a thread. `withLock` represents the `mutex.lock(); try { ... } finally { mutex.unlock() }` pattern.

```kotlin
val mutex = Mutex()
var counter = 0

fun main() = runBlocking {
    withContext(Dispatchers.Default) {
        massiveRun {
            // protect each increment with lock
            mutex.withLock {
                counter++
            }
        }
    }
    println("Counter = $counter")
}
```

## Notes

- Thread confinement is typical in UI applications, where all UI state is confined to a single event-dispatch thread; with coroutines it is applied through a single-threaded context.
- Imports used on the page: `kotlinx.coroutines.sync.*` for `Mutex` / `withLock`, `java.util.concurrent.atomic.*` for `AtomicInteger`, `kotlin.system.*` for `measureTimeMillis`.
- The official samples call `newSingleThreadContext` without an opt-in; in kotlinx.coroutines 1.11.0 it is `@ExperimentalCoroutinesApi` and `@DelicateCoroutinesApi`, so real code needs `@OptIn(ExperimentalCoroutinesApi::class, DelicateCoroutinesApi::class)`.

## Related

- [Coroutine context and dispatchers](./coroutine-context-and-dispatchers.md)
- [Coroutines basics](./coroutines-basics.md)
- [Flows](./coroutines-flow.md)
