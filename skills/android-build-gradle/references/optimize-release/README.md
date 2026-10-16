# optimize-release

| Name | Description | Path |
|------|-------------|------|
| APK Splits (`splits { }`) | Configures Gradle to build multiple per-ABI (or per-density) APKs, each containing only the resources for that configuration; superseded by the App Bundle for Play Store distribution. | [apk-splits.md](./apk-splits.md) |
| Android App Bundle | The Android App Bundle (`.aab`) is Google Play's publishing format: Play generates optimized APKs per device from it. | [app-bundle.md](./app-bundle.md) |
| App Signing | Every release APK/AAB must be digitally signed; covers generating an upload keystore, wiring a `signingConfig` to a release variant, and Google Play App Signing. | [app-signing.md](./app-signing.md) |
| Baseline Profiles | Baseline Profiles enable Profile Guided Optimization (PGO): ART ahead-of-time-compiles specified startup and navigation code paths at install time. | [baseline-profiles.md](./baseline-profiles.md) |
| Build Variant-Specific Optimization | R8 shrinking/obfuscation settings (`isMinifyEnabled`, `isShrinkResources`, `proguardFiles`) are declared per build type, so each variant can carry different optimization levels. | [build-variant-optimization.md](./build-variant-optimization.md) |
| App Bundle Configuration APKs (`bundle { }`) | Configures which device-configuration split APKs Google Play generates from the App Bundle (by language, screen density, and ABI). | [bundle-config.md](./bundle-config.md) |
| Debuggable Builds with Obfuscation | Guidance for keeping a build debuggable while still exercising R8 obfuscation, for QA-testing release-like shrinking behavior before shipping. | [debuggable-obfuscation.md](./debuggable-obfuscation.md) |
| Dynamic Feature Modules | Gradle-side configuration for Play Feature Delivery: the `com.android.dynamic-feature` plugin, `android.dynamicFeatures` registration, and delivery modes via manifest attributes. | [dynamic-feature-modules.md](./dynamic-feature-modules.md) |
| Native Debug Symbols | Controls how much native (C/C++/NDK) debug information is kept in a release build via `ndk.debugSymbolLevel`, so Android vitals can symbolicate native crashes. | [native-debug-symbols.md](./native-debug-symbols.md) |
| ProGuard/R8 Keep Rules | `proguard-rules.pro` (or `.keep` files under `keepRules/` on AGP 9.3+) declares which classes and members R8 must not remove, rename, or optimize away. | [proguard-rules.md](./proguard-rules.md) |
| R8 Execution Profiles | The settings plugin lets you create execution profiles for R8, so R8 does not slow down the build; profiles can run R8 in a separate JVM with custom heap settings. | [r8-execution-profiles.md](./r8-execution-profiles.md) |
| R8 Troubleshooting | Common failure modes when enabling R8 (crashes from removed or renamed reflection and serialization members) and how to retrace obfuscated stack traces via `mapping.txt`. | [r8-troubleshooting.md](./r8-troubleshooting.md) |
| Release Checklist | Steps to prepare an Android app module for a production release build: versioning, disabling debug artifacts, enabling shrinking, and cleaning up before signing. | [release-checklist.md](./release-checklist.md) |
| R8 Code Shrinking | R8 is Android's app optimizer: it removes unused code (tree shaking), applies logical optimizations such as inlining and class merging, and obfuscates names for release builds. | [shrink-code.md](./shrink-code.md) |
| Resource Shrinking | Removes resources (drawables, layouts, strings, etc.) that are unreferenced by the app's compiled code and manifest, reducing APK/AAB size; requires code shrinking. | [shrink-resources.md](./shrink-resources.md) |
