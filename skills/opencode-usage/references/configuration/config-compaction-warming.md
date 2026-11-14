---
source: https://opencode.ai/docs/config/#compaction
---

# Config: Compaction and Warming

Config keys for automatic context compaction and for keeping model caches warm.

## Signature / Usage

### Compaction

Control automatic context compaction and how much recent context it preserves.

```jsonc
{
  "compaction": {
    "auto": true,
    "keep": {
      "tokens": 15000,
    },
    "buffer": "15%",
  },
}
```

`buffer` is the share of the model's context window kept free before automatic compaction starts.

Local summaries remain the default. Opt into native provider compaction for both
automatic and manual requests with a provider or model policy:

```jsonc
{
  "providers": {
    "openai": {
      "settings": { "compaction": { "type": "native" } },
      "models": {
        "gpt-6.1-sol": { "settings": { "compaction": { "type": "summary" } } },
      },
    },
  },
}
```

A model setting overrides the provider setting. Automatic compaction uses the
selected model's usable input budget. Provider checkpoints keep recent user messages within the same
`compaction.keep.tokens` budget that local summaries use for their retained tail.
Top-level `compaction.auto: false` disables new automatic compaction without
discarding installed checkpoints. See the [compaction guide](https://opencode.ai/docs/compaction/) for
budgeting and overflow recovery.

### Warming

Keep recently active model sessions warm with periodic transient requests.
Warming is disabled by default; set it to `true` to warm just before each
model's cache expires, for up to 30 minutes.

```jsonc
{
  "warming": {
    "prompt": "Do not perform any work. Reply with exactly: OK",
    "interval": "auto",
    "duration": "30 minutes",
  },
}
```

A provider's or model's `settings.cache.warming` overrides it, and
`settings.cache.ttl` sets how long the provider keeps the cache. See the
[warming guide](https://opencode.ai/docs/warming/) for request behavior, customization, and cost
considerations, and [cache lifetime](https://opencode.ai/docs/models/#cache-lifetime) for `cache.ttl`.

## Related

- [config-integrations.md](./config-integrations.md)
- [config-experimental.md](./config-experimental.md)
