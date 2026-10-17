---
source: https://developer.apple.com/documentation/appintents/urlrepresentableintent
---

# URLRepresentableIntent

An interface you add to an app intent type so the system can handle it like a universal link.

## Signature / Usage

```swift
protocol URLRepresentableIntent : AppIntent
```

Required members (from the Topics section):

```swift
typealias URLRepresentation
static var urlRepresentation: Self.URLRepresentation { get }
```

For a worked example of constructing the URL representation, see IntentURLRepresentation.

## Options / Props

| Name | Description |
| --- | --- |
| `URLRepresentation` | The type that provides the URL for the app intent. |
| `urlRepresentation` | The URL representation of the app intent (three default implementations exist). |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`. Conforming type listed in the source: `OpenURLIntent`.
- Use when the app already supports universal links, to express app intent types as URLs. If the intent also supports `OpenIntent`, the system opens the contained item by sending the URL to the app's URL handling code, so you can omit `perform()`. A URL representation also makes it easier to share the intent's contents with Siri, Shortcuts, and other system features.
- Important: this protocol requires universal links. It cannot be used with a custom URL scheme or other approaches.
- Construct URLs using static text and the content of the intent's properties.
- Referenced article: "Configuring the runtime behavior of your app intents".

## Related

- [IntentURLRepresentation](./intenturlrepresentation.md)
- [CustomURLRepresentationParameterConvertible](./customurlrepresentationparameterconvertible.md)
- [OpenIntent](./openintent.md)
- [OpenURLIntent](./openurlintent.md)
