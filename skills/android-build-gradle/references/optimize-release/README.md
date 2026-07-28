# optimize-release

| Name | Description | Path |
|------|-------------|------|
| shrink-code | R8 code shrinking, optimization, and obfuscation via `isMinifyEnabled` / `optimization { }`. | [shrink-code.md](./shrink-code.md) |
| proguard-rules | ProGuard/R8 keep rules file and directives (`-keep`, `-keepclassmembers`, `-dontwarn`, `-keepattributes`, `consumerProguardFiles`). | [proguard-rules.md](./proguard-rules.md) |
| r8-troubleshooting | Recovering from R8-caused crashes; `mapping.txt` and the `retrace` CLI tool. | [r8-troubleshooting.md](./r8-troubleshooting.md) |
| shrink-resources | Resource shrinking via `isShrinkResources` and optimized resource shrinking. | [shrink-resources.md](./shrink-resources.md) |
| app-bundle | Android App Bundle (`.aab`) format and Play Feature Delivery overview. | [app-bundle.md](./app-bundle.md) |
| bundle-config | `bundle { }` block controlling per-device configuration APK splits (language/density/abi). | [bundle-config.md](./bundle-config.md) |
| apk-splits | `splits { }` block for locally-built multi-APK output by ABI/density. | [apk-splits.md](./apk-splits.md) |
| app-signing | Keystore creation, `signingConfig` assignment, and Google Play App Signing. | [app-signing.md](./app-signing.md) |
| debuggable-obfuscation | Combining `isDebuggable` with `isMinifyEnabled` to test obfuscation without losing debuggability. | [debuggable-obfuscation.md](./debuggable-obfuscation.md) |
| baseline-profiles | Baseline Profile Gradle plugin, `baselineProfile { }` DSL, and profile generation. | [baseline-profiles.md](./baseline-profiles.md) |
| build-variant-optimization | Applying optimization settings per build variant (buildTypes × productFlavors). | [build-variant-optimization.md](./build-variant-optimization.md) |
| release-checklist | `versionCode` / `versionName` management and pre-release cleanup checklist. | [release-checklist.md](./release-checklist.md) |
