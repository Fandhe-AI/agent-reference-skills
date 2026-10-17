---
source: https://v2.tauri.app/start/prerequisites/
---

# Prerequisites

Setup commands for Tauri v2 development prerequisites (per-OS system dependencies, Rust, Node.js, mobile targets).

> **WARNING**: The commands in this file install system packages via `sudo`, run installer scripts, and persistently change environment variables. Run them only in a disposable environment (VM, container, throwaway machine). Installer scripts are handled as download, inspect, then run.

## Linux system dependencies (Debian)

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

## Linux system dependencies (Arch)

```sh
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

A system-wide upgrade (`sudo pacman -Syu`) is a separate, optional step and is not part of this block.

> Notes: The official page also runs `sudo pacman -Syu` before the install; it is left out of the copyable block.

## Linux system dependencies (Fedora)

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

## Linux system dependencies (Gentoo)

```sh
sudo emerge --ask \
  net-libs/webkit-gtk:4.1 \
  dev-libs/libayatana-appindicator \
  net-misc/curl \
  net-misc/wget \
  sys-apps/file
```

## Linux system dependencies (OSTree)

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
```

rpm-ostree changes take effect after a reboot; reboot the host yourself when convenient.

> Notes: The official page ends this block with `sudo systemctl reboot`; it is left out of the copyable block.

## Linux system dependencies (openSUSE)

```sh
sudo zypper in webkit2gtk3-devel \
  libopenssl-devel \
  curl \
  wget \
  file \
  libappindicator3-1 \
  librsvg-devel
sudo zypper in -t pattern devel_basis
```

A system-wide update (`sudo zypper up`) is a separate, optional step and is not part of this block.

> Notes: The official page also runs `sudo zypper up` before the install; it is left out of the copyable block.

## Linux system dependencies (Alpine)

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

Official note: Alpine containers ship no fonts, so install at least one font package (for example `font-dejavu`) to render text. If linker errors occur when building for musl, add the matching `*-static` packages.

```sh
sudo apk add --no-cache \
  openssl-libs-static \
  cairo-static \
  harfbuzz-static \
  glib-static \
  wayland-static \
  zlib-static
```

The NixOS procedure has no commands; the official page points to the NixOS Wiki (https://wiki.nixos.org/wiki/Tauri).

## macOS system dependencies

Install Xcode from the Mac App Store or the Apple Developer site and launch it once after installing (full Xcode is required if iOS is also a target). For desktop only, Command Line Tools are enough.

```sh
xcode-select --install
```

## Windows system dependencies

Microsoft C++ Build Tools (select "Desktop development with C++" in the installer) and WebView2 are required. The only command-line step is installing Rust (below). To build an MSI, the VBSCRIPT optional feature must be enabled (Settings > Apps > Optional features > More Windows features).

## Install Rust (Linux / macOS)

```sh
# download
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs -o rustup-init.sh
# inspect
less rustup-init.sh
# run
sh rustup-init.sh
```

The official rustup installer. The official page recommends reviewing the script before running it (https://sh.rustup.rs/). Restart the terminal afterwards.

> Notes: The source pipes the installer directly into sh; it is split into download / inspect / run here.

## Install Rust (Windows)

```powershell
winget install --id Rustlang.Rustup
```

Make the MSVC toolchain the `default host triple`. If Rust is already installed, align it with the following.

```powershell
rustup default stable-msvc
```

## Check Node.js

```sh
node -v
npm -v
```

Required only when using a JavaScript frontend. If you use a package manager other than npm (pnpm / yarn), run the following (optional).

```sh
corepack enable
```

## Android environment variables (Linux)

```sh
export JAVA_HOME=/opt/android-studio/jbr
export ANDROID_HOME="$HOME/Android/Sdk"
export NDK_HOME="$ANDROID_HOME/ndk/<ndk-version>"
```

Install Android SDK Platform / Platform-Tools / NDK (Side by side) / Build-Tools / Command-line Tools from Android Studio's SDK Manager beforehand. `<ndk-version>` is the directory name of the installed NDK version.

> Notes: The source derives NDK_HOME from the last entry of the ndk directory (`ls`), which breaks with multiple side-by-side NDKs; the version is specified explicitly here (same as references/getting-started/prerequisites.md).

## Android environment variables (macOS)

```sh
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export NDK_HOME="$ANDROID_HOME/ndk/<ndk-version>"
```

## Android environment variables (Windows)

```powershell
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jbr", "User")
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LocalAppData\Android\Sdk", "User")
$VERSION = '<ndk-version>'  # directory name of the installed NDK version
[System.Environment]::SetEnvironmentVariable("NDK_HOME", "$env:LocalAppData\Android\Sdk\ndk\$VERSION", "User")
```

This persistently rewrites user environment variables. To apply them to the current PowerShell session, run the following.

```powershell
[System.Environment]::GetEnvironmentVariables("User").GetEnumerator() | % { Set-Item -Path "Env:\$($_.key)" -Value $_.value }
```

## Add Android targets

```sh
rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
```

## Add iOS targets and CocoaPods

```sh
rustup target add aarch64-apple-ios x86_64-apple-ios aarch64-apple-ios-sim
```

iOS development is macOS only. If Homebrew is not installed, the official page points to an install script (split here into download, inspect, run).

```sh
curl -fsSL -o install.sh https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh
less install.sh
/bin/bash install.sh
```

```sh
brew install cocoapods
```
