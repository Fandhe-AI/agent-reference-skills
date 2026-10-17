---
source: https://developer.apple.com/documentation/appintents/undoableintent
---

# UndoableIntent

An interface you use to register undoable actions in your app intent code.

## Signature / Usage

```swift
protocol UndoableIntent : SystemIntent
```

```swift
var undoManager: UndoManager? { get }
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `undoManager` | `var undoManager: UndoManager?` | The undo manager you use to register undo actions for your app intents. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+
- Adopt it if your app intent performs a task someone might want to undo from the app's interface. The undo manager can be used from your app or from an app extension that runs app intents.
- Inherits from `SystemIntent` (which inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`).
- Listed with the add-on behaviors `CancellableIntent`, `LongRunningIntent`, `PredictableIntent`, `IntentPrediction`.
- Mentioned in the June 2026 updates of App Intents (this page's introduction version is iOS 26.0, not 27.0).

## Related

- [AppIntent](./appintent.md)
- [CancellableIntent](./cancellableintent.md)
- [LongRunningIntent](./longrunningintent.md)
- [PredictableIntent](./predictableintent.md)
- [IntentPrediction](./intentprediction.md)
