# Fallback Providers

Automatic failover to backup LLM providers when the primary model is unavailable. Three resilience layers: credential pools (same-provider key rotation, tried first), primary model fallback (different provider:model), and auxiliary task fallback (independent resolution for side tasks).

## Signature / Usage

```bash
hermes fallback          # interactive manager; subcommands: add, list (ls), remove (rm), clear
```

```yaml
fallback_providers:
  - provider: openrouter
    model: anthropic/claude-sonnet-4
```

Each entry requires both `provider` and `model`; entries missing either are ignored. Custom OpenAI-compatible endpoint entry:

```yaml
fallback_providers:
  - provider: custom
    model: my-local-model
    base_url: http://localhost:8000/v1
    key_env: MY_LOCAL_KEY            # env var name containing the API key
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fallback_providers` | list | Top-level, current shape; tried in order. Written by `hermes fallback` |
| `fallback_model` | dict | Legacy single fallback; still honored, migrated on write. `fallback_providers` wins when both set |
| `fallback.min_switch_reset_seconds` | int, default `0` | A rate-limited primary whose declared reset is sooner than this many seconds is not swapped; retry backoff waits instead. `0` = always switch |
| `auxiliary.<task>.fallback_chain` | list | Per-task fallback policy. Entries need `provider`; `model`, `base_url`, `api_key`, `timeout` (seconds) optional |
| `delegation.fallback_providers` | list | Subagent fallback; `[]` disables |

Supported provider values (primary fallback): `ai-gateway`, `openrouter`, `nous`, `openai-codex`, `copilot`, `copilot-acp`, `anthropic`, `zai`, `kimi-coding`, `kimi-coding-cn`, `minimax`, `minimax-cn`, `minimax-oauth`, `deepseek`, `nvidia`, `gmi`, `upstage` (alias `solar`), `stepfun`, `ollama-cloud`, `gemini` (also `google`, `google-gemini`, `google-ai-studio`), `xai` (alias `grok`), `xai-oauth` (alias `grok-oauth`), `bedrock`, `qwen-oauth`, `opencode-zen`, `opencode-go`, `commandcode` (Claude via `commandcode-anthropic`), `kilocode`, `router` (Ramp Router), `xiaomi`, `arcee`, `nebius-token-factory`, `alibaba`, `alibaba-coding-plan`, `tencent-tokenhub`, `tencent-tokenplan`, `azure-foundry`, `lmstudio`, `llamacpp`, `huggingface`, `custom`, `moa` (Mixture of Agents preset; runs the whole preset).

## Auxiliary tasks

| Task | Config key |
|------|-----------|
| Vision | `auxiliary.vision` |
| Compression | `auxiliary.compression` |
| Skills Hub | `auxiliary.skills_hub` |
| MCP | `auxiliary.mcp` |
| Approval | `auxiliary.approval` |
| Title Generation | `auxiliary.title_generation` |
| Review | `auxiliary.review` |
| Triage Specifier | `auxiliary.triage_specifier` |

```yaml
auxiliary:
  vision:
    provider: glm
    model: glm-4v-flash
    fallback_chain:
      - provider: openrouter
        model: google/gemini-3-flash-preview
      - provider: nous
        model: anthropic/claude-sonnet-4
```

Auxiliary provider values: `auto` (default), `openrouter`, `nous`, `codex`, `main` (auxiliary only), `anthropic`, `llamacpp`. Setting `base_url` on a task bypasses provider resolution; `api_key` falls back to `OPENAI_API_KEY`, never `OPENROUTER_API_KEY`.

Auto chain with `provider: auto`: main provider + main model, then `auxiliary.<task>.fallback_chain`, then `fallback_providers` / `fallback_model`, then skip the task with a warning. Built-in discovery chains run only when no main provider is selected.

## Notes

- Triggers: HTTP 429 and 500/502/503 after exhausting retries; 401/403 and 404 immediately; repeated invalid or empty responses.
- Fallback is turn-scoped: each new user message restores the primary; at most one activation per turn. It is reset-aware for long rate-limit resets (the primary is skipped until the reset passes).
- Fallback resets the prompt cache: the new provider:model has no cached prefix, so the next request re-reads full history at full input price.
- No environment variables exist for the primary chain; configure via `config.yaml` or `hermes fallback`.
- Explicit auxiliary provider: capacity errors (402, daily-quota 429, connection failure) walk primary aux provider, then `fallback_chain`, then main agent model, then warn and re-raise. Transient 429s with `Retry-After` do not trigger fallback. 401 walks only `fallback_chain`.
- Legacy migration: `compression.summary_model` / `summary_provider` / `summary_base_url` migrate to `auxiliary.compression.*` (config version 17). If no provider is available for compression, middle turns are dropped without a summary.
- Cron: unpinned jobs inherit the chain; a job with its own provider/model/base_url never falls back to it. Subagents inherit the parent chain unless pinned.
- A custom provider entry naming a `providers.<name>` block inherits its `transport` / `api_mode` unless the entry sets `api_mode` (alias `transport`).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/fallback-providers (pinned to v0.22.2)

## Related

- [Credential Pools](./credential-pools.md)
- [Provider Routing](./provider-routing.md)
- [Providers](./providers.md)
