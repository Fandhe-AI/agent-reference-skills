# room

> This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concepts in other skills.

| Name | Description | Path |
|------|-------------|------|
| @Entity | Marks a class as a Room entity, representing a table in the database. | [entity.md](./entity.md) |
| @PrimaryKey | Designates a field as the primary key of an `@Entity`. | [primary-key.md](./primary-key.md) |
| @ColumnInfo | Customizes the column name and settings for an entity field. | [column-info.md](./column-info.md) |
| @Ignore | Excludes a field from being persisted. | [ignore.md](./ignore.md) |
| @Embedded | Decomposes another class's fields directly into the enclosing table's columns. | [embedded.md](./embedded.md) |
| @Dao | Marks an interface/abstract class as a Data Access Object. | [dao.md](./dao.md) |
| @Query | Writes a compile-time-validated custom SQL statement as a DAO method. | [query.md](./query.md) |
| @Insert | Defines a DAO method that inserts entities into the database. | [insert.md](./insert.md) |
| @Update | Defines a DAO method that updates rows matching given entities. | [update.md](./update.md) |
| @Delete | Defines a DAO method that deletes rows matching given entities. | [delete.md](./delete.md) |
| @Upsert | Inserts an entity, or updates it on a uniqueness conflict. | [upsert.md](./upsert.md) |
| @Transaction | Runs a multi-query DAO method atomically. | [transaction.md](./transaction.md) |
| @Database | Marks the `RoomDatabase` subclass holding entities, views, and migrations. | [database.md](./database.md) |
| Room.databaseBuilder / RoomDatabase.Builder | Builds the `@Database` singleton instance and configures migrations, converters, prepopulation. | [room-database-builder.md](./room-database-builder.md) |
| Migration / Auto-Migration Annotations | Manual `Migration` objects and `@AutoMigration` / `@RenameTable` / `@RenameColumn` / `@DeleteColumn` / `@DeleteTable` for schema upgrades. | [migration.md](./migration.md) |
| @TypeConverter / @TypeConverters | Converts custom types to/from types Room can persist. | [type-converter.md](./type-converter.md) |
| @Relation | Defines one-to-one/one-to-many/many-to-many relationships resolved via separate queries. | [relation.md](./relation.md) |
| @Fts4 / @DatabaseView | Full-text-search virtual tables and read-only SQL views. | [fts-database-view.md](./fts-database-view.md) |
| Async DAO Queries (Flow / suspend / LiveData) | Asynchronous return types for one-shot and observable DAO queries. | [async-queries.md](./async-queries.md) |
| Testing Room Databases | In-memory database testing, migration testing, DAO mocking. | [testing.md](./testing.md) |
