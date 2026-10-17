---
source: https://kotlinlang.org/docs/multiplatform/kotlin-toolchain.html
---

# Kotlin Toolchain CLI

Install, project creation, and run commands for the Kotlin Toolchain CLI (Alpha, `kotlinToolchainVersion` 0.13).

> **警告**: Prefer SDKMAN! (recommended). The installer scripts download and execute a remote script; download it first, review it, then run it. Use a disposable environment if you cannot review it.

## Install with SDKMAN! (recommended)

```sh
sdk install kotlintoolchain
```

## Install with the installer script (macOS / Linux)

Adapted (not in the official docs): the official docs pipe the script into the shell; here it is split into download, review, and run.

```sh
curl -fsSLo kotlin-toolchain-install.sh https://kotl.in/install.sh
less kotlin-toolchain-install.sh
sh kotlin-toolchain-install.sh

# Restart your terminal or run this command
# to make 'kotlin' available
exec $SHELL
```

## Install with the installer script (Windows)

Adapted (not in the official docs): the official docs pipe the script into `iex`; here it is split into download, review, and run.

```sh
powershell -Command "Invoke-WebRequest -Uri 'https://kotl.in/install.ps1' -OutFile kotlin-toolchain-install.ps1"
powershell -Command "Get-Content kotlin-toolchain-install.ps1"
powershell -ExecutionPolicy Bypass -File .\kotlin-toolchain-install.ps1
```

## Verify the CLI

```sh
kotlin --version
```

## Create a project

```sh
kotlin new
```

Interactive: project path, template (such as **Compose Multiplatform application**), targets, and project ID.

## Run a project

```sh
kotlin run
```

Lists the runnable modules.

## Run a specific module

```sh
# Build and run the desktop JVM app
kotlin run -m desktopApp
```

`-m` (`--module`) selects the module directly.
