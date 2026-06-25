# ASAuthorizationAppleIDRequest

An OpenID authorization request for Sign in with Apple. Obtained from `ASAuthorizationAppleIDProvider.createRequest()`.

## Signature / Usage

```swift
let provider = ASAuthorizationAppleIDProvider()
let request = provider.createRequest()

// Configure scope
request.requestedScopes = [.fullName, .email]

// Anti-replay nonce (SHA-256 hash of a random value; store the raw value for server verification)
request.nonce = sha256Hash(rawNonce)

// State parameter echoed back in credential
request.state = "myStateToken"

let controller = ASAuthorizationController(authorizationRequests: [request])
```

## Options / Props

Inherits from `ASAuthorizationOpenIDRequest`:

| Property | Type | Description |
|----------|------|-------------|
| `requestedScopes` | `[ASAuthorization.Scope]?` | Data requested from the user |
| `nonce` | `String?` | Hashed nonce included in the identity token for replay protection |
| `state` | `String?` | Arbitrary string echoed unchanged in the resulting credential |
| `user` | `String?` | Pre-fills the user field with a known Apple ID user identifier |

**`ASAuthorization.Scope` values:**

| Value | Description |
|-------|-------------|
| `.fullName` | User's full name (`PersonNameComponents`) |
| `.email` | User's email address |

## Notes

iOS 13.0+, iPadOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+, Mac Catalyst 13.1+. `fullName` and `email` are only provided on the **first** successful authorization — subsequent authorizations return `nil` for these fields. Store them securely (e.g., on your server) immediately after the initial sign-in. The `nonce` must be a SHA-256 hash of the raw nonce; verify it server-side against the `identityToken` JWT.

## Related

- [asauthorizationappleidprovider.md](./asauthorizationappleidprovider.md)
- [asauthorizationappleidcredential.md](./asauthorizationappleidcredential.md)
- [asauthorizationcontroller.md](./asauthorizationcontroller.md)
