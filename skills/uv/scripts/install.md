---
source: https://docs.astral.sh/uv/getting-started/installation/
---

# Install

Commands to install uv itself: standalone installer, PyPI, Homebrew, MacPorts, WinGet, Scoop, Cargo, and Docker. Installer customization is documented at `https://docs.astral.sh/uv/reference/installer/`.

## Standalone installer (macOS / Linux)

> **Warning**: This downloads a script from the internet and runs it. Review the file before running it, and run it in a disposable environment (container, VM) or a trusted one. The installer may modify your shell profile.

```sh
curl -LsSf -o install.sh https://astral.sh/uv/install.sh
less install.sh
sh install.sh
```

If `curl` is not available, download with `wget` instead.

```sh
wget -qO install.sh https://astral.sh/uv/install.sh
less install.sh
sh install.sh
```

The official documentation shows a one-liner that pipes the output of `curl` straight into `sh`. The three-step form above (download, inspect, run) is used here so the script is reviewed before execution.

## Install a specific version (macOS / Linux)

> **Warning**: This runs a downloaded script. Review it before running it.

```sh
curl -LsSf -o install.sh https://astral.sh/uv/0.13.1/install.sh
less install.sh
sh install.sh
```

The version `0.13.1` in the URL is the one used in the official documentation.

## Standalone installer (Windows)

> **Warning**: This runs a downloaded script with the execution policy set to ByPass. Review the file first, and run it in a disposable or trusted environment.

```powershell
irm https://astral.sh/uv/install.ps1 -OutFile install.ps1
Get-Content .\install.ps1 | more
powershell -ExecutionPolicy ByPass -File .\install.ps1
```

To pin a version, include it in the URL.

```powershell
irm https://astral.sh/uv/0.13.1/install.ps1 -OutFile install.ps1
Get-Content .\install.ps1 | more
powershell -ExecutionPolicy ByPass -File .\install.ps1
```

The official documentation shows a one-liner that passes the output of `irm` to `iex`, which executes the script without a review step.

## Inspect the installer before running it

The official documentation states that the installer script can be inspected before it is run. Use the downloaded file from the sections above.

```sh
less install.sh
```

```powershell
Get-Content .\install.ps1 | more
```

Installers and binaries can also be downloaded directly from GitHub Releases (`https://github.com/astral-sh/uv/releases`), as the official documentation describes.

## Change the installation directory

> **Warning**: This runs a downloaded script. Review it before running it, and use a disposable or trusted environment.

```sh
curl -LsSf -o install.sh https://astral.sh/uv/install.sh
less install.sh
UV_INSTALL_DIR=/custom/path sh install.sh
```

```powershell
irm https://astral.sh/uv/install.ps1 -OutFile install.ps1
Get-Content .\install.ps1 | more
$env:UV_INSTALL_DIR = "C:\Custom\Path"
powershell -ExecutionPolicy ByPass -File .\install.ps1
```

Only the location of the uv binary changes. The cache, Python, and tools data directories keep their defaults.

## Disable shell profile modification

> **Warning**: This runs a downloaded script. Review it before running it, and use a disposable or trusted environment.

```sh
curl -LsSf -o install.sh https://astral.sh/uv/install.sh
less install.sh
UV_NO_MODIFY_PATH=1 sh install.sh
```

When installed with `UV_NO_MODIFY_PATH`, later `uv self update` runs also leave the shell profile unchanged.

## Unmanaged install (CI and other disposable environments)

> **Warning**: This runs a downloaded script. Review it before running it, and use a disposable or trusted environment.

```sh
curl -LsSf -o install.sh https://astral.sh/uv/install.sh
less install.sh
UV_UNMANAGED_INSTALL=/custom/path sh install.sh
```

Installs to the given path without modifying shell profiles or environment variables. Self-update with `uv self update` is disabled.

## List installer options

> **Warning**: This runs a downloaded script. Review it before running it.

```sh
curl -LsSf -o install.sh https://astral.sh/uv/install.sh
less install.sh
sh install.sh --help
```

The official documentation recommends configuring the installer through environment variables.

## PyPI (pipx / pip)

Installing into an isolated environment is recommended.

```sh
pipx install uv
```

```sh
pip install uv
```

If no wheel exists for the target platform, uv is built from source and a Rust toolchain is required.

## Homebrew

```sh
brew install uv
```

## MacPorts

```sh
sudo port install uv
```

## WinGet

```powershell
winget install --id=astral-sh.uv  -e
```

## Scoop

```powershell
scoop install main/uv
```

## Cargo

```sh
cargo install --locked uv
```

Builds from source, so a compatible Rust toolchain is required.

## Docker image

The official image is `ghcr.io/astral-sh/uv`. The installation page has no concrete pull command; see the Docker integration guide (`https://docs.astral.sh/uv/guides/integration/docker/`) for usage.

## Verify the installation

```sh
uv
```

A help menu listing the commands means uv is available (`https://docs.astral.sh/uv/getting-started/first-steps/`).
