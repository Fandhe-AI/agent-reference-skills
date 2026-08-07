<!-- source: https://code.claude.com/docs/en/claude-platform-on-aws.md / last verified: 2026-08-07 -->

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

```typescript
// Agent SDK reads the same env vars as the CLI
import { query } from "@anthropic-ai/claude-agent-sdk";
process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS = "1";
process.env.ANTHROPIC_AWS_WORKSPACE_ID = "wrkspc_01ABCDEFGHIJKLMN";
process.env.AWS_REGION = "us-east-1";
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLAUDE_CODE_USE_ANTHROPIC_AWS` | env | Enables Claude Platform on AWS routing; opt-in even with AWS credentials present. Bedrock/Foundry env vars take precedence if also set. |
| `ANTHROPIC_AWS_WORKSPACE_ID` | env | Required; sent as `anthropic-workspace-id` header on every request |
| `ANTHROPIC_AWS_BASE_URL` | env | Override the computed `https://aws-external-anthropic.{region}.api.aws` endpoint, e.g. to route via a proxy/gateway |
| `ANTHROPIC_AWS_API_KEY` | env | Workspace API key; takes precedence over SigV4 |
| `awsAuthRefresh` | settings | Re-runs the login command on stale SigV4 credentials (Claude Platform on AWS support requires v2.1.198+) |
| `CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH` | env | Sends unsigned requests when a gateway adds SigV4 headers itself |

## Notes

- Requests reach Anthropic's API directly, same models/features as the direct Claude API. Client-side feature flags (e.g. `/loop` self-pacing) are off by default and the advisor tool is unavailable.
- Subscribing via AWS Marketplace provisions a **separate** Anthropic organization tied to the AWS account; credentials don't transfer from a pre-existing Claude Console org.
- `/login` and `/logout` don't control this provider's auth except the **refresh credentials** option shown when `awsAuthRefresh` is configured.
- Calling the Messages API directly against Bedrock / Vertex / Foundry is covered by the anthropic-api-core skill's platforms pages; this page covers routing the Claude Code CLI through these platforms.

## Related

- [amazon-bedrock.md](./amazon-bedrock.md)
- [google-vertex-ai.md](./google-vertex-ai.md)
- [microsoft-foundry.md](./microsoft-foundry.md)
