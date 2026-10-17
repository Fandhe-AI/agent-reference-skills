---
source: https://docs.expo.dev/versions/v58.0.0/sdk/linking/
---

# Linking

`expo-linking` provides utilities for interacting with other installed apps using deep links, and helpers for constructing and parsing deep links into your app. It extends React Native's `Linking`.

## Signature / Usage

```sh
npx expo install expo-linking
```

```ts
import * as Linking from 'expo-linking';

const url = Linking.useLinkingURL();
const { hostname, path, queryParams } = Linking.parse(url);
```

## Options / Props

All Android, iOS, tvOS, Web unless noted.

### Hooks

| Name | Returns | Description |
| --- | --- | --- |
| `useLinkingURL()` | `string \| null` | Linking URL followed by subsequent changes; always returns the initial URL immediately on reload. |
| `useURL()` | `string \| null` | Deprecated: use `useLinkingURL`. |

### Methods

| Name | Signature | Description |
| --- | --- | --- |
| `Linking.canOpenURL(url)` | `Promise<boolean>` | Whether an installed app can handle the URL. Web always `true`. Rejects on Android if impossible to check, and on iOS if the scheme is not in `LSApplicationQueriesSchemes` in Info.plist. |
| `Linking.clearInitialURL()` | `void` (Android, iOS) | Clears the cached initial URL; later `getLinkingURL()` returns `null` until a new deep link is received. No-op on web. |
| `Linking.collectManifestSchemes()` | `string[]` | Platform schemes from the manifest. Android: `scheme` -> `android.scheme` -> `android.package`. iOS: `scheme` -> `ios.scheme` -> `ios.bundleIdentifier`. |
| `Linking.createURL(path, namedParameters)` | `(path: string, namedParameters?: CreateURLOptions) => string` | Builds a deep link into the app; scheme must be defined as `expo.scheme` or `expo.{android,ios}.scheme` in app config (platform-specific schemes take precedence). |
| `Linking.getInitialURL()` | `Promise<string \| null>` | URL that launched the app. |
| `Linking.getLinkingURL()` | `string \| null` | URL that launched the app. |
| `Linking.hasConstantsManifest()` | `boolean` | Ensures the expo-constants manifest is linked in an existing React Native project. |
| `Linking.hasCustomScheme()` | `boolean` | - |
| `Linking.openSettings()` | `Promise<void>` | Opens the OS settings app and shows the app's custom settings, if any. |
| `Linking.openURL(url)` | `Promise<true>` | Opens the URL with an installed app (e.g. `tel:5555555`, `exp://`). Rejects if no app is registered for the URL or the user cancels. |
| `Linking.parse(url)` | `ParsedURL` | Parses deep link information from a URL. |
| `Linking.parseInitialURLAsync()` | `Promise<ParsedURL>` | Wraps `getInitialURL()` in `parse()`; all fields `null` if no link opened the app. On web parses the current window URL. |
| `Linking.resolveScheme(options)` | `(options: { isSilent: boolean, scheme: string }) => string` | - |
| `Linking.sendIntent(action, extras)` | `Promise<void>` (Android) | Launches an Android intent with extras (`SendIntentExtras[]`). Use `expo-intent-launcher` instead; included only for RN API compatibility. |
| `Linking.unwrapDevLaunchURL(url)` | `string` | Resolves a launch URL to the URL the app should handle, removing reserved `__expo_*` launcher parameters or the legacy `expo-development-client` host `url` parameter. Returns the URL unchanged if invalid or without a launcher command; empty string for a legacy launch URL without a target. |
| `Linking.addEventListener(type, handler)` | `EmitterSubscription` | `type` is only `'url'`; `handler` is a `URLListener` receiving an `EventType`. Prefer `useLinkingURL()`. |

### Types

| Name | Shape |
| --- | --- |
| `CreateURLOptions` | `isTripleSlashed?: boolean` (`scheme:///path` vs `scheme://path`), `queryParams?: QueryParams`, `scheme?: string` |
| `EventType` | `nativeEvent?: MessageEvent`, `url: string` |
| `ParsedURL` | `hostname: string \| null`, `path: string \| null`, `queryParams: QueryParams \| null`, `scheme: string \| null` |
| `QueryParams` | `Record<string, undefined \| string \| string[]>` |
| `SendIntentExtras` | `key: string`, `value: string \| number \| boolean` |
| `URLListener(event)` | `(event: EventType) => void` |
| `NativeURLListener(nativeEvent)` | `(nativeEvent: MessageEvent) => void` |

Example of `createURL` outputs: development and production builds `<scheme>://path`; web (dev) `https://localhost:19006/path`; web (prod) `https://myapp.com/path`; Expo Go (dev) `exp://128.0.0.1:8081/--/path`.

```ts
unwrapDevLaunchURL('myapp://expo-development-client/?url=http%3A%2F%2F10.0.0.5%3A8081%2F--%2Fprofile');
// 'http://10.0.0.5:8081/--/profile'
unwrapDevLaunchURL('myapp://login?__expo_disable_fab=1');
// 'myapp://login'
```

## Notes

- Platforms: android, ios, web, tvos, expo-go.
- `createURL` in Expo Go for published updates is undefined behavior; use a build with an explicit scheme when a stable URL is needed (e.g. authorization callbacks).
- Expo Router handles deep linking automatically; this library is for apps not using it.
- Source: `sdk-58` branch `packages/expo-linking`; modificationDate September 15, 2026.

## Related

- [Linking overview](./linking-overview.md)
- [Linking into your app](./linking-into-your-app.md)
- [Android App Links](./android-app-links.md)
- [iOS Universal Links](./ios-universal-links.md)
