# media-session-editing

| Name | Description | Path |
|------|-------------|------|
| CommandButton | Describes a single button (icon, display name, and the command it triggers) shown in the system media controls, notification, or per-media-item UI. | [command-button.md](./command-button.md) |
| CompositionPlayer | A `Player` implementation that renders a `Composition` directly for real-time preview (effects, trimming, compositing) without exporting to a file first. | [composition-player.md](./composition-player.md) |
| Composition / EditedMediaItemSequence | Timeline container for multi-asset editing: a `Composition` holds one or more `EditedMediaItemSequence`s. | [composition.md](./composition.md) |
| EditedMediaItem / Effects | Wraps a `MediaItem` with the edit instructions (audio/video removal, frame rate, effects) applied to it before export. | [edited-media-item.md](./edited-media-item.md) |
| MediaBrowser | Extends `MediaController` with methods to browse the content tree exposed by a `MediaLibraryService`. | [media-browser.md](./media-browser.md) |
| MediaButtonReceiver | `BroadcastReceiver` that handles hardware media button intents and starts the appropriate session service. | [media-button-receiver.md](./media-button-receiver.md) |
| MediaController | Client-side handle that connects to a `MediaSession` via its `SessionToken` and implements the `Player` interface. | [media-controller.md](./media-controller.md) |
| MediaLibraryService | `MediaSessionService` variant that additionally serves a browsable content tree for Android Auto and Wear OS. | [media-library-service.md](./media-library-service.md) |
| MediaNotification.Provider / DefaultMediaNotificationProvider | `MediaNotification.Provider` builds the notification shown in the drawer for a `MediaSessionService`. | [media-notification-provider.md](./media-notification-provider.md) |
| MediaSession.Callback | Interface implemented on `MediaSession.Builder.setCallback()` to accept/reject connections and handle commands. | [media-session-callback.md](./media-session-callback.md) |
| MediaSessionService | Superclass for a `Service` that hosts a `Player` and `MediaSession` for background playback. | [media-session-service.md](./media-session-service.md) |
| MediaSession | Connects a `Player` to the outside world for external playback advertisement and control. | [media-session.md](./media-session.md) |
| Muxer / Muxer.Factory | Pluggable output-container writer for `Transformer`; `setMuxerFactory()` swaps in `InAppMp4Muxer`, `InAppFragmentedMp4Muxer`, `FrameworkMuxer`, or a custom `Muxer` implementation. | [muxer-customization.md](./muxer-customization.md) |
| SessionCommand / SessionCommands | `SessionCommand` represents a single command a `MediaController` can send, predefined or custom. | [session-commands.md](./session-commands.md) |
| SessionToken | Identifies an ongoing `MediaSession` or service that a `MediaController` or `MediaBrowser` can connect to. | [session-token.md](./session-token.md) |
| Tone mapping (HDR to SDR) | Converts HDR video to SDR during export, needed when mixing HDR and SDR assets. | [tone-mapping.md](./tone-mapping.md) |
| Transformer | Editing/transcoding API for exporting media: trims, concatenates, converts formats, and applies effects. | [transformer.md](./transformer.md) |
