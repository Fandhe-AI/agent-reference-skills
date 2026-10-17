---
source: https://raw.githubusercontent.com/apple/python-apple-fm-sdk/v0.2.1/README.md, https://raw.githubusercontent.com/apple/python-apple-fm-sdk/v0.2.1/docs/source/getting_started.rst, https://raw.githubusercontent.com/apple/python-apple-fm-sdk/v0.2.1/docs/source/index.rst
---

# python-sdk-install

Install commands for the Foundation Models SDK for Python (`apple-fm-sdk` 0.2.1, GitHub tag `v0.2.1`). For the API itself, see `references/python-sdk/`.

## Requirements

- macOS 26.0+
- Xcode 26.0+ (agree to the Xcode and Apple SDKs agreement in the Xcode app)
- Python 3.10+
- Apple Intelligence turned on for a compatible Mac

`getting_started.rst` adds a tip: make sure the Xcode version matches the macOS version to avoid model compatibility issues.

## Install from PyPI

```bash
pip install apple-fm-sdk
```

Installs the released package. Activate a virtual environment first if you do not want it in your global Python.

## Verify the installation

```python
import apple_fm_sdk as fm

# Check if the model is available
model = fm.SystemLanguageModel()
is_available, reason = model.is_available()

if is_available:
    print("Foundation Models SDK is ready!")
else:
    print(f"Foundation Models not available: {reason}")
```

Run this in a Python interpreter or script after installing. If it prints "Foundation Models not available", check that the device supports Apple Intelligence, that Apple Intelligence is turned on in System Settings, and that the OS and Xcode versions match (macOS 26.0+).

## Development install: get the code

```bash
git clone https://github.com/apple/python-apple-fm-sdk
cd python-apple-fm-sdk
```

Use this path only to modify the SDK or install from source.

## Development install: create a virtual environment

```bash
uv venv
source .venv/bin/activate
```

Optional but recommended. Requires [uv](https://docs.astral.sh/uv/getting-started/installation/) (or another package manager of your choice).

## Development install: sync dependencies

```bash
uv sync
```

Installs the package in editable mode along with all dependencies.

## Rebuild and run the tests

```bash
uv pip install -e .
pytest
```

Run after every change to the SDK. The tests live in the `tests/` directory of the repository.

## Notes

- The README states the project is not yet taking contributions.
- Swift equivalent: `getting_started.rst` points Swift development to the Foundation Models framework documentation; see `references/guides/generating-content.md`.
