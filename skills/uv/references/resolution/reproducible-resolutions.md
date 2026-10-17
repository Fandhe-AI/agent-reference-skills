---
source: https://docs.astral.sh/uv/concepts/resolution/#reproducible-resolutions
---

# Reproducible resolutions and cooldowns

`exclude-newer` limits resolution to distributions uploaded before a date or older than a duration (cooldown).

## Signature / Usage

```toml title="pyproject.toml"
[tool.uv]
exclude-newer = "2006-12-02T02:07:43Z"
```

## Reproducible resolutions

uv supports an `--exclude-newer` option to limit resolution to distributions uploaded before a specific date, allowing reproduction of installations regardless of new package releases. The date is compared against the upload time of each individual distribution artifact (i.e., when each file was uploaded to the package index), not the release date of the package version. The date may be specified as an RFC 3339 timestamp (e.g., `2006-12-02T02:07:43Z`) or a local date in the same format (e.g., `2006-12-02`) in your system's configured time zone.

The package index must support the `upload-time` field as specified in PEP 700. If the field is not present for a given distribution, the distribution will be treated as unavailable unless the package is opted out via `--exclude-newer-package <package>=false`, or the index is configured with its own `exclude-newer` value, or the index is opted out via `[[tool.uv.index]] exclude-newer = false`. PyPI provides `upload-time` for all packages.

To ensure reproducibility, messages for unsatisfiable resolutions will not mention that distributions were excluded due to the `--exclude-newer` flag — newer distributions will be treated as if they do not exist.

The `--exclude-newer` option is only applied to packages that are read from a registry (as opposed to, e.g., Git dependencies). Further, when using the `uv pip` interface, uv will not downgrade previously installed packages unless the `--reinstall` flag is provided, in which case uv will perform a new resolution.

To disable a global cutoff from a lower-priority configuration source, pass `--exclude-newer false`, set `UV_EXCLUDE_NEWER=false`, or set `exclude-newer = false` in a higher-priority configuration file.

When specified in persistent configuration, local date times are not allowed.

Values may also be specified for specific packages, e.g., `--exclude-newer-package setuptools=2006-12-02`, or:

```toml title="pyproject.toml"
[tool.uv]
exclude-newer-package = { setuptools = "2006-12-02T02:07:43Z" }
```

The package option also accepts `<package>=false` to opt a package out of the restriction, e.g., `--exclude-newer-package setuptools=false`, or:

```toml title="pyproject.toml"
[tool.uv]
exclude-newer-package = { setuptools = false }
```

This is useful to temporarily use a newer version of package or to allow resolving a package from an index that does not publish upload times.

Package-specific values will take precedence over both global and index-specific values.

Likewise, an individual index can override the global cutoff:

```toml title="pyproject.toml"
[tool.uv]
exclude-newer = "2006-12-02T02:07:43Z"

[[tool.uv.index]]
name = "internal"
url = "https://internal.example.com/simple"
exclude-newer = "7 days"
```

Or disable it entirely for that index:

```toml title="pyproject.toml"
[[tool.uv.index]]
name = "internal"
url = "https://internal.example.com/simple"
exclude-newer = false
```

This is useful for private indexes that don't publish `upload-time`, or for applying a different reproducibility window to a specific index while preserving the global behavior elsewhere.

## Dependency cooldowns

uv also supports dependency "cooldowns" in which resolution will ignore packages newer than a duration. This is a good way to improve security posture by delaying package updates until the community has had the opportunity to vet new versions of packages.

This feature is available via the `exclude-newer` option and shares the same semantics.

Define a dependency cooldown by specifying a duration instead of an absolute value. Either a "friendly" duration (e.g., `24 hours`, `1 week`, `30 days`) or an ISO 8601 duration (e.g., `PT24H`, `P7D`, `P30D`) can be used.

When a duration is used for resolution, a timestamp is calculated relative to the current time. When using a `uv.lock` file, the timestamp is included in the lockfile. uv will not update the lockfile when the current time changes, instead, uv will update the timestamp when a new resolution is performed, e.g., when `--upgrade` or `--refresh` is used.

This option is also supported in the `pyproject.toml`, e.g.:

```toml title="pyproject.toml"
[tool.uv]
exclude-newer = "1 week"
```

Values may also be specified for specific packages, e.g., `--exclude-newer-package "setuptools=30 days"`, or:

```toml title="pyproject.toml"
[tool.uv]
exclude-newer = "1 week"
exclude-newer-package = { setuptools = "30 days" }
```

## Notes

- Durations do not respect semantics of the local time zone and are always resolved to a fixed number of seconds assuming that a day is 24 hours (e.g., DST transitions are ignored). Calendar units such as months and years are not allowed since they are inherently inconsistent lengths.

## Related

- [resolution-strategy.md](./resolution-strategy.md)
- [sdist-lockfile-versioning.md](./sdist-lockfile-versioning.md)
