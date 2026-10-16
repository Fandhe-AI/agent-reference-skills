# Detect and respond to audio level changes by the system

Use `AudioStateMonitor` to be notified when the system lowers or mutes the volume of your app's audio capture or render streams (for example when the app goes to the background). Available starting with Windows 10, version 1803.

## Signature / Usage

```csharp
// Outline assembled from the API names in the article (the article's full listing is a code include)
AudioStateMonitor captureMonitor = AudioStateMonitor.CreateForCaptureMonitoring();
AudioStateMonitor renderMonitor = AudioStateMonitor.CreateForRenderMonitoring();

captureMonitor.SoundLevelChanged += (AudioStateMonitor sender, object args) =>
{
    // Inspect sender.SoundLevel: stop capture when muted, resume when back to full volume
};
renderMonitor.SoundLevelChanged += (AudioStateMonitor sender, object args) =>
{
    // Inspect sender.SoundLevel: optionally pause playback when ducked
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CreateForCaptureMonitoring` | static method | Gets an `AudioStateMonitor` for audio capture streams. |
| `CreateForRenderMonitoring` | static method | Gets an `AudioStateMonitor` for audio render streams. |
| `SoundLevelChanged` | event | Raised when the system modifies the audio of the corresponding stream category. |
| `SoundLevel` | property | New sound level, read from the `AudioStateMonitor` sender in the handler. |

## Notes

- Namespace: `Windows.Media.Audio`.
- A capture stream is never lowered ("ducked") by the system; it is only muted or switched back to full volume. If muted, you can stop a capture in progress; when restored to full volume, you can start capturing again.
- For render streams, depending on the scenario and content type, you may want to pause playback when the sound level is ducked.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/camera/detect-audio-level-changes (ms.date 08/07/2024).

## Related

- [MediaCapture](./media-capture.md)
