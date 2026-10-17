---
source: https://v2.tauri.app/start/prerequisites/
---

# Prerequisites

To build with Tauri you need: system dependencies, Rust, and (only for mobile targets) the mobile toolchains. Node.js is needed only for a JavaScript frontend.

## Signature / Usage

**Linux (Debian)**

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

**Linux (Arch)**

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

**Linux (Fedora)**

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

**Linux (Gentoo)**

```sh
sudo emerge --ask \
  net-libs/webkit-gtk:4.1 \
  dev-libs/libayatana-appindicator \
  net-misc/curl \
  net-misc/wget \
  sys-apps/file
```

**Linux (OSTree)**

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

**Linux (openSUSE)**

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

**Linux (Alpine)**

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

For Nix/NixOS, instructions are in the NixOS Wiki (https://wiki.nixos.org/wiki/Tauri).

**macOS** (Xcode, required for iOS targets; launch Xcode once after installing). Desktop-only development can use the Command Line Tools instead:

```sh
xcode-select --install
```

**Windows**: install Microsoft C++ Build Tools ("Desktop development with C++" workload) and WebView2 (Evergreen Bootstrapper, from https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section).

**Rust (Linux and macOS)**

```sh
# download
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs -o rustup-init.sh
# inspect
less rustup-init.sh
# run
sh rustup-init.sh
```

**Rust (Windows)**

```powershell
winget install --id Rustlang.Rustup
```

If Rust is already installed, make sure the MSVC toolchain is the default:

```powershell
rustup default stable-msvc
```

**Node.js** (only for a JavaScript frontend): install the LTS version, then check:

```sh
node -v
# v20.10.0
npm -v
# 10.2.3
```

**Android** (mobile targets): install Android Studio, set `JAVA_HOME`, install SDK components via the SDK Manager, set `ANDROID_HOME` / `NDK_HOME`, then add Rust targets.

```sh
# Linux
export JAVA_HOME=/opt/android-studio/jbr
# macOS
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

```powershell
# Windows
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jbr", "User")
```

SDK Manager packages to install:

- Android SDK Platform
- Android SDK Platform-Tools
- NDK (Side by side)
- Android SDK Build-Tools
- Android SDK Command-line Tools

```sh
# Linux
export ANDROID_HOME="$HOME/Android/Sdk"
export NDK_HOME="$ANDROID_HOME/ndk/<ndk-version>"  # e.g. the version directory you installed
# macOS
export ANDROID_HOME="$HOME/Library/Android/sdk"
export NDK_HOME="$ANDROID_HOME/ndk/<ndk-version>"  # e.g. the version directory you installed
```

```powershell
# Windows
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LocalAppData\Android\Sdk", "User")
$VERSION = Get-ChildItem -Name "$env:LocalAppData\Android\Sdk\ndk" | Select-Object -Last 1
[System.Environment]::SetEnvironmentVariable("NDK_HOME", "$env:LocalAppData\Android\Sdk\ndk\$VERSION", "User")
```

```sh
rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
```

**iOS** (macOS only; requires full Xcode, not just Command Line Tools):

```sh
rustup target add aarch64-apple-ios x86_64-apple-ios aarch64-apple-ios-sim
brew install cocoapods
```

Homebrew itself is installed with its install script (download, inspect, then run):

```sh
curl -fsSL -o install.sh https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh
less install.sh
/bin/bash install.sh
```

## Notes

- Supported OS floor stated by the page: macOS Catalina (10.15) and later, Windows 7 and later; Linux requires distribution-specific packages (above). If a distribution is not listed, the page points to Awesome Tauri guides.
- Windows: WebView2 is already installed on Windows 10 (from version 1803 onward) and later; skip the manual install there.
- Windows, MSI only: building MSI packages (`"targets": "msi"` or `"targets": "all"` in `tauri.conf.json`) requires the VBSCRIPT optional feature (Settings > Apps > Optional features > More Windows features). If you see errors like `failed to run light.exe`, enable it. VBSCRIPT is enabled by default on most installations but is being deprecated by Microsoft and may be disabled in future Windows versions.
- Windows: for full support of Tauri and tools like `trunk`, the MSVC Rust toolchain must be the selected `default host triple` (`x86_64-pc-windows-msvc`, `i686-pc-windows-msvc`, or `aarch64-pc-windows-msvc`).
- Alpine: containers include no fonts by default; install at least one font package (for example `font-dejavu`). Alpine targets musl, so Rust builds link several system libraries statically; if linking fails with symbols from libraries `pkg-config` reports as present, install the matching `*-static` packages (`openssl-libs-static cairo-static harfbuzz-static glib-static wayland-static zlib-static`). Not every dependency is packaged as `*-static`; some may need building from source.
- Restart the terminal (and in some cases the system) after installing Rust or Node.js. Package managers other than npm can be enabled with `corepack enable`.
- Android: "Show Package Details" in the SDK Manager allows older package versions; install older versions only if necessary (compatibility/security risks). On Windows, apps do not refresh environment variables automatically; restart the terminal and IDE.
- The source derives NDK_HOME from `ls` of the ndk directory, which breaks with multiple side-by-side NDKs; pick one version explicitly.
- The source pipes the rustup installer script directly into the shell; it is split into download / inspect / run here. The page itself advises reading the script (https://sh.rustup.rs/) before running it.
- Rust itself (language, Cargo) is covered by the rust skill; Android Studio / Xcode specifics by the `android-*` and `apple-*` skills.

## Related

- [Create a Project](./create-project.md)
- [Frontend Configuration](./frontend-configuration.md)
