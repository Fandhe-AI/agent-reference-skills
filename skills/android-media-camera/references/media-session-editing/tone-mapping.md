# Tone mapping (HDR to SDR)

Converts HDR video to SDR during a `Transformer`/`Composition` export, needed when mixing HDR and SDR assets or targeting devices/outputs that only support SDR. Requested via `Composition.Builder.setHdrMode()`.

## Signature / Usage

```kotlin
val composition = Composition.Builder(videoSequence)
    .setHdrMode(Composition.HDR_MODE_TONE_MAP_HDR_TO_SDR_USING_OPEN_GL)
    .build()
```

## Options / Props

| Name (`HDR_MODE_*`) | Min API | Description |
|------|---------|-------------|
| `HDR_MODE_KEEP_HDR` | — | Default. Keeps output in HDR; falls back automatically to `HDR_MODE_TONE_MAP_HDR_TO_SDR_USING_OPEN_GL` if the device can't produce HDR output. |
| `HDR_MODE_TONE_MAP_HDR_TO_SDR_USING_MEDIACODEC` | 31 (33 for HDR-capture devices) | Best visual quality; throws `ExportException` on unsupported devices. |
| `HDR_MODE_TONE_MAP_HDR_TO_SDR_USING_OPEN_GL` | 29 | Wider device support with good, consistent quality; small visual differences vs. the MediaCodec path. |
| `HDR_MODE_EXPERIMENTAL_FORCE_INTERPRET_HDR_AS_SDR` | — | Broadest compatibility fallback; reinterprets HDR samples as SDR, producing washed-out, incorrect colors. Last resort only. |

## Notes

- Package/artifact: `androidx.media3:media3-transformer`.
- Set on `Composition.Builder`, not on `Transformer.Builder` or `EditedMediaItem.Builder`.
- Prefer `HDR_MODE_TONE_MAP_HDR_TO_SDR_USING_MEDIACODEC` when device support is confirmed for best quality; otherwise `HDR_MODE_TONE_MAP_HDR_TO_SDR_USING_OPEN_GL` is the practical default for broad compatibility.
- SDR-to-HDR tone mapping is not supported, nor is a sequence that starts with an HDR asset when mixing HDR/SDR content in one `Composition`.

## Related

- [Composition / EditedMediaItemSequence](./composition.md)
- [Transformer](./transformer.md)
