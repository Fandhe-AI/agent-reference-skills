# Build Your App from the Command Line

Run Android build tasks with the Gradle wrapper: build/install debug APKs, build app bundles (Gradle or `bundletool`), and sign from the command line.

## Signature / Usage

```bash
# Windows Command Shell
gradlew task-name

# Mac, Linux, or Windows PowerShell
./gradlew task-name

# List all available build tasks
gradlew tasks

# Build a debug APK (output: project_name/module_name/build/outputs/apk/module_name-debug.apk)
gradlew assembleDebug

# Build and install on a running emulator or connected device
gradlew installDebug

# Build an app bundle for the base module's debug variant
./gradlew :base:bundleDebug
```

## Options / Props

| Flag | Description |
|------|-------------|
| `--modules=path-to-base.zip, path-to-module2.zip,...` | List of module ZIP files used to build the app bundle. |
| `--output=path-to-output.aab` | Path and filename of the output `*.aab`. |
| `--config=path-to-BundleConfig.json` | Optional configuration file to customize the build (downstream APK generation). |
| `--metadata-file=target-bundle-path:local-file-path` | Packages an optional metadata file (e.g. ProGuard mappings, list of DEX files) inside the bundle at a path relative to the bundle root. |

Module ZIP layout (e.g. `base.zip`):

| File or directory | Description |
|-------------------|-------------|
| `manifest/AndroidManifest.xml` | The module's manifest in protobuf format. |
| `dex/...` | Compiled DEX files named `classes.dex`, `classes2.dex`, `classes3.dex`, etc. |
| `res/...` | Module resources in protobuf format for all device configurations. |
| `root/...`, `assets/...`, `lib/...` | Identical to the Android app bundle format. |
| `resources.pb` | App resource table in protobuf format. |

## Notes

- The wrapper is `gradlew.bat` (Windows) / `gradlew` (Linux, Mac), at the root of each project created with Android Studio (the source page calls the latter `gradlew.sh`).
- **Build types**: every app has `debug` and `release`. Output must be signed before deployment. Debug is auto-signed with an SDK-provided debug key (insecure; cannot publish to Google Play); release must be signed with your own private key. A custom build type can be debug-signed by assigning `signingConfig = signingConfigs.getByName("debug")` (or `initWith(getByName("debug"))`); `isDebuggable = true` only marks the app debuggable and does not assign a signing config. The source page says including `debuggable true` makes it signed as a debug build.
- **Task names**: "Debug" in `assembleDebug` / `installDebug` is the camel-case build variant name; e.g. with a `demo` flavor use `assembleDemoDebug`. Run `tasks` to see all build/install/uninstall tasks per variant. The debug APK is signed with the debug key and aligned with `zipalign`.
- **Emulator**: create an AVD in Android Studio, start it with `emulator -avd avd_name` (`emulator -list-avds` lists names), then install via a Gradle install task or `adb install path/to/your_app.apk`. For an APK built with a developer preview SDK (`targetSdkVersion` is a letter), add `-t` to `install`.
- **Physical device**: enable USB debugging (Settings > Developer options; on Android 4.2+ tap Build number seven times in About phone to reveal it), then `adb -d install path/to/your_app.apk`.
- **App bundles** include all compiled code and resources but defer APK generation and signing to Google Play; they can't be deployed directly to a device. Android Studio or Gradle is the usual way to build one; `bundletool` is for custom toolchains.
- Sign a bundle separately with `jarsigner -keystore pathToKeystore app-release.aab keyAlias`. `apksigner` cannot sign an app bundle.
- **AAPT2 for bundletool**: use the latest AAPT2 from Google Maven (`com.android.tools.build > aapt2`), not the one in the Android build tools package (it does not support `bundletool`). Compile with `aapt2 compile ... -o compiled_resources/`; link with `aapt2 link --proto-format -o output.apk -I android_sdk/platforms/android_version/android.jar --manifest .../AndroidManifest.xml -R compiled_resources/*.flat --auto-add-overlay`. `-R @compiled_resources.txt` can reference a text file listing compiled resource paths.
- Build the bundle: `bundletool build-bundle --modules=base.zip --output=mybundle.aab`.
- `BundleConfig.json` example, disabling language config APKs:

```json
{
  "optimizations": {
    "splitsConfig": {
      "splitDimension": [{
        "value": "LANGUAGE",
        "negate": true
      }]
    }
  }
}
```

- By default `bundletool` does not compress native libraries (Android 6.0+) and the resource table (`resources.arsc`). Uncompressed file types can be set with `"compression": {"uncompressedGlob": ["res/raw/**", "assets/**.uncompressed"]}`.
- **Manual signing**: generate a key with `keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias`. For an APK: `zipalign -v -p 4 my-app-unsigned.apk my-app-unsigned-aligned.apk`, then `apksigner sign --ks my-release-key.jks --out my-app-release.apk my-app-unsigned-aligned.apk`, then verify with `apksigner verify my-app-release.apk`. `apksigner` requires Android SDK Build Tools revision 24.0.3 or higher.
- **Gradle signing**: define `signingConfigs` with `storeFile`, `storePassword`, `keyAlias`, `keyPassword` and assign it to the build type's `signingConfig`:

```kotlin
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        create("release") {
            storeFile = file("my-release-key.jks")
            storePassword = "password"
            keyAlias = "my-alias"
            keyPassword = "password"
        }
    }
    buildTypes {
        getByName("release") {
            signingConfig = signingConfigs.getByName("release")
            ...
        }
    }
}
```

- Passwords in the build file are visible in plain text; for improved security remove signing information from the build file (the official page's own caveat). With a release signing config, `installRelease` builds, aligns, signs, and installs the release APK.
- Source: https://developer.android.com/build/building-cmdline (local copy fetched 2026-10).

## Related

- [Gradle Build Overview](./gradle-build-overview.md)
- [Android Build Structure](./android-build-structure.md)
- [signingConfigs](../build-config/signing-configs.md)
- [build types](../build-config/build-types.md)
