---
source: https://docs.astral.sh/uv/concepts/projects/export/
---

# Exporting lockfiles

`uv export` converts `uv.lock` to `requirements.txt`, `pylock.toml` (PEP 751) or a CycloneDX SBOM.

## Signature / Usage

```console
$ uv export --format requirements.txt
$ uv export --format pylock.toml
$ uv export --format cyclonedx1.5
$ uv export --format requirements.txt --output-file requirements.txt
$ uv export --format pylock.toml --output-file pylock.toml
$ uv export --format cyclonedx1.5 --output-file sbom.json
```

## Options / Props

| Name | Description |
|------|-------------|
| `--format` | `requirements.txt`, `pylock.toml`, `cyclonedx1.5` |
| `--output-file` | Write to a file instead of stdout (default prints to stdout) |

## Notes

- `requirements.txt`: the most widely supported, pip-compatible format; install via `uv pip install` or `pip`. Using both a `uv.lock` and a `requirements.txt` is generally not recommended: `uv.lock` is more powerful and includes features that cannot be expressed in `requirements.txt`.
- `pylock.toml`: PEP 751 standardized lockfile. Relative local paths are written relative to the output file's directory; when writing to stdout they are relative to the current working directory. Use `--output-file` when writing a `pylock.toml` in another directory.
- CycloneDX: preview, may change in any future release. Generates a JSON-encoded CycloneDX v1.5 document of the project and all dependencies, useful for security auditing, compliance and supply chain transparency. uv adds custom component properties: `uv:package:marker` (environment markers, e.g. `python_version >= "3.8"`) and `uv:workspace:path` (relative path for workspace members).

## Related

- [Locking and syncing](./lock-sync.md)
- [Structure and files](./layout.md)
- [Building distributions](./build.md)
