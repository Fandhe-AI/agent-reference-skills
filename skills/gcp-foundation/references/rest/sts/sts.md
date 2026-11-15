---
source: https://sts.googleapis.com/$discovery/rest?version=v1
---

# Security Token Service API REST API (sts)

## Signature / Usage

Base URL: `https://sts.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `sts.organizations.locations.workloadIdentityPools.openid.getJwks`

- Versions: v1
- `GET https://sts.googleapis.com/v1/{+name}/openid/jwks`
- Fetches the signing keys for an agentic or managed workload identity pool and returns them in JWK Set format, defined in RFC 7517 (https://tools.ietf.org/html/rfc7517). For now, only agentic system pools are supported. \*\*Preview\*\* This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms (https://cloud.google.com/terms/service-terms#1). Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions (https://cloud.google.com/products#product-launch-stages).
- Request: —; Response: `GoogleIdentityStsV1Jwks`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the pool whose JWKs need to be retrieved. Format: 'organizations/{ORGANIZATION_NUMBER}/locations/global/workloadIdentityPools/{POOL_ID}' 'projects/{PROJECT_NUMBER}/locations/global/workloadIdentityPools/{POOL_ID}' Example(s): 'organizations/1234/locations/global/workloadIdentityPools/agents.global.org-1234.system.id.goog' 'projects/12345678/locations/global/workloadIdentityPools/agents.global.proj-12345678.system.id.goog' |

### `sts.organizations.locations.workloadIdentityPools.well-known.getOpenid-configuration`

- Versions: v1
- `GET https://sts.googleapis.com/v1/{+name}/.well-known/openid-configuration`
- Gets the OIDC provider configuration for an agentic or managed workload identity pool following the OIDC 1.0 discovery specification (https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationResponse). For now, only agentic system pools are supported. \*\*Preview\*\* This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms (https://cloud.google.com/terms/service-terms#1). Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions (https://cloud.google.com/products#product-launch-stages).
- Request: —; Response: `GoogleIdentityStsV1OpenIdProviderConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the pool whose OpenID provider configuration to retrieve. Format: 'organizations/{ORGANIZATION_NUMBER}/locations/global/workloadIdentityPools/{POOL_ID}' 'projects/{PROJECT_NUMBER}/locations/global/workloadIdentityPools/{POOL_ID}' Example: 'organizations/1234/locations/global/workloadIdentityPools/agents.global.org-1234.system.id.goog' 'projects/12345678/locations/global/workloadIdentityPools/agents.global.proj-12345678.system.id.goog' |

### `sts.projects.locations.workloadIdentityPools.openid.getJwks`

- Versions: v1
- `GET https://sts.googleapis.com/v1/{+name}/openid/jwks`
- Fetches the signing keys for an agentic or managed workload identity pool and returns them in JWK Set format, defined in RFC 7517 (https://tools.ietf.org/html/rfc7517). For now, only agentic system pools are supported. \*\*Preview\*\* This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms (https://cloud.google.com/terms/service-terms#1). Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions (https://cloud.google.com/products#product-launch-stages).
- Request: —; Response: `GoogleIdentityStsV1Jwks`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the pool whose JWKs need to be retrieved. Format: 'organizations/{ORGANIZATION_NUMBER}/locations/global/workloadIdentityPools/{POOL_ID}' 'projects/{PROJECT_NUMBER}/locations/global/workloadIdentityPools/{POOL_ID}' Example(s): 'organizations/1234/locations/global/workloadIdentityPools/agents.global.org-1234.system.id.goog' 'projects/12345678/locations/global/workloadIdentityPools/agents.global.proj-12345678.system.id.goog' |

### `sts.projects.locations.workloadIdentityPools.well-known.getOpenid-configuration`

- Versions: v1
- `GET https://sts.googleapis.com/v1/{+name}/.well-known/openid-configuration`
- Gets the OIDC provider configuration for an agentic or managed workload identity pool following the OIDC 1.0 discovery specification (https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationResponse). For now, only agentic system pools are supported. \*\*Preview\*\* This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms (https://cloud.google.com/terms/service-terms#1). Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions (https://cloud.google.com/products#product-launch-stages).
- Request: —; Response: `GoogleIdentityStsV1OpenIdProviderConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the pool whose OpenID provider configuration to retrieve. Format: 'organizations/{ORGANIZATION_NUMBER}/locations/global/workloadIdentityPools/{POOL_ID}' 'projects/{PROJECT_NUMBER}/locations/global/workloadIdentityPools/{POOL_ID}' Example: 'organizations/1234/locations/global/workloadIdentityPools/agents.global.org-1234.system.id.goog' 'projects/12345678/locations/global/workloadIdentityPools/agents.global.proj-12345678.system.id.goog' |

### `sts.token`

- Versions: v1, v1beta
- `POST https://sts.googleapis.com/v1/token`
- Exchanges a credential for a Google OAuth 2.0 access token. The token asserts an external identity within an identity pool, or it applies a Credential Access Boundary to a Google access token. Note that workforce pools do not support Credential Access Boundaries. When you call this method, do not send the `Authorization` HTTP header in the request. This method does not require the `Authorization` header, and using the header can cause the request to fail.
- Request: `GoogleIdentityStsV1ExchangeTokenRequest`; Response: `GoogleIdentityStsV1ExchangeTokenResponse`

### Example request skeleton

Generated from the Discovery entry of `sts.organizations.locations.workloadIdentityPools.openid.getJwks` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://sts.googleapis.com/v1/{+name}/openid/jwks"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `sts` (retrieved 2026-11-14). Resources on this page: organizations, projects, v1.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are always `yes`.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/sts/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://sts.googleapis.com/$discovery/rest?version=v1, https://sts.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
