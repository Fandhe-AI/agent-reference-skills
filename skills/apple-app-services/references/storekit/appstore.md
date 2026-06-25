# AppStore

Namespace for App Store interactions: subscription management, device verification, payment capability checks, transaction sync, and offer code redemption.

## Signature / Usage

```swift
enum AppStore
```

```swift
// Check if user can make purchases
guard AppStore.canMakePayments else { return }

// Sync transactions (e.g., after account restore)
try await AppStore.sync()

// Show manage subscriptions sheet (iOS/iPadOS)
try await AppStore.showManageSubscriptions(in: windowScene)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `canMakePayments` | `static var Bool` | Whether the user can make In-App Purchases |
| `sync()` | `static func` | Synchronizes transaction info and subscription status with App Store |
| `showManageSubscriptions(in:)` | `static func` | Presents the manage subscriptions sheet for a UIWindowScene |
| `showManageSubscriptions(in:subscriptionGroupID:)` | `static func` | Presents sheet filtered to a specific subscription group |
| `deviceVerificationID` | `static var UUID?` | UUID for verifying signed data belongs to the current device |
| `ageRatingCode` | `static var Int?` | Current age rating code for the app |

## Notes

Available iOS 15.0+, iPadOS 15.0+, macOS 12.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+.

`AppStore.sync()` is equivalent to restoring purchases — call it in response to an explicit user action (e.g., "Restore Purchases" button), not automatically. `showManageSubscriptions` is only available on iOS/iPadOS/Mac Catalyst with a `UIWindowScene`.

## Related

- [AppTransaction](./apptransaction.md)
- [Transaction](./transaction.md)
