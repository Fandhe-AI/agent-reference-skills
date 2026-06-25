# ASAuthorizationController

A controller that manages and presents one or more authorization requests (Sign in with Apple, passkeys, passwords, etc.) to the user.

## Signature / Usage

```swift
let provider = ASAuthorizationAppleIDProvider()
let request = provider.createRequest()
request.requestedScopes = [.fullName, .email]

let controller = ASAuthorizationController(authorizationRequests: [request])
controller.delegate = self
controller.presentationContextProvider = self
controller.performRequests()
```

## Options / Props

**Initializer:**
```swift
init(authorizationRequests: [ASAuthorizationRequest])
```

| Property | Type | Description |
|----------|------|-------------|
| `delegate` | `(any ASAuthorizationControllerDelegate)?` | Receives success or failure callbacks |
| `presentationContextProvider` | `(any ASAuthorizationControllerPresentationContextProviding)?` | Provides the window for presenting the authorization UI |
| `authorizationRequests` | `[ASAuthorizationRequest]` | The requests the controller manages |
| `customAuthorizationMethods` | `[ASAuthorizationCustomMethod]` | Additional custom method choices shown to the user |

**Key methods:**

| Method | Description |
|--------|-------------|
| `performRequests()` | Presents the authorization UI modally |
| `performRequests(options:)` | Presents UI with `RequestOptions` (e.g. `.preferImmediatelyAvailableCredentials`) |
| `performAutoFillAssistedRequests()` | Triggers inline AutoFill credential presentation |
| `cancel()` | Dismisses any active authorization UI |

## Notes

iOS 13.0+, iPadOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+, Mac Catalyst 13.1+. `delegate` and `presentationContextProvider` must be set before calling `performRequests()`. Combine multiple request types in a single controller to let the system offer the best available credential. Delegate callbacks execute on the main thread.

## Related

- [asauthorizationappleidprovider.md](./asauthorizationappleidprovider.md)
- [asauthorizationcontrollerdelegate.md](./asauthorizationcontrollerdelegate.md)
- [asauthorizationappleidcredential.md](./asauthorizationappleidcredential.md)
