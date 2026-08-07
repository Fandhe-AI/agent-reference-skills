# location-maps

| Name | Description | Path |
|------|-------------|------|
| Annotation | A customizable annotation that places an arbitrary SwiftUI view at a coordinate on a `Map`. Use when `Marker`'s balloon style is insufficient. | [Annotation.md](./Annotation.md) |
| CLAuthorizationStatus | An enum indicating the app's authorization to use location services. Check this value to determine what location capabilities are available and prompt the user appropriately. | [CLAuthorizationStatus.md](./CLAuthorizationStatus.md) |
| CLBackgroundActivitySession | An object that manages a visual indicator keeping your app active in the background so it can continue receiving location updates or monitoring events. | [CLBackgroundActivitySession.md](./CLBackgroundActivitySession.md) |
| CLGeocoder | Converts between geographic coordinates and place names (forward and reverse geocoding). Deprecated in iOS 26 / macOS 27; use MapKit for new code. | [CLGeocoder.md](./CLGeocoder.md) |
| CLLocation | Represents the latitude, longitude, altitude, speed, and course information reported by the system. Typically obtained from `CLLocationManager` or `CLLocationUpdate`; rarely constructed manually. | [CLLocation.md](./CLLocation.md) |
| CLLocationCoordinate2D | A struct representing a geographic coordinate (latitude and longitude) in the WGS 84 reference frame. The fundamental value type used throughout Core Location and MapKit. | [CLLocationCoordinate2D.md](./CLLocationCoordinate2D.md) |
| CLLocationManager | The central object for starting and stopping location-related event delivery. Configure it with desired accuracy and distance filters, then assign a delegate or use the async `CLLocationUpdate` API. | [CLLocationManager.md](./CLLocationManager.md) |
| CLLocationManagerDelegate | The protocol for receiving location and authorization events from a `CLLocationManager`. Implement in an app-specific class and assign it to `manager.delegate` before starting services. | [CLLocationManagerDelegate.md](./CLLocationManagerDelegate.md) |
| CLLocationUpdate | A Swift struct delivered by the Core Location framework for each async location update. Use `CLLocationUpdate.liveUpdates(_:)` to consume updates as an `AsyncSequence`, replacing the delegate pattern for new code. | [CLLocationUpdate.md](./CLLocationUpdate.md) |
| CLMonitor | An actor that monitors conditions you add to it and observes events such as entry to a geographic area or proximity to a beacon. | [CLMonitor.md](./CLMonitor.md) |
| CLPlacemark | A user-friendly description of a geographic coordinate: name, street address, city, country, time zone, and points of interest. Typically returned by `CLGeocoder`. Deprecated in iOS 27+; prefer `GeoToolbox.PlaceDescriptor` or MapKit for new code. | [CLPlacemark.md](./CLPlacemark.md) |
| CLRegion | An abstract base class representing a geographic area that can be monitored for entry/exit events. Use a concrete subclass such as `CLCircularRegion` or `CLBeaconRegion`. | [CLRegion.md](./CLRegion.md) |
| LookAroundPreview | A SwiftUI view that displays a street-level Look Around preview for a geographic location. Requires fetching an `MKLookAroundScene` first via `MKLookAroundSceneRequest`. | [LookAroundPreview.md](./LookAroundPreview.md) |
| Map | A SwiftUI view that displays an embedded map interface. Place `Marker`, `Annotation`, `MapPolyline`, `MapCircle`, and other `MapContent` in its content closure. | [Map.md](./Map.md) |
| MapCameraPosition | Describes how to position the map's camera. Pass as an `initialPosition` or a `Binding<MapCameraPosition>` to a `Map` view. When the user pans/zooms, the value transitions to `.positionedByUser`. | [MapCameraPosition.md](./MapCameraPosition.md) |
| MapCircle | A circular overlay centered on a geographic coordinate with a given radius in meters. Use inside a `Map` content closure for geofence visualization or proximity rings. | [MapCircle.md](./MapCircle.md) |
| MapPolyline | An open polygon overlay consisting of connected line segments. Use inside a `Map` content closure to draw routes or paths. | [MapPolyline.md](./MapPolyline.md) |
| MapStyle | A struct that defines the visual presentation of a `Map` view. Apply with the `.mapStyle(_:)` view modifier. | [MapStyle.md](./MapStyle.md) |
| Marker | A balloon-shaped annotation that marks a map location. The simplest way to add a pin-style callout to a `Map`. | [Marker.md](./Marker.md) |
| MKCoordinateRegion | A rectangular geographic region defined by a center coordinate and a span (degrees). Used with `MapCameraPosition.region(_:)` and historically with `MKMapView.region`. | [MKCoordinateRegion.md](./MKCoordinateRegion.md) |
| MKMapItem | Represents a point of interest on the map, bundling location data with associated metadata (name, URL, phone number, category). Used with `Marker(item:)`, `MapCameraPosition.item(_:)`, and to open locations in the Maps app. | [MKMapItem.md](./MKMapItem.md) |
