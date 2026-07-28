# Push notifications functionality migration

Migration guidance for push notifications: identity moves from Partner Center (MSA) to Azure App Registration (Microsoft Entra ID), and access tokens are requested from Microsoft Entra ID instead of the MSA endpoint. Only raw and app push notifications are supported — badge and tile push notifications are not.

## Signature / Usage

```http
# UWP: MSA access token request
POST /accesstoken.srf HTTP/1.1
Host: login.live.com
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id=<AppID_Here>&client_secret=<Client_Secret_Here>&scope=notify.windows.com
```

```http
# Windows App SDK: Microsoft Entra ID access token request
POST /{tenantID}/oauth2/v2.0/token HTTP/1.1
Host: login.microsoftonline.com
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id=<Azure_App_Registration_AppId_Here>&client_secret=<Azure_App_Registration_Secret_Here>&resource=https://wns.windows.com/
```

## Options / Props

| Stage | UWP | Windows App SDK |
|------|-------------|------|
| Identity | Partner Center (MSA) | Azure App Registration (Microsoft Entra ID) |
| Channel request | Asynchronous | Asynchronous, uses Azure App Registration ID, built-in retry (up to 5) |
| Activation | In-process, `PushTrigger`, COM activation (Windows 10 2004+) | In-process, COM activation, `ShellExecute` |
| Sending notifications | Access token from `login.live.com` | Access token from `login.microsoftonline.com/{tenantID}/oauth2/token` |

## Notes

- The Windows App SDK app no longer needs a Package Family Name (PFN) from Partner Center for push identity — the Azure AppID from Microsoft Entra ID takes its place.
- The final HTTP POST to WNS (`dm3p.notify.windows.com`) with the `Authorization: Bearer` header and `X-WNS-Type: wns/raw` is unchanged between UWP and Windows App SDK.
- Distinct from [app notifications (toast)](./toast-notifications-migration.md) — push notifications concern server-to-device delivery and identity/token setup, while app notifications concern local toast display and activation handling.

## Related

- [App notifications from UWP to WinUI migration](./toast-notifications-migration.md)
- [Application lifecycle functionality migration](./applifecycle-migration.md)
