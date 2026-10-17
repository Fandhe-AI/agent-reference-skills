---
source: https://docs.astral.sh/uv/pip/compatibility/#pip-check
---

# Compatibility with pip (options)

Known differences between uv and `pip` / `pip-tools` in command-line options, install behavior, and `pip compile` defaults.

## Signature / Usage

```console
$ uv pip check
$ uv pip install --compile-bytecode flask
$ uv pip compile requirements.in -o requirements.txt --no-strip-extras --emit-index-url
```

## `pip check`

At present, `uv pip check` surfaces the following diagnostics:

- A package has no `METADATA` file, or the `METADATA` file can't be parsed.
- A package has a `Requires-Python` lower bound that excludes the Python version of the running interpreter. Upper bounds are ignored, as they are during resolution.
- A package has a dependency on a package that isn't installed.
- A package has a dependency on a package that's installed, but at an incompatible version.
- Multiple versions of a package are installed in the virtual environment.

In some cases, `uv pip check` surfaces diagnostics that `pip check` does not, and vice versa. For example, unlike `uv pip check`, `pip check` will not warn when multiple versions of a package are installed in the current environment.

## `--user` and the `user` install scheme

uv does not support the `--user` flag, which installs packages based on the `user` install scheme. Use virtual environments instead. pip falls back to the `user` install scheme if the user does not have write permissions to the target directory; uv does not implement any such fallback.

## `--only-binary` enforcement

When `--only-binary :all:` is provided, both pip and uv refuse to build source distributions from PyPI and other registries. When a dependency is provided as a direct URL, pip does not enforce `--only-binary`; uv does, with one exception: given `uv pip install https://... --only-binary flask`, uv will build the source distribution at the given URL if it cannot infer the package name ahead of time. Both allow editable requirements to be built and installed even when `--only-binary` is provided (e.g., `uv pip install -e . --only-binary :all:`).

## `--no-binary` enforcement

When `--no-binary` is provided, uv refuses to install pre-built binary distributions, but will reuse any binary distributions that are already present in the local cache. In contrast to pip, uv's resolver still reads metadata from pre-built binary distributions.

## `manylinux_compatible` enforcement

PEP 600 describes a mechanism through which Python distributors can opt out of `manylinux` compatibility by defining a `manylinux_compatible` function on the `_manylinux` standard library module. uv respects `manylinux_compatible`, but only tests against the current glibc version, and applies the return value globally: if it returns `True`, uv treats the system as `manylinux`-compatible; if `False`, incompatible, without calling it for every glibc version. This is compatible with blanket implementations like `no-manylinux`:

```python
from __future__ import annotations

manylinux1_compatible = False
manylinux2010_compatible = False
manylinux2014_compatible = False


def manylinux_compatible(*_, **__):  # PEP 600
    return False
```

## Bytecode compilation

Unlike `pip`, uv does not compile `.py` files to `.pyc` files during installation by default. To enable bytecode compilation, pass `--compile-bytecode` to `uv pip install` or `uv pip sync`, or set `UV_COMPILE_BYTECODE=1`. Skipping bytecode compilation can be undesirable; for example, enabling it in Docker builds improves startup times (at the cost of increased build times). Because bytecode compilation suppresses various warnings, you may see `SyntaxWarning` or `DeprecationWarning` messages with uv-installed code that do not appear with `pip`; these are valid warnings, typically hidden by bytecode compilation.

## `pip` command-line options and subcommands

uv does not support the complete set of `pip`'s command-line options and subcommands, although it supports a large subset. Missing options and subcommands are prioritized based on user demand and implementation complexity, and tend to be tracked in individual issues (for example `--trusted-host`, issue #1339, and `--user`, issue #2077).

## Registry authentication

uv does not support `pip`'s `auto` or `import` options for `--keyring-provider`; only the `subprocess` option is supported. Unlike `pip`, uv does not enable keyring authentication by default, and does not wait until a request returns an HTTP 401 before searching for authentication: uv attaches authentication to all requests for hosts with credentials available.

## `egg` support

uv does not support `.egg`-style distributions. It has partial support for `.egg-info`-style distributions and legacy editable `.egg-link`-style distributions: it does not install new ones, but respects existing ones during resolution, lists them with `uv pip list` and `uv pip freeze`, and uninstalls them with `uv pip uninstall`.

## Build constraints

When constraints are provided via `--constraint` (or `UV_CONSTRAINT`), uv does not apply them when resolving build dependencies. Build constraints should be provided via `--build-constraint` (or `UV_BUILD_CONSTRAINT`). pip applies constraints to build dependencies when specified via `PIP_CONSTRAINT`, but not via `--constraint` on the command line. To ensure `setuptools 60.0.0` is used to build any packages with a build dependency on `setuptools`, use `--build-constraint`.

## `pip compile` defaults

- By default, uv does not write the compiled requirements to an output file; specify one with `-o` / `--output-file`.
- By default, uv strips extras (`--strip-extras`), while `pip-compile` defaults to `--no-strip-extras` (scheduled to change in v8.0.0). To retain extras with uv, pass `--no-strip-extras`.
- By default, uv does not write any index URLs to the output file, while `pip-compile` outputs any `--index-url` or `--extra-index-url` that does not match the default (PyPI). To include index URLs, pass `--emit-index-url`; unlike `pip-compile`, uv includes all index URLs, including the default index URL.

## Notes

- Resolution-level differences (configuration files, pre-releases, multiple indexes, build isolation, transitive URLs, virtual environments by default, strategy) are in `compatibility-resolution.md`.

## Related

- [Compatibility with pip (resolution)](./compatibility-resolution.md)
- [uv pip check](./uv-pip-check.md)
- [uv pip compile](./uv-pip-compile.md)
