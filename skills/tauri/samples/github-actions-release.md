---
source: https://v2.tauri.app/distribute/pipelines/github/
---

# GitHub Actions Release Workflow

Build and release a Tauri app for Windows, Linux and macOS with `tauri-action` on every push to the `release` branch.

`.github/workflows/publish.yml`

```yaml
name: 'publish'

on:
  workflow_dispatch:
  push:
    branches:
      - release

jobs:
  publish-tauri:
    permissions:
      contents: write
    strategy:
      fail-fast: false
      matrix:
        include:
          - platform: 'macos-latest' # for Arm based macs (M1 and above).
            args: '--target aarch64-apple-darwin'
          - platform: 'macos-latest' # for Intel based macs.
            args: '--target x86_64-apple-darwin'
          - platform: 'ubuntu-22.04'
            args: ''
          - platform: 'ubuntu-22.04-arm' # Only available in public repos.
            args: ''
          - platform: 'windows-latest'
            args: ''

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7

      - name: install dependencies (ubuntu only)
        if: matrix.platform == 'ubuntu-22.04' || matrix.platform == 'ubuntu-22.04-arm' # This must match the platform value defined above.
        run: |
          sudo apt-get update
          sudo apt-get install -y libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf xdg-utils

      - name: setup node
        uses: actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38 # v6
        with:
          node-version: lts/*
          cache: 'npm' # Set this to npm, yarn or pnpm.

      - name: install Rust stable
        uses: dtolnay/rust-toolchain@b725eda525362e7cf34af9a7243cac1e3f01a7ec # stable
        with:
          # Those targets are only used on macos runners so it's in an `if` to slightly speed up windows and linux builds.
          targets: ${{ matrix.platform == 'macos-latest' && 'aarch64-apple-darwin,x86_64-apple-darwin' || '' }}

      - name: Rust cache
        uses: swatinem/rust-cache@6323deb102c322ba6fcbdcafc7e3dddab59af2b6 # v2
        with:
          # This matches tauri's default project layout. Change this if you have a different layout.
          workspaces: './src-tauri -> target'

      - name: install frontend dependencies
        # If you don't have `beforeBuildCommand` configured you may want to build your frontend here too.
        run: npm install # change this to npm, yarn or pnpm depending on which one you use.

      - uses: tauri-apps/tauri-action@1deb371b0cd8bd54025b384f1cd735e725c4060f # v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: app-v__VERSION__ # the action automatically replaces __VERSION__ with the app version.
          releaseName: 'App v__VERSION__'
          releaseBody: 'See the assets to download this version and install.'
          releaseDraft: true
          prerelease: false
          args: ${{ matrix.args }}
```

Trigger on a version tag instead

```yaml
name: 'publish'

on:
  push:
    tags:
      - 'app-v*'
```

## Notes

- Tauri bundler and `tauri-action` only; GitHub Actions syntax, runners and billing are covered by the github-docs skill. Code signing for Windows and macOS is a separate guide.
- `GITHUB_TOKEN` has read-only permissions by default; the job sets `permissions: contents: write`, or enable "Read and write permissions" under Actions workflow permissions if you see "Resource not accessible by integration".
- `ubuntu-22.04-arm` is only available in public repositories; for private repositories the official page shows a much slower `pguyot/arm-runner-action` workflow (about 1 hour uncached), not reproduced here.
- Without an Apple signing certificate, the official page recommends an ad-hoc signing identity so Apple Silicon builds downloaded from GitHub releases are not treated as damaged.
- When the app is not at the repository root, use the `projectPath` input.
- Third-party actions are pinned to commit SHAs (upstream uses tags); SHAs resolved on 2026-10-17, re-resolve when updating.
