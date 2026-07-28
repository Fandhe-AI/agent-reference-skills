# OkHttp

An HTTP client for Java/Kotlin from Square, providing connection pooling, HTTP/2, transparent GZIP, response caching, and automatic recovery from common connection failures. Powers Retrofit's default transport.

## Signature / Usage

```kotlin
val client = OkHttpClient()

val request = Request.Builder()
    .url(url)
    .build()

client.newCall(request).execute().use { response ->
    println(response.body?.string())
}
```

```kotlin
// POST with a body
val body = json.toRequestBody("application/json".toMediaType())
val request = Request.Builder().url(url).post(body).build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `OkHttpClient()` / `OkHttpClient.Builder()` | class | — | Configures timeouts, interceptors, and connection pooling. |
| `Request.Builder().url(url)` | builder | — | Sets the target URL; defaults to a GET request. |
| `.newCall(request).execute()` | method | — | Executes the call synchronously; must not be called on the main thread. |
| `.newCall(request).enqueue(callback)` | method | — | Executes the call asynchronously with a `Callback`. |
| `Interceptor` | interface | — | Application or network interceptor for observing/modifying requests and responses (e.g. logging, auth headers, [CronetInterceptor](./cronet-okhttp-interceptor.md)). |

## Notes

- Third-party library (Square), not part of the Android SDK or Jetpack.
- `execute()` is blocking; call it from a background thread/coroutine (see [permissions-and-threading](./permissions-and-threading.md)).
- Application interceptors run once per call; network interceptors run once per physical network request (including retries/redirects).
- Retrofit uses `OkHttpClient` as its default networking layer; supply a custom client via `Retrofit.Builder().client(...)`.

## Related

- [Retrofit](./retrofit.md)
- [cronet-okhttp-interceptor](./cronet-okhttp-interceptor.md)
