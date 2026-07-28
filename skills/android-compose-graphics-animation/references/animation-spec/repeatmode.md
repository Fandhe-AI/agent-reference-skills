# RepeatMode

Enum controlling how each iteration of a `repeatable` / `infiniteRepeatable` animation behaves after the first.

## Signature / Usage

```kotlin
public enum class RepeatMode {
    Restart,
    Reverse,
}
```

```kotlin
repeatable(
    iterations = 3,
    animation = tween(durationMillis = 300),
    repeatMode = RepeatMode.Reverse,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Restart` | enum value | — | Each iteration restarts from the beginning value. |
| `Reverse` | enum value | — | Each iteration reverses direction, animating back toward the start value (ping-pong). |

## Notes

- Package: `androidx.compose.animation.core`.
- Only meaningful in combination with `repeatable` / `infiniteRepeatable`.

## Related

- [repeatable](./repeatable.md)
- [StartOffset](./startoffset.md)
