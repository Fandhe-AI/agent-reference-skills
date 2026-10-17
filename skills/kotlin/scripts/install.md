---
source: https://kotlinlang.org/docs/command-line.html
---

# Install

How to install the Kotlin command-line compiler. No standalone compiler install is needed when using an IDE (retrieved 2026-10-16, Kotlin 2.4.21).

## Using an IDE

Kotlin is included in each IntelliJ IDEA and Android Studio release. Download and install one of these IDEs to start using Kotlin.

```sh
# No command is needed with an IDE. Official entry point: https://kotlinlang.org/docs/getting-started.html
```

Installing the command-line compiler is not an essential step to use Kotlin. IDE downloads: https://www.jetbrains.com/idea/download/ and https://developer.android.com/studio.

## Manual compiler install

```sh
# 1. Download kotlin-compiler-2.4.21.zip from GitHub Releases
#    https://github.com/JetBrains/kotlin/releases/tag/v2.4.21
# 2. Unzip it to any directory and, if needed, add kotlinc/bin to the system path
```

The `bin` directory contains scripts for Windows, macOS, and Linux. Manual installation is the recommended way to use the command-line compiler on Windows.

## Install with SDKMAN!

```sh
sdk install kotlin
```

For UNIX-based systems (macOS, Linux, Cygwin, FreeBSD, Solaris) with Bash or ZSH. SDKMAN! itself must be installed first (https://sdkman.io/install).

## Install with Homebrew

```sh
brew update
brew install kotlin
```

For macOS.

## Install with Snap

> **Warning**: This installs a system package with `sudo`. Run it only in a disposable environment (container or VM).

```sh
sudo snap install --classic kotlin
```

For Ubuntu 16.04 or later with Snap.
