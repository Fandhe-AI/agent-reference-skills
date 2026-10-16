# RequestReviewAction

An instance that tells StoreKit to request an App Store rating or review, if appropriate.

## Signature / Usage

```swift
@MainActor struct RequestReviewAction
```

```swift
// Read the environment value, then call the instance directly
@Environment(\.requestReview) private var requestReview

// Calls callAsFunction() — @MainActor func callAsFunction()
requestReview()
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `callAsFunction()` | `@MainActor func` | Tells StoreKit to ask the user to rate or review your app, if appropriate |
| `EnvironmentValues.requestReview` | `var requestReview: RequestReviewAction` | Environment value that provides an instance of this structure |

## Notes

- Available iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, visionOS 1.0+. Not listed for tvOS or watchOS.
- Conforms to `Sendable` and `SendableMetatype`.
- Don't call `callAsFunction()` directly; SwiftUI calls it when you call the instance obtained from the `requestReview` environment value.
- App Store policy governs the actual display. If the person hasn't rated or reviewed the app on this device, StoreKit displays the request a maximum of three times within a 365-day period. If the person has rated or reviewed, StoreKit displays it only if the app version is new and more than 365 days have passed since the previous review.
- Because the API may not present an alert, don't call it in response to a button tap or other user action.
- In development mode StoreKit always displays the request view so you can test the UI. The method has no effect in apps distributed for beta testing through TestFlight.
- Optional persistent link: append the query parameter `action=write-review` to your App Store product page URL (e.g. in a settings screen) to open the page where users can write a review.
- `SKStoreReviewController` is marked deprecated in the same documentation.
- Source: https://developer.apple.com/documentation/storekit/requestreviewaction

## Related

- [AppStore](./appstore.md)
