---
source: https://reactnative.dev/docs/0.87/signed-apk-android
---

# Build Release

Commands for signing, release builds and publishing. Other sources: https://reactnative.dev/docs/0.87/publishing-to-app-store and https://reactnative.dev/docs/0.87/debugging-release-builds.

> **警告**: 署名鍵とパスワードは実値を書かず、公式ドキュメントのプレースホルダのまま扱う。キーストアと `gradle.properties` のパスワードはコミットしない。検証は使い捨て環境で行う。

## Generate an upload key (Windows)

> **警告**: 署名用の秘密鍵を生成する。生成した keystore は非公開に保ち、紛失・漏洩時は Google Play の手順で upload key をリセットする。

```sh
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

The docs say to run it from `C:\Program Files\Java\jdkx.x.x_x\bin` as administrator. The command prompts for keystore and key passwords and Distinguished Name fields.

## Find the JDK bin folder (macOS)

```sh
/usr/libexec/java_home
```

Navigate to the printed directory with `cd /your/jdk/path` before running `keytool`.

## Generate an upload key (macOS)

> **警告**: 署名用の秘密鍵を生成する。`sudo` で実行する手順のため、出力先と keystore の取り扱いに注意する。

```sh
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

## Gradle signing variables

```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

Place `my-upload-key.keystore` under `android/app`, then add these lines to `~/.gradle/gradle.properties` or `android/gradle.properties`. Replace `*****` with the real values locally only. Using `~/.gradle/gradle.properties` keeps them out of git.

## Generate the release AAB

```sh
npx react-native build-android --mode=release
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`. Make sure `gradle.properties` does not include `org.gradle.configureondemand=true`.

## Test the Android release build

```sh
npm run android -- --mode="release"
```

```sh
yarn android --mode release
```

Uninstall any previous version first. `--mode release` is available only after the signing setup above.

## Build the iOS app in Release mode

```sh
npm run ios -- --mode="Release"
```

```sh
yarn ios --mode Release
```

Equivalent to building with the `Release` scheme in Xcode (macOS only). The Dev Menu is disabled in Release builds.

## Skip bundling in Debug builds (Xcode build phase)

```sh
if [ "${CONFIGURATION}" == "Debug" ]; then
  export SKIP_BUNDLING=true
fi
```

Add to the shell script of the Xcode Build Phase `Bundle React Native code and images`. Saves time because the static bundle is otherwise built for every physical device build, even in Debug.

## Open the iOS workspace for archiving

```sh
cd ios
open .
```

Then double click `YOUR_APP_NAME.xcworkspace` and use Product, Archive in Xcode (device set to "Any iOS Device (arm64)"), then Distribute App, App Store Connect, Upload.

## Enable iOS source maps (Xcode build phase)

```sh
export SOURCEMAP_FILE="$(pwd)/../main.jsbundle.map"
```

Add above the other exports in the build phase `Bundle React Native code and images`. On iOS source maps are disabled by default; on Android they are enabled by default.

## Symbolicate a release stack trace

```sh
# Print usage instructions
npx metro-symbolicate

# From a file containing the stack trace
npx metro-symbolicate android/app/build/generated/sourcemaps/react/release/index.android.bundle.map < stacktrace.txt

# From adb logcat (Android)
adb logcat -d | npx metro-symbolicate android/app/build/generated/sourcemaps/react/release/index.android.bundle.map
```

The source map must match the exact commit of the crashing app. If `metro-symbolicate` exits immediately with success, make sure the input comes from a pipe or redirection.
