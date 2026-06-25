# ASWebAuthenticationSession

A session for authenticating users through a web service using OAuth, OpenID Connect, or other web-based flows. Displays a secure in-app browser with a clear domain indicator.

## Signature / Usage

```swift
import AuthenticationServices

var webAuthSession: ASWebAuthenticationSession?

func signInWithOAuth() {
    let authURL = URL(string: "https://example.com/oauth/authorize?client_id=…&redirect_uri=myapp://callback")!

    webAuthSession = ASWebAuthenticationSession(
        url: authURL,
        callback: .customScheme("myapp")
    ) { callbackURL, error in
        guard error == nil, let callbackURL else { return }
        // Extract authorization code from callbackURL query parameters
    }

    webAuthSession?.presentationContextProvider = self
    webAuthSession?.prefersEphemeralWebBrowserSession = false
    webAuthSession?.start()
}
```

## Options / Props

**Initializer (current):**
```swift
init(
    url: URL,
    callback: ASWebAuthenticationSession.Callback,
    completionHandler: ASWebAuthenticationSession.CompletionHandler
)
```

| Parameter | Description |
|-----------|-------------|
| `url` | The authentication page URL (OAuth authorization endpoint) |
| `callback` | Specifies how the session detects the redirect: `.customScheme("myapp")` or `.https(host:path:)` |
| `completionHandler` | `(URL?, (any Error)?) -> Void` — receives the redirect URL or an error |

| Property | Type | Description |
|----------|------|-------------|
| `presentationContextProvider` | `ASWebAuthenticationPresentationContextProviding?` | Provides the `ASPresentationAnchor` (window) |
| `prefersEphemeralWebBrowserSession` | `Bool` | `true` = private session (no shared cookies/data); user sees an extra alert |
| `canStart` | `Bool` | Whether the session can be started |

| Method | Description |
|--------|-------------|
| `start()` | Launches the browser; returns `Bool` indicating success |
| `cancel()` | Dismisses the browser and delivers a cancellation error |

## Notes

iOS 12.0+, iPadOS 12.0+, macOS 10.15+, tvOS 16.0+, watchOS 6.2+, visionOS 1.0+, Mac Catalyst 13.0+. Keep a strong reference to the session object — if it's deallocated the session is cancelled. Set `prefersEphemeralWebBrowserSession = true` for flows that should not share cookies with Safari or other sessions. On iOS 13+, `presentationContextProvider` is required. The deprecated `callbackURLScheme:` initializer is replaced by `callback:`.

## Related

- [asauthorizationcontroller.md](./asauthorizationcontroller.md)
