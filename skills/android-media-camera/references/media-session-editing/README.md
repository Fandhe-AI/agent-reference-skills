# media-session-editing

| Name | Description | Path |
|------|-------------|------|
| MediaSession | Connects a Player to the outside world for external playback advertisement and control. | [media-session.md](./media-session.md) |
| MediaSession.Callback | Accepts/rejects controller connections, grants commands, handles custom commands and playlist requests. | [media-session-callback.md](./media-session-callback.md) |
| MediaSessionService | Hosts a Player and MediaSession in a Service for background playback. | [media-session-service.md](./media-session-service.md) |
| MediaLibraryService | MediaSessionService variant that serves a browsable content tree (Android Auto, Wear OS). | [media-library-service.md](./media-library-service.md) |
| MediaController | Client handle implementing Player that connects to a MediaSession via SessionToken. | [media-controller.md](./media-controller.md) |
| MediaBrowser | MediaController extension for browsing a MediaLibraryService content tree. | [media-browser.md](./media-browser.md) |
| SessionToken | Identifies a MediaSession or session service for controller/browser connection. | [session-token.md](./session-token.md) |
| SessionCommand / SessionCommands | Predefined or custom commands a controller can send, and the granted command set. | [session-commands.md](./session-commands.md) |
| CommandButton | Describes a button (icon, name, command) shown in system media controls or notification. | [command-button.md](./command-button.md) |
| MediaNotification.Provider / DefaultMediaNotificationProvider | Builds the media notification, kept in sync with session state and custom buttons. | [media-notification-provider.md](./media-notification-provider.md) |
| MediaButtonReceiver | BroadcastReceiver handling hardware media button intents, starting the session service. | [media-button-receiver.md](./media-button-receiver.md) |
| Transformer | Editing/transcoding API: trim, concatenate, convert format, apply effects to media. | [transformer.md](./transformer.md) |
