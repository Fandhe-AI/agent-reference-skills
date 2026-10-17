---
source: https://react.dev/community/versioning-policy
---

# Versioning Policy

All stable builds of React go through a high level of testing and follow semantic versioning (semver). React also offers unstable release channels (Canary, Experimental) to encourage early feedback on experimental features. This policy applies to packages such as `react` and `react-dom`.

## Signature / Usage

Version numbers follow **x.y.z**:

- **Patch** (change z, e.g. 15.6.2 to 15.6.3): critical bug fixes.
- **Minor** (change y, e.g. 15.6.2 to 15.7.0): new features or non-critical fixes.
- **Major** (change x, e.g. 15.6.2 to 16.0.0): breaking changes.

Install the Canary channel for integration testing:

```console
npm update react@canary react-dom@canary
```

Or yarn:

```console
yarn upgrade react@canary react-dom@canary
```

## Options / Props

| Channel | Source | npm tag | Versioning | Use |
| --- | --- | --- | --- | --- |
| Latest | Stable releases | `latest` | semver | User-facing applications that consume React directly |
| Canary | Tracks the main branch (release candidates for the next semver release) | `canary` | Not semver; hash + commit date, e.g. `18.3.0-canary-388686f29-20230503` | Frameworks or curated setups with a pinned version; integration testing |
| Experimental | Tracks the main branch with extra feature flags | `experimental` | Not semver; e.g. `0.0.0-experimental-388686f29-20230503` | Testing only; no stability guarantees |

## Notes

- Major releases can also contain new features, and any release can include bug fixes. Minor releases are the most common type.
- If a security vulnerability is found, a backported fix is released for all major versions that are affected.
- Patch releases are reserved for the most critical bugs and security vulnerabilities. Non-essential changes (internal refactors, implementation details, performance improvements, minor bugfixes) bump the minor version even when there are no new features.
- Development builds include warnings in preparation for future breaking changes: if an app has no warnings on the latest release, it will be compatible with the next major release. Dev warnings do not affect runtime behavior.
- Not counted as breaking changes (no major bump): development warnings; APIs starting with `unstable_`; Alpha and Canary versions of React; undocumented APIs and internal data structures (e.g. `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED`).
- Both Latest and Canary are officially supported for user-facing applications, but Canary releases must be pinned and may include breaking changes. Do not use Experimental releases in user-facing applications.
- Experimental features may or may not be documented; usually they are not documented until close to shipping in Canary or Latest. Undocumented features may be accompanied by an RFC.
- Where possible an older API is kept working (e.g. mixins via create-react-class); automated codemods are published at `reactjs/react-codemod`.

## Related

- [React Versions](./versions.md)
- [React 19 Upgrade Guide](./react-19-upgrade-guide.md)
