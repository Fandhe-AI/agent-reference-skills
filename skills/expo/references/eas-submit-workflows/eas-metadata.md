---
source: https://docs.expo.dev/eas/metadata/
---

# EAS Metadata

EAS Metadata is a command-line tool from EAS that automates and maintains your app store presence from a `store.config.json` file instead of the app store dashboards.

## Signature / Usage

Push the store config to the app stores (requires EAS CLI):

```sh
eas metadata:push
```

Related commands: `eas metadata:pull` (generate the local store config from the app stores) and `eas metadata:lint` (validate the local store config).

## Notes

- EAS Metadata uses a `store.config.json` file (static store config) and also supports a dynamic store config (asynchronous functions that can gather information from external services).
- Built-in validation gives feedback before anything is sent to the app stores. The VS Code Expo Tools extension gives auto-complete, suggestions, and warnings in `store.config.json`.
- When to use: manage app store info programmatically (yes), catch metadata issues before review (yes), collaborate on store presence updates (yes), manage Google Play Store listings (no), upload screenshots (no).
- The Google Play Store is not implemented; the schema currently supports the Apple App Store only.
- EAS Metadata only sends the data from your store config to the app stores. If you edit something in the app store dashboards, run `eas metadata:pull` first; otherwise a later push might overwrite your changes.
- Restricted (large corporate) app store accounts may lack permission for some functionality.
- The official site also has "Introduction" (getting started) and "Customize the store config" pages that are not included in this skill.
- Source modificationDate not recorded in the saved original; fetched 2026-10-17.

## Related

- [Schema for EAS Metadata](./eas-metadata-schema.md)
- [EAS CLI reference](./eas-cli.md)
- [Submit to the Apple App Store with EAS Submit](./submit-ios.md)
