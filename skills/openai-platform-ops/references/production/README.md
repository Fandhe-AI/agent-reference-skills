# production

| Name | Description | Path |
|------|-------------|------|
| Safety best practices | Moderation API, adversarial testing, HITL, KYC, input/output constraints, safety identifiers | [safety-best-practices.md](./safety-best-practices.md) |
| Moderation | `omni-moderation-latest` API for classifying harmful text/image content | [moderation.md](./moderation.md) |
| Safety checks | Automated safety classifier process, warning/suspension flow for GPT-5+ models | [safety-checks.md](./safety-checks.md) |
| Safety in building agents | Prompt injection & private data leakage risks and mitigations for Agent Builder workflows | [agent-builder-safety.md](./agent-builder-safety.md) |
| Cybersecurity checks | Automated safeguards for High Cybersecurity Capability models (`cyber_policy` errors) | [cybersecurity-checks.md](./cybersecurity-checks.md) |
| Production best practices | Org setup, billing, API key security, scaling, latency/cost summary, MLOps | [production-best-practices.md](./production-best-practices.md) |
| API deployment checklist | GPT-5.6 rollout checklist: model choice, reasoning effort, verbosity, tool search, compaction, prompt caching, background mode, WebSocket mode | [deployment-checklist.md](./deployment-checklist.md) |
| Production notes on GPT Actions | Rate limits, timeouts, TLS, OpenAPI spec limits, `x-openai-isConsequential` | [gpt-actions-production.md](./gpt-actions-production.md) |
| Cost optimization | Reduce requests/tokens, model selection, Batch API, Flex processing | [cost-optimization.md](./cost-optimization.md) |
| Model optimization | Evals + prompt engineering + fine-tuning flywheel; SFT/DPO/RFT/vision fine-tuning methods | [model-optimization.md](./model-optimization.md) |
| Latency optimization | Seven principles for reducing LLM application latency, with a worked example | [latency-optimization.md](./latency-optimization.md) |
| Managing costs (Realtime API) | Token billing model and cost-reduction strategies for Realtime voice sessions | [realtime-costs.md](./realtime-costs.md) |
| Fast mode | `service_tier: "fast"` opt-in for up to 2.5x lower latency, ramp rate limits | [fast-mode.md](./fast-mode.md) |
