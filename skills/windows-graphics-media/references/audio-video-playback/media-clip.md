# MediaClip

Represents a single media object (video, image, solid color, or Direct3D surface) usable within a `MediaComposition`.

## Signature / Usage

```csharp
StorageFile file = await KnownFolders.VideosLibrary.GetFileAsync("clip.mp4");
MediaClip clip = await MediaClip.CreateFromFileAsync(file);
clip.TrimTimeFromStart = TimeSpan.FromSeconds(2);
clip.TrimTimeFromEnd = TimeSpan.FromSeconds(1);
clip.Volume = 0.8;
composition.Clips.Add(clip);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| CreateFromFileAsync(IStorageFile) | static Task | Creates a video clip from a video file. |
| CreateFromImageFileAsync(IStorageFile, TimeSpan) | static Task | Creates a clip that shows a single image for a given duration. |
| CreateFromColor(Color, TimeSpan) | static MediaClip | Creates a solid-color clip, typically used as a gap/transition. |
| CreateFromSurface(IDirect3DSurface, TimeSpan) | static MediaClip | Creates a clip from a Direct3D surface. |
| TrimTimeFromStart / TrimTimeFromEnd | TimeSpan | Time trimmed from the clip's start/end. |
| OriginalDuration / TrimmedDuration | TimeSpan | Duration before/after trimming is applied. |
| StartTimeInComposition / EndTimeInComposition | TimeSpan | Position of the clip within the parent `MediaComposition`. |
| Volume | Double | Playback volume of the clip. |
| AudioEffectDefinitions / VideoEffectDefinitions | IVector | Effects applied to the clip during rendering. |
| EmbeddedAudioTracks / SelectedEmbeddedAudioTrackIndex | list / Int32 | Audio tracks embedded in the source file and which one is used. |

## Notes

- Namespace: `Windows.Media.Editing`. Add clips to `MediaComposition.Clips` to build a sequence; use `TrimTimeFromStart`/`TrimTimeFromEnd` for non-destructive trimming without re-encoding until render time.

## Related

- [MediaComposition](./media-composition.md)
