---
source: https://developer.apple.com/documentation/appintents/intentcurrencyamount
---

# IntentCurrencyAmount

An amount of money to transfer during a financial transaction.

## Signature / Usage

```swift
struct IntentCurrencyAmount
```

```swift
init(amount: Decimal, currencyCode: String)
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `amount` | `let amount: Decimal` | The monetary amount. |
| `currencyCode` | `let currencyCode: String` | The ISO 4217 currency code that applies to the monetary amount. |
| `init(amount:currencyCode:)` | `init(amount: Decimal, currencyCode: String)` | Creates a IntentCurrencyAmount from a monetary amount and a currency code. |
| `defaultResolverSpecification` | `static var defaultResolverSpecification: EmptyResolverSpecification<IntentCurrencyAmount>` | Type property. |
| `Specification`, `UnwrappedType`, `ValueType` | Type aliases | — |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+; visionOS (no `introducedAt` value in the source JSON)
- Conforms to `Copyable`, `CustomLocalizedStringResourceConvertible`, `DisplayRepresentable`, `Equatable`, `Escapable`, `Hashable`, `InstanceDisplayRepresentable`, `IntentValueConvertible`, `IntentValueExpressing`, `Sendable`, `SendableMetatype`, `TypeDisplayRepresentable`.
- Listed under "Monetary types" together with `IntentPaymentMethod`.

## Related

- [IntentPaymentMethod](./intentpaymentmethod.md)
- [IntentValueConvertible](./intentvalueconvertible.md)
