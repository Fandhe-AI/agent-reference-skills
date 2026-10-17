---
source: https://docs.astral.sh/uv/reference/cli/#uv
---

# uv (commands and global options)

An extremely fast Python package manager.

## Signature / Usage

```
uv [OPTIONS] <COMMAND>
```

### Commands

| Command | Description |
| --- | --- |
| `uv auth` | Manage authentication |
| `uv run` | Run a command or script |
| `uv init` | Create a new project |
| `uv add` | Add dependencies to the project |
| `uv remove` | Remove dependencies from the project |
| `uv version` | Read or update the project's version |
| `uv sync` | Update the project's environment |
| `uv lock` | Update the project's lockfile |
| `uv export` | Export the project's lockfile to an alternate format |
| `uv tree` | Display the project's dependency tree |
| `uv format` | Format Python code in the project |
| `uv check` | Run checks on the project |
| `uv audit` | Audit the project's dependencies |
| `uv tool` | Run and install commands provided by Python packages |
| `uv python` | Manage Python versions and installations |
| `uv pip` | Manage Python packages with a pip-compatible interface |
| `uv venv` | Create a virtual environment |
| `uv build` | Build Python packages into source distributions and wheels |
| `uv publish` | Upload distributions to an index |
| `uv workspace` | Inspect uv workspaces |
| `uv cache` | Manage uv's cache |
| `uv self` | Manage the uv executable |
| `uv help` | Display documentation for a command |

## Options / Props

### Global options

These options appear on (nearly) every uv command. They are listed once here (transcribed from the `uv run` section of the CLI reference) and omitted from the other command pages.

| Name | Value | Description |
| --- | --- | --- |
| `--allow-insecure-host`, `--trusted-host` | `allow-insecure-host` | Allow insecure connections to a host. Can be provided multiple times. Expects to receive either a hostname (e.g., `localhost`), a host-port pair (e.g., `localhost:8080`), or a URL (e.g., `https://localhost`). WARNING: Hosts included in this list will not be verified against the system's certificate store. Only use `--allow-insecure-host` in a secure network with verified sources, as it bypasses SSL verification and could expose you to MITM attacks. May also be set with the `UV_INSECURE_HOST` environment variable. |
| `--cache-dir` | `cache-dir` | Path to the cache directory. Defaults to `$XDG_CACHE_HOME/uv` or `$HOME/.cache/uv` on macOS and Linux, and `%LOCALAPPDATA%\uv\cache` on Windows. To view the location of the cache directory, run `uv cache dir`. May also be set with the `UV_CACHE_DIR` environment variable. |
| `--color` | `color-choice` | Control the use of color in output. By default, uv will automatically detect support for colors when writing to a terminal. Possible values: `auto` (enables colored output only when the output is going to a terminal or TTY with support), `always` (enables colored output regardless of the detected environment), `never` (disables colored output). |
| `--config-file` | `config-file` | The path to a `uv.toml` file to use for configuration. While uv configuration can be included in a `pyproject.toml` file, it is not allowed in this context. May also be set with the `UV_CONFIG_FILE` environment variable. |
| `--directory` | `directory` | Change to the given directory prior to running the command. Relative paths are resolved with the given directory as the base. See `--project` to only change the project root directory. May also be set with the `UV_WORKING_DIR` environment variable. |
| `--help`, `-h` | | Display the concise help for this command |
| `--managed-python` | | Require use of uv-managed Python versions [env: UV_MANAGED_PYTHON=]. By default, uv prefers using Python versions it manages. However, it will use system Python versions if a uv-managed Python is not installed. This option disables use of system Python versions. |
| `--no-managed-python` | | Disable use of uv-managed Python versions [env: UV_NO_MANAGED_PYTHON=]. Instead, uv will search for a suitable Python version on the system. |
| `--no-cache`, `--no-cache-dir`, `-n` | | Avoid reading from or writing to the cache, instead using a temporary directory for the duration of the operation. May also be set with the `UV_NO_CACHE` environment variable. |
| `--no-config` | | Avoid discovering configuration files (`pyproject.toml`, `uv.toml`). Normally, configuration files are discovered in the current directory, parent directories, or user configuration directories. May also be set with the `UV_NO_CONFIG` environment variable. |
| `--no-progress` | | Hide all progress outputs [env: UV_NO_PROGRESS=]. For example, spinners or progress bars. |
| `--no-python-downloads` | | Disable automatic downloads of Python. |
| `--offline` | | Disable network access [env: UV_OFFLINE=]. When disabled, uv will only use locally cached data and locally available files. |
| `--project` | `project` | Discover a project in the given directory. All `pyproject.toml`, `uv.toml`, and `.python-version` files will be discovered by walking up the directory tree from the project root, as will the project's virtual environment (`.venv`). Other command-line arguments (such as relative paths) will be resolved relative to the current working directory. See `--directory` to change the working directory entirely. This setting has no effect when used in the `uv pip` interface. May also be set with the `UV_PROJECT` environment variable. |
| `--quiet`, `-q` | | Use quiet output. Repeating this option, e.g., `-qq`, will enable a silent mode in which uv will write no output to stdout. |
| `--system-certs` | | Whether to load TLS certificates from the platform's native certificate store [env: UV_SYSTEM_CERTS=]. By default, uv uses bundled Mozilla root certificates, which improves portability and performance (especially on macOS). However, in some cases, you may want to use the platform's native certificate store, especially if you're relying on a corporate trust root (e.g., for a mandatory proxy) that's included in your system's certificate store. |
| `--verbose`, `-v` | | Use verbose output. You can configure fine-grained logging using the `RUST_LOG` environment variable. (<https://docs.rs/tracing-subscriber/latest/tracing_subscriber/filter/struct.EnvFilter.html#directives>) |

## Notes

- Not every command accepts every global option; the CLI reference lists them per command. This page is the single place they are described for the project-commands pages.
- `uv auth`, `uv tool`, `uv python`, `uv pip`, `uv cache` and `uv self` are command groups documented in other categories (indexes-auth, tools, python, pip-interface, configuration).

## Related

- [uv run](./uv-run.md)
- [uv init](./uv-init.md)
- [uv sync](./uv-sync.md)
- [uv lock](./uv-lock.md)
