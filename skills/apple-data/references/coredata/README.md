# Core Data

| Name | Description | Path |
|------|-------------|------|
| NSManagedObject | Base class for all Core Data model objects; generic property storage with change tracking | [nsmanagedobject.md](./nsmanagedobject.md) |
| NSManagedObjectContext | In-memory scratchpad that tracks and persists changes to a managed object graph | [nsmanagedobjectcontext.md](./nsmanagedobjectcontext.md) |
| NSManagedObjectModel | Programmatic representation of a `.xcdatamodeld` schema file | [nsmanagedobjectmodel.md](./nsmanagedobjectmodel.md) |
| NSPersistentContainer | Convenience wrapper that encapsulates the full Core Data stack | [nspersistentcontainer.md](./nspersistentcontainer.md) |
| NSPersistentStoreCoordinator | Mediates between managed object contexts and one or more persistent stores | [nspersistentstorecoordinator.md](./nspersistentstorecoordinator.md) |
| NSPersistentStoreDescription | Configuration object for creating and loading a persistent store | [nspersistentstoredescription.md](./nspersistentstoredescription.md) |
| NSFetchRequest | Describes entity, predicate, sort order, and result shape for a Core Data query | [nsfetchrequest.md](./nsfetchrequest.md) |
| NSEntityDescription | Describes an entity's name, class, attributes, and relationships in the data model | [nsentitydescription.md](./nsentitydescription.md) |
| NSPredicate | Logical condition used to filter Core Data fetch results or in-memory collections | [nspredicate.md](./nspredicate.md) |
| NSSortDescriptor | Specifies sort order for a fetch request by key path and direction | [nssortdescriptor.md](./nssortdescriptor.md) |
| NSFetchedResultsController | Manages fetch results and notifies a delegate when the result set changes | [nsfetchedresultscontroller.md](./nsfetchedresultscontroller.md) |
| NSBatchInsertRequest | Bulk-inserts records directly into the SQLite store without loading objects into memory | [nsbatchinsertrequest.md](./nsbatchinsertrequest.md) |
| NSBatchDeleteRequest | Bulk-deletes records directly at the store level without loading objects into memory | [nsbatchdeleterequest.md](./nsbatchdeleterequest.md) |
| @FetchRequest (SwiftUI) | SwiftUI property wrapper for live-updating Core Data fetch results in a view | [fetchrequest-swiftui.md](./fetchrequest-swiftui.md) |
| @NSManaged | Swift attribute for `NSManagedObject` subclass properties; storage provided by Core Data at runtime | [nsmanaged.md](./nsmanaged.md) |
