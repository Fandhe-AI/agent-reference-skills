# AsyncImage

Composable from the third-party Coil library that asynchronously loads a remote or local image (with in-flight caching) and draws it like `Image`. The official Compose documentation recommends Coil (or Glide) for network image loading rather than a bundled Compose API.

## Signature / Usage

```kotlin
AsyncImage(
    model: Any?,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    ...
)
```

```kotlin
AsyncImage(
    model = "https://example.com/image.jpg",
    contentDescription = "Translated description of what the image contains"
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `Any?` | — | URL, `Uri`, or other Coil-supported data type to load. |
| `contentDescription` | `String?` | — | Accessibility text; pass `null` for purely decorative images. |
| `modifier` | `Modifier` | `Modifier` | Applied to this composable. |

## Notes

- This is a third-party API (`io.coil-kt:coil-compose`), not part of `androidx.compose.foundation`; it is documented here because it is the loading approach recommended in the official "Working with images" guide.
- Alternative: **Glide** (`bumptech.github.io/glide`), maintained by Google, focused on smooth-scrolling efficiency for Java-first projects.
- Coil is Kotlin Coroutines-based and reduces memory use through caching and automatic downsampling; prefer requesting exactly-sized images from the backend over client-side downsampling when possible.
- Configure `bitmapConfig`/`DecodeFormat.PREFER_RGB_565` on the loader when transparency is not needed, to halve bitmap memory usage.

## Related

- [Image](./image.md)
- [ImageBitmap](./imagebitmap.md)
