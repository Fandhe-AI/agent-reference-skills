<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted/agent-identity / last verified: 2026-11-14 -->

# Agent identity and credentials

How a self-hosted Claude Managed Agents server lets outside systems trust an agent and where it keeps credentials: a short-lived signed JWT that names each agent (agent identity), vault credentials stored in your secret manager, and environment variable credentials injected by the egress gateway so sandboxes hold only placeholders.

## Signature / Usage

Create the signing key and publish the public keys:

```bash
mkdir -m 700 agent-identity
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out agent-identity/signing-key.pem
```

```bash
CMA_AGENT_IDENTITY__ISSUER=https://agents.example.com \
CMA_AGENT_IDENTITY__KEY_FILE=./agent-identity/signing-key.pem \
  ./cma-server export-issuer -out issuer-files
```

Kubernetes: `kubectl -n cma-server create secret generic cma-agent-identity --from-file=agent-identity/signing-key.pem`, then set `server.agentIdentity.secretName` to `cma-agent-identity` in the server chart's values file.

Settings file section:

```yaml
agent_identity:
  issuer: https://agents.example.com
  key_file: /run/cma-server/agent-identity/signing-key.pem
  direct:
    audiences:
      - audience: https://mcp-gateway.example.com
        urls:
          - https://mcp-gateway.example.com
```

Send the token to an MCP server (agent's MCP server entry):

```yaml
mcp_servers:
  - type: url
    name: tickets
    url: https://mcp-gateway.example.com/tickets
    auth:
      type: agent_token
      audience: https://mcp-gateway.example.com
```

Send both the token and a vault credential:

```yaml
mcp_servers:
  - type: url
    name: tickets
    url: https://mcp-gateway.example.com/tickets
    agent_token_header:
      audience: https://mcp-gateway.example.com
```

Test the MCP gateway:

```bash
./cma-server check-gateway -config check-gateway.yaml -agent agent_011CYm1BLqPXpQRk5khsSXrs \
  -url https://mcp-gateway.example.com/tickets
```

Secret manager blocks (`secret_store`):

```yaml
secret_store:
  type: aws_secrets_manager
  region: us-east-1
  prefix: cma-server/prod/
```

```yaml
secret_store:
  type: gcp_secret_manager
  project: my-project        # the project ID, not its number
  prefix: cma-server-prod--
```

```yaml
secret_store:
  type: azure_key_vault
  vault_url: https://my-vault.vault.azure.net
  prefix: cma-server-prod--
```

```yaml
secret_store:
  type: hashicorp_vault
  address: https://vault.internal:8200
  prefix: cma-server/prod/
  approle:
    role_id: <role-id>
    secret_id_file: /run/vault/secret-id
  #kubernetes: { role: cma-server }
  #token_file: /run/vault/token
```

Check the secret store (host install; on Compose run it in the server container):

```bash
./cma-server validate-store -config /etc/cma-server/config.yaml
```

Turn on the egress gateway in the Compose stack:

```bash
echo 'CMA_EGRESS__ALLOWED_HOSTNAMES=api.github.com' >> .env
echo 'COMPOSE_FILE=docker-compose.yml:docker-compose.egress.yml' >> .env
docker compose up --build -d
```

Kubernetes values (server side, then sandbox side):

```yaml
egressGateway:
  enabled: true
  proxyAddress: 34.118.224.53:3128   # the address that you chose, and port 3128
server:
  config:
    egress:
      allowed_hostnames:
        - api.github.com
```

```yaml
egress:
  mode: gateway
  gateway:
    serviceIP: 34.118.224.53   # the address that you chose
    serverService: cma-server
    serverEgressService: cma-server-egress
    apiServerCIDRs:
      - 203.0.113.10/32        # the cluster's API endpoint
```

Kubernetes: create the certificate authority and the gateway key (run from the archive's top directory, OpenSSL 3.0 or later), then delete `egress-ca.key`:

```bash
(umask 077 && openssl req -x509 -newkey ec -pkeyopt ec_paramgen_curve:P-256 -nodes -days 825 \
  -subj "/CN=cma-server egress gateway" \
  -addext "basicConstraints=critical,CA:TRUE,pathlen:0" \
  -addext "keyUsage=critical,keyCertSign,cRLSign" \
  -keyout egress-ca.key -out egress-ca.crt)
kubectl -n cma create secret tls cma-egress-ca --cert=egress-ca.crt --key=egress-ca.key
kubectl -n cma-server create configmap cma-egress-ca --from-file=ca.crt=egress-ca.crt
GATEWAY_KEY=$(openssl rand -hex 32)
printf %s "$GATEWAY_KEY" | kubectl -n cma create secret generic cma-egress-gateway-key --from-file=gateway-key=/dev/stdin
printf %s "$GATEWAY_KEY" | kubectl -n cma-server create secret generic cma-egress-gateway-key --from-file=gateway-key=/dev/stdin
unset GATEWAY_KEY
```

```bash
docker buildx build --platform "$PLATFORM" -f kubernetes/egress/Dockerfile -t "$REGISTRY/cma-egress:$TAG" --push .
helm upgrade cma-server kubernetes/server/chart --namespace cma-server -f cma-server-values.yaml --wait
helm upgrade cma kubernetes/chart --namespace cma -f cma-values.yaml --wait
```

Verify the gateway from an agent session (credential `GITHUB_TOKEN` listing `api.github.com`):

```bash
printenv GITHUB_TOKEN
curl -sS -H "Authorization: Bearer $GITHUB_TOKEN" https://api.github.com/user
```

## Options / Props

### Agent identity setup

| Item | Description |
|------|-------------|
| issuer URL | `https://` URL with no path or trailing slash, on a hostname you can keep. Static web host works; do not use the server's own address (it does not serve the keys at the fetched paths) |
| `agent_identity.issuer` / `key_file` | Issuer URL and path to the private key. Alternatives to keep the key out of files: `key_secret` (secret manager) or `kms_key` (AWS KMS or Google Cloud KMS) |
| `agent_identity.direct.audiences[].audience` | One receiver, as an `https://` URL |
| `agent_identity.direct.audiences[].urls` | URL prefixes of the MCP servers that can receive a token for that audience |
| `mcp.allowed_hostnames` | Must list the receiver's hostname |
| `auth` (`type: agent_token`, `audience`) | Token sent as `Authorization: Bearer <token>`, in place of a vault credential. Neither the model nor the worker receives it |
| `agent_token_header` (`audience`) | Vault credential stays in `Authorization`; token goes in an `Agent-Identity-Token` header with no `Bearer` prefix |

### What the receiver checks

| Check | Requirement |
|-------|-------------|
| Signature | Verifies under a key in `<issuer>/.well-known/jwks.json`, selected by `kid` in the header (RSA: `RS256`) |
| `iss` / `aud` | `iss` equals your issuer URL; `aud` equals the receiver's audience |
| `exp` / `iat` | `exp` in the future; `iat` not in the future |
| `typ` / `token_use` | Header `typ` is `agent+jwt`; `token_use` is `agent` |
| `agent_id` | Base each agent's access rules on this claim |
| `jti` | Accept repeats (one listing or call can take several requests with the same token) |

### Secret manager

| `secret_store.type` | Settings | Access grant (file in the archive's `iam/` directory) |
|---------------------|----------|--------------------------------------------------------|
| `aws_secrets_manager` | `region`, `prefix` | `aws-secrets-manager-policy.json` |
| `gcp_secret_manager` | `project`, `prefix` | commands in comments of `gcp-secret-manager-role.yaml` |
| `azure_key_vault` | `vault_url`, `prefix` | `azure-key-vault-role.json` (replace `SUBSCRIPTION_ID`; role covers a whole key vault, so use a dedicated vault with Azure RBAC) |
| `hashicorp_vault` | `address`, `prefix`, exactly one of `approle` / `kubernetes` / `token_file` | `hashicorp-vault-policy.hcl` |

HashiCorp Vault login methods: `approle` for Compose, a host, or the server Helm chart (secret ID read from a file; with the chart, put it in a Secret named in `server.extensionFiles.secretName`, mounted under `/run/cma-server/extension-files/`); `kubernetes` only on a Kubernetes install of your own whose server pod has a service account token (does not work with the server Helm chart); `token_file` for any other login method, with Vault Agent writing its token to the file.

### Egress gateway

| Item | Description |
|------|-------------|
| `cma-egress` | Proxy in the release archive between sandboxes and the internet. Off by default; the server accepts environment variable credentials only with it on |
| `egress.allowed_hostnames` | Exact public hostnames, no wildcards; include every host agents' commands download from. In Compose: `CMA_EGRESS__ALLOWED_HOSTNAMES` in `.env` |
| `egress.swap_header_names` | Headers the gateway may fill; default only `Authorization`. List others together with `Authorization`. In Compose: `CMA_EGRESS__SWAP_HEADER_NAMES` |
| `egress.mode: gateway` | Sandbox chart setting (`egress.gateway.serviceIP`, `serverService`, `serverEgressService`, `apiServerCIDRs`, optional `apiServerPort`) |
| Credential rules | `networking` must be type `limited` and every `allowed_hosts` entry must be on `egress.allowed_hostnames`; `injection_location` must be `{"header": true}`. Violations get a `400` naming the field |

## Notes

- This is the self-hosted Claude Managed Agents server (you host the whole service). It is not a `self_hosted` environment / self-hosted sandbox (see `../environments/self-hosted-sandboxes.md` and the `../environments/self-hosted-sandboxes*.md` pages): there Anthropic hosts the service and you host only the tool-execution worker.
- Access to self-hosted Claude Managed Agents requires contacting your Anthropic account team.
- Revoking: remove the MCP entry from the agent or archive the agent. A token already sent stays valid until `exp`, at most 5 minutes by default.
- With single sign-on, a tool call's token also carries `actor_sub` / `actor_iss` (the caller that created the session); `actor_sub` does not mean the caller approved the call. Tool-listing tokens, subagent-call tokens, and every token of a session created by the server API key have no `actor_sub`; if a rule depends on the caller, refuse a tool call with no `actor_sub`. A gateway should call each tool with its own credential and never pass the token on.
- The SDK lacks the `auth` and `agent_token_header` fields: add them as extra fields on the MCP server entry, or send plain JSON. If an SDK only allows top-level extra fields, make `mcp_servers` itself the extra field and send the whole list.
- `check-gateway` uses its own settings file: copy only the `mcp` and `agent_identity` sections (plus `limits.mcp_call_timeout` if set) and change `key_file` to the key's local path. Pass `-agent` an agent ID the gateway allows. Passing run prints `check-gateway: PASS` and exits `0`; a failure exits `1`.
- Secret manager: by default vault credential secrets live in the server database; with `secret_store` each new secret is written to your manager under the reserved prefix and the database keeps a reference. Choose the settings once: removing `secret_store`, changing `type`, `prefix`, `region`, `project`, `vault_url`, `mount`, or `namespace`, or pointing `address` at another Vault makes earlier secrets unfindable until restored. One identity reads the whole prefix; give groups that must be isolated their own deployment, prefix or key vault, and identity.
- `validate-store` creates, reads, and deletes a test secret under the prefix without starting the server; a pass ends with a line saying `pass` and exit `0`. Run it before first start and after any policy change; with Azure Key Vault, run it against your vault before relying on it. On Docker Compose, run it inside the container (`docker compose exec cma-server /opt/cma-server/bin/linux_amd64/cma-server validate-store -config /etc/cma-server/config.yaml`; on Arm use `linux_arm64`).
- Gateway on Kubernetes: build and push the gateway image, create the certificate authority and gateway key (delete `egress-ca.key` afterward; the certificate is valid 825 days), remove sandboxes of earlier sessions, then upgrade the server chart and the sandbox chart. The sandbox chart does not offer the gateway on AKS. The server chart upgrade adds a network policy: port 9464 (metrics) is closed (set `server.telemetry.prometheus.scraper.namespace` if Prometheus scrapes it) and port 8400 admits every source.
- After adding a host to the server's list: Compose `docker compose up -d`; Kubernetes the server `helm upgrade` plus `kubectl -n cma-server rollout restart deployment -l anthropic.com/role=server`.
- Expected check result: `printenv` prints a placeholder starting with `cma_ph_`; the `curl` returns the token's GitHub profile; a host not on the list gets a `403`. On Kubernetes, `503` on every request probably means the cluster rewrites pod addresses (e.g. kube-proxy `--masquerade-all`), since the gateway identifies sandboxes by pod address.
- Renewing the CA on Kubernetes: repeat the whole certificate/key step (the certificate authority block under Usage) while no session runs, appending `--dry-run=client -o yaml | kubectl apply -f -` to each of the four `kubectl create` lines, then run `kubectl -n cma-server rollout restart deployment -l anthropic.com/role=server` and `kubectl -n cma rollout restart deployment/cma-egress`.
- Gateway limits: values go only into request headers (never URL or body). Java tools such as Maven and Gradle ignore `HTTPS_PROXY` and related variables, so they reach nothing. Custom sandbox images must start the worker through `cma-with-egress`.
- The hosted guides say environment variable credentials are not supported with self-hosted sandboxes; that describes the hosted service, not your own server.
- Source: https://platform.claude.com/docs/en/managed-agents/self-hosted/agent-identity.md (fetched 2026-11-14)

## Related

- [Inference provider](./inference-provider.md)
- [Configuration reference](./configuration-reference.md)
- [Call the API](./call-the-api.md)
- [Kubernetes](./kubernetes.md)
- [Differences](./differences.md)
- [Single sign-on](./single-sign-on.md)
- [Self-hosted sandboxes](../environments/self-hosted-sandboxes.md)
