# Testing Room Databases

Room databases are tested with JUnit tests running on an Android device, typically against an in-memory database instance.

## Signature / Usage

```kotlin
import androidx.sqlite.driver.bundled.BundledSQLiteDriver

@RunWith(AndroidJUnit4::class)
class SimpleEntityReadWriteTest {
    private lateinit var userDao: UserDao
    private lateinit var db: TestDatabase

    @Before
    fun createDb() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        db = Room.inMemoryDatabaseBuilder<TestDatabase>(context)
            .setDriver(BundledSQLiteDriver())
            .build()
        userDao = db.userDao()
    }

    @After
    fun closeDb() {
        db.close()
    }

    @Test
    fun writeUserAndReadInList() = runTest {
        val user = TestUtil.createUser(3).apply { setName("george") }
        userDao.insert(user)
        val byName = userDao.findUsersByName("george")
        assertEquals(byName.single(), user)
    }
}
```

Migration test (Room 3.0, `androidx.room3.testing.MigrationTestHelper`):

```kotlin
@RunWith(AndroidJUnit4::class)
class MigrationTest {
    private val TEST_DB = "migration-test"

    @get:Rule
    val helper = MigrationTestHelper(
        instrumentation = InstrumentationRegistry.getInstrumentation(),
        databaseClass = MigrationDb::class,
        driver = AndroidSQLiteDriver(),
        file = InstrumentationRegistry.getInstrumentation().targetContext.getDatabasePath(TEST_DB),
    )

    @Test
    fun migrate1To2() = runTest {
        val connection = helper.createDatabase(1)
        connection.execSQL(/* insert test data */ "")
        connection.close()

        val migrated = helper.runMigrationsAndValidate(2, listOf(MIGRATION_1_2))
        migrated.close()
    }
}
```

## Notes

- Distinct from the same-named page in the `android-background-work` skill's `workmanager` category, which covers testing `Worker`/`ListenableWorker` business logic, not Room database testing.
- This is the Android Room persistence library (Kotlin, `androidx.room3`, Room 3.0+) — distinct from the same-named concept in other skills.
- Room 3.0 changed `MigrationTestHelper` to a `SQLiteConnection`-based API (`androidx.room3:room3-testing`, package `androidx.room3.testing`): `createDatabase()` / `runMigrationsAndValidate()` return `SQLiteConnection` instances (rather than the Room 2.x `SupportSQLiteDatabase`), and the helper takes a `driver: SQLiteDriver` and `file: File` instead of an `OpenHelperFactory`. All `Migration`/DAO calls in tests run inside `suspend` functions (`runTest { ... }`). See the [Room 2.x → 3.0 migration guide](https://developer.android.com/training/data-storage/room/migration-2-to-3).
- Room 3.0 also added `SQLiteDriver`-based, `Context`-free overloads of `Room.databaseBuilder` / `Room.inMemoryDatabaseBuilder`, enabling JVM host-machine tests (via `BundledSQLiteDriver`) without an emulator; on-device `AndroidJUnit4` tests remain the default recommendation since SQLite versions may still differ between platforms when not using `BundledSQLiteDriver`.
- `Room.inMemoryDatabaseBuilder` gives more hermetic tests; in-memory databases don't support `createFromAsset()`/`createFromFile()` prepopulation.
- Migration tests use `MigrationTestHelper` combined with exported schema JSON files (`room3 { schemaDirectory(...) }` via the Room Gradle plugin).
- DAOs can be mocked directly in unit tests without instantiating a full database.
- Android Studio's Database Inspector (4.1+) supports live querying/editing of a running app's Room database.

## Related

- [Room.databaseBuilder / RoomDatabase.Builder](./room-database-builder.md)
- [Migration](./migration.md)
- [Migrating to Room 3.0 (androidx.room3)](./room3-migration.md)
