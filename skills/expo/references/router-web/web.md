---
source: https://docs.expo.dev/workflow/web/
---

# Develop websites with Expo

Expo builds full-stack websites with React: statically rendered for SEO and performance, or client-rendered for an app-like experience. Universal code uses React Native for web (RNW); web-only code can use React DOM directly.

## Signature / Usage

```sh
npx expo install react-dom react-native-web @expo/metro-runtime
npx expo start --web
npx expo export --platform web
```

```jsx
// app/index.js
import { Text } from 'react-native';

export default function Page() {
  return <Text>Home page</Text>;
}
```

Without the `expo` package in a bare React Native app, switch the entry file:

```diff
- import {AppRegistry} from 'react-native';
- import {name as appName} from './app.json';
+ import {registerRootComponent} from 'expo';
  import App from './App';
- AppRegistry.registerComponent(appName, () => App);
+ registerRootComponent(App);
```

## Notes

- Web-only components (`<div>`, `<p>`) are fully supported but do not render on native; organize with platform-specific modules.
- RNW wraps `react-dom` primitives (`<View>`, `<Text>`) and is optional on web, recommended for cross-platform code reuse.
- Expo SDK libraries support browser and server rendering where applicable; Expo CLI optimizes per platform for production (for example platform shaking).
- Distinct from Next.js: this is Expo's Metro-based web export with Expo Router (see nextjs-app skill for Next.js).
- Pinned: documentation fetched 2026-10-17, Expo SDK 58.

## Related

- [Static rendering](./static-rendering.md)
- [Server rendering](./server-rendering.md)
- [Publish websites](./publishing-websites.md)
