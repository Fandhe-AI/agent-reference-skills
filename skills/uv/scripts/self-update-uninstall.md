---
source: https://docs.astral.sh/uv/getting-started/installation/#upgrading-uv
---

# Self Update and Uninstall

Commands to update uv, show its version, and uninstall it manually.

## Update uv (standalone installer)

```sh
uv self update
```

Works only when uv was installed with the standalone installer. The update re-runs the installer and may modify the shell profile. Set `UV_NO_MODIFY_PATH=1` to prevent that.

## Update to a specific version

```sh
uv self update <TARGET_VERSION>
```

Without `TARGET_VERSION`, uv updates to the latest version (`https://docs.astral.sh/uv/reference/cli/#uv-self-update`).

## Dry run of the update

```sh
uv self update --dry-run
```

Shows what would happen without performing the update.

## Update with other installation methods

Self update is disabled for other installation methods, so use the package manager's own procedure. The official example is pip.

```sh
pip install --upgrade uv
```

## Show the uv version

```sh
uv self version
```

Source: `https://docs.astral.sh/uv/reference/cli/#uv-self-version`.

## Uninstall step 1: remove stored data (optional)

> **Warning**: This deletes the uv cache, uv-managed Pythons, and installed tools. Run it only in a disposable environment or one where you have confirmed the data is not needed. `rm -r` cannot be undone.

```sh
uv cache clean
rm -r "$(uv python dir)"
rm -r "$(uv tool dir)"
```

Run this before removing the binary. For where data is stored, see `https://docs.astral.sh/uv/reference/storage/`.

## Uninstall step 2: remove the binaries (macOS / Linux)

> **Warning**: This deletes the uv and uvx executables.

```sh
rm ~/.local/bin/uv ~/.local/bin/uvx
```

Before 0.5.0, uv was installed to `~/.cargo/bin`, and it can be removed from there too. Upgrading from an older version does not remove it automatically.

## Uninstall step 2: remove the binaries (Windows)

> **Warning**: This deletes the uv, uvx, and uvw executables.

```powershell
rm $HOME\.local\bin\uv.exe
rm $HOME\.local\bin\uvx.exe
rm $HOME\.local\bin\uvw.exe
```

All sources: `https://docs.astral.sh/uv/getting-started/installation/#uninstallation`. The official documentation has no dedicated uninstall command.
