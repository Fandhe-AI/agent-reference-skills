# OAuth2Manager (Windows App SDK OAuth 2.0)

`Microsoft.Security.Authentication.OAuth.OAuth2Manager` performs OAuth 2.0 authorization code flow with PKCE for desktop apps (such as WinUI 3) using the user's default browser.

## Signature / Usage

```csharp
// Get the WindowId for the application window
Microsoft.UI.WindowId parentWindowId = this.AppWindow.Id;

AuthRequestParams authRequestParams = AuthRequestParams.CreateForAuthorizationCodeRequest("my_client_id",
   new Uri("my-app:/oauth-callback/"));
authRequestParams.Scope = "user:email user:birthday";

AuthRequestResult authRequestResult = await OAuth2Manager.RequestAuthWithParamsAsync(parentWindowId, 
   new Uri("https://my.server.com/oauth/authorize"), authRequestParams);

if (authRequestResult.Response is AuthResponse authResponse)
{
   // Exchange the code for tokens
   TokenRequestParams tokenRequestParams = TokenRequestParams.CreateForAuthorizationCodeRequest(authResponse);

   // For public clients using PKCE, do not include ClientAuthentication
   TokenRequestResult tokenRequestResult = await OAuth2Manager.RequestTokenAsync(
       new Uri("https://my.server.com/oauth/token"), tokenRequestParams);
}
else
{
   AuthFailure authFailure = authRequestResult.Failure;
   NotifyFailure(authFailure.Error, authFailure.ErrorDescription);
}
```

Refresh an access token:

```csharp
TokenRequestParams tokenRequestParams = TokenRequestParams.CreateForRefreshToken(refreshToken);
TokenRequestResult tokenRequestResult = await OAuth2Manager.RequestTokenAsync(
    new Uri("https://my.server.com/oauth/token"), tokenRequestParams);
```

Complete an authorization request from a protocol activation (handle `AppInstance.Activated` when the app has custom redirect logic):

```csharp
protected override void OnActivated(IActivatedEventArgs args)
{
    if (args.Kind == ActivationKind.Protocol)
    {
        ProtocolActivatedEventArgs protocolArgs = args as ProtocolActivatedEventArgs;
        if (OAuth2Manager.CompleteAuthRequest(protocolArgs.Uri))
        {
            TerminateCurrentProcess();
        }

        DisplayUnhandledMessageToUser();
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| AuthRequestParams.CreateForAuthorizationCodeRequest(clientId, redirectUri) | static method | Creates authorization code request parameters; set `Scope` afterwards. |
| OAuth2Manager.RequestAuthWithParamsAsync(WindowId, Uri, AuthRequestParams) | static method | Starts the authorization request; returns `AuthRequestResult` with `Response` (`AuthResponse`, has `Code`) or `Failure` (`AuthFailure`). |
| TokenRequestParams.CreateForAuthorizationCodeRequest(authResponse) | static method | Token request parameters for exchanging the authorization code. |
| TokenRequestParams.CreateForRefreshToken(refreshToken) | static method | Token request parameters for refreshing an access token. |
| OAuth2Manager.RequestTokenAsync(Uri, TokenRequestParams[, ClientAuthentication]) | static method | Returns `TokenRequestResult` with `Response` (`TokenResponse`: `AccessToken`, `TokenType`, `RefreshToken`, `ExpiresIn`) or `Failure` (`TokenFailure`). |
| ClientAuthentication.CreateForBasicAuthorization(clientId, clientSecret) | static method | Client credentials for confidential clients only. |
| OAuth2Manager.CompleteAuthRequest(Uri) | static method | Completes an authorization request from a protocol activation URI. |

## Notes

- Requires the Windows App SDK Experimental release channel: install a prerelease `Microsoft.WindowsAppSDK` with an `-experimental` suffix (select Include prerelease in NuGet). Not available in the stable channel.
- No APIs for the implicit grant or resource owner password credential (security concerns). Use authorization code grant with PKCE (RFC 7636).
- Always uses the system (default) browser for the authorization step; differs from `WebAuthenticationBroker`. Follows RFC 6749, RFC 7636, and RFC 8252.
- Desktop apps are public clients and must not embed client secrets. Use `ClientAuthentication` only in confidential (server-side) components; do the secret-bearing exchange on a backend.
- For Microsoft accounts or Microsoft Entra ID with silent SSO (no browser prompt), Windows Hello integration, or conditional access, use MSAL.NET with the Web Account Manager broker instead.
- Full WinUI sample: `microsoft/WindowsAppSDK-Samples` (`release/experimental`, `Samples/OAuth2Manager`).

## Related

- [Web Account Manager in WinUI 3](./web-account-manager.md)
- [WebAuthenticationBroker](./web-authentication-broker.md)
