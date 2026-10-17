---
source: https://docs.flutter.dev/platform-integration/ios/launch-screen
---

# Adding a launch screen to your iOS app

Launch screens provide a simple initial experience while your iOS app loads, allowing time for the engine to load and your app to initialize.

## Signature / Usage

Open the Flutter app's Xcode project from the root of your app directory, select `Runner/Assets.xcassets` in the Project Navigator, and drop the desired images into the `LaunchImage` image set:

```console
open ios/Runner.xcworkspace
```

## Notes

- All apps submitted to the Apple App Store must provide a launch screen with an Xcode storyboard.
- The default Flutter template includes a storyboard named `LaunchScreen.storyboard` that can be customized with your own assets; by default it displays a blank image.
- Apple provides detailed guidance in the Human Interface Guidelines (launching, launch screens).
- This is the Flutter project setup. The iOS launch screen / storyboard APIs belong to the apple-uikit and apple-distribution skills.

## Related

- [android-splash-screen](./android-splash-screen.md)
