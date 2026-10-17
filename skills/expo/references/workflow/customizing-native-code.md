---
source: https://docs.expo.dev/workflow/customizing/
---

# Add custom native code

Add custom native code by using libraries that include native code, or by writing native code with the Expo Modules API.

## Signature / Usage

```sh
# Create a local Expo module (Swift + Kotlin in the `modules` directory, autolinked)
npx create-expo-module@latest --local
npx expo run
```

## Notes

- Expo Go can only access native libraries included in the Expo SDK or libraries without custom native code. A development build lets you change native code or configuration.
- Installing a native library in a development build: `npx expo install react-native-localize`; set config plugin options in app config if provided; create a new development build (locally or with EAS).
- Write native modules and views in Swift and Kotlin with the Expo Modules API. For modules primarily in C++, the page points to React Native's Turbo Modules API.
- Local module (single app) scaffolds into `modules`; to share across apps, run `npx create-expo-module@latest` without `--local` (standalone module, publish to npm or put in a monorepo packages directory).
- CNG considerations: build locally with `npx expo run` for fast feedback and native debugging tools; apply project configuration changes (**AndroidManifest.xml**, **Info.plist**) through a config plugin (direct edits are lost on the next prebuild); use Expo Modules Android lifecycle listeners and iOS AppDelegate subscribers instead of editing source files or using config plugins to add code.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react skill and a future react-native skill for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: September 17, 2026).

## Related

- [Adopt Prebuild](./adopting-prebuild.md)
- [Continuous Native Generation (CNG)](./continuous-native-generation.md)
- [Using Expo SDK, React Native, and third-party libraries](./using-libraries.md)
