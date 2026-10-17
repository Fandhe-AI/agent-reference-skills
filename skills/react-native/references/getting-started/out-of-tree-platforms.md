---
source: https://reactnative.dev/docs/0.87/out-of-tree-platforms
---

# Out-of-Tree Platforms

Partner- and community-maintained projects that bring React Native to platforms other than Android and iOS, and how a custom platform registers with Metro.

## Signature / Usage

Register a platform via the module's `package.json`:

```json
{
  "rnpm": {
    "haste": {
      "providesModuleNodeModules": ["react-native-example"],
      "platforms": ["example"]
    }
  }
}
```

`"providesModuleNodeModules"` is an array of modules that will get added to the Haste module search path, and `"platforms"` is an array of platform suffixes that will be added as valid platforms.

## Options / Props

| Project | Maintainer | Description |
| --- | --- | --- |
| React Native macOS (https://github.com/microsoft/react-native-macos) | Partner | React Native for macOS and Cocoa. |
| React Native Windows (https://github.com/microsoft/react-native-windows) | Partner | React Native for Microsoft's Universal Windows Platform (UWP). |
| React Native visionOS (https://github.com/callstack/react-native-visionos) | Partner | React Native for Apple's visionOS. |
| React Native OpenHarmony (https://atomgit.com/CPF-RN/ohos_react_native) | Partner | React Native for OpenHarmony. |
| React Native tvOS (https://github.com/react-native-tvos/react-native-tvos) | Community | React Native for Apple TV and Android TV devices. |
| React Native Web (https://github.com/necolas/react-native-web) | Community | React Native on the web using React DOM. |
| React Native Skia (https://github.com/react-native-skia/react-native-skia) | Community | React Native using Skia (https://skia.org/) as a renderer. Currently supports Linux and macOS. |

## Notes

- Creating a React Native platform from scratch is still not very well documented. One of the goals of the New Architecture and Fabric (`/architecture/fabric-renderer`) is to make maintaining a platform easier.
- Bundling: as of React Native 0.57 you can register your platform with Metro (https://metrobundler.dev/). You can pass `--platform example` to `npx react-native bundle`, and it will look for JavaScript files with the `.example.js` suffix.
- To register your platform with RNPM, your module's name must match one of these patterns:
  - `react-native-example`: searches all top-level modules that start with `react-native-`
  - `@org/react-native-example`: searches for modules that start with `react-native-` under any scope
  - `@react-native-example/module`: searches in all modules under scopes with names starting with `@react-native-`

## Related

- [Platform-Specific Code](./platform-specific-code.md)
- [Building For TV Devices](./building-for-tv.md)
