# NSEntityDescription

Describes an entity in a Core Data model — analogous to a database table definition. Each entity specifies a name, corresponding class, attributes, and relationships.

## Signature / Usage

```swift
class NSEntityDescription : NSObject

// Look up an entity description from a context
let entity = NSEntityDescription.entity(forEntityName: "MyEntity", in: context)!

// Insert a new managed object
let object = NSEntityDescription.insertNewObject(
    forEntityName: "MyEntity",
    into: context
) as! MyEntity
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name` | `String?` | Entity name matching the `.xcdatamodeld` definition |
| `managedObjectClassName` | `String!` | Fully qualified class name for generated instances |
| `isAbstract` | `Bool` | Abstract entities cannot be instantiated directly |
| `superentity` | `NSEntityDescription?` | Parent entity in an inheritance hierarchy |
| `subentities` | `[NSEntityDescription]` | Child entities; set on the parent to build hierarchy |
| `properties` | `[NSPropertyDescription]` | All properties (attributes + relationships + fetch properties) |
| `attributesByName` | `[String: NSAttributeDescription]` | Attributes keyed by name |
| `relationshipsByName` | `[String: NSRelationshipDescription]` | Relationships keyed by name |
| `indexes` | `[NSFetchIndexDescription]` | Fetch index definitions |
| `uniquenessConstraints` | `[[Any]]` | Unique constraint groups |
| `userInfo` | `[AnyHashable: Any]?` | App-defined metadata |

## Notes

- iOS 3.0+, macOS 10.4+, tvOS, watchOS 2.0+, visionOS 1.0+
- Entity descriptions become **immutable** after being associated with a `NSPersistentStoreCoordinator`.
- Set `subentities` on the **parent** entity — do not set `superentity` on the child.
- Do not use `NSEntityDescription` as a dictionary key; use the entity name string instead, or `NSMapTable`.
- `NSEntityDescription` conforms to `NSFastEnumeration`: iterating over it yields its `NSPropertyDescription` objects.

## Related

- [NSManagedObjectModel](./nsmanagedobjectmodel.md)
- [NSManagedObject](./nsmanagedobject.md)
- [NSFetchRequest](./nsfetchrequest.md)
