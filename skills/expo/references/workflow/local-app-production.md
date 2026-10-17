---
source: https://docs.expo.dev/guides/local-app-production/
---

# Create a release build locally

Create a release (production) build locally. Android requires signing with an upload key and generating an Android Application Bundle (**.aab**); iOS uses Xcode for signing and upload.

## Signature / Usage

```sh
# Create an upload key
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Generate release .aab
cd android
./gradlew app:bundleRelease
```

Add the upload key variables to **android/gradle.properties**:

```ruby
# Path to the "keystore" file
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
# Replace with value of the `keystore.keyAlias` field in the credentials.json file
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
# Replace with value of the `keystore.password` field in the credentials.json file
MYAPP_UPLOAD_STORE_PASSWORD=*****
# Replace with value of the `keystore.keyPassword` field in the credentials.json file
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

## Notes

- Android prerequisites: an OpenJDK distribution (for `keytool`) and the **android** directory (`npx expo prebuild` if you use CNG).
- If you already built with EAS Build, download credentials: `eas credentials -p android`, select the build profile, then **credentials.json** > **Download credentials from EAS to credentials.json**; move **keystore.jks** to **android/app** and copy the password, alias, and key password values.
- Move the generated keystore to **android/app**. Do not commit the keystore or the gradle variables if **android** is committed; put the variables in **~/.gradle/gradle.properties** instead.
- The "Add signing config to build.gradle" step (edit **android/app/build.gradle**) has no code block in the saved source; consult the official page for the snippet.
- The output is generated at **android/app/build/outputs/bundle/release** (app-release.aab).
- Submit the **.aab** manually through Google Play Console, or `eas submit --platform android --path ./my-app.aab`.
- iOS: use Xcode (configure signing, archive, upload to App Store Connect); see the manual submission guide.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react skill and a future react-native skill for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: July 17, 2026).

## Related

- [Create a debug build locally](./local-app-development.md)
- [Develop an app with Expo](./workflow-overview.md)
