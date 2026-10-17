# Terminal Environment Provider Plugins

Third-party sandbox vendors integrate terminal backends as plugins installed under `~/.hermes/plugins/`, selected like built-ins via `terminal.backend` in `config.yaml`. Built-in backends (local, Docker, Singularity, Modal, Daytona, Vercel Sandbox, SSH) live under `tools/environments/`.

## Signature / Usage

```python
# ~/.hermes/plugins/acmebox/__init__.py
from agent.terminal_env_provider import TerminalEnvironmentProvider


class AcmeBoxEnvironment:
    """Must satisfy the BaseEnvironment duck-typed contract."""

    def __init__(self, cwd, timeout, task_id):
        self.cwd, self.timeout, self.task_id = cwd, timeout, task_id

    def execute(self, command, timeout=None, **kwargs):
        ...  # run the command in the sandbox
        return {"output": "...", "exit_code": 0}

    def cleanup(self):
        ...  # tear down / detach


class AcmeBoxProvider(TerminalEnvironmentProvider):
    name = "acmebox"
    display_name = "AcmeBox"
    is_remote = True          # commands don't run on the host
    is_container = True       # container-style path/cwd semantics

    @property
    def description(self):
        return "Run commands in an AcmeBox cloud sandbox."

    @property
    def cache_path_base(self):
        return "~/.hermes"

    @property
    def strip_env_keys(self):
        return frozenset({"ACMEBOX_TOKEN"})

    def is_available(self):
        import importlib.util, os
        return importlib.util.find_spec("acmebox") is not None and bool(os.getenv("ACMEBOX_TOKEN"))

    def create_environment(self, *, cwd, timeout, task_id="default",
                           image=None, container_config=None, **kwargs):
        return AcmeBoxEnvironment(cwd, timeout, task_id)


def register(ctx):
    ctx.register_terminal_environment_provider(AcmeBoxProvider())
```

```yaml
# ~/.hermes/plugins/acmebox/plugin.yaml
name: acmebox
version: 0.1.0
description: AcmeBox cloud sandbox terminal backend
kind: backend
```

```bash
hermes plugins enable acmebox
hermes config set terminal.backend acmebox
```

## Options / Props

Core surfaces driven by provider attributes:

| Surface | Driven by |
|---------|-----------|
| Command dispatch (`terminal`, `execute_code`, file tools) | `create_environment()` |
| `hermes setup` backend picker | `display_name`, `description`, `setup_instructions()`, `post_setup()` |
| Dashboard terminal-backend picker (probe status) | `probe()` |
| `hermes status` / `hermes doctor` | `doctor_checks()` |
| System-prompt environment hints | `is_remote`, `env_description` |
| Dangerous-command approval skipping | `skip_container_guards` |
| Container path/cwd handling | `is_container` |
| Synced cache-file path translation | `cache_path_base` |
| Secret stripping from spawned subprocesses | `strip_env_keys` |
| Per-session sandbox isolation (`container_persistent: false`) | `session_isolated_when_nonpersistent` |

## Notes

- Reserved names (`local`, `docker`, `singularity`, `modal`, `managed_modal`, `daytona`, `vercel_sandbox`, `ssh`) are rejected; plugins never shadow in-tree backends.
- `create_environment` must accept `**kwargs` and ignore unknown keys (forward-compat).
- `is_available()` / `probe()` must be cheap with no network calls.
- Fail-soft: a provider attribute that raises is treated as its default (a raising `skip_container_guards` keeps approvals on).
- Put vendor tokens in `strip_env_keys` so model-authored shell commands cannot read them.
- Environment object contract: `execute(command, timeout=None, ...)` returns `{"output": str, "exit_code": int}`; `cleanup()` is called on session teardown / idle reaping. Subclassing `tools.environments.base.BaseEnvironment` is recommended but not required.
- If the sandbox is resumed by name (durable VM), set `session_isolated_when_nonpersistent = True` so each session gets its own sandbox under `terminal.container_persistent: false`.
- Mirrors the Browser Provider Plugins guide (same registration flow and scope semantics).
- Source: developer-guide/terminal-environment-plugin (v0.22.2 snapshot).

## Related

- [Browser Provider Plugins](./browser-provider-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
