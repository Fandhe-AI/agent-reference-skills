# samples

| Name | Description | Path |
|------|-------------|------|
| Configure a Development Build with EAS | Install `expo-dev-client`, link the project to EAS, and generate `eas.json` with development, preview and production build profiles. | [eas-development-build-setup.md](./eas-development-build-setup.md) |
| Multiple App Variants on One Device | Give development and preview builds unique identifiers with `app.config.js` and an `APP_VARIANT` environment variable so they install side by side. | [eas-app-variants.md](./eas-app-variants.md) |
| Internal Distribution Build | Create a shareable preview build (APK / ad hoc IPA) that runs without a development server. | [eas-internal-distribution.md](./eas-internal-distribution.md) |
| Production Build and Store Submission | Auto-increment app versions, build a production binary, and submit it to Google Play or App Store Connect with `eas submit`. | [eas-production-build-submit.md](./eas-production-build-submit.md) |
| Unit and Snapshot Tests with jest-expo | Set up the `jest-expo` preset and write a unit test and a snapshot test with React Native Testing Library. | [jest-expo-unit-testing.md](./jest-expo-unit-testing.md) |
| Inline Module | Write a native module directly in the app's `app` directory (Kotlin and Swift) without a separate package. | [module-inline.md](./module-inline.md) |
| Native Module with Events and Enums | Create an Expo module (`expo-settings`) that stores a theme preference in SharedPreferences / UserDefaults, emits change events, and restricts values with an enum. | [module-native-settings.md](./module-native-settings.md) |
| Create a Modal with an Emoji List | Build a reusable bottom-sheet style `Modal` that hosts a horizontal `FlatList` of selectable images. | [tutorial-emoji-modal.md](./tutorial-emoji-modal.md) |
| Add Tap and Pan Gestures | Make a sticker scale on double tap and move with a drag using React Native Gesture Handler and Reanimated. | [tutorial-gestures.md](./tutorial-gestures.md) |
| Pick an Image with expo-image-picker | Select an image from the device media library with `launchImageLibraryAsync()` and show the chosen `uri` in an `expo-image` component. | [tutorial-image-picker.md](./tutorial-image-picker.md) |
| Capture a View and Save It to the Media Library | Request media library permission, capture a `View` with `react-native-view-shot`, and save the result with `expo-media-library`. | [tutorial-screenshot.md](./tutorial-screenshot.md) |
| Maestro E2E Tests in EAS Workflows | Build an unsigned APK and an iOS simulator build, then run Maestro flows against both from a workflow. | [workflow-maestro-e2e.md](./workflow-maestro-e2e.md) |
| PR Preview Update Workflow | Publish an EAS Update on every pull request and comment on the PR with a link or QR code to test it. | [workflow-pr-preview-update.md](./workflow-pr-preview-update.md) |
| Preview Builds with Fingerprint and Slack Notification | Skip native rebuilds when the fingerprint is unchanged, build only when no compatible build exists, and post the result to Slack. | [workflow-preview-builds.md](./workflow-preview-builds.md) |
| Tag-Based Production Release Workflow | Run the production workflow only when a `v*.*.*` Git tag is pushed, building natively when the fingerprint changed and publishing an update otherwise. | [workflow-tag-release.md](./workflow-tag-release.md) |
| Web Deployment Job (EAS Hosting) | Export a static web build and deploy it from a workflow, as a preview or to the production URL. | [workflow-web-deploy.md](./workflow-web-deploy.md) |
