---
source: https://reactnative.dev/docs/0.87/platform
---

# Platform

Detect the current platform, OS version and device traits, and select platform-specific values.

## Signature / Usage

```tsx
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        backgroundColor: 'green',
      },
      ios: {
        backgroundColor: 'red',
      },
      default: {
        // other platforms, web for example
        backgroundColor: 'blue',
      },
    }),
  },
});
```

This gives `flex: 1` on all platforms, green on Android, red on iOS, blue on other platforms.

### Properties

| Name | Platform | Signature | Description |
| --- | --- | --- | --- |
| `constants` | All | `static constants: PlatformConstants;` | Object with all available common and platform-specific constants (see below). |
| `isDisableAnimations` | All | `static isDisableAnimations: boolean;` | `true` when animations are turned off, usually during automated tests. Falls back to `isTesting` if not set. On Android it can be set with the `IS_DISABLE_ANIMATIONS` system property. |
| `isPad` | iOS | `static isPad: boolean;` | Whether the device is an iPad. |
| `isTV` | All | `static isTV: boolean;` | Whether the device is a TV. |
| `isVision` | All | `static isVision: boolean;` | Whether the device is an Apple Vision. With Apple Vision Pro (Designed for iPad), `isVision` is `false` but `isPad` is `true`. |
| `isTesting` | All | `static isTesting: boolean;` | Whether the app is running in Developer Mode with the testing flag set. |
| `OS` | All | `static OS: 'android' \| 'ios';` | String value for the current OS. |
| `Version` | All | `static Version: 'number' \| 'string';` | OS version: number on Android, string on iOS. The official signature literal `'number' \| 'string'` is a docs typo; the effective type is `number \| string`. |

`Platform.constants` properties:

| Name | Platform | Type | Optional | Description |
| --- | --- | --- | --- | --- |
| isDisableAnimations | All | boolean | Yes | Whether animations should be disabled. Defaults to the value of `isTesting`. |
| isTesting | All | boolean | No | |
| reactNativeVersion | All | object | No | React Native version info. Keys `major`, `minor`, `patch` (numbers) with optional `prerelease` (`string \| null`, see ReactNativeVersion). |
| Version | Android | number | No | OS version constant. |
| Release | Android | string | No | |
| Serial | Android | string | No | Hardware serial number. |
| Fingerprint | Android | string | No | A string that uniquely identifies the build. |
| Model | Android | string | No | End-user-visible name for the device. |
| Brand | Android | string | No | Consumer-visible brand. |
| Manufacturer | Android | string | No | Device manufacturer. |
| ServerHost | Android | string | Yes | |
| uiMode | Android | string | No | `'car'`, `'desk'`, `'normal'`, `'tv'`, `'watch'` or `'unknown'`. |
| forceTouchAvailable | iOS | boolean | No | Availability of 3D Touch. |
| interfaceIdiom | iOS | string | No | The interface type for the device (UIUserInterfaceIdiom). |
| osVersion | iOS | string | No | OS version constant. |
| systemName | iOS | string | No | OS name constant. |

### Methods

```tsx
static select(config: Record<string, T>): T;
```

`select()` returns the most fitting value for the current platform. On a phone, `android` and `ios` keys take preference; if not specified, the `native` key is used, then the `default` key. `config` (object, required) keys: `android`, `ios`, `native`, `default` (each any). Since the value can be of any type, `select` can also return platform-specific components:

```tsx
const Component = Platform.select({
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb'),
})();

<Component />;
```

## Notes

- The official page's "values are numbers" for `reactNativeVersion` and the literal-type notation `'number' | 'string'` for `Version` are docs typos; types here follow the same page's Type table (Android `number` / iOS `string`) and the ReactNativeVersion page (`prerelease: string | null`).
- `Platform.constants.reactNativeVersion` is the per-platform native-reported React Native version; the JS-side resolved package version is `ReactNativeVersion`.

## Related

- [ReactNativeVersion](./reactnativeversion.md)
- [PlatformColor](./platformcolor.md)
