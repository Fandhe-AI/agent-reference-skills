# ai-gateway

| Name | Description | Path |
|------|-------------|------|
| AI Gateway Overview | Features and endpoint pattern of AI Gateway | [overview.md](./overview.md) |
| Getting started | First request, account ID and token, provider auth options | [get-started.md](./get-started.md) |
| Header Glossary | All `cf-aig-*` request and response headers | [header-glossary.md](./header-glossary.md) |
| Authenticated Gateway | Require a Cloudflare token per request; `cf-aig-authorization` | [configuration-authentication.md](./configuration-authentication.md) |
| BYOK (Store Keys) | Store provider keys in Secrets Store; key aliases | [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md) |
| Cloudflare Access | Identity-aware access to a gateway on a custom domain | [configuration-cloudflare-access.md](./configuration-cloudflare-access.md) |
| Custom costs | Override model costs per request | [configuration-custom-costs.md](./configuration-custom-costs.md) |
| Custom domains | Use your own hostname for the gateway | [configuration-custom-domains.md](./configuration-custom-domains.md) |
| Custom Providers | Register unsupported HTTPS providers | [configuration-custom-providers.md](./configuration-custom-providers.md) |
| Fallbacks | Fallback sequence on the Universal endpoint | [configuration-fallbacks.md](./configuration-fallbacks.md) |
| Manage gateways | Create, edit, delete gateways; default gateway; retries | [configuration-manage-gateway.md](./configuration-manage-gateway.md) |
| Request handling | Per-request timeouts and retries | [configuration-request-handling.md](./configuration-request-handling.md) |
| Evaluations (Deprecated) | Datasets and evaluators over logs | [evaluations.md](./evaluations.md) |
| Add human feedback | Thumbs up/down feedback via dashboard, API, or binding | [evaluations-human-feedback.md](./evaluations-human-feedback.md) |
| Auto Router | `cloudflare/auto` model selection and routing headers | [features-auto-router.md](./features-auto-router.md) |
| Caching | Cache responses, TTL, custom keys | [features-caching.md](./features-caching.md) |
| Data Loss Prevention (DLP) | Scan prompts and responses for sensitive data | [features-dlp.md](./features-dlp.md) |
| Dynamic routing | Route flows, JSON elements, calling `dynamic/<route>` | [features-dynamic-routing.md](./features-dynamic-routing.md) |
| Model aliases | `custom/<name>` model pools with default-order or smart routing | [features-model-aliases.md](./features-model-aliases.md) |
| Guardrails | Harmful-content checks with Llama Guard | [features-guardrails.md](./features-guardrails.md) |
| Machine Payments (x402) | Pay for inference from a stablecoin wallet | [features-machine-payments.md](./features-machine-payments.md) |
| Rate limiting | Fixed or sliding request limits | [features-rate-limiting.md](./features-rate-limiting.md) |
| Spend limits | Cost budgets by model, provider, or metadata | [features-spend-limits.md](./features-spend-limits.md) |
| Unified Billing | Prepaid credits, credential precedence, ZDR | [features-unified-billing.md](./features-unified-billing.md) |
| Analytics | Dashboard metrics and GraphQL query | [observability-analytics.md](./observability-analytics.md) |
| Costs | Estimated token cost metrics | [observability-costs.md](./observability-costs.md) |
| Custom metadata | Tag requests with `cf-aig-metadata` | [observability-custom-metadata.md](./observability-custom-metadata.md) |
| Log classification | Task and model-fit classification of logs | [observability-log-classification.md](./observability-log-classification.md) |
| Logging | Log collection and per-request log headers | [observability-logging.md](./observability-logging.md) |
| Legacy Logs | Log storage and API for pre-September 24, 2026 gateways | [observability-legacy-logs.md](./observability-legacy-logs.md) |
| Logpush | Export encrypted logs and decrypt them | [observability-logpush.md](./observability-logpush.md) |
| OpenTelemetry | Export trace spans to OTLP backends | [observability-otel-integration.md](./observability-otel-integration.md) |
| User Insights | Per-identity spend and anomaly detection | [observability-user-insights.md](./observability-user-insights.md) |
| Audit logs | Gateway configuration change records | [reference-audit-logs.md](./reference-audit-logs.md) |
| Limits | Gateway, log, Logpush, and DLP limits | [reference-limits.md](./reference-limits.md) |
| Pricing | Pricing for logs, DLP, Guardrails, Unified Billing | [reference-pricing.md](./reference-pricing.md) |
| Troubleshooting | Auth, credential, caching, and failure issues | [reference-troubleshooting.md](./reference-troubleshooting.md) |
| Unified API (OpenAI compat) | `/compat/chat/completions` endpoint | [usage-chat-completion.md](./usage-chat-completion.md) |
| REST API | `/ai/run`, `/ai/v1/chat/completions`, `/responses`, `/messages` | [usage-rest-api.md](./usage-rest-api.md) |
| Universal Endpoint (Deprecated) | Array-of-providers endpoint with fallbacks | [usage-universal-endpoint.md](./usage-universal-endpoint.md) |
| Web Search | Provider-native web search through the gateway | [usage-web-search.md](./usage-web-search.md) |
| WebSockets API | Realtime and non-realtime WebSocket access | [usage-websockets-api.md](./usage-websockets-api.md) |
| Workers Bindings (env.AI) | `env.AI.run()`, gateway methods, options | [usage-worker-binding-methods.md](./usage-worker-binding-methods.md) |
| Provider endpoints overview | Slugs, URL patterns, auth headers for all providers | [usage-providers-overview.md](./usage-providers-overview.md) |
| OpenAI-compatible providers | OpenAI, Azure OpenAI, Groq, Mistral, DeepSeek, and more | [usage-providers-openai-compatible.md](./usage-providers-openai-compatible.md) |
| Anthropic, Bedrock, Vertex, AI Studio | Claude and Gemini provider endpoints and auth | [usage-providers-anthropic-bedrock-vertex-gemini.md](./usage-providers-anthropic-bedrock-vertex-gemini.md) |
| Other providers | Workers AI, Cohere, HuggingFace, Replicate, media, search | [usage-providers-others.md](./usage-providers-others.md) |
| Workers AI binding tutorial | Worker with AI binding and gateway | [integrations-workers-ai-binding.md](./integrations-workers-ai-binding.md) |
| AI SDK and Pi AI | `createAI` from the Agents SDK | [integrations-ai-sdks.md](./integrations-ai-sdks.md) |
| Coding agents | Claude Code, Codex, OpenCode, Copilot CLI, Gemini CLI, Pi | [integrations-coding-agents.md](./integrations-coding-agents.md) |
| Desktop and IDE clients | Claude Desktop, Cursor, VS Code, Xcode, Android Studio | [integrations-ide-clients.md](./integrations-ide-clients.md) |
