# PasswordVault

Represents a Credential Locker of credentials, specific to a user. Namespace: `Windows.Security.Credentials`.

## Signature / Usage

```csharp
var vault = new Windows.Security.Credentials.PasswordVault();
vault.Add(new Windows.Security.Credentials.PasswordCredential(
    "My App", username, password));

// Retrieve later
var credential = vault.Retrieve("My App", username);
credential.RetrievePassword();
string password = credential.Password;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Add(PasswordCredential) | method | Adds a credential to the Credential Locker. |
| FindAllByResource(String) | method | Searches for credentials matching the resource specified. |
| FindAllByUserName(String) | method | Searches for credentials matching the user name specified. |
| Remove(PasswordCredential) | method | Removes a credential from the Credential Locker. |
| Retrieve(String resource, String userName) | method | Reads a single credential from the Credential Locker. |
| RetrieveAll() | method | Retrieves all credentials stored in the Credential Locker. |

## Notes

- Apps running in an AppContainer (for example, UWP apps) can only access the contents of their own locker for the current user. Apps not running in an AppContainer (for example, regular Desktop apps) can access all the user's lockers, including those of AppContainer apps.
- Credentials stored via `PasswordVault` roam between the user's devices via their Microsoft account, do not expire, and are not cleared due to inactivity. A maximum of 20 credentials per app can be stored.
- For domain accounts, credentials associated with a domain do not roam outside that domain.
- Only use the Credential Locker for passwords, not for larger data blobs; never store credentials in plain text via app data or roaming settings.
- For new applications, prefer Windows Hello / passkeys over password-based credential storage where possible.

## Related

- [PasswordCredential](./password-credential.md)
- [KeyCredentialManager](./key-credential-manager.md)
