<!-- source: https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws / last verified: 2026-08-07 -->

# Claude Platform on AWS

Anthropic-operated Claude API platform accessible through AWS, billed via AWS Marketplace (Claude Consumption Units). Unlike Amazon Bedrock (AWS operates the inference stack), here Anthropic operates the stack; AWS provides auth (SigV4 or API key), IAM access control, and billing.

## Signature / Usage

```python
from anthropic import AnthropicAWS

client = AnthropicAWS()  # reads AWS_REGION and ANTHROPIC_AWS_WORKSPACE_ID from env

message = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}],
)
```

```bash
curl "https://aws-external-anthropic.us-west-2.api.aws/v1/messages" \
  --aws-sigv4 "aws:amz:us-west-2:aws-external-anthropic" \
  --user "$AWS_ACCESS_KEY_ID:$AWS_SECRET_ACCESS_KEY" \
  -H "anthropic-workspace-id: $ANTHROPIC_AWS_WORKSPACE_ID" \
  -d '{"model": "claude-sonnet-5", "max_tokens": 1024, "messages": [{"role":"user","content":"Hello!"}]}'
```

## Options / Props

| Aspect | Claude Platform on AWS | Claude in Amazon Bedrock |
|---|---|---|
| Operates the stack | Anthropic | AWS |
| API surface | Claude API (`/v1/{endpoint}`) | Messages API at `/anthropic/v1/messages` |
| Base URL | `aws-external-anthropic.{region}.api.aws` | `bedrock-mantle.{region}.api.aws` |
| SDK client | `AnthropicAWS` (beta) | `AnthropicBedrockMantle` |
| Feature availability | Typically same-day as Claude API | Per Bedrock release schedule |
| Billing | AWS Marketplace | AWS native service |

Model IDs are identical to the first-party Claude API (`claude-sonnet-5`, `claude-opus-4-8`, etc.) — no ARNs, no `anthropic.` prefix. Install: `pip install -U "anthropic[aws]"` / `npm install @anthropic-ai/aws-sdk`.

## Notes

- Prerequisites before first call: enable outbound web identity federation once per AWS account (`aws iam enable-outbound-web-identity-federation`), create a workspace (bound to a single AWS region), grant `aws-external-anthropic:CreateInference` IAM permission.
- Requires `anthropic-workspace-id` header on every request; region is required with no default fallback (unlike `AnthropicBedrock`, which falls back to `us-east-1`).
- Feature parity with the first-party Claude API is high: Agent Skills, code execution, tool use, thinking, streaming, batch, prompt caching, Files API, CMEK (AWS KMS only), Compliance API, and Claude Managed Agents (with a 6-hour autonomous-session reauthentication limit) are all available.
- Not supported: HIPAA-ready program, most Admin API endpoints (workspace CRUD only), workspace member management, Claude Code dedicated workspace/Analytics API, OAuth auth, Fast mode, OpenAI-compatible endpoints, MCP tunnels (only public-internet MCP servers).
- `inference_geo`: `"us"` (US-only, 1.1x pricing) or `"global"` (default). Supported on Claude 4.6+ models only (400 error on Opus 4.5/Sonnet 4.5/Haiku 4.5).
- New organizations start on the Start tier; tier/rate-limit increases go through an Anthropic account representative, not self-service.
- Claude Code からの Bedrock/Vertex/Foundry 利用は anthropic-claude-code-deploy スキルを参照。

## Related

- [claude-in-amazon-bedrock.md](./claude-in-amazon-bedrock.md)
- [claude-on-amazon-bedrock-legacy.md](./claude-on-amazon-bedrock-legacy.md)
