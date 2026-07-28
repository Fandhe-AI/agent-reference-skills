# MediaPlaybackList

Represents a list of `MediaPlaybackItem` objects that can be played back as a playlist. Provides methods for switching the currently playing item and enabling looping and shuffling. Items are rendered with gapless playback where the source format supports it.

## Signature / Usage

```csharp
var list = new MediaPlaybackList();
list.Items.Add(new MediaPlaybackItem(MediaSource.CreateFromUri(new Uri("https://example.com/track1.mp3"))));
list.Items.Add(new MediaPlaybackItem(MediaSource.CreateFromUri(new Uri("https://example.com/track2.mp3"))));
list.AutoRepeatEnabled = true;
mediaPlayer.Source = list;
mediaPlayer.Play();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Items | IObservableVector\<MediaPlaybackItem\> | The list of playback items. |
| CurrentItem / CurrentItemIndex | MediaPlaybackItem / UInt32 | The currently playing item and its index. |
| AutoRepeatEnabled | Boolean | Whether the list loops when the end is reached. |
| ShuffleEnabled | Boolean | Whether items play in random order. |
| StartingItem | MediaPlaybackItem | The item to play first. |
| MaxPrefetchTime | TimeSpan | Maximum time before an item is expected to play that the system prefetches its content. |
| MoveNext() / MovePrevious() / MoveTo(UInt32) | methods | Change the current item. |

## Notes

- Namespace: `Windows.Media.Playback`. Assign a `MediaPlaybackList` directly to `MediaPlayer.Source` to play a playlist with automatic SMTC next/previous integration.
- Events `CurrentItemChanged`, `ItemFailed`, `ItemOpened` allow tracking playlist progress and error handling.
- Gapless playback compensation is automatic for MP3/AAC with encoder delay/padding metadata; lossless formats (PCM, FLAC, ALAC) require no compensation.

## Related

- [MediaPlaybackItem](./media-playback-item.md)
- [MediaPlayer](./media-player.md)
