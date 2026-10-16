# Workload Identity Federation

Lets trusted workloads exchange externally issued OIDC identity tokens for short-lived OpenAI access tokens, authenticating without storing long-lived API keys.

## Signature / Usage

Token exchange request (what every provider-specific SDK integration does under the hood):

```bash
curl https://auth.openai.com/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
    "subject_token_type": "urn:ietf:params:oauth:token-type:jwt",
    "subject_token": "'"$EXTERNAL_OIDC_JWT"'",
    "identity_provider_id": "'"$IDENTITY_PROVIDER_ID"'",
    "service_account_id": "'"$SERVICE_ACCOUNT_ID"'"
  }'
```

Response:

```json
{
  "access_token": "eyJ...",
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "api.model.read api.model.request"
}
```

## Options / Props

Request parameters:

| Name | Required | Description |
|------|----------|-------------|
| grant_type | Yes | Must be `urn:ietf:params:oauth:grant-type:token-exchange` |
| subject_token_type | Yes | `urn:ietf:params:oauth:token-type:jwt` or `...:id_token` |
| subject_token | Yes | The externally issued OIDC JWT or SPIFFE JWT-SVID |
| identity_provider_id | Yes | OpenAI Workload Identity Provider ID for the external issuer |
| service_account_id | Yes | OpenAI service account ID to resolve against a matching mapping |

Workload Identity Provider dashboard options: Name, OIDC Issuer URL, Audience, Description, custom OIDC discovery URL (mutually exclusive with uploaded JWKS), uploaded JWKS, and CEL-based attribute transformations.

Service account mapping options: Name, Key/Value claim assertions, Description, Project, Service account, optional narrowing Permissions.

## OpenAI API vs Codex

Workload identity federation works with the OpenAI API or Codex. Both use the same trust model, but administration and runtime configuration differ.

| | OpenAI API | Codex |
|---|---|---|
| OpenAI identity | A service account in an API Platform project | A user or service account in a managed ChatGPT workspace |
| Where administrators set it up | OpenAI Platform | OpenAI Admin Portal |
| How the workload connects | An OpenAI SDK or the token exchange endpoint | Codex environment variables and an identity-token file |
| What the access token can use | The APIs and permissions available to the mapped service account | The Codex access available to the mapped workspace principal |

Shared model: an **identity provider** (which external issuer to trust and how to verify its tokens or certificates), an **access rule** (service account mapping for the API, federation rule for Codex), and an **OpenAI principal** that receives the access. Token exchange never creates a principal, project, or workspace membership.

## Notes

- Four parts: a **Workload Identity Provider** (trusted issuer config), a **service account mapping** (which external claims map to which service account), a **token exchange** request, and use of the returned access token as a bearer credential.
- Configuring the OpenAI API path requires permission to manage Workload Identity Providers and service account mappings for the organization (Organization Settings > Security > Workload Identity Provider).
- X.509 providers (OpenAI API only): attributes derive from a client certificate verified against the organization's existing Mutual TLS configuration; no certificates are stored and there is no separate trust store. Configure and activate the anchoring trusted certificate under Organization Settings > Security > Mutual TLS first. For X.509 mappings prefer an exact `openai.subject`; raw JWT claims (`sub`, `aud`, `iss`) apply only to OIDC providers. See [WIF: X.509 Certificates](./wif-x509-certificates.md).
- OIDC JWKS: with OIDC discovery (standard or custom), discovery documents and remote JWKS payloads are cached for 600 seconds; if a token `kid` is not found in the cached JWKS, OpenAI refreshes the JWKS and retries once before rejecting. Uploaded JWKS must contain a non-empty `keys` array, no private key material, and unique non-empty `kid` values; update the provider before issuing tokens with a new `kid`.
- Custom OIDC discovery URL must use public HTTPS and cannot contain credentials, a custom port, a query, or a fragment. It is mutually exclusive with uploaded JWKS, and the token's `iss` must still match the configured OIDC Issuer URL.
- Mapping values are scalar JSON values; a string value may use one trailing wildcard with a non-empty prefix. Allowed: `repo:openai/*`, `repository:my-org/*`. Not supported: `*`, `repo:*:prod`, `repo/*/main`.
- Token renewal: the response's `expires_at` is an absolute UTC expiration (Unix timestamp in seconds) while `expires_in` is the lifetime in seconds from issuance. No refresh token is returned; repeat the exchange with a valid external identity token or client certificate.
- Codex path: workload identity federation for Codex is in beta and must be enabled per workspace (contact your OpenAI representative or OpenAI Support). Federation rules and Codex setup belong to openai-codex, not this skill.
- Security recommendations: use a dedicated principal per application or workload; separate production and non-production environments; prefer exact claim matching over broad patterns; grant only the access needed; use short access-token lifetimes; review and remove unused providers, mappings, and rules; review token exchange errors and unexpected access patterns.
- Attribute transformations use CEL (Common Expression Language); results must be scalar (string/bool/int/finite number) — arrays, objects, null, and errors fail mapping resolution.
- Mapping resolution requires exactly one enabled mapping to match all configured attributes for a `(provider, service_account)` pair; multiple matches reject the exchange.
- Admin API scopes cannot be assigned to WIF mappings; downstream API authorization still applies after a token is minted.
- Errors fall into categories: missing parameter, unsupported token request, provider resolution, subject token verification (bad signature/issuer/audience/claims/expiry/kid), and mapping resolution (no/disabled/mismatched mapping).
- Provider-specific setup guides exist for X.509 certificates, AWS, Google Cloud, Microsoft Azure, Kubernetes, GitHub Actions, Oracle Cloud Infrastructure, SPIFFE, and Idira.

## Related

- [WIF: AWS](./wif-aws.md)
- [WIF: Google Cloud](./wif-google-cloud.md)
- [WIF: Microsoft Azure](./wif-microsoft-azure.md)
- [WIF: Kubernetes](./wif-kubernetes.md)
- [WIF: GitHub Actions](./wif-github-actions.md)
- [WIF: Oracle Cloud Infrastructure](./wif-oracle-cloud.md)
- [WIF: SPIFFE](./wif-spiffe.md)
- [WIF: Idira](./wif-idira.md)
- [WIF: X.509 Certificates](./wif-x509-certificates.md)
- [Terraform: Service Accounts](./terraform-service-accounts.md)
