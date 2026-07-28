# MediaTransportControls

The playback controls UI (play/pause, seek bar, volume, etc) attached to a `MediaPlayerElement`.

## Signature / Usage

```xml
<MediaTransportControls x:Name="myTransportControls"
                         IsCompact="False"
                         IsSkipForwardButtonVisible="True"
                         IsFastForwardButtonVisible="True"
                         IsZoomButtonVisible="True" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsCompact | Boolean | Whether the control displays in compact mode. |
| ShowAndHideAutomatically | Boolean | Whether the controls auto-show/hide based on user interaction. |
| IsFastForwardButtonVisible / IsFastRewindButtonVisible / IsSkipForwardButtonVisible / IsSkipBackwardButtonVisible / IsNextTrackButtonVisible / IsPreviousTrackButtonVisible / IsStopButtonVisible / IsSeekBarVisible / IsVolumeButtonVisible / IsZoomButtonVisible / IsPlaybackRateButtonVisible / IsRepeatButtonVisible | Boolean | Controls visibility of each individual transport button/element. |
| IsSeekEnabled / IsVolumeEnabled / IsZoomEnabled / IsPlaybackRateEnabled / IsRepeatEnabled / IsStopEnabled | Boolean | Controls whether each corresponding interaction is enabled. |

## Notes

- Namespace: `Microsoft.UI.Xaml.Controls` (Windows App SDK / WinUI 3). Set via `MediaPlayerElement.TransportControls`.
- Methods `Show()` / `Hide()` allow toggling visibility programmatically.

## Related

- [MediaPlayerElement](./media-player-element.md)
