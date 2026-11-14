# Automated backup and restore tests (testOptions.backupTests)

Experimental AGP 9.5 test suite that runs JUnit 5 host tests on the development machine. The tests seed app data on connected devices through adb, back up and restore the app through the Android backup framework, and check that the data is intact.

## Signature / Usage

```properties
# gradle.properties
android.experimental.testSuiteSupport=true
android.experimental.enableBackupTest=true
```

```kotlin
android {
    testOptions {
        backupTests {
            create("backupTest") {
                backupTestLibraryVersion = "1.0.0-alpha04"
            }
        }
    }
}
```

```bash
./gradlew :app:testDebugBackupTestDefaultTestSuite
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `backupTestLibraryVersion` | `String` | AGP-version-based default | Version of the `androidx.test.backup` libraries that AGP adds to the suite, such as `"1.0.0-alpha04"`. |
| `targetVariants` | collection | variants of `testBuildType` (`debug` by default) | Build variants that the suite tests, such as `targetVariants.add("demoDebug")`. A debuggable variant is recommended. |
| `hostJar { dependencies { ... } }` | block | — | Extra dependencies for the host tests (for example Truth). |
| `testApk { ... }` | block | — | Extra dependencies for the test APK that holds device actions. |

### Transport modes

| Mode | Scenario |
|------|----------|
| `LOCAL` | A backup to the local backup transport of the device. The backup data stays on the device. |
| `CLOUD_ENCRYPTED` | A cloud backup from a device with client-side encryption. |
| `CLOUD_UNENCRYPTED` | A cloud backup from a device that does not have client-side encryption. |
| `DEVICE_TO_DEVICE` | A device-to-device transfer, for example over a cable or Wi-Fi. |

### Built-in storage domains

| Storage domain | Data |
|----------------|------|
| `StorageDomain.Preference` | A key in a `SharedPreferences` file. |
| `StorageDomain.DataStorePreference` | A key in a Preferences DataStore file. |
| `StorageDomain.Database` | A row in a SQLite database table. |
| `StorageDomain.TextFile` | A text file in the app's internal storage. |
| `StorageDomain.BinaryFile` | A binary file in the app's internal storage. |
| `StorageDomain.ExcludedData` | Wraps another storage domain whose data should not be restored, such as data excluded by backup rules. |

### Requirements and compatibility

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Gradle | 9.6.0 | 9.6.0 or higher |
| JDK | 17 | 17 or higher |
| Android Studio | Rabbit 2 Canary 1 | Rabbit 2 Canary 4 or higher |
| AGP | 9.5.0-alpha06 | 9.5.0-alpha09 or higher |
| `androidx.test.backup` libraries | 1.0.0-alpha01 | 1.0.0-alpha04 or higher |

### Host test example

Source directories follow the suite name: host tests in `src/{suiteName}/test/kotlin/`, device actions in `src/{suiteName}/androidTest/kotlin/`.

Adapted (not in the official docs): the official example also seeds `DataStorePreference`, `Database`, and an `ExcludedData` file; this snippet keeps only two storage domains for brevity.

```kotlin
package com.example.myapp

import androidx.test.backup.host.BackupRestoreController
import androidx.test.backup.host.BackupRestoreExtension
import androidx.test.backup.host.BackupTransportMode
import androidx.test.backup.host.StorageDomain
import java.nio.file.Path
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.junit.jupiter.api.io.TempDir

@ExtendWith(BackupRestoreExtension::class)
class SettingsBackupTest {
    @Test
    fun settingsSurviveBackupAndRestore(
        device: BackupRestoreController,
        @TempDir outputDir: Path,
    ): Unit = runBlocking {
        device.runBackupRestoreFlow(
            storages = listOf(
                StorageDomain.Preference(
                    prefName = "settings",
                    key = "channels",
                    value = setOf("news", "alerts"),
                ),
                StorageDomain.TextFile(
                    path = "drafts/note.txt",
                    content = "Buy milk",
                ),
            ),
            outputDir = outputDir,
            mode = BackupTransportMode.LOCAL,
        )
    }
}
```

## Notes

- Experimental: the official page states the APIs and DSL syntax might change between alpha releases.
- JUnit 5 ignores test methods that return a value, so declare the `Unit` return type explicitly (`fun myTest(...): Unit = runBlocking { ... }`).
- `check`, `test`, and `connectedCheck` do not run backup and restore test suites; run the suite task explicitly. The task name is `test{Variant}{SuiteName}DefaultTestSuite`; the HTML report is at `{module}/build/reports/tests/{taskName}/index.html`.
- Cloud and device-to-device modes need Google Play services on the device and a debuggable build; devices on API level 36.1 or higher need Google Play services 26.33.30 or higher. A device or emulator on Android 12 (API level 31) or higher connected through adb is required.
- Device selection: use `@Device(role = "...")` with the `androidx.test.backup.device.serial.{role}` system property, or filter with `serial`, `api`, `minApi`, `maxApi`. The `ANDROID_SERIAL` environment variable does not affect assignment.
- Custom data (for example Proto DataStore or Room) is tested with `BackupDeviceAction` classes passed to `StorageDomain.CustomData(populateAction, verifyAction, args)`. In 1.0.0-alpha04 `BackupDeviceAction.phase` was removed; remove `override val phase` from custom actions.
- Known limitations: Android Studio does not support test suites yet (run from the command line); Firebase Test Lab is not supported; tests clear app data and change backup settings, so use dedicated test devices.
- Not covered here: Restore Credentials testing, Java (`...Async`) variants, and the step-by-step `performBackup` / `performRestore` flow; see the source page.
- Source: https://developer.android.com/studio/preview/backup-restore-testing (fetched 2026-11-14; page last updated 2026-11-06 UTC).
- Source: https://developer.android.com/studio/preview/backup-restore-testing-release-notes (fetched 2026-11-14; 1.0.0-alpha04 dated November 4, 2026).
- The `testOptions` DSL for unit tests and `testBuildType` is owned by the testOptions page; test authoring in general belongs to the `android-testing` skill.

## Related

- [testOptions](./test-options.md)
- [gradle.properties](./gradle-properties.md)
- [AGP 9.5 Release Notes](../releases/agp-9-5-release-notes.md)
