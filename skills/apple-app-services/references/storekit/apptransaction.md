# AppTransaction

Information that represents the customer's purchase of the app, cryptographically signed by the App Store.

## Signature / Usage

```swift
struct AppTransaction
```

```swift
// Get the cached app transaction (may use local cache)
let verificationResult = try await AppTransaction.shared

// Force refresh from App Store server
let verificationResult = try await AppTransaction.refresh()

switch verificationResult {
case .verified(let appTransaction):
    let originalVersion = appTransaction.originalAppVersion
    // Use originalVersion to unlock legacy entitlements
case .unverified:
    break
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `shared` | `static VerificationResult<AppTransaction>` | Signed app transaction (uses local cache) |
| `refresh()` | `static func` | Fetches fresh app transaction from App Store server |
| `bundleID` | `String` | App bundle identifier |
| `appVersion` | `String` | Current app version |
| `originalAppVersion` | `String` | Version the customer first purchased |
| `originalPurchaseDate` | `Date` | Date of original app purchase |
| `appID` | `UInt64?` | App Store numeric identifier |
| `environment` | `AppStore.Environment` | Environment (production, sandbox, xcode) |
| `signedDate` | `Date` | Date the JWS was signed |
| `revocationDate` | `Date?` | Date the app purchase was revoked, if any |
| `preorderDate` | `Date?` | Pre-order date, if applicable |

## Notes

Available iOS 16.0+, iPadOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+.

Use `originalAppVersion` to distinguish customers who purchased before a certain version — useful for granting grandfather access to features that became paid. `AppTransaction.shared` uses a local cache; call `AppTransaction.refresh()` only when you need fresh server-signed data.

## Related

- [VerificationResult](./verificationresult.md)
- [AppStore](./appstore.md)
