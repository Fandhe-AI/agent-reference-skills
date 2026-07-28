# Suspend Functions

A `suspend` function is Kotlin's way to enforce that a function must be called from within a coroutine (or another suspend function). It provides the basic building block for structured, asynchronous, non-blocking code on Android.

## Signature / Usage

```kotlin
suspend fun makeLoginRequest(jsonBody: String): Result<LoginResponse> {
    // Move the execution of the coroutine to the I/O dispatcher
    return withContext(Dispatchers.IO) {
        // Blocking network request code
    }
}
```

```kotlin
// Caller must be inside a coroutine
viewModelScope.launch {
    val result = makeLoginRequest(jsonBody)
}
```

## Notes

- `suspend` alone does **not** move work off the calling thread — it only marks the function as suspendable. Wrap blocking work with `withContext(Dispatchers.IO)` (or `Default`) to make the function main-safe.
- A well-designed `suspend` function should be **main-safe**: callable from `Dispatchers.Main` without blocking the UI thread.
- The compiler enforces the calling context: `suspend` functions can only be invoked from other `suspend` functions or from a coroutine builder (`launch`, `async`, `runBlocking`, etc).

## Related

- [Dispatchers and withContext](./dispatchers-withcontext.md)
- [CoroutineScope, coroutineScope, supervisorScope](./coroutine-scope.md)
- [launch, async, await](./launch-async-await.md)
