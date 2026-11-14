<!-- source: https://code.claude.com/docs/en/amazon-bedrock.md / last verified: 2026-11-14 -->

# Claude Code on Amazon Bedrock

Configure Claude Code to run through Amazon Bedrock: sign-in wizard, manual environment-variable setup, IAM permissions, model pinning, and the Mantle endpoint.

## Signature / Usage

```bash
# Sign-in wizard (interactive): run `claude`, choose 3rd-party platform > Amazon Bedrock,
# or run /setup-bedrock once already in a session.

# Manual setup
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1                     # optional if AWS profile already sets a region
export ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION=us-west-2   # optional: region for Haiku-class model
export ANTHROPIC_BEDROCK_BASE_URL=https://bedrock-runtime.us-east-1.amazonaws.com  # optional override

# Pin model versions (recommended for team deployments)
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-8'
export ANTHROPIC_DEFAULT_SONNET_MODEL='us.anthropic.claude-sonnet-4-6'
export ANTHROPIC_DEFAULT_HAIKU_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'

# Mantle endpoint (native Anthropic API shape instead of Bedrock Invoke API)
export CLAUDE_CODE_USE_MANTLE=1
claude --model anthropic.claude-haiku-4-5
```

```json
{
  "awsAuthRefresh": "aws sso login --profile myprofile",
  "env": {
    "AWS_PROFILE": "myprofile"
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLAUDE_CODE_USE_BEDROCK` | env | Enables the Amazon Bedrock integration |
| `AWS_REGION` | env | Overrides the resolved AWS region; precedence: `AWS_REGION` > `AWS_DEFAULT_REGION` > active profile's `region` (credentials file, then config file) > `us-east-1`. Values not shaped like a region name are treated as unset. |
| `AWS_BEARER_TOKEN_BEDROCK` | env | Amazon Bedrock API key (bearer token); when set, Claude Code does not resolve the credential chain. Short-term keys last up to 12 hours, long-term keys until their expiration date |
| `awsAuthRefresh` | settings | Command run only when credentials are detected as expired (STS `GetCallerIdentity` check first, via `HTTPS_PROXY` / `NO_PROXY`); output shown, no interactive input. Use for commands that modify `.aws` |
| `awsCredentialExport` | settings | Command run at session start and on each credential reload; output captured silently; must print JSON `{"Credentials": {...}}` (flat `aws configure export-credentials --format process` output also accepted). `Expiration` optional: cached until 5 minutes before it, else 1 hour |
| `CLAUDE_CODE_SKIP_AWS_CRED_CACHE` | env | `1` resolves the credential chain on every request instead of caching |
| `CLAUDE_CODE_AWS_CHAIN_RESOLVE_TIMEOUT_MS` | env | Raises the 60-second credential-chain resolve timeout (milliseconds) |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` / `_SONNET_MODEL` / `_HAIKU_MODEL` | env | Pin model aliases to specific Bedrock inference-profile IDs |
| `ANTHROPIC_BEDROCK_REGION_PREFIX` | env | Preferred cross-region inference-profile prefix: `us`, `eu`, `apac`, `jp`, `au`, `global`; invalid values fall back to the region-derived prefix; ignored in GovCloud (always `us-gov.`) |
| `modelOverrides` | settings | Maps model version strings to distinct application-inference-profile ARNs, surfaced in `/model` |
| `ANTHROPIC_BEDROCK_SERVICE_TIER` | env | `default`, `flex`, or `priority`; sent as `X-Amzn-Bedrock-Service-Tier` header on Invoke API requests only (no effect on Mantle or a Claude apps gateway) |
| `enforceAvailableModels` | managed settings | With `availableModels`, restricts the startup model checks to the listed IDs (Invoke API; v2.1.287+) |
| `CLAUDE_CODE_SKIP_MODEL_ACCESS_MEMORY` | env | `1` turns off the remembered-refusal memory (up to a day) |
| `CLAUDE_CODE_DISABLE_MODEL_ACCESS_FALLBACK` | env | `1` makes rejected requests fail instead of switching models mid-session |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | env | `1` keeps a 200K window |
| `CLAUDE_CODE_USE_MANTLE` | env | Routes requests to the Mantle endpoint (native Anthropic API shape); `1` or `true` |
| `ANTHROPIC_BEDROCK_MANTLE_BASE_URL` | env | Override the Mantle endpoint URL |
| `CLAUDE_CODE_SKIP_MANTLE_AUTH` | env | Skip client-side SigV4/`x-api-key` auth when a gateway signs requests server-side |
| `CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_GUARD` / `CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_DEFAULT` | env | Streaming behind a gateway that rewrites or drops `Content-Type` (see Notes) |

## Notes

- Pin model versions for multi-user deployments; unpinned aliases (`opus`, `sonnet`) resolve to Claude Code's built-in Bedrock default, which can lag or be unavailable in-account.
- Built-in defaults with no pinning variables: primary model Opus 5.5 (e.g. `us.anthropic.claude-opus-5-5`), small/fast model Sonnet 4.5 (e.g. `us.anthropic.claude-sonnet-4-5-20250929-v1:0`). Before v2.1.280 the primary model defaulted to Opus 5. Unpinned means billed at the Opus rate; to use Sonnet 4.5 as primary, set `ANTHROPIC_MODEL` to its full ID.
- Background tasks (e.g. session titles) use the default Sonnet model, not Haiku. They follow the primary model when you select one via `--model` / `ANTHROPIC_MODEL` / `model` / `ANTHROPIC_DEFAULT_MODEL`, or set `ANTHROPIC_DEFAULT_OPUS_MODEL` without `ANTHROPIC_DEFAULT_SONNET_MODEL`; set `ANTHROPIC_DEFAULT_HAIKU_MODEL` to use Haiku.
- IAM principal needs `bedrock:InvokeModel`, `bedrock:InvokeModelWithResponseStream`, `bedrock:ListInferenceProfiles`, `bedrock:GetInferenceProfile` on inference-profile, application-inference-profile, and foundation-model ARNs, plus `aws-marketplace:ViewSubscriptions` / `aws-marketplace:Subscribe` (condition `aws:CalledViaLast` = `bedrock.amazonaws.com`). Without `GetInferenceProfile`, Claude Code retries once with the alternate request shape per new model (extra round-trip). Mantle needs separate `bedrock-mantle:CreateInference` and `bedrock-mantle:CountTokens`.
- First use per AWS account: submit the Anthropic use case form (Model catalog). With AWS Organizations, the management account can call `PutUseCaseForModelAccess` once (needs `bedrock:PutUseCaseForModelAccess`); approval extends to child accounts.
- Credential methods: `aws configure`, access-key env vars (`AWS_SESSION_TOKEN` only for temporary credentials), SSO profile (`aws sso login` + `AWS_PROFILE`; role credentials come from the profile's `sso_region`), `aws login` (AWS CLI 2.32.0+, session up to 12 hours), or a Bedrock API key. Resolved credentials are cached until 5 minutes before expiry (1 hour if none); the resolve times out after 60 seconds.
- `/logout` is unavailable on Bedrock (auth is AWS-credential-based); WebSearch tool is not available on Bedrock. `/status` shows the resolved region and its source.
- Startup model checks: Claude Code prompts to update an older pin when the account can invoke the newer default (accepting writes to the user settings file). Pins in managed-settings `env` and application-inference-profile ARN pins are not checked (managed pins prompting repeatedly: update to v2.1.314+). With no pin and an unavailable default, it falls back for the session (earlier versions first; Opus default falls back to Sonnet) and does not persist. Starting a session on a specific Sonnet/Opus version acts as a session pin; aliases and unrecognized IDs (e.g. ARNs) do not. Refusals are remembered up to a day and rechecked after ten minutes.
- When Bedrock rejects the session's model mid-session, Claude Code switches model (`Switched to <fallback> because <model> is not available`) unless the session is on a pinned model/ARN or no candidate is available; use `/model` and press `s` to switch without changing the default. A `403` shows as "AWS authentication failed".
- Default profile prefix by region: `us-gov-*` = `us-gov.`, `us-*` = `us.`, `eu-*` = `eu.`, `ap-*` = `apac.`, others = `global.`. With profile listing available, resolution order is preferred-prefix profile, any matching profile, then the built-in ID with the preferred prefix; without discovery the prefix is applied unchecked (a 400 if the profile is not enabled).
- 1M token context: Fable models, Sonnet 5+, and Opus 4.7+ run with 1M by default on both the Invoke API and Mantle (no `[1m]` suffix; ARNs get it via a matching `modelOverrides` entry). Opus 4.6 and Sonnet 4.6 on the Invoke API need the `[1m]` variant. Before v2.1.287, Fable and Opus 4.7+ defaulted to 200K on the Invoke API.
- Prompt caching: `DISABLE_PROMPT_CACHING=1` disables; `ENABLE_PROMPT_CACHING_1H=1` requests a 1-hour TTL (billed higher). If cache token counts stay zero, check regional support.
- Guardrails: create and publish a Guardrail (enable cross-region inference when using cross-region profiles) and add `X-Amzn-Bedrock-GuardrailIdentifier` / `X-Amzn-Bedrock-GuardrailVersion` via `ANTHROPIC_CUSTOM_HEADERS` in the `env` block; a mid-stream block keeps the streamed text and ends with the guardrail's blocked-response message.
- Mantle: model IDs are `anthropic.`-prefixed with no version suffix (e.g. `anthropic.claude-sonnet-5`, `anthropic.claude-haiku-4-5`); inference profile IDs like `us.anthropic.claude-sonnet-4-6` do not work (400). Set both `CLAUDE_CODE_USE_BEDROCK` and `CLAUDE_CODE_USE_MANTLE` to run Mantle alongside the Invoke API; list Mantle IDs in `availableModels` to show them in `/model`. `/status` shows `Amazon Bedrock (Mantle)` or `Amazon Bedrock + Amazon Bedrock (Mantle)`. A `403` naming a `bedrock-mantle:` action means grant it; a `403` naming none means the account lacks model access.
- Troubleshooting: SSO browser-tab loops behind VPN/TLS-inspecting proxies, remove `awsAuthRefresh` and run `aws sso login` manually. CA store configuration applies to AWS requests (v2.1.260+; wizard model-check credential lookup v2.1.261+). "on-demand throughput isn't supported" means use an inference profile ID. `/context` showing 0 tokens per tool group on Bedrock: update to v2.1.196+.
- Streaming behind a gateway: Bedrock streams `application/vnd.amazon.eventstream`; a gateway rewriting `Content-Type` (e.g. to `text/event-stream`) triggers `Bedrock streaming response has content-type ...`. If it drops the header and re-emits SSE, Claude Code falls back to slow non-streaming; set `CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_DEFAULT=1`. A gateway that converts to SSE is no longer the Bedrock API; connect via `ANTHROPIC_BASE_URL` as an LLM gateway instead.
- Create a dedicated AWS account for Claude Code to simplify cost tracking and access control.
- Calling the Messages API directly against Bedrock / Vertex / Foundry is covered by the anthropic-api-core skill's platforms pages; this page covers routing the Claude Code CLI through these platforms.
- Source: https://code.claude.com/docs/en/amazon-bedrock.md, fetched 2026-11-14

## Related

- [google-vertex-ai.md](./google-vertex-ai.md)
- [microsoft-foundry.md](./microsoft-foundry.md)
- [claude-platform-on-aws.md](./claude-platform-on-aws.md)
