# Multiprocess Espresso

`androidx.test.espresso:espresso-remote` extends Espresso's synchronization guarantees across process boundaries, for apps that place components (e.g. a `Service` or `ContentProvider`) in a non-default process. Standard `onView`/`perform`/`check` calls work unchanged once the target processes are registered; no separate API surface is introduced.

## Signature / Usage

```kotlin
// build.gradle.kts (module)
dependencies {
    androidTestImplementation("androidx.test.espresso:espresso-remote:3.6.1")
}
```

```xml
<!-- src/androidTest/AndroidManifest.xml -->
<manifest package="androidx.test.mytestapp.tests">
  <instrumentation
      android:name="androidx.test.runner.AndroidJUnitRunner"
      android:targetPackage="androidx.test.mytestapp"
      android:targetProcesses="*">
    <meta-data
        android:name="remoteMethod"
        android:value="androidx.test.espresso.remote.EspressoRemote#remoteInit" />
  </instrumentation>
</manifest>
```

```kotlin
// Test code is unchanged; Espresso synchronizes across the registered processes.
onView(withId(R.id.button)).perform(click())
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `android:targetProcesses="*"` | manifest attribute | Registers all of the app's processes for cross-process synchronization. |
| `android:targetProcesses="proc1,proc2"` | manifest attribute | Registers only the named processes (comma-separated); ignored if it names the app's main process. |
| `remoteMethod` meta-data | manifest `<meta-data>` | Points `AndroidJUnitRunner` at `EspressoRemote#remoteInit` to perform the cross-process handshake. |

## Notes

- Artifact: `androidx.test.espresso:espresso-remote`, added as `androidTestImplementation`.
- Requires API level 26+ (Android 8.0).
- Can only synchronize processes within the app under test's own package; it cannot reach into other apps' processes.
- Each new process gets its own `AndroidJUnitRunner`, which registers Espresso and performs a handshake with the other running instances to establish communication channels.
- Distinct from WorkManager's multi-process configuration (a different, unrelated API) despite the same filename appearing under the android-background-work skill.

## Related

- [Espresso.onView](./onview.md)
- [IdlingResource](./idling-resource.md)
