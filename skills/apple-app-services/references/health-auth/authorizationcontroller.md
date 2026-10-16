# AuthorizationController

A SwiftUI environment value that views use to perform authorization requests.

## Signature / Usage

```swift
@MainActor struct AuthorizationController
```

```swift
struct AuthorizationControllerExample: View {
    // Get an instance of AuthorizationController using SwiftUI's @Environment
    // property wrapper.
    @Environment(\.authorizationController) private var authorizationController

    var body: some View {
        Button("Sign In") {
            Task {
                do {
                    // Create the authorization request.
                    async let request = makeAuthorizationRequest()
                    // Perform the request and await its result.
                    let result = try await authorizationController
                        .performRequest(request)
                    switch result {
                        // Process the request's result.
                    }
                } catch {
                    // Respond to any authorization errors.
                }
            }
        }
    }
}
```

## Options / Props

All methods are `@MainActor`, `async throws`, and return `ASAuthorizationResult`.

| Method | Platforms | Description |
|--------|-----------|-------------|
| `performRequest(_ request: ASAuthorizationRequest)` | iOS 16.4+, iPadOS 16.4+, Mac Catalyst 16.4+, macOS 13.3+, tvOS 16.4+, visionOS 1.0+, watchOS 9.4+ | Performs the specified authorization request. |
| `performRequests(_ requests: [ASAuthorizationRequest])` | same as above | Performs an authorization request from the provided array. The framework checks each request against the credentials available on the device; the more credential types the app supports, the more options a person can choose from. |
| `performRequest(_ request: ASAuthorizationRequest, options: ASAuthorizationController.RequestOptions)` | iOS 16.4+, iPadOS 16.4+, Mac Catalyst 16.4+, macOS 13.3+, visionOS 1.0+ (not tvOS / watchOS) | Performs the request with explicit options. |
| `performRequests(_:options:)` | see struct availability in Notes | Array variant of `performRequest(_:options:)`; takes `[ASAuthorizationRequest]` and `ASAuthorizationController.RequestOptions`. |
| `performRequest(_ request: ASAuthorizationRequest, customMethods: [ASAuthorizationCustomMethod])` | tvOS 16.4+ only | Performs the request using custom authorization methods shown in the system UI. If the result is `ASAuthorizationResult.customMethod(_:)`, the associated value is the chosen method. |
| `performRequests(_:customMethods:)` | see struct availability in Notes | Array variant of `performRequest(_:customMethods:)`; takes `[ASAuthorizationRequest]` and `[ASAuthorizationCustomMethod]`. |
| `performAutoFillAssistedRequest(_ request: ASAuthorizationRequest)` | iOS 16.4+, iPadOS 16.4+, visionOS 1.0+ | Performs an AutoFill-assisted authorization request. |
| `performAutoFillAssistedRequests(_:)` | see struct availability in Notes | Array variant of `performAutoFillAssistedRequest(_:)`; takes `[ASAuthorizationRequest]`. |

`ASAuthorizationResult` cases: `appleID(ASAuthorizationAppleIDCredential)`, `password(ASPasswordCredential)`, `passkeyAssertion(ASAuthorizationPlatformPublicKeyCredentialAssertion)`, `passkeyRegistration(ASAuthorizationPlatformPublicKeyCredentialRegistration)`, `securityKeyAssertion(ASAuthorizationSecurityKeyPublicKeyCredentialAssertion)`, `securityKeyRegistration(ASAuthorizationSecurityKeyPublicKeyCredentialRegistration)`, `customMethod(ASAuthorizationCustomMethod)`, `passkeyAccountCreation(ASAuthorizationAccountCreationPlatformPublicKeyCredential)`.

## Notes

- Availability of the struct: iOS 16.4+, iPadOS 16.4+, Mac Catalyst 16.4+, macOS 13.3+, tvOS 16.4+, visionOS 1.0+, watchOS 9.4+. Conforms to `Sendable` and `SendableMetatype`.
- Obtain the instance via `@Environment(\.authorizationController)` (`EnvironmentValues.authorizationController`), not by initializing it.
- Distinct from `ASAuthorizationController` (UIKit / AppKit class, see asauthorizationcontroller.md): that class is built with `init(authorizationRequests:)`, reports results through `ASAuthorizationControllerDelegate`, and needs a `presentationContextProvider`. `AuthorizationController` is a SwiftUI struct that returns `ASAuthorizationResult` from `async throws` methods, with no delegate.
- AutoFill-assisted requests: add `.textContentType(.username)` (and similar) to the sign-in fields, then call `performAutoFillAssistedRequest(_:)` from `.task { ... }` when the view appears.

```swift
TextField("Username", text: $username)
    .textContentType(.username)

.task {
    // Create the authorization request.
    async let request = makeAutoFillAuthorizationRequest()
    // Perform the request and await its result.
    let result = try await authorizationController
        .performAutoFillAssistedRequest(request)
    switch result {
        // Process the request's result.
    }
}
```

- Source: https://developer.apple.com/documentation/authenticationservices/authorizationcontroller

## Related

- [ASAuthorizationController](./asauthorizationcontroller.md)
- [ASAuthorizationAppleIDProvider](./asauthorizationappleidprovider.md)
- [ASAuthorizationAppleIDCredential](./asauthorizationappleidcredential.md)
