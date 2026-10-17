---
source: https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

# Coroutine context and dispatchers

Coroutines execute in a context, a `CoroutineContext` (defined in the Kotlin standard library) holding elements such as the coroutine's `Job` and its dispatcher.

## Signature / Usage

```kotlin
launch { // context of the parent, main runBlocking coroutine
    println("main runBlocking      : I'm working in thread ${Thread.currentThread().name}")
}
launch(Dispatchers.Unconfined) { // not confined -- will work with main thread
    println("Unconfined            : I'm working in thread ${Thread.currentThread().name}")
}
launch(Dispatchers.Default) { // will get dispatched to DefaultDispatcher 
    println("Default               : I'm working in thread ${Thread.currentThread().name}")
}
launch(newSingleThreadContext("MyOwnThread")) { // will get its own new thread
    println("newSingleThreadContext: I'm working in thread ${Thread.currentThread().name}")
}
```

### Dispatchers and threads

All coroutine builders such as `launch` and `async` accept an optional `CoroutineContext` parameter to specify the dispatcher and other context elements. Without parameters, `launch` inherits the context of the `CoroutineScope` it launches from. `Dispatchers.Default` uses a shared background pool of threads and is used when no dispatcher is specified. `newSingleThreadContext` creates a dedicated thread, an expensive resource: release it with `close` or keep it in a top-level variable and reuse it.

### Unconfined vs confined dispatcher

`Dispatchers.Unconfined` starts the coroutine in the caller thread until the first suspension point; after suspension it resumes in the thread determined by the suspending function invoked. It is an advanced mechanism for corner cases and should not be used in general code. The `runBlocking` default dispatcher is confined to the invoker thread (predictable FIFO scheduling).

### Jumping between threads

`withContext` may suspend the current coroutine and switch to a new context; with a different `CoroutineDispatcher` the block is scheduled on the new dispatcher and execution returns to the original dispatcher when it finishes.

```kotlin
fun main() {
    newSingleThreadContext("Ctx1").use { ctx1 ->
        newSingleThreadContext("Ctx2").use { ctx2 ->
            runBlocking(ctx1) {
                log("Started in ctx1")
                withContext(ctx2) {
                    log("Working in ctx2")
                }
                log("Back to ctx1")
            }
        }
    }
}
```

### Job in the context

```kotlin
println("My job is ${coroutineContext[Job]}")
```

`isActive` in `CoroutineScope` is a shortcut for `coroutineContext[Job]?.isActive ?: true` (it returns `true` when the context has no `Job`).

### Children of a coroutine

A coroutine launched in another coroutine's `CoroutineScope` inherits its context via `CoroutineScope.coroutineContext`, and its `Job` becomes a child of the parent's job; canceling the parent recursively cancels children. The relation is overridden when a different scope is explicitly specified (for example `GlobalScope.launch`) or when a different `Job` object is passed as the context (`launch(Job())`). A parent always waits for all its children without explicit `Job.join`.

### Naming coroutines and combining elements

`CoroutineName` is included in the thread name when debugging mode is on. Combine elements with `+`:

```kotlin
launch(Dispatchers.Default + CoroutineName("test")) {
    println("I'm working in thread ${Thread.currentThread().name}")
}
```

### Coroutine scope

`CoroutineScope` ties coroutines to an object with a lifecycle. Create one with the `CoroutineScope()` factory (general purpose) or `MainScope()` (UI applications, uses `Dispatchers.Main` as the default dispatcher).

```kotlin
class Activity {
    private val mainScope = MainScope()
    
    fun destroy() {
        mainScope.cancel()
    }
    // to be continued ...
```

### Thread-local data

`ThreadLocal.asContextElement(value = ...)` keeps the value and restores it every time the coroutine switches context.

```kotlin
val threadLocal = ThreadLocal<String?>() // declare thread-local variable

val job = launch(Dispatchers.Default + threadLocal.asContextElement(value = "launch")) {
    println("Launch start, current thread: ${Thread.currentThread()}, thread local value: '${threadLocal.get()}'")
    yield()
    println("After yield, current thread: ${Thread.currentThread()}, thread local value: '${threadLocal.get()}'")
}
```

Limitation: when a thread-local is mutated, the new value is not propagated to the coroutine caller and is lost on the next suspension; use `withContext` to update it. Use `ensurePresent` to fail fast on improper usage. For logging MDC or transactional contexts, implement `ThreadContextElement`.

## Notes

- Debugging: run with the `-Dkotlinx.coroutines.debug` JVM option to append the coroutine id to the thread name (for example `[main @coroutine#2]`); debug mode is also on with `-ea`. The IntelliJ IDEA Coroutine Debugger works for `kotlinx-coroutines-core` 1.3.8 or later. See [Debug coroutines](./coroutines-debugging.md).
- The official guide writes `coroutineContext[Job]?.isActive == true`; the actual implementation (CoroutineScope.kt at 7e0d1b3) is `coroutineContext[Job]?.isActive ?: true`, so a scope without a Job reports active.
- Android has first-party support for coroutine scope in all entities with a lifecycle (`lifecycleScope`); Android-side `viewModelScope`, `collectAsStateWithLifecycle` and `StateFlow` UI state are covered by android-architecture, and coroutine / Flow testing by android-testing. This page covers the kotlinx.coroutines context model only.
- The official samples call `newSingleThreadContext` without an opt-in; in kotlinx.coroutines 1.11.0 it is `@ExperimentalCoroutinesApi` and `@DelicateCoroutinesApi`, so real code needs `@OptIn(ExperimentalCoroutinesApi::class, DelicateCoroutinesApi::class)`.

## Related

- [Coroutines basics](./coroutines-basics.md)
- [Cancellation and timeouts](./coroutines-cancellation.md)
- [Coroutine exceptions handling](./exception-handling.md)
- [Debug coroutines](./coroutines-debugging.md)
