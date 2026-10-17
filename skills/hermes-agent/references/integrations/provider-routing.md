# Provider Routing

When using OpenRouter as the LLM provider, Hermes Agent supports provider routing: fine-grained control over which underlying AI providers (e.g. Anthropic, Google, AWS Bedrock, Together AI) handle requests and how they are prioritized.

## Signature / Usage

```yaml
provider_routing:
  sort: "price"           # How to rank providers
  only: []                # Whitelist: only use these providers
  ignore: []              # Blacklist: never use these providers
  order: []               # Explicit provider priority order
  require_parameters: false  # Only use providers that support all parameters
  data_collection: null   # Control data collection ("allow" or "deny")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `sort` | `"price"` / `"throughput"` / `"latency"` | `price` = cheapest first; `throughput` = fastest tokens-per-second; `latency` = lowest time-to-first-token |
| `only` | list of provider slugs | Whitelist. Only these providers are used. Use the lowercase slug shown by OpenRouter |
| `ignore` | list of provider names | Blacklist. Never used, even if cheapest or fastest |
| `order` | list of provider slugs | Explicit priority; listed first are preferred, unlisted providers are fallbacks |
| `require_parameters` | bool | When `true`, only route to providers supporting all request parameters (`temperature`, `top_p`, `tools`, ...). Avoids silent parameter drops |
| `data_collection` | `"allow"` / `"deny"` | Whether providers may use prompts for training |
| `models` | map of model id to the same keys | Per-model overrides; unset keys fall through to the flat defaults |

Per-model overrides:

```yaml
provider_routing:
  sort: "price"                      # applies to every model
  models:
    "openai/gpt-6-astra":
      only: ["openai"]               # never let a reseller serve this one
    "anthropic/claude-fable-5.1":
      only: ["anthropic"]
    "moonshotai/kimi-k2.6":
      order: ["moonshotai", "together"]
      sort: "throughput"
```

## Notes

- Applies only when using OpenRouter. No effect on Nous Portal (which decides routing centrally; Hermes never sends the `provider` object to Portal, so `provider_routing` is ignored) or direct provider connections.
- Per-model matching is spelling-tolerant like `agent.reasoning_overrides` (`claude-fable-5.1` / `claude-fable-5-1`, with or without the `openrouter/` prefix). The override follows the model the agent is currently on (`/model` switches, fallback activation, cron jobs, delegated subagents). Edit `config.yaml` directly for these keys: model ids contain dots, which `hermes config set` reads as path separators.
- Preferences are passed on agent chat requests and iteration-limit summaries via `extra_body.provider` (becomes the top-level `provider` object in the JSON request). Auxiliary tasks such as compression and title generation are configured independently under `auxiliary.<task>.extra_body`.
- Internal parameter mapping: `providers_allowed` from `only`, `providers_ignored` from `ignore`, `providers_order` from `order`, `provider_sort` from `sort`, `provider_require_parameters`, `provider_data_collection`.
- Shortcuts (from the Providers page): append `:nitro` to a model name for throughput sorting, `:floor` for price sorting.
- With no `provider_routing` section the aggregator uses its own default routing.
- Provider routing controls sub-providers behind OpenRouter; for failover to a different provider see Fallback Providers.

## Related

- [Providers](./providers.md)
- [Fallback Providers](./fallback-providers.md)
- [Credential Pools](./credential-pools.md)
