# SwiftData

| Name | Description | Path |
|------|-------------|------|
| @Attribute | Customizes how SwiftData persists a stored property on a `@Model` class. Common uses include enforcing uniqueness and renaming attributes across schema versions. | [attribute-macro.md](./attribute-macro.md) |
| DataStore / DataStoreBatching | Protocols that let SwiftData read and write model data without knowledge of the underlying storage mechanism, enabling custom persistence backends beyond the built-in Core Data-based `DefaultStore`. | [data-store-protocol.md](./data-store-protocol.md) |
| DefaultStore | A data store that uses Core Data as its undelying storage mechanism. | [default-store.md](./default-store.md) |
| SwiftDataError / DataStoreError | `SwiftDataError` is a type that describes a SwiftData error. `DataStoreError` is a type that describes a data store error. | [errors.md](./errors.md) |
| FetchDescriptor | Describes the criteria, sort order, and additional configuration for fetching persistent models. | [fetch-descriptor.md](./fetch-descriptor.md) |
| History tracking (HistoryDescriptor / HistoryToken / HistoryTransaction / HistoryChange / HistoryObserver) | Types for fetching and observing time-based changes to persisted model data, used to sync a local store with remote changes or replay recent edits. | [history-tracking.md](./history-tracking.md) |
| @Index | Specifies the key-paths that SwiftData uses to create one or more indices for a model, speeding up fetches and predicate filtering. Two overloads exist: one for binary indices only, and one that supports either binary or R-tree indices. | [index-macro.md](./index-macro.md) |
| Model inheritance | Article "Adopting inheritance in SwiftData": add flexibility to your models using class inheritance. A subclass adds properties and capabilities to an existing base `@Model` class, and queries, predicates, and history operations can operate across the hierarchy. | [inheritance.md](./inheritance.md) |
| ModelConfiguration | Describes the storage configuration for an app's schema or a specific group of models, including on-disk location, in-memory mode, and CloudKit options. | [model-configuration.md](./model-configuration.md) |
| ModelContainer | Manages an app's schema and model storage configuration. Acts as the bridge between model contexts and the persistent store; handles fetch coordination, schema migration, and optional CloudKit syncing. | [model-container.md](./model-container.md) |
| ModelContext | Handles fetching, inserting, deleting, and saving persistent models. Changes exist in memory until explicitly saved or autosave fires. | [model-context.md](./model-context.md) |
| ModelDocument | A document type that uses SwiftData to manage its storage, for building document-based apps around a `@Model` schema. | [model-document.md](./model-document.md) |
| @Model | Converts a Swift class into a stored model managed by SwiftData. At build time the macro adds conformance to `PersistentModel` and `Observable`. | [model-macro.md](./model-macro.md) |
| PersistentModel | Protocol that enables SwiftData to manage a Swift class as a stored model. Synthesized automatically by `@Model`; rarely implemented manually. | [persistent-model.md](./persistent-model.md) |
| Predicate / #Predicate | `Predicate<each Input>` (Foundation) represents a type-safe, serializable logical condition. The `#Predicate` macro creates one from a closure at compile time. | [predicate.md](./predicate.md) |
| @Query | SwiftUI property-wrapper macro that fetches all instances of a model type and keeps the view in sync with the underlying store. | [query-macro.md](./query-macro.md) |
| Query | A `DynamicProperty` struct that fetches models using specified criteria and keeps them in sync with the store. The `@Query` macro produces a `Query<Element, Result>` under the hood. | [query-struct.md](./query-struct.md) |
| @Relationship | Specifies the options SwiftData uses to manage a persistent relationship between two model classes, including the delete rule and optional inverse. | [relationship-macro.md](./relationship-macro.md) |
| ResultsObserver | Observes and tracks changes to a collection of persistent models in a model context, keeping a fetched result set (optionally sectioned) synchronized as local, remote, or CloudKit-sync changes occur. | [results-observer.md](./results-observer.md) |
| Schema | Maps model classes to persistent storage and handles migration of data between releases. | [schema.md](./schema.md) |
| SchemaMigrationPlan | Protocol that describes the evolution of a schema across versions and the migration stages between them. Pass the conforming type to `ModelContainer` to enable automatic migration. | [schema-migration-plan.md](./schema-migration-plan.md) |
| SectionedResults / ResultsSection | `SectionedResults` is a `RandomAccessCollection` of `ResultsSection` instances representing sectioned query results. Each `ResultsSection` is a section of fetched results grouped by a common `sectionBy` key path value. | [sectioned-results.md](./sectioned-results.md) |
| SortDescriptor | A serializable description of how to sort a collection of values by a key path. Used with `FetchDescriptor` and `@Query` in SwiftData. | [sort-descriptor.md](./sort-descriptor.md) |
| @Transient | Excludes a stored property from persistence. SwiftData will not read from or write to the property's value in the persistent store. | [transient-macro.md](./transient-macro.md) |
| @Unique | Specifies the key-paths that SwiftData uses to enforce uniqueness of model instances. Supports single-attribute constraints, compound constraints across multiple attributes, or a combination. | [unique-macro.md](./unique-macro.md) |
| VersionedSchema | Protocol that describes a specific version of a schema, listing the model types it contains and a version identifier. Used with `SchemaMigrationPlan` to manage schema evolution. | [versioned-schema.md](./versioned-schema.md) |
