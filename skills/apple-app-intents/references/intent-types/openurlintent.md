---
source: https://developer.apple.com/documentation/appintents/openurlintent
---

# OpenURLIntent

An app intent that opens one of your universal links and displays its contents.

## Signature / Usage

```swift
struct OpenURLIntent
```

Initializers and properties (from the Topics section):

```swift
init(_: URL)
init(urlRepresentable: some URLRepresentableEnum) throws
init(urlRepresentable: some URLRepresentableEntity) async throws
var url: URL
var $url: IntentParameter<URL>
```

## Options / Props

| Member | Description |
| --- | --- |
| `init(_:)` | Configures the app intent with the provided URL. |
| `init(urlRepresentable:)` (enum) | Configures the app intent using an app enum with a URL representation. |
| `init(urlRepresentable:)` (entity) | Configures the app intent using an app entity with a URL representation. |
| `url` | The universal link you use to locate your app's content. |
| `$url` | `IntentParameter<URL>` projected value (no abstract on the page). |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Conforms to `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `SystemIntent`, `URLRepresentableIntent`.
- Uses the app's existing universal link support to open the specified URL. Apps that support universal links can return this type as the result of another app intent's `perform()` to display specific content. It can also be placed on a button in an interactive widget or Live Activity; the system sends the URL to the app's URL handling code.
- The system automatically brings the app to the foreground. If the intent adopts `TargetContentProvidingIntent` or `UISceneAppIntent`, it is directed to one of the app's scenes first; otherwise update the interface in `perform()`.
- Universal link adoption is covered in the Xcode article "Allowing apps and websites to link to your content" (not part of this skill).
- WidgetKit-side usage of intents in widgets is covered by apple-app-services, not this skill.

## Related

- [OpenIntent](./openintent.md)
- [URLRepresentableIntent](./urlrepresentableintent.md)
- [SystemIntent](./systemintent.md)
