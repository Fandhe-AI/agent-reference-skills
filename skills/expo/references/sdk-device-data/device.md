---
source: https://docs.expo.dev/versions/v58.0.0/sdk/device/
---

# Device

`expo-device` provides access to system information about the physical device, such as its manufacturer and model.

## Signature / Usage

```sh
npx expo install expo-device
```

```jsx
import { Text, View } from 'react-native';
import * as Device from 'expo-device';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        {Device.manufacturer}: {Device.modelName}
      </Text>
    </View>
  );
}
```

## Options / Props

Constants (`Device.<name>`):

| Name | Type | Platforms | Description |
| --- | --- | --- | --- |
| `brand` | `string \| null` | Android, iOS | Consumer-visible brand (Android: "google", "xiaomi"; iOS: "Apple"). `null` on web. |
| `designName` | `string \| null` | Android | Name of the industrial design (`Build.DEVICE`). `null` on web and iOS. |
| `deviceName` | `string \| null` | Android, iOS, tvOS, Web | Human-readable name, may be set by the user; `null` if unavailable (particularly web). |
| `deviceType` | `DeviceType \| null` | Android, iOS, tvOS, Web | Device type. On Android (non-TV) derived from screen diagonal: 3"-6.9" is `PHONE`, 7"-18" is `TABLET`, otherwise `UNKNOWN`; may be inaccurate. |
| `deviceYearClass` | `number \| null` | Android, iOS, tvOS, Web | Device year class (facebook/device-year-class). `null` on web. |
| `isDevice` | `boolean` | Android, iOS, tvOS, Web | `true` on a real device, `false` on simulator/emulator. Always `true` on web. |
| `manufacturer` | `string \| null` | Android, iOS, tvOS, Web | Actual manufacturer; may be `null`. |
| `modelId` | `string \| null` | iOS | Internal model ID, e.g. "iPhone7,2". `null` on web and Android. |
| `modelName` | `string \| null` | Android, iOS, tvOS, Web | Human-friendly model name, e.g. "Pixel 2"; may be `null`. |
| `osBuildFingerprint` | `string \| null` | Android | Unique build string: `$(BRAND)/$(PRODUCT)/$(DEVICE)/$(BOARD):$(VERSION.RELEASE)/$(ID)/$(VERSION.INCREMENTAL):$(TYPE)/$(TAGS)`. `null` on web and iOS. |
| `osBuildId` | `string \| null` | Android, iOS, tvOS, Web | Build ID of the OS. Android: `Build.DISPLAY` (not `Build.ID`). iOS: `kern.osversion`. `null` on web. |
| `osInternalBuildId` | `string \| null` | Android, iOS, tvOS, Web | Internal build ID. Android: `Build.ID`. iOS: same as `osBuildId`. `null` on web. |
| `osName` | `string \| null` | Android, iOS, tvOS, Web | OS name. Android maps to `android.os.Build.VERSION.BASE_OS` ("Android" on some devices, a build fingerprint on others); iOS: "iOS" or "iPadOS". |
| `osVersion` | `string \| null` | Android, iOS, tvOS, Web | Human-readable OS version; may not always have three dot-separated numbers. |
| `platformApiLevel` | `number \| null` | Android | Android SDK version. `null` on iOS and web. |
| `productName` | `string \| null` | Android | Product name (`Build.PRODUCT`). `null` on web and iOS. |
| `supportedCpuArchitectures` | `string[] \| null` | Android, iOS, tvOS, Web | Supported processor architectures; `null` if undeterminable (particularly web). |
| `totalMemory` | `number \| null` | Android, iOS, tvOS, Web | Total memory in bytes accessible to the kernel (not necessarily to a single app). `null` on web. |

Methods:

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `Device.getDeviceTypeAsync()` | Android, iOS, tvOS, Web | `Promise<DeviceType>` | Device type as a `DeviceType` value (same Android heuristic as `deviceType`). |
| `Device.getMaxMemoryAsync()` | Android | `Promise<number>` | Maximum memory in bytes the Java VM will attempt to use; `Number.MAX_SAFE_INTEGER` if no limit. |
| `Device.getPlatformFeaturesAsync()` | Android | `Promise<string[]>` | Platform-specific feature names available on the device. Empty array on iOS and web. |
| `Device.getUptimeAsync()` | Android, iOS | `Promise<number>` | Milliseconds since last reboot; Android does not count deep sleep. |
| `Device.hasPlatformFeatureAsync(feature: string)` | Android | `Promise<boolean>` | Whether the device has a specific system feature. Always `false` on iOS and web. |
| `Device.isRootedExperimentalAsync()` | Android, iOS, tvOS, Web | `Promise<boolean>` | Experimental, not completely reliable. Root (Android) / jailbreak (iOS) check. Always `false` on web. |
| `Device.isSideLoadingEnabledAsync()` | Android | `Promise<boolean>` | Whether apps can be installed via `ACTION_INSTALL_PACKAGE` rather than the default app store. Requires the `REQUEST_INSTALL_PACKAGES` permission. |

`DeviceType` enum: `UNKNOWN = 0`, `PHONE = 1`, `TABLET = 2`, `DESKTOP = 3`, `TV = 4`.

Error code: `ERR_DEVICE_ROOT_DETECTION` — thrown for `isRootedExperimentalAsync`; may be thrown if there is no read access to certain system files.

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, tvOS, Web, Included in Expo Go.
- iOS 16+: `deviceName` is a generic "iPhone" until the correct entitlement is added (see iOS capabilities docs).
- Android root check looks for `su` executable paths; non-rooted devices may also have it. iOS checks can be bypassed by tools such as xCon.
- To differentiate Android from iOS use `Platform.OS` from `react-native` rather than `osName`.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-device

## Related

- [Battery](./battery.md)
- [Network](./network.md)
