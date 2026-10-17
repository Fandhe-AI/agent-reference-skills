---
source: https://docs.astral.sh/uv/concepts/build-backend/
---

# Build backend

The uv build backend (`uv_build`) is a native PEP 517 build backend that transforms a source tree into a source distribution or a wheel.

## Signature / Usage

```toml
[build-system]
requires = ["uv_build>=0.13.1,<0.14"]
build-backend = "uv_build"
```

To create a new project that uses the uv build backend, use `uv init`:

```console
$ uv init --build-backend uv
```

## Choosing a build backend

- uv supports all build backends (as specified by PEP 517), but also provides a native build backend (`uv_build`) that integrates tightly with uv to improve performance and user experience.
- The uv build backend is a great choice for most Python projects. It has reasonable defaults, with the goal of requiring zero configuration for most users, but provides flexible configuration to accommodate most Python project structures. It validates project metadata and structures, preventing common mistakes.
- The uv build backend currently **only supports pure Python code**. An alternative backend is required to build a library with extension modules.
- When build scripts or a more flexible project layout are required, consider using the hatchling build backend instead.

## Bundled build backend

The build backend is published as a separate package (`uv_build`) that is optimized for portability and small binary size. However, the `uv` executable also includes a copy of the build backend, which will be used during builds performed by uv, e.g., during `uv build`, if its version is compatible with the `uv_build` requirement. If it's not compatible, a compatible version of the `uv_build` package will be used. Other build frontends, such as `python -m build`, will always use the `uv_build` package, typically choosing the latest compatible version.

## Notes

- The upstream concept page shows plain `uv init`. Unless the packaged-init preview feature is enabled, `uv init` creates an application without a `[build-system]`; `--build-backend` implicitly sets `--package` (per the CLI reference), so pass `--build-backend uv` (or `--package` / `--lib`).

- The uv build backend follows the same versioning policy as uv. Including an upper bound on the `uv_build` version ensures that your package continues to build correctly as new versions are released.
- Changed in 0.13.0: no breaking changes to the configuration of the uv build backend. If your `[build-system]` table includes an upper bound on `uv_build`, update it to allow 0.13, e.g., `uv_build>=0.13.0,<0.14`.

## Related

- [Build backend modules](./build-backend-modules.md)
- [Build backend file inclusion](./build-backend-file-inclusion.md)
- [Build backend settings](./build-backend-settings.md)
- [uv build](./uv-build.md)
- [Breaking changes in 0.13.0](../getting-started/breaking-changes-0-13.md)
