# Adding Tools

How to add a built-in tool to the Hermes repository: schema, handler, registration and toolset. For personal or project-local tools use the plugin route instead.

## Signature / Usage

```python
# tools/weather_tool.py
import json
import os

def check_weather_requirements() -> bool:
    return bool(os.getenv("WEATHER_API_KEY"))

def weather_tool(location: str, units: str = "metric") -> str:
    api_key = os.getenv("WEATHER_API_KEY")
    if not api_key:
        return json.dumps({"error": "WEATHER_API_KEY not configured"})
    try:
        return json.dumps({"location": location, "temp": 22, "units": units})
    except Exception as e:
        return json.dumps({"error": str(e)})

WEATHER_SCHEMA = {
    "name": "weather",
    "description": "Get current weather for a location.",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {"type": "string", "description": "City name or coordinates"},
            "units": {"type": "string", "enum": ["metric", "imperial"], "default": "metric"},
        },
        "required": ["location"],
    },
}

from tools.registry import registry

registry.register(
    name="weather",
    toolset="weather",
    schema=WEATHER_SCHEMA,
    handler=lambda args, **kw: weather_tool(
        location=args.get("location", ""),
        units=args.get("units", "metric")),
    check_fn=check_weather_requirements,
    requires_env=["WEATHER_API_KEY"],
)
```

Add the tool name in `toolsets.py`:

```python
_HERMES_CORE_TOOLS = [
    ...
    "weather",  # <-- add here
]

# Or create a new standalone toolset:
"weather": {
    "description": "Weather lookup tools",
    "tools": ["weather"],
    "includes": []
},
```

## Options / Props

`registry.register()` arguments used in the guide:

| Name | Type | Description |
|------|------|-------------|
| name | str | Tool name |
| toolset | str | Toolset the tool belongs to |
| schema | dict | `name`, `description`, JSON-schema `parameters` |
| handler | callable | Receives `(args: dict, **kwargs)`; must return a JSON string |
| check_fn | callable | Returns `False` to silently exclude the tool when building definitions |
| requires_env | list[str] | Required environment variables |
| is_async | bool | `True` for async handlers; the registry bridges via `_run_async()` |

## Notes

- Before writing a tool, decide whether it should be a skill: use a skill when the capability is instructions + shell commands + existing tools; use a tool when it needs API keys, custom processing, binary data or streaming.
- Adding a tool touches 2 files: `tools/your_tool.py` and `toolsets.py`. Any `tools/*.py` with a top-level `registry.register()` call is auto-discovered by `discover_builtin_tools()` in `tools/registry.py`; no manual import list.
- Handlers must return a JSON string via `json.dumps()` (never raw dicts) and return errors as `{"error": "message"}` rather than raising.
- Tools managing per-session state receive `task_id` through `**kwargs` (`kw.get("task_id")`).
- `todo_list`, `memory`, `session_search`, `delegate_task` are intercepted by the agent loop (`agent/tool_executor.py`, called from `agent/conversation_loop.py`) before reaching the registry; `dispatch()` returns a fallback error if the intercept is bypassed.
- Optional setup-wizard integration: add the key to `OPTIONAL_ENV_VARS` in `hermes_cli/config.py` (`description`, `prompt`, `url`, `tools`, `password`).
- Checklist ends with a smoke test: `hermes chat -q "Use the weather tool for London"`; optionally add to `toolset_distributions.py` for batch processing.
- Source: developer-guide/adding-tools (v0.22.2 snapshot).

## Related

- [Build a Hermes Plugin](./plugins.md)
- [Creating Skills](./creating-skills.md)
