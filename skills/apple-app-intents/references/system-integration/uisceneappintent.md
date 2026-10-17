---
source: https://developer.apple.com/documentation/appintents/uisceneappintent
---

# UISceneAppIntent

An interface you use to direct an app intent to a specific scene in your UIKit app.

## Signature / Usage

```swift
protocol UISceneAppIntent : TargetContentProvidingIntent
```

```swift
var uiScene: UIScene? { get }
func performNavigation(forScene: UIScene)
```

## Options / Props

| Member | Description |
| --- | --- |
| `uiScene` | The scene that is handling the app intent. |
| `performNavigation(forScene:)` | Tells the app intent that the system is about to show the specified scene (required; has a default implementation). |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, tvOS 26.0+, visionOS 26.0+
- In a UIKit app, adopt this protocol in an app intent that causes the system to launch your app in the foreground (for example, one that also supports `OpenIntent`). It tells the system to deliver the app intent to one of your scenes before calling `perform()`; use the intent to configure views and prepare the interface.
- Also update the scene's delegate to support `AppIntentSceneDelegate`. The system directs the intent to the scene that indicates support for it. If the scene delegate does not implement `AppIntentSceneDelegate`, the system calls `performNavigation(forScene:)` on the app intent instead, so you can configure the scene from intent code.
- `UIScene` and `UISceneDelegate` are covered by apple-uikit.
- Article: "Directing app intents to your app's scenes".
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `TargetContentProvidingIntent`.

## Related

- [AppIntentSceneDelegate](./appintentscenedelegate.md)
- [TargetContentProvidingIntent](./targetcontentprovidingintent.md)
- [OpenIntent](../intent-types/openintent.md)
