# Deep Link Types

Android supports three kinds of link-based navigation into an app: custom-scheme deep links, generic `http`/`https` web links, and verified Android App Links.

## Signature / Usage

```xml
<!-- Custom scheme -->
<data android:scheme="example" android:host="gizmos" />

<!-- Web link (http/https) -->
<data android:scheme="https" android:host="www.example.com" android:pathPrefix="/gizmos" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Custom deep link | URI scheme | — | App-defined scheme (e.g. `example://products/123`). Full control, no browser fallback, but can trigger the disambiguation dialog if another app registers the same scheme. |
| Web link | `http`/`https` | — | Standard URL. Opens in a browser by default on Android 12+ unless verified as an App Link. |
| Android App Link | Verified `http`/`https` | — | Web link with a cryptographically verified association to a website via `assetlinks.json`. Skips the disambiguation dialog and opens the app directly. Requires Android 6.0 (API 23)+ with Google Play services. |

## Notes

- Android App Links is the recommended type for deep links into your own website/domain; it also falls back to the website automatically when the app isn't installed (no 404).
- Android 15 (API 35)+ adds Dynamic App Links: `assetlinks.json` can carry path/query/fragment matching rules that update server-side without an app release, subject to a periodic re-fetch (up to 7 days to propagate).
- Generic deep links (custom scheme or unverified web link) work on all Android versions and devices; Android App Links require Android 6.0+ with Google services.

## Related

- [intent-filter-deep-links](./intent-filter-deep-links.md)
- [asset-links-verification](./asset-links-verification.md)
- [verify-app-links](./verify-app-links.md)
