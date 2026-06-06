# Installation

CadQuery can be installed via Conda (recommended) or pip. Supports Linux, macOS, and Windows.

## Conda (Recommended)

Conda is the better-tested and more mature installation path. Use Miniforge (defaults to conda-forge) to avoid polluting the system Python.

### Install Miniforge

**Linux / macOS:**
```bash
curl -L -o miniforge.sh https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh
bash miniforge.sh -b -p $HOME/miniforge
source $HOME/miniforge/bin/activate
```

**Windows (CMD/PowerShell):**
```bat
curl -L -o miniforge.exe https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Windows-x86_64.exe
miniforge.exe /InstallationType=JustMe /S /D=%USERPROFILE%\miniforge
```

### Install CadQuery

```bash
# Latest release
mamba install cadquery

# Specific version
mamba install cadquery=2.3.1

# Development (master) build
mamba install -c cadquery cadquery=master
```

## Pip

Supported on Linux, macOS, and Windows with Python 3.9+.

```bash
# Upgrade pip first
pip install --upgrade pip

# Standard install
pip install cadquery

# With Jupyter support
pip install cadquery[ipython]

# From GitHub (latest dev)
pip install git+https://github.com/CadQuery/cadquery.git

# Developer setup
pip install cadquery[dev]
```

Virtual environments are strongly recommended to avoid system conflicts.

## Verify Installation

```bash
python -c "import cadquery; cadquery.Workplane('XY').box(1,2,3).toSvg()"
```

A successful run produces SVG output without errors.

## GUI Options

**CQ-editor (standalone):**
1. Download the installer from GitHub releases.
2. Make executable (`chmod +x run.sh` on Linux/macOS).
3. Run `run.sh` (Linux/macOS) or `run.bat` (Windows).

**Jupyter:**
```bash
mamba install jupyterlab   # or: pip install jupyterlab
```
Display models in notebooks with `display(result)`.

## Notes

- Older releases may be incompatible with the latest OCP/OCCT version; pin the version explicitly if needed.
- Miniforge's `/InstallationType=JustMe` on Windows avoids registry pollution from a system-wide install.

## Related

- [Introduction](./introduction.md)
- [QuickStart](./quickstart.md)
