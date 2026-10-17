---
source: https://docs.astral.sh/uv/concepts/resolution/#source-distribution
---

# Source distributions and lockfile versioning

uv rejects non-conforming source distribution archive formats (as of 0.12), and `uv.lock` uses a versioned schema.

## Signature / Usage

```console
$ uv lock
```

## Source distribution

PEP 625 specifies that packages must distribute source distributions as gzip tarball (`.tar.gz`) archives. Prior to this specification, other archive formats, which need to be supported for backward compatibility, were also allowed.

As of 0.12, uv rejects source distributions that do not confirm to PEP 625's extension requirements with the exception of `.zip` archives, which are still accepted for backward compatibility.

## Lockfile versioning

The `uv.lock` file uses a versioned schema. The schema version is included in the `version` field of the lockfile.

Any given version of uv can read and write lockfiles with the same schema version, but will reject lockfiles with a greater schema version. For example, if your uv version supports schema v1, `uv lock` will error if it encounters an existing lockfile with schema v2.

uv versions that support schema v2 _may_ be able to read lockfiles with schema v1 if the schema update was backwards-compatible. However, this is not guaranteed, and uv may exit with an error if it encounters a lockfile with an outdated schema version.

The schema version is considered part of the public API, and so is only bumped in minor releases, as a breaking change (see Versioning policy, `getting-started/versioning-policy.md`). As such, all uv patch versions within a given minor uv release are guaranteed to have full lockfile compatibility. In other words, lockfiles may only be rejected across minor releases.

The `revision` field of the lockfile is used to track backwards compatible changes to the lockfile. For example, adding a new field to distributions. Changes to the revision will not cause older versions of uv to error.

## Notes

- The lockfile schema version is only bumped in minor releases; lockfiles may only be rejected across minor releases.

## Related

- [reproducible-resolutions.md](./reproducible-resolutions.md)
- [resolution-overview.md](./resolution-overview.md)
