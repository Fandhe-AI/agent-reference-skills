# CronetInterceptor (cronet-okhttp)

An OkHttp `Interceptor` that redirects OkHttp/Retrofit traffic to use Cronet as the transport layer instead of OkHttp's own network stack.

## Signature / Usage

```kotlin
val engine = CronetEngine.Builder(context).build()

val callFactory: Call.Factory = OkHttpClient.Builder()
    .addInterceptor(CronetInterceptor.newBuilder(engine).build()) // must be added last
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `CronetInterceptor.newBuilder(engine)` | builder | — | Creates a builder for the interceptor from a `CronetEngine`. |
| `.build()` | method | — | Builds the `CronetInterceptor` (implements `Interceptor` and `AutoCloseable`). |
| Usage mode | interceptor or Call.Factory | — | Can be added as an OkHttp application interceptor, or used to build a `Call.Factory`. |

## Notes

- Third-party library (`google/cronet-transport-for-okhttp`, published by Google), layered on top of OkHttp/Retrofit — not part of the core Android SDK. (Note: the mandated third-party phrasing names Square; this library is Google's, so the wording is adapted here.)
- Add the Cronet interceptor **last** in the interceptor chain; interceptors added after it are skipped.
- Gains Cronet features (HTTP/3-QUIC, connection migration) while keeping the existing OkHttp/Retrofit call-building code.

## Related

- [Cronet](./cronet.md)
- [OkHttp](./okhttp.md)
- [Retrofit](./retrofit.md)
