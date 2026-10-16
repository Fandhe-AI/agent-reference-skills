---
source: https://docs.astral.sh/uv/getting-started/installation/
---

# Installing uv

Install uv with the standalone installers or a package manager. Covers upgrading, shell autocompletion, and uninstallation.

## Signature / Usage

**macOS and Linux** (standalone installer):

Step 1: download the installer to a temporary file and inspect it.

```console
$ installer="$(mktemp)"
$ curl -LsSf https://astral.sh/uv/install.sh -o "${installer}"
$ less "${installer}"
```

With `wget` instead of `curl`:

```console
$ wget -qO "${installer}" https://astral.sh/uv/install.sh
```

Request a specific version by including it in the URL:

```console
$ curl -LsSf https://astral.sh/uv/0.13.1/install.sh -o "${installer}"
```

Step 2: run the reviewed installer, then remove it.

```console
$ sh "${installer}"
$ rm -f "${installer}"
```

**Windows**:

Step 1: download the installer and inspect it.

```pwsh-session
PS> $installer = Join-Path $env:TEMP "uv-install.ps1"
PS> Invoke-WebRequest -Uri https://astral.sh/uv/install.ps1 -OutFile $installer
PS> more $installer
```

For a specific version, use `https://astral.sh/uv/0.13.1/install.ps1` as the URI.

Step 2: run the reviewed installer, then remove it.

```pwsh-session
PS> powershell -ExecutionPolicy ByPass -File $installer
PS> Remove-Item $installer
```

The installation script may be inspected before use (as in step 1 above). Alternatively, the installer or binaries can be downloaded directly from GitHub Releases.

## Other installation methods

| Method | Command |
| --- | --- |
| PyPI (pipx, recommended) | `pipx install uv` |
| PyPI (pip) | `pip install uv` |
| Homebrew | `brew install uv` |
| MacPorts | `sudo port install uv` |
| WinGet | `winget install --id=astral-sh.uv  -e` |
| Scoop | `scoop install main/uv` |
| Cargo | `cargo install --locked uv` |
| Docker | image `ghcr.io/astral-sh/uv` |
| GitHub Releases | download artifacts from `https://github.com/astral-sh/uv/releases` |

## Upgrading uv

When uv is installed via the standalone installer, it can update itself on-demand:

```console
$ uv self update
```

When another installation method is used, self-updates are disabled. Use the package manager's upgrade method instead, for example:

```console
$ pip install --upgrade uv
```

## Shell autocompletion

```bash
echo 'eval "$(uv generate-shell-completion bash)"' >> ~/.bashrc
echo 'eval "$(uv generate-shell-completion zsh)"' >> ~/.zshrc
echo 'uv generate-shell-completion fish | source' > ~/.config/fish/completions/uv.fish
echo 'eval (uv generate-shell-completion elvish | slurp)' >> ~/.elvish/rc.elv
```

PowerShell / pwsh:

```powershell
if (!(Test-Path -Path $PROFILE)) {
  New-Item -ItemType File -Path $PROFILE -Force
}
Add-Content -Path $PROFILE -Value '(& uv generate-shell-completion powershell) | Out-String | Invoke-Expression'
```

For `uvx`, use `uvx --generate-shell-completion <shell>` in the same patterns:

```bash
echo 'eval "$(uvx --generate-shell-completion bash)"' >> ~/.bashrc
echo 'eval "$(uvx --generate-shell-completion zsh)"' >> ~/.zshrc
echo 'uvx --generate-shell-completion fish | source' > ~/.config/fish/completions/uvx.fish
echo 'eval (uvx --generate-shell-completion elvish | slurp)' >> ~/.elvish/rc.elv
```

```powershell
if (!(Test-Path -Path $PROFILE)) {
  New-Item -ItemType File -Path $PROFILE -Force
}
Add-Content -Path $PROFILE -Value '(& uvx --generate-shell-completion powershell) | Out-String | Invoke-Expression'
```

Then restart the shell or source the shell config file. `echo $SHELL` helps determine the shell.

## Uninstallation

1. Clean up stored data (optional; removes the uv cache, managed Pythons, and installed tools):

```console
$ uv cache clean
$ rm -r "$(uv python dir)"
$ rm -r "$(uv tool dir)"
```

2. Remove the uv, uvx, and uvw binaries.

macOS and Linux:

```console
$ rm ~/.local/bin/uv ~/.local/bin/uvx
```

Windows:

```pwsh-session
PS> rm $HOME\.local\bin\uv.exe
PS> rm $HOME\.local\bin\uvx.exe
PS> rm $HOME\.local\bin\uvw.exe
```

## Notes

- The official documentation shows `curl ... | sh` (and `irm ... | iex`) pipe forms; this page rewrites them as download, inspect, then run so the script is reviewed before execution.
- Updating uv via `uv self update` re-runs the installer and can modify shell profiles. To disable this behavior, set `UV_NO_MODIFY_PATH=1`.
- uv ships prebuilt wheels for many platforms; if no wheel is available for a platform, uv is built from source, which requires a Rust toolchain. The Cargo method also builds from source.
- Prior to 0.5.0, uv was installed into `~/.cargo/bin`. The binaries can be removed from there to uninstall. Upgrading from an older version does not automatically remove the binaries from `~/.cargo/bin`.
- Changing the PowerShell execution policy allows running a script from the internet.

## Related

- [Installer options](./installer-options.md)
- [First steps](./first-steps.md)
- [Platform support](./platform-support.md)
