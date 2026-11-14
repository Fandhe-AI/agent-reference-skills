# Delegation Provider Plugins

A delegation provider decides how each `delegate_task` task becomes a child run: which model, provider, endpoint and reasoning effort the subagent uses, or which Hermes profile it runs as, and can add per-task parameters to the `delegate_task` schema.

## Signature / Usage

```python
# ~/.hermes/plugins/delegation-tiers/__init__.py
from agent.delegation_provider import DelegationProvider, DelegationRouteError


class Tiers(DelegationProvider):
    @property
    def name(self) -> str:
        return "tiers"                      # delegation.backend: tiers

    def task_parameters(self, config):
        tiers = self.settings(config).get("tiers") or []  # delegation.backends.tiers.tiers
        return {"tier": {
            "type": "string",
            "enum": [t["name"] for t in tiers],
            "description": "; ".join(f"{t['name']}: {t['description']}" for t in tiers),
        }}

    def description(self, config):
        return "Set `tier` per task to pick the model that fits it."

    def route_task(self, task, config):
        for t in self.settings(config).get("tiers") or []:
            if t["name"] == task.get("tier"):
                return {"provider": t["provider"], "model": t["model"], "label": t["name"]}
        if task.get("tier"):
            raise DelegationRouteError(f"Unknown tier {task['tier']!r}.")
        return dict(config)                 # no tier: the default route


def register(ctx):
    ctx.register_delegation_provider(Tiers())
```

```yaml
# plugin.yaml
name: delegation-tiers
version: 1.0.0
description: Pick a model tier per subagent.
```

```yaml
# config.yaml
delegation:
  backend: tiers
  backends:
    tiers:                                  # == the backend name
      tiers:
        - {name: quick, description: Lookups and summaries., provider: openrouter, model: google/gemini-3-flash-preview}
```

```bash
hermes plugins enable delegation-tiers
```

## Options / Props

`DelegationProvider` (`agent/delegation_provider.py`) subclasses `ProviderBase`. Every method receives `config`, the `delegation` section of the active profile: `dict(config)` is the default route and `self.settings(config)` is `delegation.backends.<name>`.

| Member | Required | Contract |
|---|---|---|
| `name` | yes | The `delegation.backend` value (`default` is reserved for the bundled strategy) |
| `route_task(task, config)` | yes | Return the route dict for one task (`task` has `goal`, `context`, `index` and your parameters); raise `DelegationRouteError` to refuse |
| `task_parameters(config)` | no | `{name: json_schema}` merged into `tasks.items.properties`; core enforces `enum` first and refuses core-owned names (`goal`, `context`, `index`, `output_schema`, `images`, `group`, `role`, `toolsets`, `provider`, `model`, `base_url`, `api_key`, `api_mode`, `acp_command`, `acp_args`) |
| `description(config)` | no | Guidance appended to the `delegate_task` description |
| `is_available()` | no | No network calls; `False` fails delegation closed (tool error naming the fix: `/delegation default` or `hermes config set delegation.backend default`) |
| `settings(config)` | inherited | Do not override |

Route keys: `model`, `provider`, `base_url`, `api_key`, `api_mode`, `request_overrides`, `reasoning_effort`, `fallback_providers`, `service_tier` (`normal` / `fast` / `ultrafast`), `profile`, `label`. Unknown keys are dropped.

## Notes

- Core keeps the whole subagent lifecycle (spawning, isolation, leaf/orchestrator roles, depth limits, concurrency, background completion, stop fan-out, result assembly, `output_schema` validation, progress); a provider only answers which route a task takes.
- The `default` strategy is the bundled `plugins/delegation/default/` (`kind: backend`, always loaded): children follow the `delegation` section or inherit the parent's route. A configured backend that is not installed or unavailable fails closed (no child starts, its schema parameters are absent). `/delegation` switches backend.
- An empty route inherits the parent's route. An unknown `reasoning_effort` refuses the task; `service_tier` is checked against the resolved route with the same gates as `/fast` and applies to that child only. A non-profile route without its own `fallback_providers` gets `delegation.fallback_providers` (return `[]` to disable).
- A `profile` route runs the child as that profile (config, model, credentials, credential pool, fallback chain, reasoning, skills, `SOUL.md`, terminal policy) under that profile's scope; the transcript stays in the launching profile's session database and the parent's toolset is kept. Other route keys, `service_tier` and `reasoning_effort` are ignored on a profile route.
- Refusals are per task: a `DelegationRouteError`, undeclared parameter, value outside `enum`, unknown effort, unavailable tier or unresolvable credential refuses only that task (result entry `{"status": "error", "error": "...", "route": {"backend": "<name>", "refused": true}}`); the call is a tool error only when every task is refused. Background calls list refused entries under `refused`.
- Every result entry of a task routed by a non-default backend carries `route` (`backend`, `label`, `provider`, `model`, `reasoning_effort`, `service_tier`; `fallback_activated: true` when a fallback took over).
- Picker metadata: `display_name` and `summary` label the backend in `/delegation`. Plugins use `ctx.delegation_backends` (`list_backends()`, `set_global_backend(name, *, session_key="", apply_now=False)`); core code uses `agent.delegation_backends`. `set_global_backend` raises `PermissionError` on package-manager-managed installs and `ValueError` for a backend that cannot run. `hermes_cli.auth_model_picker.prompt_model_selection(model_ids, current_model="", title=...)` reuses the model picker.
- A session routes on the backend its `delegate_task` schema was built from (pinned with the session's tools); a save or hand edit of `delegation.backend` applies from the next session (`/new`), or at the next turn with `apply_now=True` (`/delegation <backend> --now`, one prompt-cache break).
- `task_parameters` and `description` must be deterministic for a given `config` (prompt caching). All arguments and returns are plain JSON, so providers run unchanged under `plugins.isolation: host`.
- Testing: load the plugin through real discovery against a temporary `HERMES_HOME` and assert on `tools.registry.registry.get_definitions({"delegate_task"})` and `tools.delegate_tool.delegate_task(...)`; `tests/tools/test_delegation_backends.py` is a complete example.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/delegation-provider-plugin (pinned to v0.23.1)

## Related

- [Subagent Lifecycle API](./subagent-lifecycle-api.md)
- [Build a Hermes Plugin](./plugins.md)
- [Model Provider Plugins](./model-provider-plugin.md)
