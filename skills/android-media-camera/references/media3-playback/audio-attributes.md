# AudioAttributes and Audio Focus

Declares the usage/content-type of audio played by a `Player`, used by Media3 to automatically request and respond to Android audio focus. Also underlies background-playback lifecycle recommendations.

## Signature / Usage

```kotlin
val audioAttributes =
  AudioAttributes.Builder()
    .setUsage(C.USAGE_MEDIA)
    .setContentType(C.AUDIO_CONTENT_TYPE_MUSIC)
    .build()

exoPlayer.setAudioAttributes(audioAttributes, /* handleAudioFocus= */ true)
```

```java
public Builder setUsage(@C.AudioUsage int usage)
public Builder setContentType(@C.AudioContentType int contentType)
public Builder setFlags(@C.AudioFlags int flags)
public Builder setAllowedCapturePolicy(@C.AudioAllowedCapturePolicy int allowedCapturePolicy)
public Builder setSpatializationBehavior(@C.SpatializationBehavior int spatializationBehavior)
public AudioAttributes build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `usage` | `@C.AudioUsage int` | — | Declares audio purpose (`USAGE_MEDIA`, `USAGE_ALARM`, `USAGE_NOTIFICATION`, etc.); drives audio-focus negotiation. |
| `contentType` | `@C.AudioContentType int` | — | Type of content (music, speech, sonification, movie). |
| `flags` | `@C.AudioFlags int` | — | Additional playback flags. |
| `allowedCapturePolicy` | `@C.AudioAllowedCapturePolicy int` | — | Restricts which apps may capture this app's audio output. |
| `spatializationBehavior` | `@C.SpatializationBehavior int` | — | Controls spatial audio behavior on supporting devices. |
| `handleAudioFocus` (on `Player.setAudioAttributes` / `ExoPlayer.Builder.setAudioAttributes`) | `boolean` | `false` | When `true`, Media3 automatically requests/abandons audio focus and pauses/ducks on transient loss. |

## Notes

- Setting `AudioAttributes` with `handleAudioFocus = true` is the recommended way to integrate with the system audio-focus API — no manual `AudioManager.requestAudioFocus` calls needed.
- For background playback, host the player inside a `MediaSessionService` (not an `Activity`); Media3's audio-focus handling and the system's media controls (notification, lock screen, Bluetooth) integrate through the `MediaSession`. Foreground `Service` lifecycle and notification wiring itself is out of scope here — see the `media-session-editing` category's `../media-session-editing/media-session.md` and `../media-session-editing/media-session-service.md`.
- Always call `player.release()` (and `mediaSession.release()`) when the hosting component is destroyed, to release audio focus and decoder resources.
- Artifact: `androidx.media3:media3-common` (`AudioAttributes`).

## Related

- [Player](./player.md)
- [ExoPlayer](./exoplayer.md)
- [MediaSession (media-session-editing)](../media-session-editing/media-session.md)
