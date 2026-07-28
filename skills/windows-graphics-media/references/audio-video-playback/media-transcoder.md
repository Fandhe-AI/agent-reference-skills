# MediaTranscoder

Transcodes audio and video files from one encoding/container format to another, with optional trimming and effects.

## Signature / Usage

```csharp
var transcoder = new MediaTranscoder();
StorageFile source = await KnownFolders.VideosLibrary.GetFileAsync("input.mp4");
StorageFile dest = await KnownFolders.VideosLibrary.CreateFileAsync("output.wmv", CreationCollisionOption.GenerateUniqueName);

MediaEncodingProfile profile = MediaEncodingProfile.CreateWmv(VideoEncodingQuality.HD720p);
PrepareTranscodeResult result = await transcoder.PrepareFileTranscodeAsync(source, dest, profile);
if (result.CanTranscode)
{
    await result.TranscodeAsync();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| PrepareFileTranscodeAsync(IStorageFile, IStorageFile, MediaEncodingProfile) | Task\<PrepareTranscodeResult\> | Initializes a transcode from one file to another with the given encoding profile. |
| PrepareStreamTranscodeAsync / PrepareMediaStreamSourceTranscodeAsync | Task\<PrepareTranscodeResult\> | Initializes a transcode from a stream or `MediaSource`. |
| TrimStartTime / TrimStopTime | TimeSpan | Time interval to trim from the start/end of the output. |
| AlwaysReencode | Boolean | Forces re-encoding even when the codec matches. |
| HardwareAccelerationEnabled | Boolean | Whether hardware acceleration is used. |
| VideoProcessingAlgorithm | MediaVideoProcessingAlgorithm | Algorithm used for video scaling/processing during transcode. |
| AddAudioEffect(String) / AddVideoEffect(String) | methods | Add named audio/video effects to the transcode pipeline. |

## Notes

- Namespace: `Windows.Media.Transcoding`. Use `PrepareTranscodeResult.TranscodeAsync()` (with progress reporting) to execute after `PrepareFileTranscodeAsync` returns `CanTranscode == true`.
- Distinct from `MediaComposition.RenderToFileAsync`, which renders an edited composition rather than transcoding an existing single file end-to-end.

## Related

- [MediaComposition](./media-composition.md)
