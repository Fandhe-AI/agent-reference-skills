---
source: https://ai-sdk.dev/docs/migration-guides/versioning
---

# Versioning

How the AI SDK versions releases and communicates API stability (stable / `experimental_` / deprecated).

## Signature / Usage

Each version number follows the format `MAJOR.MINOR.PATCH`.

| Part | Meaning |
| --- | --- |
| Major | Breaking API updates that require code changes. |
| Minor | Blog post that aggregates new features and improvements into a public release that highlights benefits. |
| Patch | New features and bug fixes. |

```text
MAJOR.MINOR.PATCH

experimental_generateImage()   // experimental prefix example from the page
```

The page contains no other code. It only states that exact version pinning (no `^` / `~`) is required when using experimental APIs.

## Options / Props

API stability levels:

| Level | Marker | Guarantee |
| --- | --- | --- |
| Stable | No special prefix | Ready for production. Backward compatible; breaking changes only in major releases. |
| Experimental | `experimental_` or `Experimental_` prefix (e.g. `experimental_generateImage()`) | In development; can change in any release. |
| Deprecated | Marked `deprecated` | Will be removed in future major releases. |

How to use experimental APIs safely:

1. Test them first in development, not production
2. Review release notes before upgrading
3. Prepare for potential code updates

How to handle deprecations:

1. Switch to the recommended alternative API
2. Follow the migration guide (released alongside major releases)

## Notes

- If you use experimental APIs, pin your AI SDK version number exactly (avoid `^` or `~` version ranges) to prevent unexpected breaking changes.
- For major releases, automated codemods are provided where possible (`npx @ai-sdk/codemod ...`, see the migration guides).
- You can wait until the major release to update code that uses deprecated APIs.
- Several APIs that were `experimental_` in earlier majors graduated to stable names in 7.0 (e.g. `experimental_transcribe` -> `transcribe`); see `migration-guide-7-0.md`.

## Related

- [Migrate AI SDK 6.x to 7.0](./migration-guide-7-0.md)
- [Migrate AI SDK 5.x to 6.0](./migration-guide-6-0.md)
- [Migrate AI SDK 4.x to 5.0](./migration-guide-5-0.md)
