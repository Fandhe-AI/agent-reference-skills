# WebAuthenticationCoreManager

Static class with core methods for obtaining tokens from web account providers (Microsoft account, Microsoft Entra ID, or other registered system account providers) — the WinRT API underlying Web Account Manager (WAM). Namespace: `Windows.Security.Authentication.Web.Core`.

## Signature / Usage

```csharp
WebAccountProvider provider =
    await WebAuthenticationCoreManager.FindAccountProviderAsync("https://login.microsoft.com", "organizations");

var request = new WebTokenRequest(provider, "openid profile", clientId);
WebTokenRequestResult result = await WebAuthenticationCoreManager.RequestTokenAsync(request);

if (result.ResponseStatus == WebTokenRequestStatus.Success)
{
    string token = result.ResponseData[0].Token;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| FindAccountProviderAsync(String) / (String, String) / (String, String, User) | static method | Finds a web account provider (for example Microsoft account or Microsoft Entra ID) by identifier and optional authority. |
| FindSystemAccountProviderAsync(...) | static method | Finds a provider capable of device-wide (system) authentication. |
| FindAccountAsync(WebAccountProvider, String userId) | static method | Finds a specific web account for a provider. |
| FindAllAccountsAsync(WebAccountProvider) / (WebAccountProvider, String) | static method | Enumerates all accounts the user has added for a given provider. |
| RequestTokenAsync(WebTokenRequest) / (WebTokenRequest, WebAccount) | static method | Requests a token, prompting the user for credentials if necessary. |
| GetTokenSilentlyAsync(WebTokenRequest) / (WebTokenRequest, WebAccount) | static method | Requests a token without showing any UI; fails if silent retrieval isn't possible. |
| CreateWebAccountMonitor(IIterable\<WebAccount\>) | static method | Creates a monitor to watch given accounts for state changes (for example sign-out). |
| AddAccountWithTransferTokenAsync(WebAuthenticationTransferTokenRequest) | static method | Adds an account to a cloud device using a transfer token. |

## Notes

- Namespace: `Windows.Security.Authentication.Web.Core` (WinRT). This is the low-level WAM broker API; only supports Microsoft accounts and Microsoft Entra ID accounts (not arbitrary third-party OAuth providers — use `WebAuthenticationBroker` for those).
- Microsoft recommends most new apps use **MSAL.NET with the WAM broker** rather than calling `WebAuthenticationCoreManager` directly; MSAL.NET wraps this API and adds silent SSO, token caching, and Windows Hello–backed device-bound refresh tokens.
- Desktop apps must supply a window handle (HWND) for UI-showing calls via the corresponding interop APIs, similar to `UserConsentVerifier`.

## Related

- [WebAccountProvider](./web-account-provider.md)
- [WebAuthenticationBroker](./web-authentication-broker.md)
