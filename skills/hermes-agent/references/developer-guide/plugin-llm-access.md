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
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/plugin-llm-access (pinned to v0.23.1)

### From the plugin's frontend: a plugin RPC method (new since v0.22.2)

A plugin's frontend (a Desktop page, or a client attached to the shared gateway) does not call the model itself. It calls its own Python half through a plugin RPC method (`ctx.register_rpc`), and the handler calls `ctx.llm` on the task the plugin registered. A plugin RPC call holds its client's request lane until the handler returns, so the handler starts the model call in a thread, answers with a job id at once, and delivers the result as a session event (`ctx.emit_to_session`):

```python
import contextvars
import threading
import uuid

from agent.redact import redact_sensitive_text

CHART = {"type": "object", "properties": {"kind": {"type": "string"}}, "required": ["kind"]}


def register(ctx):
    ctx.register_auxiliary_task("chart_writer", display_name="Charts", description="Pick chart kinds.")
    slots = threading.BoundedSemaphore(4)  # model calls in flight

    def write_chart(params, *, session_id, **kwargs):
        if not session_id:
            raise ValueError("chart.write needs a session_id")
        job = uuid.uuid4().hex
        text = redact_sensitive_text(str(params.get("text", "")), force=True)

        def run():
            try:
                result = ctx.llm.complete_structured(
                    instructions="Pick a chart kind for this data.",
                    input=[{"type": "text", "text": text}],
                    json_schema=CHART,
                    task="chart_writer",
                )
                if result.parsed is None:
                    raise ValueError("the model did not answer with JSON")
                payload = {"job": job, "chart": result.parsed}
            except Exception as exc:
                payload = {"job": job, "error": str(exc)}
            finally:
                slots.release()
            ctx.emit_to_session(session_id, "chart.written", payload)

        if not slots.acquire(blocking=False):
            raise RuntimeError("chart.write is busy: wait for a chart.written event")
        try:
            # copy_context: the thread keeps the call's profile scope, which ctx.llm reads.
            threading.Thread(target=contextvars.copy_context().run, args=(run,), daemon=True).start()
        except Exception:
            slots.release()  # run() never started, so it never releases
            raise
        return {"job": job}

    ctx.register_rpc("chart.write", write_chart)
```

The frontend sends `{"method": "plugin.<plugin_id>.chart.write", "params": {"session_id": "…", "text": "…"}}`, gets `{"job": "…"}` back at once, and receives the chart (or an `error`) as the session event `plugin.<plugin_id>.chart.written` with the same `job`. Called inline, the model call would hold that client's next requests (an interrupt or an approval answer included) until the model answered. The semaphore stands in for `llm.oneshot`'s per-owner cap: a fifth call while four run is refused. An exception in the handler itself answers the call with reason `plugin_rpc_failed`.

- **Redact at the boundary.** `agent.redact.redact_sensitive_text` is part of the public plugin API. Pass `force=True` where secrets must never leave the machine, such as text sent to a model: it then masks secrets even when the operator turned redaction off with `security.redact_secrets: false`. Without `force=True` it follows that setting.
- **The task is the route.** `task=` must name a task your plugin registered, so the operator's `auxiliary.<task>` setting picks the model, and a frontend cannot pick a different route.
- **Check `parsed`.** It is `None` when the reply is not JSON. A reply that does not match `json_schema` raises `ValueError` when the optional `jsonschema` package is installed; without it, the schema is not checked.

### Asking the session's own agent: `ctx.side_question` (new since v0.22.2)

`ctx.llm` runs a fresh call that knows only what the plugin sends it. `ctx.side_question` asks the session's *own* agent instead: the same model, the same system prompt (memory included) and the whole conversation so far, plus one question from the plugin. It replays the request the turn just sent, so the provider's prompt cache is still warm. Use it when the answer depends on the conversation itself (suggest the next prompt, label what the turn did, decide on a follow-up); otherwise use `ctx.llm`, which is cheaper and has no lease rules.

```python
import threading


def register(ctx):
    def on_post_llm_call(**kwargs):
        token = kwargs.get("side_question_token")
        if token is None:  # no consented plugin loaded, or not a user turn
            return
        # post_llm_call is time-bounded: never wait for the model inside the hook.
        threading.Thread(target=_suggest, args=(token,), daemon=True).start()

    def _suggest(token):
        answer = ctx.side_question(
            token, "Suggest the user's most likely next prompt in one short line.")
        if answer:
            ctx.state.set("next_prompt", answer)

    ctx.register_hook("post_llm_call", on_post_llm_call)
```

The plugin must declare the capability in `plugin.yaml` and the user must grant it (the consent screen shows: "Ask your agent a short question after each turn. It sees the whole session, including memory, and spends your main model's tokens."):

```yaml
capabilities:
  - llm.side_question
```

- **Lease rules.** `post_llm_call` receives `side_question_token` (a string) when at least one loaded plugin holds the capability, else `None`; cron runs and delegated subagent turns always get `None`. One attempt per turn, shared by every plugin: the first `ctx.side_question` call spends the token, whether it succeeds or not (a plugin without the capability does not spend it). The token expires after 60 seconds, and as soon as the session starts its next turn; it belongs to the profile whose turn issued it. `prompt` is a non-empty string of at most 4096 characters; `timeout` defaults to 15 seconds and is capped at 60 (covers the whole call).
- **Return value.** The text of the agent's reply, or `None` (refused or failed: a Mixture-of-Agents runtime, an agent-as-provider runtime such as ACP / external-process providers / the Codex app-server, a session whose model changed since the turn, a request carrying provider-executed (server-side) tools, a timeout, a provider error, or an empty reply). No retries and no fallback model.
- The call never runs a tool (tool calls in the reply are dropped) and never writes to the transcript. Its tokens are billed to the session whose turn issued the token and recorded in its usage as `plugin_side_question:<plugin id>`, apart from `/btw`'s `side_question`. You cannot pick the model, tools, system prompt or output length (it would miss the warm cache); ask for brevity in the prompt.
- Observability plugins see the call as an auxiliary call: `pre_auxiliary_call` / `post_auxiliary_call` fire with `aux_task="plugin_side_question"` and `plugin_id` set to the asking plugin; the turn-scoped `pre_api_request` / `post_api_request` do not fire for it.

## Related

- [Build a Hermes Plugin](./plugins.md)
- [Public Subagent Lifecycle API](./subagent-lifecycle-api.md)
