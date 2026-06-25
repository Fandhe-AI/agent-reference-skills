# ASAuthorizationAppleIDProvider

A provider that generates Sign in with Apple authorization requests and can verify a user's credential state.

## Signature / Usage

```swift
let provider = ASAuthorizationAppleIDProvider()

// Create a request
let request = provider.createRequest()
request.requestedScopes = [.fullName, .email]
request.nonce = myHashedNonce

// Check credential state on app launch
provider.getCredentialState(forUserID: storedUserID) { state, error in
    switch state {
    case .authorized:     break // Credential is valid
    case .revoked:        break // Sign in again
    case .notFound:       break // Never signed in
    case .transferred:    break // Migrated to new team ID
    @unknown default:     break
    }
}
```

## Options / Props

| Method | Description |
|--------|-------------|
| `createRequest()` | Returns a new `ASAuthorizationAppleIDRequest` |
| `getCredentialState(forUserID:completion:)` | Async check of the credential state for a previously authenticated user |

**`CredentialState` enum cases:**

| Case | Description |
|------|-------------|
| `.authorized` | Credential is valid and the user is signed in |
| `.revoked` | Credential has been revoked; prompt the user to sign in again |
| `.notFound` | No credential exists for the provided user ID |
| `.transferred` | App was transferred to a new team; use `ASAuthorizationSingleSignOnProvider` to migrate |

## Notes

iOS 13.0+, iPadOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+, Mac Catalyst 13.1+. Call `getCredentialState(forUserID:completion:)` at app launch (e.g., in `applicationDidBecomeActive`) to verify that a previously authenticated user's credentials are still valid before bypassing the sign-in screen. Subscribe to `ASAuthorizationAppleIDProvider.credentialRevokedNotification` to handle revocation while the app is running.

## Related

- [asauthorizationcontroller.md](./asauthorizationcontroller.md)
- [asauthorizationappleidrequest.md](./asauthorizationappleidrequest.md)
- [asauthorizationappleidcredential.md](./asauthorizationappleidcredential.md)
