---
source: https://developer.apple.com/documentation/appintents/appintentspackage
---

# AppIntentsPackage

A type that describes app intent definitions that aren't part of an app bundle and their dependencies.

## Signature / Usage

```swift
protocol AppIntentsPackage
```

```swift
struct MyFrameworkPackage: AppIntentsPackage { }
```

```swift
struct MyAppPackage: AppIntentsPackage {
   static var includedPackages: [any AppIntentsPackage.Type] {
       [MyFrameworkPackage.self]
   }
}
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `includedPackages` | `static var includedPackages: [any AppIntentsPackage.Type]` | Other app intents packages this package depends on (has a default implementation; no abstract on the page). |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+ (the page JSON lists visionOS without an `introducedAt` value).
- By default app intents are part of the application bundle. To reuse them across apps or app extensions (for example, bundled in a framework), the framework defines its own `AppIntentsPackage` type; the app defines a package that lists it in `includedPackages`.
- Any package can depend on one or more other packages (for example, `MyAppPackage` includes `MyFrameworkPackage`, which could include `OtherFrameworkPackage`).
- Referenced from the article "Configuring the runtime behavior of your app intents".

## Related

- [IntentExecutionTargets](./intentexecutiontargets.md)
- [AppIntentsExtension](./appintentsextension.md)
- [AppIntent](./appintent.md)
