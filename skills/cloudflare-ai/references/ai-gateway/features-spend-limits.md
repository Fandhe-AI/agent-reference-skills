---
source: https://developers.cloudflare.com/ai-gateway/features/spend-limits/
---

# Spend limits

Cost-based budgets per gateway over a time window, scoped by provider, model, or custom metadata. When a budget is reached, requests get `429` until the window resets.

## Signature / Usage

The official page has no code; rules are configured in the dashboard (gateway > **Settings** > **Spend limits**) or the API. Requests are scoped via metadata sent in a header:

Snippet taken from https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --header 'cf-aig-metadata: {"user_id": "user-123"}' \
  --data '{"model": "gpt-4o-mini", "messages": [{"role": "user", "content": "Hi"}]}'
```

## Options / Props

### Dimensions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| provider | dimension | not set | Limit by provider |
| model | dimension | not set | Limit by model |
| metadata key (e.g. `agent_id`, `cf.user_id`) | dimension | not set | Limit by a custom metadata key |

Each dimension is either **Split by value** (independent bucket per distinct value) or **Filter by value** (rule applies only when equal to a value). An unconfigured dimension shares one bucket across all values.

### Examples (request model `openai/gpt-5.5`, `agent_id` = `agent_42`)

| Scenario | Dimensions | Bucket |
|----------|------------|--------|
| Global | None | One shared bucket |
| Per-agent | `agent_id` split | One per agent |
| Per-provider, per-agent | `agent_id` split, `provider` split | One per agent+provider |
| Specific model | `model` filter `openai/gpt-5.5` | Only that model |
| Per-agent, per-model | `agent_id` split, `model` split | One per agent+model |

## Notes

- Applies to Unified Billing and BYOK requests for models with known pricing. Cost is computed from token usage and model pricing; it is best-effort, so check your provider dashboard for exact billing.
- All applicable rules are evaluated before the request goes to the provider; any rule over budget blocks it (`429`). Eventually consistent: cost is recorded after completion, so concurrent bursts can briefly exceed the limit. Maximum 20 rules per gateway.
- Per-user budgets: behind Cloudflare Access the reserved `cf.user_id` metadata key (Access JWT `sub`) is added automatically (only on Access-protected custom domains, not service tokens); add a metadata dimension `cf.user_id` set to Split by value. Without Access, pass your own `user_id` metadata and split by it. Only trust metadata identifiers you set server-side.
- When exceeded: block (default), or fall back to a cheaper model by creating a Dynamic Route with a primary model and fallback and setting the spend limit on the primary model.
- Track spend in the Analytics dashboard.

## Related

- [features-rate-limiting.md](./features-rate-limiting.md)
- [observability-custom-metadata.md](./observability-custom-metadata.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
- [configuration-cloudflare-access.md](./configuration-cloudflare-access.md)
- [observability-analytics.md](./observability-analytics.md)
