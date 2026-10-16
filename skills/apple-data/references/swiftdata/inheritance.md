# Model inheritance

Article "Adopting inheritance in SwiftData": add flexibility to your models using class inheritance. A subclass adds properties and capabilities to an existing base `@Model` class, and queries, predicates, and history operations can operate across the hierarchy.

## Signature / Usage

```swift
@Model class Trip {
    @Attribute(.preserveValueOnDeletion)
    var name: String
    var destination: String

    @Attribute(.preserveValueOnDeletion)
    var startDate: Date

    @Attribute(.preserveValueOnDeletion)
    var endDate: Date

    @Relationship(deleteRule: .cascade, inverse: \BucketListItem.trip)
    var bucketList: [BucketListItem] = [BucketListItem]()

    @Relationship(deleteRule: .cascade, inverse: \LivingAccommodation.trip)
    var livingAccommodation: LivingAccommodation?
}

@available(iOS 26, *)
@Model class BusinessTrip: Trip {
    var purpose: String
    var itinerary: MeetingItinerary
    var expenseCode: String
    var perDiemRate: Double
    var mileageRate: Double

    @Relationship(deleteRule: .cascade, inverse: \DailyMilageRecord.trip)
    var milesDriven: [DailyMilageRecord]

    @Relationship(deleteRule: .cascade, inverse: \BusinessMeal.trip)
    var businessMeals: [BusinessMeal]

    @Relationship(deleteRule: .cascade, inverse: \ConferenceSession.trip)
    var sessionsAttended: [ConferenceSession]
}
```

Querying by class (predicate on a subclass type):

```swift
let classPredicate: Predicate<Trip>? = {
    switch tripKind.wrappedValue {
    case .all:
        return nil
    case .personal:
        return #Predicate { $0 is PersonalTrip }
    case .business:
        return #Predicate { $0 is BusinessTrip }
    }
}()
_trips = Query(filter: classPredicate, sort: \.startDate, order: .forward)
```

Deleting with subclasses:

```swift
func delete<T>(model: T.Type, where predicate: Predicate<T>? = nil, includeSubclasses: Bool = true) throws where T : PersistentModel
```

## Options / Props

`ModelContext.delete(model:where:includeSubclasses:)`

| Name | Type | Description |
|------|------|-------------|
| `model` | `T.Type` | The type of the model to remove |
| `predicate` | `Predicate<T>?` | The logical condition to use when determining if the context should remove a particular model. The default value is `nil` |
| `includeSubclasses` | `Bool` | Whether the context includes subclasses of the specified model type when evaluating models to remove. The default value is `true` |

## Notes

- Subclasses are declared with the `@Model` macro as in Swift class inheritance (`@Model class BusinessTrip: Trip`); the article's examples mark the subclasses `@available(iOS 26, *)`
- Use inheritance for a natural IS-A hierarchy (a `BusinessTrip` IS-A `Trip`). Avoid it when subclasses would share only common properties such as a name or dates (use protocol conformance instead)
- Deep query (fetch base-class data and filter): inheritance fits. Shallow query (only subclass-specific properties, never base properties): two separate models can be a better approach. Apps that do both kinds of search: inheritance may be a good fit
- A flatter alternative to inheritance is an enumeration capturing the kind, e.g. `enum Category: Codable { case personal(Reason); case business(perdiem: Double) }`
- `ModelContext.delete(model:where:includeSubclasses:)`: iOS 17.0+, macOS 14.0+, visionOS 1.0+, watchOS 10.0+; removal happens during the next save operation. Warning: if you do not provide a predicate, the context removes all models of the specified type from the persistent storage
- The article's own snippets contain typos and abbreviations (for example `@Model LivingAccommodation { ... }`, `Boolean`); they are reproduced as outlines, not compilable code

## Related

- [Model macro](./model-macro.md)
- [Relationship macro](./relationship-macro.md)
- [Predicate](./predicate.md)
- [ModelContext](./model-context.md)
- [Query macro](./query-macro.md)
