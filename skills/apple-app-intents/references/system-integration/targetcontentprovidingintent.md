---
source: https://developer.apple.com/documentation/appintents/targetcontentprovidingintent
---

# TargetContentProvidingIntent

An interface that provides a custom content identifier for an app intent.

## Signature / Usage

```swift
protocol TargetContentProvidingIntent : AppIntent
```

```swift
var contentIdentifier: String { get }
```

## Options / Props

| Member | Type | Description |
| --- | --- | --- |
| `contentIdentifier` | `String` | A custom string your app uses to identify the app intent (required; has default implementations). |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, tvOS 26.0+, visionOS 26.0+
- In a SwiftUI app, adopt this protocol in an app intent that affects the contents of your app's interface. The identifier string describes the app intent to your app. When the system launches your app, it looks for a scene that indicates it handles the specified identifier.
- In a UIKit app, use `UISceneAppIntent` (which inherits from this protocol) to achieve the same behavior.
- SwiftUI scene APIs themselves are covered by apple-swiftui; UIKit scene APIs by apple-uikit.
- Articles: "Directing app intents to your app's scenes" (`/documentation/appintents/directing-app-intents-to-your-apps-scenes`), "Configuring the runtime behavior of your app intents".
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`. Inherited by `UISceneAppIntent`.

## Related

- [UISceneAppIntent](./uisceneappintent.md)
- [AppIntentSceneDelegate](./appintentscenedelegate.md)
- [AppIntent](../intents/appintent.md)
