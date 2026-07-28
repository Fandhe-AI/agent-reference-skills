# CommandButton

Describes a single button (icon, display name, and the command it triggers) shown in the system media controls, notification, or per-media-item UI.

## Signature / Usage

```kotlin
val favoriteButton = CommandButton.Builder(CommandButton.ICON_HEART_UNFILLED)
    .setDisplayName("Save to favorites")
    .setSessionCommand(SessionCommand(ACTION_FAVORITES, Bundle.EMPTY))
    .build()

mediaSession = MediaSession.Builder(this, player)
    .setCallback(MyCallback())
    .setMediaButtonPreferences(ImmutableList.of(favoriteButton))
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `CommandButton.Builder(icon)` | `@Icon Int` | — | Constructor taking one of the predefined `ICON_*` constants (e.g. `ICON_HEART_FILLED`, `ICON_PLAYLIST_ADD`, `ICON_SHUFFLE_ON`). |
| `setSessionCommand(command)` | `SessionCommand` | — | Custom `SessionCommand` invoked when the button is pressed. |
| `setPlayerCommand(command)` | `@Player.Command Int` | — | Standard `Player` command (e.g. `COMMAND_SEEK_TO_NEXT`) invoked instead of a session command. |
| `setCustomIconResId(resId)` | `@DrawableRes Int` | — | Drawable resource used when the platform doesn't support the chosen `ICON_*`. |
| `setIconUri(uri)` | `Uri` | — | Remote icon image URI, loaded via the session's `BitmapLoader`. |
| `setDisplayName(name)` | `CharSequence` | — | Accessible label / tooltip text for the button. |
| `setEnabled(enabled)` | `Boolean` | `true` | Whether the button is currently actionable. |
| `setExtras(extras)` | `Bundle` | `Bundle.EMPTY` | Extra data passed through with the button. |
| `setSlots(slots)` | `@Slot Int...` | — | Preferred notification/system-UI slot(s) for the button. |
| `build()` | — | — | Returns the immutable `CommandButton`. |

## Notes

- Package/artifact: `androidx.media3:media3-session`.
- Attach buttons to a session via `MediaSession.Builder.setMediaButtonPreferences()` (recommended) or the deprecated `setCustomLayout()`; per-media-item buttons use `setCommandButtonsForMediaItems()`.
- On Android 13+ (API 33), the system derives up to 5 media-control slots directly from `Player` state and `CommandButton`s; slots 1-3 default to play/pause, previous, next unless overridden.
- A button built with `setSessionCommand()` is routed to `MediaSession.Callback.onCustomCommand()`; one built with `setPlayerCommand()` invokes the corresponding `Player` method directly.

## Related

- [MediaSession](./media-session.md)
- [MediaSessionCallback](./media-session-callback.md)
- [SessionCommands](./session-commands.md)
