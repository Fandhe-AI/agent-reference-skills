# Microsoft Store Submission API (MSI/EXE)

Programmatic submission management for MSI/EXE desktop apps via `https://api.store.microsoft.com`, using Microsoft Entra ID client-credentials authentication.

## Signature / Usage

```
POST https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token

grant_type=client_credentials
client_id=<client_id>
client_secret=<client_secret>
scope=https://api.store.microsoft.com/.default
```

Typical workflow: obtain token → update metadata (listings/properties/availability) → update + commit packages → poll for upload completion → upload + commit listing assets (screenshots/logos via SAS URLs) → create submission (`POST /submission/v1/product/{productId}/submit`) → poll submission status.

## Options / Props

| Endpoint | Method | Purpose |
|---|---|---|
| `/submission/v1/product/{productId}/metadata` | GET/PUT/PATCH | Read/update listings, properties, availability |
| `/submission/v1/product/{productId}/packages` | GET/PUT/PATCH | Read/update installer package details |
| `/submission/v1/product/{productId}/packages/commit` | POST | Commit package changes |
| `/submission/v1/product/{productId}/listings/assets/create` | POST | Generate SAS URLs for screenshot/logo upload |
| `/submission/v1/product/{productId}/listings/assets/commit` | PUT | Commit uploaded listing assets |
| `/submission/v1/product/{productId}/submit` | POST | Create/submit the submission |
| `/submission/v1/product/{productId}/submission/{submissionId}/status` | GET | Poll submission status |

## Notes

- A first submission must be completed manually via Partner Center (including the age ratings questionnaire) before the API can be used.
- Token validity is 60 minutes; responses follow a consistent `{ isSuccess, errors[], responseData }` envelope.
- Package metadata includes MSI/EXE-specific fields such as `installerParameters` (silent install args) and custom error codes.
- Distinct base URL/endpoint family from the MSIX Submission API (`manage.devcenter.microsoft.com`) — these are two separate APIs for two separate package tracks.

## Related

- [MSI/EXE App Publishing](./msi-exe-publishing.md)
- [Submission API MSIX](./submission-api-msix.md)
- [Microsoft Store Developer CLI](./msstore-cli.md)
