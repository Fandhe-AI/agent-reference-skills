# Dispatchers and withContext

`CoroutineDispatcher` determines which thread(s) a coroutine runs on. Android code typically uses `Dispatchers.Main`, `Dispatchers.IO`, and `Dispatchers.Default`. `withContext()` suspends the current coroutine and switches its dispatcher for a block, then switches back — the recommended way to make a `suspend` function main-safe.

## Signature / Usage

```kotlin
suspend fun makeLoginRequest(jsonBody: String): Result<LoginResponse> {
    return withContext(Dispatchers.IO) {
        // blocking network I/O runs here, off the main thread
    }
}
```

```kotlin
suspend fun get(url: String) =       // Dispatchers.Main
    withContext(Dispatchers.IO) {    // switches to Dispatchers.IO
        /* perform network IO */
    }                                 // switches back to Dispatchers.Main
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Dispatchers.Main` | `CoroutineDispatcher` | — | Runs on the main Android thread. Use for UI updates and suspend functions that need main-safety at the call site. |
| `Dispatchers.IO` | `CoroutineDispatcher` | — | Thread pool optimized for disk/network I/O (Room, file access, network calls). |
| `Dispatchers.Default` | `CoroutineDispatcher` | — | Thread pool optimized for CPU-intensive work off the main thread (sorting, parsing, heavy computation). |
| `Dispatchers.Main.immediate` | `CoroutineDispatcher` | — | Like `Dispatchers.Main`, but executes immediately without dispatch if already on the main thread, avoiding an unnecessary re-post. |

## Notes

- `withContext()` has no extra overhead versus callback-based code; Kotlin can optimize successive `withContext` calls between `Default` and `IO` to avoid unneeded thread switches.
- Using a thread-pool dispatcher (`IO`/`Default`) does **not** guarantee the same physical thread across a suspend-and-resume; avoid relying on thread-local state across suspension points.
- Best practice: inject the `CoroutineDispatcher` into repository/use-case classes (default value `Dispatchers.IO`) rather than hardcoding it, so tests can substitute a `TestDispatcher`.

## Related

- [Suspend functions](./suspend-functions.md)
- [launch, async, await](./launch-async-await.md)
- [Flow operators](./flow-operators.md)
