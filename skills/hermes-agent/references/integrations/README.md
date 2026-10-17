# integrations

| Name | Description | Path |
|------|-------------|------|
| ACP (Agent Context Protocol) | Hermes Agent can run as an ACP server (upstream title: "ACP Host Integration"), letting ACP-compatible hosts (VS Code, Zed, JetBrains, Buzz) talk to Hermes over stdio. | [acp.md](./acp.md) |
| API Server | Exposes hermes-agent as an OpenAI-compatible HTTP endpoint. | [api-server.md](./api-server.md) |
| Buzz Integration | Buzz is Block's open-source, self-hostable workspace where humans and AI agents share the same channels. | [buzz.md](./buzz.md) |
| Credential Pools | Register multiple API keys or OAuth tokens for the same provider. When one key hits a rate limit or billing quota, Hermes rotates to the next healthy key without switching providers. | [credential-pools.md](./credential-pools.md) |
| Fallback Providers | Automatic failover to backup LLM providers when the primary model is unavailable. | [fallback-providers.md](./fallback-providers.md) |
| Honcho Memory | AI-native memory backend (Plastic Labs) that adds dialectic reasoning and deep user modeling on top of Hermes's built-in memory. | [honcho.md](./honcho.md) |
| Nous Portal | Nous Research's unified subscription gateway and the recommended way to run Hermes Agent. | [nous-portal.md](./nous-portal.md) |
| Integrations Overview | Hermes Agent connects to external systems for AI inference, tool servers, IDE workflows, programmatic access, and more. | [overview.md](./overview.md) |
| Provider Routing | When using OpenRouter as the LLM provider, Hermes Agent supports provider routing: fine-grained control over which underlying AI providers (e.g. Anthropic, Google, AWS Bedrock, Together AI) handle requests and how they are prioritized. | [provider-routing.md](./provider-routing.md) |
| Providers | LLM and model providers (upstream title: "LLM and Model Providers"): cloud APIs, self-hosted endpoints (Ollama, vLLM, SGLang, llama.cpp, LM Studio), gateways, and custom OpenAI-compatible endpoints. | [providers.md](./providers.md) |
