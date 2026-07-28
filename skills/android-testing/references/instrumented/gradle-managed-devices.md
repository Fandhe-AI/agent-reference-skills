# Gradle managed devices

Build-managed (Gradle-managed) devices let the Android Gradle plugin fully own the lifecycle (create, deploy, teardown) of virtual or remote physical test devices declared in Gradle files, for consistent and reproducible instrumented test runs. Available for API 27+.

## Signature / Usage

```kotlin
android {
    testOptions {
        managedDevices {
            localDevices {
                create("pixel2api30") {
                    device = "Pixel 2"
                    apiLevel = 30
                    systemImageSource = "aosp" // or "google"
                }
            }
        }
    }
}
```

```bash
./gradlew pixel2api30DebugAndroidTest
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `device` | `String` | — | Device profile name, e.g. `"Pixel 2"`. |
| `apiLevel` | `Int` | — | Target API level of the virtual device. |
| `systemImageSource` | `String` | — | `"aosp"`, `"google"`, or ATD variants `"aosp-atd"` / `"google-atd"`. |

## Notes

- Uses emulator snapshots for faster startup and caches results to rerun only relevant tests.
- Device groups (`testOptions.managedDevices.groups`) let a single command target multiple devices; run with `./gradlew group-nameGroupDebugAndroidTest`.
- Automated Test Devices (ATD) strip Google apps, Settings, SystemUI, and AOSP apps to reduce CPU/memory; currently API 30 only, and don't support screenshot tests requiring hardware rendering.
- Test sharding across managed devices: `android.experimental.androidTest.numManagedDeviceShards` in `gradle.properties`.
- Firebase Test Lab devices can be declared the same way via the `com.google.firebase.testlab` Gradle plugin for running at scale in remote data centers.

## Related

- [Set up project for AndroidX Test](./set-up-project.md)
