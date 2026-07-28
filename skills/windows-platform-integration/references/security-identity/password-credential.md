# PasswordCredential

Represents the password credential store — a single resource / user name / password tuple used with `PasswordVault`. Namespace: `Windows.Security.Credentials`.

## Signature / Usage

```csharp
var credential = new Windows.Security.Credentials.PasswordCredential(
    resource: "My App", userName: username, password: password);

// Retrieved instances have Password empty until:
credential.RetrievePassword();
string password = credential.Password;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| PasswordCredential() | constructor | Creates an empty instance. |
| PasswordCredential(String resource, String userName, String password) | constructor | Creates an instance with the provided credential data. |
| Password | String | The password string. Must not be null/empty when set. Call `RetrievePassword()` first to populate it on an instance obtained from the vault. |
| Resource | String | The resource identifier for the credential (commonly the app name or service name). |
| UserName | String | The user name of the credential. Must not be null/empty. |
| RetrievePassword() | method | Populates the `Password` property for a credential retrieved from `PasswordVault`. |

## Notes

- Namespace: `Windows.Security.Credentials` (WinRT). Instances obtained via `PasswordVault.Retrieve` / `RetrieveAll` do not include the password until `RetrievePassword()` is called explicitly, as a deliberate friction point against casual enumeration.

## Related

- [PasswordVault](./password-vault.md)
