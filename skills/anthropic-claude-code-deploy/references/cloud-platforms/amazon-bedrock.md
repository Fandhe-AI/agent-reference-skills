<!-- source: https://code.claude.com/docs/en/amazon-bedrock.md / last verified: 2026-08-07 -->

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

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLAUDE_CODE_USE_BEDROCK` | env | Enables the Amazon Bedrock integration |
| `AWS_REGION` | env | Overrides the resolved AWS region; precedence: `AWS_REGION` > `AWS_DEFAULT_REGION` > active profile's region > `us-east-1` |
| `AWS_BEARER_TOKEN_BEDROCK` | env | Amazon Bedrock API key auth, simpler than full AWS credentials |
| `awsAuthRefresh` | settings | Command run when AWS credentials are detected as expired; output shown to user, no interactive input |
| `awsCredentialExport` | settings | Command run on every credential reload; must print JSON `{"Credentials": {...}}` |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` / `_SONNET_MODEL` / `_HAIKU_MODEL` | env | Pin model aliases to specific Bedrock inference-profile IDs |
| `modelOverrides` | settings | Maps model version strings to distinct application-inference-profile ARNs, surfaced in `/model` |
| `ANTHROPIC_BEDROCK_SERVICE_TIER` | env | `default`, `flex`, or `priority`; sent as `X-Amzn-Bedrock-Service-Tier` header |
| `CLAUDE_CODE_USE_MANTLE` | env | Routes requests to the Mantle endpoint (native Anthropic API shape) |
| `ANTHROPIC_BEDROCK_MANTLE_BASE_URL` | env | Override the Mantle endpoint URL |
| `CLAUDE_CODE_SKIP_MANTLE_AUTH` | env | Skip client-side SigV4/`x-api-key` auth when a gateway signs requests server-side |

## Notes

- Pin model versions for multi-user deployments; unpinned aliases (`opus`, `sonnet`) resolve to Claude Code's built-in Bedrock default, which can lag or be unavailable in-account. Claude Code falls back to an earlier/lower-tier model at startup when unavailable.
- IAM principal needs `bedrock:InvokeModel`, `bedrock:InvokeModelWithResponseStream`, `bedrock:ListInferenceProfiles`, `bedrock:GetInferenceProfile` on inference-profile, application-inference-profile, and foundation-model ARNs, plus AWS Marketplace subscribe permissions.
- `/logout` is unavailable on Bedrock (auth is AWS-credential-based); WebSearch tool is not available on Bedrock.
- Sonnet 5, Opus 4.6+, and Sonnet 4.6 support the 1M token context window; append `[1m]` to a manually pinned model ID to opt in.
- Claude Code uses the Bedrock Invoke API, not the Converse API.
- Calling the Messages API directly against Bedrock / Vertex / Foundry is covered by the anthropic-api-core skill's platforms pages; this page covers routing the Claude Code CLI through these platforms.

## Related

- [google-vertex-ai.md](./google-vertex-ai.md)
- [microsoft-foundry.md](./microsoft-foundry.md)
- [claude-platform-on-aws.md](./claude-platform-on-aws.md)
