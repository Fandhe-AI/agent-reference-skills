---
source: https://docs.expo.dev/versions/v58.0.0/sdk/sensors/
---

# Sensors

`expo-sensors` provides APIs for accessing device sensors to measure motion, orientation, pressure, magnetic fields, ambient light, and step count. This page aggregates the Sensors index and the Accelerometer, Barometer, DeviceMotion, Gyroscope, LightSensor, Magnetometer and Pedometer pages.

## Signature / Usage

```sh
npx expo install expo-sensors
```

```js
import * as Sensors from 'expo-sensors';
// OR
import {
  Accelerometer,
  Barometer,
  DeviceMotion,
  Gyroscope,
  LightSensor,
  Magnetometer,
  MagnetometerUncalibrated,
  Pedometer,
} from 'expo-sensors';
```

Config plugin (iOS motion permission message, or `false` to disable):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-sensors",
        {
          "motionPermission": "Allow $(PRODUCT_NAME) to access your device motion"
        }
      ]
    ]
  }
}
```

Subscribe pattern shared by the `DeviceSensor` classes (Accelerometer shown):

```jsx
import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    const sub = Accelerometer.addListener(setData);
    setSubscription(sub);
    return () => sub.remove();
  }, []);
  // render x, y, z (in gs where 1g = 9.81 m/s^2)
}
```

Pedometer:

```jsx
import { Platform } from 'react-native';
import { Pedometer } from 'expo-sensors';

const isAvailable = await Pedometer.isAvailableAsync();
if (isAvailable) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 1);

  if (Platform.OS === 'ios') {
    // getStepCountAsync is iOS only
    const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
    if (pastStepCountResult) {
      setPastStepCount(pastStepCountResult.steps);
    }
  }

  const subscription = Pedometer.watchStepCount(result => {
    setCurrentStepCount(result.steps);
  });
  // later: subscription.remove()
}
```

## Options / Props

Available sensors:

| Class | Platforms | Description | Import |
| --- | --- | --- | --- |
| `Accelerometer` | Android, iOS (device only), Web | Device acceleration in g-force (`1 g = 9.81 m/s^2`). | `import { Accelerometer } from 'expo-sensors'` |
| `Barometer` | Android, iOS (device only) | Air pressure in hectopascals (`hPa`). Not available on web (`UnavailabilityError` is thrown). | `import { Barometer } from 'expo-sensors'` |
| `DeviceMotion` | Android, iOS, Web | Motion and orientation data on three axes. | `import { DeviceMotion } from 'expo-sensors'` |
| `Gyroscope` | Android, iOS (device only), Web | Rotation rate in rad/s. | `import { Gyroscope } from 'expo-sensors'` |
| `LightSensor` | Android | Ambient light (illuminance) in lux. | `import { LightSensor } from 'expo-sensors'` |
| `Magnetometer` / `MagnetometerUncalibrated` | Android, iOS | Magnetic field in microtesla (`μT`); calibrated and raw uncalibrated values. | `import { Magnetometer, MagnetometerUncalibrated } from 'expo-sensors'` |
| `Pedometer` | Android, iOS | Step count and pedometer updates. | `import { Pedometer } from 'expo-sensors'` |

Common methods of the `DeviceSensor` classes (`Accelerometer`, `Barometer`, `DeviceMotion`, `Gyroscope`, `LightSensor`, `Magnetometer`), available on each class's own platforms:

| Name | Returns | Description |
| --- | --- | --- |
| `addListener(listener)` | `EventSubscription` | Subscribe to measurement updates; call `remove()` on the subscription to unsubscribe. The listener receives one measurement object. |
| `getListenerCount()` | `number` | Registered listeners count. |
| `hasListeners()` | `boolean` | Whether any listener is registered. |
| `isAvailableAsync()` | `Promise<boolean>` | Whether the sensor is available. Always check before use. |
| `getPermissionsAsync()` | `Promise<PermissionResponse>` | Checks permissions for accessing the sensor. |
| `requestPermissionsAsync()` | `Promise<PermissionResponse>` | Asks the user to grant permissions. |
| `setUpdateInterval(intervalMs: number)` | `void` | Desired interval in milliseconds between updates. |
| `removeSubscription(subscription)` | `void` | Removes a subscription. |
| `removeAllListeners()` | `void` | Removes all listeners. Deprecated: use `subscription.remove()` instead. |

Measurement types:

| Type | Properties |
| --- | --- |
| `AccelerometerMeasurement` | `timestamp: number` (seconds), `x`, `y`, `z`: `number` (g-force per axis) |
| `BarometerMeasurement` | `pressure: number` (hPa), `relativeAltitude?: number` (iOS, meters), `timestamp: number` (seconds) |
| `GyroscopeMeasurement` | `timestamp: number` (seconds), `x`, `y`, `z`: `number` (rad/s) |
| `LightSensorMeasurement` | `illuminance: number` (lux), `timestamp: number` (seconds) |
| `MagnetometerMeasurement` | `timestamp: number` (seconds), `x`, `y`, `z`: `number` (μT) |
| `DeviceMotionMeasurement` | `acceleration: null \| { timestamp, x, y, z }` (m/s^2), `accelerationIncludingGravity: { timestamp, x, y, z }` (m/s^2), `interval: number` (ms), `orientation: DeviceMotionOrientation`, `rotation: { alpha, beta, gamma, timestamp }` (alpha = rotation around Z, beta = X, gamma = Y), `rotationRate: null \| { alpha, beta, gamma, timestamp }` (deg/s) |

`DeviceMotion` additionally exposes the constant `Gravity` (`number`, `9.80665` m/s^2) as a module constant and as a class property. `DeviceMotionOrientation` enum: `Portrait = 0`, `RightLandscape = 90`, `UpsideDown = 180`, `LeftLandscape = -90`.

`Pedometer` methods:

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `Pedometer.isAvailableAsync()` | Android, iOS | `Promise<boolean>` | Whether the pedometer is enabled on the device. |
| `Pedometer.getPermissionsAsync()` | Android, iOS | `Promise<PermissionResponse>` | Checks permissions for the pedometer. |
| `Pedometer.requestPermissionsAsync()` | Android, iOS | `Promise<PermissionResponse>` | Asks the user to grant permissions for the pedometer. |
| `Pedometer.getStepCountAsync(start: Date, end: Date)` | iOS | `Promise<PedometerResult>` | Step count between two dates. Per Apple, only the past seven days of data are stored; an earlier start date returns only the available data. |
| `Pedometer.watchStepCount(callback: PedometerUpdateCallback)` | Android, iOS | `EventSubscription` | Subscribe to updates; the callback receives a `PedometerResult`. |

`PedometerResult`: `{ steps: number }`. `PedometerUpdateCallback(result: PedometerResult): void`.

Shared permission types:

| Type | Definition |
| --- | --- |
| `PermissionResponse` | `canAskAgain: boolean`, `expires: PermissionExpiration`, `granted: boolean`, `status: PermissionStatus` |
| `PermissionExpiration` | `'never' \| number` (currently all permissions are granted permanently) |
| `PermissionStatus` | `DENIED = "denied"`, `GRANTED = "granted"`, `UNDETERMINED = "undetermined"` |

Config plugin property:

| Name | Default | Description |
| --- | --- | --- |
| `motionPermission` | `"Allow $(PRODUCT_NAME) to access your device motion"` | iOS only. Sets the `NSMotionUsageDescription` message, or `false` to disable motion permissions. |

Permissions:

| Platform | Key | Description |
| --- | --- | --- |
| Android | `HIGH_SAMPLING_RATE_SENSORS` | Needed for update rates above 200 Hz. Add to `expo.android.permissions` in app.json, or `<uses-permission android:name="android.permission.HIGH_SAMPLING_RATE_SENSORS" />` in `android/app/src/main/AndroidManifest.xml` for existing React Native apps. |
| iOS | `NSMotionUsageDescription` | Message explaining why the app requests the device's motion data. |

## Notes

- Platforms (frontmatter `platforms`): Sensors index: Android, iOS, Web, Included in Expo Go. Accelerometer, Gyroscope: Android, iOS (device only), Web. Barometer: Android, iOS (device only). DeviceMotion: Android, iOS, Web. LightSensor: Android. Magnetometer, Pedometer: Android, iOS. All are included in Expo Go.
- Starting in Android 12 (API level 31) the system has a 200 Hz limit for each sensor's updates; `setUpdateInterval` above that needs `HIGH_SAMPLING_RATE_SENSORS`.
- Accelerometer / DeviceMotion / Gyroscope `isAvailableAsync()` on mobile web: first call `requestPermissionsAsync()` in a user interaction (touch event); if `status` is not `granted`, inform the user they may have to open settings. On web it starts a timer and waits for an event, which predicts whether an iOS device has the device orientation API disabled (Settings > Safari > Motion & Orientation Access); some devices do not fire unless the site is served over HTTPS, and there is no formal API for detecting the `DeviceMotion` status, so it can be unreliable.
- Barometer: `isAvailableAsync()` requires at least Android 2.3 (API Level 9) and iOS 8. Providers: iOS `CMAltimeter` (altitude events reflect the change in current altitude, not absolute altitude); Android `Sensor.TYPE_PRESSURE`; not available on web.
- Magnetometer: `isAvailableAsync()` requires at least Android 2.3 (API Level 9) and iOS 8. LightSensor: requires at least Android 2.3 (API Level 9). The `MagnetometerUncalibrated` export gives raw uncalibrated values.
- Pedometer updates are not delivered while the app is in the background. As an alternative on Android use a solution based on the Health Connect API; on iOS use `getStepCountAsync` to get the step count between two dates.
- The source effect cleanup captures a stale subscription (null); the example removes the listener returned inside the effect.
- getStepCountAsync is iOS only; the example guards it with Platform.OS, unlike the source.
- Sources (8 pages aggregated): https://docs.expo.dev/versions/v58.0.0/sdk/sensors/ , https://docs.expo.dev/versions/v58.0.0/sdk/accelerometer/ , https://docs.expo.dev/versions/v58.0.0/sdk/barometer/ , https://docs.expo.dev/versions/v58.0.0/sdk/devicemotion/ , https://docs.expo.dev/versions/v58.0.0/sdk/gyroscope/ , https://docs.expo.dev/versions/v58.0.0/sdk/light-sensor/ , https://docs.expo.dev/versions/v58.0.0/sdk/magnetometer/ , https://docs.expo.dev/versions/v58.0.0/sdk/pedometer/
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-sensors

## Related

- [Device](./device.md)
- [Location](./location.md)
