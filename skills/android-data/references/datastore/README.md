# datastore

| Name | Description | Path |
|------|-------------|------|
| DataStore | Interface providing type-safe, asynchronous, transactional access to persisted data (`data: Flow<T>`, `updateData`). | [datastore.md](./datastore.md) |
| DataStoreFactory / MultiProcessDataStoreFactory | Generic factory objects for creating a `DataStore<T>`, single-process or cross-process safe. | [datastore-factory.md](./datastore-factory.md) |
| preferencesDataStore / PreferenceDataStoreFactory | Creates and manages a `DataStore<Preferences>` (SharedPreferences-like, schema-less key-value store). | [preferences-datastore.md](./preferences-datastore.md) |
| Preferences / MutablePreferences | Map-like container keyed by `Preferences.Key<T>` used as the `T` in `DataStore<Preferences>`. | [preferences.md](./preferences.md) |
| stringPreferencesKey / intPreferencesKey / ... | Typed `Preferences.Key<T>` builder functions for reading/writing a single preference. | [preferences-keys.md](./preferences-keys.md) |
| edit | Extension function on `DataStore<Preferences>` for atomic, transactional preference updates. | [edit.md](./edit.md) |
| dataStore / Serializer (Proto & Typed DataStore) | Type-safe DataStore for a custom serialized object (Proto or `kotlinx.serialization`). | [proto-datastore.md](./proto-datastore.md) |
| DataMigration | Interface for migrating data into a DataStore before it is exposed to callers. | [data-migration.md](./data-migration.md) |
| SharedPreferencesMigration | Built-in `DataMigration<Preferences>` for migrating from `SharedPreferences`. | [shared-preferences-migration.md](./shared-preferences-migration.md) |
| CorruptionHandler / ReplaceFileCorruptionHandler | Recovery hook invoked when stored data fails to deserialize. | [corruption-handler.md](./corruption-handler.md) |
