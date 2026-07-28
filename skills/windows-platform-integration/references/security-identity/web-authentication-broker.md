# WebAuthenticationBroker

Static class that starts a browser-based OAuth authentication operation (navigating to a start URI and watching for a redirect to a known callback URI). Namespace: `Windows.Security.Authentication.Web`.

## Signature / Usage

```csharp
var startUri = new Uri("https://www.facebook.com/dialog/oauth?client_id=..." +
    "&redirect_uri=" + Uri.EscapeUriString(callbackUrl) +
    "&scope=read_stream&display=popup&response_type=token");
var endUri = new Uri(callbackUrl);

WebAuthenticationResult result = await WebAuthenticationBroker.AuthenticateAsync(
    WebAuthenticationOptions.None, startUri, endUri);

if (result.ResponseStatus == WebAuthenticationStatus.Success)
{
    string responseData = result.ResponseData;
}
else if (result.ResponseStatus == WebAuthenticationStatus.ErrorHttp)
{
    string error = result.ResponseErrorDetail.ToString();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| AuthenticateAsync(WebAuthenticationOptions, Uri startUri, Uri endUri) | static method | Starts the authentication operation with an explicit callback URI to watch for. |
| AuthenticateAsync(WebAuthenticationOptions, Uri startUri) | static method | Starts the authentication operation, ending when the app's own callback URI is reached. |
| AuthenticateSilentlyAsync(Uri, WebAuthenticationOptions) / (Uri) | static method | Performs the operation without showing UI (no user interaction). |
| AuthenticateAndContinue(Uri, ...) | static method | Starts authentication and suspends the app, resuming via a continuation callback (used from tiles/live activation). |
| GetCurrentApplicationCallbackUri() | static method | Gets the current app's registered callback URI. |

## Notes

- Namespace: `Windows.Security.Authentication.Web` (WinRT). Requires the `internetClient` app capability declared in the package manifest.
- Used for general-purpose OAuth 2.0 authorization-code/implicit flows against arbitrary identity providers (Facebook, Google, custom OAuth servers). For Microsoft account / Microsoft Entra ID sign-in specifically, prefer `WebAuthenticationCoreManager` / Web Account Manager (or MSAL.NET with the WAM broker) for silent SSO and Windows Hello–backed tokens instead.
- Troubleshoot via Event Viewer: **Application and Services Logs > Microsoft > Windows > WebAuth > Operational**.

## Related

- [WebAuthenticationCoreManager](./web-authentication-core-manager.md)
- [WebAccountProvider](./web-account-provider.md)
