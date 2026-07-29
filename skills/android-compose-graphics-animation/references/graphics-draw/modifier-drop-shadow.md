# Modifier.dropShadow / Modifier.innerShadow

Draws a customizable shadow outside (`dropShadow`) or inside (`innerShadow`) a `Shape` outline, configured via a shared `Shadow` class that supports blur radius, spread, offset, solid color, gradient `Brush`, alpha, and blend mode. Unlike the elevation-based `Modifier.shadow`, these accept a `Brush` for gradient-colored shadows and let inner/outer geometry be tuned independently of any physical elevation.

## Signature / Usage

```kotlin
fun Modifier.dropShadow(shape: Shape, shadow: Shadow): Modifier
fun Modifier.dropShadow(shape: Shape, block: DropShadowScope.() -> Unit): Modifier
fun Modifier.innerShadow(shape: Shape, shadow: Shadow): Modifier
fun Modifier.innerShadow(shape: Shape, block: InnerShadowScope.() -> Unit): Modifier

class Shadow {
    // solid-color constructor
    constructor(
        radius: Dp,
        color: Color = Color.Black,
        spread: Dp = 0.dp,
        offset: DpOffset = DpOffset.Zero,
        alpha: Float = 1f,
        blendMode: BlendMode = DefaultBlendMode,
    )

    // gradient/brush constructor
    constructor(
        radius: Dp,
        brush: Brush,
        spread: Dp = 0.dp,
        offset: DpOffset = DpOffset.Zero,
        alpha: Float = 1f,
        blendMode: BlendMode = DefaultBlendMode,
    )
}
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
| `shadow` | `Shadow` | — (required) | Shadow configuration; see fields below. No default — must be constructed explicitly. |
| `block` | `DropShadowScope.() -> Unit` / `InnerShadowScope.() -> Unit` | — | Alternate overload; configures the shadow via mutable `var` properties (`radius`, `spread`, `color`, `brush`, `alpha`, `blendMode`, `offset`) on the scope instead of building a `Shadow` value. |
| `radius` | `Dp` | — (required) | Blur softness/diffusion of the shadow edge. No default in either `Shadow` constructor. |
| `spread` | `Dp` | `0.dp` | Expands (`dropShadow`) or contracts (`innerShadow`) the shadow geometry relative to `shape`. |
| `offset` | `DpOffset` | `DpOffset.Zero` | Shadow displacement along the x/y axes. |
| `color` | `Color` | `Color.Black` | Solid shadow tint; parameter of the solid-color `Shadow` constructor (mutually exclusive with `brush`). |
| `brush` | `Brush` | — (required in this overload) | Gradient/pattern coloring for the shadow; parameter of the brush `Shadow` constructor (mutually exclusive with `color`). |
| `alpha` | `Float` | `1f` | Shadow opacity, `0f`-`1f`. |
| `blendMode` | `BlendMode` | `DefaultBlendMode` | Blend mode used to composite the shadow. |

## Notes

- `dropShadow` draws behind the content, outside `shape` (elevated look); `innerShadow` draws on top of the content, inset from `shape` (pressed/recessed look).
- For `innerShadow`, apply `Modifier.background` before the modifier in the chain so the shadow renders over the filled shape.
- `Shadow` has two public constructors — one takes `color` (no `brush` param), the other takes `brush` (no `color` param) — rather than a single constructor accepting both; `brush` enables gradient-colored shadows (e.g. `Brush.sweepGradient`) that `Modifier.shadow`'s `ambientColor`/`spotColor` cannot express.
- `dropShadow`/`innerShadow` also have a `block: DropShadowScope.() -> Unit` / `InnerShadowScope.() -> Unit` overload for configuring the shadow imperatively instead of passing a `Shadow` value.
- Package: `dropShadow`/`innerShadow` are in `androidx.compose.ui.draw`; the `Shadow` class itself is in `androidx.compose.ui.graphics.shadow`.

## Related

- [Modifier.shadow](./modifier-shadow.md)
- [Shape](./shape.md)
- [Brush](./brush.md)
