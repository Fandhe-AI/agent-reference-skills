# Modifier.dropShadow / Modifier.innerShadow

Draws a customizable shadow outside (`dropShadow`) or inside (`innerShadow`) a `Shape` outline, configured via a shared `Shadow` data class that supports blur radius, spread, offset, solid color, gradient `Brush`, and alpha. Unlike the elevation-based `Modifier.shadow`, these accept a `Brush` for gradient-colored shadows and let inner/outer geometry be tuned independently of any physical elevation.

## Signature / Usage

```kotlin
fun Modifier.dropShadow(shape: Shape, shadow: Shadow = Shadow()): Modifier
fun Modifier.innerShadow(shape: Shape, shadow: Shadow = Shadow()): Modifier

data class Shadow(
    val radius: Dp = 0.dp,
    val spread: Dp = 0.dp,
    val offset: DpOffset = DpOffset.Zero,
    val color: Color = Color.Black,
    val brush: Brush? = null,
    val alpha: Float = 1f,
)
```

```kotlin
Box(
    Modifier
        .width(300.dp)
        .height(300.dp)
        .dropShadow(
            shape = RoundedCornerShape(20.dp),
            shadow = Shadow(
                radius = 10.dp,
                spread = 6.dp,
                color = Color(0x40000000),
                offset = DpOffset(x = 4.dp, y = 4.dp),
            ),
        )
        .background(Color.White, RoundedCornerShape(20.dp)),
)
```

```kotlin
// innerShadow requires the background to be applied before the modifier
Box(
    Modifier
        .width(300.dp)
        .height(200.dp)
        .background(color = Color.White, shape = RoundedCornerShape(20.dp))
        .innerShadow(
            shape = RoundedCornerShape(20.dp),
            shadow = Shadow(radius = 10.dp, spread = 2.dp, color = Color(0x40000000)),
        ),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `Shape` | — | Outline the shadow is cast/inset against. |
| `shadow` | `Shadow` | `Shadow()` | Shadow configuration; see fields below. |
| `radius` | `Dp` | `0.dp` | Blur softness/diffusion of the shadow edge. |
| `spread` | `Dp` | `0.dp` | Expands (`dropShadow`) or contracts (`innerShadow`) the shadow geometry relative to `shape`. |
| `offset` | `DpOffset` | `DpOffset.Zero` | Shadow displacement along the x/y axes. |
| `color` | `Color` | `Color.Black` | Solid shadow tint, used when `brush` is `null`. |
| `brush` | `Brush?` | `null` | Optional gradient/pattern coloring for the shadow, overriding `color`. |
| `alpha` | `Float` | `1f` | Shadow opacity, `0f`-`1f`. |

## Notes

- `dropShadow` draws behind the content, outside `shape` (elevated look); `innerShadow` draws on top of the content, inset from `shape` (pressed/recessed look).
- For `innerShadow`, apply `Modifier.background` before the modifier in the chain so the shadow renders over the filled shape.
- `brush` enables gradient-colored shadows (e.g. `Brush.sweepGradient`) that `Modifier.shadow`'s `ambientColor`/`spotColor` cannot express.
- Package: `androidx.compose.ui.draw`.

## Related

- [Modifier.shadow](./modifier-shadow.md)
- [Shape](./shape.md)
- [Brush](./brush.md)
