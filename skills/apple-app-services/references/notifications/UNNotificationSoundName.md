# UNNotificationSoundName

A string providing the name of a sound file.

## Signature / Usage

```swift
struct UNNotificationSoundName
```

Adapted (not in the official docs): usage taken from this skill's UNNotificationSound page; the official `UNNotificationSoundName` page has no code example.

```swift
let content = UNMutableNotificationContent()
content.sound = UNNotificationSound(named: UNNotificationSoundName("custom_sound.caf"))
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(_:)` | `init(_ rawValue: String)` | Creates a notification sound name using the string parameter |
| `init(rawValue:)` | `init(rawValue: String)` | Creates a notification sound name using the string parameter |

## Notes

- Available iOS 10.0+, iPadOS 10.0+, Mac Catalyst 13.0+, macOS 10.14+, tvOS 10.0+, visionOS 1.0+, watchOS 3.0+. Conforms to `Equatable`, `Hashable`, `RawRepresentable`, `Sendable`, `SendableMetatype`.
- Adapted (not in the official docs): the snippet is the same usage shown on the UNNotificationSound page in this skill; the official page for this type has no code example.
- Source: https://developer.apple.com/documentation/usernotifications/unnotificationsoundname (fetched 2026-11-14)

## Related

- [UNNotificationSound](./UNNotificationSound.md)
