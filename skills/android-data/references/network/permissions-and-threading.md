# Network Permissions and Main Thread Restriction

Baseline requirements for any network operation on Android: manifest permissions and thread placement.

## Signature / Usage

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

```kotlin
// Throws NetworkOnMainThreadException if run on the main thread
viewModelScope.launch(Dispatchers.IO) {
    val user = userRepository.getUserById(userId)
}
```

## Notes

- `INTERNET` and `ACCESS_NETWORK_STATE` are **normal permissions**, granted at install time; no runtime request is needed.
- Network operations on the main UI thread throw `NetworkOnMainThreadException` by default. Move I/O off the main thread (coroutines with `Dispatchers.IO`, or an async callback like OkHttp's `enqueue()`).
- Use `ViewModel` to hold in-flight/loaded data so it survives configuration changes (e.g. rotation).
- For secure transport, prefer `HttpsURLConnection` or a client that defaults to TLS (Cronet, OkHttp); see [network-security-config](./network-security-config.md) for cleartext policy.

## Related

- [ConnectivityManager](./connectivitymanager.md)
- [network-security-config](./network-security-config.md)
- [caching-and-retry](./caching-and-retry.md)
