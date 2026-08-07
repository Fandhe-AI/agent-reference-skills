# Migrating to Room 3.0 (androidx.room3)

Room 3.0 moves to a new `androidx.room3` package/artifact group, mandates KSP, and replaces the `SupportSQLiteDatabase` migration/callback APIs with `SQLiteConnection`-based ones; `room3-sqlite-wrapper` bridges old call sites during the transition.

## Signature / Usage

```kotlin
// build.gradle.kts
plugins {
    id("androidx.room3") version "3.0.1" apply false
}

dependencies {
    implementation("androidx.room3:room3-runtime:3.0.1")
    ksp("androidx.room3:room3-compiler:3.0.1")
}

room3 {
    schemaDirectory("$projectDir/schemas")
}
```

```kotlin
// Manual Migration: Room 2.x -> Room 3.0
// Room 2.x
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        database.execSQL("ALTER TABLE Song ADD COLUMN year INTEGER")
    }
}

// Room 3.0
val MIGRATION_1_2 = object : Migration(1, 2) {
    override suspend fun migrate(connection: SQLiteConnection) {
        connection.execSQL("ALTER TABLE Song ADD COLUMN year INTEGER")
    }
}
```

```kotlin
// room3-sqlite-wrapper: bridge a driver-based RoomDatabase back to SupportSQLiteDatabase
// Room 2.x
val writableDb = roomDatabase.openHelper.writableDatabase

// Room 3.0, via androidx.room3:room3-sqlite-wrapper
val supportDb = roomDatabase.getSupportWrapper()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `androidx.room3:room3-runtime` | Gradle artifact | Replaces `androidx.room:room-runtime`; classes live under `androidx.room3.*`. |
| `androidx.room3:room3-compiler` | KSP artifact | Only KSP is supported; KAPT/Java AP are removed in Room 3.0. |
| `androidx.room3` Gradle plugin | plugin id | Recommended `room3 { schemaDirectory(...) }` configuration replacing the KSP `arg()`-based schema export. |
| `androidx.room3:room3-sqlite-wrapper` | Gradle artifact | Provides `RoomDatabase.getSupportWrapper()` to obtain a `SupportSQLiteDatabase` from a driver-based `RoomDatabase`. |
| `Migration.migrate(connection: SQLiteConnection)` | suspend fun | Replaces `Migration.migrate(database: SupportSQLiteDatabase)`. |
| `RoomDatabase.Callback.onCreate/onOpen(connection: SQLiteConnection)` | fun | Replaces the `SupportSQLiteDatabase` overloads. |
| `AutoMigrationSpec.onPostMigrate(connection: SQLiteConnection)` | suspend fun | Replaces the `SupportSQLiteDatabase` overload. |
| `androidx.room3:room3-paging` / `PagingSourceDaoReturnTypeConverter` | artifact / `@DaoReturnTypeConverter` | Replaces the built-in Paging return-type support removed from `room3-runtime`; must be registered explicitly on `@Database`/`@Dao`. |
| `androidx.room3:room3-livedata` / `LiveDataDaoReturnTypeConverter` | artifact / `@DaoReturnTypeConverter` | Same pattern for `LiveData` DAO return types. |

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room3`) — distinct from the same-named concept in other skills.
- The new `androidx.room3` package/Maven-group is intentionally separate from `androidx.room` to avoid classpath collisions with libraries that still transitively depend on Room 2.x; the two can coexist during migration.
- KSP is mandatory for Room 3.0 even in Java-only codebases invoking Room, because the annotation processor is Kotlin-only; KAPT and Java AP are not supported.
- All DAO functions must be `suspend` unless they return a reactive type (`Flow`, `PagingSource`, `LiveData` via the corresponding `@DaoReturnTypeConverter`); blocking DAO functions are disallowed.
- `SupportSQLiteDatabase`/`Cursor`-based APIs are removed from `room3-runtime`; direct database access goes through `RoomDatabase.useReaderConnection` / `useWriterConnection` and `SQLiteConnection.usePrepared`, and `runInTransaction` is replaced by `withWriteTransaction`.
- `room3-sqlite-wrapper` is a transitional compatibility artifact (`RoomSupportSQLiteDatabase`/`RoomSupportSQLiteSession`/`RoomSupportSQLiteStatement`) intended to keep legacy `SupportSQLiteDatabase`-based call sites compiling; it is not a permanent replacement for adopting the `SQLiteConnection` API.
- Recommended migration path is incremental: adopt `SQLiteDriver` on Room 2.7.0+ first (see the Room KMP guide), then upgrade to Room 3.0 and switch imports from `androidx.room.*` to `androidx.room3.*`.
- Room 2.x is now in maintenance mode (bug-fix patch releases only); Room 3.0 is where new feature development happens.

## Related

- [Migration / Automated Migration Annotations](./migration.md)
- [Room.databaseBuilder / RoomDatabase.Builder](./room-database-builder.md)
- [RoomDatabase.Callback / setDriver(SQLiteDriver)](./callback-driver.md)
</content>
