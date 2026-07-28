# MediaBrowser

Extends `MediaController` with methods to browse the content tree exposed by a `MediaLibraryService`.

## Signature / Usage

```kotlin
val browserFuture = MediaBrowser.Builder(context, sessionToken).buildAsync()
browserFuture.addListener(
    {
        val browser = browserFuture.get()
        val rootFuture = browser.getLibraryRoot(/* params= */ null)
        rootFuture.addListener(
            {
                val root = rootFuture.get().value!!
                val childrenFuture = browser.getChildren(root.mediaId, 0, Int.MAX_VALUE, null)
            },
            MoreExecutors.directExecutor(),
        )
    },
    MoreExecutors.directExecutor(),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `MediaBrowser.Builder(context, token)` | `Context, SessionToken` | — | Constructor; `token` typically targets a `MediaLibraryService`. |
| `getLibraryRoot(params)` | `(LibraryParams?) -> ListenableFuture<LibraryResult<MediaItem>>` | — | Fetches the root `MediaItem` of the browse tree. |
| `subscribe(parentId, params)` | `(String, LibraryParams?) -> ListenableFuture<LibraryResult<Void>>` | — | Subscribes to changes under `parentId`; triggers `Listener.onChildrenChanged`. |
| `unsubscribe(parentId)` | `(String) -> ListenableFuture<LibraryResult<Void>>` | — | Cancels a subscription. |
| `getChildren(parentId, page, pageSize, params)` | `(String, Int, Int, LibraryParams?) -> ListenableFuture<LibraryResult<ImmutableList<MediaItem>>>` | — | Fetches a page of children (`page` 0-based, `pageSize` ≥ 1). |
| `getItem(mediaId)` | `(String) -> ListenableFuture<LibraryResult<MediaItem>>` | — | Fetches a single item by ID. |
| `search(query, params)` | `(String, LibraryParams?) -> ListenableFuture<LibraryResult<Void>>` | — | Requests a search; triggers `Listener.onSearchResultChanged` when ready. |
| `getSearchResult(query, page, pageSize, params)` | `(String, Int, Int, LibraryParams?) -> ListenableFuture<LibraryResult<ImmutableList<MediaItem>>>` | — | Fetches a page of search results. |

## Notes

- Package/artifact: `androidx.media3:media3-session`.
- All `MediaController` builder options (`setListener`, `setConnectionHints`, `setBitmapLoader`, `setApplicationLooper`, ...) apply equally to `MediaBrowser.Builder`.
- `getChildren` / `getSearchResult` results are paginated; use `getLibraryRoot` first to obtain the root `mediaId`.

## Related

- [MediaController](./media-controller.md)
- [MediaLibraryService](./media-library-service.md)
- [SessionToken](./session-token.md)
