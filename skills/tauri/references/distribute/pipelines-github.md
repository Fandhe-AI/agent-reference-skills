---
source: https://v2.tauri.app/distribute/pipelines/github/
---

# GitHub (pipelines)

Use `tauri-action` in GitHub Actions to build and upload your app, make Tauri's updater query the newly created GitHub release for updates, and set up a more complicated build pipeline for Linux Arm AppImages.

## Signature / Usage

Release workflow triggered by pushes to the `release` branch; builds for Windows x64, Linux x64, Linux Arm64, macOS x64 and macOS Arm64:

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
          toolchain: stable
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

### Configuration

- All options are in the `tauri-action` readme (inputs). When your app is not at the repository root use the `projectPath` input.
- Keep the final `tauri-apps/tauri-action` step at the end of the workflow; it runs the build script and releases your app.
- Trigger on a version git tag instead:

```yaml
name: 'publish'

on:
  push:
    tags:
      - 'app-v*'
```

- Workflow steps: checkout (`actions/checkout`), install Linux system dependencies, Node.js LTS with package cache (`actions/setup-node`), Rust and cache (`dtolnay/rust-toolchain`, `swatinem/rust-cache`), install frontend dependencies (and build the web app unless `beforeBuildCommand` is configured), `tauri-apps/tauri-action`. All are pinned to commit SHAs in the examples (the tag is in the trailing comment).

### Arm Runner Compilation

`pguyot/arm-runner-action` compiles on an emulated Arm runner, bridging the missing cross-architecture build support of the AppImage tooling. Abridged workflow:

```yaml
name: 'Publish Linux Arm builds'

on:
  workflow_dispatch:
  push:
    branches:
      - release

jobs:
  build:
    runs-on: ubuntu-22.04

    strategy:
      matrix:
        arch: [aarch64, armv7l]
        include:
          - arch: aarch64
            cpu: cortex-a72
            base_image: https://dietpi.com/downloads/images/DietPi_RPi5-ARMv8-Bookworm.img.xz
            deb: arm64
            rpm: aarch64
            appimage: aarch64
          - arch: armv7l
            cpu: cortex-a53
            deb: armhf
            rpm: armhfp
            appimage: armhf
            base_image: https://dietpi.com/downloads/images/DietPi_RPi-ARMv7-Bookworm.img.xz

    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7

      - name: Cache rust build artifacts
        uses: Swatinem/rust-cache@6323deb102c322ba6fcbdcafc7e3dddab59af2b6 # v2
        with:
          workspaces: src-tauri
          cache-on-failure: true

      - name: Build app
        uses: pguyot/arm-runner-action@e1773de1ed6eb61848f5693de824d836f0b0ea25 # v2.6.5
        with:
          base_image: ${{ matrix.base_image }}
          cpu: ${{ matrix.cpu }}
          bind_mount_repository: true
          image_additional_mb: 10240
          optimize_image: no
          #exit_on_fail: no
          commands: |
            # Prevent Rust from complaining about $HOME not matching eid home
            export HOME=/root

            # Workaround to CI worker being stuck on Updating crates.io index
            export CARGO_REGISTRIES_CRATES_IO_PROTOCOL=sparse

            # Install setup prerequisites
            apt-get update -y --allow-releaseinfo-change
            apt-get autoremove -y
            apt-get install -y --no-install-recommends --no-install-suggests curl libwebkit2gtk-4.1-dev build-essential libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev patchelf libfuse2 file
            curl -sSf https://sh.rustup.rs -o rustup-init.sh
            sh rustup-init.sh -y
            . "$HOME/.cargo/env"
            curl -fsSL https://deb.nodesource.com/setup_lts.x -o nodesource_setup.sh
            bash nodesource_setup.sh
            apt-get install -y nodejs

            # Install frontend dependencies
            npm install

            # Build the application
            npm run tauri build -- --verbose

      - name: Get app version
        run: echo "APP_VERSION=$(jq -r .version src-tauri/tauri.conf.json)" >> $GITHUB_ENV

      # TODO: Combine this with the basic workflow and upload the files to the Release.
      - name: Upload deb bundle
        uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02 # v4
        with:
          name: Debian Bundle ${{ matrix.arch }}
          path: ${{ github.workspace }}/src-tauri/target/release/bundle/deb/appname_${{ env.APP_VERSION }}_${{ matrix.deb }}.deb
```

(The source also uploads the `rpm` bundle `appname-${{ env.APP_VERSION }}-1.${{ matrix.rpm }}.rpm` and the AppImage `appname_${{ env.APP_VERSION }}_${{ matrix.appimage }}.AppImage` with the same SHA-pinned `actions/upload-artifact` step shape, each with a unique artifact name.)

### Troubleshooting

The GitHub Token is issued automatically per workflow run. It only has read permission by default, so you may get "Resource not accessible by integration". Fix: keep the repository default unchanged and grant `permissions: contents: write` only to the release job (as in the `publish-tauri` job above).

```yaml
jobs:
  publish-tauri:
    permissions:
      contents: write
```

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Notes

- For Windows and macOS signing in the workflow, follow the platform signing pages. If you build a macOS app without an Apple signing certificate, configure an ad-hoc signing identity (see sign-macos) to avoid macOS treating Apple Silicon builds downloaded from GitHub releases as damaged.
- Without a `release` branch workflow the action can also initialize Tauri for you in a repo that has no Tauri configured; see the action's readme (project initialization).
- `ubuntu-22.04-arm` / `ubuntu-24.04-arm` runners are publicly available (since August 2025) in public repositories, so the standard workflow can build Arm64 there.
- `arm-runner-action` is much slower than standard runners; an uncached build for a fresh `create-tauri-app` project needs about 1 hour. Be careful in private repositories where build minutes are invoiced.
- Read GitHub's usage limits, billing and administration documentation for Actions. GitHub Actions itself is covered by the github-docs skill.
- The source pipes the rustup and NodeSource installer scripts directly into the shell; they are split into download / run here. Review those scripts before running them on a persistent machine.
- Third-party actions pinned to commit SHAs (upstream uses tags); SHAs resolved from the GitHub API on 2026-10-17, re-resolve when updating.
- The source suggests switching the repository-wide Workflow permissions to Read and write; this page scopes contents: write to the release job instead (least privilege).
- The source uses `deb: armhfp` / `rpm: arm`; changed to `armhf` / `armhfp`, the architecture names tauri-bundler emits for ARMv7 (debian.rs / rpm.rs).
- Updated from `actions/upload-artifact@v3` / `actions/checkout@v3` (deprecated) in the source; artifact names include the matrix value because v4 requires unique names.

## Related

- [sign-windows](./sign-windows.md)
- [sign-macos](./sign-macos.md)
- [appimage](./appimage.md)
- updater plugin
