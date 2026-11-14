# Adopting SwiftData for a Core Data app

Sample-project walkthrough (SampleTrips) for moving a Core Data app to SwiftData, or running both stacks side by side against one store file. The sample has three versions: Core Data, full SwiftData conversion, and a coexistence version (Core Data host app plus a SwiftData widget extension). Introduced in iOS 27.0 documentation.

## Signature / Usage

Each SwiftData model file mirrors the Core Data entity (same entity name, properties and relationships) and uses the `@Model` macro:

```swift
@Model class Trip {
    #Index<Trip>([\.name], [\.startDate], [\.endDate], [\.name, \.startDate, \.endDate])
    #Unique<Trip>([\.name, \.startDate, \.endDate])
    
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
    ...
```

Fetch with `@Query`, or with `fetch(_:)` and a `FetchDescriptor` plus `#Predicate`:

```swift
@Query(sort: \Trip.startDate, order: .forward)
var trips: [Trip]
```

```swift
var descriptor = FetchDescriptor<BucketListItem>()
let tripName = trip.name
descriptor.predicate = #Predicate { item in
    item.title.contains(searchText) && tripName == item.trip?.name
}
let filteredList = try? modelContext.fetch(descriptor)
```

Insert and delete through the model context:

```swift
if newTripSegment == .personal {
    newTrip = PersonalTrip(name: name, destination: destination, startDate: startDate, endDate: endDate, reason: reason)
} else if newTripSegment == .business {
    newTrip = BusinessTrip(name: name, destination: destination, startDate: startDate, endDate: endDate, perdiem: perdiem)
} else {
    newTrip = Trip(name: name, destination: destination, startDate: startDate, endDate: endDate)
}
modelContext.insert(newTrip)
```

```swift
modelContext.delete(trip)
```

Coexistence version: keep the `NSManagedObject` subclass names distinct from the SwiftData classes (this refers to the class name, not the entity name):

```swift
class CDTrip: NSManagedObject {...}
```

Point the Core Data store description at the same store file and enable persistent history manually (SwiftData enables it automatically, Core Data does not):

```swift
if let description = container.persistentStoreDescriptions.first {
    description.url = url
    ...
}
```

```swift
description.setOption(true as NSNumber, forKey: NSPersistentHistoryTrackingKey)
```

Detect changes written by the other stack by fetching SwiftData history after a saved token:

```swift
private func findTransactions(after historyToken: DefaultHistoryToken?, author: String) -> [DefaultHistoryTransaction] {...}
```

## Notes

- Both stacks must write to the same store file. The sample shares it through an App Group container; for an app that has `com.apple.security.application-groups`, SwiftData persists the store to the root of the app group container, and for an app that evolves from a version without an app group container, SwiftData copies the existing store there
- By default SwiftData persists to the app's Application Support directory
- The sample lists three ways for the main app to learn about widget changes: a shared `UserDefaults` suite, an extra attribute on the model, or consuming the store history that SwiftData generates by default. It chooses the history option with `HistoryDescriptor<DefaultHistoryTransaction>`, `DefaultHistoryToken` and `fetchHistory(_:)`
- The SwiftData-Inheritance version splits `Trip` into `PersonalTrip` and `BusinessTrip` subclasses
- The official page elides function bodies with `...` in `Trip`, `CDTrip`, `findTransactions` and the store description snippet; they are kept as published
- Before building the sample, set the developer team for all targets and replace the App Group identifier `group.com.example.apple-samplecode.SampleTrips` with one specific to your team
- Source: https://developer.apple.com/documentation/coredata/adopting-swiftdata-for-a-core-data-app (fetched 2026-11-14, DocC JSON of the iOS & iPadOS 27.3 beta SDK)

## Related

- [NSPersistentContainer](./nspersistentcontainer.md)
- [NSPersistentStoreDescription](./nspersistentstoredescription.md)
- [Persistent history](./persistent-history.md)
