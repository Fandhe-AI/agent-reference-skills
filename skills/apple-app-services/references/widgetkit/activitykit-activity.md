# Activity (ActivityKit)

A generic class in the ActivityKit framework for starting, updating, and ending Live Activities.

## Signature / Usage

```swift
// ActivityKit framework
class Activity<Attributes> where Attributes: ActivityAttributes
```

```swift
// Define attributes
struct DeliveryAttributes: ActivityAttributes {
    struct ContentState: Codable, Hashable {
        var driverName: String
        var estimatedArrival: Date
    }
    let orderNumber: String
}

// Start a Live Activity (must be in foreground)
let attributes = DeliveryAttributes(orderNumber: "12345")
let contentState = DeliveryAttributes.ContentState(driverName: "Alex", estimatedArrival: Date().addingTimeInterval(1800))
let activity = try Activity.request(
    attributes: attributes,
    content: .init(state: contentState, staleDate: nil)
)

// Update from background
await activity.update(.init(state: updatedState, staleDate: nil))

// End the activity
await activity.end(.init(state: finalState, staleDate: nil), dismissalPolicy: .after(Date().addingTimeInterval(300)))
```

## Options / Props

Key methods on `Activity<Attributes>`:

| Method / Property | Description |
|-------------------|-------------|
| `static func request(attributes:content:pushType:) throws -> Activity` | Starts a new Live Activity |
| `func update(_ content:) async` | Updates the Live Activity's dynamic content |
| `func end(_ content:dismissalPolicy:) async` | Ends the Live Activity |
| `id: String` | Unique identifier for the activity |
| `attributes: Attributes` | The static, immutable attributes of the activity |
| `content: ActivityContent<ContentState>` | Current dynamic content |
| `activityState: ActivityState` | Lifecycle state (`.active`, `.ended`, `.dismissed`, `.stale`) |
| `pushToken: Data?` | Token for ActivityKit push notifications |
| `static var activities: [Activity<Attributes>]` | All active Live Activities for this attributes type |

## Notes

- iOS 16.1+, iPadOS 16.1+, Mac Catalyst 16.1+
- Starting requires the app to be in the foreground (or using `LiveActivityIntent`)
- Updating and ending can happen from the background
- Add `NSSupportsLiveActivities = YES` to Info.plist
- visionOS does not support Live Activities
- Live Activities are displayed using `ActivityConfiguration` from the WidgetKit framework

## Related

- [ActivityConfiguration](./activityconfiguration.md)
