---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-direct-integration.html
---

# Direct integration

A local integration method: a script in the Xcode run script phase calls the `embedAndSignAppleFrameworkForXcode` Gradle task so the Kotlin framework is built and embedded before the iOS app build.

## Signature / Usage

Run script phase (Build Phases | + | New Run Script Phase):

```bash
if [ "YES" = "$OVERRIDE_KOTLIN_BUILD_IDE_SUPPORTED" ]; then
    echo "Skipping Gradle build task invocation due to OVERRIDE_KOTLIN_BUILD_IDE_SUPPORTED environment variable set to \"YES\""
    exit 0
fi
cd "<Path to the root of the multiplatform project>"
./gradlew :<Shared module name>:embedAndSignAppleFrameworkForXcode
```

Migrating from the CocoaPods plugin first:

```none
pod deintegrate
```

## Options / Props

| Item | Description |
|------|-------------|
| `cd` path | Path to the root of the KMP project, for example `$SRCROOT/..` |
| `./gradlew :<module>:...` | Name of the shared module, for example `:shared` or `:sharedUI` |
| `OVERRIDE_KOTLIN_BUILD_IDE_SUPPORTED` | Set to "YES" by IntelliJ IDEA / Android Studio when an iOS run configuration builds the framework first; the script uses it to avoid a second build from Xcode |
| `KOTLIN_FRAMEWORK_BUILD_TYPE` | For a custom build configuration other than `Debug` / `Release`, add under Build Settings, User-Defined, and set to `Debug` or `Release` |

## Notes

- Fits when the KMP project already targets iOS locally and has no CocoaPods dependencies. The CocoaPods approach cannot be combined with `embedAndSignAppleFrameworkForXcode`.
- The script copies the compiled Kotlin framework into the iOS project structure, handles code signing of the embedded framework, and reflects Kotlin changes in the Xcode app.
- The `embedAndSignAppleFrameworkForXcode` task registers only if `binaries.framework` is declared on the iOS target in `build.gradle.kts`.
- Migrating from CocoaPods: clean build folder (Product | Clean Build Folder, Cmd + Shift + K), run `pod deintegrate` in the Podfile directory, remove the `cocoapods {}` block from `build.gradle(.kts)`, delete the `.podspec` and Podfile.
- Xcode setup steps: disable **Based on dependency analysis**; move the Run Script phase before **Compile Sources**; on Build Settings disable **User Script Sandboxing** under Build Options (stop a possibly sandboxed Gradle daemon with `./gradlew --stop`).
- When launching an iOS run configuration in a project without the guard, the IDE suggests a fix to set up the build guard.
- The Kotlin Multiplatform IDE plugin applies direct integration by default.
- Distinct from apple-swift / apple-distribution: this is the Xcode build-phase wiring for a Kotlin framework, not Swift or App Store guidance.

## Related

- [iOS integration methods](./integration-overview.md)
- [Using Kotlin from local Swift packages](./spm-local-integration.md)
- [CocoaPods overview and setup](./cocoapods-overview.md)
