# Timeline and Tracks

`Timeline` describes the structure of the media the player is playing back — the sequence of windows (playlist items) and periods (logical media pieces, including inserted ads). `Tracks` describes the currently available and selected tracks (video/audio/text) for the current media item.

## Signature / Usage

```kotlin
player.addListener(
  object : Player.Listener {
    override fun onTracksChanged(tracks: Tracks) {
      for (trackGroup in tracks.groups) {
        val trackType = trackGroup.type
        val isSelected = trackGroup.isSelected
        for (i in 0 until trackGroup.length) {
          val isSupported = trackGroup.isTrackSupported(i)
          val format = trackGroup.getTrackFormat(i)
        }
      }
    }
  }
)
```

```java
// Timeline
public abstract int getWindowCount();
public abstract Window getWindow(int windowIndex, Window window, long defaultPositionProjectionUs);
public abstract int getPeriodCount();
public abstract Period getPeriod(int periodIndex, Period period, boolean setIds);

// Tracks
public ImmutableList<Group> getGroups();
public boolean isTypeSelected(@C.TrackType int trackType);
public boolean isTypeSupported(@C.TrackType int trackType);

// Tracks.Group
public @C.TrackType int getType();
public boolean isSelected();
public boolean isSupported(boolean allowExceedsCapabilities);
public final int length;
public boolean isTrackSupported(int trackIndex);
public boolean isTrackSelected(int trackIndex);
public Format getTrackFormat(int trackIndex);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Window` | nested class | — | Corresponds to one playlist item; a region of media currently available for playback, with seekability and default position. |
| `Period` | nested class | — | A single logical piece of media (e.g. one file), including any inserted ad groups. |
| `Tracks.Group` | nested class | — | A set of tracks presenting the same content in different formats (e.g. video renditions); `length` is the number of tracks in the group. |

## Notes

- `player.getCurrentTimeline()` returns the current `Timeline`; it changes on playlist edits, preparation, and adaptive manifest refreshes.
- `player.getCurrentTracks()` returns the current `Tracks`; observe changes via `Player.Listener.onTracksChanged(Tracks)`.
- Use `Tracks`/`TrackSelectionParameters` together: query available tracks from `Tracks`, then constrain or override selection via `TrackSelectionParameters`.
- Artifact: `androidx.media3:media3-common`.

## Related

- [TrackSelector and TrackSelectionParameters](./track-selection.md)
- [Player.Listener](./player-listener.md)
- [Player](./player.md)
