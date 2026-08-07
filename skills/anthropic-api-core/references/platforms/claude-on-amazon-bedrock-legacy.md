<!-- source: https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock-legacy / last verified: 2026-08-07 -->

# Claude on Amazon Bedrock (Opus 4.6 and earlier)

The legacy Amazon Bedrock integration using `InvokeModel`/`Converse` APIs with ARN-versioned model IDs and AWS event-stream encoding. Claude Opus 5, Sonnet 5, Fable 5, Opus 4.8, and Opus 4.7 are instead reachable through `InvokeModel` on the same infrastructure as claude-in-amazon-bedrock.md (use that page's Messages API shape/feature parity for those models).

## Signature / Usage

```python
from anthropic import AnthropicBedrock

client = AnthropicBedrock(aws_region="us-west-2")  # or aws_access_key/aws_secret_key/aws_session_token

message = client.messages.create(
    model="global.anthropic.claude-opus-4-6-v1",
    max_tokens=256,
    messages=[{"role": "user", "content": "Hello, world"}],
)
```

```python
# boto3
import boto3, json
bedrock = boto3.client(service_name="bedrock-runtime")
body = json.dumps({"max_tokens": 256, "messages": [{"role": "user", "content": "Hello, world"}], "anthropic_version": "bedrock-2023-05-31"})
response = bedrock.invoke_model(body=body, modelId="global.anthropic.claude-opus-4-6-v1")
```

## Options / Props

Newer cross-region models require an **inference profile ID** (base model ID prefixed `global.`/`us.`/`eu.`/`jp.`/`apac.`) instead of the bare model ID, e.g. `us.anthropic.claude-sonnet-4-6`. Base IDs include `anthropic.claude-opus-4-6-v1`, `anthropic.claude-sonnet-4-6`, `anthropic.claude-sonnet-4-5-20250929-v1:0`, `anthropic.claude-haiku-4-5-20251001-v1:0`.

Install: `pip install -U "anthropic[bedrock]"` / `npm install @anthropic-ai/bedrock-sdk` / `pip install "boto3>=1.28.59"`.

## Notes

- Global endpoints: dynamic routing, no pricing premium. Regional endpoints (CRIS, prefix `us.`/`eu.`/etc.): guaranteed geographic routing, 10% pricing premium (Sonnet 4.5+ only; older models keep existing pricing).
- Supported/not-supported feature lists match claude-in-amazon-bedrock.md, plus: automatic (top-level) prompt caching is *not* supported here — use explicit `cache_control` breakpoints instead.
- PDF: visual analysis (charts/images/layout) via the Converse API requires citations enabled; without citations only basic text extraction works. Use InvokeModel for full control without forced citations.
- Bedrock limits request payloads to 20 MB.
- Bearer-token auth available via `AnthropicBedrock(api_key=...)` or the `AWS_BEARER_TOKEN_BEDROCK` env var.
- Claude Code からの Bedrock/Vertex/Foundry 利用は anthropic-claude-code-deploy スキルを参照。

## Related

- [claude-in-amazon-bedrock.md](./claude-in-amazon-bedrock.md)
- [claude-platform-on-aws.md](./claude-platform-on-aws.md)
