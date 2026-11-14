<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted/inference-provider / last verified: 2026-11-14 -->

# Inference provider

How a self-hosted Claude Managed Agents server sends model calls to Amazon Bedrock, Claude Models on Google Cloud (Google managed), Microsoft Foundry, or a model gateway that you run, instead of the Claude API (the default).

## Signature / Usage

To change the provider: put the provider's sample in the server's settings file, give the server the provider's credential, restart the server (on Docker Compose run `docker compose up -d` instead if `.env` or `docker-compose.yml` changed), then check the provider.

Amazon Bedrock:

```yaml
inference:
  provider: bedrock
  region: us-east-1
  #model_id_prefix: global.anthropic.
  #model_id_overrides:
  #  claude-opus-5-5: us.anthropic.claude-opus-5-5
```

Claude Models on Google Cloud (Google managed):

```yaml
inference:
  provider: vertex
  region: us-east5
  project_id: my-project
  #model_id_overrides:
  #  claude-haiku-4-5: claude-haiku-4-5@20251001
```

Microsoft Foundry:

```yaml
inference:
  provider: foundry
  foundry:
    resource: my-resource
  #model_id_overrides:
  #  claude-opus-5-5: team-a-opus
```

Model gateway, `format: bedrock-invoke` with one long-lived key (name the environment variable, never the value):

```yaml
inference:
  provider: gateway
  gateway:
    url: "https://llm-gateway.example.com/v1/model/{model}/invoke"
    format: bedrock-invoke
    # Quote every model_map value.
    model_map:
      claude-opus-5-5: "us.anthropic.claude-opus-5-5"
      claude-sonnet-5: "us.anthropic.claude-sonnet-5"
  credentials:
    supplier: env
    env: { var: LLM_GATEWAY_KEY }
    send_as: { header: x-api-key }
```

`format: anthropic-messages` (replace the `gateway` block):

```yaml
inference:
  gateway:
    url: "https://llm-gateway.example.com/v1/messages"
    format: anthropic-messages
    # Quote every model_map value.
    model_map:
      claude-opus-5-5: "corp-claude-opus"
      claude-sonnet-5: "corp-claude-sonnet"
```

`format: vertex-raw-predict` (replace the `gateway` block):

```yaml
inference:
  gateway:
    url: "https://llm-gateway.example.com/v1/projects/my-project/locations/global/publishers/anthropic/models/{model}:rawPredict"
    format: vertex-raw-predict
    # Quote every model_map value.
    model_map:
      claude-opus-5-5: "claude-opus-5-5"
      claude-sonnet-5: "claude-sonnet-5"
```

Short-lived gateway tokens (replace the `credentials` block):

```yaml
inference:
  credentials:
    supplier: oauth_exchange
    assertion:
      url: "https://app.example.com/assertion"
      auth: { type: mtls, cert_file: /etc/callback/client.pem, key_file: /etc/callback/client.key }
    exchange:
      token_url: "https://login.example.com/oauth2/token"
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer"
```

Callback request body (server `POST`):

```json
{
  "version": 1,
  "purpose": "inference",
  "session": {
    "id": "sesn_011CZkZAtmR3yMPDzynEDxu7",
    "agent_id": "agent_011CYm1BLqPXpQRk5khsSXrs",
    "environment_id": "env_01595EKxaaTTGwwY3kyXdtbs"
  },
  "principal": {
    "issuer": "https://login.example.com/oauth2/default",
    "subject": "00u1a2b3c4d5e6f7g8h9"
  },
  "request_id": "req_011CSHoEeqs5C35K2UUqR7Fy"
}
```

Callback response (status `200`):

```json
{ "assertion": "<signed JWT>", "reuse": "session" }
```

Microsoft Entra ID tokens for a gateway (replace the `credentials` block):

```yaml
inference:
  credentials:
    supplier: azure
    azure: { scope: "api://11111111-2222-3333-4444-555555555555/.default" }
```

Expected log line after restart:

```text wrap
level=INFO msg="upstream credential resolved" provider=bedrock
```

## Options / Props

| `inference.provider` | Model calls go to | The server authenticates with |
|----------------------|-------------------|-------------------------------|
| `anthropic` (default) | The Claude API | `ANTHROPIC_API_KEY` |
| `bedrock` | Amazon Bedrock | Your AWS credential |
| `vertex` | Claude Models on Google Cloud (Google managed) | Google Application Default Credentials |
| `foundry` | Microsoft Foundry | A Foundry API key, or Microsoft Entra ID |
| `gateway` | A model gateway that you run | A key or token that your gateway accepts |

### Provider settings

| Setting | Description |
|---------|-------------|
| `inference.region` | Bedrock region; for `vertex` required: a Google Cloud Agent Platform location offering the models, or `global` |
| `inference.project_id` | Vertex: project that calls are made in and billed to |
| `inference.model_id_prefix` | Bedrock: default prefix is `us.anthropic.` (a cross-region inference profile); uncomment to use another family |
| `inference.model_id_overrides` | Map a Claude API ID to your account's ID for the same model |
| `inference.list_models` | Bedrock: set `false` to skip reading Bedrock's model lists |
| `inference.foundry.resource` | Foundry resource name, first part of `<resource>.services.ai.azure.com` |
| `inference.model_fallback` | Set `false` if a gateway named in `ANTHROPIC_BASE_URL` rejects the server-side fallback field or header |
| `inference.gateway.url` | Gateway model route. For `bedrock-invoke`: `https://`, ends in `/invoke`, with `{model}`. For `anthropic-messages`: whole Messages URL, no `{model}`. For `vertex-raw-predict`: ends in `/{model}:rawPredict` |
| `inference.gateway.format` | `anthropic-messages`, `bedrock-invoke`, or `vertex-raw-predict` |
| `inference.gateway.model_map` | Maps each model ID an agent can name to the gateway's ID; a model with no entry is refused. Values must be quoted; for `vertex-raw-predict` a value cannot contain a colon |
| `inference.credentials.supplier` | `env`, `oauth_exchange`, or `azure` |
| `inference.credentials.send_as` | Header that carries the key; without it the server sends `Authorization: Bearer <key>` |

### Credentials per provider

| Provider | Credential |
|----------|------------|
| `bedrock` | AWS SDK default credential chain (task role, pod identity, `AWS_PROFILE`, `AWS_ACCESS_KEY_ID`). Needs `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` on the models and inference profiles used, and `bedrock:ListFoundationModels` and `bedrock:ListInferenceProfiles` on resource `*` |
| `vertex` | Google Application Default Credentials (`GOOGLE_APPLICATION_CREDENTIALS` or an attached service account). Needs `roles/aiplatform.user` on the project, the `aiplatform.googleapis.com` API, and the Claude models enabled |
| `foundry` | `ANTHROPIC_FOUNDRY_API_KEY` (Kubernetes: in the `cma-server-upstream` Secret), or Microsoft Entra ID when unset (service principal via `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, an AKS workload identity, or a managed identity; needs an Azure role on the Foundry resource) |

### Model gateway: which route to choose

| Gateway accepts | Setting |
|-----------------|---------|
| Same requests as the Claude API, one long-lived credential | Keep the default provider; set `ANTHROPIC_BASE_URL` to the gateway and `ANTHROPIC_API_KEY` or `ANTHROPIC_AUTH_TOKEN` |
| Same requests as the Claude API, but short-lived tokens, a credential in another header, or its own model IDs | `inference.provider: gateway` with `format: anthropic-messages` |
| Amazon Bedrock InvokeModel format | `inference.provider: gateway` with `format: bedrock-invoke` |
| `rawPredict` format of Claude Models on Google Cloud | `inference.provider: gateway` with `format: vertex-raw-predict` |

### Short-lived token settings

| Setting | Description |
|---------|-------------|
| `assertion.url` | HTTP callback you build; returns an assertion (usually a JWT) |
| `assertion.auth` | How the server authenticates to the callback: `{ type: mtls, cert_file, key_file }` or `{ type: bearer_file, token_file: /etc/callback/token }` |
| `exchange` | Your OAuth token endpoint; the server sends only `grant_type` and the assertion, with no client ID or secret. Leave it out if your endpoint needs more, and have the callback return the access token in `assertion` |
| callback `reuse` | `session` (default; only the requesting session) or `deployment` (shared; only for a token naming your organization and no person) |
| callback `principal` | Caller that created the session; for single sign-on `issuer` is the caller's `issuer_url` and `subject` the caller's subject; for the server API key `{"issuer": "cma", "subject": "server"}` |
| `azure.scope` | Application ID URI or application ID of the gateway's own app registration, followed by `/.default` |

## Notes

- This is the self-hosted Claude Managed Agents server (you host the whole service). It is not a `self_hosted` environment / self-hosted sandbox (see `../environments/self-hosted-sandboxes.md` and the `../environments/self-hosted-sandboxes*.md` pages): there Anthropic hosts the service and you host only the tool-execution worker.
- Access to self-hosted Claude Managed Agents requires contacting your Anthropic account team.
- Under every provider except `anthropic`, the server needs no Claude API key and ignores `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, and `ANTHROPIC_BASE_URL`; the exception is a model gateway whose key you tell the server to read from one of those variables.
- Agents name models by Claude API IDs such as `claude-opus-5-5`; the server translates the ID, so an agent definition works unchanged under any provider that serves that model. Some tools and agent settings depend on the provider (see the differences page).
- Cloud credentials: on Docker Compose, pass each variable and file to the server (configuration reference). On Kubernetes the server chart passes no AWS, Google Cloud, or Azure variables, so use workload identity: create a service account with your cloud's workload identity annotation (named in the chart's `values.yaml`) and set `server.serviceAccountName`; on AKS also set `server.azureWorkloadIdentity: true`.
- Bedrock: the server reads Bedrock's model lists so agents can use a model newer than the server's release.
- Foundry: a request names a deployment and the server sends the model ID as the deployment name; map differently named deployments with `model_id_overrides`. Both IDs in an override must name the same model.
- Gateway on Kubernetes: the chart cannot pass a variable of your own but does pass `ANTHROPIC_AUTH_TOKEN` read from the `cma-server-upstream` Secret, so set `env: { var: ANTHROPIC_AUTH_TOKEN }` and put the key in that Secret under that name. With `earlierNames: true` the Secret has another name (see the upgrade page's object names table). For callback certificate files, put them in a Secret named in `server.extensionFiles.secretName` and point `cert_file` / `key_file` at `/run/cma-server/extension-files/`.
- With `format: vertex-raw-predict` the `credentials` block stays as is; the server sends your gateway's own credential and no Google credential.
- If the callback or token endpoint fails, the turn ends with a `session.error` of type `model_request_failed_error` and the session stays usable; the reason is in the server log on a line containing `credential supplier failed`. If the token endpoint reply has no `expires_in` and the token has no `exp` claim, the server sends the token but does not store it and asks again on every model call. Other settings such as `renew_before`, `ca_file`, and `streaming`, and `inference.headers`, are in the configuration reference.
- `azure` supplier: name only the gateway's own registration (a token for another resource would let whoever runs the gateway act as the server there). The token is issued to the server's own Azure identity and names no person; a gateway that must know the caller needs `oauth_exchange`. Assign any required app role before starting the server (a later assignment takes effect only when the server gets another token). Run a turn through your gateway before relying on this supplier.
- Check the provider: the `upstream credential resolved` log line says only that a credential was found, not that the account has a model enabled; a missing model shows up as a `session.error` on the first turn using it.
- Source: https://platform.claude.com/docs/en/managed-agents/self-hosted/inference-provider.md (fetched 2026-11-14)

## Related

- [Configuration reference](./configuration-reference.md)
- [Differences](./differences.md)
- [Agent identity and credentials](./agent-identity.md)
- [Single sign-on](./single-sign-on.md)
- [Upgrade](./upgrade.md)
- [Self-hosted sandboxes](../environments/self-hosted-sandboxes.md)
