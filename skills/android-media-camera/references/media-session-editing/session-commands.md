# SessionCommand / SessionCommands

`SessionCommand` represents a single command a `MediaController` can send to a `MediaSession` (predefined or custom). `SessionCommands` is the immutable set of session commands granted to a controller, alongside `Player.Commands` for player-level actions.

## Signature / Usage

```kotlin
val customAction = SessionCommand(ACTION_FAVORITES, Bundle.EMPTY)

override fun onConnect(
    session: MediaSession,
    controller: MediaSession.ControllerInfo,
): MediaSession.ConnectionResult {
    return MediaSession.ConnectionResult.AcceptedResultBuilder(session)
        .setAvailableSessionCommands(
            MediaSession.ConnectionResult.DEFAULT_SESSION_COMMANDS.buildUpon()
                .add(customAction)
                .build()
        )
        .build()
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `SessionCommand(commandCode)` | `@CommandCode Int` | — | Constructs a predefined command (e.g. `COMMAND_CODE_SESSION_SET_RATING`). |
| `SessionCommand(action, extras)` | `String, Bundle` | — | Constructs a custom command; `commandCode` is `COMMAND_CODE_CUSTOM`. |
| `commandCode` | `Int` | `COMMAND_CODE_CUSTOM` | Predefined command identifier. |
| `customAction` | `String` | `""` | Action string identifying a custom command. |
| `customExtras` | `Bundle` | `Bundle.EMPTY` | Extra data attached to a custom command. |
| `SessionCommands.Builder` | — | — | Builds an immutable `SessionCommands` set; used via `ConnectionResult.setAvailableSessionCommands()`. |

## Notes

- Package/artifact: `androidx.media3:media3-session`.
- Library-browsing commands (`COMMAND_CODE_LIBRARY_GET_LIBRARY_ROOT`, `COMMAND_CODE_LIBRARY_GET_CHILDREN`, `COMMAND_CODE_LIBRARY_SUBSCRIBE`, `COMMAND_CODE_LIBRARY_SEARCH`, etc.) are session commands and follow the same grant mechanism as custom commands.
- `Player.Commands` (standard playback actions like `COMMAND_PLAY_PAUSE`, `COMMAND_SEEK_TO_NEXT`) are granted separately via `ConnectionResult.setAvailablePlayerCommands()`; they belong to the `Player` interface described in the `media3-playback` category.
- `SessionCommand.equals()` ignores `customExtras`, comparing only `commandCode` / `customAction`.

## Related

- [MediaSessionCallback](./media-session-callback.md)
- [CommandButton](./command-button.md)
