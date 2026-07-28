# AdaptiveMediaSource

Represents the source of adaptive streaming content, supporting HLS and MPEG-DASH manifests with automatic bitrate switching.

## Signature / Usage

```csharp
var result = await AdaptiveMediaSource.CreateFromUriAsync(new Uri("https://example.com/stream.m3u8"));
if (result.Status == AdaptiveMediaSourceCreationStatus.Success)
{
    AdaptiveMediaSource ams = result.MediaSource;
    MediaSource source = MediaSource.CreateFromAdaptiveMediaSource(ams);
    mediaPlayer.Source = source;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| CreateFromUriAsync(Uri) | static Task | Asynchronously creates an `AdaptiveMediaSource` from a manifest URI (HLS `.m3u8` or DASH `.mpd`). |
| CreateFromStreamAsync(...) | static Task | Asynchronously creates an `AdaptiveMediaSource` from an input stream. |
| AvailableBitrates | IVectorView\<UInt32\> | Bitrates available in the manifest. |
| DesiredLiveOffset | TimeSpan | Desired offset of live playback from the end of downloaded content. |
| InitialBitrate | UInt32 | Initial bitrate to use for playback. |
| DesiredMinBitrate / DesiredMaxBitrate | UInt32 | Bounds for adaptive bitrate switching. |
| IsLive | Boolean | Whether the content is a live stream. |
| CurrentDownloadBitrate / CurrentPlaybackBitrate | UInt32 | Current bitrate statistics. |
| DownloadBitrateChanged / PlaybackBitrateChanged | events | Occur when the respective bitrate changes. |

## Notes

- Namespace: `Windows.Media.Streaming.Adaptive`. Supports both HTTP Live Streaming (HLS) and MPEG-DASH manifests.
- Combine with `MediaSource.CreateFromAdaptiveMediaSource` to produce a playable `MediaSource` for `MediaPlayer`.
- `IsContentTypeSupported(String)` can check manifest content-type support before attempting creation.

## Related

- [MediaSource](./media-source.md)
- [MediaPlayer](./media-player.md)
