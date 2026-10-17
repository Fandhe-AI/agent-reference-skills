---
source: https://reactnative.dev/docs/0.87/signed-apk-android
---

# Publishing to Google Play Store

Android requires that all apps be digitally signed with a certificate before they can be installed. To distribute via Google Play it must be signed with a release key used for all future updates; with App Signing by Google Play, the binary uploaded must be signed with an upload key.

## Signature / Usage

Generate an upload key with `keytool`.

**Windows** (run from a writable directory such as the project's `android\app`, without administrator rights; call the JDK's `keytool` by full path):

```shell
"C:\Program Files\Java\jdkx.x.x_x\bin\keytool.exe" -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

This command prompts you for passwords for the keystore and key and for the Distinguished Name fields for your key. It then generates the keystore as a file called `my-upload-key.keystore`. The keystore contains a single key, valid for 10000 days. The alias is a name that you will use later when signing your app, so remember to take note of the alias.

**macOS** (find the JDK bin folder first):

```shell
/usr/libexec/java_home
```

It will output the directory of the JDK, which will look something like this:

```shell
/Library/Java/JavaVirtualMachines/jdkX.X.X_XXX.jdk/Contents/Home
```

Run the keytool command from a directory you can write to (for example the project's `android/app` directory), without sudo, using the JDK found above:

```shell
"$(/usr/libexec/java_home)/bin/keytool" -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### Setting up Gradle variables

1. Place the `my-upload-key.keystore` file under the `android/app` directory in your project folder.
2. Edit the file `~/.gradle/gradle.properties` or `android/gradle.properties`, and add the following (replace `*****` with the correct keystore password, alias and key password):

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

These are going to be global Gradle variables, which we can later use in our Gradle config to sign our app.

### Adding signing config to your app's Gradle config

Edit the file `android/app/build.gradle` in your project folder, and add the signing config:

```groovy
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

### Generating the release AAB

```shell
npx react-native build-android --mode=release
```

This command uses Gradle's `bundleRelease` under the hood that bundles all the JavaScript needed to run your app into the AAB (Android App Bundle). If you need to change the way the JavaScript bundle and/or drawable resources are bundled (e.g. if you changed the default file/folder names or the general structure of the project), have a look at `android/app/build.gradle` to see how you can update it to reflect these changes.

The generated AAB can be found under `android/app/build/outputs/bundle/release/app-release.aab`, and is ready to be uploaded to Google Play.

In order for Google Play to accept AAB format the App Signing by Google Play needs to be configured for your application on the Google Play Console.

### Testing the release build of your app

Before uploading the release build to the Play Store, uninstall any previous version of the app, then install the release build on the device from the project root.

**npm**

```shell
npm run android -- --mode="release"
```

**Yarn**

```shell
yarn android --mode release
```

Note that `--mode release` is only available if you've set up signing as described above. You can terminate any running bundler instances, since all your framework and JavaScript code is bundled in the APK's assets.

### Publishing to other stores

By default, the generated APK has the native code for `x86`, `x86_64`, `ARMv7a` and `ARM64-v8a` CPU architectures. This makes it easier to share APKs that run on almost all Android devices, with the downside of unused native code on any device and unnecessarily bigger APKs. You can create an APK for each CPU by adding the following to `android/app/build.gradle`:

```diff
android {

    splits {
        abi {
            reset()
            enable true
            universalApk false
            include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
        }
    }

}
```

Upload these files to markets which support device targeting, such as Amazon AppStore or F-Droid, and the users will automatically get the appropriate APK. For markets such as APKFiles which do not support multiple APKs for a single app, change the `universalApk false` line to `true` to create the default universal APK. You will also have to configure distinct version codes, as suggested in the official Android documentation on APK splits.

### Enabling Proguard to reduce the size of the APK (optional)

Proguard is a tool that can slightly reduce the size of the APK by stripping parts of the React Native Java bytecode (and its dependencies) that your app is not using. To enable it, edit `android/app/build.gradle`:

```groovy
/**
 * Run Proguard to shrink the Java bytecode in release builds.
 */
def enableProguardInReleaseBuilds = true
```

### Migrating old Android React Native apps to use App Signing by Google Play

If you are migrating from a previous version of React Native chances are your app does not use App Signing by Google Play. It is recommended in order to take advantage of things like automatic app splitting. Start by generating a new upload key, then replace the release signing config in `android/app/build.gradle` to use the upload key instead of the release one. Once that's done, follow the Google Play Help instructions to send your original release key to Google Play.

## Notes

- Corrected: the official page runs keytool as administrator from the JDK bin folder on Windows and with sudo on macOS; neither is required, and both write a privileged/root-owned keystore.
- Deviation: instead of cd-ing into the JDK folder, keytool is invoked via "$(/usr/libexec/java_home)/bin/keytool" (macOS) or its full path (Windows) from android/app.
- Keep the keystore file private. If the upload key is lost or compromised, follow the Google Play reset instructions linked in the official page.
- Saving the Gradle variables in `~/.gradle/gradle.properties` instead of `android/gradle.properties` prevents them from being checked in to git. You may have to create `~/.gradle/gradle.properties` in your user's home directory first.
- On macOS, the official page suggests storing the credentials in the Keychain Access app (linking a third-party guide) so the two password rows in `~/.gradle/gradle.properties` can be skipped; this only works if `signingConfigs` is also changed to read the passwords from the Keychain as described in that guide. With the `signingConfigs` shown above, `MYAPP_UPLOAD_STORE_PASSWORD` / `MYAPP_UPLOAD_KEY_PASSWORD` must stay defined or release signing fails.
- Make sure `gradle.properties` does not include `org.gradle.configureondemand=true` as that will make the release build skip bundling JS and assets into the app binary.
- Test thoroughly if Proguard is enabled: it often requires configuration specific to each native library you use. See `app/proguard-rules.pro`.
- Default permissions: `INTERNET` is added to your Android app by default. `SYSTEM_ALERT_WINDOW` is added to the APK in debug mode but removed in production.
- If you use Expo, the official page points to the Expo "Deploying to App Stores" guide; see the expo documentation for that flow (Expo skill may not be installed).
- Signing, Gradle and AAB mechanics are the Android Gradle build; see the android-build-gradle skill for general Android build configuration. This page is the React Native specific packaging flow.

## Related

- [React Native Gradle Plugin](./react-native-gradle-plugin.md)
- [Publishing to Apple App Store](./publishing-to-app-store.md)
