# ASAuthorizationControllerDelegate

A protocol that receives the outcome of an authorization request managed by `ASAuthorizationController`.

## Signature / Usage

```swift
extension MyViewController: ASAuthorizationControllerDelegate {

    func authorizationController(controller: ASAuthorizationController,
                                 didCompleteWithAuthorization authorization: ASAuthorization) {
        if let credential = authorization.credential as? ASAuthorizationAppleIDCredential {
            let userID = credential.user
            let idToken = credential.identityToken
            // Verify idToken server-side, persist userID
        }
    }

    func authorizationController(controller: ASAuthorizationController,
                                 didCompleteWithError error: any Error) {
        if let authError = error as? ASAuthorizationError,
           authError.code == .canceled {
            // User dismissed — no action needed
        } else {
            // Handle other errors
        }
    }
}
```

## Options / Props

| Method | Required | Description |
|--------|----------|-------------|
| `authorizationController(controller:didCompleteWithAuthorization:)` | Yes | Called when authorization succeeds; inspect `authorization.credential` |
| `authorizationController(controller:didCompleteWithError:)` | Yes | Called when authorization fails or is cancelled; error is typically `ASAuthorizationError` |
| `authorizationController(_:didCompleteWithCustomMethod:)` | No | Called when the user selects a custom authorization method |

**`ASAuthorizationError.Code` common values:**

| Code | Description |
|------|-------------|
| `.canceled` | User cancelled the authorization sheet |
| `.failed` | Authorization request failed |
| `.invalidResponse` | Response from the service was invalid |
| `.notHandled` | Request was not handled |
| `.notInteractive` | Interaction was not allowed (e.g. in background) |

## Notes

iOS 13.0+, iPadOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+, Mac Catalyst 13.1+. All methods run on the **main thread** (`@MainActor`). Set the delegate on `ASAuthorizationController` before calling `performRequests()`. Cast `authorization.credential` to `ASAuthorizationAppleIDCredential` for Sign in with Apple, `ASPasswordCredential` for passwords, or `ASAuthorizationPlatformPublicKeyCredentialAssertion` for passkeys.

## Related

- [asauthorizationcontroller.md](./asauthorizationcontroller.md)
- [asauthorizationappleidcredential.md](./asauthorizationappleidcredential.md)
