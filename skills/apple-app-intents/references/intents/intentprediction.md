---
source: https://developer.apple.com/documentation/appintents/intentprediction
---

# IntentPrediction

A prediction for an app intent that the system might display to someone when it's relevant.

## Signature / Usage

```swift
struct IntentPrediction<Intent, T> where Intent : AppIntent
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
    func perform() async throws -> IntentResult<BookEntity> {
        ...
    }
}
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `init(displayRepresentation:)` | `init(displayRepresentation: () -> DisplayRepresentation)` | Creates a prediction without parameters. |
| `init(parameters:displayRepresentation:)` | `init<V0, ..., P0, ..., K0, ...>(parameters: T, displayRepresentation: (V0, ...) -> DisplayRepresentation)` | Many overloads of increasing arity (the page lists overloads with `V0` through `V14` seen in the fragments); each maps the given parameters (a tuple of key paths to the intent's parameters) to the closure's arguments. Available when `Intent` conforms to `AppIntent`. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (the page JSON lists visionOS without an `introducedAt` value).
- You create this type from the `predictionConfiguration` property of a `PredictableIntent`. Provide a `DisplayRepresentation` that describes the intent's purpose; the system uses it in proactive suggestions.
- Conforms to `IntentPredictionConfiguration`.

## Related

- [PredictableIntent](./predictableintent.md)
- [AppIntent](./appintent.md)
