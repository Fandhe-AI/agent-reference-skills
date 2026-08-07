# SwiftData

| Name | Description | Path |
|------|-------------|------|
| @Attribute | Customizes how SwiftData persists a stored property on a `@Model` class. Common uses include… | [attribute-macro.md](./attribute-macro.md) |
| DataStore / DataStoreBatching | Protocols that let SwiftData read and write model data without knowledge of the… | [data-store-protocol.md](./data-store-protocol.md) |
| FetchDescriptor | Describes the criteria, sort order, and additional configuration for fetching… | [fetch-descriptor.md](./fetch-descriptor.md) |
| History tracking (HistoryDescriptor / HistoryToken / HistoryTransaction / HistoryChange / HistoryObserver) | Types for fetching and observing time-based changes to persisted model data, used… | [history-tracking.md](./history-tracking.md) |
| @Index | Specifies the key-paths that SwiftData uses to create one or more indices for a… | [index-macro.md](./index-macro.md) |
| ModelConfiguration | Describes the storage configuration for an app's schema or a specific group of… | [model-configuration.md](./model-configuration.md) |
| ModelContainer | Manages an app's schema and model storage configuration. Acts as the bridge… | [model-container.md](./model-container.md) |
| ModelContext | Handles fetching, inserting, deleting, and saving persistent models. Changes… | [model-context.md](./model-context.md) |
| ModelDocument | A document type that uses SwiftData to manage its storage, for building… | [model-document.md](./model-document.md) |
| @Model | Converts a Swift class into a stored model managed by SwiftData. At build time… | [model-macro.md](./model-macro.md) |
| PersistentModel | Protocol that enables SwiftData to manage a Swift class as a stored model.… | [persistent-model.md](./persistent-model.md) |
| Predicate / #Predicate | `Predicate<each Input>` (Foundation) represents a type-safe, serializable logical… | [predicate.md](./predicate.md) |
| @Query | SwiftUI property-wrapper macro that fetches all instances of a model type and… | [query-macro.md](./query-macro.md) |
| Query | A `DynamicProperty` struct that fetches models using specified criteria and keeps… | [query-struct.md](./query-struct.md) |
| @Relationship | Specifies the options SwiftData uses to manage a persistent relationship between… | [relationship-macro.md](./relationship-macro.md) |
| ResultsObserver | Observes and tracks changes to a collection of persistent models in a model… | [results-observer.md](./results-observer.md) |
| SchemaMigrationPlan | Protocol that describes the evolution of a schema across versions and the… | [schema-migration-plan.md](./schema-migration-plan.md) |
| Schema | Maps model classes to persistent storage and handles migration of data between… | [schema.md](./schema.md) |
| SortDescriptor | A serializable description of how to sort a collection of values by a key path.… | [sort-descriptor.md](./sort-descriptor.md) |
| @Transient | Excludes a stored property from persistence. SwiftData will not read from or write… | [transient-macro.md](./transient-macro.md) |
| @Unique | Specifies the key-paths that SwiftData uses to enforce uniqueness of model… | [unique-macro.md](./unique-macro.md) |
| VersionedSchema | Protocol that describes a specific version of a schema, listing the model types… | [versioned-schema.md](./versioned-schema.md) |
