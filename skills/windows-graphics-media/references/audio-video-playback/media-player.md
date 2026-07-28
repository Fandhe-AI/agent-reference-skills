# MediaPlayer

Provides access to media playback functionality such as play, pause, fast-forward, rewind, and volume. The core class for audio/video playback in Windows apps.

## Signature / Usage

```csharp
var mediaPlayer = new MediaPlayer();
mediaPlayer.Source = MediaSource.CreateFromUri(new Uri("https://example.com/video.mp4"));
mediaPlayer.Volume = 0.5;
mediaPlayer.IsLoopingEnabled = false;
mediaPlayer.Play();
mediaPlayer.Pause();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Source | IMediaPlaybackSource | Sets the playback source (`MediaSource`, `MediaPlaybackItem`, or `MediaPlaybackList`). |
| PlaybackSession | MediaPlaybackSession | Provides state (position, rate, duration) and events for the current playback session. Use this instead of the deprecated `Position`/`PlaybackRate`/`CurrentState` properties. |
| Volume | Double | Audio volume for playback (0.0-1.0). |
| IsLoopingEnabled | Boolean | Whether media playback repeats in a loop. |
| CommandManager | MediaPlaybackCommandManager | Controls behavior of and receives events from the System Media Transport Controls (SMTC). |
| SystemMediaTransportControls | SystemMediaTransportControls | The SMTC instance associated with this player, used to display metadata and receive transport commands from the system UI. |
| AutoPlay | Boolean | Whether playback starts automatically after media is loaded. |
| AudioCategory | MediaPlayerAudioCategory | The type of audio currently played (affects system audio ducking/mixing behavior). |
| RealTimePlayback | Boolean | Configures the player for real-time scenarios such as live streaming. |
| ProtectionManager | MediaProtectionManager | Content protection manager for DRM-protected media. |

## Notes

- Namespace: `Windows.Media.Playback` (WinRT/UWP API, callable from WinUI 3 desktop apps). Distinct from Android `MediaPlayer` (`android.media.MediaPlayer`) and Apple `AVPlayer`.
- Since Windows 10 version 1607, apps using `MediaPlayer` are automatically integrated with the System Media Transport Controls (SMTC) once `Source` is set; disable via `CommandManager.IsEnabled = false` for manual control.
- Many top-level state properties (`Position`, `PlaybackRate`, `CurrentState`, `BufferingProgress`, `CanPause`, `CanSeek`, `NaturalDuration`) are legacy; prefer the equivalent properties on `PlaybackSession`.
- Pair with `MediaPlayerElement` (WinUI 3 / XAML) to render video in the UI; `MediaPlayer` itself has no built-in visual surface unless used with `GetSurface`/`SetSurfaceSize` for Composition-based rendering.

## Related

- [MediaPlaybackSession](./media-playback-session.md)
- [MediaPlaybackCommandManager](./media-playback-command-manager.md)
- [SystemMediaTransportControls](./system-media-transport-controls.md)
- [MediaPlayerElement](./media-player-element.md)
- [MediaSource](./media-source.md)
- [MediaTimelineController](./media-timeline-controller.md)
