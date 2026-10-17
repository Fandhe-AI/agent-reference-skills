---
source: https://developer.apple.com/documentation/appintents/playvideointent
---

# PlayVideoIntent

An intent that looks for videos based on a search term, then plays the content.

## Signature / Usage

```swift
protocol PlayVideoIntent : SystemIntent
```

Required members (from the Topics section):

```swift
var term: String { get }
static var supportedCategories: [VideoCategory] { get }
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `term` | `var term: String` | The search term requested by the user. |
| `supportedCategories` | `static var supportedCategories: [VideoCategory]` | The list of video categories that the app supports through this intent. |

## Notes

- iOS 17.2+, iPadOS 17.2+, Mac Catalyst 17.2+, macOS 14.2+, tvOS 17.2+, visionOS (version not listed on the page). No watchOS availability is listed.
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `SystemIntent`.
- Referenced article: "Configuring the runtime behavior of your app intents".

## Related

- [VideoCategory](./videocategory.md)
- [AudioPlaybackIntent](./audioplaybackintent.md)
- [SystemIntent](./systemintent.md)
