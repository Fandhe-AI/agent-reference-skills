---
source: https://docs.cloud.google.com/python/docs/setup
---

# Setting up a Python development environment

Prepare a local machine for Python development on Google Cloud: install a supported Python, isolate dependencies with `venv`, install a Cloud Client Library and set up authentication.

## Signature / Usage

### Verify Python and pip (macOS / Linux)

```bash
python3 --version
```

```bash
pip3 --version
```

### Verify Python and pip (Windows launcher)

```text
py
```

```text
py -3
```

```text
py -m pip --version
```

### Install Python packages on Debian / Ubuntu

```bash
sudo apt update
sudo apt install python3 python3-dev python3-venv python3-pip
```

### Create a per-project virtual environment (macOS)

```bash
cd your-project
python -m venv env
```

### Create a per-project virtual environment (Windows)

```text
cd your-project
py -m venv env
```

### Create a per-project virtual environment (Linux)

```bash
cd your-project
python3 -m venv env
```

### Activate it (macOS / Linux)

```bash
source env/bin/activate
```

### Activate it (Windows)

```text
.\env\Scripts\activate
```

### Install a Cloud Client Library

```bash
pip install --upgrade google-cloud-storage
```

### Local authentication (user credentials for ADC)

```bash
gcloud auth application-default login
```

### Leave the virtual environment

```bash
deactivate
```

## Notes

- Install a supported Python version (see `supported-python-versions.md`; the pinned packages require Python >= 3.10). The `3.12` in `pyenv install 3.12` is the twin's example, not a requirement. The page recommends always using a per-project virtual environment. For Anaconda, follow Anaconda's own instructions.
- macOS: the page recommends a separate Python (installed via homebrew / `pyenv install PYTHON_VERSION`, `x.y` format) instead of the system Python.
- `gcloud auth application-default login` is not needed in Cloud Shell. If an authentication error is returned while using an external identity provider, confirm you have signed in to the gcloud CLI with your federated identity.
- ADC setup with gcloud belongs to `gcp-foundation`; see also `api-core-authentication.md`. The gcloud CLI itself is covered by `gcp-cli`.
- The twin labels these shell commands as `python` fences; they are relabelled here (not an Adapted change): `bash` for macOS / Linux, and `text` for the Windows blocks, which run in cmd or PowerShell (the twin does not name the shell). The editor list (VS Code, Sublime Text, PyCharm), the macOS `xcode-select` / homebrew prerequisite steps and the Windows `site-packages` path example are omitted.
- This is the Google Cloud client library family, distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill).
- Source: https://docs.cloud.google.com/python/docs/setup (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-python-versions.md](./supported-python-versions.md)
- [api-core-authentication.md](./api-core-authentication.md)
- [overview.md](./overview.md)
