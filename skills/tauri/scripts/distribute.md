---
source: https://v2.tauri.app/distribute/
---

# Distribute

Commands for producing bundles and uploading them per distribution target (macOS / Windows / Linux / Android / iOS / stores). Official store and signing procedures themselves are out of scope; only Tauri CLI operations and the helper commands shown on each page are included.

> **WARNING**: Includes package installation via `sudo`, `cargo install`, `git push`, and store uploads (`altool` / `snapcraft upload`). Run these only in a disposable build environment (container, CI, throwaway VM), pass credentials such as `$APPLE_API_KEY_ID` through environment variables, and never commit them. The invocation form depends on how the CLI is installed (see the table in `dev-build.md`).

## macOS app bundle (.app)

```sh
npm run tauri build -- --bundles app
```

```sh
cargo tauri build --bundles app
```

Run on macOS.

## macOS DMG

```sh
npm run tauri build -- --bundles dmg
```

```sh
cargo tauri build --bundles dmg
```

## Windows installers (MSI / NSIS)

```sh
npm run tauri build
```

```sh
cargo tauri build
```

Run on Windows. `.msi` can only be produced on Windows.

## 32-bit / ARM64 builds for Windows

```sh
rustup target add i686-pc-windows-msvc
cargo tauri build --target i686-pc-windows-msvc
```

```sh
rustup target add aarch64-pc-windows-msvc
cargo tauri build --target aarch64-pc-windows-msvc
```

ARM64 first requires "C++ ARM64 build tools" from the Visual Studio Installer.

## Cross-build a Windows NSIS installer from Linux / macOS

The official page calls this a last resort.

```sh
sudo apt install nsis
sudo apt install lld llvm
```

```sh
brew install nsis
brew install llvm
```

```sh
rustup target add x86_64-pc-windows-msvc
cargo install --locked cargo-xwin
```

```sh
cargo tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc
```

Output goes to `target/x86_64-pc-windows-msvc/release/bundle/nsis/`. On macOS, add `/opt/homebrew/opt/llvm/bin` to `$PATH` as Homebrew instructs. Signing requires external tooling.

## Expand the WebView2 fixed runtime

```powershell
Expand .\Microsoft.WebView2.FixedVersionRuntime.128.0.2739.42.x64.cab -F:* ./src-tauri
```

## Make the MSI FIPS compliant

```powershell
$env:TAURI_BUNDLER_WIX_FIPS_COMPLIANT="true"
```

## Microsoft Store (merge a separate config)

```sh
npm run tauri build -- --no-bundle
npm run tauri bundle -- --config src-tauri/tauri.microsoftstore.conf.json
```

```sh
cargo tauri build --no-bundle
cargo tauri bundle --config src-tauri/tauri.microsoftstore.conf.json
```

The silent-install argument for an NSIS `-setup.exe` is `/S` (uppercase); for MSI use `msiexec` with `/quiet`.

```sh
MyApp_x64-setup.exe /S
```

## Debian package

```sh
cargo tauri build --bundles deb
```

## Cross-compile a Debian package for ARM

Manual procedure on a Debian / Ubuntu host.

```sh
rustup target add armv7-unknown-linux-gnueabihf
sudo apt install gcc-arm-linux-gnueabihf
sudo dpkg --add-architecture armhf
sudo apt-get update
sudo apt install libwebkit2gtk-4.1-dev:armhf
sudo apt install libssl-dev:armhf
export PKG_CONFIG_SYSROOT_DIR=/usr/arm-linux-gnueabihf/
cargo tauri build --target armv7-unknown-linux-gnueabihf
```

```sh
rustup target add aarch64-unknown-linux-gnu
sudo apt install gcc-aarch64-linux-gnu
sudo dpkg --add-architecture arm64
sudo apt-get update
sudo apt install libwebkit2gtk-4.1-dev:arm64
sudo apt install libssl-dev:arm64
export PKG_CONFIG_SYSROOT_DIR=/usr/aarch64-linux-gnu/
cargo tauri build --target aarch64-unknown-linux-gnu
```

Beforehand, set the linker (`arm-linux-gnueabihf-gcc` / `aarch64-linux-gnu-gcc`) in `<project-root>/.cargo/config.toml`. On Ubuntu, the ports.ubuntu.com ARM lines must be added to `/etc/apt/sources.list` (details in references `distribute/debian.md`). `libssl-dev` is only needed if an OpenSSL header-not-found error occurs. System-wide upgrade (`sudo apt-get upgrade`) is a separate, optional step and is not part of these blocks.

> Notes: The official page also runs a full system upgrade (`sudo apt-get upgrade -y`) after `apt-get update`; it is left out of the copyable blocks.

## AppImage

```sh
cargo tauri build --bundles appimage
```

End-user launch steps.

```sh
chmod a+x MyProject.AppImage
./MyProject.AppImage
```

ARM AppImages can only be built on ARM hardware or an emulator (`linuxdeploy` does not support cross-compilation).

## RPM

```sh
cargo tauri build --bundles rpm
```

The official example puts RPM script files in `mkdir src-tauri/scripts`.

## Install Flatpak build tools

```sh
sudo apt install flatpak flatpak-builder
```

```sh
sudo pacman -S --needed flatpak flatpak-builder
```

```sh
sudo dnf install flatpak flatpak-builder
```

```sh
flatpak install flathub org.gnome.Platform//47 org.gnome.Sdk//47
```

> Notes: The source installs runtime 46 while its manifest uses runtime-version '47'; aligned to 47 here (check the currently supported GNOME runtime before submitting to Flathub).

## Build and run a Flatpak locally

```sh
flatpak-builder --force-clean --user --install --disable-cache --repo flatpak-repo flatpak flatpak-builder.yaml
flatpak run <your flatpak id>
flatpak -y --user update <your flatpak id>
```

`flatpak-builder.yaml` is the official manifest that unpacks the deb bundle (details in references `distribute/flatpak.md`).

> Notes: Aligned with references distribute/flatpak.md: `--install` is added because the source omits it before `flatpak run`, which fails on the first run.

## Flatpak (generate sources for Flathub, open source)

```sh
git submodule add https://github.com/flatpak/flatpak-builder-tools.git
(cd flatpak-builder-tools/node/flatpak_node_generator && pipx install .)
```

```sh
flatpak-node-generator --no-requests-cache -o node-sources.json npm /path/to/your/lock/file/package-lock.json
python3 flatpak-builder-tools/cargo/flatpak-cargo-generator.py -o cargo-sources.json src-tauri/Cargo.lock
```

For yarn: `flatpak-node-generator ... yarn /path/to/your/lock/file/yarn.lock`.

> Notes: The source runs a bare cd before pipx install; it is wrapped in a subshell here so the following commands still run from the project root.

## Submit to Flathub

```sh
git clone --branch=new-pr git@github.com:your_github_username/flathub.git
cd flathub
git checkout -b your_app_name
```

Then open a Pull Request against the `new-pr` branch.

## Snapcraft

```sh
sudo apt install snapd
sudo snap install core22
sudo snap install snapcraft --classic
```

```sh
snapcraft
sudo snap install --dangerous ./appname_0.1.0_amd64.snap
snap run appname
```

> **WARNING**: `snapcraft upload` creates a public release. The official example specifies `--release=stable`.

```sh
snapcraft login
snapcraft upload --release=stable appname_0.1.0_amd64.snap
```

> Notes: The source runs sudo snapcraft and snap run without installing the built snap; snapcraft runs without sudo and an install step is added here (names follow the example snapcraft.yaml).

## AUR

```sh
git clone ssh://aur@aur.archlinux.org/<pkgname>.git
cd <pkgname>
# place the PKGBUILD here
makepkg --printsrcinfo > .SRCINFO
makepkg
```

```sh
git add .
git commit -m "Initial Commit"
git push
```

Place the `PKGBUILD` in the cloned directory before running.

> Notes: The source clones via the read-only HTTPS URL and does not cd into it; the SSH URL and a cd step are used here so makepkg and git push work.

## Google Play (Android)

```sh
npm run tauri android build -- --aab
```

```sh
cargo tauri android build --aab
cargo tauri android build --apk
cargo tauri android build --apk --split-per-abi
cargo tauri android build --aab --target aarch64 --target armv7
```

The AAB is written to `gen/android/app/build/outputs/bundle/universalRelease/app-universal-release.aab`. The first upload is done manually from the Play Console.

## App Store (iOS)

```sh
cargo tauri ios build --export-method app-store-connect
cargo tauri ios build --open
```

The IPA is at `src-tauri/gen/apple/build/arm64/${APPNAME}.ipa`.

```sh
xcrun altool --upload-app --type ios --file "src-tauri/gen/apple/build/arm64/${APPNAME}.ipa" --apiKey "${APPLE_API_KEY_ID}" --apiIssuer "${APPLE_API_ISSUER}"
```

`altool` authenticates with an App Store Connect API key.

## App Store (macOS)

```sh
cargo tauri build --no-bundle --target universal-apple-darwin
cargo tauri bundle --bundles app --target universal-apple-darwin --config src-tauri/tauri.appstore.conf.json
```

To target Apple Silicon only, set `bundle > macOS > minimumSystemVersion` in `tauri.conf.json` to `"12.0"`. Host-specific changes follow.

- Apple Silicon host: drop `--target universal-apple-darwin` and use the path `src-tauri/target/release`.

```sh
cargo tauri build --no-bundle
cargo tauri bundle --bundles app --config src-tauri/tauri.appstore.conf.json
```

- Intel host: run `rustup target add aarch64-apple-darwin`, replace `universal-apple-darwin` with `aarch64-apple-darwin`, and use the path `src-tauri/target/aarch64-apple-darwin/release`.

```sh
rustup target add aarch64-apple-darwin
cargo tauri build --no-bundle --target aarch64-apple-darwin
cargo tauri bundle --bundles app --target aarch64-apple-darwin --config src-tauri/tauri.appstore.conf.json
```

Create and upload the `.pkg` (universal case).

```sh
xcrun productbuild --sign "<certificate signing identity>" --component "src-tauri/target/universal-apple-darwin/release/bundle/macos/${APPNAME}.app" /Applications "${APPNAME}.pkg"
xcrun altool --upload-app --type macos --file "${APPNAME}.pkg" --apiKey "${APPLE_API_KEY_ID}" --apiIssuer "${APPLE_API_ISSUER}"
```

For an Apple Silicon host, set `--component` to `src-tauri/target/release/bundle/macos/${APPNAME}.app`; for an Intel host, `src-tauri/target/aarch64-apple-darwin/release/bundle/macos/${APPNAME}.app`. Signing the `.pkg` requires a Mac Installer Distribution certificate.

> Notes: The source omits --target on the build step and uses target/... paths; --target universal-apple-darwin is added so the bundle step finds the binary, and paths assume the project root with the default src-tauri/target.

## Notes

- Store, signing, and notarization procedures per platform are covered by the apple-distribution / windows-packaging-publish / android-build-gradle skills; this file covers only Tauri CLI operations.
- Signing commands (the `distribute/sign/*` pages) are not included here. See `distribute/sign-*.md` in references.
