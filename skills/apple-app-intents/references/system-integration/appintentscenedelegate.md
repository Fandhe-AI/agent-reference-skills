---
source: https://developer.apple.com/documentation/appintents/appintentscenedelegate
---

# AppIntentSceneDelegate

The interface a UIKit scene delegate uses to receive an app intent and configure the scene's views.

## Signature / Usage

```swift
protocol AppIntentSceneDelegate : UISceneDelegate
```

```swift
func scene(UIScene, willPerformAppIntent: any UISceneAppIntent)
```

## Options / Props

| Member | Description |
| --- | --- |
| `scene(_:willPerformAppIntent:)` | Tells the scene delegate to prepare the scene for the specified app intent (required). |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, tvOS 26.0+, visionOS 26.0+
- Adopt in your UIKit scene delegate to receive incoming app intents and configure the interface in response. When an app intent must run in the foreground, the system picks one of your scenes and delivers the intent through this protocol before running its `perform()` method (for example, to update the scene's views to display an entity the intent references).
- If the scene delegate does not implement this protocol, the system lets the app intent configure the scene through `UISceneAppIntent.performNavigation(forScene:)`.
- `UISceneDelegate` is covered by apple-uikit.
- Article: "Directing app intents to your app's scenes".
- Inherits from `NSObjectProtocol`, `UISceneDelegate`.

## Related

- [UISceneAppIntent](./uisceneappintent.md)
- [TargetContentProvidingIntent](./targetcontentprovidingintent.md)
