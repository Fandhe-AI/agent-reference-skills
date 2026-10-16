# Media casting (CastingDevicePicker / CastingConnection / DIAL)

Cast media from a WinUI app to remote devices: built-in via MediaPlayerElement, via CastingDevicePicker, or with a custom device picker.

## Signature / Usage

Condensed sketch assembled from the API calls named in the article (the article's full snippets live in an external snippets repository and are not reproduced here).

```csharp
// 1) Built-in: MediaPlayerElement with AreTransportControlsEnabled = true shows a casting button.
// 2) CastingDevicePicker
var picker = new CastingDevicePicker();
picker.Filter.SupportsVideo = true;
picker.CastingDeviceSelected += (s, args) =>
{
    // Must run on the UI thread.
    DispatcherQueue.TryEnqueue(async () =>
    {
        var connection = args.SelectedCastingDevice.CreateCastingConnection();
        connection.ErrorOccurred += (c, e) => { /* update UI */ };
        connection.StateChanged += (c, e) => { /* update UI */ };
        await connection.RequestStartCastingAsync(mediaPlayerElement.MediaPlayer.GetAsCastingSource());
    });
};
// picker.Show(rect) launches the picker flyout from the button's position.
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| CastingDevicePicker.Filter | CastingDevicePickerFilter | Set `SupportsVideo` to list only video-capable casting devices. |
| CastingDevicePicker.CastingDeviceSelected | event | Raised when the user picks a device; args expose `SelectedCastingDevice`. Not raised on the UI thread. |
| CastingDevicePicker.Show | method | Shows the picker dialog, flying out from the given button rectangle. |
| CastingDevice.CreateCastingConnection | method | Creates a `CastingConnection` for the selected device. |
| CastingDevice.GetDeviceSelector | static method | Device selector string for `DeviceInformation.CreateWatcher` to find casting devices. |
| CastingDevice.FromIdAsync | static method | Creates a `CastingDevice` from the ID of a discovered `DeviceInformation`. |
| CastingDevice.FriendlyName | property | Display name for list items. |
| CastingConnection.RequestStartCastingAsync | method | Starts casting a casting source, e.g. `MediaPlayer.GetAsCastingSource()`. |
| CastingConnection.DisconnectAsync | method | Stops casting and disconnects; dispatch to the UI thread. |
| CastingConnection.StateChanged / ErrorOccurred | events | Report connection state (Connected, Rendering, Disconnected, Connecting, Disconnecting) and errors. |

## Notes

- Custom picker flow: create a watcher with `DeviceInformation.CreateWatcher` using `CastingDevice.GetDeviceSelector`, handle `Added` / `Removed` / `EnumerationCompleted` / `Stopped`, and stop the watcher before starting a connection so enumeration does not interfere with casting.
- The casting connection must be initiated on the UI thread; use `DispatcherQueue.TryEnqueue` since `CastingDeviceSelected` and watcher events are not raised on the UI thread.
- State handling: Connected or Rendering means show the disconnect button; Disconnected means unselect the device and hide it; Connecting and Disconnecting show a progress ring.
- The article does not cover DIAL; the DIAL mention in the page title is a category label only and is not documented in the source.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/media-playback/media-casting (ms.date 02/08/2017, windows-dev-docs commit a381231).

## Related

- [MediaPlayerElement](./media-player-element.md)
- [MediaPlayer](./media-player.md)
- [AudioPlaybackConnection](./audio-playback-connection.md)
