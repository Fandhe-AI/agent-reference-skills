# Credential Pools

Register multiple API keys or OAuth tokens for the same provider. When one key hits a rate limit or billing quota, Hermes rotates to the next healthy key without switching providers. Pools are tried first; if all keys are exhausted, the fallback provider activates.

## Signature / Usage

```bash
# Add a second OpenRouter key
hermes auth add openrouter --api-key sk-or-v1-your-second-key

# Add an Anthropic OAuth credential (requires Claude Max plan + extra usage credits)
hermes auth add anthropic --type oauth

hermes auth list
```

```yaml
credential_pool_strategies:
  openrouter: round_robin
  anthropic: least_used
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `hermes auth` | Interactive pool management wizard |
| `hermes auth list` / `hermes auth list <provider>` | Show all pools / one provider's pool |
| `hermes auth add <provider>` | Add a credential (prompts for type and key) |
| `hermes auth add <provider> --type api-key --api-key <key>` | Add an API key non-interactively |
| `hermes auth add <provider> --type oauth` | Add an OAuth credential via browser login |
| `hermes auth add openai-codex --browser` | Codex: browser authorization-code + PKCE flow on `localhost:1455` instead of device code; falls back to device code when the port is busy. Default for every Codex login via `auth.codex_login_flow: browser` |
| `hermes auth add <provider> --priority 0` | Add and place first in `fill_first` order |
| `hermes auth priority <provider> <target> <n>` | Move a credential to priority `n` (0 = tried first); others renumbered |
| `hermes auth remove <provider> <index>` | Remove by 1-based index |
| `hermes auth reset <provider>` | Clear all cooldowns/exhaustion (applies to running sessions too) |
| `hermes auth reset <provider> <target>` | Clear one credential's cooldown by index, id, or label |
| `hermes auth refresh <provider> [target]` | Refresh one OAuth credential's tokens and return it to rotation |

## Rotation Strategies

| Strategy | Behavior |
|----------|----------|
| `fill_first` (default) | Use the first healthy key until exhausted, then the next; order is each credential's `priority` |
| `round_robin` | Cycle evenly, rotating after each selection |
| `least_used` | Pick the key with the lowest request count |
| `random` | Random among healthy keys |

## Error Recovery

| Error | Behavior | Cooldown |
|-------|----------|----------|
| 429 Rate Limit | Retry same key once (transient). Second consecutive 429 rotates | 1 hour |
| 402 Billing/Quota | Immediately rotate | 1 hour |
| 401 Auth Expired | Try refreshing the OAuth token first; rotate only if refresh fails | 5 minutes |
| 400 Codex model entitlement | Bench this key for the rejected model only and rotate; other 400s never rotate | Until `hermes auth reset` (per model) |
| All keys exhausted | Fall through to `fallback_model` if configured | - |

Provider-supplied `reset_at` timestamps override default cooldowns.

## Auto-Discovery

| Source | Example | Auto-seeded |
|--------|---------|-------------|
| Environment variables | `OPENROUTER_API_KEY`, `ANTHROPIC_API_KEY` | Yes |
| Numbered env siblings | `OPENROUTER_API_KEY_2`, `_3`, ... | Yes (stops at first missing number) |
| OAuth tokens (auth.json) | Codex device code, Nous device code | Yes |
| Claude Code credentials | `~/.claude/.credentials.json` | Yes (Anthropic) |
| Hermes PKCE OAuth | `~/.hermes/auth.json` | Yes (Anthropic) |
| Custom endpoint config | `model.api_key` in config.yaml | Yes |
| Manual entries | `hermes auth add` | Persisted in auth.json |

## Storage

Pool state lives in `~/.hermes/auth.json` under `credential_pool`; strategies in `config.yaml`. Custom endpoint pools use a `custom:` key prefix (e.g. `custom:together.ai`).

```json
{
  "version": 1,
  "credential_pool": {
    "openrouter": [
      {
        "id": "abc123",
        "label": "OPENROUTER_API_KEY",
        "auth_type": "api_key",
        "priority": 0,
        "source": "env:OPENROUTER_API_KEY",
        "last_status": "ok",
        "request_count": 142
      }
    ]
  }
}
```

## Notes

- Key rotation resets the prompt cache: provider-side caches are scoped to the account/API key, so each rotation costs one full-price pass over the context on long conversations.
- Mainly for API-key providers; a single Nous Portal OAuth covers 300+ models, so most Portal users need no pool.
- Plan/usage-limit 429s (e.g. ChatGPT/Codex "usage limit reached") rotate immediately with no retry. HTTP 200 with `response.status: failed` is handled by the same rules keyed on the embedded error.
- Anthropic 429s are per model: one model's 429 cools the credential for that model only; 402 and 401 bench the whole credential.
- A dead OAuth login (`invalid_grant`, `invalid_token`, `refresh_token_reused`) is marked `dead` and leaves rotation until you re-login with `hermes auth add <provider>`; it never re-enters on a timer. For Codex, run `hermes auth add openai-codex` in that home (`hermes -p <profile> auth add openai-codex` for a named profile).
- Two logins of the same OpenAI account share one token family, so the second adds no quota; Hermes warns at add time.
- Delegated subagents share the parent's pool for the same provider; different provider loads that provider's own pool.
- Env-borrowed secrets are reference-only at the `auth.json` boundary (metadata and a non-reversible fingerprint persisted, not the raw key); manual and Hermes-owned OAuth entries keep durable tokens. Auto-seeded entries are pruned when the env var is removed; manual entries are never auto-pruned.
- OAuth refreshes across processes are serialized through a file lock on `auth.json`.
- Implementation modules: `agent/credential_pool.py`, `agent/credential_pool_admin.py`, `agent/credential_pool_model_cooldowns.py`, `hermes_cli/auth_commands.py`, `hermes_cli/runtime_provider.py`, `agent/turn_api_error.py`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/credential-pools (pinned to v0.22.2)

## Related

- [Fallback Providers](./fallback-providers.md)
- [Providers](./providers.md)
- [Provider Routing](./provider-routing.md)
