---
source: https://developer.apple.com/documentation/appintents/openintent
---

# OpenIntent

An app intent that opens and displays a specific item in your app's interface.

## Signature / Usage

```swift
protocol OpenIntent : SystemIntent
```

Required members (from the Topics section "Getting the item to open"):

```swift
associatedtype Value : AppValue
var target: Self.Value { get }
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `Value` | `associatedtype Value : AppValue` | The type of the item to open. |
| `target` | `var target: Self.Value` | The item to open in your app. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (version not listed on the page), watchOS 9.0+
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `SystemIntent`.
- The `target` property is typically an `AppEntity` or `AppEnum` type you define. Spotlight can populate it with an entity someone found during a search of your app's content.
- If the intent type implements `URLRepresentableIntent`, or the `target` parameter contains a type with a URL representation, provide a `perform()` implementation that returns a result and does nothing else. When a URL is present, the system opens the item using your app's URL support instead.
- The system automatically brings the app to the foreground. If the intent adopts `TargetContentProvidingIntent` or `UISceneAppIntent`, the system also directs the intent to one of the app's scenes first so you can configure the scene's views. Otherwise use `perform()` to update the interface.
- Source pages mentioning this type: "Configuring the runtime behavior of your app intents", "Creating your first app intent", "Directing app intents to your app's scenes", "Getting started with the App Intents framework", "Making app entities available in Spotlight".

## Related

- [SystemIntent](./systemintent.md)
- [OpenURLIntent](./openurlintent.md)
- [SetValueIntent](./setvalueintent.md)
- [DeleteIntent](./deleteintent.md)
- [DeprecatedAppIntent](./deprecatedappintent.md)
- [URLRepresentableIntent](./urlrepresentableintent.md)
