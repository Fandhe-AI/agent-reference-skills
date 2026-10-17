---
source: https://docs.expo.dev/router/reference/sitemap/
---

# Sitemap

Expo Router injects a **/_sitemap** route that lists all routes in the app, useful for debugging.

## Signature / Usage

Remove the sitemap by adding `sitemap: false` to the `expo-router` config plugin:

```json
{
  "plugins": [
    [
      "expo-router",
      {
        "sitemap": false
      }
    ]
  ]
}
```

Test native links on a device with the `uri-scheme` CLI, for example to open the `/form-sheet` route in Expo Go on iOS:

```sh
npx uri-scheme open exp://192.168.87.39:19000/--/form-sheet --ios
```

## Notes

- Replace `192.168.87.39:19000` with the IP address shown when running `npx expo start`.
- You can also enter links directly in a browser like Safari or Chrome to test deep linking on physical devices.
- Creating a route at **app/_sitemap.tsx** overrides the built-in sitemap (see Reserved paths).
- Source: https://docs.expo.dev/router/reference/sitemap/ (unversioned guide, fetched 2026-10-17, modificationDate September 29, 2026).

## Related

- [Reserved paths](./reserved-paths.md)
