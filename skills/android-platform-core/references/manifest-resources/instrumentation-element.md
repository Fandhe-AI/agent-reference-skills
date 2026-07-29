# instrumentation / profileable elements

`<instrumentation>` declares an `Instrumentation` class that monitors an app's interaction with the system, instantiated before any of the app's own components (used by test runners). `<profileable>` opts a release build into being profiled by local tooling.

## Signature / Usage

```xml
<manifest ...>
    <instrumentation
        android:name="androidx.test.runner.AndroidJUnitRunner"
        android:targetPackage="com.example.myapp"
        android:functionalTest="false"
        android:handleProfiling="false" />
</manifest>

<application>
    <profileable
        android:shell="true"
        android:enabled="true" />
</application>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` (instrumentation) | String | required | Fully qualified `Instrumentation` subclass name; a leading `.` appends to the package name. |
| `android:targetPackage` (instrumentation) | String | — | Package the instrumentation runs against. |
| `android:targetProcesses` (instrumentation) | String | main process only | Comma-separated process names, or `"*"` for all processes of the target package. API 26+. |
| `android:functionalTest` (instrumentation) | Boolean | `"false"` | Whether the `Instrumentation` runs as a functional test. |
| `android:handleProfiling` (instrumentation) | Boolean | `"false"` | Whether the `Instrumentation` object turns profiling on/off itself, vs. running with profiling on continuously. |
| `android:shell` (profileable) | Boolean | `"false"` | Whether the device user can profile the app via local tools (`simpleperf`, `am profile`, `perfetto`). Without this, such tools work only when the app is `debuggable`. |
| `android:enabled` (profileable) | Boolean | `"true"` | Whether the app can be profiled at all, including by system services; `"false"` disables profiling entirely regardless of `shell`. API 30+. |

## Notes

- `<instrumentation>` contained in: `<manifest>`, introduced API level 1. `<profileable>` contained in: `<application>`, introduced API level 29 (`android:enabled` added API 30).
- `<profileable android:shell="true">` is the standard way to get accurate CPU/memory profiling data from a release-configuration (non-`debuggable`) build without shipping a fully debuggable APK.
- Both elements are primarily used by testing/profiling tooling rather than app runtime logic; see `android-testing` for instrumented-test project setup.

## Related

- [manifest element](./manifest-element.md)
- [application element](./application-element.md)
