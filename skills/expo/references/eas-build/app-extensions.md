---
source: https://docs.expo.dev/build-reference/app-extensions/
---

# iOS App Extensions

Learn how to use app extensions with EAS Build to add custom functionality.

## Signature / Usage

EAS Build supports app extensions in both existing React Native projects and projects that use Continuous Native Generation (CNG).

CNG projects (experimental support): add an app extension by writing a config plugin (or using a library that creates an extension with its own config plugin). Declaring app extensions with `extra.eas.build.experimental.ios.appExtensions` in app config lets EAS CLI know about them before the build starts, so required credentials are generated and validated.

```json
{
  "expo": {
    "extra": {
      "eas": {
        "build": {
          "experimental": {
            "ios": {
              "appExtensions": [
                {
                  "targetName": "myappextension",
                  "bundleIdentifier": "com.myapp.extension",
                  "entitlements": {
                    "com.apple.example": "entitlement value"
                  }
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

## Notes

- Existing React Native projects: EAS CLI automatically detects app extensions configured in the Xcode project and generates credentials for each target, or you can provide them in **credentials.json** (see local-credentials.md, Multi target project).
- Config plugins can modify the app config; libraries that add an extension usually declare it there too.
- Source modificationDate: June 26, 2026 (fetched 2026-10-17).

## Related

- [Using local credentials](./local-credentials.md)
- [iOS capabilities](./ios-capabilities.md)
