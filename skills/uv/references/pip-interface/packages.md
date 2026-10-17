---
source: https://docs.astral.sh/uv/pip/packages/
---

# Managing packages

Install, uninstall, and install-from-file recipes for the `uv pip` interface.

## Signature / Usage

```console
$ uv pip install flask
$ uv pip install "flask[dotenv]"
$ uv pip install flask ruff
$ uv pip install 'ruff>=0.2.0'
$ uv pip install 'ruff==0.3.0'
$ uv pip install "ruff @ ./projects/ruff"
$ uv pip install "git+https://github.com/astral-sh/ruff"
```

## Installing from Git

```console
$ # Install a tag
$ uv pip install "git+https://github.com/astral-sh/ruff@v0.2.0"

$ # Install a commit
$ uv pip install "git+https://github.com/astral-sh/ruff@1fadefa67b26508cc59cf38e6130bde2243c929d"

$ # Install a branch
$ uv pip install "git+https://github.com/astral-sh/ruff@main"
```

See the Git authentication documentation (`../indexes-auth/git-credentials.md`) for installation from a private repository.

## Editable packages

Editable packages do not need to be reinstalled for changes to their source code to be active.

```console
$ uv pip install -e .
$ uv pip install -e "ruff @ ./project/ruff"
```

## Installing packages from files

```console
$ uv pip install -r requirements.txt
$ uv pip install -r pyproject.toml
$ uv pip install -r pyproject.toml --extra foo
$ uv pip install -r pyproject.toml --all-extras
```

To install dependency groups in the current project directory's `pyproject.toml`, for example the group `foo`:

```console
$ uv pip install --group foo
```

To specify the project directory where groups should be sourced from:

```console
$ uv pip install --project some/path/ --group foo --group bar
```

Alternatively, specify a path to a `pyproject.toml` for each group:

```console
$ uv pip install --group some/path/pyproject.toml:foo --group other/pyproject.toml:bar
```

## Uninstalling a package

```console
$ uv pip uninstall flask
$ uv pip uninstall flask ruff
```

## Notes

- As in pip, `--group` flags do not apply to other sources specified with flags like `-r` or `-e`. For instance, `uv pip install -r some/path/pyproject.toml --group foo` sources `foo` from `./pyproject.toml` and **not** `some/path/pyproject.toml`.
- See `locking-environments.md` for more information on `requirements.txt` files.

## Related

- [uv pip install](./uv-pip-install.md)
- [uv pip uninstall](./uv-pip-uninstall.md)
- [Locking environments](./locking-environments.md)
