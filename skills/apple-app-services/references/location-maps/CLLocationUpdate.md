# CLLocationUpdate

A Swift struct delivered by the Core Location framework for each async location update. Use `CLLocationUpdate.liveUpdates(_:)` to consume updates as an `AsyncSequence`, replacing the delegate pattern for new code.

## Signature / Usage

```swift
// Start receiving live location updates
Task {
    for try await update in CLLocationUpdate.liveUpdates(.default) {
        if let location = update.location {
            print("Lat: \(location.coordinate.latitude)")
        }
        if update.authorizationDenied {
            // Prompt user to grant permission
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `location` | `CLLocation?` | The updated location, if available |
| `stationary` | `Bool` | Whether the device is currently stationary |
| `accuracyLimited` | `Bool` | Location accuracy has been reduced |
| `authorizationDenied` | `Bool` | User denied authorization |
| `authorizationDeniedGlobally` | `Bool` | Location services disabled system-wide |
| `authorizationRestricted` | `Bool` | Authorization restricted (e.g., parental controls) |
| `authorizationRequestInProgress` | `Bool` | Permission dialog is showing |
| `insufficientlyInUse` | `Bool` | App does not have sufficient foreground status |
| `locationUnavailable` | `Bool` | Location is temporarily unavailable |

## Key API

```swift
// Start live updates with a configuration
static func liveUpdates(_ configuration: CLLocationUpdate.LiveConfiguration)
    -> CLLocationUpdate.Updates   // AsyncSequence<CLLocationUpdate, Error>

// Configurations
CLLocationUpdate.LiveConfiguration.default
CLLocationUpdate.LiveConfiguration.automotiveNavigation
CLLocationUpdate.LiveConfiguration.otherNavigation
CLLocationUpdate.LiveConfiguration.fitness
CLLocationUpdate.LiveConfiguration.airborne
```

## Notes

- iOS 17.0+, iPadOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Conforms to `Sendable`; safe across Swift concurrency boundaries.
- The `Updates` type is an `AsyncSequence`; wrap iteration in a `Task` and cancel it to stop updates.
- `isStationary` is deprecated; use `stationary` instead.

## Related

- [CLLocationManager](./CLLocationManager.md)
- [CLLocation](./CLLocation.md)
- [CLAuthorizationStatus](./CLAuthorizationStatus.md)
