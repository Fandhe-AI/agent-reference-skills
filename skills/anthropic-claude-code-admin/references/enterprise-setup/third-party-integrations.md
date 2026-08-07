<!-- source: https://code.claude.com/docs/en/third-party-integrations.md / last verified: 2026-08-07 -->

# Enterprise deployment overview

Learn how Claude Code can integrate with various third-party services and infrastructure to meet enterprise deployment requirements.

## Signature / Usage

```bash
# Amazon Bedrock via corporate proxy
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
export HTTPS_PROXY='https://proxy.example.com:8080'

# Amazon Bedrock via LLM gateway
export CLAUDE_CODE_USE_BEDROCK=1
export ANTHROPIC_BEDROCK_BASE_URL='https://your-llm-gateway.com/bedrock'
export CLAUDE_CODE_SKIP_BEDROCK_AUTH=1
```

## Options / Props

| Deployment option | Best for | Authentication |
| --- | --- | --- |
| Claude for Teams/Enterprise | Most organizations (recommended) | Claude.ai SSO or email |
| Anthropic Console | Individual developers | API key |
| Amazon Bedrock | AWS-native deployments | API key or AWS credentials |
| Claude Platform on AWS | AWS Marketplace billing | API key or AWS credentials |
| Google Cloud's Agent Platform | GCP-native deployments | GCP credentials |
| Microsoft Foundry | Azure-native deployments | API key or Microsoft Entra ID |

## Notes

- Corporate proxy (`HTTPS_PROXY`/`HTTP_PROXY`) and LLM gateway (`ANTHROPIC_BASE_URL`, `ANTHROPIC_BEDROCK_BASE_URL`, `ANTHROPIC_VERTEX_BASE_URL`, `ANTHROPIC_FOUNDRY_BASE_URL`) are independent configurations that can be combined.
- Pin model versions for cloud providers via `ANTHROPIC_DEFAULT_OPUS_MODEL`/`ANTHROPIC_DEFAULT_SONNET_MODEL`/`ANTHROPIC_DEFAULT_HAIKU_MODEL`/`ANTHROPIC_DEFAULT_FABLE_MODEL`; without pinning, model aliases resolve to Claude Code's built-in default, which can lag or be unavailable in your account.
- `/status` verifies proxy/gateway configuration, showing lines like `API provider`, `Bedrock base URL`, `AWS region`, `AWS auth skipped`, and `Proxy`.
- Best practices: deploy organization-wide CLAUDE.md at system directories, simplify install with a "one click" setup, configure security policies via managed permissions, centralize MCP server config in a checked-in `.mcp.json`.

## Related

- [admin-setup](./admin-setup.md)
- [network-config](./network-config.md)
- [platforms](./platforms.md)
