---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-upgrade-app.html
---

# Native UI: Shared logic for REST API requests

Share Ktor networking and kotlinx.serialization in `sharedLogic` and consume it from native Android (Compose) and iOS (SwiftUI) UIs.

`gradle/libs.versions.toml`:

```toml
[versions]
# ...
kotlinx-coroutines = "1.11.0"
kotlinx-datetime = "0.8.0"
ktor = "3.5.2"

[libraries]
# ...
kotlinx-coroutines = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "kotlinx-coroutines" }
kotlinx-datetime = { module = "org.jetbrains.kotlinx:kotlinx-datetime", version.ref = "kotlinx-datetime" }
ktor-client-core = { module = "io.ktor:ktor-client-core", version.ref = "ktor" }
ktor-client-content-negotiation = { module = "io.ktor:ktor-client-content-negotiation", version.ref = "ktor" }
ktor-serialization-kotlinx-json = { module = "io.ktor:ktor-serialization-kotlinx-json", version.ref = "ktor" }
ktor-client-darwin = { module = "io.ktor:ktor-client-darwin", version.ref = "ktor" }
ktor-client-android = { module = "io.ktor:ktor-client-android", version.ref = "ktor" }

[plugins]
# ...
kotlinSerialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "kotlin" }
```

`sharedLogic/build.gradle.kts`:

```kotlin
plugins {
    // ...
    alias(libs.plugins.kotlinSerialization)
}

kotlin {
    sourceSets {
        commonMain.dependencies {
            // ...
            // The Kotlin Multiplatform Gradle plugin adds
            // platform-specific artifacts for coroutines and datetime
            // automatically
            implementation(libs.kotlinx.coroutines)
            implementation(libs.kotlinx.datetime)
            // Main Ktor dependency
            implementation(libs.ktor.client.core)
            // Dependencies that allow Ktor to use serialization
            // with a specific format
            implementation(libs.ktor.client.content.negotiation)
            implementation(libs.ktor.serialization.kotlinx.json)
        }
        androidMain.dependencies {
            // Provides the Android engine for Ktor
            implementation(libs.ktor.client.android)
        }
        iosMain.dependencies {
            // Provides the Darwin engine for Ktor
            implementation(libs.ktor.client.darwin)
        }
    }
}
```

`sharedLogic/src/commonMain/.../greetingkmp/RocketLaunch.kt`:

```kotlin
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

// @Serializable directs the kotlinx.serialization plugin
// to automatically generate a default serializer for the class
@Serializable
data class RocketLaunch(
    // @SerialName redefines field names, making property names
    // more readable in serialized format
    @SerialName("id")
    val id: String,
    @SerialName("name")
    val missionName: String,
    @SerialName("net")
    val launchDateUTC: String,
    @SerialName("status")
    val status: LaunchStatus,
)

@Serializable
data class LaunchStatus(
    @SerialName("id")
    val id: Int,
    @SerialName("name")
    val name: String,
)

@Serializable
data class LaunchListResponse(
    @SerialName("results")
    val results: List<RocketLaunch>,
)
```

`RocketComponent` (HTTP client):

```kotlin
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.get
import io.ktor.serialization.kotlinx.json.json
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import kotlinx.serialization.json.Json
import kotlin.time.Instant

class RocketComponent {
    private val httpClient = HttpClient {
        // ContentNegotiation Ktor plugin and the JSON serializer
        // deserialize the result of the GET request
        install(ContentNegotiation) {
            json(Json {
                // Produces more readable JSON
                prettyPrint = true
                // Allows non-standard JSON input,
                // such as unquoted keys and string values
                isLenient = true
                // Ignores keys that haven't been declared in the model
                ignoreUnknownKeys = true
            })
        }
    }

    // Returns the date string for the latest successful launch.
    // Marked as suspending because it calls
    // the suspending httpClient.get() function
    private suspend fun getDateOfLastSuccessfulLaunch(): String {
        // Asynchronously retrieves information about rocket launches
        val response: LaunchListResponse =
            httpClient.get("https://lldev.thespacedevs.com/2.3.0/launches/previous/?mode=list&limit=10&format=json").body()
        // Gets the latest successful launch.
        // In the response, launches are sorted from newest to oldest,
        // and successful launches are marked with 'status.id' 3
        val lastSuccessLaunch = response.results.first { it.status.id == 3 }
        // Converts the launch timestamp to local time
        val date = Instant.parse(lastSuccessLaunch.launchDateUTC)
            .toLocalDateTime(TimeZone.currentSystemDefault())

        // Date is displayed in the "MMMM D, YYYY" format,
        // for example, "JULY 15, 2026"
        return "${date.month} ${date.day}, ${date.year}"
    }

    // Builds the final string for the UI using
    // the suspending getDateOfLastSuccessfulLaunch() function
    suspend fun launchPhrase(): String =
        try {
            "The last successful launch was on ${getDateOfLastSuccessfulLaunch()} 🚀"
        } catch (e: Exception) {
            println("Exception during getting the date of the last successful launch $e")
            "Error occurred"
        }
}
```

`Greeting.kt` returns a `Flow`:

```kotlin
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlin.random.Random
import kotlin.time.Duration.Companion.seconds

class Greeting {
    private val platform = getPlatform()

    // Stores the last successful launch date
    private val rocketComponent = RocketComponent()
    // Builds and asynchronously emits greeting strings one by one
    fun greet(): Flow<String> = flow {
        emit(if (Random.nextBoolean()) "Hi!" else "Hello!")
        delay(1.seconds)
        emit("Guess what this is! > ${platform.name.reversed()}")
        emit(rocketComponent.launchPhrase())
    }
}
```

Android: `MainViewModel` in `sharedUI`:

```kotlin
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class MainViewModel: ViewModel() {
    // StateFlow is a flow that holds a single current state value
    val greetingList: StateFlow<List<String>>
        // The explicit backing field is read-only outside the class
        // and mutable internally
        field = MutableStateFlow<List<String>>(listOf())

    // Collects all strings emitted by a Greeting().greet() call
    init {
        // Starts collection in a coroutine owned by this ViewModel.
        // It remains active while the ViewModel is retained and is
        // cancelled automatically when the ViewModel is cleared.
        viewModelScope.launch {
            // Appends each new phrase to greetingList
            Greeting().greet().collect { phrase ->
                greetingList.update { list -> list + phrase }
            }
        }
    }
}
```

```kotlin
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.compose.material3.HorizontalDivider
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.ui.unit.dp

@Composable
@Preview
fun App(mainViewModel: MainViewModel = viewModel()) {
    MaterialTheme {
        // Collects the value of greetingList from the ViewModel's flow
        // and represents it as a composable state in a lifecycle-aware manner
        val greetings by mainViewModel.greetingList.collectAsStateWithLifecycle()

        // Presents greeting phrases as a column, separated by dividers
        Column(
            modifier = Modifier
                .safeContentPadding()
                .fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            greetings.forEach { greeting ->
                Text(greeting)
                HorizontalDivider()
            }
        }
    }
}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET"/>
    <!-- The rest of the manifest -->
</manifest>
```

iOS: SwiftUI view model in `iosApp/ContentView.swift` with SKIE (Option 2).

```toml
[versions]
skie = "0.10.15"

[plugins]
skie = { id = "co.touchlab.skie", version.ref = "skie" }
```

```kotlin
plugins {
    //...
    alias(libs.plugins.skie)
}
```

```swift
import SwiftUI
import SharedLogic

struct ContentView: View {
    // Subscribes the view to the view model
    // that is declared below as ObservableObject
    @ObservedObject private(set) var viewModel: ViewModel

    var body: some View {
        ListView(phrases: viewModel.greetings)
            // Calls the startObserving() function
            // with the .task modifier to support concurrency
            .task { await self.viewModel.startObserving() }
    }
}

// ViewModel is declared as an extension to ContentView,
// as they are closely connected
extension ContentView {
    @MainActor
    class ViewModel: ObservableObject {
        // This property is intended to hold the greeting phrases
        // emitted by the ViewModel's flow
        @Published var greetings: [String] = []
        
        func startObserving() {
            // The implementation depends
            // on the chosen iOS coroutine library (see below)
        }
    }
}

struct ListView: View {
    let phrases: Array<String>

    var body: some View {
        List(phrases, id: \.self) {
            Text($0)
        }
    }
}
```

```Swift
// ...
extension ContentView {
    @MainActor
    class ViewModel: ObservableObject {
        @Published var greetings: [String] = []

        func startObserving() async {
            for await phrase in Greeting().greet() {
                self.greetings.append(phrase)
            }
        }
    }
}
```

`iosApp/iOSApp.swift`:

```swift
import SwiftUI

@main
struct iOSApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView(viewModel: ContentView.ViewModel())
        }
    }
}
```

## Notes

- Wizard values: Name `GreetingKMP`, Project ID `com.jetbrains.greetingkmp`, Android and iOS targets, **Do not share UI** for iOS. Modules: `androidApp`, `iosApp`, `sharedLogic`, `sharedUI` (Compose Multiplatform, used only by Android here).
- The tutorial offers two ways to consume Kotlin flows in Swift: SKIE (shown above; no extra iOS dependency) or KMP-NativeCoroutines (`@NativeCoroutines`, plugin `com.rickclephas.kmp.nativecoroutines` version 1.0.6, SwiftPM package `https://github.com/rickclephas/KMP-NativeCoroutines.git`, `asyncSequence(for: Greeting().greet())`). See the source page for the full KMP-NativeCoroutines steps.
- SKIE may not support the latest stable Kotlin version; Gradle sync reports which versions you can downgrade to.
- `@MainActor` on `ViewModel` keeps asynchronous work on the main thread (Kotlin/Native requirement); reload the Xcode project by rebuilding from the IDE if Xcode shows unresolved shared framework symbols.
- The `field = MutableStateFlow<...>` explicit backing field in `MainViewModel` is copied as written in the source tutorial.
