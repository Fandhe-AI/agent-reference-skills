# images

| Name | Description | Path |
|------|-------------|------|
| AnimatedImageVector / rememberAnimatedVectorPainter | Plays back an `AnimatedVectorDrawable` XML resource in Compose. `AnimatedImageVector.animatedVectorResource()` loads the resource, and `rememberAnimatedVectorPainter()` produces a `Painter` that animates between its start and end state whenever the `atEnd` boolean flips. | [animatedimagevector.md](./animatedimagevector.md) |
| AsyncImage | Composable from the third-party Coil library that asynchronously loads a remote or local image (with in-flight caching) and draws it like `Image`. The official Compose documentation recommends Coil (or Glide) for network image loading rather than a bundled Compose API. | [asyncimage.md](./asyncimage.md) |
| BitmapPainter | `Painter` implementation that draws an `ImageBitmap` into the provided canvas. Returned automatically by `painterResource()` for rasterized (PNG/JPEG/WEBP) drawable resources. | [bitmappainter.md](./bitmappainter.md) |
| ColorFilter | Transforms the color of each pixel drawn by an `Image`, `Painter`, or `DrawScope` operation. `tint()` blends a single color in; `colorMatrix()` applies a general 4x5 color transform. | [colorfilter.md](./colorfilter.md) |
| ColorPainter | `Painter` implementation that fills the provided bounds with a single solid color. | [colorpainter.md](./colorpainter.md) |
| ContentScale | Determines how a source (image, painter) is scaled to fit the destination bounds when the aspect ratios of source and destination differ. | [contentscale.md](./contentscale.md) |
| Icons (Material icon set) | Predefined set of `ImageVector` constants (`Icons.Filled.*`, `Icons.Outlined.*`, etc.) drawable with `Image` or `Icon`, without manually importing SVG/XML assets. | [icons.md](./icons.md) |
| Image | Composable that lays out and draws a given `ImageBitmap`, `ImageVector`, or `Painter` on screen. This is the primary API for displaying graphics in Compose. | [image.md](./image.md) |
| ImageBitmap / imageResource | `ImageBitmap` is the low-level, platform-agnostic bitmap type used by Compose graphics APIs. `ImageBitmap.imageResource()` loads one from an Android drawable resource. | [imagebitmap.md](./imagebitmap.md) |
| ImageVector | Vector graphic representation in Compose (analogous to Android's `VectorDrawable`), built as a tree of path/group nodes. Drawn via `rememberVectorPainter()` or directly with the `Image(imageVector = ...)` overload. | [imagevector.md](./imagevector.md) |
| Modifier.paint | Draws a `Painter` (including a custom `Painter` subclass) into the composable it is chained on, without wrapping it in an `Image` composable. | [modifierpaint.md](./modifierpaint.md) |
| Painter | Abstraction for something that can be drawn into a bounded area. Unlike a `DrawModifier`, a `Painter` can influence the measurement and layout of the composable it is applied to (via `intrinsicSize`), making it a replacement for Android's `Drawable` API in Compose. | [painter.md](./painter.md) |
| painterResource | Creates a `Painter` from an Android drawable resource ID, automatically loading either a `BitmapPainter` for rasterized assets (PNG/JPEG/WEBP) or a `VectorPainter` for `VectorDrawable` XML assets. | [painterresource.md](./painterresource.md) |
| rememberVectorPainter | Creates and remembers a `VectorPainter`, either from an existing `ImageVector` or from a manually-defined `Group`/`Path` sub-composition. | [remembervectorpainter.md](./remembervectorpainter.md) |
