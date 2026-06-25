# ASAuthorizationAppleIDCredential

The credential returned after a successful Sign in with Apple authorization. Received via `ASAuthorizationControllerDelegate`.

## Signature / Usage

```swift
func authorizationController(controller: ASAuthorizationController,
                             didCompleteWithAuthorization authorization: ASAuthorization) {
    guard let credential = authorization.credential as? ASAuthorizationAppleIDCredential else { return }

    let userID     = credential.user            // Stable identifier; persist this
    let fullName   = credential.fullName        // Only on first sign-in
    let email      = credential.email           // Only on first sign-in
    let idToken    = credential.identityToken   // JWT; verify server-side
    let authCode   = credential.authorizationCode // Exchange for server tokens

    // Persist userID; store fullName/email on server immediately
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `user` | `String` | Stable, unique identifier for the user across devices |
| `fullName` | `PersonNameComponents?` | User's name; **only provided on first authorization** |
| `email` | `String?` | User's email; **only provided on first authorization** |
| `identityToken` | `Data?` | Signed JWT; verify signature and claims server-side |
| `authorizationCode` | `Data?` | Short-lived token to exchange for server-side access/refresh tokens |
| `realUserStatus` | `ASUserDetectionStatus` | `.likelyReal`, `.unknown`, or `.unsupported` — indicates bot detection |
| `state` | `String?` | The `state` value set on the original request |
| `authorizedScopes` | `[ASAuthorization.Scope]` | Scopes the user actually granted |

## Notes

iOS 13.0+, iPadOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+, Mac Catalyst 13.1+. **`fullName` and `email` are delivered only once** — on the first successful authorization for a given app. Persist them to your server during that callback. On subsequent sign-ins these are `nil`. Validate `identityToken` using Apple's public keys (`appleid.apple.com/auth/keys`) before trusting user identity.

## Related

- [asauthorizationappleidprovider.md](./asauthorizationappleidprovider.md)
- [asauthorizationappleidrequest.md](./asauthorizationappleidrequest.md)
- [asauthorizationcontrollerdelegate.md](./asauthorizationcontrollerdelegate.md)
