# Managed Scope

Managed scope lets an administrator push a baseline of configuration and secrets that a standard (non-root) user cannot override, via a system-level directory (default `/etc/hermes`).

## Signature / Usage

Administrator setup:

```bash
sudo mkdir -p /etc/hermes

# Pin some config values for every user on this machine
sudo tee /etc/hermes/config.yaml >/dev/null <<'YAML'
model:
  provider: nous
security:
  redact_secrets: true
YAML

# Optionally pin a shared, non-sensitive env value
sudo tee /etc/hermes/.env >/dev/null <<'ENV'
OPENAI_API_BASE=https://inference.example.com/v1
ENV

sudo chmod 0755 /etc/hermes
sudo chmod 0644 /etc/hermes/config.yaml /etc/hermes/.env
```

Inspecting and relocating:

```bash
hermes config        # shows a header naming the managed source + the pinned keys
hermes doctor        # reports the resolved managed dir + pinned key counts
export HERMES_MANAGED_DIR=/opt/org/hermes-policy
```

## Options / Props

Layout (root-owned, directory `0755`, files `0644`):

| Path | Description |
|------|-------------|
| `/etc/hermes/config.yaml` | Managed config layer (wins over `~/.hermes/config.yaml`) |
| `/etc/hermes/.env` | Managed env layer (wins over `~/.hermes/.env` and shell) |
| `HERMES_MANAGED_DIR` | Env var relocating the managed directory |

Precedence (highest wins, for pinned keys only):

| Tier | config.yaml | .env |
|------|-------------|------|
| 1 | `/etc/hermes/config.yaml` (managed) | `/etc/hermes/.env` (managed) |
| 2 | `~/.hermes/config.yaml` (user) | `~/.hermes/.env` (user) |
| 3 | built-in defaults | pre-existing shell environment |

## Notes

- Enforcement is filesystem permissions only; either file is optional, and a missing directory means no managed scope.
- Merging is leaf-level: pinning `model.default` leaves other `model.*` keys (e.g. `model.fallback`) user-controlled.
- Managed values win over the shell environment for pinned keys, inverting the usual "env var overrides config.yaml" rule.
- `hermes config set` on a managed key is refused with an error naming the source (e.g. `Cannot set 'model.default': it is managed by your administrator (/etc/hermes/config.yaml) and cannot be changed.`). Same for env keys pinned by the managed `.env`.
- Distinct from a package-manager-locked install, which blocks all config mutation; the two can coexist.
- A user who can set `HERMES_MANAGED_DIR` can defeat managed scope; fix it administratively (service unit / container image). It is never persisted to any `.env`.
- Changes take effect on next Hermes start. A malformed managed file is logged and ignored (never blocks startup); verify with `hermes doctor`.
- v1 limitations: the managed `.env` is world-readable (`0644`), so use it for non-sensitive values only; the agent's own subprocess shell can set a different env value; root or a user with write access makes it advisory.
- Out of scope for v1: hard boundary against the agent, native macOS/Windows locations, `managed.d/` drop-ins, signed files, MDM delivery, group-scoped secret permissions.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/managed-scope (v0.22.2 docs source)

## Related

- [Configuration](./configuration.md)
