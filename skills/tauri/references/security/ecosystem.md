---
source: https://v2.tauri.app/security/ecosystem/
---

# Tauri Ecosystem Security

Measures the Tauri organization on GitHub uses to make its repositories more resilient against adversaries targeting source code and releases.

## Signature / Usage

Release flow when a maintainer tags a new release on `dev`:

```text
tag release on dev
  -> validates core
  -> runs tests
  -> audits security for crates and npm
  -> generates changelogs
  -> creates artifacts
  -> creates a draft release
```

## Notes

- **Build pipelines**: releases are highly automated in GitHub Actions, yet mandate kickoff and review from real humans.
- **Signed commits**: core repositories require signed commits to reduce impersonation risk and allow identifying attributed commits after a possible compromise.
- **Code review**: every merged PR needs approval from at least one maintainer (in most cases the working group); default security workflows and checks run.
- **Release process**: the working group reviews code changes and tags PRs with scope; security-relevant PRs are internally audited before minor and major releases. The maintainer then reviews and edits release notes before the release is forged.

## Related

- [Application Lifecycle Threats](./lifecycle.md)
- [Security](./overview.md)
