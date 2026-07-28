# painterResource

Creates a `Painter` from an Android drawable resource ID, automatically loading either a `BitmapPainter` for rasterized assets (PNG/JPEG/WEBP) or a `VectorPainter` for `VectorDrawable` XML assets.

## Signature / Usage

```kotlin
@Composable
fun painterResource(@DrawableRes id: Int): Painter
```

```kotlin
Image(
    painter = painterResource(id = R.drawable.dog),
    contentDescription = stringResource(id = R.string.dog_content_description)
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `Int` (`@DrawableRes`) | — | Drawable resource ID to load. |

## Notes

- Supports `AnimatedVectorDrawable`, `BitmapDrawable` (PNG/JPG/WEBP), `ColorDrawable`, and `VectorDrawable`; API-level `Drawable` subclasses beyond these are not supported.
- Package: `androidx.compose.ui.res`.
- Use `ImageBitmap.imageResource()` instead when low-level `ImageBitmap`-specific functionality is required.

## Related

- [Image](./image.md)
- [ImageBitmap](./imagebitmap.md)
- [Painter](./painter.md)
