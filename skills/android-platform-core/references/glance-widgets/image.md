# Image

Lays out and draws an image from an `ImageProvider`. Package: `androidx.glance`.

## Signature / Usage

```kotlin
@Composable
public fun Image(
    provider: ImageProvider,
    contentDescription: String?,
    modifier: GlanceModifier = GlanceModifier,
    contentScale: ContentScale = ContentScale.Fit,
    colorFilter: ColorFilter? = null,
)

@Composable
public fun Image(
    provider: ImageProvider,
    contentDescription: String?,
    @FloatRange(from = 0.0, to = 1.0) alpha: Float,
    modifier: GlanceModifier = GlanceModifier,
    contentScale: ContentScale = ContentScale.Fit,
    colorFilter: ColorFilter? = null,
)
```

```kotlin
Image(
    provider = ImageProvider(R.drawable.ic_logo),
    contentDescription = "My image",
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `provider` | `ImageProvider` | — | Resource reference for the image to draw. |
| `contentDescription` | `String?` | — | Accessibility description. |
| `alpha` | `Float` (`@FloatRange(0.0, 1.0)`) | — | Optional opacity overload. |
| `modifier` | `GlanceModifier` | `GlanceModifier` | Applied to the image. |
| `contentScale` | `ContentScale` | `ContentScale.Fit` | How the image is scaled to fit its bounds. |
| `colorFilter` | `ColorFilter?` | `null` | Optional tint/filter. |

## Notes

- Lays out using the image's intrinsic width/height unless overridden by `modifier.width`/`height`/`size`.
- Package: `androidx.glance`, artifact `androidx.glance:glance`, backed by `RemoteViews`-compatible drawables.

## Related

- [glance-modifier](./glance-modifier.md)
