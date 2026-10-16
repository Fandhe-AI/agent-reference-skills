# media3-playback

| Name | Description | Path |
|------|-------------|------|
| Ad Insertion (IMA extension) | Client-side VAST/VMAP ad insertion (pre-roll/mid-roll/post-roll)… | [ad-insertion.md](./ad-insertion.md) |
| AnalyticsListener, PlaybackStatsListener, and EventLogger | AnalyticsListener is a lower-level counterpart to Player.Listener… | [analytics.md](./analytics.md) |
| Android TV | D-pad navigation for Media3 playback on Android TV: delegating key… | [android-tv.md](./android-tv.md) |
| AudioAttributes and Audio Focus | Declares the usage/content-type of audio played by a Player… | [audio-attributes.md](./audio-attributes.md) |
| CastPlayer | Player implementation that controls playback on a Cast-compatible receiver… | [cast-player.md](./cast-player.md) |
| Common Media Client Data (CMCD) | Per-request CMCD headers/query params that let an ExoPlayer client report… | [cmcd.md](./cmcd.md) |
| Compose UI (PlayerSurface, ContentFrame, State Holders) | Jetpack Compose building blocks for Media3, at two levels… | [compose-ui.md](./compose-ui.md) |
| Customization (DefaultRenderersFactory, DefaultLoadControl) | ExoPlayer's component-based architecture lets each stage of playback… | [customization.md](./customization.md) |
| DASH | Playing DASH streams with ExoPlayer via MediaItem or DashMediaSource… | [dash.md](./dash.md) |
| DataSource.Factory and Caching | DataSource.Factory creates the DataSource instances used to load media… | [data-source-cache.md](./data-source-cache.md) |
| Downloading Media (DownloadManager, DownloadService, DownloadHelper) | APIs for downloading media so it can be played back offline… | [downloading-media.md](./downloading-media.md) |
| DRM (Digital Rights Management) | ExoPlayer plays DRM-protected content via Android's MediaDrm API… | [drm.md](./drm.md) |
| ExoPlayer / ExoPlayer.Builder | Default Player implementation for local and streamed media playback… | [exoplayer.md](./exoplayer.md) |
| HLS (incl. interstitials / HlsInterstitialsAdsLoader) | Playing HLS streams with ExoPlayer via MediaItem or HlsMediaSource… | [hls.md](./hls.md) |
| Images | Playing images in an ExoPlayer playlist, motion photos, and integrating… | [images.md](./images.md) |
| Live Streaming | Player and MediaItem APIs specific to live content… | [live-streaming.md](./live-streaming.md) |
| MediaItem / MediaItem.Builder | Represents a single piece of media (URI, metadata, DRM, subtitles, clipping, ads)… | [media-item.md](./media-item.md) |
| MediaMetadata | Descriptive metadata (title, artist, artwork, genre, etc.) attached to a MediaItem… | [media-metadata.md](./media-metadata.md) |
| MediaSource and Factories | MediaSource defines a piece of playable media, loads it, and provides it… | [media-source.md](./media-source.md) |
| Network Stacks | Comparison of the HTTP data source implementations ExoPlayer can use… | [network-stacks.md](./network-stacks.md) |
| PlaybackException and Error Handling | PlaybackException (and its ExoPlaybackException subclass) reports playback failures… | [playback-exception.md](./playback-exception.md) |
| PlaybackParameters, RepeatMode, and Shuffle | PlaybackParameters controls playback speed and pitch… | [playback-parameters.md](./playback-parameters.md) |
| Player.Listener | Callback interface for observing Player state changes… | [player-listener.md](./player-listener.md) |
| PlayerView | Views-based UI component that renders video, images, subtitles… | [player-view.md](./player-view.md) |
| Player | Core playback interface implemented by ExoPlayer, MediaController, and CastPlayer… | [player.md](./player.md) |
| PreloadManager (BasePreloadManager, DefaultPreloadManager) | Preloads upcoming media in a playlist/carousel ahead of playback… | [preload-manager.md](./preload-manager.md) |
| Progressive | Playing progressive (single-file) streams with ExoPlayer via MediaItem… | [progressive.md](./progressive.md) |
| Retrieving In-Stream Metadata | Embedded/in-stream metadata (ICY or ID3 frames, container metadata)… | [retrieving-metadata.md](./retrieving-metadata.md) |
| RTSP | Playing live and on-demand RTSP streams with ExoPlayer via MediaItem or RtspMediaSource… | [rtsp.md](./rtsp.md) |
| SmoothStreaming | Playing SmoothStreaming content with ExoPlayer via MediaItem or SsMediaSource… | [smoothstreaming.md](./smoothstreaming.md) |
| Surface types | How a Media3 Player connects its video output to a Surface… | [surface-types.md](./surface-types.md) |
| Timeline and Tracks | Timeline describes the structure of the media (windows and periods)… | [timeline-tracks.md](./timeline-tracks.md) |
| TrackSelector, DefaultTrackSelector, and TrackSelectionParameters | Determines which of a media item's available tracks are actually played… | [track-selection.md](./track-selection.md) |
| Troubleshooting (ExoPlayer) | Common ExoPlayer playback problems and their fixes… | [troubleshooting.md](./troubleshooting.md) |
