# AudioPlaybackConnection (remote Bluetooth audio playback)

Enables Bluetooth-connected remote devices (e.g. a phone) to play audio on the local PC, so the PC behaves like a Bluetooth speaker.

## Signature / Usage

Condensed sketch assembled from the API calls named in the article (the article's full snippets live in an external snippets repository and are not reproduced here).

```csharp
var watcher = DeviceInformation.CreateWatcher(AudioPlaybackConnection.GetDeviceSelector());
watcher.Added += (w, device) => { /* add DeviceInformation to the bound collection */ };
watcher.Removed += (w, update) => { /* remove device; Dispose its connection if any */ };
watcher.Start();

// Enable: tells the system the app wants audio from the device played on the PC.
var connection = AudioPlaybackConnection.TryCreateFromId(deviceId);
if (connection == null) return; // device not supported

connection.StateChanged += (c, args) => { /* update UI via DispatcherQueue.TryEnqueue */ };
await connection.StartAsync();

// Open: audio starts playing only after the connection is opened.
var result = await connection.OpenAsync();
// check result.Status (AudioPlaybackConnectionOpenResultStatus)

// Release
connection.Dispose();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| AudioPlaybackConnection.GetDeviceSelector | static method | Selector string passed to `DeviceInformation.CreateWatcher` to watch for supporting devices. |
| AudioPlaybackConnection.TryCreateFromId | static method | Creates a connection for a device ID. |
| StartAsync | method | Enables the connection (notifies the system). |
| Open / OpenAsync | method | Opens the connection so remote audio begins playing; `OpenAsync` returns a result with `Status`. |
| StateChanged | event | Raised when the connection state changes. |
| Dispose | method | Releases the connection and its resources. |

## Notes

- The underlying Bluetooth A2DP sink is enabled by the app, not by the system; audio plays on the system's audio endpoints (built-in speakers, wired headphones).
- Enabling and opening are separate steps: enabling does not start playback.
- Handle `DeviceWatcher.Removed` for devices removed while a connection is enabled or open; dispose and remove the connection.
- Update UI from event handlers via `DispatcherQueue.TryEnqueue`.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/media-playback/enable-remote-audio-playback (ms.date 02/24/2026, windows-dev-docs commit a381231).

## Related

- [Media casting](./media-casting.md)
- [AudioGraph](./audio-graph.md)
