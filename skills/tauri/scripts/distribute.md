---
source: https://v2.tauri.app/distribute/
---

# Distribute

配布形式別（macOS / Windows / Linux / Android / iOS / ストア）のバンドル生成とアップロードのコマンド集。各ストア・署名の公式手順そのものは対象外で、Tauri CLI 側の操作と各ページが示す補助コマンドのみ収録する。

> **警告**: `sudo` によるパッケージ導入・`cargo install`・`git push`・ストアへのアップロード（`altool` / `snapcraft upload`）を含む。使い捨てのビルド環境（コンテナ・CI・検証 VM）で実行することを前提にし、`$APPLE_API_KEY_ID` などの認証情報は環境変数から渡してコミットしない。呼び出し形は導入方法で異なる（`dev-build.md` の表を参照）。

## macOS アプリバンドル（.app）

```sh
npm run tauri build -- --bundles app
```

```sh
cargo tauri build --bundles app
```

macOS 上で実行する。

## macOS DMG

```sh
npm run tauri build -- --bundles dmg
```

```sh
cargo tauri build --bundles dmg
```

## Windows インストーラー（MSI / NSIS）

```sh
npm run tauri build
```

```sh
cargo tauri build
```

Windows 上で実行する。`.msi` は Windows でのみ生成できる。

## Windows 向け 32bit / ARM64 ビルド

```sh
rustup target add i686-pc-windows-msvc
cargo tauri build --target i686-pc-windows-msvc
```

```sh
rustup target add aarch64-pc-windows-msvc
cargo tauri build --target aarch64-pc-windows-msvc
```

ARM64 は Visual Studio Installer の "C++ ARM64 build tools" が先に必要。

## Linux / macOS から Windows 向け NSIS をクロスビルド

公式は「最後の手段」としている。

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

出力は `target/x86_64-pc-windows-msvc/release/bundle/nsis/`。macOS では Homebrew の指示に従い `/opt/homebrew/opt/llvm/bin` を `$PATH` に追加する。署名には外部ツールが必要。

## WebView2 固定ランタイムの展開

```powershell
Expand .\Microsoft.WebView2.FixedVersionRuntime.128.0.2739.42.x64.cab -F:* ./src-tauri
```

## MSI を FIPS 準拠にする

```powershell
$env:TAURI_BUNDLER_WIX_FIPS_COMPLIANT="true"
```

## Microsoft Store 向け（別設定をマージ）

```sh
npm run tauri build -- --no-bundle
npm run tauri bundle -- --config src-tauri/tauri.microsoftstore.conf.json
```

```sh
cargo tauri build --no-bundle
cargo tauri bundle --config src-tauri/tauri.microsoftstore.conf.json
```

NSIS の `-setup.exe` のサイレントインストール引数は `/S`（大文字）、MSI は `msiexec` の `/quiet`。

```sh
MyApp_x64-setup.exe /S
```

## Debian パッケージ

```sh
cargo tauri build --bundles deb
```

## ARM 向け Debian クロスコンパイル

Debian / Ubuntu 系ホストでの手動手順。

```sh
rustup target add armv7-unknown-linux-gnueabihf
sudo apt install gcc-arm-linux-gnueabihf
sudo dpkg --add-architecture armhf
sudo apt-get update && sudo apt-get upgrade -y
sudo apt install libwebkit2gtk-4.1-dev:armhf
sudo apt install libssl-dev:armhf
export PKG_CONFIG_SYSROOT_DIR=/usr/arm-linux-gnueabihf/
cargo tauri build --target armv7-unknown-linux-gnueabihf
```

```sh
rustup target add aarch64-unknown-linux-gnu
sudo apt install gcc-aarch64-linux-gnu
sudo dpkg --add-architecture arm64
sudo apt-get update && sudo apt-get upgrade -y
sudo apt install libwebkit2gtk-4.1-dev:arm64
sudo apt install libssl-dev:arm64
export PKG_CONFIG_SYSROOT_DIR=/usr/aarch64-linux-gnu/
cargo tauri build --target aarch64-unknown-linux-gnu
```

事前に `<project-root>/.cargo/config.toml` に linker（`arm-linux-gnueabihf-gcc` / `aarch64-linux-gnu-gcc`）を設定する。Ubuntu では `/etc/apt/sources.list` に ports.ubuntu.com の ARM 行を追加する必要がある（詳細は references の `distribute/debian.md`）。`libssl-dev` は OpenSSL ヘッダーが見つからないエラーが出た場合のみ必要。

## AppImage

```sh
cargo tauri build --bundles appimage
```

利用者側の起動手順。

```sh
chmod a+x MyProject.AppImage
./MyProject.AppImage
```

ARM の AppImage は ARM 実機またはエミュレーター上でのみビルドできる（`linuxdeploy` がクロスコンパイル非対応）。

## RPM

```sh
cargo tauri build --bundles rpm
```

RPM のスクリプトファイル置き場は `mkdir src-tauri/scripts`（公式例）。

## Flatpak のビルドツール導入

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

## Flatpak のローカルビルドと実行

```sh
flatpak-builder --force-clean --user --install --disable-cache --repo flatpak-repo flatpak flatpak-builder.yaml
flatpak run <your flatpak id>
flatpak -y --user update <your flatpak id>
```

`flatpak-builder.yaml` は deb バンドルを展開する形の公式マニフェスト（詳細は references の `distribute/flatpak.md`）。

> Notes: Aligned with references distribute/flatpak.md: `--install` is added because the source omits it before `flatpak run`, which fails on the first run.

## Flatpak（Flathub 向けソース生成、オープンソース用）

```sh
git submodule add https://github.com/flatpak/flatpak-builder-tools.git
(cd flatpak-builder-tools/node/flatpak_node_generator && pipx install .)
```

```sh
flatpak-node-generator --no-requests-cache -o node-sources.json npm /path/to/your/lock/file/package-lock.json
python3 flatpak-builder-tools/cargo/flatpak-cargo-generator.py -o cargo-sources.json src-tauri/Cargo.lock
```

yarn の場合は `flatpak-node-generator ... yarn /path/to/your/lock/file/yarn.lock`。

> Notes: The source runs a bare cd before pipx install; it is wrapped in a subshell here so the following commands still run from the project root.

## Flathub への申請

```sh
git clone --branch=new-pr git@github.com:your_github_username/flathub.git
cd flathub
git checkout -b your_app_name
```

その後 `new-pr` ブランチ宛てに Pull Request を作成する。

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

> **警告**: `snapcraft upload` は公開リリースを作る。公式例は `--release=stable` を指定している。

```sh
snapcraft login
snapcraft upload --release=stable appname_0.1.0_amd64.snap
```

> Notes: The source runs sudo snapcraft and snap run without installing the built snap; snapcraft runs without sudo and an install step is added here (names follow the example snapcraft.yaml).

## AUR

```sh
git clone ssh://aur@aur.archlinux.org/<pkgname>.git
cd <pkgname>
# ここに PKGBUILD を置く
makepkg --printsrcinfo > .SRCINFO
makepkg
```

```sh
git add .
git commit -m "Initial Commit"
git push
```

clone したディレクトリに `PKGBUILD` を置いてから実行する。

> Notes: The source clones via the read-only HTTPS URL and does not cd into it; the SSH URL and a cd step are used here so makepkg and git push work.

## Google Play（Android）

```sh
npm run tauri android build -- --aab
```

```sh
cargo tauri android build --aab
cargo tauri android build --apk
cargo tauri android build --apk --split-per-abi
cargo tauri android build --aab --target aarch64 --target armv7
```

AAB の出力先は `gen/android/app/build/outputs/bundle/universalRelease/app-universal-release.aab`。初回アップロードは Play Console から手動で行う。

## App Store（iOS）

```sh
cargo tauri ios build --export-method app-store-connect
cargo tauri ios build --open
```

IPA は `src-tauri/gen/apple/build/arm64/${APPNAME}.ipa`。

```sh
xcrun altool --upload-app --type ios --file "src-tauri/gen/apple/build/arm64/${APPNAME}.ipa" --apiKey "${APPLE_API_KEY_ID}" --apiIssuer "${APPLE_API_ISSUER}"
```

`altool` は App Store Connect API キーで認証する。

## App Store（macOS）

```sh
cargo tauri build --no-bundle --target universal-apple-darwin
cargo tauri bundle --bundles app --target universal-apple-darwin --config src-tauri/tauri.appstore.conf.json
```

Apple Silicon のみを対象にする場合は `tauri.conf.json` の `bundle > macOS > minimumSystemVersion` を `"12.0"` にする。ホスト別の変更点は次のとおり。

- Apple Silicon ホスト: `--target universal-apple-darwin` を外し、パスは `src-tauri/target/release` を使う。

```sh
cargo tauri build --no-bundle
cargo tauri bundle --bundles app --config src-tauri/tauri.appstore.conf.json
```

- Intel ホスト: `rustup target add aarch64-apple-darwin` のうえで `universal-apple-darwin` を `aarch64-apple-darwin` に置き換え、パスは `src-tauri/target/aarch64-apple-darwin/release` を使う。

```sh
rustup target add aarch64-apple-darwin
cargo tauri build --no-bundle --target aarch64-apple-darwin
cargo tauri bundle --bundles app --target aarch64-apple-darwin --config src-tauri/tauri.appstore.conf.json
```

`.pkg` の作成とアップロード（universal の場合）。

```sh
xcrun productbuild --sign "<certificate signing identity>" --component "src-tauri/target/universal-apple-darwin/release/bundle/macos/${APPNAME}.app" /Applications "${APPNAME}.pkg"
xcrun altool --upload-app --type macos --file "${APPNAME}.pkg" --apiKey "${APPLE_API_KEY_ID}" --apiIssuer "${APPLE_API_ISSUER}"
```

Apple Silicon ホスト向けは `--component` を `src-tauri/target/release/bundle/macos/${APPNAME}.app`、Intel ホスト向けは `src-tauri/target/aarch64-apple-darwin/release/bundle/macos/${APPNAME}.app` にする。`.pkg` の署名には Mac Installer Distribution 証明書が必要。

> Notes: The source omits --target on the build step and uses target/... paths; --target universal-apple-darwin is added so the bundle step finds the binary, and paths assume the project root with the default src-tauri/target.

## 注記

- ストア・署名・公証の各プラットフォーム公式手順は apple-distribution / windows-packaging-publish / android-build-gradle の各スキルが担当し、ここでは Tauri CLI 側の操作のみ扱う。
- 署名関連のコマンド（`distribute/sign/*` ページ）は本ファイルでは未収録。references の `distribute/sign-*.md` を参照する。
