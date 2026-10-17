# Switching to a Source Install

A source checkout and a packaged app are separate installations; a bundled app keeps using its own payload and does not adopt a nearby checkout. Use a source-built desktop (`hermes desktop` from the checkout) to run modified code.

## Signature / Usage

```bash
hermes backup
hermes gateway status

git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent

source ./activate
hermes --version
```

PowerShell on native Windows:

```powershell
. .\activate.ps1
hermes --version
```

Selecting a separate data home for development:

```bash
export HERMES_HOME="$HOME/hermes-source-data"
hermes setup
hermes
```

## Options / Props

| Host | Default data location |
|---|---|
| Linux, macOS, WSL, Termux | `~/.hermes/` |
| Native Windows | `%LOCALAPPDATA%\hermes\` |
| Official Docker container | `/opt/data/`, mapped to host storage |

## Notes

- Back up (`hermes backup`, keep it outside any directory you will remove; it can contain credentials) and stop the old runtime first. Quitting the desktop does not stop an independently managed gateway; use `hermes gateway stop`. Avoid mixed code versions writing the same home while migrations run.
- Do not clone into a signed app package or overwrite the packaged runtime. Activation runs the bootstrap (tool pins from `pm/lock.json`, installed via PM); first-party code runs on Python 3.14, and the source default is the `all` extra. `deactivate` restores the shell. Developer prerequisites: package-management and contributing guides.
- Same host normal use: select the same `HERMES_HOME` and profile as before. For development a separate home is safer because new code can migrate stored data. Changing the home after preparing PM state requires re-running the bootstrap for that home.
- Docker: `/opt/data` is a container path; for a bind mount use the host-side directory as `HERMES_HOME`; for named volumes stop the old gateway and export/import or copy through a controlled mount. A local `docker build -t hermes-agent .` yields another image-managed install.
- Nix: `nix run .` still runs a Nix-owned derivation; use `nix develop` for a dev shell. Termux is a bionic APT package; the source bootstrap is not its supported route.
- Switching back: stop the source runtime, leave activation, check `command -v hermes` (Windows `Get-Command hermes -All`). Downgrading is not the reverse of a schema migration; restore a compatible pre-switch backup if needed. Deleting the checkout does not remove the packaged app or PM entries; use PM diagnostics and garbage collection.
- Troubleshooting: wrong version (inspect command resolution), missing dependencies (`python -m pm.cli install`), gateway already running (`hermes gateway status`), skills differences after first run (newer code can sync bundled skills into the home).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/switching-to-source (pinned to v0.22.2)

## Related

- [docker.md](./docker.md)
- [windows-native.md](./windows-native.md)
- [desktop.md](./desktop.md)
