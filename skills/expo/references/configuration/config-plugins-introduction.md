---
source: https://docs.expo.dev/config-plugins/introduction/
---

# Introduction to config plugins

With Continuous Native Generation (CNG), native project changes are made through config plugins instead of editing **android** / **ios** directly. A config plugin is a top-level custom configuration point, referenced in the `plugins` property of the app config and made of one or more plugin functions executed during prebuild.

## Signature / Usage

Terminology diagram:

```
withMyPlugin ("myPlugin") [Config Plugin]
→ withAndroidPlugin, withIosPlugin [Plugin Function]
→ withAndroidManifest, withInfoPlist [Mod Plugin Function]
→ mods.android.manifest, mods.ios.infoplist [Mod]
```

## Notes

- Plugin: top-level entry in the app config `plugins` array; conventionally named `with<Plugin Name>`.
- Plugin function: wraps platform-specific modification logic; looks like the top-level plugin function and could be used independently. Splitting helps testing and debugging.
- Mod plugin function: wrapper functions from `expo/config-plugins` that safely modify native files using mods. Use these instead of the underlying mods.
- Mod: underlying platform-specific modifier (e.g. `mods.android.manifest`, `mods.ios.infoplist`) that modifies native files during prebuild.
- Plugins are synchronous functions accepting an `ExpoConfig` and returning a modified `ExpoConfig`; they can rarely be asynchronous but will not be performant. Return value should be serializable, except for added `mods`.
- Naming convention: `with<Plugin Functionality>` (e.g. `withFacebook`). An optional second argument configures the plugin.
- Plugins are always evaluated during app config evaluation. Mods are only evaluated during the syncing phase of `npx expo prebuild`; config changes that must apply outside prebuild should be made outside a mod.
- In CNG projects avoid manual native edits since regeneration can overwrite them; config plugins consolidate native changes in configuration applied by `npx expo prebuild`.
- Source modificationDate: September 17, 2026 (unversioned guide, fetched 2026-10-17).

## Related

- [Create and use config plugins](./config-plugins.md)
- [Mods](./mods.md)
- [Developing and debugging a plugin](./plugin-development-debugging.md)
- [Configure with app config](./configuration.md)
