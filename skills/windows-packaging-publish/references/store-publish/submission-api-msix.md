# Microsoft Store Submission API (MSIX)

Programmatic creation/management of app, add-on, and package flight submissions for accounts with many products, using Azure AD (Microsoft Entra ID) authentication.

## Signature / Usage

```
POST https://login.microsoftonline.com/<tenant_id>/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=<client_id>
&client_secret=<client_secret>
&resource=https://manage.devcenter.microsoft.com
```

Use the returned Azure AD access token as the `Authorization` header on subsequent Microsoft Store submission API calls (methods grouped into Apps, Add-ons, and Package flights scenarios).

## Options / Props

| Prerequisite | Detail |
|---|---|
| Azure AD directory | Global administrator permission required; can be created for free in Partner Center |
| Azure AD application association | Assigned the **Manager** role in Partner Center; yields tenant ID, client ID, key |
| App must pre-exist | The app must already be created via name reservation in Partner Center — the API cannot create a new app |
| First submission | Must be created manually once in Partner Center (including the age ratings questionnaire) before the API can create further submissions |
| Access token lifetime | 60 minutes |

## Notes

- Once a submission is created/modified via the API, further changes must continue through the API — mixing in Partner Center UI edits can leave the submission in an unrecoverable error state requiring deletion and recreation.
- Not usable for Microsoft Store for Business/Education volume-purchase submissions (discontinued) or direct LOB enterprise distribution — those remain Partner-Center-only.
- Cannot be used for apps/add-ons using mandatory app updates or Store-managed consumable add-ons (returns HTTP 409); Partner Center must be used instead.
- `StoreBroker` is an open-source PowerShell module providing a CLI wrapper over this API.

## Related

- [Create App Submission](./create-app-submission.md)
- [Submission API MSI](./submission-api-msi.md)
- [Microsoft Store Developer CLI](./msstore-cli.md)
