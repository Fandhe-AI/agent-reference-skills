---
source: https://www.electronjs.org/docs/latest/tutorial/electron-versioning
---

# Electron Versioning

Electron's versioning policy and implementation. As of version 2.0.0, Electron follows the SemVer spec.

## Signature / Usage

```sh
npm install --save-dev electron          # most recent stable build
npm install --save-dev electron@latest   # update an existing project
```

## SemVer

| Major Version Increments | Minor Version Increments | Patch Version Increments |
|--------------------------|--------------------------|--------------------------|
| Electron breaking API changes | Electron non-breaking API changes | Electron bug fixes |
| Node.js major version updates | Node.js minor version updates | Node.js patch version updates |
| Chromium version updates | | fix-related Chromium patches |

Most Chromium updates are considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

## Stabilization branches

- Branches parallel to `main`, taking in only cherry-picked commits related to security or stability; never merged back to `main`.
- Since Electron 8 they are major version lines named `$MAJOR-x-y` (e.g. `8-x-y`). Before that: minor version lines named `$MAJOR-$MINOR-x` (e.g. `2-0-x`).
- Multiple stabilization branches exist simultaneously, one for each supported version; older lines are not supported.

## Release cycle

- 8-week regular release cycle, with key milestones matching dates in the Chromium release cycle (four-week alpha phase, four-week beta phase).
- When Electron N hits stable, the release line for N+1 is branched off `main`; its first alpha (`v42.0.0-alpha.1` in the doc's example) contains all changes on `main`. Backportable fixes are published in the next alpha. When the Chromium version enters Chrome's beta channel, `alpha` is promoted to `beta`. Beta releases continue weekly until stable. Security fixes are backported to supported lines (e.g. `42.0.1`).
- Backport requests: all supported release lines accept external PRs to backport fixes previously merged to `main`, case-by-case for some older lines; contested decisions are resolved by the Releases Working Group.

## Feature flags (soft branches)

- Enabled/disabled at runtime or build-time; request-scoped feature flags are not supported.
- Completely segment new and old code paths; refactoring old code to support a new feature violates the contract.
- Eventually removed after the feature is released.

## Semantic commits

PRs must follow Conventional Commits: `BREAKING CHANGE:` at the start of the body for major, `feat:` for minor, `fix:` for patch. The repository enforces squash merging.

## Versioned `main` branch

- `main` always corresponds to the major version above the current pre-release line.
- Unstable nightly releases are published under the `electron-nightly` npm package.
- Release branches are never merged back to `main`; all `package.json` values are fixed at `0.0.0-development`.

## Notes

- Historical (Electron 1.X): versions < 2.0 did not conform to SemVer (major = end-user API changes, minor = Chromium major releases, patch = new features and bug fixes).

## Related

- [Electron Release Timelines](./electron-timelines.md)
- [Installation](./installation.md)
