---
source: https://docs.cloud.google.com/iam/docs/workforce-manage-oauth-app
---

# Workforce Identity Federation OAuth applications

Register OAuth clients and client credentials so federated workforce users can sign in to OAuth-based applications (Identity-Aware Proxy and Looker only), and manage the client secret securely.

## Signature / Usage

Create a client:

```bash
gcloud iam oauth-clients create APP_OAUTH_CLIENT_ID \
    --project=PROJECT_ID \
    --location=global \
    --client-type="CONFIDENTIAL_CLIENT" \
    --display-name="My OAuth application" \
    --description="An application registration for MyApp" \
    --allowed-scopes="https://www.googleapis.com/auth/cloud-platform" \
    --allowed-redirect-uris="REDIRECT_URI" \
    --allowed-grant-types="authorization_code_grant"
```

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: PROJECT_ID" \
  -d "{ \
        'allowedGrantTypes': ['AUTHORIZATION_CODE_GRANT'], \
        'allowedRedirectUris': ['REDIRECT_URI'], \
        'allowedScopes': ['https://www.googleapis.com/auth/cloud-platform'], \
        'clientType': 'CONFIDENTIAL_CLIENT', \
        'description': 'My OAuth client description', \
        'disabled': false, \
        'displayName': 'My OAuth client'}" \
  https://iam.googleapis.com/v1/projects/PROJECT_ID/locations/global/oauthClients\?oauthClientId\=APP_OAUTH_CLIENT_ID
```

List, describe, update, delete a client:

```bash
gcloud iam oauth-clients list \
    --project=PROJECT_ID \
    --location=global
```

```bash
gcloud iam oauth-clients describe APP_OAUTH_CLIENT_ID \
    --project PROJECT_ID \
    --location global
```

```bash
gcloud iam oauth-clients update APP_OAUTH_CLIENT_ID \
    --project=PROJECT_ID \
    --location=global \
    --allowed-redirect-uris="REDIRECT_URI"
```

```bash
gcloud iam oauth-clients delete APP_OAUTH_CLIENT_ID \
    --project PROJECT_ID \
    --location global
```

REST equivalents:

```bash
curl \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: PROJECT_ID" \
  https://iam.googleapis.com/v1/projects/PROJECT_ID/locations/global/oauthClients
```

```bash
curl -d'{"allowedRedirectUris":"REDIRECT_URI"}' \
  -H "Content-Type: application/json" -X PATCH \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "X-Goog-User-Project: PROJECT_ID" \
  https://iam.googleapis.com/v1/projects/PROJECT_ID/locations/global/oauthClients/APP_OAUTH_CLIENT_ID?update_mask=allowed_redirect_uris
```

```bash
curl -X DELETE \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: PROJECT_ID" \
  https://iam.googleapis.com/v1/projects/PROJECT_ID/locations/global/oauthClients/APP_OAUTH_CLIENT_ID
```

Client credentials (the secret is in `clientSecret` of the describe output):

```bash
gcloud iam oauth-clients credentials create APP_OAUTH_CLIENT_CREDENTIAL_ID \
    --oauth-client=APP_OAUTH_CLIENT_ID \
    --display-name='My OAuth client credential' \
    --location='global'
```

```bash
gcloud iam oauth-clients credentials list \
    --oauth-client=APP_OAUTH_CLIENT_ID \
    --project=PROJECT_ID \
    --location=global
```

```bash
gcloud iam oauth-clients credentials describe APP_OAUTH_CLIENT_CREDENTIAL_ID \
    --oauth-client=APP_OAUTH_CLIENT_ID \
    --location='global'
```

```bash
gcloud iam oauth-clients credentials update APP_OAUTH_CLIENT_CREDENTIAL_ID \
    --client-id=APP_OAUTH_CLIENT_ID \
    --display-name="My new credential name" \
    --location=global
```

Disable (required before deleting), then delete a credential:

```bash
gcloud iam oauth-clients credentials update APP_OAUTH_CLIENT_CREDENTIAL_ID \
    --oauth-client=APP_OAUTH_CLIENT_ID \
    --disabled \
    --project=PROJECT_ID \
    --location=global
```

```bash
gcloud iam oauth-clients credentials delete APP_OAUTH_CLIENT_CREDENTIAL_ID \
    --project=PROJECT_ID \
    --oauth-client=APP_OAUTH_CLIENT_ID \
    --location=global
```

REST credential calls:

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: PROJECT_ID" \
  -d "{'disabled': false, 'displayName': 'My OAuth client credential'}" \
  https://iam.googleapis.com/v1/projects/PROJECT_ID/locations/global/oauthClients/APP_OAUTH_CLIENT_ID/credentials\?oauthClientCredentialId=APP_OAUTH_CLIENT_CREDENTIAL_ID
```

```bash
curl -d'{"disabled":"true"}' \
  -H "Content-Type: application/json" -X PATCH \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "X-Goog-User-Project: PROJECT_ID" \
  https://iam.googleapis.com/v1/projects/PROJECT_ID/locations/global/oauthClients/APP_OAUTH_CLIENT_ID/credentials/APP_OAUTH_CLIENT_CREDENTIAL_ID?update_mask=disabled
```

```bash
curl -X DELETE \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: PROJECT_ID" \
  https://iam.googleapis.com/v1/projects/PROJECT_ID/locations/global/oauthClients/APP_OAUTH_CLIENT_ID/credentials/APP_OAUTH_CLIENT_CREDENTIAL_ID
```

## Options / Props

| Name | Description |
|------|-------------|
| `APP_OAUTH_CLIENT_ID` | ID that represents the OAuth client. |
| `APP_OAUTH_CLIENT_CREDENTIAL_ID` | ID that represents the client credential. |
| `PROJECT_ID` | Project in the organization where the workforce pool and provider were created. |
| `--client-type` | `CONFIDENTIAL_CLIENT` in the example. |
| `--allowed-grant-types` | `authorization_code_grant` in the example. |
| `--allowed-scopes` | For example `https://www.googleapis.com/auth/cloud-platform`. |
| `--allowed-redirect-uris` | Redirect URI, e.g. `https://myapp.com/signin-callback`. |
| `update_mask` | REST field mask, e.g. `allowed_redirect_uris`, `display_name`, `disabled`. |

## Notes

- OAuth application integration works only with Identity-Aware Proxy and Looker. The `projects.locations.oauthClients` API is only for Workforce Identity Federation; standard OAuth 2.0 client IDs for Google Cloud users or services are under **APIs & Services > Credentials**.
- Prerequisites: an organization, and a workforce identity pool and provider in the same organization (see the Entra ID and Okta pages). Required role: `roles/iam.oauthClientAdmin` on the project.
- For Looker, redirect users to `https://auth.cloud.google/authorize` to get an authorization code, then exchange codes or refresh tokens with the Cloud OAuth API using the client credentials.
- Security: a leaked client ID and secret allows impersonation, unauthorized access, and phishing. Restrict IAM access to the OAuth client API. To rotate the secret: create a new credential, disable the old one, delete the old one. Store the `clientSecret` securely.
- The source's REST list-credentials example uses `$PROJECT_ID` in the URL while other examples use `PROJECT_ID`; substitute your project ID consistently.
- Source: https://docs.cloud.google.com/iam/docs/workforce-manage-oauth-app and https://docs.cloud.google.com/iam/docs/workforce-oauth-app (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [Workforce Identity Federation with Microsoft Entra ID](./workforce-entra-id.md)
- [Workforce Identity Federation with Okta](./workforce-okta.md)
