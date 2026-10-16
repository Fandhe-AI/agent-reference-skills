# Troubleshooting (ExoPlayer)

Common ExoPlayer playback problems and their fixes (cleartext HTTP, seeking, MPEG-TS, redirects, unrecognized formats, background audio, unstable API lint). Source: https://developer.android.com/media/media3/exoplayer/troubleshooting

## Signature / Usage

```kotlin
// Declare undeclared CEA-608 tracks in MPEG-TS
val extractorsFactory =
  DefaultExtractorsFactory()
    .setTsSubtitleFormats(
      listOf(
        Format.Builder()
          .setSampleMimeType(MimeTypes.APPLICATION_CEA608)
          .setAccessibilityChannel(accessibilityChannel)
          .build()
      )
    )
val player: Player =
  ExoPlayer.Builder(context, DefaultMediaSourceFactory(context, extractorsFactory)).build()
```

```kotlin
// Opt in to unstable Media3 API
import androidx.annotation.OptIn
import androidx.media3.common.util.UnstableApi

@OptIn(UnstableApi::class)
fun functionUsingUnstableApi() { ... }
```

## Options / Props

| Problem | Fix |
|---------|-----|
| "Cleartext HTTP traffic not permitted" | Apps targeting API 28+ disable cleartext by default. Use a Network Security Configuration permitting it, or `android:usesCleartextTraffic="true"` on `application`. |
| SSLHandshakeException / CertPathValidatorException / ERR_CERT_AUTHORITY_INVALID | Server SSL certificate problem, not ExoPlayer specific. |
| Media not seekable | ExoPlayer does not support seeking where only a full file scan allows accurate seeks. Convert to a better container; for MP3 / ADTS / AMR enable constant bitrate seeking. |
| Inaccurate seeking in MP3 | VBR MP3 is unsuitable for exact seeks. `FLAG_ENABLE_INDEX_SEEKING` via `DefaultExtractorsFactory.setMp3ExtractorFlags` scans the whole file (off by default; scales poorly). |
| Slow video seeks | Mitigate loading latency by buffering more or pre-caching to disk; mitigate decode latency with `ExoPlayer.setSeekParameters` or re-encoding with more frequent I-frames. |
| MPEG-TS fails to play (stuck buffering) | Missing AUDs or IDR keyframes. Use `FLAG_DETECT_ACCESS_UNITS` / `FLAG_ALLOW_NON_IDR_KEYFRAMES` via `DefaultExtractorsFactory.setTsExtractorFlags` or the `DefaultHlsExtractorFactory` constructor. |
| MPEG-TS subtitles not found | Provide expected subtitle formats via `DefaultExtractorsFactory.setTsSubtitleFormats` (see snippet). |
| MP4/FMP4 plays incorrectly (edit lists) | Set `Mp4Extractor.FLAG_WORKAROUND_IGNORE_EDIT_LISTS` / `FragmentedMp4Extractor.FLAG_WORKAROUND_IGNORE_EDIT_LISTS` via `setMp4ExtractorFlags` / `setFragmentedMp4ExtractorFlags`. |
| HTTP 301 / 302 failures | Cross-protocol redirects (HTTPS to HTTP or vice versa) are not followed by default; configure `DefaultHttpDataSource.Factory` to allow them. |
| `UnrecognizedInputFormatException` | Usually DASH / HLS / SmoothStreaming played as progressive: add the module dependency, or pass `MimeTypes.APPLICATION_MPD` / `APPLICATION_M3U8` / `APPLICATION_SS` to `setMimeType`. Otherwise the container is unsupported. |
| `setPlaybackParameters` choppy | Debug builds on Android M and earlier only; release builds are unaffected. |
| "Unexpected status line: ICY 200 OK" | Server sends a deprecated ICY status line; fix the server or use the ExoPlayer OkHttp library. |
| Background audio | Run a foreground service and hold a `WifiLock` and `WakeLock` (`setWakeMode` does it automatically); release them and stop the service when audio stops. |
| Cast library cannot play supported content | Content is probably not CORS enabled (required by Cast). |
| Content fails with no error | Add an `EventLogger` listener and look for `supported=NO_UNSUPPORTED_TYPE` in Logcat. |
| Decoding library not loading | Follow the library README (including NDK version and config flags), check for `.so` files, look for "Loaded FfmpegAudioRenderer" info log and `LibraryLoader` warnings. |
| Video stuttering | Content may exceed device decode capability; on Android 6.0 to 11 (API 23-30), particularly DRM or high-frame-rate content, try asynchronous buffer queueing. |
| Unstable API lint errors | Use a stable API, or annotate with `androidx.annotation.OptIn`. |

## Notes

- Query live state with the player's `isCurrentWindowLive` / `isCurrentWindowDynamic` (as named on the source page); current `Player` exposes these as `isCurrentMediaItemLive()` / `isCurrentMediaItemDynamic()`.
- ExoPlayer cannot play YouTube URLs such as `https://www.youtube.com/watch?v=...`; use the YouTube IFrame Player API.
- "Player is accessed on the wrong thread" errors: see "A note on threading" on the getting started page.
- Unstable API: Media3 guarantees binary compatibility only for a subset; the rest is marked `@UnstableApi` and generates lint error `UnsafeOptInUsageError` unless opted in. `@UnstableApi` implies nothing about quality or performance. Use `androidx.annotation.OptIn`, not `kotlin.OptIn`. Opt in whole packages with `@OptIn(UnstableApi::class)` in `package-info`, or whole projects in `lint.xml`:

```xml
<lint>
  <issue id="UnsafeOptInUsageError">
    <option name="opt-in" value="androidx.media3.common.util.UnstableApi" />
  </issue>
</lint>
```

## Related

- [Live Streaming](./live-streaming.md)
- [PlaybackException and Error Handling](./playback-exception.md)
- [Network Stacks](./network-stacks.md)
- [Progressive](./progressive.md)
- [Analytics](./analytics.md)
