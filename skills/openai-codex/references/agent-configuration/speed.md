# Speed

Fast mode and Codex-Spark increase Codex's effective throughput, trading credit consumption for lower latency.

## Signature / Usage

```text
/fast on
/fast off
/fast status
```

```toml
# config.toml
service_tier = "fast"
[features]
fast_mode = true
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `/fast on` \| `/fast off` \| `/fast status` | CLI command | Change or inspect the current Fast mode setting. |
| `service_tier = "fast"` | config.toml | Persists Fast mode as the default. |
| `[features].fast_mode` | boolean (config.toml) | Enables Fast mode alongside `service_tier`. |

## Notes

- Fast mode increases supported model speed by 1.5x and consumes credits at a higher rate than Standard mode. It currently supports GPT-5.6, GPT-5.5, and GPT-5.4: GPT-5.6/5.5 consume credits at 2.5x the Standard rate, GPT-5.4 at 2x.
- Fast mode is available in the ChatGPT desktop app, Codex CLI, and IDE extension when signed in with ChatGPT. It is a ChatGPT credit feature; with an API key, Codex uses API token pricing instead and ChatGPT credit multipliers don't apply. API Priority processing has its own billing rate (2x Standard API token rate for GPT-5.6).
- Codex-Spark (`gpt-5.3-codex-spark`) is a separate, less-capable model optimized for near-instant, real-time coding iteration — distinct from Fast mode, with its own usage limits. During research preview it is available only to ChatGPT Pro subscribers.
- ChatGPT Work and Codex share the same pricing, credits, and usage limits.

## Related

- [Subagents](./subagents.md)
