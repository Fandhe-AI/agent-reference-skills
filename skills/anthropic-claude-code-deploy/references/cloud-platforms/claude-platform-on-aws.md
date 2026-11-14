<!-- source: https://code.claude.com/docs/en/claude-platform-on-aws.md / last verified: 2026-11-14 -->

# Claude Code on Claude Platform on AWS

Configure Claude Code to use the Anthropic-operated Claude API with AWS authentication (SigV4 or workspace API key), IAM access control, and AWS Marketplace billing.

## Signature / Usage

```bash
# Option A: AWS credentials with SigV4 (standard AWS credential chain)
aws sso login --profile my-profile
export AWS_PROFILE=my-profile

# Option B: Workspace API key
export ANTHROPIC_AWS_API_KEY=sk-ant-xxxxx   # sent as x-api-key, takes precedence over SigV4

# Enable + configure
export CLAUDE_CODE_USE_ANTHROPIC_AWS=1
export ANTHROPIC_AWS_WORKSPACE_ID=wrkspc_01ABCDEFGHIJKLMN
export AWS_REGION=us-east-1

# Pin model versions
export ANTHROPIC_DEFAULT_FABLE_MODEL=claude-fable-5
export ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-8
export ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-5
export ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-4-5
```

```json
{
  "awsAuthRefresh": "aws sso login --profile my-profile"
}
```

```bash
# Through a gateway that adds SigV4 headers itself
export CLAUDE_CODE_USE_ANTHROPIC_AWS=1
export CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH=1
export ANTHROPIC_AWS_WORKSPACE_ID=wrkspc_01ABCDEFGHIJKLMN
export ANTHROPIC_AWS_BASE_URL=https://anthropic-proxy.example.com
```

```typescript
// Agent SDK reads the same env vars as the CLI
import { query } from "@anthropic-ai/claude-agent-sdk";

process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS = "1";
process.env.ANTHROPIC_AWS_WORKSPACE_ID = "wrkspc_01ABCDEFGHIJKLMN";
process.env.AWS_REGION = "us-east-1";

for await (const msg of query({ prompt: "What's in this repo?" })) {
  console.log(msg);
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLAUDE_CODE_USE_ANTHROPIC_AWS` | env | Enables Claude Platform on AWS routing; opt-in even with AWS credentials present. Bedrock/Foundry env vars take precedence if also set. |
| `ANTHROPIC_AWS_WORKSPACE_ID` | env | Required; sent as `anthropic-workspace-id` header on every request |
| `ANTHROPIC_AWS_BASE_URL` | env | Override the computed `https://aws-external-anthropic.{region}.api.aws` endpoint, e.g. to route via a proxy/gateway |
| `ANTHROPIC_AWS_API_KEY` | env | Workspace API key (AWS Console, Claude Platform on AWS > API keys); takes precedence over SigV4 |
| `awsAuthRefresh` | settings | Re-runs the login command on stale SigV4 credentials; also runs at startup when existing credentials can't be validated |
| `CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH` | env | Sends unsigned requests when a gateway adds SigV4 headers itself |
| `ANTHROPIC_AUTH_TOKEN` | env | Token for a gateway that requires its own |
| `ANTHROPIC_DEFAULT_FABLE_MODEL` / `_OPUS_MODEL` / `_SONNET_MODEL` / `_HAIKU_MODEL` | env | Pin the `fable` / `opus` / `sonnet` / `haiku` aliases (same model IDs as the direct Claude API) |

## Notes

- Requests reach Anthropic's API directly, same models/features as the direct Claude API on the same release schedule. Some Claude Code features are unavailable or differ on this provider; see the feature availability matrix (https://code.claude.com/docs/en/feature-availability.md#summary-by-provider) and the features that need feature-flag fetching (https://code.claude.com/docs/en/env-vars.md#features-that-need-feature-flag-fetching).
- Subscribing via AWS Marketplace provisions a **separate** Anthropic organization tied to the AWS account; credentials don't transfer from a pre-existing Claude Console org. Use the workspace ID and API keys from the AWS-linked organization.
- Prerequisites: an active AWS Marketplace subscription, a workspace with its ID, and an IAM principal permitted to invoke the Anthropic service (the `aws-external-anthropic` actions) or a workspace-scoped API key. The AWS CLI is required only for the SSO login flow. For CI, give the runner an IAM role and set `AWS_REGION`.
- `/login` and `/logout` don't sign you into a claude.ai subscription for this provider. With `awsAuthRefresh` configured, `/login` > **3rd-party platform** > **Claude Platform on AWS · refresh credentials** re-runs the command and re-reads credentials without a restart.
- Region is resolved with the same precedence as Amazon Bedrock. Without `ANTHROPIC_DEFAULT_OPUS_MODEL`, the `opus` alias resolves to Opus 5.5 (Opus 5 before v2.1.280).
- Prompt caching is automatic; `ENABLE_PROMPT_CACHING_1H=1` requests a 1-hour TTL (billed at a higher rate).
- Verify with `/status`: `API provider` reads `Claude Platform on AWS`, plus `Workspace ID`, `AWS region`, and the base URL if overridden. The startup banner also shows the provider.
- Troubleshooting: `403` / `AccessDenied` on every request means the IAM principal lacks the `aws-external-anthropic` actions, or a stale `ANTHROPIC_AWS_API_KEY` (which overrides SigV4) is set; a missing-workspace error means `ANTHROPIC_AWS_WORKSPACE_ID` is unset or empty; requests still going to `api.anthropic.com` mean `CLAUDE_CODE_USE_ANTHROPIC_AWS` is unset or not truthy, or `CLAUDE_CODE_USE_BEDROCK` / `CLAUDE_CODE_USE_FOUNDRY` take precedence.
- Calling the Messages API directly against Bedrock / Vertex / Foundry is covered by the anthropic-api-core skill's platforms pages; this page covers routing the Claude Code CLI through these platforms.
- Source: https://code.claude.com/docs/en/claude-platform-on-aws.md, fetched 2026-11-14

## Related

- [amazon-bedrock.md](./amazon-bedrock.md)
- [google-vertex-ai.md](./google-vertex-ai.md)
- [microsoft-foundry.md](./microsoft-foundry.md)
