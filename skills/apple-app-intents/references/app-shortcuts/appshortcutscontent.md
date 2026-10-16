---
source: https://developer.apple.com/documentation/appintents/appshortcutscontent
---

# AppShortcutsContent

A protocol with a single required `appShortcuts` property; the page has no abstract or overview text.

## Signature / Usage

```swift
protocol AppShortcutsContent

var appShortcuts: [AppShortcut]
```

## Options / Props

| Name | Kind | Description |
|------|------|-------------|
| appShortcuts | required instance property | `[AppShortcut]` |

## Notes

- iOS 17.4+, iPadOS 17.4+, Mac Catalyst 17.4+, macOS 14.4+, tvOS 17.4+, visionOS 1.1+, watchOS 10.4+.
- The page does not document how this protocol is adopted.

## Related

- [AppShortcutsBuilder](./appshortcutsbuilder.md)
- [AppShortcut](./appshortcut.md)
