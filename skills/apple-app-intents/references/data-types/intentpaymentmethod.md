---
source: https://developer.apple.com/documentation/appintents/intentpaymentmethod
---

# IntentPaymentMethod

Information about a form of payment supported by your app.

## Signature / Usage

```swift
struct IntentPaymentMethod
```

```swift
init(type: IntentPaymentMethod.PaymentType, name: LocalizedStringResource?, identificationHint: String?, icon: DisplayRepresentation.Image?)
```

An `IntentPaymentMethod` type describes a way someone pays for goods and services. This type contains information you can display in your interface to convey the payment type to people. Specifically, it stores the name of the payment service and an icon for any related brand information. Typical payment methods include credit cards and bank accounts.

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `paymentType` | `var paymentType: IntentPaymentMethod.PaymentType` | The kind of payment method, such as a credit card or bank account. |
| `name` | `var name: String?` | The user-visible name of the payment method. |
| `identificationHint` | `var identificationHint: String?` | A hint making it easier for the user to identify the payment method among others of similar name or type, such as the last several digits of a credit card number. |
| `icon` | `var icon: DisplayRepresentation.Image?` | The icon or image representing this payment method. |
| `PaymentType` | `enum PaymentType` | Constants that describe the available payment options, such as credit cards or bank accounts (cases not fetched). |
| `defaultResolverSpecification` | `static var defaultResolverSpecification: EmptyResolverSpecification<IntentPaymentMethod>` | Type property. |
| `Specification`, `UnwrappedType`, `ValueType` | Type aliases | — |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+; visionOS (no `introducedAt` value in the source JSON)
- Conforms to `Copyable`, `CustomLocalizedStringResourceConvertible`, `DisplayRepresentable`, `Escapable`, `InstanceDisplayRepresentable`, `IntentValueConvertible`, `IntentValueExpressing`, `Sendable`, `SendableMetatype`, `TypeDisplayRepresentable`.
- Listed under "Monetary types" together with `IntentCurrencyAmount`.

## Related

- [IntentCurrencyAmount](./intentcurrencyamount.md)
- [IntentValueConvertible](./intentvalueconvertible.md)
