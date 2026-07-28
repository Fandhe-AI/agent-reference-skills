# MediaLibraryService

`MediaSessionService` variant that additionally serves a browsable content tree, for clients like Android Auto, Wear OS, and the Google Assistant that need to display a media library UI.

## Signature / Usage

```kotlin
class PlaybackService : MediaLibraryService() {
    private var mediaLibrarySession: MediaLibrarySession? = null
    private val callback = object : MediaLibrarySession.Callback {
        override fun onGetLibraryRoot(
            session: MediaLibrarySession,
            browser: MediaSession.ControllerInfo,
            params: LibraryParams?,
        ): ListenableFuture<LibraryResult<MediaItem>> =
            Futures.immediateFuture(LibraryResult.ofItem(rootItem, params))

        override fun onGetChildren(
            session: MediaLibrarySession,
            browser: MediaSession.ControllerInfo,
            parentId: String,
            page: Int,
            pageSize: Int,
            params: LibraryParams?,
        ): ListenableFuture<LibraryResult<ImmutableList<MediaItem>>> =
            Futures.immediateFuture(LibraryResult.ofItemList(childrenOf(parentId), params))
    }

    override fun onGetSession(controllerInfo: MediaSession.ControllerInfo) = mediaLibrarySession

    override fun onCreate() {
        super.onCreate()
        val player = ExoPlayer.Builder(this).build()
        mediaLibrarySession = MediaLibrarySession.Builder(this, player, callback).build()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `MediaLibrarySession.Builder(service, player, callback)` | `MediaLibraryService, Player, Callback` | — | Constructor used inside `onCreate()`. |
| `onGetLibraryRoot(session, browser, params)` | `(...) -> ListenableFuture<LibraryResult<MediaItem>>` | none (default) | Returns the root `MediaItem` of the browse tree. |
| `onGetChildren(session, browser, parentId, page, pageSize, params)` | `(...) -> ListenableFuture<LibraryResult<ImmutableList<MediaItem>>>` | none (default) | Returns a page of children under `parentId`; `page` is 0-based, `pageSize` ≥ 1. |
| `onGetItem(session, browser, mediaId)` | `(...) -> ListenableFuture<LibraryResult<MediaItem>>` | none (default) | Returns a single `MediaItem` by ID. |
| `onSubscribe(session, browser, parentId, params)` | `(...) -> ListenableFuture<LibraryResult<Void>>` | none (default) | Subscribes the browser to change notifications for `parentId`. |
| `onUnsubscribe(session, browser, parentId)` | `(...) -> ListenableFuture<LibraryResult<Void>>` | none (default) | Cancels a prior subscription. |
| `onSearch(session, browser, query, params)` | `(...) -> ListenableFuture<LibraryResult<Void>>` | none (default) | Requests a search; success only means the search was started. |
| `onGetSearchResult(session, browser, query, page, pageSize, params)` | `(...) -> ListenableFuture<LibraryResult<ImmutableList<MediaItem>>>` | none (default) | Returns a page of search results. |

## Notes

- Package/artifact: `androidx.media3:media3-session`.
- Media items are flagged `browsable` (has children) and/or `playable` (can be played directly) to describe tree structure to clients.
- Manifest must declare both `androidx.media3.session.MediaLibraryService` and `android.media.browse.MediaBrowserService` intent filters for compatibility with the platform browser API.
- Sessions can also expose per-item `CommandButton`s via `MediaSession.Builder.setCommandButtonsForMediaItems()`, queryable by clients via `getCommandButtonsForMediaItem()`.

## Related

- [MediaSessionService](./media-session-service.md)
- [MediaBrowser](./media-browser.md)
- [MediaSession](./media-session.md)
