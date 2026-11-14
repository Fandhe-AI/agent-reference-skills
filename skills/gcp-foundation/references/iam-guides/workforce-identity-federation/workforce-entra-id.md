---
source: https://docs.cloud.google.com/iam/docs/workforce-sign-in-microsoft-entra-id
---

# Workforce Identity Federation with Microsoft Entra ID

Configure Workforce Identity Federation with Microsoft Entra ID (OIDC code / implicit flow or SAML 2.0), grant access, and sign in via console (federated) or the gcloud CLI.

## Signature / Usage

### 1. Entra ID application

OIDC: Entra admin center > **Entra ID** > **App registrations** > **New registration**, platform **Web**, redirect URI:

```
https://auth.cloud.google/signin-callback/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID
```

Recommended: **Token configuration** > **Add groups claim**.

SAML: **Enterprise applications** > **New application** > **Create your own application** > **Single sign-on** > **SAML**. Identifier (Entity ID):

```html
https://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID
```

Reply URL (ACS) is the same `https://auth.cloud.google/signin-callback/...` URL above. For IdP-initiated sign-on set **Relay State**:

```html
https://console.cloud.google/
```

### 2. Workforce identity pool

```bash
gcloud iam workforce-pools create WORKFORCE_POOL_ID \
    --organization=ORGANIZATION_ID \
    --display-name="DISPLAY_NAME" \
    --description="DESCRIPTION" \
    --session-duration=SESSION_DURATION \
    --location=global
```

### 3a. OIDC provider, code flow

Issuer URI = the Entra "OpenID Connect metadata document" URI without the trailing `/.well-known/openid-configuration` (for example `https://login.microsoftonline.com/d41ad248-019e-49e5-b3de-4bdfe1fapple/v2.0/`). Client ID = **Application (client) ID**. Create a client secret under **Certificates & secrets**.

```
gcloud iam workforce-pools providers create-oidc WORKFORCE_PROVIDER_ID \
    --workforce-pool=WORKFORCE_POOL_ID \
    --display-name="DISPLAY_NAME" \
    --description="DESCRIPTION" \
    --issuer-uri="ISSUER_URI" \
    --client-id="OIDC_CLIENT_ID" \
    --client-secret-value="OIDC_CLIENT_SECRET" \
    --vendor-type="entra-id" \
    --web-sso-response-type="code" \
    --web-sso-assertion-claims-behavior="merge-user-info-over-id-token-claims" \
    --web-sso-additional-scopes="WEB_SSO_ADDITIONAL_SCOPES" \
    --attribute-mapping="ATTRIBUTE_MAPPING" \
    --attribute-condition="ATTRIBUTE_CONDITION" \
    --jwk-json-path="JWK_JSON_PATH" \
    --detailed-audit-logging \
    --location=global
```

### 3b. OIDC provider, implicit flow

Enable the **ID token** checkbox under **Authentication** in the Entra app registration first.

```
gcloud iam workforce-pools providers create-oidc WORKFORCE_PROVIDER_ID \
    --workforce-pool=WORKFORCE_POOL_ID \
    --display-name="DISPLAY_NAME" \
    --description="DESCRIPTION" \
    --issuer-uri="ISSUER_URI" \
    --client-id="OIDC_CLIENT_ID" \
    --vendor-type="entra-id" \
    --web-sso-response-type="id-token" \
    --web-sso-assertion-claims-behavior="only-id-token-claims" \
    --web-sso-additional-scopes="WEB_SSO_ADDITIONAL_SCOPES" \
    --attribute-mapping="ATTRIBUTE_MAPPING" \
    --attribute-condition="ATTRIBUTE_CONDITION" \
    --jwk-json-path="JWK_JSON_PATH" \
    --detailed-audit-logging \
    --location=global
```

Recommended OIDC attribute mapping for Entra ID:

```
google.subject=assertion.oid,
google.groups=assertion.groups,
google.display_name=assertion.preferred_username
```

### 3c. SAML provider

Download **Federation Metadata XML** from the Entra app (**Single sign-on** > **SAML Certificates**), then:

```bash
gcloud iam workforce-pools providers create-saml WORKFORCE_PROVIDER_ID \
    --workforce-pool="WORKFORCE_POOL_ID" \
    --display-name="DISPLAY_NAME" \
    --description="DESCRIPTION" \
    --idp-metadata-path="XML_METADATA_PATH" \
    --attribute-mapping="ATTRIBUTE_MAPPING" \
    --attribute-condition="ATTRIBUTE_CONDITION" \
    --vendor-type="entra-id" \
    --detailed-audit-logging \
    --location=global
```

Example SAML attribute mapping and condition:

```
google.subject=assertion.attributes['http://schemas.microsoft.com/identity/claims/objectidentifier'],
attribute.costcenter=assertion.attributes.costcenter[0]
```

```
assertion.attributes.ipaddr.startsWith('98.11.12.')
```

### 4. Optional: encrypted SAML assertions

```bash
gcloud iam workforce-pools providers keys create KEY_ID \
    --workforce-pool WORKFORCE_POOL_ID \
    --provider WORKFORCE_PROVIDER_ID \
    --location global \
    --use encryption \
    --spec KEY_SPECIFICATION
```

```bash
gcloud iam workforce-pools providers keys describe KEY_ID \
    --workforce-pool WORKFORCE_POOL_ID \
    --provider WORKFORCE_PROVIDER_ID \
    --location global \
    --format "value(keyData.key)" \
    > CERTIFICATE_PATH
```

```bash
gcloud iam workforce-pools providers keys delete KEY_ID \
    --workforce-pool WORKFORCE_POOL_ID \
    --provider WORKFORCE_PROVIDER_ID \
    --location global
```

### 5. Grant access

```bash
gcloud projects add-iam-policy-binding TEST_PROJECT_ID \
    --role="roles/storage.admin" \
    --member="principalSet://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/group/GROUP_ID"
```

Single identity: `--member="principal://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/subject/SUBJECT_VALUE"`. Attribute: `--member="principalSet://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/attribute.department/DEPARTMENT_VALUE"`.

### 6. Sign in

Console (federated): `https://auth.cloud.google/signin?continueUrl=https://console.cloud.google/`, provider name `locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID`.

gcloud browser-based sign-in:

```bash
gcloud iam workforce-pools create-login-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --output-file=LOGIN_CONFIG_PATH
```

```bash
gcloud auth login \
    --login-config=LOGIN_CONFIG_PATH
```

Alternatives: set `CLOUDSDK_AUTH_LOGIN_CONFIG_FILE`, or `gcloud config set auth/login_config_file LOGIN_CONFIG_PATH` (undo with `gcloud config unset auth/login_config_file`), or pass `--activate` when creating the file.

Login config file content:

```json
{
  "universe_domain": "googleapis.com",
  "universe_cloud_web_domain": "cloud.google",
  "type": "external_account_authorized_user_login_config",
  "audience": "//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID",
  "auth_url": "https://auth.cloud.google/authorize",
  "token_url": "https://sts.googleapis.com/v1/oauthtoken",
  "token_info_url": "https://sts.googleapis.com/v1/introspect"
}
```

gcloud headless sign-in (OIDC, after saving the `id_token` from the redirect URL to a file):

```bash
gcloud iam workforce-pools create-cred-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --subject-token-type=urn:ietf:params:oauth:token-type:id_token \
    --credential-source-file=PATH_TO_OIDC_ID_TOKEN \
    --workforce-pool-user-project=WORKFORCE_POOL_USER_PROJECT \
    --output-file=config.json
```

```json
{
  "type": "external_account",
  "audience": "//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID",
  "subject_token_type": "urn:ietf:params:oauth:token-type:id_token",
  "token_url": "https://sts.googleapis.com/v1/token",
  "workforce_pool_user_project": "WORKFORCE_POOL_USER_PROJECT",
  "credential_source": {
    "file": "PATH_TO_OIDC_CREDENTIALS"
  }
}
```

Adapted (not in the official docs): sign in with the generated configuration file `config.json`, not the file holding the IdP token.

```bash
gcloud auth login --cred-file=config.json
```

SAML headless: use `--subject-token-type=urn:ietf:params:oauth:token-type:saml2` with `--credential-source-file=SAML_ASSERTION_PATH`, then `gcloud auth login --cred-file=config.json`.

```bash
gcloud iam workforce-pools create-cred-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --subject-token-type=urn:ietf:params:oauth:token-type:saml2 \
    --credential-source-file=SAML_ASSERTION_PATH  \
    --workforce-pool-user-project=PROJECT_ID  \
    --output-file=config.json
```

Test access:

```bash
gcloud storage ls --project="TEST_PROJECT_ID"
```

## Options / Props

| Name | Description |
|------|-------------|
| `WORKFORCE_POOL_ID` | Globally unique pool ID; prefix `gcp-` is reserved. |
| `WORKFORCE_PROVIDER_ID` | Provider ID within the pool; prefix `gcp-` is reserved. |
| `SESSION_DURATION` | Optional, e.g. `3600s`; between 900s and 43200s; default 3600s. |
| `--vendor-type="entra-id"` | Vendor type for Entra ID providers. |
| `--web-sso-response-type` | `code` (authorization code flow) or `id-token` (implicit flow). |
| `--web-sso-assertion-claims-behavior` | `merge-user-info-over-id-token-claims` (code flow only; UserInfo claims win) or `only-id-token-claims` (required for implicit flow). |
| `--web-sso-additional-scopes` | Optional extra scopes for browser-based sign-in. |
| `--jwk-json-path` | Optional local OIDC JWKs; usable only in programmatic flow, not console (federated). |
| `--attribute-condition` | CEL condition; use it to restrict tenants when a multi-tenant IdP shares one issuer URI. |
| `--detailed-audit-logging` | Logs IdP data to Cloud Logging for troubleshooting; omit to disable. |
| `KEY_SPECIFICATION` | `rsa-2048`, `rsa-3072`, or `rsa-4096`. |
| `WORKFORCE_POOL_USER_PROJECT` | Project for quota and billing; principal needs `serviceusage.services.use`. |

## Notes

- Required role: `roles/iam.workforcePoolAdmin` on the organization. Workforce Identity Federation is no-cost; detailed audit logging uses Cloud Logging pricing.
- This guide maps up to 150 Entra groups; for up to 400 groups see the scalable-groups guide (https://docs.cloud.google.com/iam/docs/workforce-sign-in-microsoft-entra-id-scalable-groups). Extra attributes (Microsoft Graph) can be enabled in the console to increase group count.
- The IdP must provide signed authentication information (OIDC JWT or signed SAML response). Enable ID tokens for implicit flow in Entra ID.
- Redirect/relay URLs for the verify step: add `https://auth.cloud.google/signin-callback/locations/global/workforcePools/POOL_ID/providers/PROVIDER_ID` to the IdP allowed redirect URIs, then use **Debug IdP token** in the console to validate mappings.
- The SAML-encryption section of the source contains a corrupted Microsoft documentation link (broken markup); it is not reproduced here. See the Microsoft Entra documentation for configuring SAML token encryption. Supported key transport algorithms: rsa-oaep-mgf1p, rsa-oaep (xmlenc11), rsa-1_5; block encryption: aes128/192/256-cbc and aes128/256-gcm. Plaintext assertions are still accepted even with encryption keys configured.
- Security: the login config file is not validated; make it read-only and restrict access, since a writer could redirect credentials. `gcloud auth login` stores credentials in the home directory; do not use it for automated workloads on remote systems. Granting `roles/storage.admin` is an example only; use least privilege in real projects.
- Deleting users in the IdP does not delete their Google Cloud resources; use workforce-delete-user-data and workforce-revoke-sessions.
- Source: https://docs.cloud.google.com/iam/docs/workforce-sign-in-microsoft-entra-id (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [Workforce Identity Federation overview](./workforce-identity-federation-overview.md)
- [Workforce credentials and troubleshooting](./workforce-credentials-and-troubleshooting.md)
