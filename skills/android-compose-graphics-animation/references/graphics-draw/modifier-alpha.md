# Modifier.alpha

Draws content with a modified alpha (opacity), which may be less than fully opaque.

## Signature / Usage

```kotlin
fun Modifier.alpha(alpha: Float): Modifier
```

```kotlin
Image(
    painter = painterResource(id = R.drawable.sunset),
    contentDescription = "Sunset",
    modifier = Modifier.alpha(0.5f),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `alpha` | `Float` | — | Opacity between `0.0` (fully transparent) and `1.0` (fully opaque); no default, required. |

## Notes

- Equivalent to setting `alpha` inside `Modifier.graphicsLayer { this.alpha = ... }`, but as a dedicated single-purpose modifier.
- Package: `androidx.compose.ui.draw`.

## Related

- [Modifier.graphicsLayer](./modifier-graphics-layer.md)
