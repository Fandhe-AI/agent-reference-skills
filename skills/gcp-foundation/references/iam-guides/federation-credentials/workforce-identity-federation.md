---
source: https://docs.cloud.google.com/iam/docs/configuring-workforce-identity-federation
---

# Configuring Workforce Identity Federation

Let your workforce sign in to Google Cloud with an external OIDC or SAML 2.0 identity provider by creating a workforce identity pool and provider, then grant roles to federated principals.

## Signature / Usage

Prerequisites: a Google Cloud organization, the gcloud CLI, IAM and Resource Manager APIs enabled, an IdP that provides signed authentication info (OIDC JWT or signed SAML responses), and Essential Contacts. Required role: Workforce Identity Pool Admin (`roles/iam.workforcePoolAdmin`) on the organization. The feature is no-cost; detailed audit logging uses Cloud Logging.

### Create a workforce identity pool

```bash
gcloud iam workforce-pools create WORKFORCE_POOL_ID \
    --organization=ORGANIZATION_ID \
    --display-name="DISPLAY_NAME" \
    --description="DESCRIPTION" \
    --session-duration=SESSION_DURATION \
    --location=global
```

### OIDC provider (authorization code flow)

Register an application in your IdP and add the redirect URL for console sign-in:

```text
https://auth.cloud.google/signin-callback/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID
```

```bash
gcloud iam workforce-pools providers create-oidc WORKFORCE_PROVIDER_ID \
    --workforce-pool=WORKFORCE_POOL_ID \
    --display-name="DISPLAY_NAME" \
    --description="DESCRIPTION" \
    --issuer-uri="ISSUER_URI" \
    --client-id="OIDC_CLIENT_ID" \
    --client-secret-value="OIDC_CLIENT_SECRET" \
    --web-sso-response-type="code" \
    --web-sso-assertion-claims-behavior="merge-user-info-over-id-token-claims" \
    --web-sso-additional-scopes="WEB_SSO_ADDITIONAL_SCOPES" \
    --attribute-mapping="ATTRIBUTE_MAPPING" \
    --attribute-condition="ATTRIBUTE_CONDITION" \
    --jwk-json-path="JWK_JSON_PATH" \
    --detailed-audit-logging \
    --location=global
```

### OIDC provider (implicit flow)

```bash
gcloud iam workforce-pools providers create-oidc WORKFORCE_PROVIDER_ID \
    --workforce-pool=WORKFORCE_POOL_ID \
    --display-name="DISPLAY_NAME" \
    --description="DESCRIPTION" \
    --issuer-uri="ISSUER_URI" \
    --client-id="OIDC_CLIENT_ID" \
    --web-sso-response-type="id-token" \
    --web-sso-assertion-claims-behavior="only-id-token-claims" \
    --web-sso-additional-scopes="WEB_SSO_ADDITIONAL_SCOPES" \
    --attribute-mapping="ATTRIBUTE_MAPPING" \
    --attribute-condition="ATTRIBUTE_CONDITION" \
    --jwk-json-path="JWK_JSON_PATH" \
    --detailed-audit-logging \
    --location=global
```

Attribute mapping and condition examples:

```text
google.subject=assertion.oid
google.groups=assertion.groups,
attribute.costcenter=assertion.costcenter

assertion.role == 'gcp-users'
```

### SAML provider

Set the SAML audience (SP Entity ID) to:

```html
https://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID
```

Set the ACS (redirect) URL to the same `https://auth.cloud.google/signin-callback/...` URL as above for browser sign-in, or `localhost` for programmatic sign-in.

```bash
  gcloud iam workforce-pools providers create-saml WORKFORCE_PROVIDER_ID \
      --workforce-pool=WORKFORCE_POOL_ID \
      --display-name="DISPLAY_NAME" \
      --description="DESCRIPTION" \
      --idp-metadata-path=METADATA_FILE_PATH \
      --attribute-mapping="ATTRIBUTE_MAPPING" \
      --attribute-condition="ATTRIBUTE_CONDITION" \
      --location=global
```

```text
google.subject=assertion.subject
attribute.costcenter=assertion.attributes.costcenter[0]

assertion.attributes.ipaddr.startsWith('98.11.12.')
```

### Encrypted SAML assertions (keys)

```text
gcloud iam workforce-pools providers keys create KEY_ID ...
gcloud iam workforce-pools providers keys describe KEY_ID ...
gcloud iam workforce-pools providers keys delete KEY_ID ...
gcloud iam workforce-pools providers update-saml WORKFORCE_PROVIDER_ID ... --idp-metadata-path=SAML_METADATA_FILE_PATH
```

### Grant roles

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --role="ROLE" \
    --member="PRINCIPAL"
```

```bash
gcloud projects add-iam-policy-binding my-project \
    --role="roles/storage.admin" \
    --member="principalSet://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/group/GROUP_ID"
```

## Options / Props

### Workforce principal identifiers

| Identities | Identifier format |
|---|---|
| Single identity in a workforce identity pool | `principal://iam.googleapis.com/locations/global/workforcePools/POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE` |
| All workforce identities in a group | `principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/group/GROUP_ID` |
| All workforce identities with a specific attribute value | `principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE` |
| All identities in a workforce identity pool | `principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/*` |

### Provider flags

| Name | Type | Description |
|------|------|-------------|
| `--issuer-uri` | string | OIDC issuer; must use HTTPS. |
| `--client-id` | string | Must match the `aud` claim of the IdP JWT. |
| `--web-sso-response-type` | `code` or `id-token` | Authorization code flow or implicit flow. |
| `--web-sso-assertion-claims-behavior` | `merge-user-info-over-id-token-claims` or `only-id-token-claims` | Which claims populate `assertion`; implicit flow supports only `only-id-token-claims`. |
| `--session-duration` (pool) | duration | 900s to 43200s; default 3600s; applies to access tokens, console (federated) sessions, gcloud sign-in sessions. |
| `--jwk-json-path` | path | Locally uploaded OIDC JWKs; usable only in programmatic flow (STS `/token` exchange), not console sign-in. |
| `--detailed-audit-logging` | flag | Logs IdP-supplied information to Cloud Logging; omit to disable. |

OIDC keywords: `assertion.NAME` (claim in the ID token payload). SAML keywords: `assertion.subject` (NameID) and `assertion.attributes.NAME` (list of values).

## Notes

- Workforce identity pools are organization-level and available across all projects and folders.
- The prefix `gcp-` is reserved and cannot be used in pool or provider IDs. Providers can take a few minutes to accept requests.
- For multi-tenant IdPs with a single issuer URI, use attribute conditions to restrict access to the correct tenant.
- Verify setup in the console: Workforce Identity Pools, provider details, **Debug IdP token** (attribute viewer; a `false` condition blocks sign-in; **Save and refetch token**).
- SAML provider metadata must include the IdP entity ID, the SSO URL, and at least one signing public key.
- Deleting a user in your IdP does not delete the user's metadata and resources in Google Cloud; delete them explicitly and optionally revoke active sessions. Deletion is a long-running operation.
- The official gcloud sample for encrypted SAML key commands is abbreviated above to the command shapes; see the source page for all flags.
- The pool-level `--client-secret-value` places a secret on the command line; prefer a secure input method in shared shells.
- Source: https://docs.cloud.google.com/iam/docs/configuring-workforce-identity-federation (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [workload-identity-federation-best-practices.md](./workload-identity-federation-best-practices.md)
- [managed-workload-identities.md](./managed-workload-identities.md)
- Other skill: gcp-cli (gcloud general)
