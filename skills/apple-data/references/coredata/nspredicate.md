# NSPredicate

Defines a logical condition for filtering objects. Used as `NSFetchRequest.predicate` to constrain Core Data queries, or to filter in-memory collections.

## Signature / Usage

```swift
class NSPredicate : NSObject

// Format string (most common in Core Data)
let predicate = NSPredicate(format: "status == %@ AND age > %d", "active", 18)

// Always-true / always-false
let all = NSPredicate(value: true)

// Block-based (in-memory only; cannot be translated to SQL)
let predicate = NSPredicate { object, _ in
    (object as? MyEntity)?.score ?? 0 > 100
}
```

## Notes

- iOS 3.0+, macOS 10.4+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+ (Foundation framework)
- Format string arguments: `%@` for objects/strings, `%d` for integers, `%f` for floats, `%K` for key paths.
- Case/diacritic modifiers: `[c]` case-insensitive, `[d]` diacritic-insensitive, `[cd]` both.
- Block-based predicates cannot be used with SQLite stores — only with in-memory stores or in-memory filtering.
- Combine predicates with `NSCompoundPredicate` (`andPredicateWithSubpredicates:`, `orPredicateWithSubpredicates:`).

| Format operator | Example |
|----------------|---------|
| `==`, `!=`, `<`, `>`, `<=`, `>=` | `"age >= 18"` |
| `LIKE` | `"name LIKE 'J*'"` |
| `CONTAINS[cd]` | `"title CONTAINS[cd] 'swift'"` |
| `BEGINSWITH`, `ENDSWITH` | `"email ENDSWITH '@apple.com'"` |
| `IN` | `"status IN {'active', 'pending'}"` |
| `BETWEEN` | `"price BETWEEN {10, 50}"` |
| `ANY`, `ALL`, `NONE` | `"ANY tags.name == 'swift'"` |

```swift
fetchRequest.predicate = NSPredicate(format: "title CONTAINS[cd] %@", searchText)
```

## Related

- [NSFetchRequest](./nsfetchrequest.md)
- [NSSortDescriptor](./nssortdescriptor.md)
