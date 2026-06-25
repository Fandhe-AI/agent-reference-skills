# NSManagedObject

Base class for all Core Data model objects. Provides generic property storage backed by an `NSEntityDescription` and tracks changes within an `NSManagedObjectContext`.

## Signature / Usage

```swift
class NSManagedObject : NSObject

// Designated initializer
init(entity: NSEntityDescription, insertInto context: NSManagedObjectContext?)

// Convenience initializer (Swift)
convenience init(context: NSManagedObjectContext)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `entity` | `NSEntityDescription` | Entity description of this object |
| `objectID` | `NSManagedObjectID` | Unique, immutable identifier |
| `managedObjectContext` | `NSManagedObjectContext?` | Context that owns this object |
| `hasChanges` | `Bool` | Whether any property has an unsaved change |
| `isInserted` | `Bool` | Object was inserted since last save |
| `isUpdated` | `Bool` | Object was updated since last save |
| `isDeleted` | `Bool` | Object was deleted since last save |
| `isFault` | `Bool` | Property values not yet loaded from the store |

## Notes

- iOS 3.0+, macOS 10.4+, tvOS, watchOS 2.0+, visionOS 1.0+
- Do not override `primitiveValue(forKey:)`, `setPrimitiveValue(_:forKey:)`, `isEqual(_:)`, `hash`, or allocation methods — Core Data reserves these.
- Do not override `description`; may fire faults during debugging.
- Use `didTurnIntoFault()` instead of `deinit`/`dealloc` for cleanup.
- Accessing `managedObjectContext`, `entity`, `objectID`, `isInserted`, `isUpdated`, `isDeleted`, `isFault` is safe without firing a fault.

```swift
class Event: NSManagedObject {
    @NSManaged var timestamp: Date
    @NSManaged var title: String

    override func awakeFromInsert() {
        super.awakeFromInsert()
        timestamp = Date()
    }
}
```

## Related

- [NSManagedObjectContext](./nsmanagedobjectcontext.md)
- [NSEntityDescription](./nsentitydescription.md)
- [@NSManaged](./nsmanaged.md)
