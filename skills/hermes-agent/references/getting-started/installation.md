# Installation

Install Hermes Agent via a Desktop package or a one-line script (Linux, macOS, WSL2, Windows). Android uses the Termux APT package instead of the scripts.

## Signature / Usage

```bash
# Linux / macOS / WSL2
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash

# Windows (PowerShell)
iex (irm https://hermes-agent.nousresearch.com/install.ps1)

# After installation
hermes

# Install and run Hermes Desktop after a command-line only install
hermes desktop
```

## Install Methods

| Method | Platforms | Notes |
|--------|-----------|-------|
| Desktop package (Windows) | Windows | Open the `.appinstaller` download with Windows App Installer; installs the signed MSIX bundle and records its update source. Microsoft Store packages have separate Store ownership |
| Desktop package (macOS) | macOS | Open the DMG, copy `Hermes.app` to Applications. The ZIP artifact carries the signed app used by the automatic updater. Apple Silicon only |
| Linux desktop package | Linux | None (Linux desktop packaging is disabled in the release workflow) |
| Source script (bash) | Linux, macOS, WSL2 | Clones source, bootstraps uv, delegates dependency preparation to PM |
| Source script (PowerShell) | Windows native | Same flow; Windows can bootstrap its pinned Git for Windows archive when Git is absent |
| Termux APT package | Android (aarch64) | Configure the signed repository, then `pkg install hermes-agent`. The scripts are not the Termux path |
| Nix flake / NixOS module | NixOS, macOS, Linux | Best-effort only; see Notes |

## What the source installer does

- Clones the source, bootstraps uv, and delegates dependency preparation to PM (`hermes pm`). PM provides pinned Python, Node.js, npm, ripgrep, and FFmpeg.
- Selects the `all` Python extra, not every optional extra.
- Installs `agent-browser` with its pinned Chromium, and `cua-driver` (computer-use driver; macOS, Windows, glibc Linux) by default. If a download fails the install still completes and prints the retry command.
- The default browser driver (browser-harness) is a regular Python dependency, so every install already has it.
- Creates a launcher and prepares the data directory. Interactive runs also invoke setup and gateway configuration.

## Options / Props

| Flag (POSIX / Windows) | Effect |
|------------------------|--------|
| `--skip-browser` / `-SkipBrowser` | Leave browser tools out |
| `--skip-computer-use` / `-SkipComputerUse` | Leave the computer-use driver out |
| `--non-interactive` / `-NonInteractive` | Skip stages that need input |
| `--include-desktop` / `-IncludeDesktop` | Build the desktop from source |
| `--verbose` / `-Verbose`, `HERMES_INSTALL_VERBOSE=1` | Stream all output |

Skip choices are remembered; later installs and `hermes update` do not add them back. Run `hermes pm install agent-browser` or `hermes pm install cua-driver` to install them and undo the choice. On a terminal the scripts show one status line per step and write git / uv / build output to `logs/install.log` under the Hermes data directory.

Add an optional extra to an existing install:

```bash
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['voice'], explicit=True)"
```

## Install layout

| Method | Code | CLI entry point | Default user data |
|--------|------|-----------------|-------------------|
| POSIX source script | `~/.hermes/hermes-agent/` | `~/.local/bin/hermes` wrapper | `~/.hermes/` |
| Windows source script | `%LOCALAPPDATA%\hermes\hermes-agent\` | `%LOCALAPPDATA%\hermes\bin\` | `%LOCALAPPDATA%\hermes\` |
| Desktop bundle | Inside the installed app package | Packaged launchers; Windows execution aliases | Platform default Hermes data directory |
| Docker | `/opt/hermes/` | Image entrypoint and `hermes` shim | Mounted `/opt/data/` |
| Termux APT | `$PREFIX/lib/hermes-agent/` | Symlinks in `$PREFIX/bin/` | `~/.hermes/` |

`HERMES_HOME` selects user data. The POSIX script's `--dir` selects its source checkout independently; Windows provides `-HermesHome` and `-InstallDir`. Running the POSIX script as root uses root's home unless you provide an explicit source path. Do not remove the data root to repair an application installation.

## Post-Installation Commands

| Command | Description |
|---------|-------------|
| `hermes model` | Select / change LLM provider |
| `hermes setup --portal` | Quick Nous Portal configuration (300+ models, Tool Gateway) |
| `hermes tools` | Enable or disable tools |
| `hermes gateway setup` | Set up messaging platforms |
| `hermes config set` / `hermes config get` | Set / inspect individual config values |
| `hermes setup` | Full setup wizard |
| `hermes desktop` | Install and run Hermes Desktop |
| `hermes doctor` | Diagnose configuration issues (also reports installation provenance and storage problems) |
| `hermes config check` / `hermes config migrate` | Validate configuration / migrate after update |

## Notes

- Prerequisites for the POSIX script: Git, curl, tar, and SHA-256 utilities. The script always downloads its verified uv pin; a uv on your PATH is never used.
- Current first-party installations run on **Python 3.14**. The broader `>=3.11,<3.15` range in `pyproject.toml` lets older Python installations run the updater before PM switches them to 3.14; it does not promise runtime support on 3.11–3.13. PM selects tool versions from `pm/lock.json` and does not adopt arbitrary system Node versions.
- On glibc Linux the managed Node.js links `libatomic.so.1`; the installer and `hermes update` install the distro package when missing (`libatomic1` on apt/zypper, `libatomic` on dnf/yum/apk, `gcc-libs` on pacman), as root or via `sudo -n`. `--non-interactive` never prompts.
- Bundled desktop packages contain the agent, Python, supported dependencies, and prebuilt interfaces; first launch does not build the base runtime. A `Hermes-Setup` bootstrap installer instead downloads a source installation and builds the desktop app. There is no remote-only Desktop download; connect to a remote backend from Settings → Gateways.
- The macOS installer is Apple Silicon only (Intel: see Platform Support).
- Nix is no longer an explicitly supported install path (best-effort only); see the Nix & NixOS setup guide.
- Manual / developer installation: the former 10-step manual procedure is no longer in the docs; a source checkout follows the PM developer workflow (reference/package-management). Extras are no longer installed with `uv pip install -e ".[...]"`; use `pm.sync_venv([...], explicit=True)`.
- Non-sudo / service user installs: run the source installer as the service user, add `$HOME/.local/bin` to PATH, run `hermes doctor`, and for a Linux user service surviving logout run `sudo loginctl enable-linger SERVICE_USER` as an administrator. The installer does not run Playwright's `--with-deps`; the administrator supplies system libraries.
- Symlinked `HERMES_HOME` and subdirectories (`hooks`, `skills`, `sessions`, `logs`) are supported and preserved. If a link target is missing or not a directory, initialization stops with a storage error rather than recreating it; `hermes doctor` reports it as a storage problem.
- Install method auto-detection: source checkouts use the managed Git update path; Desktop bundles, Docker, Nix, and Termux packages retain their package owner's update mechanism.
- If `hermes` is not found after install, reload your shell (`source ~/.bashrc` or `source ~/.zshrc`).

## Related

- [Platform Support](./platform-support.md)
- [Quickstart](./quickstart.md)
- [Learning Path](./learning-path.md)
