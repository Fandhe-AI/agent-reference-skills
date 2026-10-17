---
source: https://docs.astral.sh/uv/concepts/projects/sync/
---

# Locking and syncing

Locking resolves project dependencies into a lockfile; syncing installs a subset of lockfile packages into the project environment. Both are automatic in uv.

## Signature / Usage

```console
$ uv lock
$ uv sync
$ uv lock --check
$ uv lock --upgrade-package <package>
```

## Options / Props

| Name | Description |
|------|-------------|
| `--locked` | Raise an error if the lockfile is not up-to-date instead of updating it (disables automatic locking). `uv lock --check` is equivalent |
| `--frozen` | Use the lockfile without checking if it is up-to-date |
| `--no-sync` | Run a command without checking if the environment is up-to-date |
| `--no-editable` | Do not install the project (and workspace members) as editable |
| `--inexact` / `--exact` | `uv sync` is exact by default (removes packages not in the lockfile); `uv run` is inexact by default |
| `--extra <name>` / `--all-extras` | Sync optional dependencies (not synced by default) |
| `--no-dev`, `--only-dev`, `--all-groups`, `--no-default-groups`, `--group`, `--only-group`, `--no-group` | Dependency group selection |
| `--upgrade` / `--upgrade-package <package>[==<version>]` | Upgrade locked versions |
| `--no-install-project` | Do not install the current project |
| `--no-install-workspace` | Do not install any workspace members, including the root project |
| `--no-install-package <NO_INSTALL_PACKAGE>` | Do not install the given package(s) |

## Notes

- When `uv run` is used, the project is locked and synced before invoking the command. Commands that read the lockfile, such as `uv tree`, automatically update it before running.
- Lockfile up-to-date check: adding a dependency to `pyproject.toml` makes it outdated; changing constraints so the locked version is excluded makes it outdated; constraints that still include the locked version leave it up-to-date. uv will not consider lockfiles outdated when new package versions are released; upgrade explicitly.
- Syncing manually is especially useful for ensuring your editor has the correct versions of dependencies.
- If the project does not define a build system, it will not be installed.
- `uv sync` removes packages not present in the lockfile; keep them with `uv sync --inexact`. `uv run --exact ...` enables exact syncing.
- The `dev` group is special-cased and synced by default (see dependency-groups.md). `--only-dev` installs the `dev` group without the project and its dependencies; `--only-group` has the same semantics but also excludes default groups. Group exclusions take precedence over inclusions: `uv sync --no-group foo --group foo` does not install `foo`.
- With an existing `uv.lock`, uv prefers previously locked versions; they change only if the constraints exclude the locked version. Upgrades are limited to the project's constraints. Git dependencies behave similarly: a `main` branch dependency keeps the locked commit SHA unless `--upgrade` / `--upgrade-package` is used. These flags can also be passed to `uv sync` or `uv run`.

```console
$ uv lock --upgrade
$ uv lock --upgrade-package <package>==<version>
```

- Export formats: `uv export --format requirements.txt`, `pylock.toml`, `cyclonedx1.5` (see export.md).
- Partial installations (e.g., for Docker layer caching): when `--no-install-*` flags are used, all dependencies of the target are still installed; used improperly, they can produce a broken environment.
- Malware checks (preview, subject to change until stabilized): while syncing, uv can scan the lockfile against OSV (MAL advisories from the OpenSSF malicious packages database); a match terminates the sync. Enable with `audit.malware-check = true` in uv settings or `UV_MALWARE_CHECK=1`; use another service with `audit.malware-check-url` or `UV_MALWARE_CHECK_URL`.

## Related

- [Structure and files](./layout.md)
- [Running commands](./run.md)
- [Exporting lockfiles](./export.md)
- [Managing dependencies](./dependencies.md)
