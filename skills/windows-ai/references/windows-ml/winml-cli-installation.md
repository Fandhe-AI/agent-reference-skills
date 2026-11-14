# Install Windows ML CLI (winml-cli)

Install Windows ML CLI in an isolated Python 3.11 x64 environment with `uv`, then check the available compute devices and execution providers.

## Signature / Usage

Run in PowerShell from the directory where you want to create the environment:

```powershell
uv python install cpython-3.11-windows-x86_64-none
uv venv --python cpython-3.11-windows-x86_64-none
uv pip install winml-cli
```

These commands install x64 Python 3.11, create a local `.venv`, and install the latest published CLI package into it. Use `uv run winml` from this directory without activating the environment.

Verify:

```powershell
uv run winml --version
uv run winml sys --list-device --list-ep
```

Install from source (for development, to contribute or run unreleased code):

```powershell
git clone https://github.com/microsoft/winml-cli.git
cd winml-cli
uv sync --python cpython-3.11-windows-x86_64-none
```

## Options / Props

| Component | Details |
|-----------|---------|
| Windows | Windows 11, version 24H2 or later for NPU workflows |
| Hardware | Device with CPU, GPU, or NPU |
| Python | 3.11, x64 (AMD64), including on Windows on Arm |
| Package manager | `uv` |
| Version control | Git, only if you install from source |

## Notes

- No NPU needed: start with a CPU. Commands that expose `--device auto` select an available device; this doesn't guarantee a model runs on every provider. Use an explicit CPU target for the quickstart.
- Windows on Arm requires x64 Python: the CLI's current dependency set doesn't support native Arm64 Python. The commands above explicitly select an x64 interpreter, which runs under emulation. Runtime and provider availability still depend on the device and driver.
- Internet connection is needed for package installation and for models or providers that aren't already cached.
- The inventory from `winml sys` depends on hardware and installed providers. Confirm the expected device and provider are listed, then run the CPU quickstart. If one is missing, `winml sys` is where to diagnose it.
- `winml --version` identifies the installed distribution. If you run a source checkout, also record its commit when reproducing an issue; editable source and installed package metadata can differ.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/getting-started/installation (retrieved 2026-11-14)

## Related

- [winml-cli quickstart](./winml-cli-quickstart.md)
- [Windows ML CLI (winml-cli) Overview](./winml-cli.md)
- [winml-cli troubleshooting](./winml-cli-troubleshooting.md)
