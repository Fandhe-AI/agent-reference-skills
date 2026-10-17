---
source: https://kotlinlang.org/docs/multiplatform/compose-multiplatform-new-project.html
---

# Fully shared code: Time zone picker app

Build a Compose Multiplatform app with shared UI, kotlinx-datetime time zones, Compose Hot Reload on desktop, and `composeResources` images.

Shared UI in `shared/src/commonMain/kotlin/compose.project.demo/App.kt` (first version):

```kotlin
// @Composable marks a composable function:
// a function that emits UI elements in Compose
@Composable
@Preview
fun App() {
    MaterialTheme {
        var timeAtLocation by remember { mutableStateOf("No location selected") }

        // Declares the UI as a column that holds
        // a text label above a button
        Column(
            // Basic layout improvements that make sure that the Column()
            // fills all available space without overlapping the system bars
            modifier = Modifier
                .safeContentPadding()
                .fillMaxSize(),
        ) {
            // Declares a Text() that observes the timeAtLocation state
            Text(timeAtLocation)
            // Declares a Button() that also observes the timeAtLocation state
            // but shows a hardcoded time for now
            Button(onClick = { timeAtLocation = "13:30" }) {
                Text("Show Time At Location")
            }
        }
    }
}
```

Desktop entry point `desktopApp/src/.../main.kt`:

```kotlin
fun main() = application {
    // Sets the initial size and position
    // of the window on screen
    val state = rememberWindowState(
        size = DpSize(400.dp, 350.dp),
        position = WindowPosition(300.dp, 300.dp)
    )
    // Sets the title of the application window
    // and uses the window state initialized above
    Window(
        title = "Local Time App", 
        onCloseRequest = ::exitApplication, 
        state = state,
        // Makes sure that the window is always on top
        // to make debugging and UI iteration easier
        alwaysOnTop = true
    ) {
        App()
    }
}
```

`kotlinx-datetime` in `gradle/libs.versions.toml` and `shared/build.gradle.kts`:

```toml
[versions]
kotlinx-datetime = "0.8.0"

[libraries]
kotlinx-datetime = { module = "org.jetbrains.kotlinx:kotlinx-datetime", version.ref = "kotlinx-datetime" }
```

```kotlin
kotlin {
    // ... 
    sourceSets {
        commonMain.dependencies {
            // ...
            implementation(libs.kotlinx.datetime)
        } 
    }
}
```

Web only: `webApp/build.gradle.kts` adds the `js-joda` time zone package, then the lock file is updated.

```kotlin
kotlin {
    // ...
    sourceSets {
        // ...
        webMain.dependencies {
            implementation(npm("@js-joda/timezone", "2.25.2"))
        }
    }
}
```

```shell
./gradlew kotlinUpgradeYarnLock kotlinWasmUpgradeYarnLock
```

`webApp/src/webMain/kotlin/.../main.kt`:

```kotlin
import kotlin.js.ExperimentalWasmJsInterop
import kotlin.js.JsModule

@OptIn(ExperimentalWasmJsInterop::class)
@JsModule("@js-joda/timezone")
external object JsJodaTimeZoneModule

private val jsJodaTz = JsJodaTimeZoneModule

@OptIn(ExperimentalComposeUiApi::class)
fun main() {
    ComposeViewport {
        App()
    }
}
```

Final `App.kt` with country flags loaded from `shared/src/commonMain/composeResources/drawable` (`jp.png`, `fr.png`, `mx.png`, `id.png`, `eg.png`):

```kotlin
package compose.project.demo

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeContentPadding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.datetime.LocalTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.format
import kotlinx.datetime.format.char
import kotlinx.datetime.toLocalDateTime
import kotlin.time.Clock
import composedemo.shared.generated.resources.Res
import composedemo.shared.generated.resources.eg
import composedemo.shared.generated.resources.fr
import composedemo.shared.generated.resources.id
import composedemo.shared.generated.resources.jp
import composedemo.shared.generated.resources.mx
import org.jetbrains.compose.resources.DrawableResource
import org.jetbrains.compose.resources.painterResource

// The type now also holds a reference to the flag image
data class Country(val name: String, val zone: TimeZone, val image: DrawableResource)

fun currentTimeAt(location: String, zone: TimeZone): String {
    val timeFormat = LocalTime.Format {
        hour()
        char(':')
        minute()
        char(':')
        second()
    }

    val time = Clock.System.now()
    val localTime = time.toLocalDateTime(zone).time

    return "The time in $location is ${localTime.format(timeFormat)}"
}

// Initializes the list with imported Compose Multiplatform resources
// and returns it
fun defaultCountries() = listOf(
    Country("Japan", TimeZone.of("Asia/Tokyo"), Res.drawable.jp),
    Country("France", TimeZone.of("Europe/Paris"), Res.drawable.fr),
    Country("Mexico", TimeZone.of("America/Mexico_City"), Res.drawable.mx),
    Country("Indonesia", TimeZone.of("Asia/Jakarta"), Res.drawable.id),
    Country("Egypt", TimeZone.of("Africa/Cairo"), Res.drawable.eg)
)

@Composable
@Preview
fun App(countries: List<Country> = defaultCountries()) {
    MaterialTheme {
        var showCountries by remember { mutableStateOf(false) }
        var timeAtLocation by remember { mutableStateOf("No location selected") }

        Column(
            modifier = Modifier
                .padding(20.dp)
                .safeContentPadding()
                .fillMaxSize(),
        ) {
            Text(
                timeAtLocation,
                style = TextStyle(fontSize = 20.sp),
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth().align(Alignment.CenterHorizontally),
            )
            Row(modifier = Modifier.padding(start = 20.dp, top = 10.dp)) {
                DropdownMenu(
                    expanded = showCountries,
                    onDismissRequest = { showCountries = false }
                ) {
                    countries.forEach { (name, zone, image) ->
                        // Each country is displayed in a 'DropdownMenuItem'
                        // as a flag ('Image()') and a name ('Text()')
                        DropdownMenuItem(
                            text = { Row(verticalAlignment = Alignment.CenterVertically) {
                                Image(
                                    // 'painterResource()' supplies the Painter object
                                    // required by 'Image()'
                                    painterResource(image),
                                    modifier = Modifier.size(50.dp).padding(end = 10.dp),
                                    contentDescription = "$name flag"
                                )
                                Text(name)
                            } },
                            onClick = {
                                timeAtLocation = currentTimeAt(name, zone)
                                showCountries = false
                            }
                        )
                    }
                }
            }

            Button(modifier = Modifier.padding(start = 20.dp, top = 10.dp),
                onClick = { showCountries = !showCountries }) {
                Text("Select Location")
            }
        }
    }
}
```

## Notes

- Wizard values: Name `ComposeDemo`, Project ID `compose.project.demo`, targets Android / iOS / Desktop / Web with **Share UI** selected for iOS and web.
- Import choices from the tutorial: `rememberWindowState()` from `androidx.compose.ui.window`, `Row()` the `@Composable` version, `Clock` from `kotlin.time`.
- Resource accessors (`Res.drawable.<name>`) are generated from file names, so keep the image names exactly `jp`, `fr`, `mx`, `id`, `eg`.
- Commit the `yarn.lock` generated in `kotlin-js-store` for web builds. The common `androidx.compose` API used here is covered by the Jetpack Compose skills (android-compose-ui, android-compose-components); this sample only shows the `org.jetbrains.compose` multiplatform setup around it.
