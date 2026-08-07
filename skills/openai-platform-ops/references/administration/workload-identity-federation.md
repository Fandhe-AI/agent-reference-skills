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

## Notes

- Four parts: a **Workload Identity Provider** (trusted issuer config), a **service account mapping** (which external claims map to which service account), a **token exchange** request, and use of the returned access token as a bearer credential.
- Must be an organization owner to configure this feature (Organization Settings > Security > Workload Identity Provider).
- Attribute transformations use CEL (Common Expression Language); results must be scalar (string/bool/int/finite number) — arrays, objects, null, and errors fail mapping resolution.
- Mapping resolution requires exactly one enabled mapping to match all configured attributes for a `(provider, service_account)` pair; multiple matches reject the exchange.
- Admin API scopes cannot be assigned to WIF mappings; downstream API authorization still applies after a token is minted.
- Errors fall into categories: missing parameter, unsupported token request, provider resolution, subject token verification (bad signature/issuer/audience/claims/expiry/kid), and mapping resolution (no/disabled/mismatched mapping).
- Provider-specific setup guides exist for AWS, Google Cloud, Microsoft Azure, Kubernetes, GitHub Actions, Oracle Cloud Infrastructure, and SPIFFE.

## Related

- [WIF: AWS](./wif-aws.md)
- [WIF: Google Cloud](./wif-google-cloud.md)
- [WIF: Microsoft Azure](./wif-microsoft-azure.md)
- [WIF: Kubernetes](./wif-kubernetes.md)
- [WIF: GitHub Actions](./wif-github-actions.md)
- [WIF: Oracle Cloud Infrastructure](./wif-oracle-cloud.md)
- [WIF: SPIFFE](./wif-spiffe.md)
- [Terraform: Service Accounts](./terraform-service-accounts.md)
