---
source: https://docs.astral.sh/uv/concepts/projects/config/
---

# Configuring projects

Project configuration in `pyproject.toml`: Python version requirement, entry points, build systems, packaging, environment path, editable mode.

## Signature / Usage

```toml
[project]
name = "example"
version = "0.1.0"
requires-python = ">=3.12"
```

## Python version requirement

Declare supported Python versions in `project.requires-python` (recommended). It determines the Python syntax allowed in the project and affects selection of dependency versions (they must support the same Python version range).

## Entry points

Using the entry point tables requires a build system to be defined.

```toml
[project.scripts]
hello = "example:hello"

[project.gui-scripts]
hello = "example:app"

[project.entry-points.'example.plugins']
a = "example_plugin_a"
```

```console
$ uv run hello
```

- `[project.gui-scripts]` differ from CLIs only on Windows, where they are wrapped by a GUI executable so they can start without a console.
- Plugin loading in `example`: `for plugin in entry_points(group="example.plugins"): plugin.load()` (from `importlib.metadata import entry_points`). The `group` key can be arbitrary; namespacing by package name is recommended.

## Build systems

A build system, declared in `[build-system]`, determines how the project is packaged and installed. uv uses its presence to decide if the project contains a package to install in the project environment. Without one, uv builds/installs only the dependencies, not the project; with one, it builds and installs the project.

- By default `uv init` creates a packaged project using the uv build backend. `--build-backend` selects an alternative; `--no-package` creates a flat, unpackaged project.
- Legacy: if no build system is defined, `setuptools.build_meta:__legacy__` is used to build packages you depend on. Adding a dependency on a local project or installing with `uv pip` attempts to build and install it regardless of a `[build-system]` table.
- Build systems power: including or excluding files from distributions, editable installation behavior, dynamic project metadata, compilation of native code, vendoring shared libraries. Configure via your build system's documentation.

## Project packaging

You probably need a package to: add commands, distribute the project, use a `src` and `test` layout, write a library. You probably do not need one for scripts, a simple application, or a flat layout.

The `tool.uv.package` setting overrides the build-system-based decision:

- `tool.uv.package = true` forces the project to be built and installed. If no build system is defined, the setuptools legacy backend is used.
- `tool.uv.package = false` forces the project not to be built/installed; a declared build system is ignored, but explicit `uv build` is still respected.

## Project environment path

`UV_PROJECT_ENVIRONMENT` configures the project virtual environment path (`.venv` by default). A relative path resolves against the workspace root; an absolute path is used as-is (no child directory is created). If no environment is present at the path, uv creates it.

```console
$ python -c "import sysconfig; print(sysconfig.get_config_var('prefix'))"
/usr/local
```

To target the system environment, `export UV_PROJECT_ENVIRONMENT=/usr/local`. This is not recommended: `uv sync` removes extraneous packages by default and may leave the system in a broken state.

## Editable mode

By default the project is installed in editable mode. `uv sync` and `uv run` accept `--no-editable`, intended for deployment use-cases such as building a Docker container, where the project is included in the deployed environment without a dependency on the originating source code.

## Notes

- If an absolute `UV_PROJECT_ENVIRONMENT` path is used across multiple projects, the environment will be overwritten by each project's invocations; recommended only for a single project in CI or Docker images.
- By default uv does not read `VIRTUAL_ENV` during project operations; a warning is shown if it differs from the project's environment. `--active` opts in to respecting it; `--no-active` silences the warning.
- The `[build-system]` table is not required in other packages you depend on; they remain installable.
- Build isolation and conflicting/limited/required environments sections are in build-isolation.md and conflicts-environments.md.

## Related

- [Structure and files](./layout.md)
- [Creating projects](./init.md)
- [Build isolation](./build-isolation.md)
- [Conflicting dependencies and environments](./conflicts-environments.md)
- [Building distributions](./build.md)
