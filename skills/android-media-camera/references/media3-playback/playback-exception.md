# PlaybackException and Error Handling

`PlaybackException` (and its `ExoPlaybackException` subclass thrown by `ExoPlayer`) reports playback failures with a machine-readable `errorCode`. Delivered via `Player.Listener.onPlayerError`, immediately before the player transitions to `Player.STATE_IDLE`.

## Signature / Usage

```kotlin
player.addListener(
  object : Player.Listener {
    override fun onPlayerError(error: PlaybackException) {
      val cause = error.cause
      if (cause is HttpDataSourceException) {
        if (cause is InvalidResponseCodeException) {
          // Inspect cause.responseCode, cause.responseMessage, cause.headerFields.
        }
      }
    }
  }
)
```

```java
public final @ErrorCode int errorCode;
public static String getErrorCodeName(@ErrorCode int errorCode);
public Throwable getCause(); // inherited from Exception
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `errorCode` | `@ErrorCode int` | — | Machine-readable failure category, e.g. `ERROR_CODE_UNSPECIFIED` (1000), `ERROR_CODE_IO_NETWORK_CONNECTION_FAILED` (2001), `ERROR_CODE_DECODER_INIT_FAILED` (4001), `ERROR_CODE_DRM_LICENSE_EXPIRED` (6008). |
| `getErrorCodeName(errorCode)` | static method | — | Converts an `errorCode` to a human-readable name for logging. |
| `getCause()` | `Throwable?` | — | Underlying cause, e.g. `HttpDataSourceException` / `InvalidResponseCodeException` for network failures. |

## Notes

- Only implement `onPlayerError` for the errors you need to act on; `ERROR_CODE_*` groups causes into ranges (generic, network/IO, decoder, DRM, remote-device, etc.) so a `when`/`switch` on `errorCode` is preferable to reflecting on the exception type.
- After a fatal error, the player enters `STATE_IDLE`; call `player.prepare()` again to retry.
- `ExoPlaybackException` (in `androidx.media3.exoplayer`) is the `ExoPlayer`-specific subclass and carries additional renderer/source-stage information.
- Artifact: `androidx.media3:media3-common` (`PlaybackException`), `androidx.media3:media3-exoplayer` (`ExoPlaybackException`).

## Related

- [Player.Listener](./player-listener.md)
- [Player](./player.md)
