---
source: https://docs.expo.dev/linking/ios-universal-links/
---

# iOS Universal Links

Configure iOS Universal Links to open your Expo app from a standard web URL: host an apple-app-site-association (AASA) file on the website and add `ios.associatedDomains` to the app config.

## Signature / Usage

AASA file at **/.well-known/apple-app-site-association** (Expo Router / modern React frameworks: `public/.well-known/apple-app-site-association`; legacy Expo webpack projects: `web/.well-known/apple-app-site-association`):

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "QQ57RJ5UTD.com.example.myapp",
        "paths": ["/records/*"]
      }
    ]
  },
  "activitycontinuation": {
    "apps": ["<APPLE_TEAM_ID>.<BUNDLE_ID>"]
  },
  "webcredentials": {
    "apps": ["<APPLE_TEAM_ID>.<BUNDLE_ID>"]
  }
}
```

App config (do not include the protocol `https` in the value):

```json
{
  "expo": {
    "ios": {
      "associatedDomains": ["applinks:expo.dev"]
    }
  }
}
```

## Steps

| Step | Description |
| --- | --- |
| Create AASA file | Specifies the Apple Developer Team ID, bundle identifier, and supported paths. `appID` syntax is `<APPLE_TEAM_ID>.<BUNDLE_ID>`. The `*` wildcard does not match domain or path separators (periods and slashes). `activitycontinuation` and `webcredentials` are optional but recommended. |
| `details` format (iOS 13+) | Use `appIDs` instead of `appID` and an array of `components` (fragments `#`, path `/`, query `?`, `exclude`, `comment`). To support all iOS versions provide both formats in `details`, with the more recent format first. |
| Host AASA file | Serve over HTTPS from your domain. |
| Native app configuration | Add `ios.associatedDomains` to the app config. Build with EAS Build so the entitlement is registered with Apple automatically. |
| Native app verification | Install the app on an iOS device to trigger verification. |

Manual native configuration (no EAS and no `npx expo prebuild`): configure the Associated Domains capability for the bundle identifier manually and add to **ios/[app]/[app].entitlements**:

```xml
<key>com.apple.developer.associated-domains</key>
<array>
  <string>applinks:expo.dev</string>
</array>
```

## Apple Smart Banner

Shows a banner prompting installation when the user is on a mobile device without the app. Add to the website `<head>`:

```html
<meta name="apple-itunes-app" content="app-id=<ITUNES_ID>" />
```

Run `npx setup-safari` to generate the meta tag automatically. For a statically rendered Expo Router website, put the tag in the `<head>` of **src/app/+html.tsx** (uses `useServerDocumentContext` from `expo-router/html`).

## Debugging

Set `EXPO_TUNNEL_SUBDOMAIN=my-custom-domain`, use `my-custom-domain.ngrok.io` in `associatedDomains`, then:

```sh
npx expo start --tunnel
npx expo run:ios
```

Type the custom domain link in the device browser to open the app.

## Notes

- The experimental CLI command `npx setup-safari` can register a bundle identifier, assign entitlements and create an iTunes app entry automatically.
- iOS downloads the AASA when the app is first installed or when updates are installed from the App Store, and does not refresh frequently afterwards. Changing AASA paths for a production app requires a full App Store update.
- The uncompressed AASA file cannot be larger than 128kb. Serve over HTTPS. If you update web files, rebuild the native app to trigger a server update on the vendor side (Apple).
- Source modificationDate: October 13, 2026 (unversioned guide, fetched 2026-10-17).

## Related

- [Linking overview](./linking-overview.md)
- [Linking into your app](./linking-into-your-app.md)
- [Android App Links](./android-app-links.md)
- [Linking (expo-linking)](./linking.md)
