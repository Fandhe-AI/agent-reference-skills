---
source: https://developer.apple.com/documentation/appintents/predictableintent
---

# PredictableIntent

An interface that indicates the system can suggest the intent as a potential action to run.

## Signature / Usage

```swift
protocol PredictableIntent : AppIntent
```

```swift
struct CreateBook: AppIntent, PredictableIntent {
    @Parameter(title: "Book Name")
    var name: String?

    @Parameter(title: "Author", query: AuthorQuery.self)
    var author: AuthorEntity?

    static var predictionConfiguration: some IntentPredictionConfiguration {
        IntentPrediction(parameters: (\Self.$name)) { name in
            DisplayRepresentation(
                title: "Create a book named \(name)"
            )
        }
    }

    @MainActor
    func perform() async throws -> some IntentResult & ReturnsValue<BookEntity> {
        ...
    }
}
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `predictionConfiguration` | `static var predictionConfiguration: Self.Prediction` | A collection of predictions the system can use when it suggests the app intent. |
| `Prediction` | `associatedtype Prediction : IntentPredictionConfiguration` | Type of the prediction configuration. |

Supporting types (listed under "Getting the supporting types"): `IntentPrediction` (struct), `IntentPredictionConfiguration` (protocol: "An interface that provides the configuration for a single prediction."), `IntentPredictionsBuilder` (enum: "A result builder that allows you to declaratively describe the predictions for an app intent.").

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (the page JSON lists visionOS without an `introducedAt` value).
- Adopt it to improve the descriptions the system shows for your intent in proactive suggestions such as the Siri Suggestions widget. Describe the action concisely using only the parameters you find relevant (for example, only one of several parameters).
- Provide one or more `IntentPrediction` values in `predictionConfiguration`; each conveys the intent's purpose using zero or more parameters.
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`. Referenced from the article "Donating your app's data and actions to the system".
- The official example declares `-> IntentResult<BookEntity>`, but IntentResult has no primary associated type; use `some IntentResult & ReturnsValue<BookEntity>` (corrected here).

## Related

- [IntentPrediction](./intentprediction.md)
- [AppIntent](./appintent.md)
- [UndoableIntent](./undoableintent.md)
- [CancellableIntent](./cancellableintent.md)
- [LongRunningIntent](./longrunningintent.md)
