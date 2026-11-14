<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted/configuration-reference / last verified: 2026-11-14 -->

# Self-hosted configuration reference

Where the settings of a self-hosted Claude Managed Agents server go (one YAML file plus environment credentials), how to read the key / variable naming, and a lookup of every setting with its environment variable, default, and purpose. Access to self-hosted Claude Managed Agents is requested through your Anthropic account team.

## Signature / Usage

Apply a settings change:

```bash
docker compose restart cma-server
```

```bash
kubectl -n cma-server rollout restart deployment -l anthropic.com/role=server
```

Pass a credential file to the Compose stack (line added to the `x-server-mounts` list in `docker-compose.yml`):

```yaml
- ./gcp-key.json:/etc/cma-server/gcp-key.json:ro
```

Apply a new `.env` (a restart doesn't reread it):

```bash
docker compose up -d
```

Startup log format (each set value and most defaults, with its origin):

```text
server.addr=0.0.0.0:8400 (file)
```

## Options / Props

Variable naming: `CMA_` + the key in capitals, with two underscores in place of each dot. Precedence: variable > file > default. "File only" = no variable. "Environment only" = server doesn't start if set in the file.

### Server and logging

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `server.addr` | `CMA_SERVER__ADDR` | `127.0.0.1:8400` | Address the server listens on. |
| `server.api_key` | `CMA_SERVER__API_KEY` | None | The server API key. Required with `store.backend: postgres`, unless `auth.refuse_server_api_key` is `true`. With `memory`, the server generates one if unset and logs it at startup. |
| `server.id_marker` | `CMA_SERVER__ID_MARKER` | `local` | What follows the prefix in each created ID. `local` gives `sesn_local_01…`; `none` gives `sesn_01…` as on the hosted service. |
| `server.shutdown_delay` | `CMA_SERVER__SHUTDOWN_DELAY` | `0s` | How long the server keeps serving after a stop signal while readiness answers `not_ready`. Maximum `5m`. |
| `server.max_connections` | `CMA_SERVER__MAX_CONNECTIONS` | `0` | Most connections held open at once on `server.addr`; `0` = no limit. At the limit a new connection waits. Event streams, worker polls, and health probes count. On Kubernetes the kubelet restarts a pod whose probes wait too long. |
| `logging.format` | `CMA_LOGGING__FORMAT` | `text` | `text` or `json`. |
| `logging.level` | `CMA_LOGGING__LEVEL` | `info` | `debug`, `info`, `warn`, `error`. |
| `logging.errors` | `CMA_LOGGING__ERRORS` | `false` | Whether the log includes error messages of `4xx` / `5xx` responses (may quote client-sent values). |
| `health.check_interval` | `CMA_HEALTH__CHECK_INTERVAL` | `60s` | How often the server checks its inference credential for the readiness probe. Minimum `5s`. |
| `health.upstream_affects_readiness` | `CMA_HEALTH__UPSTREAM_AFFECTS_READINESS` | `true` | Whether readiness answers `503` while the inference provider rejects the server's credential. |

### Database

All except `store.backend` apply only with `store.backend: postgres`.

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `store.backend` | `CMA_STORE__BACKEND` | `memory` | `memory` (a restart erases data) or `postgres`. |
| `store.database_url` | `CMA_STORE__DATABASE_URL` | None | PostgreSQL connection string. Required with `postgres`. |
| `store.control_database_url` | `CMA_STORE__CONTROL_DATABASE_URL` | Value of `store.database_url` | Connection string for the server's upkeep connections (e.g. heartbeat). |
| `store.listen_database_url` | `CMA_STORE__LISTEN_DATABASE_URL` | Value of `store.database_url` | Connection string for the one notification-listening connection. A transaction-mode pooler can't carry it. |
| `store.migrate_database_url` | `CMA_STORE__MIGRATE_DATABASE_URL` | Value of `store.database_url` | Connection string used by the `migrate` command. A transaction-mode pooler can't carry it. |
| `store.pool_max_conns` | `CMA_STORE__POOL_MAX_CONNS` | `24` | Most database connections one server's pool opens. Minimum `4`. |
| `store.event_poll_interval` | `CMA_STORE__EVENT_POLL_INTERVAL` | `25ms` | How often each server polls the database for latest events of sessions its clients stream. |
| `store.credentials_encryption_key` | `CMA_STORE__CREDENTIALS_ENCRYPTION_KEY` (environment only) | None | Key encrypting stored credentials, 32 random bytes in base64. Docker Compose and Kubernetes installs set it. Server doesn't start without it unless `store.allow_unencrypted_credentials` is `true`. |
| `store.allow_unencrypted_credentials` | `CMA_STORE__ALLOW_UNENCRYPTED_CREDENTIALS` | `false` | Whether the server can start without the encryption key (credentials stored in plain text). `true` has no effect if `git.allowed_hostnames` lists a host, or with Docker Compose / the server Helm chart. |
| `store.credentials_encryption_keys_retiring` | `CMA_STORE__CREDENTIALS_ENCRYPTION_KEYS_RETIRING` (environment only) | None | Earlier keys still usable for decryption during rotation. Needs `store.credentials_encryption_key`. |

### Inference provider

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `inference.provider` | `CMA_INFERENCE__PROVIDER` | `anthropic` | `anthropic`, `bedrock`, `vertex`, `foundry`, `gateway`. |
| `inference.headers` | file only | None | Headers added to every model call, map of name to value. Quote every value; the server refuses to start on an unquoted value YAML doesn't read as text (`true`, `0042`). With `gateway`, a value can be `{ from: request_id }` or `{ from: session_id }`. |
| `inference.model_fallback` | `CMA_INFERENCE__MODEL_FALLBACK` | `true` | `anthropic` only. Whether calls ask for server-side fallback (`fallbacks` field and header `anthropic-beta: server-side-fallback-2026-07-01`). If a proxy named in `ANTHROPIC_BASE_URL` answers `400` / `422`, the server resends without them. |
| `inference.metadata.user_id` | `CMA_INFERENCE__METADATA__USER_ID` | None | `anthropic` and `foundry` only, or `gateway` with `format: anthropic-messages`. Identifier sent as `metadata.user_id` on every call; logged at startup. Without it the server sends the label `cma-server`. Can't be turned off; if the provider or proxy rejects it, every call fails. |

### Cloud providers

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `inference.region` | `CMA_INFERENCE__REGION` | None | `bedrock` and `vertex` only. AWS Region / Google Cloud Agent Platform location. Required with `vertex`. Without it `bedrock` uses the AWS SDK default chain's Region. |
| `inference.project_id` | `CMA_INFERENCE__PROJECT_ID` | None | `vertex` only. Google Cloud project. Required unless the Google credential names a project. |
| `inference.api` | `CMA_INFERENCE__API` | `invoke_model` | `bedrock` only. `invoke_model` or `messages` (the Claude in Amazon Bedrock `bedrock-mantle` endpoint). With `messages`, the AWS role needs `bedrock-mantle:CreateInference` in place of `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream`. |
| `inference.list_models` | `CMA_INFERENCE__LIST_MODELS` | `true` | `bedrock` only. Whether the server reads Bedrock's Claude model lists, so agents can use models newer than the server release. |
| `inference.model_id_prefix` | `CMA_INFERENCE__MODEL_ID_PREFIX` | `us.anthropic.` | `bedrock` only. Text put before each model ID. With `inference.api: messages` the default is `anthropic.`. |
| `inference.model_id_overrides` | file only | None | `bedrock`, `vertex`, `foundry` only. Map of model ID to the exact ID the provider expects (a deployment name with `foundry`). |
| `inference.foundry.resource` | `CMA_INFERENCE__FOUNDRY__RESOURCE` | None | `foundry` only. Foundry resource name. Set this or `inference.foundry.base_url`, not both. |
| `inference.foundry.base_url` | `CMA_INFERENCE__FOUNDRY__BASE_URL` | None | `foundry` only. Default target is `https://<resource>.services.ai.azure.com/anthropic`; set a URL ending in `/anthropic` to reach the resource elsewhere (e.g. a proxy). |

### Model gateway

Only with `inference.provider: gateway`.

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `inference.gateway.url` | `CMA_INFERENCE__GATEWAY__URL` | None | Required. URL receiving model calls. With `bedrock-invoke` and `vertex-raw-predict`, `{model}` marks where the model ID goes; with `vertex-raw-predict` the URL must end in `/{model}:rawPredict`. |
| `inference.gateway.format` | `CMA_INFERENCE__GATEWAY__FORMAT` | None | Required. `bedrock-invoke`, `anthropic-messages`, or `vertex-raw-predict`. |
| `inference.gateway.model_map` | file only | None | Required. Map of each model ID agents can name to the ID the gateway expects. Quote every value. |
| `inference.gateway.streaming` | `CMA_INFERENCE__GATEWAY__STREAMING` | `false` | Whether the server sends the format's streamed call. `bedrock-invoke`: same URL with `-with-response-stream` appended. `vertex-raw-predict`: `:streamRawPredict` in place of `:rawPredict` (leave `:rawPredict` in the URL). |
| `inference.credentials.supplier` | `CMA_INFERENCE__CREDENTIALS__SUPPLIER` | None | Required. `env` (one long-lived key), `oauth_exchange` (short-lived tokens), `azure` (Microsoft Entra ID tokens for the server's Azure identity). |
| `inference.credentials.env.var` | `CMA_INFERENCE__CREDENTIALS__ENV__VAR` | None | Required with `env`. Name of the environment variable holding the key. |
| `inference.credentials.azure.scope` | `CMA_INFERENCE__CREDENTIALS__AZURE__SCOPE` | None | Required with `azure`. Application ID URI or application ID of the gateway's app registration, followed by `/.default`. |
| `inference.credentials.send_as.header` | `CMA_INFERENCE__CREDENTIALS__SEND_AS__HEADER` | `Authorization` | Request header carrying the credential. |
| `inference.credentials.send_as.scheme` | `CMA_INFERENCE__CREDENTIALS__SEND_AS__SCHEME` | `Bearer` | Word preceding the credential in the header. Under any header other than `Authorization`, the default is no scheme. |
| `inference.credentials.renew_before` | `CMA_INFERENCE__CREDENTIALS__RENEW_BEFORE` | `90s` | With `oauth_exchange`, how early a token is replaced. Keep below the tokens' lifetime; tokens valid for less than this are refused. |

### Short-lived gateway tokens

Only with `inference.credentials.supplier: oauth_exchange`. The `exchange` settings are optional as a group; without them the server sends the gateway what the callback returns.

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `inference.credentials.assertion.url` | `CMA_INFERENCE__CREDENTIALS__ASSERTION__URL` | None | Required. URL of the HTTP callback returning a signed assertion. |
| `inference.credentials.assertion.auth.type` | `CMA_INFERENCE__CREDENTIALS__ASSERTION__AUTH__TYPE` | None | Required. `mtls` or `bearer_file`. |
| `inference.credentials.assertion.auth.cert_file` | `CMA_INFERENCE__CREDENTIALS__ASSERTION__AUTH__CERT_FILE` | None | Required with `mtls`. Client certificate path. |
| `inference.credentials.assertion.auth.key_file` | `CMA_INFERENCE__CREDENTIALS__ASSERTION__AUTH__KEY_FILE` | None | Required with `mtls`. Client certificate private key path. |
| `inference.credentials.assertion.auth.token_file` | `CMA_INFERENCE__CREDENTIALS__ASSERTION__AUTH__TOKEN_FILE` | None | Required with `bearer_file`. File holding the bearer token. |
| `inference.credentials.assertion.auth.ca_file` | `CMA_INFERENCE__CREDENTIALS__ASSERTION__AUTH__CA_FILE` | None | PEM file of CAs trusted for the callback. |
| `inference.credentials.assertion.forward_metadata` | `CMA_INFERENCE__CREDENTIALS__ASSERTION__FORWARD_METADATA` | None | Session metadata keys sent to the callback as `session.metadata` in the request body. Values are whatever the API caller wrote; check them against your records. |
| `inference.credentials.exchange.token_url` | `CMA_INFERENCE__CREDENTIALS__EXCHANGE__TOKEN_URL` | None | Required for an exchange. OAuth token endpoint. |
| `inference.credentials.exchange.grant_type` | `CMA_INFERENCE__CREDENTIALS__EXCHANGE__GRANT_TYPE` | None | Required for an exchange. `grant_type` sent, such as `urn:ietf:params:oauth:grant-type:jwt-bearer`. |
| `inference.credentials.exchange.encoding` | `CMA_INFERENCE__CREDENTIALS__EXCHANGE__ENCODING` | `form` | `form` or `multipart`. |
| `inference.credentials.exchange.expiry` | `CMA_INFERENCE__CREDENTIALS__EXCHANGE__EXPIRY` | `expires_in` | `expires_in` = earlier of the response's `expires_in` and the token's `exp` claim; `jwt_exp` = the `exp` claim alone. |
| `inference.credentials.exchange.headers` | file only | None | Extra headers for the token endpoint (name to value map). Quote every value. |
| `inference.credentials.exchange.ca_file` | `CMA_INFERENCE__CREDENTIALS__EXCHANGE__CA_FILE` | None | PEM file of CAs trusted for the token endpoint. |

### Single sign-on

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `auth.issuers` | file only | None | OpenID Connect issuers whose tokens the server accepts (see Issuer entries). |
| `auth.refuse_server_api_key` | file only | `false` | Whether the server refuses the server API key on every route. `true` needs at least one issuer; every admin CLI command that takes the key then fails. |

Issuer entry fields (each entry of `auth.issuers`):

| Field | Default | Description |
|-------|---------|-------------|
| `name` | None | Required. Label in log lines; also recorded as part of each resource's creator. |
| `issuer_url` | None | Required. Issuer URL exactly as in the `iss` claim. Signing keys are fetched from this host and the `jwks_uri` host of its discovery document; admit both if outbound is limited. |
| `audiences` | None | Required. Values a token's `aud` claim can carry. If applications forward tokens they hold, list each application's client ID. |
| `roles` | None | List of `group` and `role` pairs. A group matches exactly or as a pattern (`*` = any run of characters, `?` = one character). Role is `admin`, `developer`, or `user`; highest match wins. Set `roles`, `default_role`, or both. |
| `default_role` | None | Role of a caller whose groups match no `roles` entry. Set only if everyone who can get a token for this audience should have access. |
| `subject_claim` | `sub` | Claim identifying the caller. A name starting with `/` is a JSON Pointer into nested claims. |
| `stable_subject` | `false` | Applies only if `subject_claim` names a claim other than `sub` or `oid`. `true` confirms the provider never changes or reuses that claim (not checked). With `false`, agent tokens omit `actor_sub` and `actor_iss`. |
| `groups_claim` | `groups` | Claim listing the caller's groups. A name starting with `/` is a JSON Pointer. |
| `jwks_file` | None | Path of a JSON Web Key Set file; the server reads keys from it and never contacts the issuer. |
| `login_client_id` | None | Client ID of the application terminal login uses. Only one issuer can set it. |
| `login_scopes` | `[openid]` | Scopes the login requests. Needs `login_client_id`. |

### Secret manager

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `secret_store.type` | `CMA_SECRET_STORE__TYPE` | None | `aws_secrets_manager`, `gcp_secret_manager`, `azure_key_vault`, `hashicorp_vault`. Without it, vault credentials stay in the database. |
| `secret_store.prefix` | `CMA_SECRET_STORE__PREFIX` | None | Required with `secret_store.type`. Start of every created secret name. Must end with `/` for `aws_secrets_manager` and `hashicorp_vault`, `-` or `_` for `gcp_secret_manager`, `-` for `azure_key_vault`. |
| `secret_store.region` | `CMA_SECRET_STORE__REGION` | None | `aws_secrets_manager` only, required. AWS Region holding the secrets. |
| `secret_store.project` | `CMA_SECRET_STORE__PROJECT` | None | `gcp_secret_manager` only, required. Google Cloud project ID. |
| `secret_store.vault_url` | `CMA_SECRET_STORE__VAULT_URL` | None | `azure_key_vault` only, required. Key vault URL, such as `https://my-vault.vault.azure.net`. |

HashiCorp Vault (only with `secret_store.type: hashicorp_vault`; set exactly one login method: `token_file`, `kubernetes`, or `approle`):

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `secret_store.address` | `CMA_SECRET_STORE__ADDRESS` | None | Required. Vault server `https://` URL. |
| `secret_store.namespace` | `CMA_SECRET_STORE__NAMESPACE` | None | Vault Enterprise namespace holding the mount and login method. |
| `secret_store.mount` | `CMA_SECRET_STORE__MOUNT` | `secret` | Path of the KV version 2 secrets engine. |
| `secret_store.ca_cert_file` | `CMA_SECRET_STORE__CA_CERT_FILE` | None | PEM file of the CA that signed Vault's certificate. |
| `secret_store.token_file` | `CMA_SECRET_STORE__TOKEN_FILE` | None | File with a Vault token kept current by another process (e.g. Vault Agent). |
| `secret_store.kubernetes.role` | `CMA_SECRET_STORE__KUBERNETES__ROLE` | None | Required with `kubernetes`. Vault role to log in as; bind to the server's service account. |
| `secret_store.kubernetes.mount_path` | `CMA_SECRET_STORE__KUBERNETES__MOUNT_PATH` | `kubernetes` | Where Vault mounts the Kubernetes login method. |
| `secret_store.kubernetes.service_account_token_file` | `CMA_SECRET_STORE__KUBERNETES__SERVICE_ACCOUNT_TOKEN_FILE` | `/var/run/secrets/kubernetes.io/serviceaccount/token` | Service account token presented at each login. |
| `secret_store.approle.role_id` | `CMA_SECRET_STORE__APPROLE__ROLE_ID` | None | Required with `approle`. AppRole role ID. |
| `secret_store.approle.secret_id_file` | `CMA_SECRET_STORE__APPROLE__SECRET_ID_FILE` | None | Required with `approle`. File with the role's `secret_id`. |
| `secret_store.approle.mount_path` | `CMA_SECRET_STORE__APPROLE__MOUNT_PATH` | `approle` | Where Vault mounts the AppRole login method. |

### Agent identity

Any setting here turns the feature on. The server then needs `agent_identity.issuer` and exactly one signing-key location: `key_file`, `key_secret`, or `kms_key`.

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `agent_identity.issuer` | `CMA_AGENT_IDENTITY__ISSUER` | None | `https://` URL carried as the tokens' `iss` claim. |
| `agent_identity.key_file` | `CMA_AGENT_IDENTITY__KEY_FILE` | None | PEM private key path that signs the tokens. |
| `agent_identity.key_secret` | `CMA_AGENT_IDENTITY__KEY_SECRET` | None | Name of the secret holding the PEM private key in your secret manager, without `secret_store.prefix`. |
| `agent_identity.kms_key.provider` | `CMA_AGENT_IDENTITY__KMS_KEY__PROVIDER` | None | `aws_kms` or `gcp_kms`. |
| `agent_identity.kms_key.key` | `CMA_AGENT_IDENTITY__KMS_KEY__KEY` | None | Required with `kms_key.provider`. Key ARN for `aws_kms`; resource name of one key version for `gcp_kms`. |
| `agent_identity.published_key_files` | `CMA_AGENT_IDENTITY__PUBLISHED_KEY_FILES` | None | Paths of extra PEM public keys published in the key set but never signed with. Use when rotating the signing key. |
| `agent_identity.token_lifetime` | `CMA_AGENT_IDENTITY__TOKEN_LIFETIME` | `5m` | Time from `iat` to `exp`. Minimum `limits.mcp_call_timeout` plus `1m`; maximum `15m`. |
| `agent_identity.jwks_uri` | `CMA_AGENT_IDENTITY__JWKS_URI` | `<issuer>/.well-known/jwks.json` | Key-set URL given in discovery. Set only if hosted elsewhere than under the issuer URL. |
| `agent_identity.direct.audiences` | file only | None | Receivers that can get a token; each entry has an `audience` URL and `urls` (URL prefixes of that receiver's MCP servers). |
| `agent_identity.actor.enabled` | `CMA_AGENT_IDENTITY__ACTOR__ENABLED` | `true` | Whether tool-call tokens carry `actor_sub` (subject of the session creator) and `actor_iss` (`issuer_url` of the `auth.issuers` entry the caller signed in through). Neither claim means the caller approved the call. |

### Egress gateway

Set the other settings only with `egress.gateway_enabled: true`; otherwise the server doesn't start if any is set.

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `egress.gateway_enabled` | `CMA_EGRESS__GATEWAY_ENABLED` | `false` | Whether the server works with the egress gateway and accepts `environment_variable` vault credentials. |
| `egress.allowed_hostnames` | `CMA_EGRESS__ALLOWED_HOSTNAMES` | None | Exact public hostnames sandboxes can reach via the gateway. No port (`api.example.com`) = 443 for `https`, 80 for `http`; with a port (`api.example.com:8443`) = that port alone. |
| `egress.swap_header_names` | `CMA_EGRESS__SWAP_HEADER_NAMES` | `Authorization` | Headers in which the gateway can put a credential value. A custom list replaces the default, so include `Authorization`. |
| `egress.gateway_listen` | `CMA_EGRESS__GATEWAY_LISTEN` | `:8410` | Address of the server's second listener serving only the gateway. Default listens on every interface. |
| `egress.gateway_key_file` | `CMA_EGRESS__GATEWAY_KEY_FILE` | None | Required. File with the key the gateway presents to the server. |
| `egress.ca_cert_file` | `CMA_EGRESS__CA_CERT_FILE` | None | Required. PEM certificate of the gateway's CA. |
| `egress.gateway_proxy_address` | `CMA_EGRESS__GATEWAY_PROXY_ADDRESS` | None | Required. `host:port` at which sandboxes reach the gateway's proxy port. |

### MCP servers

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `mcp.allowed_hostnames` | `CMA_MCP__ALLOWED_HOSTNAMES` | None | Exact hostnames of MCP servers the server can connect to. Without it, it connects to none. |
| `mcp.private_hostnames` | file only | None | Hostnames from `mcp.allowed_hostnames` that can resolve to a private address. |
| `mcp.max_result_bytes` | `CMA_MCP__MAX_RESULT_BYTES` | `102400` (100 KiB) | Most bytes of one MCP tool result the model sees. Minimum `1024`. |

### Git repositories

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `git.allowed_hostnames` | `CMA_GIT__ALLOWED_HOSTNAMES` | None | Git hosts session repositories can be on. Exact match, no wildcards, subdomains not covered. An entry allows port 443 or the one port named (`git.example.com:8443`). Without it, no repositories are accepted. |
| `git.private_hostnames` | file only | None | Hostnames from `git.allowed_hostnames` that resolve to a private address, written without a port. Otherwise only public addresses are used. |
| `git.allowed_push_refs` | `CMA_GIT__ALLOWED_PUSH_REFS` | None | Branches agents can push to, each under `refs/heads/`. An entry ending in `/` allows every branch under it; otherwise that one branch. Without it, agents can't push. |
| `git.commit_author_name` | `CMA_GIT__COMMIT_AUTHOR_NAME` | `Claude` | Author name on agent commits. Set together with `git.commit_author_email`. |
| `git.commit_author_email` | `CMA_GIT__COMMIT_AUTHOR_EMAIL` | `noreply@anthropic.com` | Author email on agent commits. Set together with `git.commit_author_name`. |
| `git.max_concurrent_transfers` | `CMA_GIT__MAX_CONCURRENT_TRANSFERS` | `32` | Most Git requests one server carries at once. Minimum `1`. |
| `git.max_session_transfer_bytes` | `CMA_GIT__MAX_SESSION_TRANSFER_BYTES` | `8589934592` (8 GiB) | Most Git traffic bytes per session per server (up + down); count restarts at zero each time a sandbox picks up the session. At the limit, further Git requests get `403`. `0` = no limit; otherwise minimum `1048576`. |
| `git.max_push_bytes` | `CMA_GIT__MAX_PUSH_BYTES` | `2147483648` (2 GiB) | Most bytes one push can send. Minimum `1048576`. |

### Web tools and skills

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `web_tools.enabled` | `CMA_WEB_TOOLS__ENABLED` | `false` | Whether agents can use `web_search` and `web_fetch`. If you set another `web_tools` setting, the default is `true`. |
| `web_tools.allowed_domains` | `CMA_WEB_TOOLS__ALLOWED_DOMAINS` | None | The only domains readable through the web tools. An entry covers its subdomains. |
| `web_tools.blocked_domains` | `CMA_WEB_TOOLS__BLOCKED_DOMAINS` | None | Domains no agent can read through the web tools. Set this or `web_tools.allowed_domains`, not both. |
| `web_tools.max_content_tokens` | `CMA_WEB_TOOLS__MAX_CONTENT_TOKENS` | None | Most tokens of one fetched page `web_fetch` returns to the model. |
| `skills.max_name_chars` | `CMA_SKILLS__MAX_NAME_CHARS` | `64` | Longest `name` in a `SKILL.md`. Maximum `255`. |
| `skills.max_description_chars` | `CMA_SKILLS__MAX_DESCRIPTION_CHARS` | `1024` | Longest `description` in a `SKILL.md`. |

### Limits, timeouts, and scheduling

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `limits.max_active_sessions` | `CMA_LIMITS__MAX_ACTIVE_SESSIONS` | `64` | `store.backend: memory` only. Most sessions running a turn at once; `0` = no limit. |
| `limits.max_live_subagent_threads` | `CMA_LIMITS__MAX_LIVE_SUBAGENT_THREADS` | `25` | Most subagent threads per session at once; idle threads count until archived or terminated. At the limit the agent can't start another subagent. Minimum `1`, maximum `4000`. |
| `scheduler.max_concurrent_turns` | `CMA_SCHEDULER__MAX_CONCURRENT_TURNS` | `64` | `store.backend: postgres` only. Most turns one server runs at once. Minimum `1`. Extra slots reserved for subagent turns alone: a quarter of this value, at least `4` (default: 64 turns plus 16 subagent turns). |
| `scheduler.claim_poll_interval` | `CMA_SCHEDULER__CLAIM_POLL_INTERVAL` | `1s` | `store.backend: postgres` only. How often a server with a free slot looks for waiting work. Minimum `50ms`. |
| `scheduler.sandbox_claim` | `CMA_SCHEDULER__SANDBOX_CLAIM` | `immediate` | When a worker can start a session's sandbox. `immediate` = as soon as the session is created; `tool_call` = at the first tool call needing the sandbox (a session with none uses no sandbox). |
| `limits.model_call_timeout` | `CMA_LIMITS__MODEL_CALL_TIMEOUT` | `20m` | How long one model call (retries included) can run before cancellation. |
| `limits.stream_idle_timeout` | `CMA_LIMITS__STREAM_IDLE_TIMEOUT` | `5m` | How long a model call's response can deliver nothing before the server gives up that attempt. |
| `limits.mcp_call_timeout` | `CMA_LIMITS__MCP_CALL_TIMEOUT` | `4m` | How long one MCP tool call can run before the server gives it up. |

### Models and compaction

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `models.settings` | file only | None | Changes to the built-in model catalog, keyed by model ID (see Model entries). |
| `compaction.triggers` | file only | About 90% of each model's context window | Context size in tokens at which a turn compacts its history, keyed by model ID. Minimum `50000`. Each model must support compaction. |

Model entry fields (each `models.settings` entry changes a catalog model or adds one; omitted fields of a catalog model keep their built-in value):

| Field | Description |
|-------|-------------|
| `fast_supported` | Whether the model accepts `speed: "fast"`. Required for a model you add. |
| `inference_geo_supported` | Whether the model accepts `inference_geo`. |
| `forced_tool_choice_supported` | Whether the model accepts a request forcing one tool call. Sent only to run an approved `web_search` / `web_fetch` call. With `false`, a tool is never forced on this model. |
| `effort_supported` | Whether the model accepts an effort level. |
| `effort_levels` | Accepted levels from `low`, `medium`, `high`, `xhigh`, `max`. Required with `effort_supported: true` on a model with no built-in levels. |
| `effort_default` | Effort level of a session whose agent names none; must be one of `effort_levels`. Required with `effort_supported: true` on a model with no built-in default. |
| `thinking` | Thinking mode requested, `enabled` or `adaptive`. |
| `thinking_budget` | Thinking budget in tokens sent with `thinking: enabled`. |
| `max_tokens` | The `max_tokens` value of each model call. |

### Console on your server

| Key | Env var | Default | Description |
|-----|---------|---------|-------------|
| `console.serve` | `CMA_CONSOLE__SERVE` | `true` | Whether to serve the console on your server. |

## Notes

- Settings live in one YAML file: `compose.config.yaml` beside `docker-compose.yml` (Docker Compose), or the `server.config` value of the server Helm chart (Kubernetes; edit values, run `helm upgrade`, then restart the servers). `cma-server.example.yaml` at the top of the archive annotates common keys. If the server rejects a setting the self-hosted pages show, upgrade the server.
- Credentials never go in the file; the server reads them from environment variables or the identity your cloud attaches to the host.
- Passing a credential to the Compose stack: only variables in the `environment:` list of the `cma-server` service reach the container. Add the name to that list and its value to `.env`; for a file credential, place the file beside `docker-compose.yml`, add a line to `x-server-mounts`, and use the in-container path (after the first colon) as the variable's or setting's value; then run `docker compose up -d`. An upgrade replaces `docker-compose.yml`, so repeat these edits in the new release's file.
- The server doesn't start if the settings file has an unknown key (the error says where). A provider-/store-/secret-manager-specific setting (e.g. "`bedrock` only") stops the server from starting if set with a different one.
- Lists are YAML lists in the file and comma-separated strings in a variable. Durations are a number with a unit (`30s`, `5m`, `1h`). Integers are plain digits with no sign, leading zero, or underscore.
- At startup the server logs set values and most defaults with their origin; secrets appear as `***`, except a server API key it generated itself.
- Git limits: no SSH or Git LFS; redirects (e.g. a renamed repository) are refused; the host must accept the token as the HTTP Basic password under username `x-access-token`; a URL has one owner and one repository name (no GitLab subgroups); a URL on an unlisted host returns `400` whose message says the URL must be on `github.com` even if you list other hosts; pushes that delete a branch or change anything other than a branch (e.g. a tag) are always refused.
- Distinct from `self_hosted` environments / self-hosted sandboxes (workers; see `../environments/self-hosted-sandboxes*.md`): self-hosted Claude Managed Agents means you host the whole service (this server and its settings), whereas self-hosted sandboxes means Anthropic hosts the service and you host only the tool-execution worker.
- Source: https://platform.claude.com/docs/en/managed-agents/self-hosted/configuration-reference.md (fetched 2026-11-14).

## Related

- [Overview](./overview.md)
- [Single sign-on](./single-sign-on.md)
- [Agent identity](./agent-identity.md)
- [Inference provider](./inference-provider.md)
- [Deploy on Kubernetes](./kubernetes.md)
- [Differences](./differences.md)
- [Console](./console.md)
- [Data and access](./data-and-access.md)
- [Upgrade](./upgrade.md)
