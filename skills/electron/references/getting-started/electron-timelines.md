---
source: https://www.electronjs.org/docs/latest/tutorial/electron-timelines
---

# Electron Release Timelines

Release cadence and version support policy. Electron releases major versions alongside every other Chromium release, on an 8-week cadence: a four-week alpha phase and a four-week beta phase precede each stable.

## Signature / Usage

```sh
npm install electron@alpha --save-dev
npm install electron@beta --save-dev
```

## Timeline

- The release schedule (alpha, beta, stable, end-of-life dates and dependency versions) is at `https://releases.electronjs.org/schedule`.
- Official support policy: the latest 3 stable releases. Stable and end-of-life dates are determined by Chromium and may change; see Chromium's schedule (`https://chromiumdash.appspot.com/schedule`) for definitive dates.
- Alphas are generally less stable than betas; the cutoff corresponds to when the underlying Chromium version enters Chrome's Beta channel.
- The `-alpha.1`, `-beta.1`, and `stable` dates are solid release dates. Weekly alpha/beta releases are targeted (often more are released). Stable deadlines can be adjusted, e.g. for security bugs.
- Historical changes: Electron 5 began publicizing release dates; Electron 6 began targeting every other Chromium major version (same day as Chrome stable); Electron 16 moved to an 8-week cadence (Chrome moved to 4-week); support for Electron 22 was temporarily extended until October 10, 2023 for Windows 7/8/8.1.

## Version support policy

- Latest three stable major versions are supported. Example from the doc: if the latest release is 42.1.x, then 41.0.x and 40.2.x are supported. Only the latest minor release of each series is supported (a security fix goes to 42.1.x, not 42.0.x).
- The latest stable receives all fixes from `main`; the previous one receives the vast majority; the oldest supported line receives only security fixes.
- Chromium: Electron targets even-number Chromium versions (e.g. Electron 26 uses Chromium 116, Electron 27 uses Chromium 118).
- Node.js: `main` is upgraded to even-number Node.js versions when they enter Active LTS. Stable lines receive minor and patch bumps of Node.js (patch bumps in patch releases, minor bumps in minor releases); security-only branches get only security-related changes.
- Breaking API changes: previous functionality is supported for a minimum of two major versions when possible before removal (e.g. a change in major 10 keeps the old behavior until at least major 12).

## Related

- [Electron Versioning](./electron-versioning.md)
- [Installation](./installation.md)
