# WIF: SPIFFE

Use SPIFFE JWT-SVIDs (issued by SPIRE or a compatible provider) as a Workload Identity Provider subject token. OpenAI supports only JWT-SVIDs, not X.509-SVIDs.

## Signature / Usage

```hcl
server {
  trust_domain = "example.org"
  jwt_issuer   = "https://spire-oidc.example.org"
}
```

```bash
TOKEN=$(spire-agent api fetch jwt \
  -socketPath /run/spire/sockets/agent.sock \
  -audience "https://api.openai.com/v1" | sed -n '2p')
```

## Options / Props

| Claim | Description |
|-------|-------------|
| `sub` | SPIFFE ID, e.g. `spiffe://example.org/ns/production/sa/openai-wif` |
| `iss` | JWT-SVID issuer URL, e.g. `https://spire-oidc.example.org` |
| `aud` | Audience matching the SPIFFE Workload API request, e.g. `https://api.openai.com/v1` |
| `kid` (header) | Required for OpenAI to select the correct JWKS signing key |

## Notes

- Configure the SPIRE Server with a stable `jwt_issuer` and run the OIDC Discovery Provider so OpenAI can fetch discovery metadata and JWKS; otherwise upload the JWKS manually.
- Match `sub` exactly for privileged workloads; a trailing wildcard (`spiffe://example.org/ns/production/sa/*`) should be used only when intentionally trusting a namespace/class of workloads.
- Keep JWT-SVID lifetimes short to reduce bearer-token replay risk, and protect the SPIFFE Workload API socket from unauthorized local access.

## Related

- [Workload Identity Federation](./workload-identity-federation.md)
