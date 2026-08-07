# UNNotificationSound

The sound played upon delivery of a notification. Represents either the default system sound or a custom audio file.

## Signature / Usage

```swift
let content = UNMutableNotificationContent()
content.sound = UNNotificationSound.default
// or a custom sound
content.sound = UNNotificationSound(named: UNNotificationSoundName("custom_sound.caf"))
```

## Options / Props

| Member | Signature | Description |
|---|---|---|
| `default` | `class var default: UNNotificationSound` | The default system sound for notifications |
| `init(named:)` | `convenience init(named: UNNotificationSoundName)` | Creates a sound object that represents a custom sound file |
| `defaultCritical` | `class var defaultCritical: UNNotificationSound` | The default sound used for critical alerts |
| `defaultCriticalSound(withAudioVolume:)` | `class func defaultCriticalSound(withAudioVolume: Float) -> Self` | Default critical alert sound at the specified volume |
| `criticalSoundNamed(_:)` | `class func criticalSoundNamed(UNNotificationSoundName) -> Self` | Custom sound object for critical alerts |
| `criticalSoundNamed(_:withAudioVolume:)` | `class func criticalSoundNamed(UNNotificationSoundName, withAudioVolume: Float) -> Self` | Custom critical alert sound at the specified volume |
| `defaultRingtone` | `class var defaultRingtone: UNNotificationSound` | The default ringtone sound |
| `ringtoneSoundNamed(_:)` | `class func ringtoneSoundNamed(UNNotificationSoundName) -> Self` | Custom ringtone sound object |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, watchOS 3.0+, visionOS 1.0+
- Remote notifications set the sound via the `sound` key in the `aps` dictionary of the JSON payload rather than this class
- Custom sound files: Linear PCM, MA4 (IMA/ADPCM), µLaw, or aLaw; `.aiff`, `.wav`, or `.caf`; max 30 seconds (longer files fall back to the default system sound)
- Store custom sound files in `/Library/Sounds` of the app's container, `/Library/Sounds` of a shared group container, or the main bundle

## Related

- [UNMutableNotificationContent](./UNMutableNotificationContent.md)
- [UNNotificationContent](./UNNotificationContent.md)
- [UNNotificationAttachment](./UNNotificationAttachment.md)
