---
source: https://docs.expo.dev/versions/v58.0.0/sdk/location/
---

# Location

`expo-location` reads geolocation information from the device. The app can poll for the current location or subscribe to location update events, and supports geocoding, heading, geofencing, background location updates, and motion activity.

## Signature / Usage

```sh
npx expo install expo-location
```

```tsx
import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
```

Background location task (define in the top-level scope with `TaskManager.defineTask`):

```ts
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (!data) return;
  const { locations } = data;
  console.log('Received new locations', locations);
});
```

Geofencing task:

```ts
import { GeofencingEventType } from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const GEOFENCING_TASK_NAME = 'geofencing-task';

TaskManager.defineTask(GEOFENCING_TASK_NAME, ({ data, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (!data) return;
  const { eventType, region } = data;
  if (eventType === GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === GeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});
```

Config plugin:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ]
  }
}
```

## Options / Props

Config plugin properties:

| Name | Default | Description |
| --- | --- | --- |
| `locationAlwaysAndWhenInUsePermission` | `"Allow $(PRODUCT_NAME) to use your location"` | iOS. Sets `NSLocationAlwaysAndWhenInUseUsageDescription`. |
| `locationAlwaysPermission` | `"Allow $(PRODUCT_NAME) to use your location"` | iOS. Deprecated. Sets `NSLocationAlwaysUsageDescription`. |
| `locationWhenInUsePermission` | `"Allow $(PRODUCT_NAME) to use your location"` | iOS. Sets `NSLocationWhenInUseUsageDescription`. |
| `motionUsagePermission` | `"Allow $(PRODUCT_NAME) to detect your current motion activity"` | iOS. Sets `NSMotionUsageDescription`, shown when `getMotionActivityAsync` or `watchMotionActivityAsync` is first called. |
| `isIosBackgroundLocationEnabled` | `false` | iOS. Enables `location` in `UIBackgroundModes` in Info.plist. |
| `isAndroidBackgroundLocationEnabled` | `false` | Android. Enables the `ACCESS_BACKGROUND_LOCATION` permission. |
| `isAndroidForegroundServiceEnabled` | — | Android. Enables `FOREGROUND_SERVICE` and `FOREGROUND_SERVICE_LOCATION` (required on Android 14+ for a location foreground service). Defaults to `true` if `isAndroidBackgroundLocationEnabled` is `true`, otherwise `false`. |
| `androidForegroundServiceIcon` | — | Android. Local path to the icon of the foreground service started by `startLocationUpdatesAsync` (96x96 all-white png with transparency). Falls back to the `notification_icon` drawable (via `expo-notifications` config plugin), then to the app launcher icon, which may render as a solid white square. |

Hooks (each returns `[response | null, requestPermission, getPermission]`):

| Name | Platforms | Description |
| --- | --- | --- |
| `Location.useForegroundPermissions(options?: PermissionHookOptions<object>)` | Android, iOS, Web | Check/request foreground location permissions. |
| `Location.useBackgroundPermissions(options?)` | Android, iOS, Web | Check/request background location permissions. |
| `Location.useMotionActivityPermissions(options?)` | Android, iOS | Check/request motion activity permissions (returns `PermissionResponse`). |

Methods (Android, iOS, Web unless noted):

| Name | Returns | Description |
| --- | --- | --- |
| `getCurrentPositionAsync(options?: LocationOptions)` | `Promise<LocationObject>` | One-time current location; may take several seconds. Consider `getLastKnownPositionAsync` when high accuracy is not required. |
| `getLastKnownPositionAsync(options?: LocationLastKnownOptions)` | `Promise<LocationObject \| null>` | Last known position; `null` if unavailable or not matching `maxAge` / `requiredAccuracy`. Faster but may not be up-to-date. |
| `watchPositionAsync(options: LocationOptions, callback: LocationCallback, errorHandler?: LocationErrorCallback)` | `Promise<LocationSubscription>` | Foreground-only location updates. |
| `getHeadingAsync()` | `Promise<LocationHeadingObject>` | Current heading (watches for a couple of updates and returns an accurate one). |
| `watchHeadingAsync(callback, errorHandler?)` (Android, iOS) | `Promise<LocationSubscription>` | Compass updates. |
| `requestForegroundPermissionsAsync()` / `getForegroundPermissionsAsync()` | `Promise<LocationPermissionResponse>` | Request/check foreground permission. |
| `requestBackgroundPermissionsAsync()` / `getBackgroundPermissionsAsync()` | `Promise<LocationPermissionResponse>` | Request/check background permission. On Android 11+ opens the system settings page (explain why first). Foreground permission must be granted first. |
| `hasServicesEnabledAsync()` | `Promise<boolean>` | Whether location services are enabled. |
| `getProviderStatusAsync()` | `Promise<LocationProviderStatus>` | Location provider status. |
| `enableNetworkProviderAsync()` (Android) | `Promise<void>` | Asks the user to turn on high accuracy mode; rejects if denied. |
| `isBackgroundLocationAvailableAsync()` | `Promise<boolean>` | Background location availability. |
| `installWebGeolocationPolyfill()` | `void` | Polyfills `navigator.geolocation`. |
| `geocodeAsync(address: string)` (Android, iOS) | `Promise<LocationGeocodedLocation[]>` | Address to coordinates (usually 1 result). |
| `reverseGeocodeAsync(location: Pick<LocationGeocodedLocation, 'latitude' \| 'longitude'>)` (Android, iOS) | `Promise<LocationGeocodedAddress[]>` | Coordinates to postal address. |
| `startLocationUpdatesAsync(taskName: string, options?: LocationTaskOptions)` | `Promise<void>` | Registers for location updates, including in the background; the task receives `locations`. |
| `stopLocationUpdatesAsync(taskName)` / `hasStartedLocationUpdatesAsync(taskName)` | `Promise<void>` / `Promise<boolean>` | Stop / check a location task. |
| `startGeofencingAsync(taskName: string, regions?: LocationRegion[])` | `Promise<void>` | Starts geofencing (`regions` default `[]`); the task receives `eventType` and `region`. Call again with a new array to add or remove regions. |
| `stopGeofencingAsync(taskName)` / `hasStartedGeofencingAsync(taskName)` | `Promise<void>` / `Promise<boolean>` | Stop / check a geofencing task. |
| `getMotionActivityAsync()` (Android, iOS) | `Promise<MotionActivityObject>` | Current motion activity; no location permission needed. On Android 10+ the `ACTIVITY_RECOGNITION` runtime permission must be granted first; on iOS prompts for Motion and Fitness the first time. |
| `watchMotionActivityAsync(callback: MotionActivityCallback, errorHandler?)` (Android, iOS) | `Promise<LocationSubscription>` | Foreground-only motion activity updates. |
| `getMotionActivityPermissionsAsync()` / `requestMotionActivityPermissionsAsync()` (Android, iOS) | `Promise<PermissionResponse>` | Motion activity permissions (Android 10+: `ACTIVITY_RECOGNITION`). |

Types:

| Type | Definition |
| --- | --- |
| `LocationObject` | `coords: LocationObjectCoords`, `timestamp: number` (ms since epoch), `mocked?: boolean` (Android, iOS) |
| `LocationObjectCoords` | `latitude: number`, `longitude: number`, `accuracy`, `altitude`, `altitudeAccuracy`, `heading`, `speed`: `number \| null` (can be `null` on Web). `heading` is degrees clockwise from north; `speed` in m/s. |
| `LocationOptions` | `accuracy?: Accuracy` (default `Balanced`), `distanceInterval?: number` (meters), `mayShowUserSettingsDialog?: boolean` (Android; default `true`), `timeInterval?: number` (Android; ms) |
| `LocationLastKnownOptions` | `maxAge?: number` (ms), `requiredAccuracy?: number` (meters) |
| `LocationTaskOptions` | `LocationOptions` plus `activityType?: ActivityType` (iOS; default `Other`), `deferredUpdatesDistance?: number` (default `0`), `deferredUpdatesInterval?: number` (ms; default `0`), `deferredUpdatesTimeout?: number`, `foregroundService?: LocationTaskServiceOptions`, `pausesUpdatesAutomatically?: boolean` (iOS; default `false`), `showsBackgroundLocationIndicator?: boolean` (iOS; default `false`) |
| `LocationTaskServiceOptions` | `notificationTitle: string`, `notificationBody: string`, `notificationColor?: string` (`#RRGGBB` / `#AARRGGBB`), `killServiceOnDestroy?: boolean` |
| `LocationRegion` | `latitude`, `longitude`, `radius` (meters), `identifier?` (default auto-generated UUID hash), `notifyOnEnter?` / `notifyOnExit?` (default `true`), `state?: GeofencingRegionState` |
| `LocationHeadingObject` | `accuracy: number` (compass calibration 0-3), `magHeading: number`, `trueHeading: number` (`-1` without location permission) |
| `LocationGeocodedLocation` | `latitude`, `longitude`, `accuracy?`, `altitude?` |
| `LocationGeocodedAddress` | `city`, `country`, `district`, `isoCountryCode`, `name`, `postalCode`, `region`, `street`, `streetNumber`, `subregion`: `string \| null`; `formattedAddress` (Android), `timezone` (iOS) |
| `LocationPermissionResponse` | `PermissionResponse` plus `android?: { accuracy: 'fine' \| 'coarse' \| 'none' }` and `ios?: { accuracy: 'full' \| 'reduced' (iOS 14+), scope: 'whenInUse' \| 'always' \| 'none' }` |
| `LocationProviderStatus` | `backgroundModeEnabled`, `locationServicesEnabled`, `gpsAvailable?`, `networkAvailable?`, `passiveAvailable?` (Android) |
| `MotionActivityObject` | `activities: Record<MotionActivityType, MotionActivityState>`, `timestamp: number` |
| `MotionActivityState` | `detected: boolean`, `confidence: MotionActivityConfidence` (always `Low` when not detected). Android: per-type from `DetectedActivity` probability; iOS: overall `CMMotionActivityConfidence`. |
| `LocationSubscription` | `remove: () => void` |
| Callbacks | `LocationCallback(location: LocationObject)`, `LocationHeadingCallback(location: LocationHeadingObject)`, `MotionActivityCallback(activity: MotionActivityObject)`, `LocationErrorCallback(reason: string)` |

Enums:

| Enum | Values |
| --- | --- |
| `Accuracy` | `Lowest = 1` (~3 km), `Low = 2` (~1 km), `Balanced = 3` (~100 m), `High = 4` (~10 m), `Highest = 5`, `BestForNavigation = 6` |
| `ActivityType` | `Other = 1`, `AutomotiveNavigation = 2`, `Fitness = 3`, `OtherNavigation = 4`, `Airborne = 5` (iOS; falls back to `Other`) |
| `GeofencingEventType` | `Enter = 1`, `Exit = 2` |
| `GeofencingRegionState` | `Unknown = 0`, `Inside = 1`, `Outside = 2` |
| `MotionActivityConfidence` | `Low = 0`, `Medium = 1`, `High = 2` (Android buckets the raw 0-100 confidence) |
| `MotionActivityType` | `Automotive`, `Cycling`, `Running`, `Stationary`, `Unknown`, `Walking` (lowercase string values) |
| `PermissionStatus` | `DENIED = "denied"`, `GRANTED = "granted"`, `UNDETERMINED = "undetermined"` |

Permissions:

| Platform | Key | Description |
| --- | --- | --- |
| Android (automatic) | `ACCESS_COARSE_LOCATION`, `ACCESS_FINE_LOCATION` | Approximate / precise location. Can be excluded when not needed (for example `ACCESS_FINE_LOCATION` for low accuracy). |
| Android (optional) | `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_LOCATION` (only required as of Android 14), `ACCESS_BACKGROUND_LOCATION` | Enabling these in a new build requires submitting the app for review and requesting access in Google Play. |
| iOS | `NSLocationAlwaysAndWhenInUseUsageDescription`, `NSLocationWhenInUseUsageDescription`, `NSLocationAlwaysUsageDescription` (deprecated since iOS 11 in favor of the first) | Info.plist usage descriptions. |

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, Web, Included in Expo Go.
- Background location: stops if the user terminates the app and resumes on restart. A terminated Android app does not automatically restart on a location or geofencing event; iOS restarts a terminated app on a new geofence event. Results of removing an app from the recents list vary by Android vendor. Requirements: location permissions granted, the task defined in the top-level scope via `TaskManager.defineTask`, the iOS `location` background mode in `UIBackgroundModes` (applied automatically by prebuild under CNG; otherwise add `location` to `UIBackgroundModes` in the app target's `Info.plist`; the source's manual-configuration snippet names ios/project-name/Supporting/Expo.plist, which contradicts its own Info.plist statement, so Info.plist is used here), and on iOS a development build (not supported in Expo Go). Foreground and background services are not available in Expo Go for Android.
- Geofencing limits: Android allows up to 100 active geofences per app; iOS limits to 20 monitored regions and reports the initial state of registered geofences at app startup.
- iOS permission mapping: `requestForegroundPermissionsAsync` maps to `When In Use`, `requestBackgroundPermissionsAsync` maps to `Always`. iOS cannot distinguish `Allow Once` from `Allow While Using the App`; after `Allow Once`, a background request in the same session silently fails (denied) and the user must enable background location manually in Settings (`Linking.openURL('app-settings:')`). Calling `requestBackgroundPermissionsAsync` without foreground permission first makes iOS treat it as a request for both levels; always be prepared to run with `When In Use`.
- Deferred locations apply only when the app is in the background (set via `deferredUpdatesDistance`, `deferredUpdatesInterval`, `deferredUpdatesTimeout` in `LocationTaskOptions`).
- Geocoding is resource consuming; too many simultaneous requests can error, and it is discouraged in the background. On Android location permissions must be requested before geocoding.
- Emulators: Android Emulator needs Settings > Location > Use location (and possibly Improve Location Accuracy turned off); iOS Simulator needs a location option other than None in Device Hub (Device > Location).
- Existing React Native apps (no CNG): add `NSLocationAlwaysAndWhenInUseUsageDescription`, `NSLocationAlwaysUsageDescription` and `NSLocationWhenInUseUsageDescription` to `ios/[app]/Info.plist`.
- The official example uses an undefined YOUR_TASK_NAME placeholder; constants are declared here for completeness.
- The source destructures data in the task parameters before checking error; the examples check error and data first.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-location

## Related

- [Sensors](./sensors.md)
- [Network](./network.md)
