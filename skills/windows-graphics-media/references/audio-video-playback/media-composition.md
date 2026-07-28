# MediaComposition

Represents a collection of media clips and background audio tracks for video editing. The top-level object of the `Windows.Media.Editing` non-linear editing API.

## Signature / Usage

```csharp
var composition = new MediaComposition();
StorageFile file = await KnownFolders.VideosLibrary.GetFileAsync("clip.mp4");
MediaClip clip = await MediaClip.CreateFromFileAsync(file);
composition.Clips.Add(clip);

StorageFile output = await KnownFolders.VideosLibrary.CreateFileAsync("output.mp4", CreationCollisionOption.GenerateUniqueName);
await composition.RenderToFileAsync(output, MediaTrimmingPreference.Precise);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Clips | IVector\<MediaClip\> | Media clips for playback in the composition, in sequence. |
| BackgroundAudioTracks | IVector\<BackgroundAudioTrack\> | Background audio tracks overlaid on the composition. |
| OverlayLayers | IVector\<MediaOverlayLayer\> | Layers of overlay clips composited on top of the base clips. |
| Duration | TimeSpan | Total playback time of the composition. |
| RenderToFileAsync(IStorageFile, MediaTrimmingPreference, MediaEncodingProfile) | Task | Renders the composition to a file with the given trimming preference and encoding profile. |
| GenerateMediaStreamSource(...) | MediaStreamSource | Creates a `MediaStreamSource` for live preview playback of the composition without rendering to a file. |
| SaveAsync(IStorageFile) / LoadAsync(StorageFile) | Task | Serializes/deserializes the composition project for later editing. |
| GetThumbnailAsync / GetThumbnailsAsync | Task | Retrieves thumbnail image(s) at specified timestamps. |

## Notes

- Namespace: `Windows.Media.Editing`. This is a distinct, higher-level editing API from `MediaTranscoder`; use `MediaComposition` to assemble/trim/overlay multiple clips, then `RenderToFileAsync` to produce the final encoded file.
- Use `GenerateMediaStreamSource`/`GeneratePreviewMediaStreamSource` with `MediaSource.CreateFromMediaStreamSource` and a `MediaPlayer` to preview edits before rendering.

## Related

- [MediaClip](./media-clip.md)
- [MediaTranscoder](./media-transcoder.md)
