---
source: https://docs.cloud.google.com/iam/docs/manage-workforce-identity-pools-providers
---

# Managing Workforce Identity Pools and Providers

Connect external IdPs (OIDC or SAML) to Google Cloud for your workforce, and manage pools, providers, and locally uploaded OIDC JWKs.

## Signature / Usage

Create a workforce pool (organization-scoped, available across all projects and folders):

```bash
gcloud iam workforce-pools create WORKFORCE_POOL_ID \
    --organization=ORGANIZATION_ID \
    --display-name="DISPLAY_NAME" \
    --description="DESCRIPTION" \
    --session-duration=SESSION_DURATION \
    --location=global
```

View, list, update, delete, undelete:

```bash
gcloud iam workforce-pools describe WORKFORCE_POOL_ID \
    --location=global

gcloud iam workforce-pools list \
    --organization=ORGANIZATION_ID \
    --location=global

gcloud iam workforce-pools update WORKFORCE_POOL_ID \
    --description="DESCRIPTION" \
    --location=global

gcloud iam workforce-pools delete WORKFORCE_POOL_ID \
    --location=global

gcloud iam workforce-pools undelete WORKFORCE_POOL_ID \
    --location=global
```

OIDC provider, authorization code flow:

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

OIDC provider, implicit flow:

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

SAML provider:

```bash
gcloud iam workforce-pools providers create-saml WORKFORCE_PROVIDER_ID \
    --workforce-pool="WORKFORCE_POOL_ID" \
    --attribute-mapping="ATTRIBUTE_MAPPING" \
    --attribute-condition="ATTRIBUTE_CONDITION" \
    --idp-metadata-path="XML_METADATA_PATH" \
    --detailed-audit-logging \
    --location="global"
```

Provider describe / list / update / delete / undelete:

```bash
gcloud iam workforce-pools providers describe PROVIDER_ID \
    --workforce-pool=WORKFORCE_POOL_ID \
    --location=global

gcloud iam workforce-pools providers list \
    --workforce-pool=WORKFORCE_POOL_ID \
    --location=global

gcloud iam workforce-pools providers update-oidc PROVIDER_ID \
    --workforce-pool=WORKFORCE_POOL_ID \
    --description="DESCRIPTION" \
    --detailed-audit-logging \
    --location=global

gcloud iam workforce-pools providers delete PROVIDER_ID \
    --workforce-pool=WORKFORCE_POOL_ID \
    --location=global

gcloud iam workforce-pools providers undelete PROVIDER_ID \
    --workforce-pool=WORKFORCE_POOL_ID \
    --location=global
```

Example mappings:

```text
google.subject=assertion.oid
google.groups=assertion.groups,
attribute.costcenter=assertion.costcenter
```

```text
google.subject=assertion.subject,
google.groups=assertion.attributes['https://example.com/aliases'],
attribute.department=assertion.attributes.department[0]
```

Example conditions: `assertion.role == 'gcp-users'`, `assertion.subject.endsWith("@example.com")`.

## Options / Props

| Flag | Description |
|---|---|
| `--session-duration` | Pool default 3600s; allowed 900s (15 min) to 43200s (12 h); governs access tokens and console (federated)/gcloud sign-in sessions |
| `--issuer-uri` | HTTPS OIDC issuer |
| `--client-id` | Must match the `aud` claim |
| `--client-secret-value` | Code flow only |
| `--web-sso-response-type` | `code` or `id-token` |
| `--web-sso-assertion-claims-behavior` | Code flow: `merge-user-info-over-id-token-claims` (UserInfo wins on conflict) or `only-id-token-claims`; implicit flow must use `only-id-token-claims` |
| `--web-sso-additional-scopes` | Extra scopes for browser sign-in |
| `--attribute-mapping` / `--attribute-condition` | CEL-based mapping and filtering |
| `--jwk-json-path` | Local OIDC JWKs; otherwise `/.well-known/openid-configuration` is used |
| `--idp-metadata-path` | SAML IdP XML metadata |
| `--detailed-audit-logging` | Log IdP-received data to Logging for troubleshooting (omit or update to disable) |

## Notes

- Pool ID must be globally unique across workforce pools; `gcp-` prefix is reserved for pool and provider IDs.
- With a multi-tenant IdP that has a single issuer URI (such as GitHub), use attribute conditions to restrict the tenant.
- Local OIDC JWKs are usable only in programmatic flow (direct STS `/token` exchange), not console (federated) sign-in.
- Managing OIDC JWKs: upload with `--jwk-json-path` on create; `update-oidc` with a path replaces all uploaded keys; pass an empty file plus `--issuer-uri` to delete all uploaded keys and revert to issuer URI fetching.
- Up to 400 groups can be mapped using extra attributes (Microsoft Entra ID scalable groups).
- A client secret value in a command is sensitive; avoid shell history exposure and logging.
- Install and update gcloud with `gcloud components update`; external IdP users must sign in to gcloud with their federated identity first.
- Source: https://docs.cloud.google.com/iam/docs/manage-workforce-identity-pools-providers
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [workload-identity-federation-pools.md](./workload-identity-federation-pools.md)
- [managed-workload-identity.md](./managed-workload-identity.md)
