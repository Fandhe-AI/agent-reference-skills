# SystemMediaTransportControls

Represents an object that enables integration with the system media transport controls (SMTC) and support for media commands, such as the flyout that lets a user play/pause/skip media from outside the app.

## Signature / Usage

```csharp
SystemMediaTransportControls smtc = mediaPlayer.SystemMediaTransportControls;
smtc.IsPlayEnabled = true;
smtc.IsPauseEnabled = true;
smtc.ButtonPressed += (sender, args) =>
{
    if (args.Button == SystemMediaTransportControlsButton.Play) mediaPlayer.Play();
};
smtc.DisplayUpdater.Type = MediaPlaybackType.Music;
smtc.DisplayUpdater.MusicProperties.Title = "Track Title";
smtc.DisplayUpdater.Update();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| DisplayUpdater | SystemMediaTransportControlsDisplayUpdater | Updates the metadata (title, artist, thumbnail) shown in the SMTC UI. |
| IsPlayEnabled / IsPauseEnabled / IsNextEnabled / IsPreviousEnabled / IsFastForwardEnabled / IsRewindEnabled / IsStopEnabled | Boolean | Whether each transport button is shown/supported. |
| PlaybackStatus | MediaPlaybackStatus | The playback status shown by the SMTC (Playing, Paused, Stopped, etc). |
| PlaybackRate | Double | Playback rate reported to the SMTC. |
| IsEnabled | Boolean | Enables/disables the SMTC for the app. |

## Notes

- Namespace: `Windows.Media` (WinRT/UWP API). Distinct from any web Media Session API.
- Since Windows 10 version 1607, apps using `MediaPlayer` or `AudioGraph` are automatically integrated with the SMTC by default once a source is set; access the instance via `MediaPlayer.SystemMediaTransportControls`.
- For manual control (or targeting older Windows versions), call the static `GetForCurrentView()` method and disable automatic integration by setting `MediaPlaybackCommandManager.IsEnabled` to `false`.
- Replaces the older, deprecated `MediaControl` class.

## Related

- [MediaPlayer](./media-player.md)
- [MediaPlaybackCommandManager](./media-playback-command-manager.md)
