# @NSManaged

Swift attribute applied to stored properties of `NSManagedObject` subclasses. Tells the compiler that Core Data will provide the property's storage and accessor implementations at runtime.

## Signature / Usage

```swift
// In an NSManagedObject subclass
class MyEntity: NSManagedObject {
    @NSManaged var name: String
    @NSManaged var timestamp: Date
    @NSManaged var score: Int16
    @NSManaged var tags: NSSet        // to-many relationship
    @NSManaged var owner: Person?     // optional to-one relationship
}
```

## Notes

- iOS 3.0+, macOS 10.4+, tvOS, watchOS, visionOS (available wherever Core Data is available)
- `@NSManaged` is a **Swift attribute**, not a property wrapper — it is much older than SwiftUI property wrappers.
- Xcode's Core Data code generation produces `@NSManaged` properties automatically from the `.xcdatamodeld` entity editor.
- Properties must use types representable in Objective-C. Pure Swift types (e.g., `Double?`, enums without `@objc`) cannot be used directly; use `NSNumber?` or a raw-value `Int16` enum with a computed wrapper instead.
- Do not provide a stored backing variable; Core Data injects the storage dynamically.
- `@NSManaged` properties may be accessed only on the owning context's queue. Access them inside `perform(_:)` / `performAndWait(_:)` when using a background context.

```swift
// Typical Xcode-generated subclass pattern
extension MyEntity {
    @nonobjc public class func fetchRequest() -> NSFetchRequest<MyEntity> {
        return NSFetchRequest<MyEntity>(entityName: "MyEntity")
    }

    @NSManaged public var name: String?
    @NSManaged public var createdAt: Date?
}
```

## Related

- [NSManagedObject](./nsmanagedobject.md)
- [NSEntityDescription](./nsentitydescription.md)
