# SignInWithAppleButton

A SwiftUI view that displays the standard Sign in with Apple button, handling request configuration and authorization result in a single declaration.

## Signature / Usage

```swift
import AuthenticationServices

SignInWithAppleButton(.signIn) { request in
    request.requestedScopes = [.fullName, .email]
    request.nonce = sha256Hash(rawNonce)
} onCompletion: { result in
    switch result {
    case .success(let authorization):
        guard let credential = authorization.credential as? ASAuthorizationAppleIDCredential else { return }
        // Handle credential
    case .failure(let error):
        print("Authorization failed: \(error)")
    }
}
.signInWithAppleButtonStyle(.black)
.frame(height: 44)
```

## Options / Props

**Initializer:**
```swift
init(
    _ label: SignInWithAppleButton.Label,
    onRequest: (ASAuthorizationAppleIDRequest) -> Void,
    onCompletion: (Result<ASAuthorization, any Error>) -> Void
)
```

**`Label` enum:**

| Case | Button text |
|------|-------------|
| `.signIn` | "Sign in with Apple" |
| `.signUp` | "Sign up with Apple" |
| `.continue` | "Continue with Apple" |

**`Style` enum** (set via `.signInWithAppleButtonStyle(_:)` modifier):

| Case | Appearance |
|------|-----------|
| `.black` | Black background, white logo and text (default) |
| `.white` | White background, black logo and text |
| `.whiteOutline` | White background with black border |

## Notes

iOS 14.0+, iPadOS 14.0+, macOS 11.0+, tvOS 14.0+, watchOS 7.0+, visionOS 1.0+. Requires the **Sign in with Apple** capability (`com.apple.developer.applesignin`) enabled in the app's entitlements. `onRequest` is called synchronously before the authorization sheet appears — configure the request (scopes, nonce) there. `fullName` and `email` are only provided on the first authorization; persist them server-side immediately.

## Related

- [asauthorizationappleidprovider.md](./asauthorizationappleidprovider.md)
- [asauthorizationappleidrequest.md](./asauthorizationappleidrequest.md)
- [asauthorizationappleidcredential.md](./asauthorizationappleidcredential.md)
