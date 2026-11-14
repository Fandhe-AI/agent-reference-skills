# Terminal Environment Provider Plugins

Third-party sandbox vendors integrate terminal backends as plugins installed under `~/.hermes/plugins/`, selected like built-ins via `terminal.backend` in `config.yaml`. Built-in backends (local, Docker, Modal, Daytona, Vercel Sandbox, SSH) live under `tools/environments/`; Singularity moved out of tree in v0.23.1 and the official Singularity/Apptainer plugin (https://github.com/NousResearch/hermes-official-plugins/tree/main/singularity) is a complete worked example of this page.

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
| Where commands start when `terminal.cwd` is unset or unusable | `default_cwd` |
| Bot Desktop, `computer_use` and the browser following the terminal | `supports_streams` + the environment's `exec_prefix()` |
| Synced cache-file path translation | `cache_path_base` |
| Secret stripping from spawned subprocesses | `strip_env_keys` |
| Per-session sandbox isolation (`container_persistent: false`) | `session_isolated_when_nonpersistent` |

## Notes

- Reserved names (`local`, `docker`, `modal`, `managed_modal`, `daytona`, `vercel_sandbox`, `ssh`) are rejected; plugins never shadow in-tree backends (`singularity` removed from the reserved list in v0.23.1).
- `create_environment` must accept `**kwargs` and ignore unknown keys (forward-compat).
- `is_available()` / `probe()` must be cheap with no network calls.
- Fail-soft: a provider attribute that raises is treated as its default (a raising `skip_container_guards` keeps approvals on).
- Put vendor tokens in `strip_env_keys` so model-authored shell commands cannot read them.
- Environment object contract: `execute(command, timeout=None, ...)` returns `{"output": str, "exit_code": int}`; `cleanup()` is called on session teardown / idle reaping. Subclassing `tools.environments.base.BaseEnvironment` is recommended but not required.
- If the sandbox is resumed by name (durable VM), set `session_isolated_when_nonpersistent = True` so each session gets its own sandbox under `terminal.container_persistent: false`.
- Mirrors the Browser Provider Plugins guide (same registration flow and scope semantics).
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/terminal-environment-plugin (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- `singularity` is no longer a built-in backend or reserved name; it is the official out-of-tree Singularity/Apptainer plugin.

### File tools and the host filesystem

`read_file`, `write_file`, `patch` and `search_files` go through your environment's `execute()`, so they see exactly the files your commands see. The exception is an environment declaring `uses_host_filesystem = True` (only the built-in `LocalEnvironment` does): there the file tools read, write and search the host directly, run the bundled ripgrep, stat paths on the host, write oversized tool output to `~/.hermes/cache/spillover` and enable LSP diagnostics. A backend that subclasses `LocalEnvironment` to confine its commands (a bubblewrap or other host sandbox) inherits `True` and must turn it off, or the file tools bypass the sandbox:

```python
from tools.environments.local import LocalEnvironment


class AcmeJailEnvironment(LocalEnvironment):
    uses_host_filesystem = False  # file tools run inside the jail, via execute()
```

Leave it unset on backends that don't subclass `LocalEnvironment` (default `False`). Hermes v0.22.5 and earlier ignore the attribute and use the host fast path for every `LocalEnvironment` subclass, so pin `requires_hermes` past that.

### Images

Your backend reads its own image setting (a `config_schema` key, or a `terminal.<name>_image` key you document). Hermes passes `image=` only for a per-task override: a batch run (`batch_runner.py`) giving each prompt its own container registers it as `<name>_image` for the active backend, reaching `create_environment(image=...)`. Otherwise `image` is `""`; fall back to your setting.

### Starting directory: `default_cwd`

Without `default_cwd`, a plugin backend starts in `/root`, and a host-looking `terminal.cwd` is replaced by `/root` when `is_container` is set. Return an absolute in-sandbox path to start elsewhere:

```python
    @property
    def default_cwd(self):
        return "/home/acme"
```

When the home directory is only known once the sandbox is up, return `"~"`: Hermes passes `cwd="~"` to `create_environment()` (never expanded on the host) and your environment sets `self.cwd` to the absolute home it resolved:

```python
class AcmeBoxEnvironment(BaseEnvironment):
    def __init__(self, *, cwd, timeout, sandbox):
        if cwd == "~":
            cwd = sandbox.home()  # e.g. "/home/acme"
        super().__init__(cwd=cwd, timeout=timeout)
```

`default_cwd` is read on every command, so keep it cheap (no network calls). Relative paths are ignored, because Hermes would anchor them on the host.

### Bot Desktop and `computer_use`: `supports_streams` + `exec_prefix()`

The screen, `computer_use` and the browser follow the terminal into Docker and SSH sandboxes (and the Singularity plugin's) by spawning long-lived processes there with stdin and stdout left open. A plugin backend opts in by (1) setting `supports_streams = True` on the provider (`bot_desktop.placement: auto` then places the screen inside your backend instead of refusing) and (2) giving the environment an `exec_prefix(*, user=None, interactive=True)` method that returns a local argv running whatever follows inside the sandbox with stdin/stdout open (shape of `docker exec -i <container>`), or `None` when it can't right now. Hermes appends `bash -c <script>` as separate words, so the sandbox needs `bash`. Return a list, not a command string.

```python
class AcmeBoxEnvironment:
    def exec_prefix(self, *, user=None, interactive=True):
        return ["acmebox", "exec", "--stdin", self.sandbox_id, "--"]
```

The sandbox image still needs the desktop stack (Xvnc, Xfce, Chromium, `cua-driver`); `nousresearch/hermes-sandbox:desktop` has it. A terminal backend runs only in-process: under `plugins.isolation: host` creating the environment refuses with a message naming `plugins.isolation: in_process`, and Bot Desktop refuses a `supports_streams` backend the same way.

## Related

- [Browser Provider Plugins](./browser-provider-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
