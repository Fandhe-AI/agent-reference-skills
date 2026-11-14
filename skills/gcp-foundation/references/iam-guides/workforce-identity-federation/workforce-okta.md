---
source: https://docs.cloud.google.com/iam/docs/workforce-sign-in-okta
---

# Workforce Identity Federation with Okta

Configure Workforce Identity Federation with Okta (OIDC via custom app or App Catalog, or SAML), grant access, and sign in via console (federated) or the gcloud CLI.

## Signature / Usage

### 1. Workforce identity pool

```bash
gcloud iam workforce-pools create WORKFORCE_POOL_ID \
    --organization=ORGANIZATION_ID \
    --display-name="DISPLAY_NAME" \
    --description="DESCRIPTION" \
    --session-duration=SESSION_DURATION \
    --location=global
```

### 2. Okta app integration

OIDC (custom): Okta Admin Console > **Applications** > **Create App Integration** > **OIDC - OpenID Connect**; select **Implicit (hybrid)** grant, check **Skip group assignment for now**. Sign-in redirect URI:

```
https://auth.cloud.google/signin-callback/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID
```

OIDC / SAML via App Catalog: **Browse App Catalog** > search **Google Cloud Workforce Identity Federation** > **Add Integration**; enter the Workforce Pool and Provider names (the Provider must match the provider ID you create later). By default an App Catalog app sends up to 100 groups.

SAML: for IdP-initiated sign-in set **Default Relay State**:

```
https://console.cloud.google/
```

Optional `department` attribute (name `department`, format **Unspecified**, value `user.department`) and group attribute statement (name `groups`, filter **Matches regex** `.*`).

Groups claim, org authorization server: **Sign On** > **OpenID Connect ID Token** > **Groups claim type** > **Expression** or **Matches regex** `.*`, then pass `groups` in `--web-sso-additional-scopes`. Custom authorization server: add claim `groups`, include in **ID Token** (**Always**), value type **Groups**, filter **Matches regex** `.*`.

### 3a. OIDC provider, code flow

Client ID from Okta **General** tab; client secret from **Client authentication** > **Client secret**.

```
gcloud iam workforce-pools providers create-oidc WORKFORCE_PROVIDER_ID \
    --workforce-pool=WORKFORCE_POOL_ID \
    --display-name="DISPLAY_NAME" \
    --description="DESCRIPTION" \
    --issuer-uri="ISSUER_URI" \
    --client-id="OIDC_CLIENT_ID" \
    --client-secret-value="OIDC_CLIENT_SECRET" \
    --vendor-type="okta" \
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

```
gcloud iam workforce-pools providers create-oidc WORKFORCE_PROVIDER_ID \
    --workforce-pool=WORKFORCE_POOL_ID \
    --display-name="DISPLAY_NAME" \
    --description="DESCRIPTION" \
    --issuer-uri="ISSUER_URI" \
    --client-id="OIDC_CLIENT_ID" \
    --vendor-type="okta" \
    --web-sso-response-type="id-token" \
    --web-sso-assertion-claims-behavior="only-id-token-claims" \
    --web-sso-additional-scopes="WEB_SSO_ADDITIONAL_SCOPES" \
    --attribute-mapping="ATTRIBUTE_MAPPING" \
    --attribute-condition="ATTRIBUTE_CONDITION" \
    --jwk-json-path="JWK_JSON_PATH" \
    --detailed-audit-logging \
    --location=global
```

Example OIDC attribute mapping and condition:

Adapted (not in the official docs): entries are comma-separated, and `google.subject` / the condition use the standard OIDC `sub` claim instead of `oid` / `subject`, which Okta does not issue unless you add them as custom claims.

```
google.subject=assertion.sub,
google.groups=assertion.groups,
attribute.costcenter=assertion.costcenter
```

```
assertion.sub.endsWith('@example.com')
```

### 3c. SAML provider

SP Entity ID (audience):

```html
https://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID
```

ACS URL: the `https://auth.cloud.google/signin-callback/...` URL above for browser sign-in, or `localhost` for programmatic sign-in. Get metadata from Okta **Sign On** > **SAML Signing Certificates** > **Actions** > **View IdP metadata**, save as XML:

```bash
gcloud iam workforce-pools providers create-saml WORKFORCE_PROVIDER_ID \
    --workforce-pool="WORKFORCE_POOL_ID" \
    --attribute-mapping="ATTRIBUTE_MAPPING" \
    --attribute-condition="ATTRIBUTE_CONDITION" \
    --vendor-type="okta" \
    --idp-metadata-path="XML_METADATA_PATH" \
    --detailed-audit-logging \
    --location="global"
```

```
google.subject=assertion.subject,
google.groups=assertion.attributes['groups'],
attribute.department=assertion.attributes['department'][0]
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

Okta: **Applications** > app > **General** > **SAML Settings** > **Edit** > **Show advanced settings**; set Response (preferred) or Assertion Signature to `Signed`, **Assertion Encryption** to Encrypted, upload the certificate.

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
    --member="principal://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/subject/SUBJECT_VALUE"
```

Attribute: `--member="principalSet://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/attribute.department/DEPARTMENT_VALUE"`. Group: `--member="principalSet://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/group/GROUP_ID"`.

### 6. Sign in (headless)

OIDC (save the Okta OIDC token to a file):

```bash
gcloud iam workforce-pools create-cred-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --subject-token-type="urn:ietf:params:oauth:token-type:id_token" \
    --credential-source-file="PATH_TO_OIDC_ID_TOKEN" \
    --workforce-pool-user-project="WORKFORCE_POOL_USER_PROJECT" \
    --output-file="config.json"
```

SAML:

```bash
gcloud iam workforce-pools create-cred-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --subject-token-type="urn:ietf:params:oauth:token-type:saml2" \
    --credential-source-file="SAML_ASSERTION_PATH"  \
    --workforce-pool-user-project="PROJECT_ID"  \
    --output-file="config.json"
```

```bash
gcloud auth login --cred-file="config.json"
```

```bash
gcloud auth list
```

Console (federated): `https://auth.cloud.google/signin?continueUrl=https://console.cloud.google/` with provider name `locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID`. gcloud browser-based sign-in (`create-login-config`, `CLOUDSDK_AUTH_LOGIN_CONFIG_FILE`, `gcloud auth login --login-config`) is identical to the Entra ID page.

## Options / Props

| Name | Description |
|------|-------------|
| `--vendor-type="okta"` | Vendor type for Okta providers (OIDC and SAML). |
| `--web-sso-response-type` | `code` or `id-token`. |
| `--web-sso-assertion-claims-behavior` | `merge-user-info-over-id-token-claims` (code flow only) or `only-id-token-claims` (required for implicit). |
| `--web-sso-additional-scopes` | Extra scopes, e.g. `groups` to request the groups claim from Okta's org authorization server. |
| `WORKFORCE_PROVIDER_ID` | Must match the provider ID entered in Okta; prefix `gcp-` reserved. |
| `SESSION_DURATION` | 900s to 43200s, default 3600s. |
| `KEY_SPECIFICATION` | `rsa-2048`, `rsa-3072`, `rsa-4096`. |
| `WORKFORCE_POOL_USER_PROJECT` | Project for quota/billing; principal needs `serviceusage.services.use`. |

## Notes

- Corrected from the official docs: the OIDC mapping example lacked a comma after `google.subject=...`, and referenced non-standard claims (`oid`, `subject`); the example now uses `assertion.sub`. Whether Okta `sub` carries an email-style value depends on your configuration (not confirmed in the official docs); adjust the condition to a claim you actually issue.

- Required role: `roles/iam.workforcePoolAdmin` on the organization. No-cost feature; detailed audit logging incurs Cloud Logging charges.
- The IdP must provide signed authentication info (OIDC JWT or signed SAML response).
- Grant the Browser role (`roles/browser`) to all federated users who use the console (federated); not needed for gcloud-only access.
- Multi-tenant IdP with a single issuer URI: always set an attribute condition to restrict the tenant.
- Local OIDC JWKs (`--jwk-json-path`) work only in programmatic flow, not console (federated).
- `roles/storage.admin` and `roles/owner` are used for demonstration; avoid basic roles in production.
- A source-side Okta SAML encryption algorithm list contains malformed links; the supported algorithms are the same as listed on the Entra ID page.
- Source: https://docs.cloud.google.com/iam/docs/workforce-sign-in-okta (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [Workforce Identity Federation with Microsoft Entra ID](./workforce-entra-id.md)
- [Workforce Identity Federation overview](./workforce-identity-federation-overview.md)
