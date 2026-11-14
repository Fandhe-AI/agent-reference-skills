# PaymentMethodBinding

A binding that makes payment methods available in apps for an Apple Account.

## Signature / Usage

```swift
struct PaymentMethodBinding
```

Adapted (not in the official docs): minimal call sequence built from the `init(id:)` and `bind()` declarations; `bindingID` is the in-app binding identifier your server receives from the Apple server.

```swift
import StoreKit

// Call only after an explicit user action, such as tapping a button.
func bindPaymentMethod(bindingID: String) async throws {
    let binding = try await PaymentMethodBinding(id: bindingID)
    try await binding.bind()
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(id:)` | `init(id: String) async throws` | Creates the payment method binding for eligible apps and users |
| `id` | `let id: String` | The in-app binding identifier |
| `bind()` | `func bind() async throws` | Asks the user to confirm adding the payment method to their Apple payment methods |
| `PaymentMethodBindingError` | `enum` | Error information for payment method binding: `failed`, `invalidPinningID`, `notEligible` |

## Notes

- Available iOS 16.4+, iPadOS 16.4+, Mac Catalyst 16.4+, visionOS 1.0+. Not listed for macOS, tvOS or watchOS.
- Conforms to `Equatable`, `Hashable`, `Identifiable`, `Sendable` and `SendableMetatype`.
- Available only to eligible apps with server entitlements. `init(id:)` throws if the app lacks the entitlement or the user isn't eligible.
- `init(id:)` and `bind()` may display a system prompt that asks the user to authenticate with their Apple Account. Call them only after an explicit user action.
- Initialize with the in-app binding identifier your server receives when it initiates payment method binding; `bind()` prompts the user to confirm adding the payment method and making it their primary payment method.
- Methods may also throw `StoreKitError.userCancelled`. `PaymentMethodBindingError` cases: `failed` (initialization or binding failed), `invalidPinningID` (identifier invalid or expired), `notEligible` (user isn't eligible).
- Source: https://developer.apple.com/documentation/storekit/paymentmethodbinding (fetched 2026-11-14)

## Related

- [AppStore](./appstore.md)
