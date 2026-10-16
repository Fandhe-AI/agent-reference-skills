---
source: https://developer.apple.com/documentation/appintents/appshortcutsbuilder
---

# AppShortcutsBuilder

A result builder that allows you to declaratively describe the App Shortcuts that your app provides.

## Signature / Usage

```swift
@resultBuilder enum AppShortcutsBuilder
```

Builder methods (“Building App Shortcuts”):

```swift
static func buildBlock() -> [AppShortcut]
static func buildBlock(AppShortcut...) -> [AppShortcut]
static func buildBlock([AppShortcut]...) -> [AppShortcut]
static func buildExpression(AppShortcut) -> AppShortcut
static func buildExpression(AppShortcut) -> [AppShortcut]
static func buildLimitedAvailability([AppShortcut]) -> any _AppShortcutsContentMarker & _LimitedAvailabilityAppShortcutsContentMarker
static func buildOptional((any _AppShortcutsContentMarker & _LimitedAvailabilityAppShortcutsContentMarker)?) -> [AppShortcut]
static func buildOptional((any _AppShortcutsContentEmitterMarker & _AppShortcutsContentMarker & _LimitedAvailabilityAppShortcutsContentMarker)?) -> [AppShortcut]
```

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+; visionOS is listed on the page without an introduced version.
- The page carries no overview text; the `AppShortcutsProvider.appShortcuts` property is the usual place the builder is applied.

## Related

- [AppShortcutsProvider](./appshortcutsprovider.md)
- [AppShortcutsContent](./appshortcutscontent.md)
- [AppShortcut](./appshortcut.md)
