---
source: https://docs.expo.dev/config-plugins/patch-project/
---

# Using patch-project

`patch-project` is a config plugin and CLI that generates and applies Git-inspired patches to preserve native changes after `npx expo prebuild`, without writing a config plugin.

## Signature / Usage

```sh
npx expo install patch-project
```

Adds the plugin to the app config:

```json
{
  "expo": {
    "plugins": [
      "patch-project"
    ]
  }
}
```

Generate patches from manual changes in **android** / **ios**:

```sh
npx patch-project
npx patch-project --platform android
```

## Notes

- Patches are saved in **cng-patches** and named `<platform>+<checksum>.patch` (for example `ios+eee880ad7b07965271d2323f7057a2b4.patch`).
- Patches are applied automatically on subsequent `npx expo prebuild` runs, unlike `patch-package`.
- Use cases: migrating complex existing React Native apps, preserving manual changes while adopting CNG, quick prototyping before writing config plugins.
- Limitations: patches may become invalid after SDK upgrades (template changes), conflict with other plugins modifying the same file (for example **MainApplication.kt**), and iOS **.pbxproj** patches are fragile (UUIDs can change with `npx expo prebuild --clean`). Keep patches minimal and regenerate after each SDK upgrade.
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).

## Related

- [Introduction to config plugins](./config-plugins-introduction.md)
- [Mods](./mods.md)
