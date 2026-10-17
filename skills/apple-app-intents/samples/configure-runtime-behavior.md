---
source: https://developer.apple.com/documentation/appintents/configuring-the-runtime-behavior-of-your-app-intents
---

# Configure the Runtime Behavior of Your App Intents

Share intent code across targets with `AppIntentsPackage` and continue in the foreground when the current mode allows it.

```swift
// Shared framework or package that contains app intent code
struct MySharedFrameworkPackage: AppIntentsPackage { }

// App target: include the shared package
struct MyAppPackage: AppIntentsPackage {
    static var includedPackages: [any AppIntentsPackage.Type] {
        [MySharedFrameworkPackage.self]
    }
}

// Inside perform(): continue in the foreground when possible
if systemContext.currentMode == .background {
   if systemContext.currentMode.canContinueInForeground {
      try await continueInForeground()
   } else {
      // The current conditions don't allow the app intent to continue in the foreground,
      // so it needs to continue in the background.
   }
}
```

## Notes

- Source article: "Configuring the runtime behavior of your app intents" (https://developer.apple.com/documentation/appintents/configuring-the-runtime-behavior-of-your-app-intents).
- Target OS: `AppIntentsPackage` requires iOS 17.0+ / iPadOS 17.0+ / Mac Catalyst 17.0+ / macOS 14.0+ / tvOS 17.0+ / watchOS 10.0+ (see references/intents/appintentspackage.md); the App Intents framework itself is iOS 16.0+. `IntentModes` / `IntentSystemContext` availability is on their reference pages (references/intents/intentmodes.md, references/intents/intentsystemcontext.md). SDK 27.0, Xcode 27.0.
- The article lists the third listing as a fragment from `perform()`; `systemContext` is the intent's `IntentSystemContext`.
