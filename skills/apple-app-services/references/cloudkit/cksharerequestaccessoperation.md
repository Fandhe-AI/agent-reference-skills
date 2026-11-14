# CKShareRequestAccessOperation

An operation that requests access to one or more shares by their URLs.

## Signature / Usage

```swift
class CKShareRequestAccessOperation
```

Adapted (not in the official docs): minimal usage built from the declared members; the official page has no description or code example.

```swift
import CloudKit

func requestAccess(to shareURLs: [URL]) {
    let operation = CKShareRequestAccessOperation(shareURLs: shareURLs)
    operation.perShareAccessRequestResultBlock = { url, result in
        // Handle the outcome for each share URL.
    }
    operation.shareAccessRequestResultBlock = { result in
        // Handle the overall outcome.
    }
    CKContainer.default().add(operation)
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init()` | initializer | Creates a new, empty share request access operation |
| `init(shareURLs:)` | `convenience init(shareURLs: [URL])` | Creates an operation configured with the specified share URLs |
| `shareURLs` | `[URL]?` | The URLs of the shares to request access to |
| `perShareAccessRequestResultBlock` | `((URL, Result<Void, any Error>) -> Void)?` | Closure to execute when CloudKit processes a share access request |
| `shareAccessRequestResultBlock` | `((Result<Void, any Error>) -> Void)?` | Closure to execute after CloudKit processes each share access request |

## Notes

- Available iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+. Inherits from `CKOperation`.
- The official page has an empty abstract; the description above is inferred from the member abstracts. The page does not say where to run the operation; the snippet uses `CKContainer.add(_:)` ("Adds an operation to the container's queue", per the `CKContainer` DocC page).
- Source: https://developer.apple.com/documentation/cloudkit/cksharerequestaccessoperation (fetched 2026-11-14)

## Related

- [CKShare](./ckshare.md)
- [CKContainer](./ckcontainer.md)
