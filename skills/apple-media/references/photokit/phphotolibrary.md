# PHPhotoLibrary

Manages access and changes to the user's photo library. Represents the entire set of assets and collections managed by the Photos app, including iCloud Photos.

## Signature / Usage

```swift
// Get shared instance
let library = PHPhotoLibrary.shared()

// Check authorization
let status = PHPhotoLibrary.authorizationStatus(for: .readWrite)

// Request authorization
PHPhotoLibrary.requestAuthorization(for: .readWrite) { status in
    // handle status
}

// Perform changes
PHPhotoLibrary.shared().performChanges({
    // create/modify assets or collections here
}, completionHandler: { success, error in
    // handle result
})
```

## Options / Props

| Method / Property | Type | Description |
|-------------------|------|-------------|
| `shared()` | `PHPhotoLibrary` | Returns the singleton shared library object |
| `authorizationStatus(for:)` | `PHAuthorizationStatus` | Returns current authorization status for the given access level |
| `requestAuthorization(for:handler:)` | `Void` | Prompts user for authorization; calls handler with resulting status |
| `performChanges(_:completionHandler:)` | `Void` | Executes a change block asynchronously |
| `performChangesAndWait(_:)` | `Void` | Executes a change block synchronously; throws on failure |
| `register(_:)` | `Void` | Registers a `PHPhotoLibraryChangeObserver` |
| `unregisterChangeObserver(_:)` | `Void` | Removes a previously registered change observer |
| `currentChangeToken` | `PHPersistentChangeToken` | Token representing the current library state |
| `presentLimitedLibraryPicker(from:)` | `Void` | Prompts user to update limited library selection |
| `fetchPersistentChanges(since:)` | `PHPersistentChangeFetchResult` | Retrieves the library's persistent changes since the given `PHPersistentChangeToken` |
| `register(_:)` (persistent changes observer) | `Void` | Registers an observer for persistent-change notifications |
| `unregisterPersistentChangesObserver(_:)` | `Void` | Removes a previously registered persistent-changes observer |
| `cloudIdentifierMappings(forLocalIdentifiers:)` | `[String: Result<PHCloudIdentifier, Error>]` | Maps local asset/collection identifiers to cloud identifiers |
| `localIdentifierMappings(for:)` | `[PHCloudIdentifier: Result<String, Error>]` | Maps cloud identifiers to local asset/collection identifiers |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 10.13+, Mac Catalyst 13.1+, tvOS 10.0+, visionOS 1.0+. Always check authorization before accessing the library. Add `NSPhotoLibraryUsageDescription` to `Info.plist`. Change requests must be made inside `performChanges` or `performChangesAndWait`.

- `fetchPersistentChanges(since:)` and its persistent-changes observer APIs (`register(_:)` / `unregisterPersistentChangesObserver(_:)`) are marked beta in the current documentation.
- `cloudIdentifierMappings(forLocalIdentifiers:)` / `localIdentifierMappings(for:)` supersede the deprecated `cloudIdentifiers(forLocalIdentifiers:)` / `localIdentifiers(for:)`.
- The no-parameter `authorizationStatus()` and `requestAuthorization(_:)` are deprecated; use `authorizationStatus(for:)` and `requestAuthorization(for:handler:)` instead.

## Related

- [PHAuthorizationStatus](./phauthorizationstatus.md)
- [PHAssetChangeRequest](./phassetchangerequest.md)
- [PHPhotoLibraryChangeObserver](./phphotolibrarychangeobserver.md)
