# MediaSession.Callback

Interface implemented on `MediaSession.Builder.setCallback()` to accept/reject controller connections, grant available commands, and react to custom commands and playlist requests.

## Signature / Usage

```kotlin
private inner class MyCallback : MediaSession.Callback {
    override fun onConnect(
        session: MediaSession,
        controller: MediaSession.ControllerInfo,
    ): MediaSession.ConnectionResult {
        return MediaSession.ConnectionResult.AcceptedResultBuilder(session)
            .setAvailableSessionCommands(
                MediaSession.ConnectionResult.DEFAULT_SESSION_COMMANDS.buildUpon()
                    .add(SessionCommand(ACTION_FAVORITES, Bundle.EMPTY))
                    .build()
            )
            .build()
    }

    override fun onCustomCommand(
        session: MediaSession,
        controller: MediaSession.ControllerInfo,
        customCommand: SessionCommand,
        args: Bundle,
    ): ListenableFuture<SessionResult> {
        if (customCommand.customAction == ACTION_FAVORITES) {
            saveToFavorites(session.player.currentMediaItem)
            return Futures.immediateFuture(SessionResult(SessionResult.RESULT_SUCCESS))
        }
        return super.onCustomCommand(session, controller, customCommand, args)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onConnect(session, controller)` | `(MediaSession, ControllerInfo) -> ConnectionResult` | accepts with default commands | Called when a controller is about to connect; decides acceptance and which player/session commands are available. |
| `onPostConnect(session, controller)` | `(MediaSession, ControllerInfo) -> Unit` | no-op | Called immediately after a controller connects, for custom initialization (e.g. sending an initial custom layout). |
| `onDisconnected(session, controller)` | `(MediaSession, ControllerInfo) -> Unit` | no-op | Called when a controller disconnects. |
| `onCustomCommand(session, controller, customCommand, args)` | `(...) -> ListenableFuture<SessionResult>` | returns not-supported | Called when a controller sends a `SessionCommand` with `COMMAND_CODE_CUSTOM`. |
| `onAddMediaItems(session, controller, mediaItems)` | `(...) -> ListenableFuture<List<MediaItem>>` | rejects | Called when a controller requests adding items (e.g. by `mediaId` or search query) to the playlist; resolve `MediaItem`s (e.g. fetch playable `Uri`) before returning. |
| `onSetMediaItems(session, controller, mediaItems, startIndex, startPositionMs)` | `(...) -> ListenableFuture<MediaItemsWithStartPosition>` | default resolution | Called when a controller requests replacing the playlist. |
| `onPlaybackResumption(mediaSession, controller, isForPlayback)` | `(...) -> ListenableFuture<MediaItemsWithStartPosition>` | none | Called when a controller (e.g. system resumption UI) requests `play()` with no current item; return the playlist/position to resume. |
| `onPlayerCommandRequest(session, controller, playerCommand)` | `(...) -> Int` | deprecated | Deprecated; use `Player.getAvailableCommands()` / `setAvailableCommands()` instead. |

## Notes

- Package/artifact: `androidx.media3:media3-session`.
- Commands not granted in `onConnect()` are silently unavailable to that controller (buttons render disabled in system UI).
- `onAddMediaItems` is the standard place to resolve playable `Uri`s from opaque `mediaId`s sent by Android Auto / Assistant.

## Related

- [MediaSession](./media-session.md)
- [SessionCommands](./session-commands.md)
- [CommandButton](./command-button.md)
