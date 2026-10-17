---
source: https://docs.expo.dev/versions/v58.0.0/sdk/dev-client/
---

# DevClient

`expo-dev-client` adds development tools to debug builds: a configurable launcher UI, improved debugging tools (such as inspecting network requests) and an extensible developer menu. Debug builds that include it are called development builds.

## Signature / Usage

```sh
npx expo install expo-dev-client
```

EAS Build requires `developmentClient: true` on the build profile in **eas.json**; without it a standalone build with no development tools is produced:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}
```

```js
import * as DevClient from 'expo-dev-client';
```

## Options / Props

### Config plugin properties

```json
{
  "expo": {
    "plugins": [
      [
        "expo-dev-client",
        {
          "launchMode": "most-recent",
          "defaultLaunchURL": "http://localhost:8081",
          "android": { "defaultLaunchURL": "http://10.0.2.2:8081" },
          "toolsButton": true,
          "skipOnboarding": false,
          "showMenuAtLaunch": true
        }
      ]
    ]
  }
}
```

| Name | Default | Description |
| --- | --- | --- |
| `launchMode` | `"most-recent"` | `most-recent`: launch the most recently opened project, falling back to the launcher screen if unable to connect. `launcher`: open the launcher screen. |
| `addGeneratedScheme` | `true` | Registers a custom URL scheme to open a project; set `false` to disable. |
| `defaultLaunchURL` | - | Launch directly into this URL instead of the launcher; fallback when `launchMode` is `most-recent`. |
| `toolsButton` | `true` | Show the floating tools button by default. Change at runtime with `setToolsButtonVisible`. |
| `embeddedBundle` | `false` | Enable loading an embedded JS bundle from the launcher ("Load embedded bundle" option). |
| `skipOnboarding` | `false` | Skip the onboarding screen in the dev menu on first launch. |
| `showMenuAtLaunch` | `true` | Show the developer menu immediately after launch. |

### Methods

All: Android, iOS, tvOS.

| Name | Signature | Description |
| --- | --- | --- |
| `DevClient.closeMenu()` | `void` | Closes the development client menu. |
| `DevClient.hideMenu()` | `void` | Hides the development client menu. |
| `DevClient.openMenu()` | `void` | Opens the development client menu. |
| `DevClient.registerDevMenuItems(items)` | `(items: ExpoDevMenuItem[]) => Promise<void>` | Specifies custom entries in the menu. |
| `DevClient.setToolsButtonVisible(visible)` | `(visible: boolean) => void` | Sets whether the floating tools button is visible. |

### `ExpoDevMenuItem`

| Property | Type | Description |
| --- | --- | --- |
| `callback` | `() => void` | Fired when the user selects the item. |
| `name` | `string` | Label of the entry. |
| `shouldCollapse` (optional) | `boolean` | Whether the menu closes after interaction. Default `false`. |

## Notes

- Platforms: android, ios, tvos (not included in Expo Go).
- Plugin properties set build-time defaults. For a single launch, add `__expo_disable_onboarding=1`, `__expo_disable_fab=1`, or `__expo_disable_auto_launch=1` to the launch URL.
- TV support: Android TV supports all operations like an Android phone; Apple TV supports basic operations with a local or tunneled packager (EAS authentication and listing EAS builds / updates not yet supported).
- Existing React Native app: install `expo` first, then follow "Install `expo-dev-client` in an existing React Native project" in the official docs.
- Source: `sdk-58` branch `packages/expo-dev-client`; modificationDate October 02, 2026.

## Related

- [Expo](./expo.md)
- [Linking into your app](./linking-into-your-app.md)
