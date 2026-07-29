# Mutex and Shared Mutable State

Coroutines running on a multi-threaded dispatcher (e.g. `Dispatchers.Default`) can race when they read-modify-write the same mutable state concurrently. `Mutex` is the standard non-blocking, suspending alternative to `synchronized`/`ReentrantLock` for protecting such state.

## Signature / Usage

```kotlin
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

val mutex = Mutex()
var counter = 0

suspend fun massiveRun(action: suspend () -> Unit) {
    coroutineScope {
        repeat(100) { // launch 100 coroutines
            launch {
                repeat(1000) { action() }
            }
        }
    }
}

fun main() = runBlocking {
    withContext(Dispatchers.Default) {
        massiveRun {
            mutex.withLock {
                counter++
            }
        }
    }
    println("Counter = $counter") // always 100000
}
```

```kotlin
public interface Mutex {
    public val isLocked: Boolean
    public fun tryLock(owner: Any? = null): Boolean
    public suspend fun lock(owner: Any? = null)
    public fun holdsLock(owner: Any): Boolean
    public fun unlock(owner: Any? = null)
}

// top-level factory function, not a constructor
public fun Mutex(locked: Boolean = false): Mutex

// top-level extension function, not a member of Mutex
public suspend inline fun <T> Mutex.withLock(owner: Any? = null, action: () -> T): T
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isLocked` | `val isLocked: Boolean` | — | Returns whether the mutex is locked. |
| `tryLock` | `fun tryLock(owner: Any? = null): Boolean` | — | Tries to lock the mutex without suspending, returning `true` on success or `false` if it is already locked. |
| `lock` | `suspend fun lock(owner: Any? = null)` | — | Suspends the calling coroutine until the mutex is acquired; does not block the underlying thread. |
| `holdsLock` | `fun holdsLock(owner: Any): Boolean` | — | Returns `true` if this mutex is locked with the given `owner`. |
| `unlock` | `fun unlock(owner: Any? = null)` | — | Releases the mutex. Must be paired with every `lock()`, typically in a `finally` block. |
| `withLock` | `suspend inline fun <T> Mutex.withLock(owner: Any? = null, action: () -> T): T` | — | Extension function (not a `Mutex` member). Acquires the mutex, runs `action`, and releases the mutex afterward (including on exception) — the recommended way to use `Mutex` instead of calling `lock`/`unlock` manually. |

## Notes

- `Mutex` is an `interface`, not a class; instances are created via the top-level factory function `Mutex(locked: Boolean = false)`, not a constructor. `withLock` is a top-level `suspend inline` extension function on `Mutex`, declared outside the interface — it is not a member of `Mutex`.
- `Mutex.lock()` is a `suspend` function: a coroutine waiting on it suspends instead of blocking a thread, unlike `synchronized` or `java.util.concurrent.locks.ReentrantLock`.
- `Mutex` has **no reentrancy**: a coroutine calling `lock()` again while already holding the lock (even on the same thread) will deadlock.
- `@Volatile` only makes reads/writes of a single field atomic; it does **not** make compound operations like `counter++` (read + increment + write) atomic, so it does not fix races on its own.
- For a single simple counter/collection, a `java.util.concurrent.atomic.AtomicInteger`-style thread-safe data structure is simpler and faster than a `Mutex`; reach for `Mutex` when multiple related pieces of state must be updated together.
- Thread confinement (running all mutating code on one dedicated single-thread dispatcher, coarse-grained rather than per-operation) is another alternative that avoids locking altogether and is often preferred for UI-scoped state.
- General guidance: prefer thread-safe data structures or coarse-grained thread confinement first; use `Mutex` when state needs periodic, structured, cross-coroutine modification without a natural thread-confinement boundary.

## Related

- [Dispatchers and withContext](./dispatchers-withcontext.md)
- [CoroutineScope, coroutineScope, supervisorScope](./coroutine-scope.md)
- [launch, async, await](./launch-async-await.md)
