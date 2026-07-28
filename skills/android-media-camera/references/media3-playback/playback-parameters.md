# PlaybackParameters, RepeatMode, and Shuffle

`PlaybackParameters` controls playback speed and pitch. Repeat and shuffle are controlled directly on `Player` via `setRepeatMode` / `setShuffleModeEnabled`, which affect playlist traversal (`seekToNext`/`seekToPrevious`, automatic transitions).

## Signature / Usage

```kotlin
// Speed/pitch.
player.setPlaybackParameters(PlaybackParameters(/* speed= */ 1.5f))

// Repeat and shuffle.
player.repeatMode = Player.REPEAT_MODE_ALL
player.shuffleModeEnabled = true
```

```java
public static final PlaybackParameters DEFAULT = new PlaybackParameters(/* speed= */ 1f);
public final float speed;
public final float pitch;

public PlaybackParameters(@FloatRange(from = 0, fromInclusive = false) float speed)
public PlaybackParameters(
    @FloatRange(from = 0, fromInclusive = false) float speed,
    @FloatRange(from = 0, fromInclusive = false) float pitch)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | `float` | `1f` | Playback speed multiplier; must be `> 0`. |
| `pitch` | `float` | `1f` | Pitch multiplier; must be `> 0`. Leaving at `1f` while changing speed produces the "chipmunk"/slow-motion pitch shift; set independently for pitch-preserving speed changes on supported devices. |
| `Player.REPEAT_MODE_OFF` / `_ONE` / `_ALL` | `int` | `REPEAT_MODE_OFF` | Set via `player.setRepeatMode`; controls whether the current item, whole playlist, or nothing repeats. |
| `shuffleModeEnabled` | `boolean` | `false` | Set via `player.setShuffleModeEnabled`; randomizes playlist traversal order without altering the underlying playlist order. |

## Notes

- `PlaybackParameters.DEFAULT` is speed `1f`, pitch `1f`.
- Query current parameters with `player.getPlaybackParameters()`.
- Artifact: `androidx.media3:media3-common` (`PlaybackParameters`); repeat/shuffle are members of the `Player` interface itself.

## Related

- [Player](./player.md)
