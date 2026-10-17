---
source: https://docs.expo.dev/linking/overview/
---

# Overview of linking, deep links, Android App Links, and iOS Universal Links

Linking lets your app interact with incoming and outgoing URLs: a URL opens the app and takes the user to a specific screen (route).

## Signature / Usage

A deep link is built from scheme, host and path:

```html
<a href="myapp://web-app.com/product">View product</a>
```

- **Scheme**: identifies the app that should open the URL (example: `myapp://`). It can also be `https` or `http` for non-standard deep links; universal linking is recommended for http(s)-based deep links.
- **Host**: the domain name (example: `web-app.com`).
- **Path**: the screen to open (example: `/product`). If omitted, the user is taken to the home screen of the app.

## Options / Props

### Linking strategies

| Strategy | Description |
| --- | --- |
| Universal linking | Web domain links (`https` / `http`). Android calls this App Links, iOS calls it Universal Links. Requires a web domain hosting a file that verifies you control the domain. |
| Deep links | Linking to your app from other apps or websites using a custom scheme. |
| Outgoing links | Linking to other apps from your app via the target app's URL scheme (common schemes include `https` / `http`). |

## Notes

- Android App Links use regular HTTP(S) schemes and are exclusive to Android; the app always opens instead of a chooser dialog, and a user without the app is taken to the associated website.
- iOS Universal Links use regular HTTP(S) schemes and are exclusive to iOS; the website can show an Apple Smart Banner to prompt installation.
- Support for incoming links in Expo Go is limited; use development builds to test linking strategies.
- Expo Router is recommended: deep linking is automatically enabled for all screens, its `Link` component handles URL schemes to other apps, and third-party deep links can be customized via native intent.
- Source modificationDate: September 25, 2026 (unversioned guide, fetched 2026-10-17).

## Related

- [Linking into your app](./linking-into-your-app.md)
- [Android App Links](./android-app-links.md)
- [iOS Universal Links](./ios-universal-links.md)
- [Linking (expo-linking)](./linking.md)
