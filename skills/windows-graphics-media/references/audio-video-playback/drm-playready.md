# PlayReady DRM overview

Describes how to play PlayReady-protected media content through `MediaPlayer`, using `MediaProtectionManager` to handle license acquisition.

## Signature / Usage

```csharp
var protectionManager = new MediaProtectionManager();
protectionManager.ComponentLoadFailed += (sender, args) => { /* handle failure */ };
protectionManager.ServiceRequested += async (sender, request) =>
{
    // Handle PlayReadyLicenseAcquisitionServiceRequest / IPlayReadyServiceRequest here
};

mediaPlayer.ProtectionManager = protectionManager;
mediaPlayer.Source = MediaSource.CreateFromUri(new Uri("https://example.com/protected-video.mp4"));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| MediaPlayer.ProtectionManager | MediaProtectionManager | Content protection manager assigned to a `MediaPlayer` to handle DRM license requests. |
| MediaPlaybackSession.IsProtected | Boolean | Indicates whether the currently playing content is DRM-protected. |
| MediaProtectionManager.ServiceRequested | event | Raised when a protection service (e.g. PlayReady license acquisition) is needed. |

## Notes

- Namespace: `Windows.Media.Protection` (`MediaProtectionManager`) used together with `Windows.Media.Playback.MediaPlayer`. PlayReady-specific request types live in `Windows.Media.Protection.PlayReady`.
- This is an overview of the integration point only; full PlayReady license server setup and packaging is outside the scope of the client-side WinRT API reference.
- Check `MediaPlaybackSession.IsProtected` to detect DRM-protected content once opened.

## Related

- [MediaPlayer](./media-player.md)
- [MediaPlaybackSession](./media-playback-session.md)
