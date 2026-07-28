# ContentScale

Determines how a source (image, painter) is scaled to fit the destination bounds when the aspect ratios of source and destination differ.

## Signature / Usage

```kotlin
interface ContentScale {
    fun computeScaleFactor(srcSize: Size, dstSize: Size): ScaleFactor

    companion object {
        val Fit: ContentScale
        val Crop: ContentScale
        val FillHeight: ContentScale
        val FillWidth: ContentScale
        val FillBounds: ContentScale
        val Inside: ContentScale
        val None: FixedScale
    }
}
```

```kotlin
Image(
    painter = painterResource(id = R.drawable.dog),
    contentDescription = null,
    contentScale = ContentScale.Crop,
    modifier = Modifier.size(150.dp)
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Fit` | `ContentScale` | default for `Image` | Scale uniformly so both dimensions are `<=` the destination. |
| `Crop` | `ContentScale` | — | Scale uniformly so both dimensions are `>=` the destination, cropping overflow. |
| `FillWidth` | `ContentScale` | — | Scale uniformly to match destination width. |
| `FillHeight` | `ContentScale` | — | Scale uniformly to match destination height. |
| `FillBounds` | `ContentScale` | — | Scale non-uniformly to exactly fill both dimensions (may distort). |
| `Inside` | `ContentScale` | — | Scale down to fit inside destination bounds only if source is larger; never upscales. |
| `None` | `FixedScale` | — | Apply no scaling. |

## Notes

- Package: `androidx.compose.ui.layout`.
- Default value for `Image` is `ContentScale.Fit`; default for `Modifier.paint` is `ContentScale.Inside`.

## Related

- [Image](./image.md)
- [Modifier.paint](./modifierpaint.md)
