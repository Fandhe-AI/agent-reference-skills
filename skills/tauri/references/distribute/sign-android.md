---
source: https://v2.tauri.app/distribute/sign/android/
---

# Android Code Signing

To publish on the Play Store, sign your app with a digital certificate. Android App Bundles and APKs must be signed before being uploaded for distribution.

## Signature / Usage

Create a Java Keystore with `keytool`:

```sh
# macOS / Linux
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
# Windows
keytool -genkey -v -keystore $env:USERPROFILE\upload-keystore.jks -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

Create `[project]/src-tauri/gen/android/keystore.properties`:

```
password=<password defined when keytool was executed>
keyAlias=upload
storeFile=<location of the key store file, such as /Users/<user name>/upload-keystore.jks or C:\\Users\\<user name>\\upload-keystore.jks>
```

Configure Gradle in `[project]/src-tauri/gen/android/app/build.gradle.kts`:

```kotlin
import java.io.FileInputStream
import java.io.InputStreamReader

signingConfigs {
    create("release") {
        val keystorePropertiesFile = rootProject.file("keystore.properties")
        val keystoreProperties = Properties()
        if (keystorePropertiesFile.exists()) {
            keystoreProperties.load(InputStreamReader(FileInputStream(keystorePropertiesFile), Charsets.UTF_8))
        }

        keyAlias = keystoreProperties["keyAlias"] as String
        keyPassword = keystoreProperties["password"] as String
        storeFile = file(keystoreProperties["storeFile"] as String)
        storePassword = keystoreProperties["password"] as String
    }
}

buildTypes {
    getByName("release") {
        signingConfig = signingConfigs.getByName("release")
    }
}
```

(The `signingConfigs` block goes before the existing `buildTypes` block; the import goes at the beginning of the file.) Release builds are then signed automatically.

CI step that generates `keystore.properties` (keystore exported with `base64 -i /path/to/keystore.jks` into the `ANDROID_KEY_BASE64` secret):

```yml
- name: setup Android signing
  env:
    ANDROID_KEY_ALIAS: ${{ secrets.ANDROID_KEY_ALIAS }}
    ANDROID_KEY_PASSWORD: ${{ secrets.ANDROID_KEY_PASSWORD }}
    ANDROID_KEY_BASE64: ${{ secrets.ANDROID_KEY_BASE64 }}
  run: |
    cd src-tauri/gen/android
    KEYSTORE_PATH="${RUNNER_TEMP}/keystore.jks"
    prop_escape() { local v="${1//\\/\\\\}"; v="${v// /\\ }"; v="${v//$'\t'/\\t}"; v="${v//$'\n'/\\n}"; v="${v//$'\r'/\\r}"; printf '%s' "$v"; }
    printf 'keyAlias=%s\n' "$(prop_escape "${ANDROID_KEY_ALIAS}")" > keystore.properties
    printf 'password=%s\n' "$(prop_escape "${ANDROID_KEY_PASSWORD}")" >> keystore.properties
    printf '%s' "${ANDROID_KEY_BASE64}" | base64 -d > "${KEYSTORE_PATH}"
    printf 'storeFile=%s\n' "$(prop_escape "${KEYSTORE_PATH}")" >> keystore.properties
```

## Notes

- Secrets are passed via `env` instead of inline `${{ }}` expansion in `run` (differs from source) to avoid shell injection.
- Values are escaped per java.util.Properties rules (backslashes doubled; spaces, tabs, CR/LF escaped) so leading whitespace and special characters survive Properties.load (upstream writes them unescaped).
- The Gradle snippet reads keystore.properties through an `InputStreamReader` with UTF-8 (upstream passes a `FileInputStream`, which `Properties.load` decodes as ISO-8859-1), so non-ASCII aliases or passwords written by the CI step survive.
- Keep the keystore and `keystore.properties` files private; do not check them into public source control.
- `keytool` may not be on your PATH. It is in the JDK bundled with Android Studio: Linux `/opt/android-studio/jbr/bin/keytool` (path depends on your distribution), macOS `/Applications/Android\ Studio.app/Contents/jbr/Contents/Home/bin/keytool`, Windows `C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe`.
- A typical Android project has several `build.gradle.kts` files. If there is no `buildTypes` block you are in the wrong file; the right one is in the `app/` directory relative to the keystore file.
- Google also provides Play App Signing for Android App Bundles distributed in the Play Store.
- Tauri bundler side only; Android signing procedures belong to the android-build-gradle skill.

## Related

- [google-play](./google-play.md)
- [bundle-mobile config](../config/bundle-mobile.md)
