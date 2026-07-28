# Image

Composable that lays out and draws a given `ImageBitmap`, `ImageVector`, or `Painter` on screen. This is the primary API for displaying graphics in Compose.

## Signature / Usage

```kotlin
@Composable
fun Image(
    painter: Painter,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    alignment: Alignment = Alignment.Center,
    contentScale: ContentScale = ContentScale.Fit,
    alpha: Float = DefaultAlpha,
    colorFilter: ColorFilter? = null,
)

@Composable
fun Image(
    bitmap: ImageBitmap,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    alignment: Alignment = Alignment.Center,
    contentScale: ContentScale = ContentScale.Fit,
    alpha: Float = DefaultAlpha,
    colorFilter: ColorFilter? = null,
    filterQuality: FilterQuality = DefaultFilterQuality,
)

@Composable
fun Image(
    imageVector: ImageVector,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    alignment: Alignment = Alignment.Center,
    contentScale: ContentScale = ContentScale.Fit,
    alpha: Float = DefaultAlpha,
    colorFilter: ColorFilter? = null,
)
```

```kotlin
Image(
    painter = painterResource(id = R.drawable.dog),
    contentDescription = stringResource(id = R.string.dog_content_description),
    contentScale = ContentScale.Crop,
    modifier = Modifier.size(150.dp)
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `painter` / `bitmap` / `imageVector` | `Painter` / `ImageBitmap` / `ImageVector` | — | Content to draw, one per overload. |
| `contentDescription` | `String?` | — | Accessibility text for screen readers; pass `null` for purely decorative images. |
| `modifier` | `Modifier` | `Modifier` | Applied to this image. |
| `alignment` | `Alignment` | `Alignment.Center` | Alignment of the source within the destination bounds. |
| `contentScale` | `ContentScale` | `ContentScale.Fit` | How to scale the source to fit the destination bounds. |
| `alpha` | `Float` | `DefaultAlpha` | Opacity applied to the drawn image, `0f`..`1f`. |
| `colorFilter` | `ColorFilter?` | `null` | Optional color filter applied when drawing. |
| `filterQuality` | `FilterQuality` | `DefaultFilterQuality` | Sampling algorithm applied when the bitmap is scaled (`bitmap` overload only). |

## Notes

- This is the Jetpack Compose (Kotlin, `androidx.compose.foundation` / `androidx.compose.ui.graphics`) API — distinct from the same-named SwiftUI / Ark UI / Chakra UI / fandhe-frontend API.
- Package: `androidx.compose.foundation`.
- Never call `Modifier.wrapContentSize()` on an `Image` loading a remote/large bitmap; set explicit dimensions (e.g. `Modifier.size(...)`) to avoid unconstrained layout passes.
- Prefer accepting an `Int` drawable resource ID or a URL `String` as a composable parameter over a `Painter`; `Painter` is not `@Stable` and can cause unnecessary recompositions.
- Use `Icon` (from `android-compose-components` `feedback` category) instead of `Image` for small, tintable, single-color glyphs that follow Material guidelines.

## Related

- [painterResource](./painterresource.md)
- [ImageBitmap](./imagebitmap.md)
- [ImageVector](./imagevector.md)
- [ContentScale](./contentscale.md)
- [ColorFilter](./colorfilter.md)
- [AsyncImage](./asyncimage.md)
