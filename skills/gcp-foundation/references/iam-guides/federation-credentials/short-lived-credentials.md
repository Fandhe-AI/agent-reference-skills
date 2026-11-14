---
source: https://docs.cloud.google.com/iam/docs/create-short-lived-credentials-direct
---

# Short-Lived Service Account Credentials

Create short-lived access tokens, OIDC ID tokens, self-signed JWTs, and blobs for a service account through the Service Account Credentials API (direct or delegated), and downscoped tokens with Credential Access Boundaries.

## Signature / Usage

Enable the IAM and Service Account Credentials APIs (`iamcredentials.googleapis.com`). For Credential Access Boundaries also enable `sts.googleapis.com`.

### Grant the caller permission (direct request)

`CALLER_SA` (the app) needs Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`) on `PRIV_SA` (the privilege-bearing account the token is for). For ID tokens use Service Account OpenID Connect Identity Token Creator (`roles/iam.serviceAccountOpenIdTokenCreator`).

```bash
gcloud iam service-accounts add-iam-policy-binding PRIV_SA \
    --member=serviceAccount:CALLER_SA --role=roles/iam.serviceAccountTokenCreator --format=json
```

### Access token

```bash
gcloud auth print-access-token --impersonate-service-account=PRIV_SA
```

```
POST https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/PRIV_SA:generateAccessToken
```

```
{
  "scope": [
    "https://www.googleapis.com/auth/cloud-platform"
  ],
  "lifetime": "LIFETIME"
}
```

Python client library:

```python
def accesstoken_from_impersonated_credentials(
    impersonated_service_account: str, scope: str
):
    from google.auth import impersonated_credentials
    import google.auth.transport.requests

    # Construct the GoogleCredentials object which obtains the default configuration from your
    # working environment.
    credentials, project_id = google.auth.default()

    # Create the impersonated credential.
    target_credentials = impersonated_credentials.Credentials(
        source_credentials=credentials,
        target_principal=impersonated_service_account,
        delegates=[],
        target_scopes=[scope],
        lifetime=300,
    )

    # Get the OAuth2 token.
    request = google.auth.transport.requests.Request()
    target_credentials.refresh(request)
    print("Generated OAuth2 token.")
```

### OIDC ID token (valid 1 hour)

```
POST https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/PRIV_SA:generateIdToken
```

```
{
  "audience": "AUDIENCE_NAME",
  "includeEmail": "true"
}
```

### Self-signed JWT and blob

```
POST https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/PRIV_SA:signJwt
```

```
{
  "payload": "JWT_PAYLOAD"
}
```

`JWT_PAYLOAD` is a JSON object serialized as a string, so its quotes are escaped. Adapted (not in the official docs): shown embedded in the full `signJwt` request body so the JSON is valid.

```json
{
  "payload": "{ \"iss\": \"PRIV_SA\", \"sub\": \"PRIV_SA\", \"aud\": \"https://firestore.googleapis.com/\", \"iat\": 1529350000, \"exp\": EXP }"
}
```

Replace `EXP` with the numeric expiry (Unix time) before sending.

```
POST https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/PRIV_SA:signBlob
```

```
{
  "payload": "BLOB_PAYLOAD"
}
```

signJwt response includes `keyId` and `signedJwt`; signBlob response includes `keyId` and `signedBlob`.

### Delegated request flow

Example chain `SA_1` (caller) -> `SA_2` (delegated) -> `SA_3` (delegated) -> `SA_4` (the target). List intermediaries in order in `delegates`, excluding the caller and the target (`SA_4` is the service account named in the request URL):

```json
{
  "delegates": [
    "projects/-/serviceAccounts/SA_2@PROJECT_ID.iam.gserviceaccount.com",
    "projects/-/serviceAccounts/SA_3@PROJECT_ID.iam.gserviceaccount.com"
  ]
}
```

```
POST https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/SA_NAME@PROJECT_ID.iam.gserviceaccount.com:generateAccessToken
```

```
{
  "delegates": [
    DELEGATES
  ],
  "scope": [
    "https://www.googleapis.com/auth/cloud-platform"
  ],
  "lifetime": "LIFETIME"
}
```

### Credential Access Boundary (downscoping, Cloud Storage only)

Adapted (not in the official docs): added the missing comma after `availableResource` and closed the braces so the JSON is valid.

```
{
  "accessBoundary": {
    "accessBoundaryRules": [
      {
        "availablePermissions": [
          "inRole:ROLE_ID"
        ],
        "availableResource": "//storage.googleapis.com/projects/_/buckets/BUCKET_NAME",
        "availabilityCondition": {
          "expression" : "CONDITION"
        }
      }
    ]
  }
}
```

Condition example:

```text
resource.name.startsWith('projects/_/buckets/example-bucket/objects/customer-a')
```

Manual exchange with the Security Token Service:

```
POST https://sts.googleapis.com/v1/token
```

Adapted (not in the official docs): the response is captured in a variable so the access token is not printed to the terminal or logs; the response shape is shown below.

```bash
STS_RESPONSE="$(curl -s -H "Content-Type:application/x-www-form-urlencoded" \
    -X POST \
    https://sts.googleapis.com/v1/token \
    -d "grant_type=urn:ietf:params:oauth:grant-type:token-exchange&subject_token_type=urn:ietf:params:oauth:token-type:access_token&requested_token_type=urn:ietf:params:oauth:token-type:access_token&subject_token=original-token" \
    --data-urlencode "options=$(cat ./access-boundary.json)")"
DOWNSCOPED_TOKEN="$(printf '%s' "${STS_RESPONSE}" | jq -r '.access_token')"
```

```
{
  "access_token": "ya29.dr.AbCDeFg-123456...",
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

## Options / Props

### STS token exchange request fields

| Name | Type | Description |
|------|------|-------------|
| `grant_type` | string | `urn:ietf:params:oauth:grant-type:token-exchange` |
| `options` | string | JSON Credential Access Boundary, percent-encoded |
| `requested_token_type` | string | `urn:ietf:params:oauth:token-type:access_token` |
| `subject_token` | string | OAuth 2.0 access token to exchange |
| `subject_token_type` | string | `urn:ietf:params:oauth:token-type:access_token` |

Response: `access_token`, `expires_in` (only if the original token represents a service account; otherwise same expiry as the original), `issued_token_type`, `token_type` (`Bearer`).

### Credential types

| Type | Notes |
|------|-------|
| OAuth 2.0 access token | No refresh token; repeat creation on expiry. Default max lifetime 1 hour (3,600 s). |
| OIDC ID token | Accepted by a limited number of services (for example Cloud Run); valid 1 hour. |
| Self-signed JWT | Used for some Google APIs and APIs deployed with API Gateway. `exp` at most 12 hours ahead; at most 1 hour for Google APIs. |
| Self-signed blob | Securely transmit arbitrary binary data. |

## Notes

- Extend access token lifetime to 12 hours (43,200 s) by adding the service account to an organization policy with the `constraints/iam.allowServiceAccountCredentialLifetimeExtension` list constraint. The gcloud CLI cannot set a lifetime.
- In most cases the caller and privilege-bearing service accounts cannot be the same (see self-impersonation).
- Delegation intermediaries only pass the request; they confer no additional access on the caller or target. The resulting credential represents only the final service account.
- A Credential Access Boundary can only subtract permissions; the principal must still hold roles with the needed permissions (for example `roles/storage.objectCreator` for `storage.objects.create`). Only permissions present in both the grant and the boundary are usable. Downscoping is supported only by Cloud Storage.
- Client-side exchange is recommended (lower latency, scales to many unique tokens); use server-side exchange only if the client library lacks client-side support. A token broker defines the boundary and exchanges; a token consumer requests and refreshes.
- The `accessBoundary` sample on the source page is missing a comma after `availableResource`; the version above adds it so the JSON is valid.
- Access tokens are bearer tokens; downscope before passing to other components.
- In the official Python sample, the lifetime is set to 300 seconds; samples are for local development where the caller is a user account.
- Adapted from the official docs: the manual STS exchange `curl` captures the response in a variable instead of printing the access token.
- Source: https://docs.cloud.google.com/iam/docs/create-short-lived-credentials-direct (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/create-short-lived-credentials-delegated (retrieved 2026-11-14; CC BY 4.0)
- Source: https://docs.cloud.google.com/iam/docs/create-downscoped-short-lived-credentials (retrieved 2026-11-14; CC BY 4.0)

## Related

- [service-account-best-practices.md](../service-accounts/service-account-best-practices.md)
- [authentication-methods-and-sts-audit.md](./authentication-methods-and-sts-audit.md)
- Other skill: gcp-client-libraries (ADC code)
