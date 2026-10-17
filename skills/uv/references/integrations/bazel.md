---
source: https://docs.astral.sh/uv/guides/integration/bazel/
---

# Bazel

Using uv credentials with Bazel fetches via a Bazel credential helper that invokes `uv auth helper`.

## Signature / Usage

Authenticate uv with the service hosting the files Bazel fetches:

```console
$ uv auth login https://packages.example.com
```

Configure Bazel (7 and newer, `--credential_helper`) in `.bazelrc`, replacing the host patterns with the hosts serving the index and files:

```text
common --credential_helper=packages.example.com=%workspace%/bazel/uv-auth-helper
common --credential_helper=files.example.com=%workspace%/bazel/uv-auth-helper
```

Add the wrapper script `bazel/uv-auth-helper` and make it executable:

```bash
#!/usr/bin/env bash
exec uv --preview-features auth-helper auth helper --protocol=bazel "$@"
```

```console
$ chmod +x bazel/uv-auth-helper
```

## Notes

- The wrapper uses `--preview-features auth-helper`, so `uv auth helper` is a preview feature at 0.13.1.
- For broader Bazel workflows with uv, see the `rules_py` uv guide (`aspect-build/rules_py`) and the `rules_python` uv guide.

## Related

- [Alternative registries](./alternative-registries.md)
