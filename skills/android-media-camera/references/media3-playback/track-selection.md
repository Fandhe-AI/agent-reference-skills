# TrackSelector, DefaultTrackSelector, and TrackSelectionParameters

Determines which of a media item's available tracks (video quality, audio language, subtitle) are actually played. `TrackSelectionParameters` express constraints declaratively; `DefaultTrackSelector` (the standard `TrackSelector`) resolves them against available `Tracks`.

## Signature / Usage

```kotlin
val trackSelector = DefaultTrackSelector(context)
val player = ExoPlayer.Builder(context).setTrackSelector(trackSelector).build()

// Constrain by language/quality (declarative, applies before or after tracks are known).
player.trackSelectionParameters =
  player.trackSelectionParameters
    .buildUpon()
    .setMaxVideoSizeSd()
    .setPreferredAudioLanguage("hu")
    .build()

// Select a specific track by override.
player.trackSelectionParameters =
  player.trackSelectionParameters
    .buildUpon()
    .setOverrideForType(TrackSelectionOverride(audioTrackGroup.mediaTrackGroup, /* trackIndex= */ 0))
    .build()

// Disable a whole track type.
player.trackSelectionParameters =
  player.trackSelectionParameters
    .buildUpon()
    .setTrackTypeDisabled(C.TRACK_TYPE_VIDEO, /* disabled= */ true)
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setMaxVideoSizeSd()` / video width/height/frameRate/bitrate constraints | builder methods | unconstrained | Bound video track selection. |
| `setPreferredAudioLanguage(String)` / `setPreferredTextLanguage(String)` | builder methods | none | Prefer tracks matching a language tag. |
| `setPreferredAudioMimeType` / `setPreferredVideoMimeType` | builder methods | none | Prefer a specific codec/container. |
| `setOverrideForType(TrackSelectionOverride)` | builder method | none | Force a specific `TrackGroup`/index selection; only applies to items with a matching `TrackGroup`. |
| `setTrackTypeDisabled(int trackType, boolean disabled)` | builder method | `false` | Disable an entire `C.TRACK_TYPE_*` (e.g. video, to play audio-only). |
| `setTunnelingEnabled(boolean)` | builder method (`DefaultTrackSelector.Parameters`) | `false` | Enables tunneled playback, mainly for TV devices. |
| `setAudioOffloadPreferences(AudioOffloadPreferences)` | builder method | disabled | Enables audio offload for power saving. |

## Notes

- Query currently available/selected tracks via `player.getCurrentTracks()` (a `Tracks` object), or observe changes with `Player.Listener.onTracksChanged(tracks: Tracks)`.
- Constraint-based `TrackSelectionParameters` can be set before tracks are known and are automatically reapplied across playlist items with differing track sets — prefer this over manual `TrackSelectionOverride` where possible.
- `TrackSelectionOverride` is tied to a specific `TrackGroup`, so it only applies to items whose tracks match exactly.
- Artifact: `androidx.media3:media3-exoplayer` (`TrackSelector`, `DefaultTrackSelector` in `androidx.media3.exoplayer.trackselection`); `TrackSelectionParameters` and `Tracks` live in `androidx.media3.common`.

## Related

- [Timeline and Tracks](./timeline-tracks.md)
- [ExoPlayer](./exoplayer.md)
