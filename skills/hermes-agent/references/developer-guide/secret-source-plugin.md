# Secret Source Plugins

Secret sources resolve provider credentials from an external secret manager (vault, password manager, OS keystore, custom script) into environment variables at process startup, after `~/.hermes/.env` loads and before Hermes reads credentials. Bitwarden, 1Password and a command-helper source ship in-tree; every other backend is a plugin.

## Signature / Usage

```
~/.hermes/plugins/my-vault/
├── plugin.yaml      # name, description
└── __init__.py      # SecretSource subclass + register(ctx)
```

```python
from pathlib import Path

from agent.secret_sources.base import ErrorKind, FetchResult, SecretSource, run_secret_cli


class MyVaultSource(SecretSource):
    name = "myvault"          # config section key: secrets.myvault
    label = "My Vault"        # used in startup lines + provenance labels
    shape = "mapped"          # "mapped" (explicit VAR->ref map) or "bulk" (project dump)
    scheme = "mv"             # optional unique URI scheme (mv://...)

    def fetch(self, cfg: dict, home_path: Path) -> FetchResult:
        """Resolve secrets. MUST NOT raise. MUST NOT prompt."""
        result = FetchResult()
        token = os.environ.get("MYVAULT_TOKEN", "").strip()
        if not token:
            result.error = "secrets.myvault.enabled is true but MYVAULT_TOKEN is not set."
            result.error_kind = ErrorKind.NOT_CONFIGURED
            return result
        try:
            proc = run_secret_cli(["myvault-cli", "export", "--json"],
                                  allow_env=["MYVAULT_TOKEN"], timeout=30)
        except RuntimeError as exc:
            result.error = str(exc)
            result.error_kind = ErrorKind.BINARY_MISSING
            return result
        result.secrets = parse_your_output(proc.stdout)  # {ENV_VAR: value}
        return result

    def protected_env_vars(self, cfg: dict):
        return frozenset({"MYVAULT_TOKEN"})


def register(ctx):
    ctx.register_secret_source(MyVaultSource())
```

```yaml
secrets:
  sources: [myvault, bitwarden]   # optional ordering
  myvault:
    enabled: true
```

Conformance kit:

```python
import pytest
from tests.secret_sources.conformance import SecretSourceConformance

class TestMyVaultConformance(SecretSourceConformance):
    @pytest.fixture
    def source(self):
        return MyVaultSource()
```

## Options / Props

Optional hooks:

| Method | Default | Override when |
|--------|---------|---------------|
| `is_enabled(cfg)` | `cfg.get("enabled")` | Custom activation logic |
| `override_existing(cfg)` | `cfg.get("override_existing", False)` | Different default (both bundled sources default `True`) |
| `protected_env_vars(cfg)` | empty | You have a bootstrap token |
| `fetch_timeout_seconds(cfg)` | 120s | Different budget |
| `config_schema()` | `{}` | Declare config keys for setup surfaces |
| `remediation(kind, cfg)` | generic per-`ErrorKind` hints | Point warnings at your fix-it command (pure mapping, no I/O, never raises; `""` suppresses) |

Shapes: `mapped` (user binds env-var names to references; beats bulk on contested vars) and `bulk` (injects a whole project/folder implicitly; yields to mapped).

`ErrorKind`:

| Kind | Meaning |
|------|---------|
| `NOT_CONFIGURED` | Enabled but missing token / project / map |
| `BINARY_MISSING` | Helper CLI not found or not executable |
| `AUTH_FAILED` / `AUTH_EXPIRED` | Bad / expired credentials |
| `REF_INVALID` | A secret reference failed validation |
| `NETWORK` | Transport-level failure |
| `EMPTY_VALUE` | Backend returned nothing for a ref; never apply `""` over a good credential |
| `TIMEOUT` | Fetch exceeded its budget |
| `INTERNAL` | Anything else |

## Notes

- Framework (`agent.secret_sources.registry.apply_all`) owns ordering, mapped-vs-bulk precedence, first-claim-wins conflicts, `override_existing` semantics, protected bootstrap tokens, per-source timeout (default 120s, `secrets.<name>.timeout_seconds`), provenance labels and all `os.environ` writes; the plugin never touches the environment.
- `fetch()` never raises (errors go in `result.error` + `result.error_kind`; a raise is reported as `INTERNAL`), never prompts (startup is non-TTY), and stays within the timeout.
- `SecretSource.api_version` defaults to `SECRET_SOURCE_API_VERSION`; sources built against a different version are skipped with a warning.
- Use `run_secret_cli()` for CLIs: argv-only, minimal allowlisted child environment (`allow_env`), ANSI-scrubbed stderr, stdin closed, timeout raises `RuntimeError`; pass user-supplied references after `--`.
- Registration is rejected with a warning for non-`SecretSource` instances, invalid/duplicate names, a `scheme` another source owns, wrong `api_version`, or a `shape` outside `mapped` / `bulk`.
- Timing: `load_hermes_dotenv()` often runs before plugin discovery; Hermes re-pulls secrets after discovery when any enabled plugin secret source is configured (idempotent, fail-open). Code reading `os.environ` during import or `register(ctx)` cannot depend on credentials from that source. `hermes update` never resolves external sources.
- The bundled set is closed; publish new vault backends as standalone plugin repos.
- Source: developer-guide/secret-source-plugin (v0.22.2 snapshot).

## Related

- [Memory Provider Plugins](./memory-provider-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
