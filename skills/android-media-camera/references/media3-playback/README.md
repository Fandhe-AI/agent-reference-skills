# media3-playback

| Name | Description | Path |
|------|-------------|------|
| Player | Core playback interface (prepare/play/pause/seek, states, playlist API). | [player.md](./player.md) |
| Player.Listener | Callback interface for playback state, error, and track-change events. | [player-listener.md](./player-listener.md) |
| ExoPlayer | Default `Player` implementation and `ExoPlayer.Builder` for injecting components. | [exoplayer.md](./exoplayer.md) |
| MediaItem | Represents a single piece of media (URI, DRM, subtitles, clipping, ads). | [media-item.md](./media-item.md) |
| MediaMetadata | Descriptive metadata (title, artist, artwork) attached to a MediaItem. | [media-metadata.md](./media-metadata.md) |
| MediaSource and Factories | Converts MediaItem to playable MediaSource (Progressive/Dash/Hls/Ss). | [media-source.md](./media-source.md) |
| DataSource.Factory and Caching | HTTP data loading and on-disk caching (SimpleCache, CacheDataSource, downloads). | [data-source-cache.md](./data-source-cache.md) |
| TrackSelector and TrackSelectionParameters | Selects video/audio/text tracks by quality, language, or override. | [track-selection.md](./track-selection.md) |
| Timeline and Tracks | Playlist/period structure (Timeline) and available/selected tracks (Tracks). | [timeline-tracks.md](./timeline-tracks.md) |
| PlaybackException and Error Handling | Machine-readable playback error codes and handling. | [playback-exception.md](./playback-exception.md) |
| PlaybackParameters, RepeatMode, and Shuffle | Playback speed/pitch and repeat/shuffle traversal. | [playback-parameters.md](./playback-parameters.md) |
| PlayerView | Views-based UI component rendering video, controls, and subtitles. | [player-view.md](./player-view.md) |
| Compose UI (PlayerSurface, ContentFrame) | Compose primitives and state holders / Material 3 composables for playback UI. | [compose-ui.md](./compose-ui.md) |
| AudioAttributes and Audio Focus | Declares audio usage/content type and automatic audio-focus handling. | [audio-attributes.md](./audio-attributes.md) |
| DRM | DRM-protected playback configuration (Widevine, ClearKey, PlayReady). | [drm.md](./drm.md) |
| Customization | Injectable RenderersFactory / LoadControl and other component customization. | [customization.md](./customization.md) |
