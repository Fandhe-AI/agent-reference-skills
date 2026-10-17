---
source: https://developer.apple.com/documentation/appintents/cancellableintent
---

# CancellableIntent

An interface to support the graceful cancellation of your app intent's task.

## Signature / Usage

```swift
protocol CancellableIntent : AppIntent
```

```swift
func withIntentCancellationHandler<T>(
    operation: () async throws -> T,
    onCancel: (IntentCancellationReason) -> Void,
    isolation: isolated (any Actor)?
) async rethrows -> T
```

```swift
struct ProcessPaymentIntent: AppIntent, ProgressReportingIntent, CancellableIntent {
    static var title: LocalizedStringResource = "Process Payment"

    @Parameter var amount: Decimal
    @Parameter var paymentMethod: PaymentMethod

    private let paymentService = PaymentService()

    func perform() async throws -> some IntentResult & ProvidesDialog {
        let transactionID = UUID()

        return try await withIntentCancellationHandler {
            updateProgress(fractionCompleted: 0.0, message: "Initiating payment...")
            try await paymentService.initiateTransaction(transactionID, amount: amount)

            updateProgress(fractionCompleted: 0.3, message: "Authorizing payment...")
            try await paymentService.authorize(transactionID, method: paymentMethod)

            updateProgress(fractionCompleted: 0.7, message: "Processing payment...")
            try await paymentService.process(transactionID)

            updateProgress(fractionCompleted: 1.0, message: "Payment complete")
            return .result(dialog: "Payment of \(amount) processed successfully")
        } onCancel: { reason in
            Task {
                switch reason {
                case .timeout:
                    try? await paymentService.rollback(transactionID, reason: "timeout")
                case .userCancelled:
                    try? await paymentService.cancel(transactionID, reason: "user_cancelled")
                default:
                    try? await paymentService.cancel(transactionID, reason: "unknown")
                }
            }
        }
    }
}
```

(The example's supporting `PaymentMethod` `AppEnum` and `PaymentService` class are defined in the official page.)

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `withIntentCancellationHandler(operation:onCancel:isolation:)` | see above | Runs an operation with a cancellation handler that receives a cancellation reason. |

## Notes

- iOS 26.4+, iPadOS 26.4+, Mac Catalyst 26.4+, macOS 26.4+, tvOS 26.4+, visionOS 26.4+, watchOS 26.4+
- The system can cancel an app intent when (1) it did not report progress and exceeded its 30-second runtime limit, or (2) someone monitoring its progress in Siri, Live Activities, or Shortcuts chose to cancel.
- Swift's standard `withTaskCancellationHandler(handler:operation:)` works if you do not need the reason; use `withIntentCancellationHandler` to receive an `IntentCancellationReason`.
- On cancellation: stop the current task, release resources, save intermediate state, and write diagnostics.
- Important: design cancellation handlers to finish quickly. On all platforms except macOS the system can still suspend the process shortly after cancellation; this protocol still provides additional time compared to intents that do not adopt it.
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`.

## Related

- [IntentCancellationReason](./intentcancellationreason.md)
- [LongRunningIntent](./longrunningintent.md)
- [UndoableIntent](./undoableintent.md)
- [AppIntent](./appintent.md)
