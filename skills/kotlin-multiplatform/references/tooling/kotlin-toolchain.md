---
source: https://kotlinlang.org/docs/multiplatform/kotlin-toolchain.html
---

# Create and build a Kotlin Multiplatform application with Kotlin Toolchain

Kotlin Toolchain is a JetBrains tool for creating, building, testing, and running Kotlin projects, with a CLI and declarative configuration. This page sets up a KMP project from scratch with it.

## Signature / Usage

```shell
sdk install kotlintoolchain
kotlin --version
kotlin new
kotlin run
kotlin run -m desktopApp
```

Installer script (macOS or Linux):

```shell
curl -fsSL https://kotl.in/install.sh | sh

# Restart your terminal or run this command
# to make 'kotlin' available
exec $SHELL
```

Installer script (Windows):

```shell
powershell -ExecutionPolicy ByPass -c "irm 'https://kotl.in/install.ps1' | iex"
```

Module configuration (`androidApp/module.yaml`); each module is listed in the overall `project.yaml`:

```yaml
# androidApp/module.yaml
product: android/app

dependencies:
  # Shared module dependency
  - //shared
  # Android-specific dependency
  - $libs.androidx.activity.compose

settings:
  compose: enabled
  android:
    namespace: org.example.toolchainfirst
    applicationId: org.example.toolchainfirst
```

## Options / Props

| Command / option | Description |
|------------------|-------------|
| `kotlin new` | Generates a project; choose the **Compose Multiplatform application** template, confirm targets, and provide a project ID |
| `kotlin run` | Lists runnable modules (for example desktopApp with Hot Reload, androidApp, iosApp, webApp) |
| `-m`, `--module` | Runs the given module directly, for example `kotlin run -m desktopApp` |

## Notes

- Alpha: Kotlin Toolchain is in Alpha (version 0.13 in the pinned docs); feedback goes to YouTrack (project KTC).
- The installer scripts pipe a remote script straight into the shell (`curl ... | sh`, `irm ... | iex`); inspect the script first or run it in a disposable environment, or prefer `sdk install kotlintoolchain`.
- Install via SDKMAN! or the installer script. Building iOS apps requires Xcode and the necessary SDK; the CLI displays Xcode setup instructions when a build or run actually needs it.
- The project ID is used for Kotlin package names, the Android namespace and application ID, and the iOS bundle ID. A Git repository is initialized by default.
- The generated project has several `*App` modules (entry points per platform) and a `shared` module with common code; every application module explicitly depends on the shared module.
- Source sets follow the KMP source set model, with `src@android` instead of `androidMain`, for example.
- IDE support needs both the Kotlin Multiplatform plugin and the Kotlin Toolchain plugin (the latter recognizes the project structure and generates run configurations). With both installed, a project can be created via File | New | Project, Kotlin Multiplatform, Build system switch set to Kotlin Toolchain.
- Publishing: Android and iOS apps are documented in the Kotlin Toolchain docs (user guide, product types, android-app / ios-app, Publishing). JVM and Wasm apps can be packaged, but publishing for these targets is not fully supported yet.
- This is a separate build tool from the Gradle-based setup described in the Gradle DSL pages of this skill.

## Related

- [Build and run](./build-and-run.md)
- [Compose Hot Reload](./compose-hot-reload.md)
- [Stability of supported platforms](../getting-started/supported-platforms.md)
