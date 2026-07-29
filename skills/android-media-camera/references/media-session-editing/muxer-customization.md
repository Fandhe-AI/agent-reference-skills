# Muxer / Muxer.Factory (Transformer output customization)

Pluggable output-container writer for `Transformer`. `Transformer.Builder.setMuxerFactory()` swaps the `Muxer.Factory` used to write the output container: the default in-app MP4 muxer, a fragmented-MP4 muxer, the platform `MediaMuxer`, or a fully custom `Muxer` implementation.

## Signature / Usage

```kotlin
val transformer = Transformer.Builder(context)
    .setMuxerFactory(InAppMp4Muxer.Factory())
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setMuxerFactory(muxerFactory)` | `Muxer.Factory` | `DefaultMuxer.Factory()` | Sets the factory used to create the `Muxer` that writes the output container. |
| `DefaultMuxer.Factory()` | — | wraps `InAppMp4Muxer.Factory` | Transformer's default; produces MP4 via the in-app `Mp4Muxer` (not the platform `MediaMuxer`). |
| `InAppMp4Muxer.Factory` | `Muxer.Factory` | — | Wraps `androidx.media3.muxer.Mp4Muxer` (from `media3-muxer`). `setVideoDurationUs()`, `setAttemptStreamableOutputEnabled()` (default `true`), `setFreeSpaceAfterFileTypeBoxBytes()`. |
| `InAppFragmentedMp4Muxer.Factory` | `Muxer.Factory` | — | Wraps `androidx.media3.muxer.FragmentedMp4Muxer`, producing fragmented ("fMP4") output; constructor accepts an optional `fragmentDurationMs`. |
| `FrameworkMuxer.Factory` | `Muxer.Factory` | — | Wraps the platform `android.media.MediaMuxer`. Codec support is tied to the device's API level (e.g. H.265 needs API 24+, AV1 needs API 34+), unlike the in-app muxers which are API-independent. |
| `Muxer.Factory.create(path)` | `(String) -> Muxer` | — | Creates a `Muxer` instance for the given output path. |
| `Muxer.Factory.getSupportedSampleMimeTypes(trackType)` | — | — | Reports which MIME types the muxer can write for a track type. |
| `Muxer` (`addTrack`, `writeSampleData`, `addMetadataEntry`, `close`) | interface | — | Implement this (`androidx.media3.muxer.Muxer`) to plug in a fully custom container writer at the application level. |

## Notes

- Package: `Muxer`, `Mp4Muxer`, `FragmentedMp4Muxer` live in `androidx.media3.muxer` (module `libraries/muxer`, published by convention as `androidx.media3:media3-muxer`, matching the `androidx.media3:media3-<module>` pattern of the confirmed `media3-transformer` / `media3-effect` artifacts); the `InAppMp4Muxer` / `InAppFragmentedMp4Muxer` / `FrameworkMuxer` adapters that implement `Muxer` for `Transformer` live in `androidx.media3.transformer` (`media3-transformer`).
- Since Media3 1.9.0, `DefaultMuxer.Factory()`'s no-arg constructor builds an `InAppMp4Muxer.Factory` by default ("Use InAppMp4Muxer as default muxer"). `FrameworkMuxer` (wraps the platform `android.media.MediaMuxer`; codec support is tied to the device API level, e.g. H.265 needs API 24+, AV1 needs API 34+) remains available via `setMuxerFactory()` for apps that specifically want the platform muxer.
- `InAppMuxer` was split into `InAppMp4Muxer` (non-fragmented MP4) and `InAppFragmentedMp4Muxer` (fragmented MP4); there is no single `InAppMuxer` class in current releases.
- To inject a fully custom container writer, implement the `Muxer` interface and pass a factory that returns it to `setMuxerFactory()`.
- All classes are `@UnstableApi`.

## Related

- [Transformer](./transformer.md)
