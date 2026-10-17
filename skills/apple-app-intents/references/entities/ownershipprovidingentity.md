---
source: https://developer.apple.com/documentation/appintents/ownershipprovidingentity
---

# OwnershipProvidingEntity

A type that provides the system with ownership and sharing context for an app entity.

## Signature / Usage

```swift
protocol OwnershipProvidingEntity : AppEntity
```

```swift
@AppEntity(schema: .photos.album)
struct PhotoAlbumEntity: OwnershipProvidingEntity {
    let id = UUID()
    var isSharedWithFamily: Bool
    var isPublicAlbum: Bool

    // MARK: - .photos.album properties
    var name: String
    var creationDate: Date?
    var albumType: PhotoAlbumType

    var ownership: EntityOwnership {
        var ownership: EntityOwnership = []
        if isSharedWithFamily {
            ownership.insert(.shared)
        }
        if isPublicAlbum {
            ownership.insert(.public)
        }
        return ownership
    }
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `ownership` | `var ownership: EntityOwnership` (required) | The sharing and ownership state of the entity. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- When entities are passed as `AppIntent` parameters and returned from results, people can work with them across apps through Apple Intelligence, Siri, and custom shortcuts. For destructive or sensitive actions (deleting or updating an entity) the app can require confirmation; Apple Intelligence and Siri may also request confirmation.
- Conform entities to `OwnershipProvidingEntity` so the system prompts for confirmation, with appropriate context in the confirmation dialog, when an intent acts on shared or publicly accessible entities.
- Listed in the June 2026 updates (see updates/appintents).

## Related

- [EntityOwnership](./entityownership.md)
- [AppEntity](./appentity.md)
