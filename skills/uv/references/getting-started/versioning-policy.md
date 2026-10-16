---
source: https://docs.astral.sh/uv/reference/policies/versioning/
---

# Versioning

uv's custom versioning scheme: the minor version is bumped for breaking changes, the patch version for bug fixes, enhancements, and other non-breaking changes.

## Signature / Usage

```text
0.<minor: breaking changes>.<patch: fixes, enhancements, non-breaking>
```

## Crate versioning

uv's crates are published to crates.io. `uv`, `uv-build`, and `uv-version` follow the normal uv versioning policy. `uv` and `uv-build` are versioned by the binary command-line interface; their Rust interface does not follow semantic versioning.

The remaining crates provide no stability guarantees. The Rust interface is internal and unstable; they are versioned `0.0.x`, with the patch version incremented on every uv release regardless of changes to the crate.

## Notes

- uv is described as widely used in production and stable software. The care taken with backwards-incompatible changes is proportional to the expected real-world impact, not a function of version numbering policy.
- Cache versions are internal to uv and may change in a minor or patch release.
- The `uv.lock` schema version is part of the public API and is only incremented in a minor release as a breaking change.
- The changelog is viewable on GitHub (`CHANGELOG.md`).

## Related

- [Breaking changes in 0.13.0](./breaking-changes-0-13.md)
