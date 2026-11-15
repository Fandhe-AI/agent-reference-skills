---
source: https://iamcredentials.googleapis.com/$discovery/rest?version=v1
---

# IAM Service Account Credentials API REST API (iamcredentials)

## Signature / Usage

Base URL: `https://iamcredentials.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `iamcredentials.locations.workforcePools.getAllowedLocations`

- Versions: v1
- `GET https://iamcredentials.googleapis.com/v1/{+name}/allowedLocations`
- Returns the trust boundary info for a given workforce pool.
- Request: —; Response: `WorkforcePoolAllowedLocations`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of workforce pool. |

### `iamcredentials.projects.locations.workloadIdentityPools.getAllowedLocations`

- Versions: v1
- `GET https://iamcredentials.googleapis.com/v1/{+name}/allowedLocations`
- Returns the trust boundary info for a given workload identity pool.
- Request: —; Response: `WorkloadIdentityPoolAllowedLocations`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of workload identity pool. |

### `iamcredentials.projects.serviceAccounts.generateAccessToken`

- Versions: v1
- `POST https://iamcredentials.googleapis.com/v1/{+name}:generateAccessToken`
- Generates an OAuth 2.0 access token for a service account.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateAccessTokenRequest`; Response: `GenerateAccessTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the service account for which the credentials are requested, in the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. |

### `iamcredentials.projects.serviceAccounts.generateIdToken`

- Versions: v1
- `POST https://iamcredentials.googleapis.com/v1/{+name}:generateIdToken`
- Generates an OpenID Connect ID token for a service account.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateIdTokenRequest`; Response: `GenerateIdTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the service account for which the credentials are requested, in the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. |

### `iamcredentials.projects.serviceAccounts.getAllowedLocations`

- Versions: v1
- `GET https://iamcredentials.googleapis.com/v1/{+name}/allowedLocations`
- Returns the trust boundary info for a given service account.
- Request: —; Response: `ServiceAccountAllowedLocations`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of service account. Format: `projects/-/serviceAccounts/{service_account_email}` |

### `iamcredentials.projects.serviceAccounts.signBlob`

- Versions: v1
- `POST https://iamcredentials.googleapis.com/v1/{+name}:signBlob`
- Signs a blob using a service account's system-managed private key.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SignBlobRequest`; Response: `SignBlobResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the service account for which the credentials are requested, in the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. |

### `iamcredentials.projects.serviceAccounts.signJwt`

- Versions: v1
- `POST https://iamcredentials.googleapis.com/v1/{+name}:signJwt`
- Signs a JWT using a service account's system-managed private key.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SignJwtRequest`; Response: `SignJwtResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the service account for which the credentials are requested, in the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. |

### Example request skeleton

Generated from the Discovery entry of `iamcredentials.locations.workforcePools.getAllowedLocations` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://iamcredentials.googleapis.com/v1/{+name}/allowedLocations"
```

## Notes

- Generated from the Discovery document(s) v1 of `iamcredentials` (retrieved 2026-11-14). Resources on this page: locations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when a path variable is described as optional (the method then also accepts the URL without that segment, as its description says).
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/iamcredentials/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://iamcredentials.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
