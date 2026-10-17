---
source: https://raw.githubusercontent.com/apple/python-apple-fm-sdk/v0.2.1/docs/README.md, https://raw.githubusercontent.com/apple/python-apple-fm-sdk/v0.2.1/docs/Makefile
---

# python-sdk-docs

Commands for building the Foundation Models SDK for Python documentation (Sphinx) locally from a clone of the repository at tag `v0.2.1`. Only needed to modify or preview the SDK docs; for reading the API use `references/python-sdk/`. Run the install commands from the repository root.

## Install documentation dependencies (uv)

```bash
uv sync --group docs
```

Preferred route in `docs/README.md`. `uv sync` creates `.venv` but does not activate it, so the build commands below are run through `uv run`.

## Install documentation dependencies (pip)

```bash
pip install -r docs/requirements.txt
```

Alternative to uv. Run from the repository root; `docs/README.md` writes `pip install -r requirements.txt` relative to the `docs/` directory, where `requirements.txt` lives. Install into a virtual environment and keep it activated for the build commands (use `make html` / `sphinx-autobuild` without `uv run` in that case).

## Build the HTML documentation

```bash
cd docs
uv run make html
```

The output goes to `build/html/`; open `build/html/index.html` in a browser. The `docs/Makefile` routes any target to `sphinx-build -M <target> source build` (`SPHINXBUILD`, `SOURCEDIR = source`, `BUILDDIR = build`).

## Clean build files

```bash
cd docs
uv run make clean
```

> **Warning**: `make clean` removes the generated `build/` output of the Sphinx build. Run it only in a clone you are fine rebuilding.

## Auto-rebuild while editing

```bash
# Install sphinx-autobuild using uv
uv pip install sphinx-autobuild

# Run auto-rebuilding server
cd docs
uv run sphinx-autobuild source build/html
```

Rebuilds the docs automatically when you save changes. `docs/README.md` also notes you can add `sphinx-autobuild` to the `docs` group in `pyproject.toml` and run `uv sync --group docs`.

## Notes

- `docs/README.md` also documents `bash ./bin/publish-docs.sh` for GitHub Pages deployment. It is a maintainer step that publishes the site and is not collected here.
- If autodoc cannot find modules, `docs/README.md` suggests installing the package with `uv pip install -e .` (or `pip install -e .`); see `python-sdk-install.md`.
- Upstream `docs/README.md` writes plain `make html` / `sphinx-autobuild`, but `uv sync` does not activate the environment, so `uv run` is used here (alternatively run `source .venv/bin/activate` first). `uv run` finds the parent `pyproject.toml`, so running from `docs/` works.
