# MediaRouteSelector

Immutable filter describing which media routes an app is interested in, expressed as one or more supported control categories/actions. Passed to `MediaRouter.addCallback()` and `MediaRouteActionProvider.setRouteSelector()` to determine what appears in the route-selection UI. Package: `androidx.mediarouter.media`.

## Signature / Usage

```kotlin
val selector = MediaRouteSelector.Builder()
    .addControlCategory(MediaControlIntent.CATEGORY_REMOTE_PLAYBACK)
    .addControlCategory(MediaControlIntent.CATEGORY_LIVE_AUDIO)
    .build()

mediaRouteActionProvider.routeSelector = selector
mediaRouter.addCallback(selector, callback, MediaRouter.CALLBACK_FLAG_REQUEST_DISCOVERY)
```

```java
public static final class Builder {
  public Builder addControlCategory(String category);
  public Builder addControlCategories(Collection<String> categories);
  public MediaRouteSelector build();
}

public boolean matchesControlFilters(List<IntentFilter> filters);
public boolean isEmpty();
```

## Options / Props

| Category constant | Meaning |
|------|---------|
| `MediaControlIntent.CATEGORY_REMOTE_PLAYBACK` | Receiver device performs retrieval, decoding, and playback itself (Cast-like remote playback routes). |
| `MediaControlIntent.CATEGORY_LIVE_AUDIO` | App streams audio directly to a secondary audio output device. |
| `MediaControlIntent.CATEGORY_LIVE_VIDEO` | App streams video directly to a secondary video output device. |

## Notes

- A route only matches (and appears in the `MediaRouteButton` chooser) if it satisfies at least one control category in the selector; an empty selector (`isEmpty()`) matches nothing.
- The same selector instance passed to `addCallback()` should also be passed to `MediaRouteActionProvider.setRouteSelector()` so the discovery scope and the button's route list stay consistent.

## Related

- [MediaRouter](./media-router.md)
- [MediaRouteButton and MediaRouteActionProvider](./media-route-button.md)
- [MediaRouteProvider](./media-route-provider.md)
