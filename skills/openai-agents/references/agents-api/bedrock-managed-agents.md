# Bedrock Managed Agents

Amazon Bedrock Managed Agents, powered by OpenAI, adapts the Agents API for AWS. The OpenAI agent harness and model inference run in Amazon Bedrock; Amazon Bedrock AgentCore Runtime or self-hosted compute runs commands and tools.

## Signature / Usage

Comparison with the OpenAI Agents API:

| Area | OpenAI Agents API | Bedrock Managed Agents |
|------|-------------------|------------------------|
| Agent loop | Managed by OpenAI | Hosted in Amazon Bedrock |
| Model inference | OpenAI API | Amazon Bedrock |
| API endpoint | OpenAI API | Amazon Bedrock service endpoint |
| Execution environment | OpenAI-hosted sandbox, self-hosted sandbox, or no sandbox | AgentCore Runtime or self-hosted compute |
| API authentication | OpenAI project API key | AWS IAM credentials with SigV4 signing |

## Notes

- Choosing a self-hosted sandbox with the OpenAI Agents API changes only where commands and tools run; the managed harness and model inference still use the OpenAI service.
- Shared concepts do not imply identical API contracts or feature availability. Before adapting OpenAI Agents API examples, check AWS guidance for the current Bedrock Managed Agents endpoint, supported models, tools, and environment configuration. Check AWS documentation for access requirements, Regions, permissions, limits, pricing, and data handling.
- The OpenAI docs page carries no code examples. For Responses and other OpenAI platform APIs on Bedrock see the separate OpenAI-on-Amazon-Bedrock guide.
- Source: https://developers.openai.com/api/docs/guides/agents-api/bedrock-managed-agents (fetched 2026-10).

## Related

- [Agents API](./overview.md)
- [Agents API Quickstart](./quickstart.md)
- [Provider: AWS Lambda MicroVMs](./provider-aws.md)
