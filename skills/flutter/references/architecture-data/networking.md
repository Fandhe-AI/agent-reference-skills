---
source: https://docs.flutter.dev/data-and-backend/networking
---

# Networking

Internet network calls in Flutter: the `http` package is the simplest cross-platform way to issue HTTP requests, with extra manifest/entitlement steps on Android and macOS.

## Signature / Usage

Android: declare internet use in `AndroidManifest.xml`:

```xml
<manifest xmlns:android...>
 ...
 <uses-permission android:name="android.permission.INTERNET" />
 <application ...
</manifest>
```

macOS: allow network access in the relevant `*.entitlements` files:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

## Notes

- The `http` package is supported on Android, iOS, macOS, Windows, Linux and the web.
- Some platforms require additional steps (Android and macOS above). Learn more about setting up entitlements in the macOS building page.
- For practical samples of fetching data, WebSockets, and parsing data in the background, see the networking cookbook recipes.

## Related

- [JSON and serialization](./json-serialization.md)
- [Guide to app architecture](./architecture-guide.md)
