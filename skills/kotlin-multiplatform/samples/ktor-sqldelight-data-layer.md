---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-ktor-sqldelight.html
---

# Create a multiplatform app using Ktor and SQLDelight

Build a shared data layer (Ktor client, kotlinx.serialization, SQLDelight cache, Koin-injected drivers) consumed by native Android and iOS UIs.

`gradle/libs.versions.toml`:

```toml
[versions]
agp = "9.0.1"
material3 = "1.11.0-alpha07"
# ...
coroutinesVersion = "1.11.0"
dateTimeVersion = "0.8.0"
koin = "4.2.2"
ktor = "3.5.2"
sqlDelight = "2.3.2"
```

```toml
[libraries]
# ...
koin-core = { module = "io.insert-koin:koin-core", version.ref = "koin" }
koin-androidx-compose = { module = "io.insert-koin:koin-androidx-compose", version.ref = "koin" }
kotlinx-coroutines-core = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "coroutinesVersion" }
kotlinx-datetime = { module = "org.jetbrains.kotlinx:kotlinx-datetime", version.ref = "dateTimeVersion" }
ktor-client-android = { module = "io.ktor:ktor-client-android", version.ref = "ktor" }
ktor-client-content-negotiation = { module = "io.ktor:ktor-client-content-negotiation", version.ref = "ktor" }
ktor-client-core = { module = "io.ktor:ktor-client-core", version.ref = "ktor" }
ktor-client-darwin = { module = "io.ktor:ktor-client-darwin", version.ref = "ktor" }
ktor-serialization-kotlinx-json = { module = "io.ktor:ktor-serialization-kotlinx-json", version.ref = "ktor" }
sqldelight-android-driver = { module = "app.cash.sqldelight:android-driver", version.ref = "sqlDelight" }
sqldelight-native-driver = { module = "app.cash.sqldelight:native-driver", version.ref = "sqlDelight" }
sqldelight-runtime = { module = "app.cash.sqldelight:runtime", version.ref = "sqlDelight" }
```

```toml
[plugins]
# ...
kotlinxSerialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "kotlin" }
sqldelight = { id = "app.cash.sqldelight", version.ref = "sqlDelight" }
```

`sharedLogic/build.gradle.kts`:

```kotlin
plugins {
    // ...
    alias(libs.plugins.kotlinxSerialization)
    alias(libs.plugins.sqldelight)
}
```

```kotlin
kotlin {
    // ...

    sourceSets {
        commonMain.dependencies {
            implementation(libs.kotlinx.coroutines.core)
            implementation(libs.ktor.client.core)
            implementation(libs.ktor.client.content.negotiation)
            implementation(libs.ktor.serialization.kotlinx.json)
            implementation(libs.sqldelight.runtime)
            implementation(libs.kotlinx.datetime)
            implementation(libs.koin.core)
        }
        androidMain.dependencies {
            implementation(libs.ktor.client.android)
            implementation(libs.sqldelight.android.driver)
        }
        iosMain.dependencies {
            implementation(libs.ktor.client.darwin)
            implementation(libs.sqldelight.native.driver)
        }
    }
}
```

```kotlin
sqldelight {
    databases {
        create("AppDatabase") {
            packageName.set("com.jetbrains.spacetutorial.cache")
        }
    }
}
```

Data model `sharedLogic/src/commonMain/kotlin/com/jetbrains/spacetutorial/entity/Entity.kt` (lines 3-48 of the tutorial's `multiplatform-tutorial/Entity.kt` snippet):

```kotlin
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toInstant
import kotlinx.datetime.toLocalDateTime
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlin.time.Instant

@Serializable
data class LaunchStatus(
    @SerialName("id")
    val id: Int,
    @SerialName("name")
    val name: String,
    @SerialName(value = "description")
    val description: String
)

@Serializable
data class LaunchListResponse(
    @SerialName("results")
    val results: List<RocketLaunch>,
)

@Serializable
data class RocketLaunch(
    @SerialName("id")
    val id: String,
    @SerialName("name")
    val missionName: String,
    @SerialName("net")
    val launchDateUTC: String,
    @SerialName(value = "image")
    val image: Image,
    @SerialName(value = "status")
    val status: LaunchStatus,
) {
    var launchYear = Instant.parse(launchDateUTC).toLocalDateTime(TimeZone.UTC).year
}

@Serializable
data class Image(
    @SerialName("thumbnail_url")
    val small: String,
    @SerialName("image_url")
    val large: String,
)
```

SQL queries in `sharedLogic/src/commonMain/sqldelight/com/jetbrains/spacetutorial/cache/AppDatabase.sq`:

```sql
import kotlin.Boolean;

CREATE TABLE Launch (
    flightNumber TEXT NOT NULL,
    missionName TEXT NOT NULL,
    launchDateUTC TEXT NOT NULL,
    imageSmall TEXT NOT NULL,
    imageLarge TEXT NOT NULL,
    statusId INTEGER NOT NULL,
    statusName TEXT NOT NULL,
    statusDescription TEXT NOT NULL
);

insertLaunch:
INSERT INTO Launch(flightNumber, missionName, launchDateUTC, imageSmall, imageLarge, statusId, statusName, statusDescription)
VALUES(?, ?, ?, ?, ?, ?, ?, ?);

removeAllLaunches:
DELETE FROM Launch;

selectAllLaunchesInfo:
SELECT Launch.*
FROM Launch;
```

```shell
./gradlew generateCommonMainAppDatabaseInterface
```

Platform database drivers:

```kotlin
package com.jetbrains.spacetutorial.cache

import app.cash.sqldelight.db.SqlDriver

interface DatabaseDriverFactory {
    fun createDriver(): SqlDriver
}
```

```kotlin
package com.jetbrains.spacetutorial.cache

import android.content.Context
import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.android.AndroidSqliteDriver

class AndroidDatabaseDriverFactory(private val context: Context) : DatabaseDriverFactory {
    override fun createDriver(): SqlDriver {
        return AndroidSqliteDriver(AppDatabase.Schema, context, "launch.db")
    }
}
```

```kotlin
package com.jetbrains.spacetutorial.cache

import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.native.NativeSqliteDriver

class IOSDatabaseDriverFactory : DatabaseDriverFactory {
    override fun createDriver(): SqlDriver {
        return NativeSqliteDriver(AppDatabase.Schema, "launch.db")
    }
}
```

Cache logic:

```kotlin
import com.jetbrains.spacetutorial.entity.Image
import com.jetbrains.spacetutorial.entity.LaunchStatus
import com.jetbrains.spacetutorial.entity.RocketLaunch

internal class Database(databaseDriverFactory: DatabaseDriverFactory) {
    private val database = AppDatabase(databaseDriverFactory.createDriver())
    private val dbQuery = database.appDatabaseQueries

    internal fun getAllLaunches(): List<RocketLaunch> {
        return dbQuery.selectAllLaunchesInfo(::mapLaunchSelecting).executeAsList()
    }

    private fun mapLaunchSelecting(
        flightNumber: String,
        missionName: String,
        launchDateUTC: String,
        imageSmall: String,
        imageLarge: String,
        statusId: Long,
        statusName: String,
        statusDescription: String
    ): RocketLaunch {
        return RocketLaunch(
            id = flightNumber,
            missionName = missionName,
            launchDateUTC = launchDateUTC,
            image = Image(
                small = imageSmall,
                large = imageLarge
            ),
            status = LaunchStatus(
                id = statusId.toInt(),
                name = statusName,
                description = statusDescription
            )
        )
    }
}
```

```kotlin
internal class Database(databaseDriverFactory: DatabaseDriverFactory) {
    // ...

    internal fun clearAndCreateLaunches(launches: List<RocketLaunch>) {
        dbQuery.transaction {
            dbQuery.removeAllLaunches()
            launches.forEach { launch ->
                dbQuery.insertLaunch(
                    flightNumber = launch.id,
                    missionName = launch.missionName,
                    launchDateUTC = launch.launchDateUTC,
                    imageSmall = launch.image.small,
                    imageLarge = launch.image.large,
                    statusId = launch.status.id.toLong(),
                    statusName = launch.status.name,
                    statusDescription = launch.status.description,
                )
            }
        }
    }
}
```

API service:

```kotlin
package com.jetbrains.spacetutorial.network

import io.ktor.client.HttpClient
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json

class SpaceApi {
    private val httpClient = HttpClient {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                useAlternativeNames = false 
            })
        }
    }
}
```

```kotlin
import com.jetbrains.spacetutorial.entity.RocketLaunch
import com.jetbrains.spacetutorial.entity.LaunchListResponse
import io.ktor.client.request.get
import io.ktor.client.call.body

class SpaceApi {
    // ...
    
    suspend fun getAllLaunches(): List<RocketLaunch> {
        return (httpClient.get("https://lldev.thespacedevs.com/2.3.0/launches/previous/?mode=list&format=json").body() as LaunchListResponse).results
    }
}
```

SDK facade:

```kotlin
package com.jetbrains.spacetutorial

import com.jetbrains.spacetutorial.cache.Database
import com.jetbrains.spacetutorial.cache.DatabaseDriverFactory
import com.jetbrains.spacetutorial.network.SpaceApi

class SpaceSDK(databaseDriverFactory: DatabaseDriverFactory, val api: SpaceApi) { 
    private val database = Database(databaseDriverFactory)
}
```

```kotlin
import com.jetbrains.spacetutorial.entity.RocketLaunch

class SpaceSDK(databaseDriverFactory: DatabaseDriverFactory, val api: SpaceApi) {
    // ...

    @Throws(Exception::class)
    suspend fun getLaunches(forceReload: Boolean): List<RocketLaunch> {
        val cachedLaunches = database.getAllLaunches()
        return if (cachedLaunches.isNotEmpty() && !forceReload) {
            cachedLaunches
        } else {
            api.getAllLaunches().also {
                database.clearAndCreateLaunches(it)
            }
        }
    }
}
```

Android: Koin module and application class.

```kotlin
import com.jetbrains.spacetutorial.cache.AndroidDatabaseDriverFactory
import com.jetbrains.spacetutorial.network.SpaceApi
import org.koin.android.ext.koin.androidContext
import org.koin.dsl.module

val appModule = module {
    single<SpaceApi> { SpaceApi() }
    single<SpaceSDK> {
        SpaceSDK(
            databaseDriverFactory = AndroidDatabaseDriverFactory(androidContext()),
            api = get()
        )
    }
}
```

```kotlin
package com.jetbrains.spacetutorial

import android.app.Application
import org.koin.android.ext.koin.androidContext
import org.koin.core.context.GlobalContext.startKoin

class MainApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        startKoin {
            androidContext(this@MainApplication)
            modules(appModule)
        }
    }
}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <!--...-->
</manifest>
```

Android view model:

```kotlin
package com.jetbrains.spacetutorial

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.jetbrains.spacetutorial.entity.RocketLaunch

class RocketLaunchViewModel(private val sdk: SpaceSDK) : ViewModel() {
    private val _state = mutableStateOf(RocketLaunchScreenState())
    val state: State<RocketLaunchScreenState> = _state

}

data class RocketLaunchScreenState(
    val isLoading: Boolean = false,
    val launches: List<RocketLaunch> = emptyList()
)
```

```kotlin
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

class RocketLaunchViewModel(private val sdk: SpaceSDK) : ViewModel() {
    //...
    
    fun loadLaunches() {
        viewModelScope.launch { 
            _state.value = _state.value.copy(isLoading = true, launches = emptyList())
            try {
                val launches = sdk.getLaunches(forceReload = true)
                _state.value = _state.value.copy(isLoading = false, launches = launches)
            } catch (_: Exception) {
                _state.value = _state.value.copy(isLoading = false, launches = emptyList())
            }
        }
    }
}
```

iOS: Koin helper in `sharedLogic/src/iosMain/kotlin/com/jetbrains/spacetutorial/KoinHelper.kt`:

```kotlin
package com.jetbrains.spacetutorial

import org.koin.core.component.KoinComponent
import com.jetbrains.spacetutorial.entity.RocketLaunch
import org.koin.core.component.inject

class KoinHelper : KoinComponent {
    private val sdk: SpaceSDK by inject<SpaceSDK>()

    suspend fun getLaunches(forceReload: Boolean): List<RocketLaunch> {
        return sdk.getLaunches(forceReload = forceReload)
    }
}
```

```kotlin
import com.jetbrains.spacetutorial.cache.IOSDatabaseDriverFactory
import com.jetbrains.spacetutorial.network.SpaceApi
import org.koin.core.context.startKoin
import org.koin.dsl.module

fun initKoin() {
    startKoin {
        modules(module {
            single<SpaceApi> { SpaceApi() }
            single<SpaceSDK> {
                SpaceSDK(
                    databaseDriverFactory = IOSDatabaseDriverFactory(), api = get()
                )
            }
        })
    }
}
```

iOS: load data in the SwiftUI view model and start Koin in the app entry point.

```Swift
func loadLaunches(forceReload: Bool) {
    Task {
        do {
            self.launches = .loading
            let launches = try await helper.getLaunches(forceReload: forceReload)
            self.launches = .result(launches)
        } catch {
            self.launches = .error(error.localizedDescription)
        }
    }
}
```

```Swift
import SwiftUI
import SharedLogic

@main
struct iOSApp: App {
    init() {
        KoinHelperKt.doInitKoin()
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView(viewModel: .init())
        }
    }
}
```

## Notes

- Wizard values: Name `SpaceTutorial`, Project ID `com.jetbrains.spacetutorial`, Android and iOS targets, **Do not share UI** for iOS. Template and final project: `https://github.com/kotlin-hands-on/kmm-networking-and-data-storage` (`final` branch).
- Versions `agp = "9.0.1"` and `material3 = "1.11.0-alpha07"` are copied as written in the tutorial's `[versions]` block (a pre-release Material 3 build; not a stable pin).
- The `[libraries]` block is tagged `toml` and its `...` placeholder is written as `# ...` (a valid TOML comment); the source page shows an untagged block with a bare `...`.
- Marking `getLaunches` with `@Throws(Exception::class)` makes Swift see `NSError` and lets `try await` catch it. On iOS, add `-lsqlite3` to **Other Linker Flags** (Debug and Release) in Xcode for the native SQLDelight driver.
- The source page also has the Compose UI for Android (`App.kt` with `PullToRefreshBox`, Material theme export) and the SwiftUI `RocketLaunchRow` / `ContentView` list; they are omitted here to keep this sample on the shared data layer.
