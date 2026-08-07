# Common Media Client Data (CMCD)

Per-request CMCD headers/query params that let an ExoPlayer client report player state to a CDN, based on the CTA-5004 specification. Only supported for adaptive streaming formats (DASH, HLS, SmoothStreaming); progressive downloads are not supported.

## Signature / Usage

```kotlin
// Default configuration: transmits CMCD data as custom HTTP request headers.
val mediaSourceFactory =
  DefaultMediaSourceFactory(context)
    .setCmcdConfigurationFactory(CmcdConfiguration.Factory.DEFAULT)

val player =
  ExoPlayer.Builder(context)
    .setMediaSourceFactory(mediaSourceFactory)
    .build()
```

```kotlin
// Custom configuration: filter keys, add custom data, choose query-param mode.
val cmcdConfigurationFactory =
  CmcdConfiguration.Factory { mediaItem ->
    val cmcdRequestConfig =
      object : CmcdConfiguration.RequestConfig {
        override fun isKeyAllowed(key: String): Boolean = key == "br" || key == "bl"

        override fun getCustomData():
          ImmutableListMultimap<@CmcdConfiguration.HeaderKey String, String> =
          ImmutableListMultimap.of(CmcdConfiguration.KEY_CMCD_OBJECT, "key1=stringValue")

        override fun getRequestedMaximumThroughputKbps(throughputKbps: Int): Int =
          5 * throughputKbps
      }

    CmcdConfiguration(
      /* sessionId= */ UUID.randomUUID().toString(),
      /* contentId= */ UUID.randomUUID().toString(),
      cmcdRequestConfig,
      CmcdConfiguration.MODE_QUERY_PARAMETER,
    )
  }

val mediaSourceFactory =
  DefaultMediaSourceFactory(context).setCmcdConfigurationFactory(cmcdConfigurationFactory)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isKeyAllowed` | `(String) -> Boolean` | all keys allowed | Filters which CMCD keys are included in a request (`CmcdConfiguration.RequestConfig`). |
| `getCustomData` | `() -> ImmutableListMultimap<HeaderKey, String>` | empty | Adds custom key-value pairs to a CMCD type (`CMCD-Request`/`Object`/`Status`/`Session`). |
| `getRequestedMaximumThroughputKbps` | `(Int) -> Int` | measured throughput | Overrides the `mtp` (measured throughput) value reported. |
| `mode` | `MODE_REQUEST_HEADER` \| `MODE_QUERY_PARAMETER` | `MODE_REQUEST_HEADER` | Transmission method: custom HTTP headers (e.g. `CMCD-Session:sid="..."`) or a `?CMCD=` URL query parameter. |

## Notes

- CMCD data keys are grouped into four categories: `CMCD-Request` (varies per request), `CMCD-Object` (varies per requested object), `CMCD-Status` (rarely varies), `CMCD-Session` (invariant over the session).
- Set the `CmcdConfiguration.Factory` on `DefaultMediaSourceFactory`/`MediaSource.Factory`, not directly on the player.
- Artifact: `androidx.media3:media3-exoplayer` (`androidx.media3.exoplayer.upstream.CmcdConfiguration`).

## Related

- [MediaSource and factories](./media-source.md)
- [DataSource.Factory and Caching](./data-source-cache.md)
- [Network Stacks](./network-stacks.md)
