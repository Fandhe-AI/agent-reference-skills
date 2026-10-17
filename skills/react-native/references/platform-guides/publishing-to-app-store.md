---
source: https://reactnative.dev/docs/0.87/publishing-to-app-store
---

# Publishing to Apple App Store

The publishing process is the same as any other native iOS app, with some additional considerations.

## Signature / Usage

### 1. Configure release scheme

Building an app for distribution in the App Store requires using the `Release` scheme in Xcode. Apps built for `Release` automatically disable the in-app Dev Menu and bundle the JavaScript locally, so you can test on a device without being connected to the computer.

To configure it, go to **Product** → **Scheme** → **Edit Scheme**. Select the **Run** tab in the sidebar, then set the **Build Configuration** dropdown to `Release`.

The static bundle is built every time you target a physical device, even in Debug. To save time, turn off bundle generation in Debug by adding the following to your shell script in the Xcode Build Phase `Bundle React Native code and images`:

```shell
 if [ "${CONFIGURATION}" == "Debug" ]; then
  export SKIP_BUNDLING=true
 fi
```

### 2. Build app for release

Build with Cmd + B or **Product** → **Build**. Alternatively use the React Native CLI with `--mode` set to `Release` (from the project root: `npm run ios -- --mode="Release"` or `yarn ios --mode Release`).

To publish to the App Store:

- Launch your terminal, navigate into the iOS folder of your app and type `open .`.
- Double click on YOUR_APP_NAME.xcworkspace. It should launch Xcode.
- Click on `Product` → `Archive`. Make sure to set the device to "Any iOS Device (arm64)".
- After the archive is completed, in the archive window, click on `Distribute App`.
- Click on `App Store Connect` now (if you want to publish in App Store).
- Click `Upload` → Make sure all the checkboxes are selected, hit `Next`.
- Choose between `Automatically manage signing` and `Manually manage signing` based on your needs.
- Click on `Upload`.
- Now you can find it in the App Store Connect under TestFlight.

Fill in the necessary information and in the Build Section, select the build of the app and click on `Save` → `Submit For Review`.

### 3. Screenshots

The Apple Store requires screenshots for the latest devices (see Apple's screenshot specifications in App Store Connect help). Screenshots for some display sizes are not required if they are provided for other sizes.

## Notes

- Check your Bundle Identifier and make sure it is exactly the same as the one you created in the Identifiers in the Apple Developer Dashboard.
- If you use Expo, the official page points to the Expo "Deploying to App Stores" guide (works with any React Native app to automate deployment); see the expo documentation for that flow (Expo skill may not be installed).
- Archiving, signing, TestFlight and App Store Connect are native iOS distribution topics; see the apple-distribution skill. This page covers the React Native specific Release scheme and bundling steps.

## Related

- [Publishing to Google Play Store](./signed-apk-android.md)
- [Running On Simulator](./running-on-simulator-ios.md)
- [Debugging Release Builds](../debugging-performance/debugging-release-builds.md)
