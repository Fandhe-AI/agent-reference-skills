---
source: https://docs.flutter.dev/release/breaking-changes/scroll-cache-extent
---

# Deprecated cacheExtent and cacheExtentStyle

`cacheExtent` and `cacheExtentStyle` are deprecated in scrolling widgets (`ListView`, `GridView`, `CustomScrollView`, `Viewport`) and render objects (`RenderViewport`). They are replaced by `scrollCacheExtent`, a `ScrollCacheExtent` object holding both the value and the strategy (pixels or viewport).

## Signature / Usage

Widget layer, pixels:

```dart
// Before
ListView(
  cacheExtent: 500.0,
  children: // ...
)

// After
ListView(
  scrollCacheExtent: const ScrollCacheExtent.pixels(500.0),
  children: // ...
)
```

Widget layer, viewport:

```dart
// Before
Viewport(
  cacheExtent: 0.5,
  cacheExtentStyle: CacheExtentStyle.viewport,
  slivers: // ...
)

// After
Viewport(
  scrollCacheExtent: const ScrollCacheExtent.viewport(0.5),
  slivers: // ...
)
```

Render object layer:

```dart
// Before
renderViewport.cacheExtent = 500.0;
renderViewport.cacheExtentStyle = CacheExtentStyle.pixel;

// After
renderViewport.scrollCacheExtent = const ScrollCacheExtent.pixels(500.0);
```

## Notes

- Timeline: landed in version 3.41.0-0.0.pre; in stable release 3.44.
- Migration (Flutter 3.44): `cacheExtent` (defaults to pixels) becomes `ScrollCacheExtent.pixels`; `cacheExtent` with `CacheExtentStyle.viewport` becomes `ScrollCacheExtent.viewport`.
- API references: `ScrollCacheExtent` and `RenderViewportBase.scrollCacheExtent` (rendering), `ScrollView.scrollCacheExtent` (widgets) on api.flutter.dev.

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
- [Deprecate onReorder callback](./deprecate-onreorder-callback.md)
