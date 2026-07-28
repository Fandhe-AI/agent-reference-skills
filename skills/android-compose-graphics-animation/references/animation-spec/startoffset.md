# StartOffset

Controls the start timing of a `repeatable` / `infiniteRepeatable` animation's first iteration, either delaying it or fast-forwarding into it.

## Signature / Usage

```kotlin
public constructor(
    offsetMillis: Int,
    offsetType: StartOffsetType = StartOffsetType.Delay,
) : this((offsetMillis * offsetType.value).toLong())

public class StartOffsetType private constructor(internal val value: Int) {
    public companion object {
        public val Delay: StartOffsetType
        public val FastForward: StartOffsetType
    }
}
```

```kotlin
repeatable(
    iterations = 3,
    animation = tween(durationMillis = 300),
    initialStartOffset = StartOffset(offsetMillis = 100, offsetType = StartOffsetType.FastForward),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `offsetMillis` | `Int` | — | Amount of time, in milliseconds, to delay or fast-forward. |
| `offsetType` | `StartOffsetType` | `StartOffsetType.Delay` | `StartOffsetType.Delay` waits `offsetMillis` before starting; `StartOffsetType.FastForward` starts as if `offsetMillis` had already elapsed. |

## Notes

- Passed as `initialStartOffset` to `repeatable` / `infiniteRepeatable`; defaults to `StartOffset(0)` (no delay).
- Package: `androidx.compose.animation.core`.

## Related

- [repeatable](./repeatable.md)
- [RepeatMode](./repeatmode.md)
