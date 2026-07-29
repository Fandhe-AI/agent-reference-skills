# AnimatedImageVector / rememberAnimatedVectorPainter

Plays back an `AnimatedVectorDrawable` XML resource in Compose. `AnimatedImageVector.animatedVectorResource()` loads the resource, and `rememberAnimatedVectorPainter()` produces a `Painter` that animates between its start and end state whenever the `atEnd` boolean flips.

## Signature / Usage

```kotlin
@Composable
fun AnimatedImageVector.Companion.animatedVectorResource(
    @DrawableRes id: Int
): AnimatedImageVector

@Composable
fun rememberAnimatedVectorPainter(
    animatedImageVector: AnimatedImageVector,
    atEnd: Boolean
): Painter
```

```kotlin
@Composable
fun AnimatedVectorDrawable() {
    val image = AnimatedImageVector.animatedVectorResource(R.drawable.ic_hourglass_animated)
    var atEnd by remember { mutableStateOf(false) }
    Image(
        painter = rememberAnimatedVectorPainter(image, atEnd),
        contentDescription = "Timer",
        modifier = Modifier.clickable { atEnd = !atEnd },
        contentScale = ContentScale.Crop
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `Int` (`@DrawableRes`) | — | Resource ID of an `AnimatedVectorDrawable` XML asset (`animatedVectorResource`). |
| `animatedImageVector` | `AnimatedImageVector` | — | Vector loaded via `animatedVectorResource()`. |
| `atEnd` | `Boolean` | — | Target state; toggling it drives the animation between the drawable's start and end state. |

## Notes

- Package: `androidx.compose.animation.graphics.vector`; requires the `androidx.compose.animation:animation-graphics` artifact, separate from `androidx.compose.animation:animation`.
- Both APIs are marked `@ExperimentalAnimationGraphicsApi` and require opt-in.
- Requires an `AnimatedVectorDrawable` XML resource (`animated-vector` + one or more `objectAnimator` targeting a `VectorDrawable`'s paths/groups) already defined as a drawable resource — this API only plays it back, it does not build one at runtime.
- For animating an in-memory `ImageVector` without an XML `AnimatedVectorDrawable`, drive path/group properties directly with Compose animation APIs (`animateFloatAsState`, `Animatable`) instead.

## Related

- [ImageVector](./imagevector.md)
- [rememberVectorPainter](./remembervectorpainter.md)
- [painterResource](./painterresource.md)
