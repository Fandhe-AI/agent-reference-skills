# MediaPlaybackCommandManager

Specifies the behavior of and receives events from the System Media Transport Controls (SMTC). Use this class to customize the interaction between a `MediaPlayer` and the SMTC.

## Signature / Usage

```csharp
MediaPlaybackCommandManager cmdManager = mediaPlayer.CommandManager;
cmdManager.IsEnabled = true;
cmdManager.PlayReceived += (sender, args) => sender.MediaPlayer.Play();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsEnabled | Boolean | Whether the command manager (and thus automatic SMTC integration) is enabled. |
| PlayBehavior / PauseBehavior / NextBehavior / PreviousBehavior / FastForwardBehavior / RewindBehavior / PositionBehavior / RateBehavior / ShuffleBehavior / AutoRepeatModeBehavior | MediaPlaybackCommandManager*Behavior | Objects that define the enabled state and auto-handling behavior for each SMTC control. |
| MediaPlayer | MediaPlayer | The `MediaPlayer` instance associated with the command manager. |

## Notes

- Namespace: `Windows.Media.Playback`. Obtain via `MediaPlayer.CommandManager`.
- Handles events (`PlayReceived`, `PauseReceived`, `NextReceived`, `PreviousReceived`, `FastForwardReceived`, `RewindReceived`, `PositionReceived`, `RateReceived`, `ShuffleReceived`, `AutoRepeatModeReceived`) raised when the corresponding SMTC control is used.
- Set `IsEnabled = false` to disable automatic SMTC integration when manual control via `SystemMediaTransportControls` is preferred.

## Related

- [MediaPlayer](./media-player.md)
- [SystemMediaTransportControls](./system-media-transport-controls.md)
