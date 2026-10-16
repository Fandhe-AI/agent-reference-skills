# Surface types

How a Media3 `Player` connects its video output to a `Surface`, and how to choose between `SurfaceView` and `TextureView` (including `PlayerView` `surface_type` and Compose). Source: https://developer.android.com/media/media3/ui/surface

## Signature / Usage

```java
void setVideoSurface(@Nullable Surface surface)
void setVideoSurfaceHolder(@Nullable SurfaceHolder surfaceHolder)
void setVideoSurfaceView(@Nullable SurfaceView surfaceView)
void setVideoTextureView(@Nullable TextureView textureView)

void clearVideoSurface()
void clearVideoSurface(@Nullable Surface surface)
void clearVideoSurfaceHolder(@Nullable SurfaceHolder surfaceHolder)
void clearVideoSurfaceView(@Nullable SurfaceView surfaceView)
void clearVideoTextureView(@Nullable TextureView textureView)
```

## Options / Props

`PlayerView` `surface_type` attribute:

| Value | View | Description |
|-------|------|-------------|
| `surface_view` | `SurfaceView` | Preferred for regular video playback. |
| `texture_view` | `TextureView` | Use only if `SurfaceView` does not meet your needs. |
| `spherical_gl_surface_view` | `SphericalGLSurfaceView` | Spherical video playback. |
| `video_decoder_gl_surface_view` | `VideoDecoderGLSurfaceView` | Video rendering using extension renderers. |
| `none` | — | Audio playback only; avoids the cost of creating a surface. |

## Notes

- Compose (`media3-ui-compose`): `ContentFrame` and `PlayerSurface` composables link the `Player` to a `Surface` lifecycle-aware, with `androidx.media3.ui.compose.SURFACE_TYPE_SURFACE_VIEW` or `SURFACE_TYPE_TEXTURE_VIEW`. There is no `none` type (omit the composable instead).
- `SurfaceView` benefits over `TextureView`: lower power consumption on many devices, more accurate frame timing, higher quality HDR output, secure output for DRM-protected content, and full display resolution on Android TV devices that upscale the UI layer.
- Before Android 7.0 (API 24), `SurfaceView` was not properly synchronized with view animations or scrolling; use `TextureView` only when `SDK_INT` is less than 24 and `SurfaceView` otherwise if smooth animation or scrolling is required.
- A `SurfaceView` surface lifecycle follows view visibility, whereas a `TextureView` follows window attachment, so in scrolling UIs starting playback may take longer. From Android 14, `PlayerView` uses `SurfaceView.setSurfaceLifecycle(SURFACE_LIFECYCLE_FOLLOWS_ATTACHMENT)`; apps using `SurfaceView` directly may want to enable it. Before Android 14, translate views off-screen when recycling.
- On some Android TV devices the UI layer runs at lower resolution than the display; `SurfaceView` must be used for full resolution. Query it with `Util.getCurrentDisplayModeSize` (UI layer: `Display.getSize`).
- `PlayerView` inside `AndroidView` is not guaranteed compatible (common problem on `SDK_INT == 34`: stretched/cropped/leaked Surface not matching `AspectRatioFrameLayout`). `PlayerView.setEnableComposeSurfaceSyncWorkaround` opts into a workaround, but it causes issues with XML-based shared transitions.
- Compose `AndroidExternalSurface` / `AndroidEmbeddedExternalSurface` (`androidx.compose.foundation`) limit access to the underlying views the `Player` needs for the full surface lifecycle.

## Related

- [PlayerView](./player-view.md)
- [Compose UI](./compose-ui.md)
- [Player](./player.md)
- [Android TV](./android-tv.md)
