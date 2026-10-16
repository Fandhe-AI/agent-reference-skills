# Bundle

A class representing the code and resources stored in a bundle directory on disk. Used to locate app resources, read `Info.plist` values, and access localizations.

## Signature / Usage

```swift
// App's main bundle
let bundle = Bundle.main

// Locate a resource
if let url = bundle.url(forResource: "config", withExtension: "json") {
    let data = try Data(contentsOf: url)
}

// Read Info.plist
let version = bundle.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String

// Localized string
let greeting = bundle.localizedString(forKey: "greeting", value: "Hello", table: nil)

// #bundle macro (iOS 15.0+)
label.text = String(localized: "Game Over.",
                    bundle: #bundle,
                    comment: "Text for game over banner.")
```

## Options / Props

| Initializer / Method / Property | Description |
|---------------------------------|-------------|
| `Bundle.main` (class) | Bundle containing the currently executing code |
| `init?(url:)` | Bundle for a given directory URL |
| `init(for:)` | Bundle associated with a class (useful for frameworks) |
| `init?(identifier:)` | Bundle by bundle identifier |
| `url(forResource:withExtension:)` | `URL?` — locate a resource file |
| `url(forResource:withExtension:subdirectory:)` | `URL?` — locate in subdirectory |
| `urls(forResourcesWithExtension:subdirectory:)` | `[URL]?` — all matching resources |
| `path(forResource:ofType:)` | `String?` — path string variant |
| `object(forInfoDictionaryKey:)` | `Any?` — read `Info.plist` value |
| `localizedString(forKey:value:table:)` | `String` — localized string lookup |
| `bundleURL` | `URL` — bundle root directory URL |
| `bundlePath` | `String` — bundle root path |
| `bundleIdentifier` | `String?` — `CFBundleIdentifier` |
| `infoDictionary` | `[String: Any]?` — full `Info.plist` |
| `resourceURL` | `URL?` — resource subdirectory URL |
| `executableURL` | `URL?` — bundle executable URL |
| `localizations` | `[String]` — all included localizations |
| `preferredLocalizations` | `[String]` — ordered preferred localizations |
| `#bundle` (macro) | `@freestanding(expression) macro bundle() -> Bundle` — expands to a bundle instance that's most likely to contain resources for the calling code. iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, macOS 12.0+, tvOS 15.0+, visionOS 1.0+, watchOS 8.0+ |

## Notes

- Available iOS 2.0+, macOS 10.0+.
- Inherits from `NSObject`.
- `Bundle.main` refers to the `.app` bundle; use `Bundle(for: MyClass.self)` to locate framework or test bundle resources.
- `#bundle` works whether code executes in an app, app extension, framework, or Swift package (in a package target it provides that target's resource bundle) and back-deploys to earlier OS versions. Foundation updates (June 2025): it is more performant and convenient than `.self` or a bundle identifier, particularly when loading localized strings.
- Localization tables default to `Localizable.strings` when `table` is `nil`.
- Source: https://developer.apple.com/documentation/foundation/bundle , https://developer.apple.com/documentation/foundation/bundle() , https://developer.apple.com/documentation/updates/foundation (fetched 2026-10-16, iOS 27 SDK docs)

## Related

- [URL](./url.md)
- [FileManager](./filemanager.md)
- [UserDefaults](./userdefaults.md)
