<!-- source: https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock / last verified: 2026-08-07 -->

# Claude in Amazon Bedrock (Opus 4.7 and later)

AWS-operated Messages API endpoint (`/anthropic/v1/messages`) for Claude, with AWS-native auth/billing/security and zero Anthropic operator access. Serves current models (Opus 4.7+); older Bedrock model access uses the legacy `InvokeModel`/`Converse` integration (see claude-on-amazon-bedrock-legacy.md).

## Signature / Usage

```python
from anthropic import AnthropicBedrockMantle

client = AnthropicBedrockMantle(aws_region="us-east-1")

message = client.messages.create(
    model="anthropic.claude-opus-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
)
```

```bash
curl https://bedrock-mantle.us-east-1.api.aws/anthropic/v1/messages \
  --aws-sigv4 "aws:amz:us-east-1:bedrock-mantle" \
  --user "$AWS_ACCESS_KEY_ID:$AWS_SECRET_ACCESS_KEY" \
  -H "x-amz-security-token: $AWS_SESSION_TOKEN" \
  -H "anthropic-version: 2023-06-01" \
  -d '{"model": "anthropic.claude-opus-5", "max_tokens": 1024, "messages": [{"role":"user","content":"Hello, Claude"}]}'
```

## Options / Props

| Model | Model ID | Access |
|---|---|---|
| Claude Fable 5 | `anthropic.claude-fable-5` | Open |
| Claude Opus 5 | `anthropic.claude-opus-5` | Per model access console |
| Claude Opus 4.8 / 4.7 | `anthropic.claude-opus-4-8` / `-4-7` | Open |
| Claude Sonnet 5 | `anthropic.claude-sonnet-5` | Open |
| Claude Haiku 4.5 | `anthropic.claude-haiku-4-5` | Open |
| Claude Mythos Preview | `anthropic.claude-mythos-preview` | Invitation only |

Install: `pip install -U "anthropic[bedrock]"` / `npm install @anthropic-ai/bedrock-sdk`.

## Notes

- Three auth paths: Bedrock service role (recommended), IAM assumed roles (12h max session), bearer tokens (12h max, least preferred).
- Supported: Messages API, prompt caching, thinking, tool use (bash/computer use/memory/text editor), citations, structured outputs.
- Not supported: URL image/document sources, Files API, server-side tools (code execution, web search/fetch, advisor), Agent Skills, MCP connector, programmatic tool calling, Message Batches/Models/Admin/Compliance/Usage APIs, Claude Managed Agents, server-side fallback.
- Global endpoint (dynamic routing, no premium) vs regional endpoint (single-region, 10% pricing premium); inference profiles route across a geography (US/EU/JP/AU).
- Default quota: 2M input TPM (up to 4M without extra approval).
- Claude Code からの Bedrock/Vertex/Foundry 利用は anthropic-claude-code-deploy スキルを参照。

## Related

- [claude-on-amazon-bedrock-legacy.md](./claude-on-amazon-bedrock-legacy.md)
- [claude-platform-on-aws.md](./claude-platform-on-aws.md)
