---
source: https://docs.flutter.dev/ui/layout/scrolling/slivers
---

# Using slivers to achieve fancy scrolling

A sliver is a portion of a scrollable area that you can define to behave in a special way. Slivers achieve custom scrolling effects such as elastic scrolling.

## Signature / Usage

The page contains no code listing; these are the sliver APIs it names.

```text
CustomScrollView
SliverAppBar
SliverGrid
SliverList
```

### Resources

- Slivers, Demystified: a Flutter blog post on implementing custom scrolling using the sliver classes.
- SliverAppBar: one-minute Widget-of-the-week video.
- SliverList and SliverGrid: one-minute Widget-of-the-week video.
- Slivers explained - Making dynamic layouts: a 50-minute episode of The Boring Show with Ian Hickson (Flutter's Tech Lead) and Filip Hracek.
- A free, instructor-led video workshop using DartPad: "Building scrolling experiences in Flutter".

## Notes

- The page itself is a link collection; the API detail lives in api.flutter.dev (`CustomScrollView`, `SliverGrid`, `SliverList`) and in the Material library (`SliverAppBar`).
- Migration (Flutter 3.44): `cacheExtent` / `cacheExtentStyle` on `CustomScrollView` and `Viewport` are deprecated in favor of `scrollCacheExtent`. See the release category.
- Flutter slivers (Dart) are distinct from Compose lazy lists (android-compose-ui) and SwiftUI scroll views (apple-swiftui).

## Related

- [Scrolling](./scrolling.md)
- [CustomScrollView](../widgets-api/CustomScrollView.md)
- [Deprecated cacheExtent and cacheExtentStyle](../release/scroll-cache-extent.md)
