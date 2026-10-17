# Configuring Models

Hermes uses a main model slot (the agent's reasoning) and auxiliary model slots (side-jobs such as compression, vision, approval). Both are configured from the dashboard Models page, `/model`, `hermes model`, `config.yaml`, or a REST API.

## Signature / Usage

Main model written to `~/.hermes/config.yaml`:

```yaml
model:
  provider: openrouter
  default: anthropic/claude-opus-4.7
  base_url: ''        # cleared on provider switch
  api_mode: chat_completions
```

Auxiliary override (vision on gemini-flash):

```yaml
auxiliary:
  vision:
    provider: openrouter
    model: google/gemini-2.5-flash
    base_url: ''
    api_key: ''
    timeout: 120
    extra_body: {}
    download_timeout: 30
```

Slash command and CLI:

```
/model gpt-5.4 --provider openrouter             # session-only
/model gpt-5.4 --provider openrouter --global    # also persists to config.yaml
/model claude-opus-4.6 --once                    # next turn only, then auto-restores
```

```bash
hermes model            # Interactive provider + model picker (the canonical way to switch defaults)
hermes setup --portal   # log in and set Nous as provider in one command
hermes portal info
```

## Options / Props

Auxiliary task slots (11, each defaults to `provider: auto`, `model: ''` = use main model):

| Task | When to override |
|------|------------------|
| Title Gen | Pin a fast model, or `auxiliary.title_generation.prefer_fast_model: true` |
| Vision | Main model lacks vision (e.g. `google/gemini-2.5-flash`, `gpt-4o-mini`) |
| Compression | Avoid burning reasoning tokens on summarization |
| Approval | `approval_mode: smart` — fast/cheap model decides auto-approval |
| Web Extract | Heavy `web_extract` use |
| Skills Hub | `hermes skills search`; usually `auto` |
| MCP | MCP tool routing; usually `auto` |
| Triage Specifier | `hermes kanban specify` |
| Kanban Decomposer | Splits a triage task into child tasks |
| Profile Describer | `hermes profile describe --auto` |
| Curator | Curator skill-usage review pass |

Per-provider request options (`providers.<name>`):

| Key | Description |
|-----|-------------|
| `extra_headers` | Extra HTTP headers on every request to that provider's base URL (OpenAI-compatible and `anthropic_messages` routes; not `bedrock_converse`) |
| `session_affinity_header` | Header NAME carrying Hermes' conversation id; off unless set |
| `discover_models` | `false` skips `/models` listing and uses only configured `models` (default `true`) |
| `capabilities.openai_native_compaction` | `true` only for trusted OpenAI-compatible endpoints; payload goes to the configured `base_url` |
| `models.<id>.prompt_caching` | Opt a model alias into (or `false` out of) prompt-cache markers |
| `models.<id>.answer_in_reasoning` | Treat `reasoning` field as the answer (provider-level via `capabilities:`) |

```yaml
providers:
  my-gateway:
    api: https://llm.internal.example.com/v1
    api_key: sk-...
    extra_headers:
      CF-Access-Client-Id: "xxxx.access"
      CF-Access-Client-Secret: "yyyy"
```

Task-specific fallback chain:

```yaml
auxiliary:
  title_generation:
    provider: auto
    model: ''
    fallback_chain:
      - provider: openrouter
        model: inclusionai/ring-2.6-1t:free
```

Mid-session switch confirmation:

```yaml
model:
  switch_context_confirm_tokens: 100000   # 0 disables
```

Nous Portal Claude wire:

```yaml
nous:
  anthropic_wire: chat     # default. "native" = the Anthropic Messages wire; "auto" = decide per session
```

Custom aliases:

```yaml
model_aliases:
  fav:
    model: claude-sonnet-4.6
    provider: anthropic
  theta:
    model: theta-1
    provider: custom
    base_url: "https://theta.example.com/v1"
    key_env: THETA_API_KEY        # or: api_key: "${THETA_API_KEY}"
```

```bash
hermes config set model.aliases.fav anthropic/claude-opus-4.6
```

REST API (dashboard; header `X-Hermes-Session-Token`):

```bash
curl -H "X-Hermes-Session-Token: $TOKEN" http://localhost:PORT/api/model/options
curl -H "X-Hermes-Session-Token: $TOKEN" http://localhost:PORT/api/model/auxiliary
curl -X POST -H "Content-Type: application/json" -H "X-Hermes-Session-Token: $TOKEN" \
  -d '{"scope":"main","provider":"openrouter","model":"anthropic/claude-opus-4.7"}' \
  http://localhost:PORT/api/model/set
```

## Notes

- Dashboard changes apply to new sessions only; use `/model` in an open chat to hot-swap. CLI: next `hermes chat`. Gateway: next new session (`hermes gateway restart` to force).
- A fresh install has `model: ""`; `hermes setup` / `hermes model` upgrades it to a mapping with `provider`, `default`, `base_url`, `api_mode`.
- `auto` for an auxiliary task tries the main model, then `auxiliary.<task>.fallback_chain`, then top-level `fallback_providers` / `fallback_model`. It never falls through to a provider you did not configure; the task is skipped with a warning.
- Mid-session model switches reset the prompt cache (the next message re-reads the whole conversation at full input price). Confirmation is requested when the session exceeds `model.switch_context_confirm_tokens`.
- `--once` breaks the prompt-cache prefix twice (out and back); may cost more in long cached sessions.
- `-contributor` models (vendor may train on prompts): non-interactive startups (Kanban workers, cron) fail closed unless `hermes config set security.allow_data_training_tiers_noninteractive true`; revoke with `hermes config unset ...`.
- Subscription speed: `agent.service_tier` is `normal`, `fast` or `ultrafast`. `GPT-6.1 Sol-900k` is a local context choice; the `-900k` suffix is removed from the model ID sent to OpenAI.
- `hermes model` also writes `agent.reasoning_effort` (and `auxiliary.<task>.reasoning_effort` / `delegation.reasoning_effort`).
- Legacy top-level `custom_providers:` (with `base_url`) is auto-migrated to the `providers:` dict on `hermes update` (config v12).
- `model_aliases:` entries take precedence over `model.aliases:`; user aliases shadow built-in short names. If an alias sets neither `api_key` nor `key_env`, the key resolves from the alias host, never from the previously active provider.
- The REST session token is injected into the dashboard HTML at startup and rotates on every server restart.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/configuring-models (v0.22.2 docs source)

## Related

- [Configuration](./configuration.md)
