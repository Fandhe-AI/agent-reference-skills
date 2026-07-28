# Customization (DefaultRenderersFactory, DefaultLoadControl)

ExoPlayer's component-based architecture lets each stage of playback — rendering, buffering, load error handling, data loading — be swapped or tuned via injectable factories passed to `ExoPlayer.Builder`.

## Signature / Usage

```kotlin
// Enable async MediaCodec buffer queueing (reduces dropped frames/audio underruns).
val renderersFactory = DefaultRenderersFactory(context).forceEnableMediaCodecAsynchronousQueueing()
val exoPlayer = ExoPlayer.Builder(context, renderersFactory).build()

// Tune buffering thresholds.
val loadControl =
  DefaultLoadControl.Builder()
    .setBufferDurationsMs(
      /* minBufferMs= */ 15_000,
      /* maxBufferMs= */ 50_000,
      /* bufferForPlaybackMs= */ 1_500,
      /* bufferForPlaybackAfterRebufferMs= */ 3_000,
    )
    .build()
val player = ExoPlayer.Builder(context).setLoadControl(loadControl).build()
```

```java
public DefaultRenderersFactory(Context context)
public final DefaultRenderersFactory setExtensionRendererMode(@ExtensionRendererMode int extensionRendererMode)
public final DefaultRenderersFactory setEnableDecoderFallback(boolean enableDecoderFallback)
public final DefaultRenderersFactory forceEnableMediaCodecAsynchronousQueueing()
public final DefaultRenderersFactory setMediaCodecSelector(MediaCodecSelector mediaCodecSelector)

public Builder setBufferDurationsMs(int minBufferMs, int maxBufferMs, int bufferForPlaybackMs, int bufferForPlaybackAfterRebufferMs)
public Builder setPrioritizeTimeOverSizeThresholds(boolean prioritizeTimeOverSizeThresholds)
public Builder setBackBuffer(int backBufferDurationMs, boolean retainBackBufferFromKeyframe)
public DefaultLoadControl build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `extensionRendererMode` | `@ExtensionRendererMode int` | `EXTENSION_RENDERER_MODE_OFF` | Enables/prefers software-decoder extension renderers (e.g. FFmpeg audio). |
| `enableDecoderFallback` | `boolean` | `false` | Falls back to another decoder if the preferred one fails to initialize. |
| `minBufferMs` / `maxBufferMs` | `int` | `50_000` / `50_000` | Min/max media duration buffered ahead of playback position. |
| `bufferForPlaybackMs` | `int` | `1_000` | Buffer required to resume playback after buffering starts. |
| `bufferForPlaybackAfterRebufferMs` | `int` | `2_000` | Buffer required to resume playback after a rebuffer. |
| `backBufferDurationMs` | `int` | `0` | Duration of already-played media retained in the buffer, for seeking backward without reloading. |

## Notes

- Beyond `RenderersFactory` and `LoadControl`, ExoPlayer also supports injecting a custom `TrackSelector`, `Extractor`, `MediaSource`/`MediaSource.Factory`, and `DataSource` for full control over decoding, buffering, demuxing, and network/cache behavior.
- Custom request headers or URI resolution: wrap a `DataSource.Factory` or use `ResolvingDataSource.Factory(upstream) { dataSpec -> ... }` — see [Data sources and caching](./data-source-cache.md).
- Custom retry/back-off: implement `LoadErrorHandlingPolicy` (commonly by extending `DefaultLoadErrorHandlingPolicy`) and set it on `DefaultMediaSourceFactory.setLoadErrorHandlingPolicy`.
- `ForwardingSimpleBasePlayer` allows wrapping an existing `Player` to intercept operations (e.g. custom play/pause logic) or restrict available commands.
- Asynchronous buffer queueing is enabled by default on Android 12+; enabling it manually on older versions can reduce dropped frames and audio underruns, and helps with DRM-related stuttering.
- Artifact: `androidx.media3:media3-exoplayer`.

## Related

- [ExoPlayer](./exoplayer.md)
- [Data sources and caching](./data-source-cache.md)
- [MediaSource and factories](./media-source.md)
