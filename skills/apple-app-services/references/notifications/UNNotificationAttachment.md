# UNNotificationAttachment

A media file associated with a notification. Create a `UNNotificationAttachment` object to include audio, image, or video content in alert-based notifications.

## Signature / Usage

```swift
let content = UNMutableNotificationContent()
if let url = Bundle.main.url(forResource: "photo", withExtension: "png") {
    let attachment = try? UNNotificationAttachment(identifier: "photo", url: url, options: nil)
    content.attachments = [attachment].compactMap { $0 }
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `identifier` | `String` | The unique identifier for the attachment |
| `url` | `URL` | The URL of the file for this attachment |
| `type` | `String` | The UTI type of the attachment |

### Initializer

```swift
convenience init(identifier: String, url: URL, options: [AnyHashable : Any]?) throws
```

### Supported File Types

| Attachment | Supported File Types | Maximum Size |
|---|---|---|
| Audio | `kUTTypeAudioInterchangeFileFormat`, `kUTTypeWaveformAudio`, `kUTTypeMP3`, `kUTTypeMPEG4Audio` | 5 MB |
| Image | `kUTTypeJPEG`, `kUTTypeGIF`, `kUTTypePNG` | 10 MB |
| Movie | `kUTTypeMPEG`, `kUTTypeMPEG2Video`, `kUTTypeMPEG4`, `kUTTypeAVIMovie` | 50 MB |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, watchOS 3.0+, visionOS 1.0+
- Options keys: `UNNotificationAttachmentOptionsTypeHintKey`, `UNNotificationAttachmentOptionsThumbnailHiddenKey`, `UNNotificationAttachmentOptionsThumbnailClippingRectKey`, `UNNotificationAttachmentOptionsThumbnailTimeKey`
- The initializer throws if the file is invalid or unsupported

## Related

- [UNMutableNotificationContent](./UNMutableNotificationContent.md)
- [UNNotificationContent](./UNNotificationContent.md)
- [UNUserNotificationCenter](./UNUserNotificationCenter.md)
