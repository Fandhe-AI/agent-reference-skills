# Network Stacks

Comparison of the HTTP data source implementations ExoPlayer can use, and how to inject one into `DataSource.Factory`.

## Signature / Usage

```kotlin
// Recommended: HttpEngine / Cronet with fallback for file & resource URIs.
val dataSourceFactory =
  DefaultDataSource.Factory(
    context,
    /* baseDataSourceFactory= */ PreferredHttpDataSource.Factory(context),
  )

val player =
  ExoPlayer.Builder(context)
    .setMediaSourceFactory(DefaultMediaSourceFactory(context).setDataSourceFactory(dataSourceFactory))
    .build()
```

```kotlin
// Cronet, built explicitly from a shared CronetEngine.
val cronetDataSourceFactory = CronetDataSource.Factory(cronetEngine, executor)
val dataSourceFactory =
  DefaultDataSource.Factory(context, /* baseDataSourceFactory= */ cronetDataSourceFactory)
```

## Options / Props

| Name | Stack | Protocols | APK impact | Notes |
|------|-------|-----------|------------|-------|
| `HttpEngine` | Android platform API (API 34+ or S Extensions 7+) | HTTP, HTTP/2, HTTP/3 (QUIC) | none | Recommended when available; typically backed by Cronet internally. |
| Cronet (Google Play services) | `com.google.android.gms.net.CronetProviderInstaller` | HTTP, HTTP/2, HTTP/3 (QUIC) | <100 KB | Recommended fallback below API 34; auto-updated. |
| Cronet (embedded) | `org.chromium.net` embedded | HTTP, HTTP/2, HTTP/3 (QUIC) | ~8 MB | Full version control, largest APK footprint. |
| Cronet (fallback) | wraps platform stack | HTTP (device-dependent) | <100 KB | Not recommended with ExoPlayer; use `DefaultHttpDataSource` directly instead. |
| OkHttp | `androidx.media3:media3-datasource-okhttp` | HTTP, HTTP/2 | <1 MB | No HTTP/3; good choice when Cronet/HttpEngine are unsuitable. |
| `DefaultHttpDataSource` | Android's built-in stack | HTTP (HTTP/2 and HTTP/3 not widely supported) | none | Use when APK size is critical or media is a minor app feature. |

## Notes

- Use a single shared `HttpEngine`, `CronetEngine`, or `OkHttpClient` instance across the app for connection pooling.
- Wrap the HTTP-only factory in `DefaultDataSource.Factory` so file/asset/content URIs keep working alongside network URIs.
- To cache streamed bytes on top of any of these stacks, wrap the chosen `DataSource.Factory` as `upstreamDataSourceFactory` in a `CacheDataSource.Factory`; use Media3's dedicated download APIs for permanent offline downloads instead of ad hoc caching.
- Artifact: `androidx.media3:media3-datasource` (`DefaultDataSource`, `DefaultHttpDataSource`); Cronet support is `androidx.media3:media3-datasource-cronet` (`androidx.media3.datasource.cronet.CronetDataSource`); OkHttp support is `androidx.media3:media3-datasource-okhttp`.

## Related

- [DataSource.Factory and Caching](./data-source-cache.md)
- [MediaSource and factories](./media-source.md)
- [Common Media Client Data (CMCD)](./cmcd.md)
