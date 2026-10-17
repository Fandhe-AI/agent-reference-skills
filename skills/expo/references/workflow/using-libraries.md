---
source: https://docs.expo.dev/workflow/using-libraries/
---

# Using Expo SDK, React Native, and third-party libraries

How to use React Native core libraries, Expo SDK libraries, and third-party npm packages, and how to determine compatibility.

## Signature / Usage

```tsx
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello, world!</Text>
    </View>
  );
}
```

```sh
# Install an Expo SDK or third-party library at a compatible version
npx expo install expo-device
npx expo install @react-navigation/native
```

## Notes

- React Native core components and APIs (for example `ActivityIndicator`, `TextInput`, `Text`, `ScrollView`, `View`) are imported from `react-native`; their reference is in the React Native docs (out of scope here).
- Expo SDK libraries cover device and system functionality; each API reference shows platform compatibility tags, config plugin usage, an example, and an API section. In existing React Native apps without the `expo` package see the installing Expo modules guide.
- Finding third-party libraries: React Native Directory first (look for the "Expo Go" tag), then the npm registry. Any React Native compatible library works in a development build, but may not work in Expo Go.
- A new dependency changes native directories if the library includes **android** / **ios** directories, its README mentions linking, it requires changes to **AndroidManifest.xml**, **ios/Podfile** or **Info.plist**, or it has a config plugin. If yes to any, create a development build.
- Always use `npx expo install` instead of `npm install` / `yarn add` so Expo CLI picks a compatible version and warns about known incompatibilities. Packages that need a plugin but lack one: see out-of-tree config plugins (`expo/config-plugins`).
- Without Prebuild support config plugins cannot be used; adopt Prebuild or configure each library manually.
- Exclude a package from version checks (`npx expo install`, `npx expo-doctor`, `npx expo start`) with `expo.install.exclude` in **package.json**.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react / react-native skills for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: September 17, 2026).

## Related

- [Add custom native code](./customizing-native-code.md)
- [Adopt Prebuild](./adopting-prebuild.md)
- [Expo CLI](./expo-cli.md)
