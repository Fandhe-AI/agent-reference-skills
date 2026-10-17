---
source: https://developer.apple.com/documentation/appintents/appintentsextension
---

# AppIntentsExtension

An interface for managing an extension's configuration.

## Signature / Usage

The page has no code listing and no overview; the declaration is verbatim from the symbol page.

```swift
protocol AppIntentsExtension : AppExtension
```

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (the page JSON lists visionOS without an `introducedAt` value).
- Inherits from `AppExtension` (ExtensionFoundation: "An interface you use to declare the content, structure, and behavior of an app extension.").
- Referenced from the article "Responding to the Action button on Apple Watch Ultra". The saved page documents no members.
- Use `IntentExecutionTargets.appIntentsExtension` (iOS 27.0+) to tell the system an intent or entity query may run in the App Intents extension.

## Related

- [IntentExecutionTargets](./intentexecutiontargets.md)
- [AppIntentsPackage](./appintentspackage.md)
- [AppIntent](./appintent.md)
