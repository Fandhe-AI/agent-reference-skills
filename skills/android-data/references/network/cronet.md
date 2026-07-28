# Cronet

The Chromium network stack packaged as an Android library. Google's recommended HTTP client for reduced latency and higher throughput, powering networking in apps like YouTube and Google Photos.

## Signature / Usage

```kotlin
// build.gradle.kts
dependencies {
    implementation("com.google.android.gms:play-services-cronet:18.0.1")
}
```

```kotlin
CronetProviderInstaller.installProvider(context) // call before creating a CronetEngine
val cronetEngine: CronetEngine = CronetEngine.Builder(context).build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `CronetEngine.Builder(context)` | class | — | Configures and builds a `CronetEngine`. |
| `CronetEngine` | class | — | Entry point for sending network requests; one instance can send many concurrent async requests. |

## Notes

- Protocol support: HTTP/1.1, HTTP/2, and HTTP/3 over QUIC, plus Brotli compression.
- Features request prioritization, in-memory/disk response caching, and fully asynchronous, non-blocking requests.
- Create **only one `CronetEngine` instance per app** and reuse it.
- For request/response details see [cronet-urlrequest](./cronet-urlrequest.md); to route OkHttp/Retrofit traffic through Cronet see [cronet-okhttp-interceptor](./cronet-okhttp-interceptor.md).

## Related

- [cronet-urlrequest](./cronet-urlrequest.md)
- [cronet-okhttp-interceptor](./cronet-okhttp-interceptor.md)
