# DynamicRange

Represents the dynamic range of an image: an encoding (SDR, HLG, HDR10, HDR10+, Dolby Vision) paired with a bit depth (8-bit or 10-bit). Used to request HDR video capture on use cases such as `Preview` and video recording.

## Signature / Usage

```kotlin
val previewBuilder = Preview.Builder()
    .setDynamicRange(DynamicRange.HLG_10_BIT)

val supported = cameraInfo.querySupportedDynamicRanges(setOf(DynamicRange.HDR_UNSPECIFIED_10_BIT))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `SDR` | `DynamicRange` | — | 8-bit standard dynamic range. |
| `HDR_UNSPECIFIED_10_BIT` | `DynamicRange` | — | 10-bit HDR with encoding left to the device to decide. |
| `HLG_10_BIT` | `DynamicRange` | — | 10-bit HDR, Hybrid Log Gamma encoding. |
| `HDR10_10_BIT` | `DynamicRange` | — | 10-bit HDR, HDR10 encoding. |
| `HDR10_PLUS_10_BIT` | `DynamicRange` | — | 10-bit HDR, HDR10+ encoding. |
| `DOLBY_VISION_10_BIT` | `DynamicRange` | — | 10-bit HDR, Dolby Vision encoding. |
| `DOLBY_VISION_8_BIT` | `DynamicRange` | — | 8-bit HDR, Dolby Vision encoding. |
| `getEncoding()` | `Int` | — | The dynamic range encoding constant. |
| `getBitDepth()` | `Int` | — | The bit depth (8 or 10). |

## Notes

- This is Android CameraX (Kotlin, `androidx.camera`) — distinct from the same-named AVFoundation / Three.js / Blender API.
- No `Builder`; use the predefined constants or the public constructor directly.
- Query actual device support with `CameraInfo.querySupportedDynamicRanges()` before requesting a specific `DynamicRange`.
- Artifact: `androidx.camera:camera-core`.

## Related

- [CameraInfo](./camera-info.md)
