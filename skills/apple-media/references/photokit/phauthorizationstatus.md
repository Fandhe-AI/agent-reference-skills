# PHAuthorizationStatus

Enum representing your app's authorization to access the user's photo library.

## Signature / Usage

```swift
// Check current status
let status = PHPhotoLibrary.authorizationStatus(for: .readWrite)

switch status {
case .notDetermined:
    PHPhotoLibrary.requestAuthorization(for: .readWrite) { newStatus in
        // handle newStatus on background queue
    }
case .authorized:
    // full access
case .limited:
    // access to selected photos only
case .denied, .restricted:
    // show settings prompt
@unknown default:
    break
}
```

## Options / Props

| Case | Description |
|------|-------------|
| `.notDetermined` | User has not yet been prompted; access status is unknown |
| `.restricted` | System policy prevents access; user cannot grant permission |
| `.denied` | User explicitly denied access |
| `.authorized` | User granted full access to the photo library |
| `.limited` | User granted access to a limited selection of photos only (iOS 14+) |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 10.13+, tvOS 10.0+, visionOS 1.0+. The `.limited` case requires iOS 14+. Pass `PHAccessLevel.addOnly` or `.readWrite` to `authorizationStatus(for:)` and `requestAuthorization(for:handler:)` to scope the permission check. The completion handler of `requestAuthorization` is called on an arbitrary background queue.

## Related

- [PHPhotoLibrary](./phphotolibrary.md)
