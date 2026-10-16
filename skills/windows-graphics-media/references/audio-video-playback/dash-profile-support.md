# Dynamic Adaptive Streaming over HTTP (DASH) profile support

Lists the DASH profiles supported for WinUI apps, per Windows 10 release.

## Signature / Usage

```csharp
// DASH manifests (.mpd) are played through AdaptiveMediaSource.
var result = await AdaptiveMediaSource.CreateFromUriAsync(new Uri("https://example.com/manifest.mpd"));
if (result.Status == AdaptiveMediaSourceCreationStatus.Success)
{
    mediaPlayer.Source = MediaSource.CreateFromAdaptiveMediaSource(result.MediaSource);
}
```

## Options / Props

Support by Windows 10 release (July release, 1511, 1607, 1703, 1809):

| Profile | Manifest type | Notes | Support |
|---------|---------------|-------|---------|
| urn:mpeg:dash:profile:isoff-live:2011 | Static | | Supported in all listed releases |
| urn:mpeg:dash:profile:isoff-main:2011 | | Best effort | Supported in all listed releases |
| urn:mpeg:dash:profile:isoff-live:2011 | Dynamic | $Time$ is supported but $Number$ is unsupported in segment templates | Not Supported (July, 1511, 1607); Supported (1703, 1809) |
| urn:mpeg:dash:profile:isoff-on-demand:2011 | | | Not Supported (July, 1511, 1607, 1703); Supported (1809) |

## Notes

- Profiles not listed are unsupported, including `urn:mpeg:dash:profile:full:2011`, `urn:mpeg:dash:profile:mp2t-main:2011`, and `urn:mpeg:dash:profile:mp2t-simple:2011`.
- The source table header repeats "Windows 10, Version 1607" twice; both columns show identical values, so they are merged here.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/media-playback/dash-profile-support (ms.date 02/24/2026, windows-dev-docs commit a381231).

## Related

- [AdaptiveMediaSource](./adaptive-media-source.md)
- [HLS tag support](./hls-tag-support.md)
