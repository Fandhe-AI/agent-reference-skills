# MediaSessionService

Superclass for a `Service` that hosts a `Player` and `MediaSession` so playback continues in the background after the launching `Activity` is destroyed.

## Signature / Usage

```kotlin
class PlaybackService : MediaSessionService() {
    private var mediaSession: MediaSession? = null

    override fun onCreate() {
        super.onCreate()
        val player = ExoPlayer.Builder(this).build()
        mediaSession = MediaSession.Builder(this, player).build()
    }

    override fun onGetSession(controllerInfo: MediaSession.ControllerInfo): MediaSession? =
        mediaSession

    override fun onDestroy() {
        mediaSession?.run {
            player.release()
            release()
            mediaSession = null
        }
        super.onDestroy()
    }
}
```

```xml
<service
    android:name=".PlaybackService"
    android:foregroundServiceType="mediaPlayback"
    android:exported="true">
    <intent-filter>
        <action android:name="androidx.media3.session.MediaSessionService"/>
        <action android:name="android.media.browse.MediaBrowserService"/>
    </intent-filter>
</service>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onGetSession(controllerInfo)` | `(ControllerInfo) -> MediaSession?` | abstract | Called when a `MediaController` connects; return the session to expose, or `null` to reject. |
| `onCreate()` | `() -> Unit` | — | Override to build the player/session; must call `super.onCreate()`. |
| `onUpdateNotification(session, startInForegroundRequired)` | `(MediaSession, Boolean) -> Unit` | posts default notification | Override to customize how/when the notification is shown and the service enters the foreground. |
| `onTaskRemoved(rootIntent)` | `(Intent?) -> Unit` | pauses playback if not ongoing | Called when the app is swiped away from recents. |
| `addSession(session)` | `(MediaSession) -> Unit` | — | Registers an additional session with the service. |
| `removeSession(session)` | `(MediaSession) -> Unit` | — | Unregisters a session from the service. |
| `getSessions()` | `() -> List<MediaSession>` | — | Returns all sessions currently added to the service. |
| `setListener(listener)` | `(Listener) -> Unit` | none | Sets a service-level `Listener` (e.g. for foreground-start failures). |

## Notes

- Package/artifact: `androidx.media3:media3-session`.
- Multiple `MediaController`s (system UI, Bluetooth, Android Auto, Wear OS) can connect to the same session simultaneously.
- The notification is created and kept in sync with `Player` state automatically; it cannot be dismissed while the foreground service is running. Call `player.release()` or `player.clearMediaItems()` to remove it immediately.
- The service leaves the foreground state after roughly 10 minutes of paused/stopped inactivity.
- For a content-browsable variant (Android Auto, Wear OS), use `MediaLibraryService` instead.
- This class itself is the `Service` subclass; general foreground-service mechanics (`startForegroundService`, `Service` lifecycle) are owned by the `android-background-work` skill's `services` category.

## Related

- [MediaSession](./media-session.md)
- [MediaLibraryService](./media-library-service.md)
- [MediaNotificationProvider](./media-notification-provider.md)
