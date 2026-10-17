---
source: https://kotlinlang.org/docs/multiplatform/quickstart.html
---

# Kotlin Multiplatform quickstart

Set up the environment, generate a Kotlin Multiplatform project with the IDE wizard, and run it on Android, iOS, desktop, and web.

```shell
# Bash or Zsh: add to .profile or .zprofile
export ANDROID_HOME=~/Library/Android/sdk
```

```shell
# Desktop run configuration with Compose Hot Reload (Gradle run configuration, [app name]:desktopApp project)
hotRun --mainClass "com.example.demo.MainKt"
```

Gradle tasks named in the tutorial for manually created web run configurations (Gradle run configuration, `[app name]:webApp` project):

```text
wasmJsBrowserDevelopmentRun
jsBrowserDevelopmentRun
```

## Notes

- Wizard flow: **File | New | Project** in IntelliJ IDEA (Android Studio: **File | New | New project**), choose **Kotlin Multiplatform**, select Android / iOS / Desktop / Web / Server, keep **Share UI** for Compose Multiplatform, and make sure the **Gradle** build system is selected.
- Generated modules: `androidApp`, `desktopApp`, `iosApp` (Xcode project), `shared` (common code, compiled for each target), `webApp`; `server` and `core` appear only when the server platform is selected. `shared/Platform.kt` holds an `expect` declaration for the platform name.
- iOS builds need a macOS machine with Xcode launched at least once; Windows PowerShell and CMD variants of the `ANDROID_HOME` setting (`[Environment]::SetEnvironmentVariable(...)`, `setx`) are in the source page.
- Kotlin Toolchain (a JetBrains CLI for brand-new projects) is offered as an alternative to Gradle in the source page. Check **Project Environment Preflight Checks** when the environment looks wrong.
