---
source: https://kotlinlang.org/docs/multiplatform/build-and-run-kmp.html
---

# Build and run a Kotlin Multiplatform application

Kotlin Multiplatform (KMP) uses Gradle as its build system. The KMP IDE plugin for IntelliJ IDEA and Android Studio creates tailored run configurations and handles Compose Hot Reload integration.

## Signature / Usage

Compatibility mode for web targets cross-compiles the `js` and `wasmJs` targets, so modern browsers use the Wasm version and older ones fall back to JS. Run from the root project directory:

```bash
./gradlew composeCompatibilityBrowserDistribution
```

Artifacts are generated in the web application module directory, for example `webApp/build/dist/composeWebCompatibility/productionExecutable`.

## Options / Props

Default run configurations provided by the KMP IDE plugin:

| Run configuration | Target | Behavior |
|-------------------|--------|----------|
| androidApp | Android | Runs on an available Android Virtual Device or a connected real device |
| iosApp | iOS | Runs on an iOS simulator from the Device Hub, or a real device (requires a Team ID) |
| desktopApp [hot] | Desktop (JVM) | Runs on the system JVM, with Compose Hot Reload running by default |
| webApp[js] | Web (Kotlin/JS) | Runs in the default browser, by default at `http://localhost:8080/` |
| webApp[wasmJs] | Web (Kotlin/Wasm) | Runs in the default browser, by default at `http://localhost:8080/` |

## Notes

- To build KMP apps you only need Gradle and Java. Running on Apple targets requires a macOS machine with Xcode.
- The IDE run configurations only trigger builds for the corresponding target. The default Gradle build task always builds debug and release versions of all targets.
- Android: create virtual devices in the Android Device Manager (IntelliJ IDEA: View | Tool Window | Device Manager). A device created in Android Studio is available system-wide, including run configurations in IntelliJ IDEA.
- iOS simulator: launch Xcode once and check Xcode | Settings | Components so at least one iOS simulator is installed.
- Real iOS device: set the Team ID in Xcode (iosApp target, Signing & Capabilities tab, Team list; the Bundle Identifier must be unique and a Signing Certificate assigned). Then set or change the team in the iosApp run configuration, Options tab, Development team dropdown. Enable developer mode on the iPhone in Settings | Privacy & Security and pair it via Xcode Window | Devices and Simulators if not registered yet.
- Web: if port 8080 is unavailable, the build uses another one; search the Gradle console for `Project is running at`.
- Compatibility mode needs at least Java 11 as the Gradle JVM; at least Java 17 is recommended for Compose Multiplatform projects in general. The task is found in the Gradle tool window under ComposeDemo | Tasks | compose.
- Recommended IDEs: IntelliJ IDEA provides full KMP support and Android Studio is another stable solution. Starting with IntelliJ IDEA 2025.2.2 or Android Studio Otter 2025.2.1 you can install the Kotlin Multiplatform IDE plugin (basic launching and debugging of iOS apps, preflight environment checks, multiplatform resources automation, `@Preview` support in common Compose code, Compose Hot Reload integration). Any IDE that supports Kotlin works for basic KMP support.
- Xcode is required to write iOS-specific code and run iOS apps. To upload apps to App Store Connect, build them with Xcode 16 or later.
- The Gradle run configurations here are the multiplatform-specific entry points; Android Gradle Plugin configuration itself belongs to android-build-gradle.

## Related

- [Compose Hot Reload](./compose-hot-reload.md)
- [Kotlin Toolchain](./kotlin-toolchain.md)
- [GitHub Actions](./github-actions.md)
