---
source: https://docs.astral.sh/uv/concepts/build-backend/#modules
---

# Build backend modules

Module layout rules for the uv build backend: root module, namespace packages, and type stub packages.

## Signature / Usage

By default, a single root module is expected at `src/<package_name>/__init__.py`. For a project named `foo`:

```text
pyproject.toml
src
└── foo
    └── __init__.py
```

To use a `FOO` module in the root directory:

```toml
[tool.uv.build-backend]
module-name = "FOO"
module-root = ""
```

## Modules

- Python packages are expected to contain one or more Python modules, which are directories containing an `__init__.py`.
- uv normalizes the package name to determine the default module name: the package name is lowercased and dots and dashes are replaced with underscores, e.g., `Foo-Bar` would be converted to `foo_bar`.
- The `src/` directory is the default directory for module discovery. Defaults can be changed with the `module-name` and `module-root` settings.

## Namespace packages

Namespace packages are intended for use-cases where multiple packages write modules into a shared namespace. Namespace package modules are identified by a `.` in the `module-name`. To package the module `bar` in the shared namespace `foo`:

```text
pyproject.toml
src
└── foo
    └── bar
        └── __init__.py
```

```toml
[tool.uv.build-backend]
module-name = "foo.bar"
```

A complex namespace package with more than one root module is supported by setting `module-name` to a list of names (not recommended; use a workspace with multiple packages instead):

```toml
[tool.uv.build-backend]
module-name = ["foo", "bar"]
```

For packages with many modules or complex namespaces, `namespace = true` avoids explicitly declaring each module name:

```toml
[tool.uv.build-backend]
namespace = true
```

`namespace` can also be used with `module-name` to explicitly declare the root (recommended for a `src/foo/{bar,baz}` layout):

```toml
[tool.uv.build-backend]
module-name = "foo"
namespace = true
```

## Stub packages

The build backend supports building type stub packages, which are identified by the `-stubs` suffix on the package or module name, e.g., `foo-stubs`. The module name for type stub packages must end in `-stubs`, so uv will not normalize the `-` to an underscore. Additionally, uv will search for a `__init__.pyi` file:

```text
pyproject.toml
src
└── foo-stubs
    └── __init__.pyi
```

Type stub modules are also supported for namespace packages.

## Notes

- The `__init__.py` file is not included in `foo` when `module-name = "foo.bar"`, since it's the shared namespace module.
- Using `namespace = true` disables safety checks. Using an explicit list of module names is strongly recommended outside of legacy projects.

## Related

- [Build backend](./build-backend.md)
- [Build backend settings](./build-backend-settings.md)
- [Build backend file inclusion](./build-backend-file-inclusion.md)
