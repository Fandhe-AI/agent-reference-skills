# MediaMetadata

Descriptive metadata (title, artist, artwork, genre, etc.) attached to a `MediaItem` or reported by the player via in-stream updates. Built with `MediaMetadata.Builder`.

## Signature / Usage

```kotlin
val metadata =
  MediaMetadata.Builder()
    .setTitle("Song title")
    .setArtist("Artist name")
    .setArtworkUri(artworkUri)
    .build()

val mediaItem = MediaItem.Builder().setUri(uri).setMediaMetadata(metadata).build()
```

```java
public Builder setTitle(@Nullable CharSequence title)
public Builder setArtist(@Nullable CharSequence artist)
public Builder setAlbumTitle(@Nullable CharSequence albumTitle)
public Builder setArtworkUri(@Nullable Uri artworkUri)
public Builder setArtworkData(@Nullable byte[] artworkData, @Nullable @PictureType Integer artworkDataType)
public Builder setGenre(@Nullable CharSequence genre)
public Builder setTrackNumber(@Nullable Integer trackNumber)
public Builder setIsBrowsable(@Nullable Boolean isBrowsable)
public Builder setIsPlayable(@Nullable Boolean isPlayable)
public MediaMetadata build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `CharSequence?` | `null` | Track/video title. |
| `artist` | `CharSequence?` | `null` | Performer name. |
| `albumTitle` | `CharSequence?` | `null` | Album/collection title. |
| `artworkUri` / `artworkData` | `Uri?` / `byte[]?` | `null` | Cover art, by URI or embedded bytes with a `@PictureType`. |
| `genre` | `CharSequence?` | `null` | Genre string. |
| `trackNumber` | `Integer?` | `null` | Position within an album/playlist. |
| `isBrowsable` / `isPlayable` | `Boolean?` | `null` | Used by `MediaLibraryService` browse trees to mark folder vs. leaf items. |

## Notes

- Player exposes current metadata via `player.getCurrentMediaMetadata()`, updated on `Player.Listener.onMediaMetadataChanged` — triggered by playlist transitions, in-stream metadata (e.g. ICY/ID3), or mid-playback `MediaItem` updates.
- Merges metadata from the `MediaItem` itself and any metadata extracted from the stream at runtime.
- Artifact: `androidx.media3:media3-common`.

## Related

- [MediaItem](./media-item.md)
- [Player.Listener](./player-listener.md)
