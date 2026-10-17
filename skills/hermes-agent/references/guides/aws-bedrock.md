# AWS Bedrock

Use Hermes Agent with Amazon Bedrock: native Converse API, Anthropic SDK routing, OpenAI models via Bedrock Mantle, IAM auth, Guardrails, cross-region inference.

## Signature / Usage

```bash
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['bedrock'], explicit=True)"
hermes model     # More providers... -> AWS Bedrock -> region and model
hermes chat
```

`~/.hermes/config.yaml`:

```yaml
model:
  default: us.anthropic.claude-sonnet-4-6
  provider: bedrock
  base_url: https://bedrock-runtime.us-east-2.amazonaws.com

bedrock:
  region: us-east-2
  guardrail:
    guardrail_identifier: "abc123def456"
    guardrail_version: "1"            # version number or "DRAFT"
    stream_processing_mode: "async"   # "sync" or "async"
    trace: "disabled"                 # "enabled", "disabled", or "enabled_full"
  discovery:
    enabled: true
    provider_filter: ["anthropic", "amazon"]
    refresh_interval: 3600
```

Switch models mid-session: `/model us.amazon.nova-pro-v1:0`. Diagnostics: `hermes doctor`.

## Options / Props

API routing by model family:

| Model family | API route |
|---|---|
| Anthropic Claude | Anthropic SDK (`AnthropicBedrock`) — prompt caching, thinking budgets |
| OpenAI GPT-6 (Astra, Sol, Luna), GPT-6.1 Sol, GPT-5.6 (Sol, Terra, Luna), GPT-5.5 with a bare `openai.*` ID | Bedrock Mantle OpenAI Responses endpoint (`bedrock-mantle.<region>.api.aws/openai/v1`) |
| Same OpenAI models with `us.` / `global.` profile ID | Native Converse API (`bedrock-runtime`) |
| Everything else (Nova, DeepSeek, Llama, GPT-OSS, ...) | Native Converse API |

Region priority: `bedrock.region` in config.yaml, `AWS_REGION`, `AWS_DEFAULT_REGION`, default `us-east-1`.

Credential order: `AWS_BEARER_TOKEN_BEDROCK`, `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY`, `AWS_PROFILE`, EC2 IMDS, ECS container credentials, Lambda execution role.

Models (as listed in the guide):

| Model | ID |
|-------|-----|
| Claude Sonnet 4.6 | `us.anthropic.claude-sonnet-4-6` |
| Claude Opus 4.6 | `us.anthropic.claude-opus-4-6-v1` |
| Claude Haiku 4.5 | `us.anthropic.claude-haiku-4-5-20251001-v1:0` |
| OpenAI GPT-6 Astra | `openai.gpt-6-astra` |
| OpenAI GPT-6.1 Sol | `openai.gpt-6.1-sol` |
| OpenAI GPT-6 Sol / Luna | `openai.gpt-6-sol` / `openai.gpt-6-luna` |
| OpenAI GPT-5.6 Sol / Terra / Luna | `openai.gpt-5.6-sol` / `openai.gpt-5.6-terra` / `openai.gpt-5.6-luna` |
| OpenAI GPT-5.5 | `openai.gpt-5.5` (Mantle only, no inference profiles) |
| Amazon Nova Pro / Micro | `us.amazon.nova-pro-v1:0` / `us.amazon.nova-micro-v1:0` |
| DeepSeek V3.2 | `deepseek.v3.2` |
| Llama 4 Scout 17B | `us.meta.llama4-scout-17b-instruct-v1:0` |

IAM permissions: `bedrock:InvokeModel`, `bedrock:InvokeModelWithResponseStream`, `bedrock:ListFoundationModels`, `bedrock:ListInferenceProfiles`, and `bedrock:GetInferenceProfile` (only for application inference profile ARNs).

## Notes

- Requires `boto3` (install via the `bedrock` extra above); Python commands assume a PM-prepared source checkout.
- On EC2 / ECS / Lambda, attach an IAM role (e.g. `AmazonBedrockFullAccess`); no keys needed.
- Guardrails apply on Converse and Claude routes, not on the Mantle Responses endpoint (bare `openai.gpt-*` IDs); use a `us.` / `global.` OpenAI profile when a guardrail is required. `stream_processing_mode` applies to Converse only. A blocked request surfaces as a content-filter refusal.
- Bare `openai.*` IDs are in-Region and go to Mantle in the configured region; GPT-6.1 Sol Mantle in-Region access is `us-east-1` only.
- Prompt caching: Converse `cachePoint` markers are added only for an allowlist (Anthropic Claude and Amazon Nova); Claude normally uses the AnthropicBedrock SDK's own caching.
- Context window: unknown models fall back to 128,000 tokens with a WARNING; set `model.context_length`. Application inference profile ARNs are sized via `bedrock:GetInferenceProfile` from the wrapped model.
- Error "Invocation of model ID ... with on-demand throughput isn't supported": use an inference profile ID (`us.` / `global.`) instead of the bare model ID. `ThrottlingException` is retried with backoff; request quota increases in Service Quotas.
- Works with all gateway platforms (`hermes gateway setup`, `hermes gateway start`).
- One-click CloudFormation sample: JiaDe-Wu/sample-hermes-agent-on-aws-with-bedrock.

## Related

- [azure-foundry](./azure-foundry.md)
