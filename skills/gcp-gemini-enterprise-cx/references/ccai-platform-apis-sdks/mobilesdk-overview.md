---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/mobileSDK-overview
---

# CCAI Platform mobile SDKs: Flutter and React Native integration

The CCAI Platform mobile SDKs (Android SDK and iOS SDK) provide voice and chat support inside your iOS or Android app. Besides the native Android SDK guide and iOS SDK guide, you can integrate through Flutter or React Native; the initial steps below are the same for both platforms. Both bridges need a JWT signing API endpoint (see web-sdk-v3-authenticate.md).

## Signature / Usage

### Flutter: run the sample app locally

Requires Flutter, Android Studio, Xcode and Cocoapods. Download and expand the Flutter example ZIP, go to its directory, then:

```bash
cd example
cp .env.example .env
```

Set the environment values in `.env` (for example `API_KEY=your_api_key`, no quotation marks), run `flutter pub get`, update `ujet_company_key`, `ujet_subdomain` and `ujet_company_url` in `android/app/src/main/res/values/strings.xml`, start an Android emulator or iOS simulator, and run `flutter run`.

### Flutter: import the module

Copy `example/lib/ujet` into your project's `lib`; copy `UJETModule.kt`, `Application.kt`, `firebase\MyFirebaseMessagingService.kt` and `firebase\FirebaseTokenManager.kt` from `example/android/app/src/main/kotlin/co/ujet/flutter_example_app` next to your `MainActivity` (change their package declarations); drag `example/ios/Runner/UJETModule.swift` into Xcode. Edit `_getUserData` in `example/lib/ujet/ujet_module.dart` to return the end-user information:

```dart
static Future<Map<String, String?>> _getUserData() async {

String? name = "John Doe"; // end-user name
String? identifier = "id1234"; // end user identifier
String? email = "jdoe@example.com"; // end user email
String? phone = "+12223334444"; // end user phone

return {
  "name": name,
  "identifier": identifier,
  "email": email,
  "phone": phone
  };
}
```

Implement `signPayload` in `server_api.dart` to get the signed JWT from your server API.

### Flutter: initialize and start

```dart
await UJET.init(key: 'your_ujet_key', baseUrl: 'your_ujet_base_url');
await UJET.start(UjetStartOptions(skipSplashScreen: true));
```

On iOS, if the Co-browse screen is not projected from the agent side, disable the impeller engine by setting this key in `info.plist`:

```xml
<key>FLTEnableImpeller</key>
<false/>
```

Continue with Flutter for Android (https://docs.cloud.google.com/contact-center/ccai-platform/docs/android-flutter) or Flutter for iOS (https://docs.cloud.google.com/contact-center/ccai-platform/docs/ios-flutter).

### React Native: run the sample app

Download and extract `ujet-react-native-example.zip` and follow its README.md. To run the sample's server locally:

Adapted (not in the official docs): the stray closing backticks after `npm start` in the source were removed.

```text
cd server
cp .env.example .env
Edit .env
nvm use
npm install
npm start
```

Then run the app:

```bash
cd app
nvm use
npm install
bundle install
npx pod-install
```

Update `UJET.initialize({})` in `src/screens/Home.tsx` and `ujet_company_key`, `ujet_subdomain`, `ujet_company_url` in `android/app/src/main/res/values/strings.xml`, run `npm start`, and run the iOS or Android app. If the command fails, specify the simulator, for example `npm run ios -- --simulator="iPhone 15 Pro"`.

### React Native: import the module

Copy `app/src/native_modules/UJETInterfaces.ts`, `app/src/native_modules/UJETNativeModule.ts`, `app/ios/UJETModule.h`, `app/ios/UJETModule.m` and `app/android/src/main/java/com/sampleapp/UJETModule.kt` into your project. In `UJETNativeModule.ts`, remove `import AsyncStorage from '@react-native-async-storage/async-storage';`, update `SIGNING_BASE_URL` to your signing endpoint, and edit `getUserData`:

```typescript
async function getUserData({ name: anonymousName }: SignPayloadData): Promise<Object> {
  // fetch the end user information from your application
  return {
    name: 'John Doe',
    identifier: 'id1234',
    email: 'jdoe@example.com',
    phone: '+12223334444'
  }
}
```

Initialize and start (replace `your-key` with the company ID and `your-base-url` with the API endpoint for the CCAI Platform host, for example `https://ccaas-host.uc1.ccaiplatform.com/api/v2/`):

```typescript
import { UJET } from '../path/UJETNativeModule';

UJET.initialize({
  key: 'your-key',
  baseUrl: 'your-base-url'
});

const startUJET = () => {
  UJET.start({
    skipSplashScreen: true
  });
};
```

Continue with React Native for Android (https://docs.cloud.google.com/contact-center/ccai-platform/docs/android-react) or React Native for iOS (https://docs.cloud.google.com/contact-center/ccai-platform/docs/ios-react).

## Notes

- Known issues with Flutter: screenshots are not captured using the screenshot SmartActions (Google is working to fix this); the Co-browse screen is not projected from the agent side during a co-browse session (iOS only; Google recommends disabling the impeller engine).
- The source states "For Android, your project's deployment target must be iOS 13.0 or later" and "For iOS, your project's `minSdkVersion` must be 21 or later"; the platform labels look swapped (an iOS deployment target and an Android `minSdkVersion`), recorded here as written.
- The sample `getUserData` / `_getUserData` return hard-coded values; replace them with the signed-in end user's data, and keep the company secret on your server (JWT signing endpoint) rather than in the app. Your signing server should take the identifier from its own authenticated session rather than sign whatever identifier the app sends (not stated in the official docs; see web-sdk-v3-authenticate.md).
- The source says "enter the following code in the terminal" before the Flutter `UJET.init` / `UJET.start` lines; they are Dart code, not shell commands.
- Corrected from the official docs: the React Native server command block ends with `npm start` immediately followed by three stray backticks on the same line; the command is `npm start`. The block is tagged `text` because its line `Edit .env` is an instruction (edit the `.env` file), not a shell command.
- Flutter and React Native are not required; use the Android SDK guide (https://docs.cloud.google.com/contact-center/ccai-platform/docs/android-sdk-guide) or iOS SDK guide (https://docs.cloud.google.com/contact-center/ccai-platform/docs/ios-sdk-guide) for native integration.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/mobileSDK-overview (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [web-sdk-v3-authenticate.md](./web-sdk-v3-authenticate.md)
- [ccaas-sdks.md](./ccaas-sdks.md)
