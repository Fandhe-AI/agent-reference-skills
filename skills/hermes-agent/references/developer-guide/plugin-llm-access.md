# Plugin LLM Access

`ctx.llm` is the supported way for a plugin to make an out-of-band LLM call: chat or structured, sync or async, with host-owned credentials and a fail-closed trust gate. `ctx.llm` is an instance of `agent.plugin_llm.PluginLlm`.

## Signature / Usage

```python
result = ctx.llm.complete(messages=[{"role": "user", "content": "ping"}])
return result.text
```

```python
result = ctx.llm.complete(
    messages=[
        {"role": "system", "content": "Rewrite errors as one short sentence a non-engineer can act on."},
        {"role": "user",   "content": traceback_text},
    ],
    max_tokens=64,
    purpose="hooks.error-rewrite",
)
```

```python
result = ctx.llm.complete_structured(
    instructions="Score this support reply for urgency (0–1) and pick a category.",
    input=[{"type": "text", "text": message_body}],
    json_schema=TRIAGE_SCHEMA,
    purpose="support.triage",
    temperature=0.0,
    max_tokens=128,
)
if result.parsed["urgency"] > 0.8:
    ...
```

Async and task-routed variants:

```python
result = await ctx.llm.acomplete(messages=..., task="classifier")
result = await ctx.llm.acomplete_structured(instructions=..., input=..., task="classifier")

def register(ctx):
    ctx.register_auxiliary_task(
        "classifier", display_name="Classifier", description="Classify input.",
        inherit_from="compression",         # follow whatever compression uses
        defaults={"timeout": 90},
    )
```

```yaml
auxiliary:
  classifier:
    provider: openrouter
    model: vendor/model-id
```

## Options / Props

`complete()` arguments: `messages` (OpenAI shape), `provider` (gated), `model` (gated), `temperature`, `max_tokens`, `timeout` (seconds), `agent_id` (gated), `profile` (gated), `purpose` (audit string), `task` (plugin-registered auxiliary slot). Returns `PluginLlmCompleteResult(text, provider, model, agent_id, usage, audit)`.

`complete_structured()` arguments: `instructions`, `input` (typed `text` / `image` blocks; image via `data` bytes + `mime_type` or `url`), `json_schema`, `json_mode`, `schema_name`, `system_prompt`, plus the `complete()` routing/shaping arguments. Returns `PluginLlmStructuredResult` (same fields plus `parsed`, `content_type` = `"json"` or `"text"`).

`usage` carries `input_tokens`, `output_tokens`, `total_tokens`, `cache_read_tokens`, `cache_write_tokens`, `cost_usd` when the provider returns them. `audit` carries `plugin_id`, `purpose`, `profile` (and `schema_name`).

Trust gate (config under `plugins.entries.<plugin-id>.llm`):

| Override | Default | Config key |
|----------|---------|------------|
| `provider=` | denied | `allow_provider_override: true` |
| allowlist | — | `allowed_providers: [...]` (`["*"]` = any) |
| `model=` | denied | `allow_model_override: true` |
| allowlist | — | `allowed_models: [...]` |
| `agent_id=` | denied | `allow_agent_id_override: true` |
| `profile=` | denied | `allow_profile_override: true` |
| built-in `task=` | denied | `allow_task_override: true` |

## Notes

- Zero-config runs against the user's active provider and model and follows provider switches. Request-shaping arguments (`temperature`, `max_tokens`, `timeout`, `system_prompt`, `purpose`, `messages`, `instructions`, `input`, `json_schema`, `schema_name`, `json_mode`) are always allowed.
- Unauthorized `provider=`, `model=`, `agent_id=`, `profile=` raise `PluginLlmTrustError`. Each override is gated independently; `allow_model_override` does not grant `allow_provider_override`.
- Bounded: single call, no streaming, no tool loops, no conversation state.
- The host owns provider resolution, auth (credential pool, tokens never seen by the plugin), vision routing to the configured vision model, fallback chain, timeout (`auxiliary.<task>.timeout`), `response_format` JSON shaping, `jsonschema` validation when installed, and one INFO audit line per call in `agent.log`.
- `complete_structured()` raises `ValueError` on empty inputs and on schema-validation failure; if JSON is invalid, `parsed` is `None` and `text` holds the raw response. Other failures raise whatever `auxiliary_client.call_llm()` raises.
- A plugin can use only an auxiliary task it registered itself; unknown or foreign task names fail before provider invocation. Registered tasks appear on `hermes model` auxiliary picker, dashboard Models page and Desktop Settings. `inherit_from` resolves on every read; precedence is inherited base, then plugin `defaults`, then operator `auxiliary.<task>`; an operator pin wins as a whole route; a bad base logs a warning and registers without inheritance. Omit `task=` (or use `"auto"`) to keep the active main provider/model.
- Every call runs against the user's paid provider; avoid unbounded loops.
- Plugin id is the manifest `name:` for flat plugins, or the path-derived key for nested plugins (`image_gen/openai`).
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/plugin-llm-access (pinned to v0.22.2)

## Related

- [Build a Hermes Plugin](./plugins.md)
- [Public Subagent Lifecycle API](./subagent-lifecycle-api.md)
