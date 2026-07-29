# RemoteAuthClient

Hands off a PKCE (RFC 7636) OAuth authorization flow from a Wear OS app to the paired phone: the user completes sign-in in a browser on the phone, and the response is relayed back to the watch. The Device Authorization Grant (RFC 8628) flow does not use `RemoteAuthClient` — it opens the verification URI on the phone via `RemoteActivityHelper` instead.

## Signature / Usage

```kotlin
import androidx.wear.phone.interactions.authentication.CodeChallenge
import androidx.wear.phone.interactions.authentication.OAuthRequest
import androidx.wear.phone.interactions.authentication.OAuthResponse
import androidx.wear.phone.interactions.authentication.RemoteAuthClient

val oauthRequest = OAuthRequest.Builder(context)
    .setAuthProviderUrl(Uri.parse(authProviderUrl))
    .setClientId(CLIENT_ID)
    .setCodeChallenge(CodeChallenge(codeVerifier))
    .build()

RemoteAuthClient.create(context).sendAuthorizationRequest(
    oauthRequest,
    { command -> command?.run() }, // Executor
    object : RemoteAuthClient.Callback() {
        override fun onAuthorizationResponse(request: OAuthRequest, response: OAuthResponse) {
            // Extract the auth code from response, exchange it for a token, and store it.
        }
        override fun onAuthorizationError(request: OAuthRequest, errorCode: Int) {
            // Handle failure
        }
    },
)
```

## Options / Props

| Member | Type | Description |
| --- | --- | --- |
| `RemoteAuthClient.create(context)` | `RemoteAuthClient` | Creates a client bound to the context. |
| `sendAuthorizationRequest(request, executor, callback)` | `Unit` | Sends the OAuth request to the companion phone for browser-based authorization. |
| `close()` | `Unit` | Frees resources used by the client, dropping any outstanding requests. This is the only way to cancel an in-flight request. |
| `OAuthRequest.Builder(context)` | — | `.setAuthProviderUrl(uri)`, `.setClientId(id)`, `.setCodeChallenge(challenge)`, `.build()`. |
| `RemoteAuthClient.Callback.onAuthorizationResponse(request, response)` | — | Delivers the `OAuthResponse` on success. |
| `RemoteAuthClient.Callback.onAuthorizationError(request, errorCode)` | — | Delivers a failure code. |

## Notes

- Package: `androidx.wear.phone.interactions.authentication`.
- Official current guidance ("Authentication on wearables") recommends **Credential Manager** as the primary sign-in API for Wear OS; `RemoteAuthClient` (OAuth 2.0) and Mobile Auth Token Data Layer Sharing are positioned as acceptable fallback flows to offer if the user dismisses the Credential Manager screen, not as the first choice for new implementations.
- For the Device Authorization Grant fallback flow, use [RemoteActivityHelper](./remoteactivityhelper.md) to open the verification URI on the paired phone instead of `RemoteAuthClient`.

## Related

- [RemoteActivityHelper](./remoteactivityhelper.md)
