# Animation

Represents a named timeline animation retrieved from an [Artboard](./artboard-artboard.md).

## Signature / Usage

```lua
local anim = instance:animation('Idle')
anim:advance(seconds)
instance:advance(0) -- propagate the animation's change without adding extra time
```

## Options / Props

| Member | Description |
| --- | --- |
| `duration` | Length of the animation in seconds |
| `advance(seconds) -> boolean` | Advances the animation; returns true if it hasn't reached its end |
| `setTime(time)` | Positions the animation at a specific time in seconds |
| `setTimeFrames(frames)` | Positions the animation at a specific frame number |
| `setTimePercentage(percentage)` | Positions the animation as a percentage of its duration |

## Notes

- After calling `advance()`/`setTime()` on the Animation, call the owning Artboard's `advance(0)` to propagate the change without adding extra time.

## Related

- [artboard-artboard.md](./artboard-artboard.md)
