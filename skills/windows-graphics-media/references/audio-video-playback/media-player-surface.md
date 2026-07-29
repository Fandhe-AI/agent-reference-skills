# MediaPlayerSurface

Provides access to an `ICompositionSurface` that is shared between a `MediaPlayer` and a `Compositor` to enable rendering `MediaPlayer` content using the `Windows.UI.Composition` APIs without requiring the XAML framework (i.e. without `MediaPlayerElement`).

## Signature / Usage

```csharp
// Windows.UI.Composition path (no XAML) — typically inside a CoreWindow/DirectComposition host
Compositor compositor = new Compositor();

var mediaPlayer = new MediaPlayer();
mediaPlayer.Source = MediaSource.CreateFromUri(new Uri("https://example.com/video.mp4"));

// Default surface size is 640x480; call SetSurfaceSize before GetSurface to change it.
mediaPlayer.SetSurfaceSize(new Size(1920, 1080));
MediaPlayerSurface mediaPlayerSurface = mediaPlayer.GetSurface(compositor);

SpriteVisual videoVisual = compositor.CreateSpriteVisual();
videoVisual.Size = new System.Numerics.Vector2(1920, 1080);
videoVisual.Brush = compositor.CreateSurfaceBrush(mediaPlayerSurface.CompositionSurface);

// Attach videoVisual as a child of the app's root ContainerVisual, then:
mediaPlayer.Play();

// Cleanup
mediaPlayerSurface.Close(); // or mediaPlayerSurface.Dispose()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CompositionSurface` | `ICompositionSurface` | The surface painted with the player's video content; assign it to a `CompositionSurfaceBrush` on a `SpriteVisual`. |
| `Compositor` | `Compositor` | The `Compositor` instance the surface is bound to (the one passed to `GetSurface`). |
| `MediaPlayer` | `MediaPlayer` | The `MediaPlayer` this surface renders content from. |
| `Close()` | method | Closes the surface and releases associated resources (implements `IClosable`). |
| `Dispose()` | method | .NET `IDisposable` equivalent of `Close()`. |
| `MediaPlayer.GetSurface(Compositor)` | method returning `MediaPlayerSurface` | Creates the surface for the given compositor; can be called multiple times on the same `MediaPlayer` to obtain multiple independent surfaces. |
| `MediaPlayer.SetSurfaceSize(Size)` | method | Sets the pixel size of the surface `GetSurface` will return; must be called before `GetSurface` to take effect (default is 640x480). |

## Notes

- Namespace: `Windows.Media.Playback` (introduced in Windows 10 Anniversary Update, 10.0.14393.0, `Windows.Foundation.UniversalApiContract` v3). `MediaPlayerSurface` is sealed and implements `IClosable`/`IDisposable`.
- The `ICompositionSurface`/`Compositor` types it works with are `Windows.UI.Composition` (the UWP composition namespace), not `Microsoft.UI.Composition` (the Windows App SDK / WinUI 3 namespace documented in this skill's composition-visuals category) — the two are structurally similar but distinct types and are not interchangeable.
- This is the non-XAML counterpart to `MediaPlayerElement`: use `MediaPlayerElement` for ordinary XAML/WinUI 3 apps, and `MediaPlayer.GetSurface`/`MediaPlayerSurface` only when video must be composited directly onto a `Windows.UI.Composition` visual tree without a XAML element (e.g. a Win32/DirectComposition host, or custom compositing alongside other `ICompositionSurface` content).
- Obtain an instance only via `MediaPlayer.GetSurface(Compositor)` — there is no public constructor.

## Related

- [MediaPlayer](./media-player.md)
- [MediaPlayerElement](./media-player-element.md)
