# Model Catalog

Remotely hosted JSON manifest that drives the curated model picker lists for OpenRouter and Nous Portal, so lists can change without a new `hermes-agent` release.

## Signature / Usage

Live manifest URL: `https://hermes-agent.nousresearch.com/docs/api/model-catalog.json`

```json
{
  "version": 1,
  "updated_at": "2026-04-25T22:00:00Z",
  "metadata": {},
  "providers": {
    "openrouter": {
      "metadata": {},
      "models": [
        {"id": "z-ai/glm-5.2",         "description": "default", "default": true},
        {"id": "moonshotai/kimi-k3",   "description": "recommended", "metadata": {}},
        {"id": "openai/gpt-5.4",       "description": ""}
      ]
    },
    "nous": {
      "metadata": {},
      "models": [
        {"id": "z-ai/glm-5.2", "default": true},
        {"id": "anthropic/claude-opus-4.7"},
        {"id": "moonshotai/kimi-k3"}
      ]
    }
  }
}
```

Config (`config.yaml`):

```yaml
model_catalog:
  enabled: true
  url: https://hermes-agent.nousresearch.com/docs/api/model-catalog.json
  ttl_minutes: 20
  providers: {}
```

## Options / Props

| Field | Description |
|-------|-------------|
| `version` | Integer schema version; unknown versions are refused and Hermes falls back to the in-repo snapshot |
| `metadata` | Free-form dict at manifest, provider, and model level; unknown fields are ignored |
| `description` | OpenRouter only; picker badge text (`recommended`, `free`, `default`, or empty) |
| `default` | At most one entry per provider; the silent default used when the user never selected a model (read cache-only at runtime) |

| Config key | Description |
|------------|-------------|
| `enabled` | `false` disables remote fetch (and the gateway background refresh) |
| `url` | Manifest URL |
| `ttl_minutes` | Cache lifetime and gateway refresh cadence (default 20; legacy `ttl_hours` still honoured) |
| `providers.<name>.url` | Per-provider override manifest URL (same schema; only needs its own provider block) |
| `excluded_providers` | List of providers hidden from every `/model` picker surface (matched case-insensitively) |

Fetch behaviour: `/model` or `hermes model` fetches only when the disk cache is stale; network failure falls back to cache, then to the in-repo snapshot; a manifest failing schema validation is treated as unreachable. Cache file: `~/.hermes/cache/model_catalog.json`.

## Notes

- Pricing and context length are not in the manifest; they come from live provider APIs (`/v1/models`, models.dev).
- GUI pickers read `~/.hermes/provider_models_cache.json` and refresh in the background; `/model --refresh` busts the cache and probes every provider live.
- Maintainers regenerate the manifest with `python scripts/build_model_catalog.py`, then PR `website/static/api/model-catalog.json`.
- Model IDs above are copied from the schema example in the docs, not a current recommendation.
- Source pin: Hermes Agent docs at release tag v0.22.2.

## Related

- [Environment Variables](./environment-variables.md)
