# SwiftData

| Name | Description | Path |
|------|-------------|------|
| @Model | Converts a Swift class into a SwiftData-managed persistent model | [model-macro.md](./model-macro.md) |
| PersistentModel | Protocol synthesized by @Model; provides identity, context, and change tracking | [persistent-model.md](./persistent-model.md) |
| ModelContainer | Manages schema and storage configuration; root of the SwiftData stack | [model-container.md](./model-container.md) |
| ModelContext | Fetches, inserts, deletes, and saves persistent models | [model-context.md](./model-context.md) |
| @Query | SwiftUI macro that fetches model instances and keeps views in sync | [query-macro.md](./query-macro.md) |
| Query | DynamicProperty struct backing @Query; supports programmatic construction | [query-struct.md](./query-struct.md) |
| Predicate / #Predicate | Type-safe compile-time predicate for filtering model fetches | [predicate.md](./predicate.md) |
| FetchDescriptor | Describes fetch criteria, sort order, limit, and offset | [fetch-descriptor.md](./fetch-descriptor.md) |
| SortDescriptor | Serializable description of how to sort fetched results by a key path | [sort-descriptor.md](./sort-descriptor.md) |
| Schema | Maps model classes to persistent storage; carries version information | [schema.md](./schema.md) |
| ModelConfiguration | Configures storage location, in-memory mode, and CloudKit options | [model-configuration.md](./model-configuration.md) |
| @Attribute | Customizes persistence behavior of a model property (unique, external storage, etc.) | [attribute-macro.md](./attribute-macro.md) |
| @Relationship | Configures delete rules and inverse for a model relationship | [relationship-macro.md](./relationship-macro.md) |
| @Transient | Excludes a stored property from persistence | [transient-macro.md](./transient-macro.md) |
| VersionedSchema | Protocol describing a named schema snapshot for migration | [versioned-schema.md](./versioned-schema.md) |
| SchemaMigrationPlan | Protocol orchestrating lightweight and custom migrations between schema versions | [schema-migration-plan.md](./schema-migration-plan.md) |
