---
source: https://reactnative.dev/docs/0.87/build-speed
---

# Speeding up your Build phase

Advanced suggestions to reduce native build time: single ABI builds, Gradle configuration caching, Maven mirrors, and compiler caches (ccache / sccache).

## Signature / Usage

```shell
$ yarn react-native run-android --active-arch-only

$ ./gradlew :app:assembleDebug -PreactNativeArchitectures=x86,x86_64
```

`gradle.properties`:

```properties
# Use this property to specify which architecture you want to build.
# You can also override it from the CLI using
# ./gradlew <task> -PreactNativeArchitectures=x86_64
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
```

## Options / Props

| Name | Where | Description |
| --- | --- | --- |
| `--active-arch-only` | `run-android` flag | Picks the ABI of the running emulator or plugged-in phone (console shows `info Detected architectures arm64-v8a`). |
| `reactNativeArchitectures` | Gradle property (`-P` or `gradle.properties`) | ABIs to build. Default builds `armeabi-v7a`, `arm64-v8a`, `x86`, `x86_64`. |
| `org.gradle.configuration-cache=true` | `android/gradle.properties` | Enables Gradle Configuration Caching (skips the Configuration phase on later builds). |
| `exclusiveEnterpriseRepository` | `android/gradle.properties` | Maven repository used exclusively to fetch all dependencies. |
| `:ccache_enabled => true` | `ios/Podfile` (`react_native_post_install`) | Enables ccache support for Xcode builds. |

## Notes

- Building one ABI should reduce native build time by about 75%. Remove the flags for release builds so the apk / app bundle works for all ABIs.
- Gradle Configuration Caching is available since React Native 0.79.
- Maven mirror example: `exclusiveEnterpriseRepository=https://my.internal.proxy.net/` in `android/gradle.properties`.
- ccache (local, Android and iOS): install with `brew install ccache` on macOS; check with `ccache -s`, reset stats with `ccache --zero-stats`, wipe with `ccache --clear`. For iOS uncomment the `ccache_enabled` line in `ios/Podfile`.
- On CI: do a full clean build to avoid poisoned caches; ccache relies on timestamps, so use the `compiler_check content` option. The cache folder on macOS is `/Users/$USER/Library/Caches/ccache`.
- Distributed caches: sccache is recommended (see its distributed compilation quickstart).
- Gradle / Android build details belong to android-build-gradle; this page covers React Native-specific properties only.

## Related

- [Performance Overview](./performance.md)
