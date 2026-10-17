---
source: https://docs.expo.dev/linking/into-your-app/
---

# Linking into your app

Handle an incoming URL in a React Native and Expo app by creating a deep link with a custom scheme.

## Signature / Usage

Add a custom scheme in the app config:

```json
{
  "expo": {
    "scheme": "myapp"
  }
}
```

Observe and parse the link that opened the app (not needed with Expo Router):

```tsx
import * as Linking from 'expo-linking';

export default function Home() {
  const url = Linking.useLinkingURL();

  if (url) {
    const { hostname, path, queryParams } = Linking.parse(url);
    console.log(
      `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
        queryParams
      )}`
    );
  }

  return null;
}
```

### Test the deep link

```sh
# If you have `android.package` or `ios.bundleIdentifier` defined in your app.json
npx uri-scheme open com.example.app://somepath/details --android

# If you have a `scheme` defined in your app.json
npx uri-scheme open myapp://somepath/details --ios
```

Expo Go uses the `exp://` scheme; in development the complete URL looks like `exp://127.0.0.1:8081`:

```sh
npx uri-scheme open exp://127.0.0.1:8081/--/somepath/into/app?hello=world --ios
```

## Notes

- After adding a custom scheme, create a new development build. Once installed, links open with `myapp://`.
- If no custom scheme is defined, the app uses `android.package` and `ios.bundleIdentifier` as default schemes in development and production builds (Expo Prebuild adds them as custom schemes).
- In Expo Go, `/--/` is added to the URL when a path is specified; the substring after it is the deep link path. By default `exp://` is replaced with `http://`; `exps://` opens `https://` URLs but does not support insecure TLS certificates.
- `Linking.useLinkingURL()` works by returning `Linking.getInitialURL()` initially and observing new links with `Linking.addEventListener('url', callback)`.
- Entering a link in a browser address bar may not work as expected for custom schemes; use universal linking for that.
- If the user does not have the app installed, deep links do not work. Android App Links / iOS Universal Links (or attribution services such as Branch) cover that case.
- With Expo Router, deep linking is automatic for all routes and the "Handle URLs" section can be ignored.
- Source modificationDate: July 17, 2026 (unversioned guide, fetched 2026-10-17).

## Related

- [Linking overview](./linking-overview.md)
- [Linking (expo-linking)](./linking.md)
- [Android App Links](./android-app-links.md)
- [iOS Universal Links](./ios-universal-links.md)
