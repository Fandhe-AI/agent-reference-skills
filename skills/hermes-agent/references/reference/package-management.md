# Package Management

`hermes pm` manages Hermes tool binaries and Python dependency environments. It is not the application updater; use the installation's update method (`hermes update`) for that.

## Signature / Usage

```bash
hermes pm --help
hermes pm doctor
hermes pm status
hermes pm install
hermes pm install chromium
```

## Options / Props

User commands:

| Command | Effect |
|---------|--------|
| `pm install [names...]` | Install named packages. With no names: provision required tools plus Python, put tools on PATH, sync the `all` extra, and install default optional tools (`chromium`, the browser Hermes launches, and `cua-driver`); a failed download of those only warns. Naming a previously declined package undoes that choice |
| `pm install --without NAME` | Bare install without default optional package `NAME` (`chromium` or `cua-driver`) and remember the choice (installers' `--skip-browser` / `--skip-computer-use` use this; the browser opt-out passes the legacy name `--without agent-browser`, which this release reads as `chromium`) |
| `pm install --without EXTRA` | Drop a recorded Python extra that `[all]` does not include (e.g. `matrix`, carried forward from a pre-PM venv); the choice is recorded and `hermes update` never adds it back. Extras inside `[all]` are refused. `pm install --extra EXTRA` opts back in |
| `pm environment NAME --extra EXTRA` / `--requirement REQ` | Make the isolated side environment `HERMES_HOME/environments/NAME` current and print only its Python path on stdout (progress to stderr), for shell callers such as skills. Never `pip install` into the result |
| `pm install --tools-only` | Install the tool closure and put it on PATH; skip the venv sync |
| `pm env [names...]` | Print installed packages' PM-contributed environment values as JSON (excludes inherited process variables; may reveal local paths) |
| `pm doctor` | Check installed tool identities, files, and digests against the lock, and look for corrupt entries in PM's uv cache; `--repair` removes those entries so they are fetched again |
| `pm repair` | Rebuild the recorded Python dependency set in a new generation, validate, then select it. Does not update pins, features, or plugin configuration |
| `pm status` | Print the latest sync/update receipt as JSON |
| `pm gc` | Remove unreferenced tool-store entries, eligible download partials, unused lease-managed Python generations, and state of deleted checkouts (a missing checkout outside a `.worktrees/` dir or the data root is kept until its state has gone unused for `worktrees.install_state_retention_days`, default 14, `0` = forever) |

Maintainer commands:

| Command | Effect |
|---------|--------|
| `pm lock` | Relock `uv.lock` from `pyproject.toml` (no environment change) |
| `pm lock --bump NAME VERSION` | Resolve and hash target artifacts, write the tool pin to `pm/lock.json`, and regenerate the bootstrap pins in `scripts/install.sh` and `scripts/install.ps1` |
| `pm update [names...]` | Query upstream versions, change tool pins, regenerate the installers' bootstrap pins, install changed tools |
| `pm update --check` | Query without writing; exit 1 can mean updates exist |
| `pm update --target TARGET` / `--skip-target TARGET` / `--uv` / `--pnpm` / `--termux` | Per-target resolution, leave TARGET's pins unchanged (repeatable), refresh Python (`uv.lock`) / JavaScript (`pnpm-lock.yaml`) resolution, repin termux pool archives |
| `pm install --target TARGET NAME...` | Stage explicit cross-target packages without recording them as the host runtime |
| `pm bundle --out DIR [--ref REF]` | Stage a source snapshot, native tools, facts, and Python dependencies (not a signed installer) |

State files:

| File | Role |
|------|------|
| `pm/lock.json` | Exact managed-tool versions, target URLs, SHA-256 hashes |
| `pm/pyproject.toml`, `pm/uv.lock` | Dependency manager's own Python requirements |
| `pyproject.toml`, `uv.lock` | Application Python requirements, extras, markers, committed resolution |
| Tool-store `facts.json` | Installed tool entries and realized-file digests |
| Per-install `facts.json` | Selected Python environment, input stamp, enabled extras |
| `install-stamp.json` | Build provenance and declared distribution/update owner |

Writable state: tools in `tools/`, resumable downloads in `cache/partials/`, per-install selection in `installs/INSTALL_KEY/` (generations in `.../environments/`), receipts in `logs/update_receipts/`.

Public Python interface (`pm` module):

| Operation | Ownership |
|-----------|-----------|
| `pm.sync_venv(extras, explicit=True)` | Prepare and select the full application dependency union, including enabled plugins |
| `pm.sync_venv(repair=True, explicit=True)` | Replay the recorded dependency set in a new generation |
| `pm.build_environment(source=..., out=..., explicit=True)` | Build and validate a fresh caller-owned output |
| `pm.lock_project(source, explicit=True)` | Refresh an explicit project's lock |
| `pm.ensure_environment(name, requirements, explicit=True)` | Prepare an isolated dependency generation; returns its Python path |
| `pm.ensure_project_environment(name, project, extras=..., explicit=True)` | Prepare an isolated generation of a project's locked dependencies without installing the project; returns its Python path |
| `pm.ensure_python_tool(name, requirements, executable, explicit=True)` | Prepare an isolated tool; returns its executable path |
| `pm.venv_is_current()` | Ask a ready PM worker whether dependencies are current; false if the manager runtime is unavailable |

Developer workflow:

```bash
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
export HERMES_HOME="$HOME/hermes-dev-data"
export HERMES_RUNTIME_DIR="$HERMES_HOME/tools"
source ./activate          # fish: source ./activate.fish ; PowerShell: . .\activate.ps1
python -m pm.cli install   # sync without activating
hermes pm lock             # after editing pyproject.toml
scripts/run-in-hermes-env python scripts/release.py --help
```

Network retries: probes and non-resumable transfers get at most 4 attempts, backoff 1/2/4 s (a `Retry-After` can extend up to 30 s); resumable transfers renew their retry budget when they save new progress (four failures without progress stop retries); with a pinned mirror available, waits above 30 s switch to it, and the last source honors `Retry-After` up to five minutes. Retryable statuses 408, 429, 500, 502, 503, 504.

## Notes

- Lazy-install policy: `hermes config set security.allow_lazy_installs false` stops on-demand installation; it is not a sandbox. `HERMES_DISABLE_LAZY_INSTALLS` is an internal flag (Docker sets it); do not put it in `.env`.
- Every Python package Hermes itself depends on must be at least 3 days old when locked (uv `exclude-newer`, enforced by CI). `hermes pm lock` against a mirror without upload times fails with `has no publish time`; use `https://pypi.org/simple` for that step. Set a mirror with `index-url` in `pip.conf` or `UV_INDEX_URL`.
- Do not mutate a Hermes environment with raw pip or uv; uv is a private PM detail. Do not run `hermes update` just to refresh a feature branch.
- Installing a plugin requires trusting the plugin and its dependencies; PM is not a sandbox. PM owns the pinned `bws` and `iron-proxy` packages (hashes from `pm/lock.json`).
- Diagnostics: `hermes pm doctor` for a missing/outdated tool, `hermes pm status` for conflicts, `hermes pm repair` then restart for damaged Python dependencies; a new environment needs a process restart.
- Packaged installs: base payload is immutable; Termux uses a sealed APT package, Docker bakes the runtime and disables on-demand installs, Nix uses derivations.
- JavaScript workspaces: run `pnpm install --frozen-lockfile` once at the repository root, then `pnpm --dir ui-tui run build` / `pnpm --dir apps/desktop run dev`; PM activation provides the pnpm version `pm/lock.json` pins. In the repository root and JS workspace folders npm refuses install/resolve commands (`engine-strict=true`); `npx`, `npm exec` and `npm run` keep working. The website stays a separate npm project (`npm ci --prefix website`, `npm run build:fast --prefix website`).
- A pnpm release-age policy (`minimumReleaseAge` in `pnpm-workspace.yaml`, 20160 minutes = 14 days) mirrors the Python one; CA trust stores (`certifi`) are exempt from the Python age check.
- The first PM generation that replaces a pre-PM `venv/` or `.venv` also carries the extras that venv held (Matrix, FAL, ...); a carried extra that no longer builds is left out with a message, and `hermes pm install --extra NAME` adds it back once the build is fixed.
- The pinned Linux Python records `clang`/`clang++`; when those are not on `PATH` but `gcc`/`g++` are (stock Debian, Ubuntu, WSL), PM points `CC`/`CXX` (and `LDSHARED`/`LDCXXSHARED`) at them and defaults `AR` to the host's `ar`. With no compiler at all, a source build fails with a hint to install one (`sudo apt install build-essential`).
- Plugin snapshots keep a plugin's runtime dependencies and selected extras only; a plugin requirement naming `hermes-agent` is checked by PM against the running Hermes version (PEP 440), and a plugin that excludes the running version is refused or skipped at load. The workspace is solved only for the interpreter's platform and architecture.
- Source: https://hermes-agent.nousresearch.com/docs/reference/package-management (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

Migration (v0.22 -> v0.23): the default optional browser package is named `chromium` (was `agent-browser` and Chromium); `--without agent-browser` is still accepted and read as `chromium`. JavaScript tooling moved from npm to pnpm (`pm update --npm` became `pm update --pnpm`; developer commands use `pnpm`, and `pnpm --version` replaces `npm --version` in the environment check). `just` recipes (`just js-install`, `just desktop`, `just tui`, `just check`) wrap these developer commands.

## Related

- [Environment Variables](./environment-variables.md)
- [Skills Hub](./skills-hub.md)
