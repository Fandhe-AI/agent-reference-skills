# Provider Runtime

A shared provider runtime resolver maps provider/model selection to credentials, base URL and API mode for the CLI, gateway, cron jobs, ACP and auxiliary model calls.

## Signature / Usage

Primary implementation:

- `hermes_cli/runtime_provider.py` — credential resolution, custom-endpoint runtime resolution
- `hermes_cli/auth.py` — provider registry, `resolve_provider()`
- `hermes_cli/model_switch.py` — shared `/model` switch pipeline (CLI + gateway)
- `agent/auxiliary_client.py` — auxiliary model routing
- `providers/` — ABC + registry entry points (`ProviderProfile`, `register_provider`, `get_provider_profile`, `list_providers`)
- `plugins/model-providers/<name>/` — bundled provider plugins declaring `api_mode`, `base_url`, `env_vars`, `fallback_models`; user plugins at `$HERMES_HOME/plugins/model-providers/<name>/` override bundled ones of the same name

The resolver returns `provider`, `api_mode`, `base_url`, `api_key`, `source`, and provider-specific metadata such as expiry/refresh info.

Resolution precedence:

1. explicit CLI/runtime request
2. `config.yaml` model/provider config
3. environment variables
4. provider-specific defaults or auto resolution

## Notes

- A plugin under `plugins/model-providers/<your-provider>/` that calls `register_provider()` is enough; no branch is needed in the resolver. See Adding Providers and the Model Provider Plugin guide for first-class providers.
- Provider families include AI Gateway (Vercel), OpenRouter, Nous Portal, OpenAI Codex, Copilot / Copilot ACP, Anthropic (native), Google / Gemini, Alibaba / DashScope, DeepSeek, Z.AI, Kimi / Moonshot, MiniMax, Kilo Code, Hugging Face, OpenCode Zen / Go, AWS Bedrock, Azure Foundry, NVIDIA NIM, xAI (Grok), Arcee, GMI Cloud, StepFun, Qwen OAuth, Xiaomi, Ollama Cloud, LM Studio, Tencent TokenHub, Custom (`provider: custom`), and named custom providers (`providers:` dict in `config.yaml`; legacy `custom_providers` list still read). See `plugins/model-providers/` for the complete set.
- The saved model/provider choice is the source of truth, so a stale shell export cannot silently override the endpoint last chosen in `hermes model`.
- Key scoping: `OPENROUTER_API_KEY` only goes to `openrouter.ai`; `AI_GATEWAY_API_KEY` only to `ai-gateway.vercel.sh`; `OPENAI_API_KEY` for custom endpoints and as fallback. Set `AI_GATEWAY_API_KEY` in `~/.hermes/.env` and run with `--provider ai-gateway`.
- Native Anthropic uses `api_mode = anthropic_messages` via `agent/anthropic_adapter.py`. Refreshable Claude Code credentials are preferred over copied env tokens; `ANTHROPIC_TOKEN` / `CLAUDE_CODE_OAUTH_TOKEN` still work as explicit overrides; credential refresh is preflighted and a 401 is retried once after rebuilding the client.
- OpenAI Codex uses `api_mode = codex_responses`. A resumed session whose Codex reasoning items (`encrypted_content`) are rejected (400 `invalid_encrypted_content` or 401 `token_expired`) strips cached items and replays once.
- Chat-completions `reasoning` / `reasoning_content` are flattened before string operations; `delta.reasoning_details` records are appended in arrival order without rewriting.
- Auxiliary tasks (vision, web extraction summarization, compression summaries, skills hub, MCP helpers, memory flushes) can use their own routing; provider `main` resolves through the same shared path.
- Fallback chain: a list of `(provider, model)` entries tried in order; legacy single-pair `fallback_model` still accepted. `_try_activate_fallback()` (in `agent/chat_completion_helpers.py`) fires after max retries on invalid responses, on non-retryable 401/403/404, and after max retries on 429/500/502/503. It builds a new client via `resolve_provider_client()`, picks `api_mode` (`codex_responses` for openai-codex, `anthropic_messages` for anthropic, else `chat_completions`), swaps in place, re-evaluates prompt caching, sets `_fallback_activated = True` (fires once) and resets retries. CLI reads the chain via `hermes_cli/fallback_config.get_fallback_chain()`; gateway via `gateway/run_config_loaders.py._load_fallback_model()`; both `provider` and `model` must be non-empty.
- Not supported: subagent delegation (inherits provider, not fallback config) and auxiliary tasks. Unpinned cron jobs do support fallback; a job with its own `provider` / `model` / `base_url` gets no chain.

## Related

- [Agent Loop](./agent-loop.md)
- [ACP Internals](./acp-internals.md)
- [Cron Internals](./cron-internals.md)
- [Context Compression & Caching](./context-compression-and-caching.md)
