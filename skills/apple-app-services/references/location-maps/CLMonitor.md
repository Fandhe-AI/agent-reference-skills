# CLMonitor

An actor that monitors conditions you add to it and observes events such as entry to a geographic area or proximity to a beacon.

## Signature / Usage

```swift
let monitor = await CLMonitor("MyMonitor")
let center = CLLocationCoordinate2D(latitude: 37.3318, longitude: -122.0312)
await monitor.add(CLMonitor.CircularGeographicCondition(center: center, radius: 100), identifier: "home")

for try await event in await monitor.events {
    print(event.identifier, event.state)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `identifiers` | `[String]` | Identifiers of the conditions being monitored |
| `events` | `CLMonitor.Events` | Async sequence of events representing observed conditions |

## Key Methods

```swift
init(_ name: String) async

func add(_ condition: any CLCondition, identifier: String)
func add(_ condition: any CLCondition, identifier: String, assuming state: CLMonitor.Event.State)
func remove(_ identifier: String)
func record(for identifier: String) -> CLMonitor.Record?
```

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+
- Unavailable in a compatible iPad or iPhone app running in visionOS.
- Conditions: `CLMonitor.CircularGeographicCondition` (center + radius) and `CLMonitor.BeaconIdentityCondition` (beacon characteristics).
- Conforms to `Actor`, `Sendable`, `SendableMetatype`; replaces the older `startMonitoring(for:)` region-monitoring API for new code.

## Related

- [CLLocationManager](./CLLocationManager.md)
- [CLRegion](./CLRegion.md)
- [CLLocationUpdate](./CLLocationUpdate.md)
