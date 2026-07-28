# HttpsURLConnection / HttpURLConnection

The platform's built-in HTTP(S) client, supporting TLS, streaming uploads/downloads, configurable timeouts, IPv6, and connection pooling, without any third-party dependency.

## Signature / Usage

```kotlin
val url = URL("https://example.com/api")
(url.openConnection() as HttpsURLConnection).run {
    requestMethod = "GET"
    connectTimeout = 15000
    readTimeout = 15000
    try {
        inputStream.bufferedReader().use { it.readText() }
    } finally {
        disconnect()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `connectTimeout` | `Int` (ms) | — | Timeout for establishing the connection. |
| `readTimeout` | `Int` (ms) | — | Timeout for reading a response once connected. |
| `requestMethod` | `String` | `"GET"` | HTTP method, e.g. `"GET"`, `"POST"`. |
| `inputStream` / `outputStream` | `Stream` | — | Response body / request body streams. |
| `disconnect()` | method | — | Releases the connection's resources. |

## Notes

- Considered legacy for new development. The official networking guide recommends [Cronet](./cronet.md) or [Retrofit](./retrofit.md)/[OkHttp](./okhttp.md) over `HttpURLConnection` for new code.
- Use `HttpsURLConnection` (not plain `HttpURLConnection`) to get TLS.
- Must be called off the main thread; blocks the calling thread until connect/read completes.
- Subject to the same [network security configuration](./network-security-config.md) cleartext restrictions as other HTTP clients.
- The connecting guide confirms this client supports TLS, streaming uploads/downloads, configurable timeouts, IPv6, and connection pooling, but does not itself enumerate member names; the Options/Props table above reflects standard JDK/Android `HttpURLConnection` members, not guide-page text.

## Related

- [Cronet](./cronet.md)
- [OkHttp](./okhttp.md)
- [network-security-config](./network-security-config.md)
