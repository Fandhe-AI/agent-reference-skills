# Compose Preview Screenshot Testing

Host-side (no device/emulator) screenshot testing built on `@Preview` composables. Annotating a preview with `@PreviewTest` turns it into a screenshot test that renders the preview, compares it against a stored reference image, and produces an HTML diff report on failure.

## Signature / Usage

```kotlin
// app/src/screenshotTest/kotlin/.../ExamplePreviewScreenshotTest.kt
import com.android.tools.screenshot.PreviewTest

@PreviewTest
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    MyApplicationTheme {
        Greeting("Android!")
    }
}
```

```gradle
// gradle.properties
android.experimental.enableScreenshotTest=true
```

```kotlin
// module build.gradle.kts
plugins {
    alias(libs.plugins.screenshot) // com.android.compose.screenshot
}

dependencies {
    screenshotTestImplementation(libs.screenshot.validation.api)
    screenshotTestImplementation(libs.androidx.ui.tooling)
}
```

```bash
# Generate/update reference images
./gradlew updateDebugScreenshotTest

# Run tests against the stored reference images
./gradlew validateDebugScreenshotTest
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android.experimental.enableScreenshotTest` | `Boolean` (gradle property) | — | Enables the `screenshotTest` source set and its Gradle tasks. |
| `@PreviewTest` | annotation | — | Marks a `@Preview` function as a screenshot test target. |

## Notes

- Tests live in a dedicated `screenshotTest` source set (e.g. `src/screenshotTest/kotlin/...`), separate from `test` / `androidTest`.
- Reference images are stored under `src/screenshotTestDebug/reference/`; the HTML report is written to `{module}/build/reports/screenshotTest/preview/{variant}/index.html`.
- Requires AGP 8.5.0+ / Kotlin 1.9.20+ / JDK 17+ for Gradle-only usage; full IDE integration needs newer Android Studio + AGP 9.0+.
- Supports `@Preview` parameters such as `uiMode`, `fontScale`, and multipreview annotations.
- Not supported in Kotlin Multiplatform (KMP) projects.
- For instrumented, device-rendered node captures inside a regular `ComposeTestRule` test, see `screenshot-testing.md` (`captureToImage`) instead.

## Related

- [screenshot-testing](./screenshot-testing.md)
