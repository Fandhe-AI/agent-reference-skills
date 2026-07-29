# Modifier.basicMarquee

Applies an animated marquee effect to the modified content if it's too wide to fit in the available space. Commonly applied to a single-line `Text`/`BasicText` inside a width-constrained container.

## Signature / Usage

```kotlin
public fun Modifier.basicMarquee(
    iterations: Int = MarqueeDefaults.Iterations,
    animationMode: MarqueeAnimationMode = MarqueeAnimationMode.Immediately,
    repeatDelayMillis: Int = MarqueeDefaults.RepeatDelayMillis,
    initialDelayMillis: Int = if (animationMode == MarqueeAnimationMode.Immediately) repeatDelayMillis else 0,
    spacing: MarqueeSpacing = MarqueeDefaults.Spacing,
    velocity: Dp = MarqueeDefaults.Velocity,
): Modifier
```

```kotlin
@Composable
fun BasicMarqueeSample() {
    // Marquee only animates when the content doesn't fit in the max width.
    Column(Modifier.width(400.dp)) {
        Text(
            "Learn about why it's great to use Jetpack Compose",
            modifier = Modifier.basicMarquee(),
            fontSize = 50.sp
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `iterations` | `Int` | `MarqueeDefaults.Iterations` (`3`) | Number of times to repeat the animation. `Int.MAX_VALUE` repeats forever; `0` disables the animation. |
| `animationMode` | `MarqueeAnimationMode` | `MarqueeAnimationMode.Immediately` | Whether the marquee starts animating immediately or only while focused (`Immediately`, `WhileFocused`). |
| `repeatDelayMillis` | `Int` | `MarqueeDefaults.RepeatDelayMillis` (`1_200`) | Duration to wait before starting each subsequent iteration, in millis. |
| `initialDelayMillis` | `Int` | `repeatDelayMillis` if `animationMode == Immediately`, else `0` | Duration to wait before starting the first iteration of the animation, in millis. |
| `spacing` | `MarqueeSpacing` | `MarqueeDefaults.Spacing` (`MarqueeSpacing.fractionOfContainer(1f / 3f)`) | How much space to leave at the end of the content before showing the beginning again. |
| `velocity` | `Dp` | `MarqueeDefaults.Velocity` (`30.dp`) | Speed of the animation in dps/second. |

## Notes

- Package: `androidx.compose.foundation` (`Modifier.basicMarquee`, `MarqueeAnimationMode`, `MarqueeSpacing`, `MarqueeDefaults`).
- The marquee effect only animates when the content is too wide to fit the incoming width constraints; if it already fits, the modifier is a no-op.
- `MarqueeAnimationMode.WhileFocused` requires the content (or the marquee itself) to be focusable/focused to start animating — useful for list rows like media titles that should only scroll when selected.
- `MarqueeSpacing.fractionOfContainer(fraction)` computes spacing as a fraction of the container's width; a fixed `Dp` value can also be supplied via the `MarqueeSpacing(spacing: Dp)` factory function.

## Related

- [TextAlign / TextOverflow / TextDecoration](./textalign.md)
- [BasicText](./basictext.md)
