---
source: https://docs.expo.dev/versions/v58.0.0/sdk/maps/
---

# Maps

`expo-maps` provides access to the platform native map APIs: Apple Maps (iOS only) via `AppleMaps.View` and Google Maps (Android only) via `GoogleMaps.View`.

## Signature / Usage

```sh
npx expo install expo-maps
```

```tsx
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { Platform, Text } from 'react-native';

export default function App() {
  if (Platform.OS === 'ios') {
    return <AppleMaps.View style={{ flex: 1 }} />;
  } else if (Platform.OS === 'android') {
    return <GoogleMaps.View style={{ flex: 1 }} />;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}
```

Config plugin (app.json):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-maps",
        {
          "requestLocationPermission": true,
          "locationPermission": "Allow $(PRODUCT_NAME) to use your location"
        }
      ]
    ]
  }
}
```

| Plugin property | Default | Description |
| --- | --- | --- |
| requestLocationPermission | `false` | Adds permissions to AndroidManifest.xml and Info.plist. |
| locationPermission (iOS) | `"Allow $(PRODUCT_NAME) to use your location"` | Sets the `NSLocationWhenInUseUsageDescription` message. |

Custom marker icons use `useImage` from `expo-image` (Android `GoogleMaps.Marker.icon` / iOS `AppleMaps.Annotation.icon` expect an image reference, not a source):

```tsx
import { useImage } from 'expo-image';
import { GoogleMaps } from 'expo-maps';

export default function Map() {
  const icon = useImage('https://example.com/marker.svg', { maxWidth: 48, maxHeight: 48 });

  return (
    <GoogleMaps.View
      style={{ flex: 1 }}
      markers={[
        {
          coordinates: { latitude: 37.78825, longitude: -122.4324 },
          icon: icon ?? undefined,
          anchor: { x: 0.5, y: 0.5 },
        },
      ]}
    />
  );
}
```

For Apple Maps, pass `annotations={[{ coordinates, icon: icon ?? undefined }]}`. `AppleMaps.Marker` supports `systemImage`, `monogram`, and `tintColor`.

Permissions hook: `const [status, requestPermission] = useLocationPermissions();` (also `Maps.getPermissionsAsync()` / `Maps.requestPermissionsAsync()`, each `Promise<PermissionResponse>`).

## Options / Props

### AppleMapsView (iOS)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| annotations | `AppleMapsAnnotation[]` | — | Annotations on the map. |
| cameraPosition | `CameraPosition` | — | Initial camera position. |
| circles | `AppleMapsCircle[]` | — | Circles. |
| colorScheme | `AppleMapsColorScheme` | `AUTOMATIC` | Forces light or dark appearance. |
| markers | `AppleMapsMarker[]` | — | Markers. |
| polygons | `AppleMapsPolygon[]` | — | Polygons. |
| polylines | `AppleMapsPolyline[]` | — | Polylines. |
| properties | `AppleMapsProperties` | — | Map properties. |
| uiSettings | `AppleMapsUISettings` | — | UI-specific settings. |
| onCameraMove | `(event: CameraMoveEvent) => void` | — | Called when the user moves the map; also once on initial mount with the starting viewport. |
| onMapClick | `(event: { coordinates: Coordinates }) => void` | — | Not invoked when the user clicks a POI or marker. |
| onAnnotationClick (iOS 18.0+) | `(event: AppleMapsAnnotation) => void` | — | Annotation clicked. |
| onCircleClick (iOS 18.0+) | `(event: AppleMapsCircle) => void` | — | Circle clicked. |
| onMarkerClick (iOS 18.0+) | `(event: AppleMapsMarker) => void` | — | Marker clicked. |
| onPolygonClick (iOS 18.0+) | `(event: AppleMapsPolygon) => void` | — | Polygon clicked. |
| onPolylineClick (iOS 18.0+) | `(event: AppleMapsPolyline) => void` | — | Polyline clicked. |
| ref | `Ref<AppleMapsViewType>` | — | Imperative handle. |
| style | `StyleProp<ViewStyle>` | — | View style. |

`AppleMapsViewType` methods: `openLookAroundAsync(coordinates)`; `selectAnnotation(id, options)` and `selectMarker(id, options)` (iOS 18.0+, `options: { moveCamera: boolean, zoom: number }`); `setCameraPosition(config: CameraPosition): Promise<void>` (animation duration not supported on iOS; promise resolves after the update is scheduled).

### GoogleMapsView (Android)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| cameraPosition | `CameraPosition` | — | Initial camera position. |
| circles | `GoogleMapsCircle[]` | — | Circles. |
| colorScheme | `GoogleMapsColorScheme` | — | Color scheme (`DARK`, `FOLLOW_SYSTEM`, `LIGHT`). |
| contentPadding | `GoogleMapsContentPadding` | — | Padding signalling portions of the map that may be obscured; the Google logo etc. moves to avoid overlap. |
| mapOptions | `GoogleMapsMapOptions` | — | GoogleMapOptions configuration (`mapId`). |
| markers | `GoogleMapsMarker[]` | — | Markers. |
| polygons | `GoogleMapsPolygon[]` | — | Polygons. |
| polylines | `GoogleMapsPolyline[]` | — | Polylines. |
| properties | `GoogleMapsProperties` | — | Map properties. |
| uiSettings | `GoogleMapsUISettings` | — | UI-specific settings. |
| userLocation | `GoogleMapsUserLocation` | — | User location, overrides default behavior. |
| onCameraMove / onCircleClick / onMapClick / onMapLoaded / onMapLongClick / onMarkerClick / onPOIClick / onPolygonClick / onPolylineClick | callbacks | — | Event callbacks (`onPOIClick` event: `{ coordinates, name }`). |
| ref, style | `Ref<GoogleMapsViewType>`, `StyleProp<ViewStyle>` | — | Handle and style. |

`GoogleMapsViewType`: `selectMarker(id, options): Promise<void>` (animates camera; rapid calls may reject), `setCameraPosition(config: SetCameraPositionConfig): Promise<void>` (`SetCameraPositionConfig` = `CameraPosition` + `duration` ms; resolves when animation finishes, rejects if interrupted).

`GoogleStreetView` (Android) props: `position: StreetViewCameraPosition` (`coordinates`, optional `bearing`, `tilt`, `zoom`), `isPanningGesturesEnabled`, `isStreetNamesEnabled`, `isUserNavigationEnabled`, `isZoomGesturesEnabled`, `style`.

### Shared and platform types

- `Coordinates`: `latitude?`, `longitude?` (numbers). `CameraPosition`: `coordinates?`, `zoom?`. `CameraMoveEvent`: `bearing`, `coordinates`, `latitudeDelta`, `longitudeDelta`, `tilt`, `zoom`.
- `AppleMapsMarker`: `coordinates?`, `id?`, `monogram?` (iOS 17.0+, mutually exclusive with `systemImage`; `systemImage` wins), `systemImage?` (SF Symbol), `tintColor?`, `title?`. `AppleMapsAnnotation` = `AppleMapsMarker` + `anchor?` (`{x, y}`; default centers content, so a pin icon needs `{ x: 0.5, y: 1 }`), `backgroundColor?`, `icon?`, `text?`, `textColor?`.
- `AppleMapsCircle`: `center`, `radius` (meters), `color?`, `id?`, `lineColor?`, `lineWidth?`, `width?`. `AppleMapsPolygon`: `coordinates`, `color?`, `id?`, `lineColor?`, `lineWidth?`. `AppleMapsPolyline`: `coordinates`, `color?`, `contourStyle?` (`GEODESIC` | `STRAIGHT`), `id?`, `width?`.
- `AppleMapsProperties`: `elevation?` (`AUTOMATIC` | `FLAT` | `REALISTIC`), `emphasis?` (`AUTOMATIC` | `MUTED`), `isMyLocationEnabled?` (default `false`), `isTrafficEnabled?`, `mapType?` (`HYBRID` | `IMAGERY` | `STANDARD`), `pointsOfInterest?` (`{ including?, excluding? }` arrays of `AppleMapPointOfInterestCategory`; empty `including` hides all POIs, empty `excluding` shows all), `polylineTapThreshold?` (meters, default 20), `selectionEnabled?`.
- `AppleMapsUISettings`: `compassEnabled?`, `myLocationButtonEnabled?`, `scaleBarEnabled?`, `togglePitchEnabled?`.
- `AppleMapPointOfInterestCategory` enum (values equal names): AIRPORT, AMUSEMENT_PARK, ANIMAL_SERVICE, AQUARIUM, ATM, AUTOMOTIVE_REPAIR, BAKERY, BANK, BASEBALL, BASKETBALL, BEACH, BEAUTY, BOWLING, BREWERY, CAFE, CAMPGROUND, CAR_RENTAL, CASTLE, CONVENTION_CENTER, DISTILLERY, EV_CHARGER, FAIRGROUND, FIRE_STATION, FISHING, FITNESS_CENTER, FOOD_MARKET, FORTRESS, GAS_STATION, GO_KART, GOLF, HIKING, HOSPITAL, HOTEL, KAYAKING, LANDMARK, LAUNDRY, LIBRARY, MAILBOX, MARINA, MINI_GOLF, MOVIE_THEATER, MUSEUM, MUSIC_VENUE, NATIONAL_MONUMENT, NATIONAL_PARK, NIGHTLIFE, PARK, PARKING, PHARMACY, PLANETARIUM, POLICE, POST_OFFICE, PUBLIC_TRANSPORT, RESTAURANT, RESTROOM, ROCK_CLIMBING, RV_PARK, SCHOOL, SKATE_PARK, SKATING, SKIING, SOCCER, SPA, STADIUM, STORE, SURFING, SWIMMING, TENNIS, THEATER, UNIVERSITY, VOLLEYBALL, WINERY, ZOO.
- `AppleMapsColorScheme`: `AUTOMATIC` (follows app light/dark), `DARK`, `LIGHT`.
- `GoogleMapsMarker`: `anchor?` (default bottom-center of the icon), `coordinates?`, `draggable?`, `icon?`, `id?`, `showCallout?`, `snippet?`, `title?`, `zIndex?` (default `0`). `GoogleMapsCircle`: `center`, `radius`, `clickCoordinates?`, `color?`, `id?`, `lineColor?`, `lineWidth?`. `GoogleMapsPolygon`: `coordinates`, `color?`, `id?`, `lineColor?`, `lineWidth?`. `GoogleMapsPolyline`: `coordinates`, `color?`, `geodesic?`, `id?`, `width?`.
- `GoogleMapsProperties`: `isBuildingEnabled?`, `isIndoorEnabled?`, `isMyLocationEnabled?`, `isTrafficEnabled?`, `mapStyleOptions?` (`{ json: string }`), `mapType?` (`HYBRID` | `NORMAL` | `SATELLITE` | `TERRAIN`), `maxZoomPreference?`, `minZoomPreference?`, `selectionEnabled?`.
- `GoogleMapsUISettings`: `compassEnabled?`, `indoorLevelPickerEnabled?`, `mapToolbarEnabled?`, `myLocationButtonEnabled?`, `rotationGesturesEnabled?`, `scaleBarEnabled?`, `scrollGesturesEnabled?`, `scrollGesturesEnabledDuringRotateOrZoom?`, `tiltGesturesEnabled?`, `togglePitchEnabled?`, `zoomControlsEnabled?`, `zoomGesturesEnabled?`.
- `GoogleMapsContentPadding`: `bottom?`, `end?`, `start?`, `top?`. `GoogleMapsUserLocation`: `coordinates`, `followUserLocation`.

## Notes

- Platforms: Android, iOS (not in the web target). Source `https://github.com/expo/expo/tree/sdk-58/packages/expo-maps` (Expo SDK 58 docs, modificationDate September 15, 2026).
- On iOS, Expo Maps uses Apple Maps and requires iOS 17 or later. iOS 18 or later is required for marker/annotation/overlay tap callbacks (`onMarkerClick`, `onPolylineClick`, ...) and programmatic selection (`selectMarker`, `selectAnnotation`).
- Google Maps is supported exclusively on Android. For Google Maps on iOS, use an alternative library or write your own module.
- Google Maps on Android setup: register a Google Cloud API project, enable Maps SDK for Android, copy the app's SHA-1 certificate fingerprint (Google Play Console App Signing for Play Store builds; the project's Credentials page for development builds), create an API key restricted to Android apps (package name from `android.package` + SHA-1), then set `android.config.googleMaps.apiKey` in app.json and create a new development build.
- Android permissions: `ACCESS_COARSE_LOCATION`, `ACCESS_FINE_LOCATION`, `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_LOCATION`, `ACCESS_BACKGROUND_LOCATION`. iOS: `NSLocationWhenInUseUsageDescription`.
- Marker size is determined by the loaded image dimensions, not a style prop. For SVG icons set `width`, `height`, `viewBox` or pass `maxWidth` / `maxHeight` to `useImage`; use `anchor` to align the icon with its coordinates.
- Example project: `with-maps` (`npx create-expo-app --example with-maps`).

## Related

- [Image](./image.md)
