---
source: https://reactnative.dev/docs/0.87/running-on-simulator-ios
---

# Running On Simulator

How to start the iOS Simulator from a React Native project and choose the device, device version, or UDID.

## Signature / Usage

Once your React Native project is initialized, run the following inside the project directory.

**npm**

```shell
npm run ios
```

**Yarn**

```shell
yarn ios
```

If everything is set up correctly, you should see your new app running in the iOS Simulator shortly.

### Specifying a device

Use the `--simulator` flag followed by the device name as a string. The default is `"iPhone 14"`. To run on an iPhone SE (3rd generation):

**npm**

```shell
npm run ios -- --simulator="iPhone SE (3rd generation)"
```

**Yarn**

```shell
yarn ios --simulator "iPhone SE (3rd generation)"
```

The device names correspond to the list of devices available in Xcode. Check your available devices with `xcrun simctl list devices`.

### Specifying a version of device

If you have multiple iOS versions installed, also specify the appropriate version, e.g. an iPhone 14 Pro (16.0):

**npm**

```shell
npm run ios -- --simulator="iPhone 14 Pro (16.0)"
```

**Yarn**

```shell
yarn ios --simulator "iPhone 14 Pro (16.0)"
```

### Specifying an UDID

Specify the device UDID returned from the `xcrun simctl list devices` command, e.g. UDID `AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA`:

**npm**

```shell
npm run ios -- --udid="AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

**Yarn**

```shell
yarn ios --udid "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--simulator` | string | Device name, as listed by Xcode / `xcrun simctl list devices`. Default `"iPhone 14"`. Include the OS version in parentheses when several iOS versions are installed. |
| `--udid` | string | Device UDID returned from `xcrun simctl list devices`. |

## Notes

- The default device name `"iPhone 14"` is quoted from the 0.87 docs as written.
- `xcrun simctl` and Simulator itself are Xcode tooling; see the apple-distribution and apple-uikit skills for general iOS tooling.

## Related

- Running on Device
- [Publishing to Apple App Store](./publishing-to-app-store.md)
