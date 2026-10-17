---
source: https://docs.flutter.dev/deployment/android
---

# Build and release an Android app

How to prepare for and release an Android app to the Play store. Throughout, `[project]` refers to the directory that contains your application.

## Signature / Usage

```console
cd [project]
flutter build appbundle
flutter build apk --split-per-abi
flutter install
```

`flutter build` defaults to a release build. The release bundle is created at `[project]/build/app/outputs/bundle/release/app.aab`.

### Add a launcher icon

Customize with the `flutter_launcher_icons` package, or manually: place icon files in `[project]/android/app/src/main/res/` folders named with configuration qualifiers (the default `mipmap-` folders show the convention), then update `AndroidManifest.xml`: `<application android:icon="@mipmap/ic_launcher" ...`.

### Enable Material Components

If your app uses platform views, enable Android Material Components. In `<my-app>/android/app/build.gradle.kts`:

```kotlin
dependencies {
    // ...
    implementation("com.google.android.material:material:<version>")
    // ...
}
```

```groovy
dependencies {
    // ...
    implementation 'com.google.android.material:material:<version>'
    // ...
}
```

Light theme in `<my-app>/android/app/src/main/res/values/styles.xml`, dark theme in `values-night/styles.xml`:

```xml
- <style name="NormalTheme" parent="@android:style/Theme.Light.NoTitleBar">
+ <style name="NormalTheme" parent="Theme.MaterialComponents.Light.NoActionBar">
```

```xml
- <style name="NormalTheme" parent="@android:style/Theme.Black.NoTitleBar">
+ <style name="NormalTheme" parent="Theme.MaterialComponents.DayNight.NoActionBar">
```

### Sign the app

Android uses two signing keys: _upload_ and _app signing_. Developers upload an `.aab` or `.apk` signed with an upload key; end-users download the `.apk` signed with an app signing key (use Play App Signing).

Create an upload keystore (macOS/Linux; keep the keystore file private):

```console
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA \
        -storetype JKS -keysize 2048 -validity 10000 -alias upload
```

Windows (PowerShell):

```ps
keytool -genkey -v -keystore $env:USERPROFILE\upload-keystore.jks `
        -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 `
        -alias upload
```

Reference the keystore from `[project]/android/key.properties` (placeholders in angle brackets):

```properties
storePassword=<password-from-previous-step>
keyPassword=<password-from-previous-step>
keyAlias=upload
storeFile=<keystore-file-location>
```

Configure signing in `[project]/android/app/build.gradle.kts` (Kotlin):

```kotlin
import java.util.Properties
import java.io.FileInputStream

plugins {
   ...
}

val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("key.properties")
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(FileInputStream(keystorePropertiesFile))
}

android {
    // ...

    signingConfigs {
        create("release") {
            keyAlias = keystoreProperties.getProperty("keyAlias")
            keyPassword = keystoreProperties.getProperty("keyPassword")
            storeFile = keystoreProperties.getProperty("storeFile")?.let { file(it) }
            storePassword = keystoreProperties.getProperty("storePassword")
        }
    }
    buildTypes {
        release {
            signingConfig = signingConfigs.getByName("release")
        }
    }
}
```

Groovy (`build.gradle`):

```groovy
import java.util.Properties
import java.io.FileInputStream

def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        release {
            keyAlias = keystoreProperties['keyAlias']
            keyPassword = keystoreProperties['keyPassword']
            storeFile = keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword = keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig = signingConfigs.release
        }
    }
}
```

#### Post-quantum cryptography (PQC) hybrid signing (Android 17+)

Android 17 introduces the v3.2 APK Signature Scheme, combining classical signatures (RSA or EC) with ML-DSA signatures. Apps using Play App Signing can wait for Google Play to offer an upgrade to a hybrid signature. Apps using self-managed keys can use updated Android build tools (such as `apksigner`) to rotate to a hybrid identity, combining a PQC key with a new classical key (a new classical key must be created; the older one cannot be reused).

### Shrink your code with R8

R8 is enabled by default when you build a release APK or AAB. To disable R8, pass `--no-shrink` to `flutter build apk` or `flutter build appbundle`.

### Enable multidex support

Android's dex limit is 64k methods when targeting a minimum API of 20 or below. The Flutter tool detects multidex build errors and asks before changing your Android project; opting in makes Flutter depend on `androidx.multidex:multidex` and use a generated `FlutterMultiDexApplication`. From the command line run `flutter run --debug`, select an Android device, and enter `y` when prompted. For manual support, a multidex keep file must include:

```plaintext
io/flutter/embedding/engine/loader/FlutterLoader.class
io/flutter/util/PathUtils.class
```

Also include any other classes used in app startup.

### Review the app manifest

`[project]/android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:label="[project]"
        ...
    </application>
    ...
    <uses-permission android:name="android.permission.INTERNET"/>
</manifest>
```

| Tag | Value |
|-----|-------|
| `application` | Edit `android:label` to reflect the final name of the app. |
| `uses-permission` | Add `android.permission.INTERNET` if your app needs Internet access. The standard template doesn't include this tag but allows Internet access during development for Flutter tools to communicate with a running app. |

### Review the Gradle build configuration

`[project]/android/app/build.gradle.kts`:

```kotlin
android {
    namespace = "com.example.[project]"
    // Any value starting with "flutter." gets its value from
    // the Flutter Gradle plugin.
    // To change from these defaults, make your changes in this file.
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    ...

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "com.example.[project]"
        // You can update the following values to match your application needs.
        // For details, see https://flutter.dev/to/review-gradle-config.
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }
}
```

| Property | Description |
|----------|-------------|
| `applicationId` | Unique identifier on Google Play and devices (reverse domain name). Cannot be changed after upload to the Play Store. If you change `applicationId` and `namespace`, update the `package` statement in `MainActivity.kt`/`.java` and move the file to the matching directory (for example `android/app/src/main/kotlin/com/example/myapp/MainActivity.kt`). |
| `compileSdk` | Android SDK version used to compile the app. |
| `minSdk` | Minimum Android version the app supports. |
| `targetSdk` | Android version the app is designed and tested to run on. |
| `versionCode` / `versionName` | Automatically set from `pubspec.yaml` (`version: 1.0.0+1`). |

### Build formats

App bundle (preferred) or APK. By default the app bundle contains Dart code and the Flutter runtime compiled for armeabi-v7a (ARM 32-bit), arm64-v8a (ARM 64-bit) and x86-64. `flutter build apk --split-per-abi` produces:

- `[project]/build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk`
- `[project]/build/app/outputs/flutter-apk/app-arm64-v8a-release.apk`
- `[project]/build/app/outputs/flutter-apk/app-x86_64-release.apk`

Without `--split-per-abi` you get a fat APK containing all target ABIs. With split APKs the framework adds `ABI_VERSION * 1000` to the version code; to force the default version code specify `-P force-version-code-ignoring-abi=true`.

Test an app bundle offline with `bundletool` (generate a set of APKs, deploy them to connected devices), or online by uploading to Google Play (internal test track, alpha or beta channels).

### Update the app's version number

```yaml
version: 1.0.0+1
```

Three dot-separated numbers followed by an optional build number after `+`. Override with `--build-name` (Android `versionName`) and `--build-number` (Android `versionCode`).

### Android release FAQ

- Prefer app bundles over APKs on the Play Store; APK may be the only option for other distribution.
- Build a release from Android Studio: open the existing `android/` folder, select **build.gradle (Module: app)**, then **Build > Select Build Variant**; outputs land in `build/app/outputs`.
- Detect a Flutter APK: list files and look for `/lib/<ARCH>/libflutter.so`:

```sh
apkanalyzer files list some-flutter-app.apk | grep flutter.so | wc -l
```

Secondary check: `apkanalyzer manifest print some-flutter-app.apk | grep flutterEmbedding -C 2` shows `android:name="flutterEmbedding"` with value `1` or `2` (not recommended; Flutter 3.22 removed the ability of v1 embedder apps to build).

## Notes

- Keep the keystore file and `key.properties` private; don't check them into public source control. The Windows path to `keystore.jks` must be specified with double backslashes (`\\`).
- `keytool` is part of Java installed with Android Studio; run `flutter doctor -v` and locate the path after 'Java binary at:'. `-storetype JKS` is only required for Java 9 or newer (the default keystore type became PKS12 as of Java 9).
- You might need to run `flutter clean` after changing the Gradle file so cached builds don't affect signing.
- The `--[no-]shrink` flag has no effect; code shrinking is always enabled in release builds. Obfuscation and minification can considerably extend compile time.
- Multidex support is natively included when targeting Android SDK 21 or later.
- Migration (Flutter 3.44): to use Android Gradle Plugin 9 and later, apps that use the `kotlin-android` plugin (Kotlin Gradle Plugin) must migrate to built-in Kotlin; Flutter 3.44 added temporary legacy support with `android.builtInKotlin=false` and Flutter 3.47 added support for `android.builtInKotlin=true`. See the built-in Kotlin migration guide for app developers.
- This page is the Flutter build/release procedure; Gradle build scripts and Play Store publishing are covered by android-build-gradle and related android-* skills.

## Related

- [Obfuscate Dart code](./obfuscate.md)
- [Set up Flutter flavors for Android](./flavors.md)
- [Continuous delivery with Flutter](./continuous-delivery.md)
