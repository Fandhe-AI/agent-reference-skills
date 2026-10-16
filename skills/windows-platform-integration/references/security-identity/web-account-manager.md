# Web Account Manager in WinUI 3 (AccountsSettingsPaneInterop / MSAL.NET + WAM)

How a WinUI 3 desktop app uses Windows Web Account Manager (WAM) via HWND interop to sign in with Microsoft or Microsoft Entra ID accounts and call Microsoft Graph.

## Signature / Usage

```csharp
// Show the accounts pane (no CoreWindow in WinUI 3 desktop: use HWND interop)
IntPtr hwnd = WindowNative.GetWindowHandle(App.MainWindow);
var pane = AccountsSettingsPaneInterop.GetForWindow(hwnd);
pane.AccountCommandsRequested += BuildPaneAsync;   // register BEFORE showing
await AccountsSettingsPaneInterop.ShowAddAccountForWindowAsync(hwnd);

private async void BuildPaneAsync(AccountsSettingsPane s,
    AccountsSettingsPaneCommandsRequestedEventArgs e)
{
    var deferral = e.GetDeferral();
    try
    {
        var provider = await WebAuthenticationCoreManager.FindAccountProviderAsync(
            "https://login.microsoft.com", "consumers");

        var command = new WebAccountProviderCommand(provider, GetTokenAsync);
        e.WebAccountProviderCommands.Add(command);
    }
    finally
    {
        deferral.Complete();
    }
}

private async void GetTokenAsync(WebAccountProviderCommand command)
{
    IntPtr hwnd = WindowNative.GetWindowHandle(App.MainWindow);
    var request = new WebTokenRequest(command.WebAccountProvider, "User.Read", "your_client_id_here");
    WebTokenRequestResult result =
        await WebAuthenticationCoreManagerInterop.RequestTokenForWindowAsync(hwnd, request);

    if (result.ResponseStatus == WebTokenRequestStatus.Success)
    {
        string token = result.ResponseData[0].Token;
    }
}
```

Silent token with a stored account:

```csharp
WebAccountProvider provider = await WebAuthenticationCoreManager.FindAccountProviderAsync(providerId);
WebAccount account = await WebAuthenticationCoreManager.FindAccountAsync(provider, accountId);
var request = new WebTokenRequest(provider, "User.Read", clientId);
WebTokenRequestResult result = await WebAuthenticationCoreManager.GetTokenSilentlyAsync(request, account);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| AccountsSettingsPaneInterop.ShowAddAccountForWindowAsync(hwnd) | static method | Shows the accounts flyout for a window handle; raises `AccountCommandsRequested`. |
| AccountsSettingsPaneInterop.GetForWindow(hwnd) | static method | Gets the pane instance for the window handle (replaces `GetForCurrentView`). |
| AccountsSettingsPaneCommandsRequestedEventArgs.WebAccountProviderCommands | collection | Provider commands shown in the pane. |
| AccountsSettingsPaneCommandsRequestedEventArgs.HeaderText | string | Custom header text (keep short). |
| AccountsSettingsPaneCommandsRequestedEventArgs.Commands | collection | Custom links such as `SettingsCommand` (privacy policy, support page). |
| WebAuthenticationCoreManagerInterop.RequestTokenForWindowAsync(hwnd, request) | static method | Window-parented interactive token request. |
| WebTokenRequest.AppProperties | map | Sign-in hint or other special properties; ignored when caching the web account. |
| WebAccount.SignOutAsync() | method | Clears the cache and invalidates existing tokens. |

## Notes

- For new projects, prefer MSAL.NET with the WAM broker (`.WithBroker()` and `.WithParentActivityOrWindow(hwnd)`) as the primary authentication library; it handles token caching, refresh, scope negotiation, and WAM integration. The patterns here are useful for the `AccountsSettingsPane` flyout UI, direct WAM access, or understanding the broker. Sample: `Azure-Samples/ms-identity-docs-code-dotnet` (`desktop-winui`).
- `AccountsSettingsPane.Show()` and `AccountsSettingsPane.GetForCurrentView()` cannot be used in WinUI 3 desktop apps (no `CoreWindow`); use `AccountsSettingsPaneInterop` with an HWND.
- Prerequisites: .NET 6 or later, Windows 10 1809 (build 17763) or later, an Azure app registration (Application/client ID) with Microsoft Graph delegated `User.Read`. WinUI 3 desktop apps do not require Store association.
- Register/deregister `AccountCommandsRequested` in `Loaded`/`Unloaded` to avoid leaks. Keep all provider/header/command additions between `GetDeferral` and `Complete`; always complete in `finally`.
- Use `"organizations"` instead of `"consumers"` for Microsoft Entra.
- Handle other `WebTokenRequestStatus` values in production: `UserInteractionRequired`, `AccountSwitch`, `AccountProviderNotAvailable`, `ProviderError`, `UserCancel`.
- `ApplicationData.Current.LocalSettings` requires package identity (MSIX); unpackaged apps need another store (JSON file, registry).
- `AccountsSettingsPane` natively supports only Microsoft and Microsoft Entra providers; for third-party providers use `OAuth2Manager`.

## Related

- [WebAuthenticationCoreManager](./web-authentication-core-manager.md)
- [WebAccountProvider](./web-account-provider.md)
- [OAuth2Manager](./oauth2-manager.md)
