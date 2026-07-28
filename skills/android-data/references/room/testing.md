# Testing Room Databases

Room databases are tested with JUnit tests running on an Android device, typically against an in-memory database instance.

## Signature / Usage

```kotlin
@RunWith(AndroidJUnit4::class)
class SimpleEntityReadWriteTest {
    private lateinit var userDao: UserDao
    private lateinit var db: TestDatabase

    @Before
    fun createDb() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        db = Room.inMemoryDatabaseBuilder(context, TestDatabase::class.java).build()
        userDao = db.getUserDao()
    }

    @After
    fun closeDb() {
        db.close()
    }

    @Test
    fun writeUserAndReadInList() {
        val user = TestUtil.createUser(3).apply { setName("george") }
        userDao.insert(user)
        val byName = userDao.findUsersByName("george")
        assertThat(byName.get(0), equalTo(user))
    }
}
```

Migration test:

```kotlin
@RunWith(AndroidJUnit4::class)
class MigrationTest {
    private val TEST_DB = "migration-test"

    @get:Rule
    val helper: MigrationTestHelper = MigrationTestHelper(
        InstrumentationRegistry.getInstrumentation(),
        MigrationDb::class.java.canonicalName,
        FrameworkSQLiteOpenHelperFactory()
    )

    @Test
    fun migrate1To2() {
        helper.createDatabase(TEST_DB, 1).apply {
            execSQL(/* insert test data */ "")
            close()
        }
        helper.runMigrationsAndValidate(TEST_DB, 2, true, MIGRATION_1_2)
    }
}
```

## Notes

- Distinct from the same-named page in the `android-background-work` skill's `workmanager` category, which covers testing `Worker`/`ListenableWorker` business logic, not Room database testing.
- This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concept in other skills.
- Prefer JUnit tests on an Android device over host-machine tests, since SQLite versions may differ between a dev machine and real devices.
- `Room.inMemoryDatabaseBuilder` gives more hermetic tests; in-memory databases don't support `createFromAsset()`/`createFromFile()` prepopulation.
- Migration tests use `MigrationTestHelper` from the `androidx.room:room-testing` artifact, combined with exported schema JSON files (`room { schemaDirectory(...) }` via the Room Gradle plugin, 2.6.0+).
- DAOs can be mocked directly in unit tests without instantiating a full database.
- Android Studio's Database Inspector (4.1+) supports live querying/editing of a running app's Room database.

## Related

- [Room.databaseBuilder / RoomDatabase.Builder](./room-database-builder.md)
- [Migration](./migration.md)
