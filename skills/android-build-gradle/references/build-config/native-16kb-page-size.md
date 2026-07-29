# 16 KB page size support for native libraries

Since November 1, 2025, Google Play requires new apps and updates targeting Android 15+ to support 16 KB memory page sizes on 64-bit devices. Native (`.so`) libraries must have 16 KB-aligned ELF `LOAD` segments, configured through AGP/Gradle settings and NDK linker flags.

## Signature / Usage

```cmake
# CMakeLists.txt — required on NDK r27 and lower (NDK r28+ aligns by default)
target_link_options(${CMAKE_PROJECT_NAME} PRIVATE
    "-Wl,-z,max-page-size=16384"
    "-Wl,-z,common-page-size=16384"
)
```

The `ndk-build` equivalent (`Android.mk`) is `LOCAL_LDFLAGS += -Wl,-z,max-page-size=16384 -Wl,-z,common-page-size=16384`.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| AGP version | — | — | `8.5.1`+: apps are 16 KB aligned automatically with uncompressed shared libraries. `8.3`–`8.5`: aligned by default, but `bundletool` does not zipalign APKs generated from an App Bundle, so installs from Play can still fail. `8.0` and lower: requires manual configuration below. |
| `android.bundle.enableUncompressedNativeLibs` (`gradle.properties`) | `Boolean` | `true` | AGP ≤ 8.0 only: set to `false` to disable uncompressed native libraries in App Bundles as part of the manual 16 KB workaround. |
| `packaging.jniLibs.useLegacyPackaging` (see packaging.md) | `Boolean?` | `null` | If `null` (unset), `.so` files are uncompressed and page-aligned when `minSdk >= 23` — the behavior this page relies on. Alternative workaround when AGP can't be upgraded past 8.5.1: explicitly set to `true` (Gradle compresses shared libraries at packaging time) to avoid install failures from unaligned uncompressed libraries. |
| linker flags `-Wl,-z,max-page-size=16384` / `-Wl,-z,common-page-size=16384` | linker flags | — | Passed via `target_link_options` (CMake) or `LOCAL_LDFLAGS` (`ndk-build`); required for NDK r27 and lower to emit 16 KB-aligned ELF `LOAD` segments. NDK r28+ aligns by default and needs no flags. |

## Notes

- Detect misaligned prebuilt libraries via Android Studio **Build > Analyze APK...** (check the `lib` folder's Alignment column) or `llvm-objdump -p <lib>.so | grep LOAD` — look for `align 2**14` or higher; `2**13`/`2**12` indicate misalignment.
- Verify a built APK with `zipalign -v -c -P 16 4 <apk>` (expect `Verification successful`); verify an `.aab` with `bundletool dump config --bundle=<aab> | grep alignment` (`PAGE_ALIGNMENT_16K` is correct, `PAGE_ALIGNMENT_4K` needs updating).
- Remove hard-coded page-size assumptions from native code: use `getpagesize()` or `sysconf(_SC_PAGESIZE)` instead of a literal `4096`; the `PAGE_SIZE` macro is undefined once 16 KB mode is enabled on NDK r27+.
- Test on a 16 KB environment: an emulator system image ("...16 KB Page Size ARM 64 v8a"), or the "Boot with 16KB page size" developer option on supported Pixel devices (Android 15 QPR1+).
- Devices with a 16 KB kernel offer a compatibility mode for unaligned/4 KB-aligned apps (`adb shell setprop bionic.linker.16kb.app_compat.enabled true`), and apps can opt out via `android:pageSizeCompat="disabled"` in the manifest.

## Related

- [packaging](./packaging.md)
- [Custom C/C++ build system integration (externalNativeBuild, ndk {} block)](./native-build-cmake.md)
