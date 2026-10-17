# media3-playback

| Name | Description | Path |
|------|-------------|------|
| Ad Insertion (IMA extension) | Client-side VAST/VMAP ad insertion (pre-roll/mid-roll/post-roll) via `ImaAdsLoader`, wrapping Google's Interactive Media Ads (IMA) SDK. | [ad-insertion.md](./ad-insertion.md) |
| AnalyticsListener, PlaybackStatsListener, and EventLogger | `AnalyticsListener` is a lower-level counterpart to `Player.Listener` for `ExoPlayer` that delivers detailed, timestamped playback events (including internal renderer/loading events) for analytics and diagnostics. | [analytics.md](./analytics.md) |
| Android TV | D-pad navigation for Media3 playback on Android TV: delegating key events to `PlayerView`, requesting focus, and Compose handling. | [android-tv.md](./android-tv.md) |
| AudioAttributes and Audio Focus | Declares the usage/content-type of audio played by a `Player`, used by Media3 to automatically request and respond to Android audio focus. | [audio-attributes.md](./audio-attributes.md) |
| CastPlayer | `Player` implementation that controls playback on a Cast-compatible receiver device (Chromecast, Cast-enabled TVs/speakers) instead of playing locally. | [cast-player.md](./cast-player.md) |
| Common Media Client Data (CMCD) | Per-request CMCD headers/query params that let an ExoPlayer client report player state to a CDN, based on the CTA-5004 specification. | [cmcd.md](./cmcd.md) |
| Compose UI (PlayerSurface, ContentFrame, State Holders) | Jetpack Compose building blocks for Media3, offered at two levels: `media3-ui-compose` (foundational `PlayerSurface` / `ContentFrame` and state holders for a fully custom design) and `media3-ui-compose-material3` (ready-made Material 3 composables like `Player`, `MiniController`, `PlayPauseButton`). | [compose-ui.md](./compose-ui.md) |
| Customization (DefaultRenderersFactory, DefaultLoadControl) | ExoPlayer's component-based architecture lets each stage of playback — rendering, buffering, load error handling, data loading — be swapped or tuned via injectable factories passed to `ExoPlayer.Builder`. | [customization.md](./customization.md) |
| DASH | Playing DASH streams with ExoPlayer via `MediaItem` or `DashMediaSource`. | [dash.md](./dash.md) |
| DataSource.Factory and Caching | `DataSource.Factory` creates the `DataSource` instances used to load media, manifest, and license bytes over HTTP or from disk cache. | [data-source-cache.md](./data-source-cache.md) |
| Downloading Media (DownloadManager, DownloadService, DownloadHelper) | APIs for downloading media so it can be played back offline. | [downloading-media.md](./downloading-media.md) |
| DRM (Digital Rights Management) | ExoPlayer plays DRM-protected content via Android's `MediaDrm` API, configured declaratively on `MediaItem.DrmConfiguration`. | [drm.md](./drm.md) |
| ExoPlayer / ExoPlayer.Builder | Default `Player` implementation for local and streamed media playback. | [exoplayer.md](./exoplayer.md) |
| HLS (incl. interstitials / HlsInterstitialsAdsLoader) | Playing HLS streams with ExoPlayer via `MediaItem` or `HlsMediaSource`, and HLS interstitials via `HlsInterstitialsAdsLoader`. | [hls.md](./hls.md) |
| Images | Playing images in an ExoPlayer playlist, motion photos, and integrating external image loading libraries (Glide, Coil). | [images.md](./images.md) |
| Live Streaming | `Player` and `MediaItem` APIs specific to live content: querying how far playback trails real time, and configuring the target/min/max live offset and the speed adjustments used to converge on it. | [live-streaming.md](./live-streaming.md) |
| MediaItem / MediaItem.Builder | Represents a single piece of media (URI, metadata, DRM, subtitles, clipping, ads) to be played. | [media-item.md](./media-item.md) |
| MediaMetadata | Descriptive metadata (title, artist, artwork, genre, etc.) attached to a `MediaItem` or reported by the player via in-stream updates. | [media-metadata.md](./media-metadata.md) |
| MediaSource and Factories | `MediaSource` defines a piece of playable media, loads it, and provides it for reading by the player. | [media-source.md](./media-source.md) |
| Network Stacks | Comparison of the HTTP data source implementations ExoPlayer can use, and how to inject one into `DataSource.Factory`. | [network-stacks.md](./network-stacks.md) |
| PlaybackException and Error Handling | `PlaybackException` (and its `ExoPlaybackException` subclass thrown by `ExoPlayer`) reports playback failures with a machine-readable `errorCode`. | [playback-exception.md](./playback-exception.md) |
| PlaybackParameters, RepeatMode, and Shuffle | `PlaybackParameters` controls playback speed and pitch. | [playback-parameters.md](./playback-parameters.md) |
| Player.Listener | Callback interface for observing `Player` state changes: playback state, playing status, playlist transitions, errors, and track changes. | [player-listener.md](./player-listener.md) |
| PlayerView | Views-based UI component that renders video, images, subtitles, album art, and playback controls for an attached `Player`. | [player-view.md](./player-view.md) |
| Player | Core playback interface implemented by `ExoPlayer`, `MediaController`, and `CastPlayer`. | [player.md](./player.md) |
| PreloadManager (BasePreloadManager, DefaultPreloadManager) | Preloads upcoming media in a playlist/carousel ahead of playback so switching to them starts faster. | [preload-manager.md](./preload-manager.md) |
| Progressive | Playing progressive (single-file) streams with ExoPlayer via `MediaItem` or `ProgressiveMediaSource`. | [progressive.md](./progressive.md) |
| Retrieving In-Stream Metadata | Embedded/in-stream metadata (e.g. ICY or ID3 frames carried inside the media stream, or container format metadata) is delivered during playback via `Player.Listener.onMetadata`, separate from the `MediaMetadata` attached to a `MediaItem`. | [retrieving-metadata.md](./retrieving-metadata.md) |
| RTSP | Playing live and on-demand RTSP streams with ExoPlayer via `MediaItem` or `RtspMediaSource`. | [rtsp.md](./rtsp.md) |
| SmoothStreaming | Playing SmoothStreaming content with ExoPlayer via `MediaItem` or `SsMediaSource`. | [smoothstreaming.md](./smoothstreaming.md) |
| Surface types | How a Media3 `Player` connects its video output to a `Surface`, and how to choose between `SurfaceView` and `TextureView` (including `PlayerView` `surface_type` and Compose). | [surface-types.md](./surface-types.md) |
| Timeline and Tracks | `Timeline` describes the structure of the media the player is playing back — the sequence of windows (playlist items) and periods (logical media pieces, including inserted ads). | [timeline-tracks.md](./timeline-tracks.md) |
| TrackSelector, DefaultTrackSelector, and TrackSelectionParameters | Determines which of a media item's available tracks (video quality, audio language, subtitle) are actually played. | [track-selection.md](./track-selection.md) |
| Troubleshooting (ExoPlayer) | Common ExoPlayer playback problems and their fixes (cleartext HTTP, seeking, MPEG-TS, redirects, unrecognized formats, background audio, unstable API lint). | [troubleshooting.md](./troubleshooting.md) |
