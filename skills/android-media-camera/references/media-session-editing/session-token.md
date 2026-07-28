# SessionToken

Identifies an ongoing `MediaSession` or a service (`MediaSessionService`, `MediaLibraryService`, or a legacy `MediaBrowserServiceCompat`) that a `MediaController` or `MediaBrowser` can connect to.

## Signature / Usage

```kotlin
val sessionToken = SessionToken(context, ComponentName(context, PlaybackService::class.java))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `SessionToken(context, serviceComponent)` | `Context, ComponentName` | — | Constructor referencing a declared `MediaSessionService` / `MediaLibraryService` / compat service. |
| `createSessionToken(context, token)` (static) | `Context, Token/Parcelable` | — | Returns `ListenableFuture<SessionToken>` resolved from a platform `MediaSession.Token`. |
| `getAllServiceTokens(context)` (static) | `Context` | — | Returns `ImmutableSet<SessionToken>` for all session services declared in the manifest. |
| `getPackageName()` | `() -> String` | — | Package of the session/service. |
| `getServiceName()` | `() -> String` | — | Service class name, if the token targets a service. |
| `getType()` | `() -> Int` (`@TokenType`) | — | One of `TYPE_SESSION`, `TYPE_SESSION_SERVICE`, `TYPE_LIBRARY_SERVICE`. |
| `getSessionVersion()` / `getInterfaceVersion()` | `() -> Int` | — | Media3 session/interface version of the remote side. |
| `getExtras()` | `() -> Bundle` | — | Extras set via `MediaSession.Builder.setExtras()`. |

## Notes

- Package/artifact: `androidx.media3:media3-session`.
- `TYPE_LIBRARY_SERVICE` tokens are the ones expected by `MediaBrowser.Builder`; `TYPE_SESSION` / `TYPE_SESSION_SERVICE` are sufficient for a plain `MediaController`.
- Resolving a token to an actual connection is asynchronous; `SessionToken` creation alone does not connect.

## Related

- [MediaController](./media-controller.md)
- [MediaBrowser](./media-browser.md)
