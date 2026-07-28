# Caching, Timeouts, Error Handling, and Retries

Cross-cutting practices for making network calls resilient: response caching, request timeouts, error propagation, and retrying failed requests in the background.

## Signature / Usage

```kotlin
class MainViewModel(
    savedStateHandle: SavedStateHandle,
    private val userRepository: UserRepository
) : ViewModel() {
    private val userId: String = savedStateHandle["uid"]
        ?: throw IllegalArgumentException("Missing user ID")

    private val _user = MutableLiveData<User>()
    val user: LiveData<User> = _user

    init {
        viewModelScope.launch {
            try {
                _user.value = userRepository.getUserById(userId)
            } catch (error: Exception) {
                // surface error to the UI
            }
        }
    }
}
```

## Notes

- **Timeouts**: set explicit connect/read timeouts on whichever client is used (e.g. `HttpURLConnection.connectTimeout`/`readTimeout`, see [httpurlconnection](./httpurlconnection.md)) so failed connections don't hang indefinitely.
- **Error handling**: wrap suspend network calls in `try`/`catch` inside a repository or `ViewModel` coroutine scope, and surface failures to the UI instead of crashing; a `NetworkOnMainThreadException` at this layer usually indicates a missed `Dispatchers.IO` hop (see [permissions-and-threading](./permissions-and-threading.md)).
- **Caching**: Cronet supports in-memory or disk response caching; OkHttp supports HTTP response caching via `Cache`. Respect standard `Cache-Control` semantics from the server where possible instead of re-implementing caching logic.
- **Retries in the background**: use WorkManager with a `NetworkType.CONNECTED` (or `UNMETERED`) constraint to retry failed network work once connectivity returns, rather than polling `ConnectivityManager`. Full WorkManager API is documented in the `android-background-work` skill's `workmanager` category.
- **Data usage**: check [data-saver](./data-saver.md) preferences before retrying large transfers on a metered network.

## Related

- [permissions-and-threading](./permissions-and-threading.md)
- [data-saver](./data-saver.md)
- [network-callback](./network-callback.md)
