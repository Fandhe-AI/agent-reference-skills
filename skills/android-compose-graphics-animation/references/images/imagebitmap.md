# ImageBitmap / imageResource

`ImageBitmap` is the low-level, platform-agnostic bitmap type used by Compose graphics APIs. `ImageBitmap.imageResource()` loads one from an Android drawable resource.

## Signature / Usage

```kotlin
@Composable
fun ImageBitmap.Companion.imageResource(@DrawableRes id: Int): ImageBitmap

fun ImageBitmap.Companion.imageResource(res: Resources, @DrawableRes id: Int): ImageBitmap
```

```kotlin
val imageBitmap = ImageBitmap.imageResource(id = R.drawable.dog)
imageBitmap.prepareToDraw()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `Int` (`@DrawableRes`) | — | Drawable resource ID to decode. |
| `res` | `Resources` | — | Resources to load the drawable from (non-composable overload). |

## Notes

- Package: `androidx.compose.ui.res` (`imageResource`), `androidx.compose.ui.graphics` (`ImageBitmap`).
- Intended for low-level `ImageBitmap`-specific functionality; use the type-agnostic `painterResource()` instead when simply displaying an image on screen.
- Call `ImageBitmap.prepareToDraw()` before drawing a manually-held `ImageBitmap` to let the GPU upload the texture ahead of the draw call; most image-loading libraries already do this automatically.
- Choosing `RGB_565` over the default `ARGB_8888` pixel format halves memory usage when transparency is not needed.
- See the official "Image bitmap versus image vector" guide for a detailed comparison of when to prefer `ImageBitmap` over `ImageVector`.

## Related

- [painterResource](./painterresource.md)
- [BitmapPainter](./bitmappainter.md)
- [ImageVector](./imagevector.md)
