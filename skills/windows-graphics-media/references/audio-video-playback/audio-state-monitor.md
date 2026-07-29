# Detect and respond to audio state changes (AudioStateMonitor)

`AudioStateMonitor` lets an app detect system-initiated changes to the sound level of an audio stream it owns — for example the system "ducking" or muting playback/capture when an alarm rings or another app opens a communications stream (VoIP call).

## Signature / Usage

```csharp
// Monitor a MediaCapture audio-capture stream (e.g. game chat) on the default communications device
string deviceId = Windows.Media.Devices.MediaDevice.GetDefaultAudioCaptureId(AudioDeviceRole.Communications);
AudioStateMonitor gameChatAudioStateMonitor =
    AudioStateMonitor.CreateForCaptureMonitoringWithCategoryAndDeviceId(MediaCategory.GameChat, deviceId);

gameChatAudioStateMonitor.SoundLevelChanged += (AudioStateMonitor sender, object args) =>
{
    switch (sender.SoundLevel)
    {
        case SoundLevel.Full: /* resume audio capture */ break;
        case SoundLevel.Muted: /* stop audio capture */ break;
        case SoundLevel.Low: /* only render streams can be "ducked" to Low */ break;
    }
};

// Every MediaPlayer already has one for its own playback stream
AudioStateMonitor playerMonitor = mediaPlayer.AudioStateMonitor;
playerMonitor.SoundLevelChanged += (sender, args) =>
{
    if (sender.SoundLevel == SoundLevel.Muted) mediaPlayer.Pause();
};
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `AudioStateMonitor.CreateForCaptureMonitoringWithCategoryAndDeviceId(MediaCategory, string)` | static `AudioStateMonitor` | Creates a monitor for a capture stream of the given category/device (e.g. game chat mic). |
| `AudioStateMonitor.CreateForRenderMonitoring(...)` overloads | static `AudioStateMonitor` | Creates a monitor for a render (playback) stream by category and/or device id. |
| `MediaPlayer.AudioStateMonitor` | property | Every `MediaPlayer` instance exposes its own monitor for the stream it's currently playing. |
| `SoundLevel` | property | Current level: `SoundLevel.Full`, `SoundLevel.Low` (ducked, render streams only), or `SoundLevel.Muted`. |
| `SoundLevelChanged` | event `(AudioStateMonitor, object)` | Raised when the system changes the stream's sound level; read `sender.SoundLevel` in the handler. |

## Notes

- Namespace: `Windows.Media.Audio` (`AudioStateMonitor`, `SoundLevel`); device/category helpers (`MediaDevice.GetDefaultAudioCaptureId`, `AudioDeviceRole`, `MediaCategory`) are in `Windows.Media.Devices`.
- Capture streams only ever go between `Full` and `Muted`; the `Low` (ducked) state applies to render (playback) streams.
- On desktop, ducking is triggered by an active communications stream (e.g. `AudioRenderCategory.Communications`) and is controlled by the Communications tab in Windows Sound settings; some apps that manage their own mixing (e.g. Teams) may not trigger it.

## Related

- [AudioGraph](./audio-graph.md)
- [MediaPlayer](./media-player.md)
