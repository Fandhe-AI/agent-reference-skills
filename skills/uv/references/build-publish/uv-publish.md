---
source: https://docs.astral.sh/uv/reference/cli/#uv-publish
---

# uv publish

Upload distributions to an index.

## Signature / Usage

```
uv publish [OPTIONS] [FILES]...
```

`FILES` are the paths to the files to upload and accept glob expressions. Defaults to the `dist` directory. Selects only wheels and source distributions and their attestations, while ignoring other files.

Equivalent invocations using a configured index with a `publish-url`:

```toml
[[tool.uv.index]]
name = "pypi"
url = "https://pypi.org/simple"
publish-url = "https://upload.pypi.org/legacy/"
```

```
uv publish --index pypi
uv publish --publish-url https://upload.pypi.org/legacy/ --check-url https://pypi.org/simple
```

## Options / Props

Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are omitted here.

| Name | Value | Description |
| --- | --- | --- |
| `--index` | `index` | The name of an index in the configuration to use for publishing. The index must have a `publish-url` setting. The index `url` will be used to check for existing files to skip duplicate uploads. [env: `UV_PUBLISH_INDEX`] |
| `--publish-url` | `publish-url` | The URL of the upload endpoint (not the index URL). Defaults to PyPI's publish URL (<https://upload.pypi.org/legacy/>). [env: `UV_PUBLISH_URL`] |
| `--check-url` | `check-url` | Check an index URL for existing files to skip duplicate uploads. The index must provide one of the supported hashes (SHA-256, SHA-384, or SHA-512). [env: `UV_PUBLISH_CHECK_URL`] |
| `--dry-run` | | Perform a dry run without uploading files. Checks the distribution metadata locally, and checks for existing files if `--check-url` or `--index` is provided, but does not upload any files. |
| `--username`, `-u` | `username` | The username for the upload [env: `UV_PUBLISH_USERNAME`] |
| `--password`, `-p` | `password` | The password for the upload [env: `UV_PUBLISH_PASSWORD`] |
| `--token`, `-t` | `token` | The token for the upload. Equivalent to passing `__token__` as `--username` and the token as `--password`. [env: `UV_PUBLISH_TOKEN`] |
| `--trusted-publishing` | `automatic`, `always`, `never` | Configure trusted publishing. By default, uv checks for trusted publishing when running in a supported environment, but ignores it if it isn't configured. Supported environments include GitHub Actions and GitLab CI/CD. |
| `--no-attestations` | | Do not upload attestations for the published files. By default, uv attempts to upload matching PEP 740 attestations with each distribution. [env: `UV_PUBLISH_NO_ATTESTATIONS`] |
| `--keyring-provider` | `disabled`, `subprocess` | Attempt to use `keyring` for authentication for remote requirements files. Only `subprocess` is supported. Defaults to `disabled`. [env: `UV_KEYRING_PROVIDER`] |
| `--allow-insecure-host`, `--trusted-host` | `allow-insecure-host` | Allow insecure connections to a host. Hosts in this list are not verified against the system's certificate store. [env: `UV_INSECURE_HOST`] |

## Notes

- Global options are listed in the project-commands uv page (`uv.md`) and are not repeated here.
- `--trusted-publishing automatic` attempts trusted publishing when in a supported environment and continues if that fails.
- `--check-url`: when uploading to PyPI, uploading the same file succeeds even without `--check-url`, while most other indexes error. It allows retrying publishing that failed after only some files were uploaded.
- There are typically different URLs for index access (e.g., `.../simple`) and index upload; `--publish-url` is the upload endpoint, not the index URL.
- `--allow-insecure-host` bypasses SSL verification and could expose you to MITM attacks. Only use it in a secure network with verified sources.
- Changed in 0.13.0: `tar-codec` is used to read tar archive metadata for `uv publish`; archives with hard links or unsupported tar extensions may be rejected. Opt out with `UV_LEGACY_TAR_BACKEND=1`. Fixed in 0.13.1: support restored for source distributions containing hard links or full-length tar user or group names.

## Related

- [uv build](./uv-build.md)
- [Build backend](./build-backend.md)
- [Breaking changes in 0.13.0](../getting-started/breaking-changes-0-13.md)
