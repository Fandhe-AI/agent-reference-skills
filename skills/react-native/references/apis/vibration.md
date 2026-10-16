---
source: https://reactnative.dev/docs/0.87/vibration
---

# Vibration

Vibrates the device.

## Signature / Usage

```tsx
Vibration.vibrate();
Vibration.vibrate(PATTERN);
Vibration.vibrate(PATTERN, true);
Vibration.cancel();
```

```tsx
static cancel();

static vibrate(
  pattern?: number | number[],
  repeat?: boolean
);
```

## Options / Props

`vibrate()` parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| pattern | number (Android) \| array of numbers | `400` | Vibration duration in milliseconds, or a vibration pattern as an array of numbers in milliseconds. |
| repeat | boolean | `false` | Repeat vibration pattern until `cancel()`. |

`cancel()` stops vibrating after having invoked `vibrate()` with repetition enabled.

## Notes

- Android apps should request the `android.permission.VIBRATE` permission by adding `<uses-permission android:name="android.permission.VIBRATE"/>` to `AndroidManifest.xml`.
- The Vibration API is implemented as an `AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)` call on iOS.
- Android: the duration defaults to 400 ms and an arbitrary duration can be passed as a number in `pattern`. iOS: the duration is fixed at roughly 400 ms.
- With an array `pattern`: on Android, the odd indices represent the vibration duration while the even ones represent the separation time. On iOS, the numbers represent the separation time since the duration is fixed.

## Related

- [PermissionsAndroid](./permissionsandroid.md)
