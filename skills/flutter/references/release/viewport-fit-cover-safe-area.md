---
source: https://docs.flutter.dev/release/breaking-changes/viewport-fit-cover-safe-area
---

# Web viewport-fit=cover SafeArea support

Flutter web honors `viewport-fit=cover` in `web/index.html` and populates `FlutterView.viewPadding`, `MediaQuery.paddingOf`, and `SafeArea` from the browser's CSS `env(safe-area-inset-*)` values.

## Signature / Usage

Keep edge-to-edge rendering and wrap UI in `SafeArea`:

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: SafeArea(
      child: MyAppContent(),
    ),
  );
}
```

Revert to `viewport-fit=contain` (default). Code before migration:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

Code after migration:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Notes

- Timeline: in stable release 3.50.
- Affected only if the existing `web/index.html` already specifies `viewport-fit=cover`; such apps now render edge-to-edge behind cutouts, notches, and home indicators instead of having `viewport-fit=cover` stripped by the web engine.
- Without `viewport-fit=cover` (default), Flutter web renders within the browser's safe area (`viewport-fit=contain`) and reports `ViewPadding.zero`. With it, Flutter web preserves it on the active `<meta name="viewport" flt-viewport>` tag and measures `env(safe-area-inset-*)`.
- Related: issue 84833; PR 191647 in flutter/flutter.
- Source: https://docs.flutter.dev/release/breaking-changes/viewport-fit-cover-safe-area (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
