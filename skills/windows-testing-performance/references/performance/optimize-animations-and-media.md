# Optimize animations, media, and images

Techniques for smooth animations (independent vs. dependent), efficient media playback, and image decode/memory optimization in WinUI apps.

## Signature / Usage

```xaml
<!-- Right-sized image decoding: decode at display size, not native size -->
<Image>
  <Image.Source>
    <BitmapImage UriSource="ms-appx:///Assets/highresCar.jpg"
                 DecodePixelWidth="300" DecodePixelHeight="200"/>
  </Image.Source>
</Image>
```

## Options / Props

| Concept | Description |
|---------|-------------|
| Independent animations | Run on the composition thread (key-frame animations, `Canvas.Left/Top`, `Opacity`, `SolidColorBrush.Color`, `RenderTransform`/`Transform3D`/`Projection`/`Clip` subproperties) — stay smooth regardless of UI thread load |
| Dependent animations | Affect layout (e.g. `Width`/`Height`); require UI-thread involvement and opt-in via `EnableDependentAnimation`; stutter if the UI thread is busy |
| `CacheMode="BitmapCache"` | Rasterizes an element to a bitmap once and reuses it per frame instead of overdrawing; converts independent animations on that element into dependent ones (re-rasterized each frame) |
| `DecodePixelWidth` / `DecodePixelHeight` | Decode an image at its on-screen size instead of native resolution, saving memory (up to 4 bytes/pixel) and CPU |

## Notes

- Don't animate `WebView2` or `MediaPlayerElement` directly — animate surrounding WinUI chrome instead.
- Use `MediaPlayerElement.IsFullWindow` for full-screen playback to enable system-level playback optimizations; avoid overlaying XAML on non-full-window video.
- Call `DisplayRequest.RequestActive` / `RequestRelease` around active playback to control display sleep without wasting power.
- Right-sized automatic decoding is disabled if: the `BitmapImage` is attached to the tree after `SetSourceAsync`/`UriSource` is set, synchronous `SetSource` is used, the element is hidden (`Opacity="0"`/`Visibility="Collapsed"`), `Stretch="None"`, `NineGrid` is used, or `CacheMode="BitmapCache"` is set.
- Prefer H.264 video / AAC or MP3 audio / MP4 container for local playback (best hardware-acceleration support); use uncompressed PCM WAV for low-latency short audio effects (e.g. games).

## Related

- [Keep the UI thread responsive](./keep-ui-thread-responsive.md)
- [Optimize your XAML layout](./optimize-xaml-layout.md)
