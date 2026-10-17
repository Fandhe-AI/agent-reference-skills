---
source: https://docs.expo.dev/modules/module-config/
---

# expo-module.config.json

Configuration file for Expo modules. Currently configures autolinking and module registration.

## Signature / Usage

```json
{
  "platforms": ["apple", "android"],
  "apple": {
    "modules": ["MyModule"],
    "appDelegateSubscribers": ["AppLifecycleDelegate"]
  },
  "android": {
    "modules": ["my.module.package.MyModule"]
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `platforms` | string[] | Supported platforms. Acceptable values: `android`, `apple` (or the more granular `ios` / `macos` / `tvos`), `web`, and `devtools`. |
| `apple` | object | Options specific to Apple platforms. |
| `apple.modules` | string[] | Names of Swift native module classes to put in the generated modules provider file. |
| `apple.appDelegateSubscribers` | string[] | Names of Swift classes that hook into `ExpoAppDelegate` to receive AppDelegate lifecycle events. |
| `android` | object | Options specific to the Android platform. |
| `android.modules` | string[] | Full names (package + class name) of Kotlin native module classes to put in the generated package provider file. |

## Notes

- The combined example above is assembled from the property list on this page and the snippets in the AppDelegate subscribers and additional-platform-support pages.
- `devtools` platform: see the "Create a dev tools plugin" guide in the Expo docs (not included in this skill).
- The `ios` key in the existing-library page examples is the granular form; `apple` is the universal form introduced for macOS and tvOS support.
- Source modificationDate: February 10, 2025 (unversioned guide page, fetched 2026-10-17).

## Related

- [Autolinking](./autolinking.md)
- [iOS AppDelegate subscribers](./appdelegate-subscribers.md)
- [Additional platform support](./additional-platform-support.md)
- [Integrate in an existing library](./existing-library.md)
