# UNLocationNotificationTrigger

A trigger that delivers a notification when the device enters or exits a specified geographic region.

## Signature / Usage

```swift
let center = CLLocationCoordinate2D(latitude: 37.335400, longitude: -122.009201)
let region = CLCircularRegion(center: center, radius: 2000.0, identifier: "Headquarters")
region.notifyOnEntry = true
region.notifyOnExit = false

let trigger = UNLocationNotificationTrigger(region: region, repeats: false)
```

## Options / Props

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `init(region:repeats:)` | `convenience init` | Creates the trigger for the given Core Location region |
| `region` | `CLRegion` | The region used to determine when to send the notification |
| `repeats` | `Bool` | Whether to reschedule the notification after delivery |

## Notes

- iOS 10.0+, iPadOS 10.0+, Mac Catalyst 10.0+, watchOS 3.0+ (not available on macOS, tvOS)
- Subclass of `UNNotificationTrigger`
- Requires Core Location when-in-use authorization before scheduling
- Set `CLRegion.notifyOnEntry` and `notifyOnExit` to control the direction of the trigger
- The system applies heuristics before firing to avoid spurious location data triggering notifications

## Related

- [UNNotificationTrigger](./UNNotificationTrigger.md)
- [UNNotificationRequest](./UNNotificationRequest.md)
