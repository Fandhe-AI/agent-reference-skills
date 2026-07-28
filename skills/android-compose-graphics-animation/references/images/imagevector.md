# ImageVector

Vector graphic representation in Compose (analogous to Android's `VectorDrawable`), built as a tree of path/group nodes. Drawn via `rememberVectorPainter()` or directly with the `Image(imageVector = ...)` overload.

## Signature / Usage

```kotlin
Image(
    imageVector = Icons.Filled.Favorite,
    contentDescription = "Favorite"
)
```

## Notes

- Package: `androidx.compose.ui.graphics.vector`.
- `painterResource()` returns a `VectorPainter` (which wraps an `ImageVector`) automatically when the drawable resource is a `VectorDrawable` XML asset.
- See the official "Image bitmap versus image vector" guide for guidance on choosing `ImageVector` (scalable, small footprint, good for icons) over `ImageBitmap` (raster photos).
- `Icons` (`androidx.compose.material.icons`) exposes a predefined set of Material `ImageVector`s; see the [Icons](./icons.md) page.

## Related

- [rememberVectorPainter](./remembervectorpainter.md)
- [Icons](./icons.md)
- [ImageBitmap](./imagebitmap.md)
