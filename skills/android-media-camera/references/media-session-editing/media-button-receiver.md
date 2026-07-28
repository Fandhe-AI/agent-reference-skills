# MediaButtonReceiver

`BroadcastReceiver` that handles hardware media button intents (wired/Bluetooth headset play/pause, headset hook) and starts the appropriate `MediaSessionService`/`MediaLibraryService`.

## Signature / Usage

```xml
<receiver
    android:name="androidx.media3.session.MediaButtonReceiver"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.MEDIA_BUTTON" />
    </intent-filter>
</receiver>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onReceive(context, intent)` | `(Context, Intent) -> Unit` | delegates to `handleIntentAndMaybeStartTheService` | Entry point invoked by the system for `ACTION_MEDIA_BUTTON` intents. |
| `handleIntentAndMaybeStartTheService(context, intent)` (protected) | `(Context, Intent) -> Unit` | starts the discovered session service | Validates `EXTRA_KEY_EVENT`, filters to `ACTION_DOWN` with zero repeat count, and (API 26+) only PLAY / PLAY_PAUSE / HEADSETHOOK key codes. |
| `shouldStartForegroundService(context, intent)` (protected) | `(Context, Intent) -> Boolean` | `true` | Override to suppress starting the service for specific events. |
| `onForegroundServiceStartNotAllowedException()` (protected, API 31+) | `() -> Unit` | logs the error | Called if starting the foreground service is rejected by the platform. |

## Notes

- Package/artifact: `androidx.media3:media3-session`.
- Exactly one `MediaSessionService` / `MediaLibraryService` must be discoverable in the manifest for `ACTION_MEDIA_BUTTON`; an `IllegalStateException` is thrown if none or multiple are found.
- The app must handle resumption (`MediaSession.Callback.onPlaybackResumption`) and start playback promptly, since the receiver starts the service in the foreground and a slow start can throw `ForegroundServiceDidNotStartInTimeException`.
- `onReceive()` can be overridden for custom intent handling, but most apps only need the manifest `<receiver>` declaration.

## Related

- [MediaSessionService](./media-session-service.md)
- [MediaNotificationProvider](./media-notification-provider.md)
