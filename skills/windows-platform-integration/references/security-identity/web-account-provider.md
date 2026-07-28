# WebAccountProvider

Represents a web account authentication provider (for example Microsoft account or a Microsoft Entra ID tenant), used with `WebAuthenticationCoreManager`. Namespace: `Windows.Security.Credentials`.

## Signature / Usage

```csharp
WebAccountProvider msaProvider =
    await WebAuthenticationCoreManager.FindAccountProviderAsync("https://login.microsoft.com", "consumers");

var provider = new WebAccountProvider(id, displayName, iconUri); // manual construction
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| WebAccountProvider(String id, String displayName, Uri iconUri) | constructor | Creates a provider instance. |
| Authority | String | Disambiguates between multiple identities of a single provider (for example Microsoft account vs. Microsoft Entra ID). |
| DisplayName | String | Display name for the provider. |
| DisplayPurpose | String | Display purpose of the provider. |
| IconUri | Uri | Icon URI to display for the provider. |
| Id | String | The provider's identifier. |
| IsSystemProvider | Boolean | Whether the provider supports system-wide (device-level) authentication tokens. |
| User | User | The user associated with the provider. |

## Notes

- Namespace: `Windows.Security.Credentials` despite being used exclusively with the `Windows.Security.Authentication.Web.Core` token APIs.

## Related

- [WebAuthenticationCoreManager](./web-authentication-core-manager.md)
