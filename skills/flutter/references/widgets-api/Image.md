---
source: https://api.flutter.dev/flutter/widgets/Image-class.html
---

# Image class

A widget that displays an image. (inherits `Object` > `DiagnosticableTree` > `Widget` > `StatefulWidget`)

## Signature / Usage

```dart
const Image(
  image: NetworkImage('https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg'),
)
```

Shortcut constructor for a network image:

```dart
Image.network('https://flutter.github.io/assets-for-api-docs/assets/widgets/owl-2.jpg')
```

Pausing a multiframe image using `TickerMode`:

```dart
TickerMode(
  enabled: !isPaused,
  child: Image(image: myAnimatedGif),
),
```

## Options / Props

Constructors provided for the various ways an image can be specified:

| Constructor | Source |
| --- | --- |
| `Image.new` | an `ImageProvider` |
| `Image.asset` | an `AssetBundle` using a key |
| `Image.network` | a URL |
| `Image.file` | a `File` |
| `Image.memory` | a `Uint8List` |

Named parameters of `Image.new` (`image` is the image to display, an `ImageProvider<Object>`):

`key`, `image`, `frameBuilder`, `loadingBuilder`, `errorBuilder`, `semanticLabel`, `excludeFromSemantics = false`, `width`, `height`, `color`, `opacity`, `colorBlendMode`, `fit`, `alignment = Alignment.center`, `repeat = ImageRepeat.noRepeat`, `centerSlice`, `matchTextDirection = false`, `gaplessPlayback = false`, `isAntiAlias = false`, `filterQuality = FilterQuality.medium`.

`Image.asset` additionally takes `name` (positional), `bundle`, `scale`, `package`, `cacheWidth`, `cacheHeight` (no `loadingBuilder`). `Image.network` additionally takes `src` (positional), `scale = 1.0`, `headers`, `cacheWidth`, `cacheHeight`, `webHtmlElementStrategy = WebHtmlElementStrategy.never`. `Image.file` and `Image.memory` take `scale = 1.0`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| image | ImageProvider&lt;Object&gt; | required | The image to display. |
| frameBuilder | ImageFrameBuilder? | — | A builder function responsible for creating the widget that represents this image. |
| loadingBuilder | ImageLoadingBuilder? | — | A builder that specifies the widget to display to the user while an image is still loading. |
| errorBuilder | ImageErrorWidgetBuilder? | — | A builder function that is called if an error occurs during image loading. |
| semanticLabel | String? | — | A Semantic description of the image. |
| excludeFromSemantics | bool | false | Whether to exclude this image from semantics. |
| opacity | Animation&lt;double&gt;? | — | If non-null, the value from the `Animation` is multiplied with the opacity of each image pixel before painting onto the canvas. |
| fit | BoxFit? | — | How to inscribe the image into the space allocated during layout. |
| alignment | AlignmentGeometry | Alignment.center | Alignment of the image within its bounds. |
| repeat | ImageRepeat | ImageRepeat.noRepeat | How to paint any portions of the layout bounds not covered by the image. |
| centerSlice | Rect? | — | The center slice for a nine-patch image. |
| matchTextDirection | bool | false | Whether to paint the image in the direction of the `TextDirection`. |
| gaplessPlayback | bool | false | Whether to continue showing the old image (true), or briefly show nothing (false), when the image provider changes. |
| isAntiAlias | bool | false | Whether to paint the image with anti-aliasing. |
| filterQuality | FilterQuality | FilterQuality.medium | The rendering quality of the image. |
| cacheWidth / cacheHeight | — | — | (`Image.asset`, `Image.network`, `Image.file`, `Image.memory`) custom decode size; the engine decodes and stores the image at the specified size instead of the natural size. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name. Not to be confused with the `Image` class in the `dart:ui` library.
- Supported image formats: JPEG, PNG, GIF, Animated GIF, WebP, Animated WebP, BMP, and WBMP. Additional formats may be supported by the underlying platform; Flutter attempts to call the platform API to decode unrecognized formats.
- For pixel-density-aware asset resolution, specify the image using an `AssetImage` and make sure that a `MaterialApp`, `WidgetsApp`, or `MediaQuery` widget exists above the `Image` widget in the tree. The image is painted using `paintImage`.
- Multiframe images such as animated GIFs are paused when `TickerMode` is disabled, and when animations are disabled via `MediaQueryData.disableAnimations` (e.g., for accessibility). If paused when the image first loads, the first frame is displayed and the animation then stops.
- Memory usage: the image is stored in memory in uncompressed form; a 4K image (3840x2160) uses over 30MB of RAM (32 bits per pixel), and images cached in `ImageCache` can use memory longer than they are displayed. `cacheWidth` and `cacheHeight` reduce this: a 4K image rendered at only 384x216 would use only 330KB (a 100-fold reduction).
- Custom image providers: the page includes a full example (DartPad sample `widgets.Image.4`) of a `CustomNetworkImage extends ImageProvider<Uri>` that passes all `ImageConfiguration` information (locale, platform, size, etc.) to the server using query arguments in the image URL; it overrides `obtainKey` and `loadImage`.
- See also `Icon` (shows an image from a font), `Ink.image` (preferred way to show an image in a material application, especially if the image is in a `Material` and will have an `InkWell` on top), and the cookbook pages "Display images from the internet" and "Fade in images with a placeholder".

## Related

- [Container](./Container.md)
- [MediaQuery](./MediaQuery.md)
- [LayoutBuilder](./LayoutBuilder.md)
