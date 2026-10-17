---
source: https://v2.tauri.app/reference/javascript/geolocation/
---

# @tauri-apps/plugin-geolocation

Get and track the device's current position, mirroring the W3C Geolocation API.

## Signature / Usage

```typescript
import { getCurrentPosition } from '@tauri-apps/plugin-geolocation';
const position = await getCurrentPosition();
```

```typescript
function getCurrentPosition(options?: PositionOptions): Promise<Position>   // since 2.0.0
function watchPosition(
  options: PositionOptions,
  cb: (location: Position | null, error?: string) => void
): Promise<number>                                                           // since 2.0.0, returns watcher id
function clearWatch(channelId: number): Promise<void>                        // since 2.0.0
function checkPermissions(): Promise<PermissionStatus>                       // since 2.0.0
function requestPermissions(permissions: PermissionType[] | null): Promise<PermissionStatus>  // since 2.0.0

type PermissionType = 'location' | 'coarseLocation'
type Position = { timestamp: number; coords: Coordinates }   // timestamp: ms since the Unix epoch
```

## Options / Props

`PositionOptions`:

| Name | Type | Description |
| --- | --- | --- |
| enableHighAccuracy | `boolean` | High accuracy mode (such as GPS, if available). Ignored on Android 12+ if the user did not grant ACCESS_FINE_LOCATION (`coarseLocation` permission). |
| timeout | `number` | Maximum wait time in milliseconds for location updates. Ignored on iOS. |
| maximumAge | `number` | Maximum age in milliseconds of an acceptable cached position. Default: 0. Ignored on iOS. |

`Coordinates`:

| Name | Type | Description |
| --- | --- | --- |
| latitude | `number` | Latitude in decimal degrees. |
| longitude | `number` | Longitude in decimal degrees. |
| accuracy | `number` | Accuracy of latitude / longitude in meters. |
| altitudeAccuracy | `number \| null` | Accuracy of the altitude in meters, if available. Available on all iOS versions and on Android 8 and above. |
| altitude | `number \| null` | Altitude, if available. |
| speed | `number \| null` | Speed in meters per second, if available. |
| heading | `number \| null` | Heading, if available. |

`PermissionStatus`:

| Name | Type | Description |
| --- | --- | --- |
| location | `PermissionState` | On Android requests/checks both ACCESS_COARSE_LOCATION and ACCESS_FINE_LOCATION; on iOS the location permission. |
| coarseLocation | `PermissionState` | On Android ACCESS_COARSE_LOCATION (on Android 12+ users can choose Approximate or Precise); on iOS same value as `location`. |

## Notes

- All three `PositionOptions` fields are required by the TypeScript type (no `?`), and `watchPosition` requires the options object; pass all of them, e.g. `{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }`.
- `watchPosition` callback receives the new `Position` on success, or `null` and an error message when a read fails. Pass the returned id to `clearWatch`.
- `checkPermissions` / `requestPermissions` reject if location services are disabled on the device. `requestPermissions(null)` requests all permissions.
- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@geolocation-v2.5.0` `plugins/geolocation/guest-js/index.ts`.

```typescript
import { watchPosition, clearWatch } from '@tauri-apps/plugin-geolocation';
const watchId = await watchPosition(
  { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
  (position, error) => {
    if (error) {
      console.error(error)
    } else {
      console.log(position)
    }
  }
);
// later, when tracking is no longer needed (e.g. component unmount)
await clearWatch(watchId);
```

## Related

- [geolocation plugin](../plugins-app/geolocation.md)
