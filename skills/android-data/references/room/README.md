# room

| Name | Description | Path |
|------|-------------|------|
| Async DAO Queries (Flow / suspend / LiveData) | Room disallows database access on the main thread; DAO methods return… | [async-queries.md](./async-queries.md) |
| RoomDatabase.Callback / setDriver(SQLiteDriver) | `RoomDatabase.Callback` hooks into database creation/open/destructive-migration lifecycle events… | [callback-driver.md](./callback-driver.md) |
| @ColumnInfo | Customizes the column name and other column-specific settings for a field within an `@Entity`. | [column-info.md](./column-info.md) |
| @Dao | Marks an interface or abstract class as a Data Access Object, providing methods to query, insert, update, and delete data. | [dao.md](./dao.md) |
| @Database | Marks an abstract class extending `RoomDatabase` as the main access point to the persisted database… | [database.md](./database.md) |
| @Delete | Defines a DAO method that deletes rows matching the given entities. | [delete.md](./delete.md) |
| @Embedded | Decomposes the fields of another class directly into the columns of the enclosing table, without creating a relationship. | [embedded.md](./embedded.md) |
| @Entity | Marks a class as a Room entity, representing a table in the database. | [entity.md](./entity.md) |
| @ForeignKey | Declares a foreign key constraint from an `@Entity` to another `@Entity`, via the `foreignKeys` parameter… | [foreign-key.md](./foreign-key.md) |
| @Fts4 / @DatabaseView | `@Fts4` backs an entity with a SQLite full-text-search virtual table; `@DatabaseView` backs a class with… | [fts-database-view.md](./fts-database-view.md) |
| @Ignore | Excludes a specific field (or, via `@Entity(ignoredColumns = [...])`, an inherited field) from being persisted. | [ignore.md](./ignore.md) |
| @Insert | Defines a DAO method that inserts its parameters into the database. | [insert.md](./insert.md) |
| Migration / Automated Migration Annotations | Handles Room database schema changes across versions, either manually with a `Migration` object or automatically… | [migration.md](./migration.md) |
| @PrimaryKey | Designates a field as the primary key that uniquely identifies each row of an `@Entity`. | [primary-key.md](./primary-key.md) |
| @Query | Writes a custom SQL statement and exposes it as a DAO method. The SQL is validated at compile time. | [query.md](./query.md) |
| @Relation | Defines a one-to-one, one-to-many, or (combined with `@Junction`) many-to-many relationship, resolved by Room… | [relation.md](./relation.md) |
| Room.databaseBuilder / RoomDatabase.Builder | Creates the singleton instance of a `@Database`-annotated class, configured via a chain of `RoomDatabase.Builder`… | [room-database-builder.md](./room-database-builder.md) |
| Migrating to Room 3.0 (androidx.room3) | Room 3.0 moves to a new `androidx.room3` package/artifact group, mandates KSP, and replaces the… | [room3-migration.md](./room3-migration.md) |
| Testing Room Databases | Room databases are tested with JUnit tests running on an Android device, typically against an in-memory… | [testing.md](./testing.md) |
| @Transaction | Ensures a DAO method that requires Room to run multiple queries executes atomically. | [transaction.md](./transaction.md) |
| @TypeConverter / @TypeConverters | `@TypeConverter` marks a method that converts a custom type to/from a type Room can persist;… | [type-converter.md](./type-converter.md) |
| @Update | Defines a DAO method that updates rows matching the given entities. | [update.md](./update.md) |
| @Upsert | Shortcut annotation that inserts an entity when there is no uniqueness conflict, or updates it when a conflict… | [upsert.md](./upsert.md) |
