---
source: https://docs.cloud.google.com/iam/docs/troubleshooting-workload-identity-federation
---

# Troubleshooting Workload Identity Federation

Common Security Token Service and provider-configuration errors with causes and fixes.

## Signature / Usage

Federated access token rejected by an API (exchange it for an unrestricted token with `GenerateAccessToken`):

```json
{
  "error": {
    "code": 401,
    "message": "Request had invalid authentication credentials. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.",
    "status": "UNAUTHENTICATED"
  }
}
```

Identity provider not allowlisted:

```text
FAILED_PRECONDITION: Precondition check failed.
- '@type': type.googleapis.com/google.rpc.PreconditionFailure
  violations:
  - description: "Org Policy violated for value: '{PROVIDER}'."
    subject: orgpolicy:projects/{PROJECT}/locations/global/workloadIdentityPools/{POOL}
    type: constraints/iam.workloadIdentityPoolProviders
```

JWK without `x5c` / `x5t` (fix for `Input JWK is not in a valid json format`):

```json
{
  "kty": "RSA",
  "use": "sig",
  "kid": "example-key-id",
  "alg": "RS256",
  "n": "base64url-modulus",
  "e": "AQAB"
}
```

Issuer not reachable:

```json
{
  "error": "invalid_grant",
  "error_description":"Error connecting to the given credential's issuer."
}
```

AWS `GetCallerIdentity` headers wrong:

```json
{
  "error": "invalid_grant",
  "error_description": "The given AWS request doesn't contain all the required headers."
}
```

`google.subject` too long:

```json
{
  "error": "invalid_request",
  "error_description":"The size of mapped attribute google.subject exceeds the 127 bytes limit. Either modify your attribute mapping or the incoming assertion to produce a mapped attribute that is less than 127 bytes."
}
```

```text
google.subject=assertion.sub.extract('/users/{sub_claim}')
```

Rate limited:

```json
{
  "error": "quota_exceeded",
  "error_description":"The request was throttled due to rate limit: sts.googleapis.com/requests. Please retry after a few seconds."
}
```

## Options / Props

| Symptom | Cause | Fix |
|---|---|---|
| 401 UNAUTHENTICATED with a federated access token | The API method does not support federated access tokens | Exchange the token via `GenerateAccessToken` (service account impersonation) |
| `FAILED_PRECONDITION` org policy `constraints/iam.workloadIdentityPoolProviders` | IdP is not allowlisted | Allowlist it (restrict identity provider configuration) |
| `Input JWK is not in a valid json format` | `x5c` / `x5t` fields present; self-signed-certificate endpoints unsupported | Remove `x5c` and `x5t`, validate against the OIDC JWKS spec, reconfigure the provider |
| `Error connecting to the given credential's issuer` | OIDC metadata or JWKS not publicly reachable, or wrong `iss` | Make the OIDC endpoint public and spec-compliant; check the token `iss` |
| AWS missing required headers | `headers` field missing or including unsupported headers | Allow only `Authorization`, `host`, `x-amz-date`, `x-goog-cloud-target-resource`, and `x-amz-security-token` (temporary credentials only); empty body; no `x-amz-content-sha256` |
| `google.subject` exceeds 127 bytes | Mapped claim too long | Use `extract` |
| 429 `quota_exceeded` | `sts.googleapis.com/requests` rate quota exceeded | Check the IAM Quota page and request an increase |

## Notes

- Federated access tokens (returned by the Security Token Service) work with most but not all APIs; see "Identity federation: products and limitations" in the official docs.
- Source: https://docs.cloud.google.com/iam/docs/troubleshooting-workload-identity-federation
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [wif-oidc-saml-providers.md](./wif-oidc-saml-providers.md)
- [wif-other-clouds-and-kubernetes.md](./wif-other-clouds-and-kubernetes.md)
- [wif-deployment-pipelines.md](./wif-deployment-pipelines.md)
