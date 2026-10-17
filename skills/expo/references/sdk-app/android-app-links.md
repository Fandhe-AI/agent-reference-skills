---
source: https://docs.expo.dev/linking/android-app-links/
---

# Android App Links

Configure Android App Links to open your Expo app from a standard web URL: add `intentFilters` with `autoVerify` to the app config and set up two-way association between the website and the native app.

## Signature / Usage

```json
{
  "expo": {
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "*.webapp.io",
              "pathPrefix": "/records"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

Website verification file at **/.well-known/assetlinks.json** (Expo Router / modern React frameworks: `public/.well-known/assetlinks.json`; legacy Expo webpack projects: `web/.well-known/assetlinks.json`):

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.example",
      "sha256_cert_fingerprints": [
        "14:6D:E9:83:51:7F:66:01:84:93:4F:2F:5E:E0:8F:3A:D6:F4:CA:41:1A:CF:45:BF:8D:10:76:76:CD"
      ]
    }
  }
]
```

## Steps

| Step | Description |
| --- | --- |
| Add `intentFilters` | Set `android.intentFilters` in the app config and set `autoVerify` to `true` (required for Android App Links to work correctly). Use the regular `https` scheme, since App Links differ from standard deep links. |
| Create assetlinks.json | `package_name` comes from `android.package` in the app config. `sha256_cert_fingerprints` comes from the app signing certificate. With EAS Build: run `eas credentials -p android`, select the build profile, and copy the value under `SHA256 Fingerprint`. Without EAS: Google Play Console > Release > Setup > App Signing > Digital Asset Links JSON snippet. |
| Host assetlinks.json | Serve from your domain over HTTPS with content-type `application/json`. |
| Native app verification | Install the app on an Android device to trigger Android app verification. |

## Debugging

Test without deploying a website using the Expo CLI tunnel. Set `EXPO_TUNNEL_SUBDOMAIN=my-custom-domain` for a stable tunnel URL, put `my-custom-domain.ngrok.io` in the `host` value of `intentFilters`, then:

```sh
npx expo start --tunnel
npx expo run:android
adb shell am start -a android.intent.action.VIEW  -c android.intent.category.BROWSABLE -d "https://my-custom-domain.ngrok.io/" <your-package-name>
```

## Notes

- Multiple fingerprints can be listed in `sha256_cert_fingerprints` to support different variants of the app.
- Troubleshooting: serve the site over HTTPS with content-type `application/json`; Android verification may take 20 seconds or longer; if you update the web files, rebuild the native app to trigger a server update on the vendor side (Google).
- After the app opens, handle the inbound link as described in the "Linking into your app" page.
- Source modificationDate: September 25, 2026 (unversioned guide, fetched 2026-10-17).

## Related

- [Linking overview](./linking-overview.md)
- [Linking into your app](./linking-into-your-app.md)
- [iOS Universal Links](./ios-universal-links.md)
- [Linking (expo-linking)](./linking.md)
