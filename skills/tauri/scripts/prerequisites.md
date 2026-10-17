---
source: https://v2.tauri.app/start/prerequisites/
---

# Prerequisites

Tauri v2 の開発前提（OS 別システム依存・Rust・Node.js・モバイルターゲット）のセットアップコマンド集。

> **警告**: 本ファイルのコマンドは `sudo` によるシステムパッケージ導入、インストーラスクリプトの実行、環境変数の永続変更を含む。使い捨ての環境（VM・コンテナ・検証用マシン）で実行することを前提にする。インストーラスクリプトはダウンロード → 内容確認 → 実行の順で扱う。

## Linux のシステム依存（Debian）

```sh
sudo apt update
sudo apt install libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

## Linux のシステム依存（Arch）

```sh
sudo pacman -Syu
sudo pacman -S --needed \
  webkit2gtk-4.1 \
  base-devel \
  curl \
  wget \
  file \
  openssl \
  appmenu-gtk-module \
  libappindicator-gtk3 \
  librsvg \
  xdotool
```

## Linux のシステム依存（Fedora）

```sh
sudo dnf check-update
sudo dnf install webkit2gtk4.1-devel \
  openssl-devel \
  curl \
  wget \
  file \
  libappindicator-gtk3-devel \
  librsvg2-devel \
  libxdo-devel
sudo dnf group install "c-development"
```

## Linux のシステム依存（Gentoo）

```sh
sudo emerge --ask \
  net-libs/webkit-gtk:4.1 \
  dev-libs/libayatana-appindicator \
  net-misc/curl \
  net-misc/wget \
  sys-apps/file
```

## Linux のシステム依存（OSTree）

```sh
sudo rpm-ostree install webkit2gtk4.1-devel \
  openssl-devel \
  curl \
  wget \
  file \
  libappindicator-gtk3-devel \
  librsvg2-devel \
  libxdo-devel \
  gcc \
  gcc-c++ \
  make
sudo systemctl reboot
```

> **警告**: 末尾の `sudo systemctl reboot` はシステムを再起動する。

## Linux のシステム依存（openSUSE）

```sh
sudo zypper up
sudo zypper in webkit2gtk3-devel \
  libopenssl-devel \
  curl \
  wget \
  file \
  libappindicator3-1 \
  librsvg-devel
sudo zypper in -t pattern devel_basis
```

## Linux のシステム依存（Alpine）

```sh
sudo apk add \
  build-base \
  webkit2gtk-4.1-dev \
  curl \
  wget \
  file \
  openssl \
  libayatana-appindicator-dev \
  librsvg
```

公式注記: Alpine コンテナにはフォントが無いため、テキスト描画にはフォントパッケージ（例: `font-dejavu`）を 1 つ以上導入する。musl 向けビルドでリンカーエラーが出る場合は、対応する `*-static` パッケージを追加する。

```sh
sudo apk add --no-cache \
  openssl-libs-static \
  cairo-static \
  harfbuzz-static \
  glib-static \
  wayland-static \
  zlib-static
```

NixOS の手順はコマンドを持たず、公式は NixOS Wiki（https://wiki.nixos.org/wiki/Tauri）を案内している。

## macOS のシステム依存

Xcode を Mac App Store または Apple Developer サイトから導入し、導入後に一度起動する（iOS も対象にする場合は Xcode 本体が必要）。デスクトップのみが対象なら Command Line Tools で足りる。

```sh
xcode-select --install
```

## Windows のシステム依存

Microsoft C++ Build Tools（インストーラーで "Desktop development with C++" を選択）と WebView2 が必要。コマンドラインで行う操作は Rust の導入のみ（下記）。MSI を作る場合は VBSCRIPT のオプション機能が有効である必要がある（Settings > Apps > Optional features > More Windows features）。

## Rust の導入（Linux / macOS）

```sh
# download
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs -o rustup-init.sh
# inspect
less rustup-init.sh
# run
sh rustup-init.sh
```

公式の rustup インストーラ。公式は「実行前にスクリプトを確認する」ことを推奨している（https://sh.rustup.rs/）。導入後はターミナルを再起動する。

> Notes: The source pipes the installer directly into sh; it is split into download / inspect / run here.

## Rust の導入（Windows）

```powershell
winget install --id Rustlang.Rustup
```

MSVC ツールチェーンを `default host triple` にする。既に Rust がある場合は次で揃える。

```powershell
rustup default stable-msvc
```

## Node.js の確認

```sh
node -v
npm -v
```

JavaScript フロントエンドを使う場合のみ必要。npm 以外のパッケージマネージャー（pnpm / yarn）を使うなら次を実行する（任意）。

```sh
corepack enable
```

## Android 向け環境変数（Linux）

```sh
export JAVA_HOME=/opt/android-studio/jbr
export ANDROID_HOME="$HOME/Android/Sdk"
export NDK_HOME="$ANDROID_HOME/ndk/<ndk-version>"
```

Android Studio の SDK Manager で Android SDK Platform / Platform-Tools / NDK (Side by side) / Build-Tools / Command-line Tools を導入しておく。`<ndk-version>` は導入済みの NDK バージョンのディレクトリ名。

> Notes: The source derives NDK_HOME from the last entry of the ndk directory (`ls`), which breaks with multiple side-by-side NDKs; the version is specified explicitly here (same as references/getting-started/prerequisites.md).

## Android 向け環境変数（macOS）

```sh
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export NDK_HOME="$ANDROID_HOME/ndk/<ndk-version>"
```

## Android 向け環境変数（Windows）

```powershell
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jbr", "User")
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LocalAppData\Android\Sdk", "User")
$VERSION = '<ndk-version>'  # 導入済みの NDK バージョンのディレクトリ名
[System.Environment]::SetEnvironmentVariable("NDK_HOME", "$env:LocalAppData\Android\Sdk\ndk\$VERSION", "User")
```

ユーザー環境変数を永続的に書き換える。現在の PowerShell セッションに反映するには次を実行する。

```powershell
[System.Environment]::GetEnvironmentVariables("User").GetEnumerator() | % { Set-Item -Path "Env:\$($_.key)" -Value $_.value }
```

## Android ターゲットの追加

```sh
rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
```

## iOS ターゲットの追加と CocoaPods

```sh
rustup target add aarch64-apple-ios x86_64-apple-ios aarch64-apple-ios-sim
```

iOS 開発は macOS のみ。Homebrew 未導入の場合、公式はインストールスクリプトを案内している（ダウンロード → 確認 → 実行に分割）。

```sh
curl -fsSL -o install.sh https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh
less install.sh
/bin/bash install.sh
```

```sh
brew install cocoapods
```
