---
source: https://modelcontextprotocol.io/registry/authentication
---

# Registry Authentication

Publishing to the official MCP Registry requires authentication. The method chosen determines the namespace of the server name.

## Signature / Usage

```bash
# GitHub (OAuth device flow)
mcp-publisher login github

# DNS (Ed25519 private key)
MY_DOMAIN="example.com"
PRIVATE_KEY="$(openssl pkey -in key.pem -noout -text | grep -A3 "priv:" | tail -n +2 | tr -d ' :\n')"
mcp-publisher login dns --domain "${MY_DOMAIN}" --private-key "${PRIVATE_KEY}"

# HTTP (Ed25519 private key)
mcp-publisher login http --domain "${MY_DOMAIN}" --private-key "${PRIVATE_KEY}"
```

## Options / Props

| Authentication | Name Format | Example Name |
| --- | --- | --- |
| GitHub-based | `io.github.username/*` or `io.github.orgname/*` | `io.github.alice/weather-server` |
| domain-based | `com.example.*/*` | `io.modelcontextprotocol/everything` |

| Method | Proof | Key types shown |
| --- | --- | --- |
| GitHub | OAuth flow initiated by `mcp-publisher` (device code at `https://github.com/login/device`) | n/a |
| DNS | DNS TXT record `"v=MCPv1; k=ed25519; p=<PUBLIC_KEY>"` (or `k=ecdsap384`) | Ed25519, ECDSA P-384, Google KMS, Azure Key Vault |
| HTTP | File hosted at `/.well-known/mcp-registry-auth` containing `v=MCPv1; k=ed25519; p=<PUBLIC_KEY>` (or `k=ecdsap384`) | Ed25519, ECDSA P-384, Google KMS, Azure Key Vault |

Generating a DNS TXT record (Ed25519):

```bash
MY_DOMAIN="example.com"

# Generate public/private key pair using Ed25519
openssl genpkey -algorithm Ed25519 -out key.pem

# Generate TXT record
PUBLIC_KEY="$(openssl pkey -in key.pem -pubout -outform DER | tail -c 32 | base64)"
echo "${MY_DOMAIN}. IN TXT \"v=MCPv1; k=ed25519; p=${PUBLIC_KEY}\""
```

Generating the HTTP auth file (Ed25519):

```bash
openssl genpkey -algorithm Ed25519 -out key.pem
PUBLIC_KEY="$(openssl pkey -in key.pem -pubout -outform DER | tail -c 32 | base64)"
echo "v=MCPv1; k=ed25519; p=${PUBLIC_KEY}" > mcp-registry-auth
```

## Notes

- With GitHub authentication, the server name in `server.json` **MUST** be `io.github.username/*` (or `io.github.orgname/*`). With domain-based authentication, it **MUST** be `com.example.*/*` where `com.example` is the reverse-DNS form of the domain.
- DNS TXT records may take several minutes to propagate before `mcp-publisher login dns` succeeds.
- Google KMS and Azure Key Vault variants use `mcp-publisher login dns|http google-kms|azure-key-vault` with `--domain` and `--resource` (Google) or `--vault` / `--key` (Azure); an initial login attempt prints the "Expected proof record". The full command sequences (gcloud / az) are in the official page.
- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path). Preview status: breaking changes or data resets may occur.

## Related

- [server.json](./server-json.md)
- [MCP Registry](./registry-about.md)
