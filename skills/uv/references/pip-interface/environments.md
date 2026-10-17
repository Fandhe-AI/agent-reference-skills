---
source: https://docs.astral.sh/uv/pip/environments/
---

# Using environments

Each Python installation has an environment that is active when Python is used. A virtual environment is a lightweight way to isolate packages from a Python installation's environment. Unlike `pip`, uv requires using a virtual environment by default.

## Signature / Usage

```console
$ uv venv
$ uv venv my-name
$ uv venv --python 3.11
```

## Creating a virtual environment

- `uv venv` creates a virtual environment at `.venv`; a specific name or path can be specified (`uv venv my-name`).
- A Python version can be requested (`uv venv --python 3.11`). This requires the requested Python version to be available on the system; if unavailable, uv will download Python.

## Using a virtual environment

When using the default virtual environment name, uv will automatically find and use the virtual environment during subsequent invocations.

```console
$ uv venv

$ # Install a package in the new virtual environment
$ uv pip install ruff
```

The virtual environment can be "activated" to make its packages available:

**macOS and Linux**

```console
$ source .venv/bin/activate
```

**Windows**

```pwsh-session
PS> .venv\Scripts\activate
```

The default activation script on Unix is for POSIX compliant shells like `sh`, `bash`, or `zsh`. Additional activation scripts for other shells:

```console
$ source .venv/bin/activate.fish     # fish
$ source .venv/bin/activate.csh      # csh / tcsh
$ use .venv\Scripts\activate.nu      # Nushell
```

To exit a virtual environment, use the `deactivate` command.

## Using arbitrary Python environments

Since uv has no dependency on Python, it can install into virtual environments other than its own.

- Setting `VIRTUAL_ENV=/path/to/venv` will cause uv to install into `/path/to/venv`, regardless of where uv is installed. If `VIRTUAL_ENV` is set to a directory that is not a PEP 405 compliant virtual environment, it will be ignored.
- `uv pip install --python /path/to/python` installs into the environment linked to that interpreter regardless of whether or not it is a virtual environment. `--python` also accepts a path to the root directory of a virtual environment.
- `uv pip install --system` installs into the system Python environment. It is roughly equivalent to `uv pip install --python $(which python)`, but executables that are linked to virtual environments will be skipped. `--system` is appropriate in continuous integration and containerized environments.
- The `--system` flag is also used to opt in to mutating system environments. If uv finds a system interpreter (e.g., `/usr/lib/python3.12`) via a `--python 3.12` request, `--system` is required to allow modification of that non-virtual environment. Without `--system`, uv ignores interpreters that are not in virtual environments; with `--system`, uv ignores interpreters that are in virtual environments.
- Installing into system Python across platforms and distributions is notoriously difficult. uv supports the common cases, but will not work in all cases. For example, installing into system Python on Debian prior to Python 3.10 is unsupported due to the distribution's patching of `distutils` (but not `sysconfig`).
- If uv is installed in a Python environment, e.g., with `pip`, it can still be used to modify other environments. When invoked with `python -m uv`, uv defaults to the parent interpreter's environment. Invoking uv via Python adds startup overhead and is not recommended for general usage.
- uv itself does not depend on Python, but it needs to locate a Python environment to (1) install dependencies into the environment and (2) build source distributions.

## Discovery of Python environments

When running a command that mutates an environment such as `uv pip sync` or `uv pip install`, uv searches for a virtual environment in the following order:

1. An activated virtual environment based on the `VIRTUAL_ENV` environment variable.
2. An activated Conda environment based on the `CONDA_PREFIX` environment variable.
3. A virtual environment at `.venv` in the current directory, or in the nearest parent directory.

If no virtual environment is found, uv will prompt the user to create one in the current directory via `uv venv`.

If the `--system` flag is included, uv skips virtual environment search for an installed Python version. When running a command that does not mutate the environment such as `uv pip compile`, uv does not require a virtual environment, but a Python interpreter is still required.

## Notes

- Changed in 0.13.0: uv omits the distutils startup patch (`_virtualenv.py` and `_virtualenv.pth`) from new virtual environments on Python 3.10 and later (Python 3.9 and earlier retain it). There is no opt-out; existing virtual environments are not modified automatically; recreate an environment with Python 3.10 or later to remove the patch. See `../getting-started/breaking-changes-0-13.md`.

## Related

- [uv venv](./uv-venv.md)
- [uv pip install](./uv-pip-install.md)
- [Managing packages](./packages.md)
