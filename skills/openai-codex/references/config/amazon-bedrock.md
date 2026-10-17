# Use ChatGPT Work and Codex with Amazon Bedrock

Configure local ChatGPT Work and Codex surfaces (desktop app, CLI, IDE extension, SDK) to use OpenAI models available through Amazon Bedrock. The OpenAI-hosted Responses API isn't in the request path: the local client sends model requests to Bedrock, which provides an OpenAI-compatible Responses API implementation for supported OpenAI models. Authentication is AWS-native (Bedrock API key or AWS IAM credentials); ChatGPT sign-in and `OPENAI_API_KEY` are not used for this provider.

## Signature / Usage

```toml
# ~/.codex/config.toml — Bedrock Runtime (cross-Region inference, CRIS); use for new configurations
model_provider = "amazon-bedrock-runtime"
web_search = "disabled"
```

```toml
# Bedrock Mantle (in-Region inference; supports hosted web search)
model_provider = "amazon-bedrock"
web_search = "cached"
```

```toml
# Optional explicit model, e.g. Astra with Global CRIS
model_provider = "amazon-bedrock-runtime"
model = "global.openai.gpt-6-astra"
```

```bash
export AWS_BEARER_TOKEN_BEDROCK=<your-bedrock-api-key>
export AWS_REGION=us-east-2
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `model_provider = "amazon-bedrock-runtime"` | config.toml | Bedrock Runtime endpoint `https://bedrock-runtime.{region}.amazonaws.com/openai/v1` (Global and Geo CRIS). Hosted web search isn't available. |
| `model_provider = "amazon-bedrock"` | config.toml | Bedrock Mantle endpoint `https://bedrock-mantle.{region}.api.aws/openai/v1` (in-Region inference). |
| Bedrock API key | env vars | `AWS_BEARER_TOKEN_BEDROCK` + `AWS_REGION` (a Region is required with this path). Checked first. |
| AWS SDK credential chain | fallback | Shared files (`aws configure`), `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_SESSION_TOKEN`, `aws login`, `aws sso login --profile <name>` + `AWS_PROFILE`, or a federated identity via `credential_process`. |
| `[model_providers.amazon-bedrock.aws]` `profile` / `region` | config.toml | Built-in provider AWS profile / region overrides (omit `profile` to use the standard credential chain). |

Supported models (Bedrock-side exact IDs):

| Endpoint | GPT-6 Astra | GPT-6 Sol | GPT-6 Luna |
|----------|-------------|-----------|------------|
| Runtime, Global CRIS | `global.openai.gpt-6-astra` | `global.openai.gpt-6-sol` | `global.openai.gpt-6-luna` |
| Runtime, United States Geo CRIS | `us.openai.gpt-6-astra` | `us.openai.gpt-6-sol` | `us.openai.gpt-6-luna` |
| Mantle, in-Region | `openai.gpt-6-astra` | `openai.gpt-6-sol` | `openai.gpt-6-luna` |

## Notes

- This page covers direct access to Bedrock. If your organization already provides a model gateway, use the "Use API/provider credentials" (connect-to-a-gateway) page; for a Bedrock-backed gateway see "Bedrock through LiteLLM" in the administration category.
- Before you start: AWS credentials, access to supported OpenAI models in Bedrock, an AWS Region where the model is available, and permission to invoke the model or inference profile (model-specific IAM requirements apply; e.g. GPT-6 Sol through Runtime also requires `bedrock:InvokeModel` on the account's default project).
- Codex uses the configured `model_provider` to choose which models appear in the picker; the built-in provider supplies its own model catalog. When switching endpoints, change the provider and any explicit model ID together. Use an inference profile ID for Runtime and a model ID for Mantle. Global CRIS routes to supported commercial Regions worldwide; Geo CRIS routes within the profile's geography. Codex's built-in Runtime picker lists the United States Geo and Global variants. Model availability varies by AWS Region (AWS "Regional availability by models" and "Supported Regions and models for inference profiles").
- GPT-6 Sol and Luna are available through Mantle in `us-east-1` (N. Virginia).
- Windows PowerShell: `$env:AWS_BEARER_TOKEN_BEDROCK = "<your-bedrock-api-key>"`, `$env:AWS_REGION = "us-east-2"`. For corporate SSO/OIDC federation, configure `credential_process` in the AWS profile and let the AWS SDK resolve credentials.
- Desktop app and IDE extension may not inherit shell environment variables — put required values in `~/.codex/.env` (Windows: `%USERPROFILE%\.codex\.env`) and restart the app/extension.
- Verify with `/status` in the CLI (provider `amazon-bedrock` for Mantle, `amazon-bedrock-runtime` for Runtime), or start a new task after restarting the desktop app / IDE extension; then send `Reply with exactly: bedrock-ok`. The reply alone doesn't identify the route; confirm provider and model in the client.
- Feature availability: local ChatGPT Work and Codex workflows are supported. Unavailable: ChatGPT Work on the web, Codex cloud and cloud chats, Fast mode (priority processing; Bedrock offers on-demand inference only), image generation and editing, voice dictation, hosted web search on Runtime (use Mantle), connectors, plugin sharing, Sites, Computer History, mobile remote control, GitHub delegation and PR reviews, Slack and Linear cloud integrations, workspace management (SAML SSO / MFA), cloud-managed config policies, RBAC and custom roles, SCIM / EKM / domain verification, retention and residency controls, analytics dashboard and API, Compliance API and audit logs, Codex Security cloud. Available: desktop app, CLI, IDE extension, SDK / `codex exec`, Codex Security CLI and plugin, `/review` local code review, auto-review, sandboxing and permission controls, scheduled tasks, worktrees and Git tools, local environments, Appshots, built-in browser, SSH remote connections, `AGENTS.md`, skills, MCP, subagents, `requirements.toml`. Limited: Computer Use (browser, Chrome, desktop), plugins (local bundles and OpenAI-curated plugins that don't require ChatGPT authentication), Memories.
- Codex Security CLI uses its own provider configuration; follow its Amazon Bedrock setup in the security CLI reference.
- Troubleshooting: exact model ID; correct provider for the endpoint (`amazon-bedrock-runtime` vs `amazon-bedrock`); Region where the model is available; valid, non-expired Bedrock API key or AWS credentials; IAM permission for the selected model; `AWS_BEARER_TOKEN_BEDROCK` isn't set to an expired or unintended key; desktop/IDE variables present in `~/.codex/.env`. Check AWS identity with `aws sts get-caller-identity --profile codex-bedrock` (checks identity, not model-invoke permission).
- Support boundaries: OpenAI Support covers client setup, configuration, local CLI / desktop app / IDE extension behavior. AWS credentials, IAM, Bedrock model access, quotas, billing, regional availability, request failures, and service logs go to the customer's AWS administrator or AWS Support.
- A brief `[model_providers.amazon-bedrock.aws]` form also appears among the custom-provider examples in `config-advanced.md`; this page is the dedicated Bedrock setup guide.

## Related

- [Advanced Configuration](./config-advanced.md)
- [Environment variables](./environment-variables.md)
- [Models](../getting-started/models.md)
